# Performance Architecture

> Companion: [`KNOWLEDGE_BASE.md`](./KNOWLEDGE_BASE.md), [`AGENTS.md`](../AGENTS.md).

The MMXXVII performance pass put the site into the same league as
[immersive-g.com](https://immersive-g.com) — heavy WebGL + smooth scroll
with no perceptible jank on a Pixel-class device. This file is the
reference for **why** that works, so any future change can preserve it.

The mental model: every frame has 16.67ms (60fps) or 8.33ms (120fps).
Everything we ship has to fit inside that. The architecture below makes
sure 99% of frames don't even touch React.

---

## 1. Scroll Hot Path: Zero Re-Renders

### Problem

`SmoothScrollProvider` originally called `setState({ velocity, scroll, progress })`
on every Lenis tick. Lenis fires faster than rAF — sometimes 90–120 times
per second on high-refresh-rate displays. Every consumer of
`useScrollState()` re-rendered at scroll speed. On a mid-range phone the
React reconciler couldn't keep up, and the user saw "scroll atke jacce"
(scroll stutter).

### Solution

`SmoothScrollProvider` now mutates a singleton `refs` object in-place and
writes two CSS custom properties to `<html>`:

- `--scroll-vy` — clamped, damped scroll velocity (range roughly `-6..6`).
- `--scroll-progress` — total document scroll progress (`0..1`).

CSS-coupled animations read those vars directly — no React involved.

```css
.kinetic {
  transform: skewY(calc(var(--vy, var(--scroll-vy, 0)) * 1deg));
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}
```

For imperative consumers (e.g. WebGL uniforms in a rAF loop), use
`useScrollVelocityRef()` which returns a stable ref pointing at the
singleton:

```tsx
const vRef = useScrollVelocityRef();
useEffect(() => {
  let raf = 0;
  const tick = () => {
    gl.uniform1f(uVel, vRef.current.velocity);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}, [vRef]);
```

`useScrollState()` is preserved as a backwards-compat hook that returns a
**snapshot** at render time — it does NOT subscribe to scroll. Any
component that wants live values should switch to either the CSS var or
the ref.

### Lenis tuning

| Option | Value | Why |
| --- | --- | --- |
| `duration` | `0.95` | Tightened from `1.2` — less floaty, more responsive. |
| `easing` | `1.001 - 2^(-10t)` | Standard ease-out-expo, matches GSAP `power3.out`. |
| `wheelMultiplier` | `1` | One scroll = ~one viewport step on most setups. |
| `touchMultiplier` | `1.6` | Tuned for thumb scrolling on mobile. |
| `syncTouch` | `true` | Increases lerp on big inputs — feels native. |
| `smoothWheel` | `true` | Trackpad + mouse-wheel both go through Lenis. |

Reduced-motion: Lenis is bypassed entirely. We fall back to native scroll
with a passive listener that updates `--scroll-progress` only.

### CSS-var write throttle

Even with no React state, writing to `<html>.style` 120 times/sec triggers
style recalc. We throttle the var write to ≤ 1 per frame (≥ 14ms gap):

```ts
if (now - lastVelocityWrite > 14) {
  document.documentElement.style.setProperty("--scroll-vy", refs.velocity.toFixed(3));
  ...
  lastVelocityWrite = now;
}
```

---

## 2. IntersectionObserver-Paused rAF

Every animated `<canvas>` component must:

1. Hold its rAF handle in a closure variable.
2. Set up an `IntersectionObserver` with `threshold: 0.01` on the canvas.
3. On `isIntersecting`: start (or restart) the rAF loop.
4. On not-intersecting: `cancelAnimationFrame(raf); raf = 0;`.
5. Disconnect the observer on unmount.

Reference implementation:

```ts
const io = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting && !raf) {
      raf = requestAnimationFrame(tick);
    } else if (!entry.isIntersecting && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  },
  { threshold: 0.01 },
);
io.observe(canvas);
```

### Components covered

- `HeroShader.tsx`
- `HeroFluidDisplacement.tsx`
- `NoiseField.tsx`
- `WorkCoverDisplacement.tsx`
- `AtlasConstellation.tsx`
- `GhostCursors.tsx`
- `LabDemo.tsx` (per-shader)

### Components NOT covered (intentionally)

- `Cursor.tsx` — globally fixed, follows mouse, must run while page is
  active regardless of scroll.
- `CursorTrail.tsx` — same.
- `Preloader.tsx` — only runs once on cold load.
- `MagneticLetters.tsx` — uses pointer events not rAF for hover; only ticks
  when actively hovered.

When adding a new canvas, default to **paused-when-off-screen**.

---

## 3. Route Pre-warming

`RoutePrefetcher` mounts inside `<SmoothScrollProvider>` next to
`<Preloader>`. Strategy:

1. **Primary routes (immediate):** Home, Works, Lab, Journal, About,
   Resume, Contact, AI. These are the most-likely first-clicks after the
   preloader fades.
2. **Secondary routes (T+600ms):** Now, Services, Achievements, Colophon,
   Colors, Changelog, Uses, Showreel.
3. **Slug pages (T+1200ms):** every `/works/*`, `/lab/*`, `/journal/*`.

The 600ms / 1200ms delays let the LCP-class resources settle before we
saturate the network with prefetches.

### Connection-aware

Skip prefetching entirely when the user is on:

- `Save-Data` header set
- `effectiveType` is `slow-2g` or `2g` (Network Information API)

This is a **politeness rule**, not a perf optimisation — pre-fetching on
metered or slow connections is hostile.

### Pre-connect

We also emit `<link rel="preconnect">` for known third-party origins so
the TLS handshake is warm before the first fetch:

- `https://api.indexnow.org`
- `https://customer-7l7ux9p61w0c0p3z.cloudflarestream.com`

Add a new origin here only if the site reliably hits it on most pages.
Stale preconnects waste connections.

---

## 4. SSG vs ISR vs SSR

Default: **SSG** (Static Site Generation). All content lives in
`src/lib/data.ts`, so nothing needs server runtime. Build time is ~30s on
Vercel and the entire site ships from the CDN edge.

| Route family | Mode | Why |
| --- | --- | --- |
| `/`, `/about`, `/services`, … | Static (○) | Pure content. |
| `/works/[slug]`, `/journal/[slug]`, `/lab/[slug]` | SSG (●) | `generateStaticParams` over `data.ts`. `dynamicParams = false` for `/lab/[slug]`. |
| `/now` | SSG with `revalidate = 1800` | Pulls live GitHub data, ISR-cached at edge for 30 min. |
| `/api/indexnow`, `/api/github`, `/api/feed.json` | Edge runtime | Stateless, fast cold-start. |
| `/opengraph-image.tsx`, `/twitter-image.tsx`, `/works/[slug]/opengraph-image.tsx` | Edge runtime (next/og) | ImageResponse can't run in Node. |

When adding a route that depends on freshness, prefer ISR
(`export const revalidate = N`) over `force-dynamic`. Dynamic routes
defeat the static-first model.

---

## 5. Image Hardening

| Property | Default | Override |
| --- | --- | --- |
| `loading` | `"lazy"` | `"eager"` for above-fold imagery |
| `priority` | `false` | `true` only on the LCP element |
| `decoding` | `"async"` | never override |
| `sizes` | required | always set per breakpoint, never default |
| `placeholder` | `"empty"` | `"blur"` if blurDataURL available |
| `quality` | `75` (Next default) | drop to `60` for non-hero |

Above-fold portrait on `/about` is `priority` + `sizes="(max-width: 768px) 100vw, 33vw"`.

For raw `<img>` (used in OG routes only), set `decoding="async"` and
`loading="lazy"` explicitly — `next/image` handles this automatically.

---

## 6. Font Strategy

`next/font/google` loads Inter + Newsreader + JetBrains Mono. `display: "swap"`
on all three. Only the latin subset is loaded.

Future-2028: switch to self-hosted woff2 with `font-display: optional` —
cuts FOIT-induced layout shift to zero on slow connections at the cost of
showing the system fallback for one extra paint.

---

## 7. Bundle Hygiene

The first-load shared JS is **106 kB** as of MMXXVII. Don't let it grow.
Watch out for:

- Importing all of `framer-motion` instead of `m` + `motion`.
- Importing all of `gsap` instead of named modules from `gsap/all`.
- Adding lodash (use native + small helpers).
- Pulling in `@react-three/fiber` for tiny effects — raw WebGL is smaller.

To inspect: `pnpm build` then check the route-by-route table at the bottom
of the output. If a route's first-load JS jumps by >10 kB, find out why.

---

## 8. Reduced-Motion Contract

Every motion path must check:

```ts
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```

and either:

1. Disable the animation entirely (e.g. Preloader).
2. Snap to the end state (e.g. CountUp jumps to final number).
3. Use a static fallback (e.g. SmoothScrollProvider switches to native scroll).

There's no "reduced-but-still-some" middle ground — reduced means **none**.

---

## 9. Verification Checklist

Before merging a PR that touches anything in this file's domain:

- [ ] `pnpm typecheck` clean.
- [ ] `pnpm lint` clean (no warnings — warnings become errors over time).
- [ ] `pnpm build` clean. First-load shared JS within ±5 kB of `main`.
- [ ] Open the home page in DevTools Performance, scroll for 5 seconds.
      Frame chart should be solid green (no long tasks > 16ms).
- [ ] DevTools React Profiler: scrolling should produce **zero** re-renders.
- [ ] Throttle CPU 4× and confirm scroll still feels acceptable.
- [ ] Toggle `prefers-reduced-motion` in DevTools Rendering — page should
      still render and be navigable, just without animation.

---

## 10. Frame-Rate-Independent Damping (`damp.ts`)

The studio canon for "buttery" cursor + camera follow — same formula
Immersive Garden, Robot Studio, and Active Theory cite in the David Whyte
case study and elsewhere:

```
current = current + (target - current) * (1 - exp(-k * dt))
```

This replaces the classic 60fps-tuned linear lerp
(`current += (target - current) * 0.18`) with a frame-rate-independent
exponential decay. On a 60Hz panel both formulas produce the same motion;
on a 144Hz panel the linear version moves 2.4x faster, while the
exponential version stays identical. Same maths anywhere — cursor ring,
hero shader cursor follow, fluid displacement, work cover hover, atlas
constellation drift.

### Helper: `src/lib/damp.ts`

```ts
import { damp, clampDt, K } from "@/lib/damp";

let last = performance.now();
const tick = () => {
  const now = performance.now();
  const dt = clampDt((now - last) / 1000);
  last = now;
  current = damp(current, target, K.K_FAST, dt);
  // ...
  requestAnimationFrame(tick);
};
```

### Pre-tuned `K` constants

| Constant | Old factor at 60fps | Use case |
| --- | --- | --- |
| `K_SLOW`   | `* 0.05` | Idle-active blends (hero fluid) |
| `K_HERO`   | `* 0.06` | Hero shader cursor |
| `K_GENTLE` | `* 0.08` | Slant / soft attributes |
| `K_MID`    | `* 0.12` | Hover intensity (work cover) |
| `K_FAST`   | `* 0.18` | Cursor ring, spotlight, magnetic |
| `K_SNAP`   | `* 0.25` | Quick snaps |

### `clampDt`

Caps `dt` at 50ms (default) so a tab-switch + Page-Visibility quirks
can't produce a single frame with `dt = 2s`. Ensures every frame
behaves like a frame.

### When NOT to damp

Cursor **dot** position should snap directly (no damping) — only the
ring follows. Damping the dot makes it feel laggy.

---

## 11. WebGL Context Options + DPR Caps (`dpr.ts`)

The paper § "Performance Budget" warns that retina iPhones report
`devicePixelRatio = 3`, which means a default canvas renders **9× as
many pixels** as a regular display. On a passive ambient shader this
melts the GPU before any "real" workload starts.

### Context options

Every `getContext("webgl"|"webgl2", …)` call passes:

```ts
{
  antialias: false,       // we use FXAA in-shader where needed
  powerPreference: "high-performance" | "low-power",
}
```

`high-performance` for the **interactive** shaders (Hero, Hero fluid,
work covers). `low-power` for **passive** shaders (NoiseField) — this
hint asks hybrid macOS/Windows GPUs to stay on the integrated chip,
saving battery and avoiding thermal throttling.

### `src/lib/dpr.ts`

A central place for the four caps:

| Constant | Value | Where |
| --- | --- | --- |
| `DPR_HERO`    | `1.5`  | HeroShader, HeroFluidDisplacement |
| `DPR_CANVAS`  | `1.5`  | WorkCoverDisplacement, LabDemo (default) |
| `DPR_AMBIENT` | `1.25` | NoiseField (passive) |
| `DPR_COMPACT` | `1.0`  | LabDemo cards in `/lab` grid (10+ on screen) |

Always read `cappedDpr(cap)` once per `resize`, not per frame. The
browser can change `devicePixelRatio` when the user zooms.

### Lazy initial sizing in `LabDemo`

`/lab` mounts ~17 demo cards at once. Instead of calling each demo's
`init()` (which allocates typed-array stores) upfront, the first `fit()`
call is deferred until the canvas's `IntersectionObserver` fires. Cards
the user never scrolls to never pay the init cost.

```ts
let initialised = false;
const start = () => {
  if (raf) return;
  if (!initialised) {
    fit();          // first paint of this canvas
    initialised = true;
  }
  raf = requestAnimationFrame(tickFrame);
};
```

---

## 12. Shared rAF Bus (`rafBus.ts`)

Paper § "Scroll Management": *"Lenis allows the developers to
synchronize the scroll position with the WebGL rendering loop, ensuring
that every pixel of motion on the screen corresponds exactly to the
user's input."*

Without a shared loop every cursor / spotlight / Lenis tick allocates
its own `requestAnimationFrame` callback. The browser still vsyncs them,
but order is non-deterministic. Lenis can update scroll AFTER a canvas
has already drawn — so the canvas paints with last-frame's scroll
position and the user sees a 1-frame lag.

### Architecture

`src/lib/rafBus.ts` exposes:

- `subscribeRaf(cb)` — append a tick callback. Returns an unsubscribe.
- `subscribeRafPriority(cb, priority)` — same, but inserts in priority
  order. Negative priority runs first.

The bus runs **one** `requestAnimationFrame` for the whole app.
Subscribers receive `(now, dt)` where `dt` is in seconds (so it composes
directly with `damp()`).

### Order of operations

| Subscriber | Priority | Why |
| --- | --- | --- |
| `SmoothScrollProvider` (Lenis) | `-10` | Must update scroll FIRST so canvases that read `--scroll-vy` or `getScrollState()` see the new frame's value. |
| `Cursor` (ring follow) | `0` | Reads mouse, writes transform. |
| `Spotlight` (soft-light radial) | `0` | Reads mouse, writes transform. |

When adding a new global animation that needs to be synchronised with
scroll, **subscribe to the bus** instead of starting your own
`requestAnimationFrame`. Per-canvas / per-component WebGL renderers can
still use their own rAF — the IO-paused pattern in § 2 means they only
run while visible, so they don't benefit from the bus.

### Error isolation

A subscriber that throws is logged in dev and skipped in prod. The bus
keeps running so one buggy canvas can't take down the cursor or scroll.

---

## 13. Pre-Baked Noise (`bakeNoise.ts`)

Paper § "Generative Reveal Animation":

> To avoid the high cost of calculating noise values in real-time for
> every pixel, the noise patterns are 'baked' into textures in
> advance. The shader then samples these pre-calculated textures and
> offsets them using a simple time variable, creating the illusion of
> complex generative art with the performance cost of a simple texture
> lookup.

`src/lib/bakeNoise.ts` exports `bakeValueNoise()` which returns a
cached, tileable 256² pixel buffer. The first call computes the
pattern; subsequent calls return the cached buffer.

The shader uploads it once at mount with:
- `gl.LINEAR` filtering — replaces the in-shader smoothstep blend.
- `gl.REPEAT` wrap — lets the shader scroll the texture by adding a
  `time * direction` offset to the UV without ever sampling outside
  the period.

Per-pixel cost drops from `4 * hash + smoothstep` per octave to a
single `texture2D` fetch. Currently used in `NoiseField.tsx`. Same
trick can be applied to `HeroFluidDisplacement.tsx` if profiling
shows the curl-noise loop becoming a bottleneck.

---

## 14. Spatial Hashing for Atlas Connection Lines

`AtlasConstellation` draws faint lines between stars within a `link`
distance (currently 140 CSS px). The naive O(N²) all-pairs scan with
N≈50 stars meant ~1225 distance checks per frame.

Replaced with a spatial hash bucket:

```ts
const buckets = new Map<number, number[]>();
for (let i = 0; i < N; i++) {
  const cx = Math.floor(screen[i].sx / link);
  const cy = Math.floor(screen[i].sy / link);
  const key = ((cx & 0xffff) << 16) | (cy & 0xffff);
  buckets.get(key)?.push(i) ?? buckets.set(key, [i]);
}
// Each star only checks its own cell + 8 neighbour cells.
```

Drops to O(N · 9 · k) where k is the average number of stars per
cell — empirically ~150 distance checks per frame instead of ~1225.

---

## 15. Future-Performance Roadmap

- **WebGPU fallback for `HeroShader`.** Detect `navigator.gpu`, prefer it
  on supported browsers. Fall back to current WebGL2.
- **Modulepreload for Lenis.** Add `<link rel="modulepreload" href="...">`
  for the smooth-scroll chunk so first paint doesn't wait on it.
- **View Transitions API.** Once Chromium-stable, replace `RouteCurtain`.
- **Edge runtime for `/api/github`.** Currently Node; Edge would shave
  ~150ms off first paint of `/now`.
- **Service worker offline shell** for `/now`, `/journal`, `/ai`.
- **Per-shader chunks for `LabDemo.tsx`.** Currently all 1.2k lines ship
  as one chunk; split via `next/dynamic` per slug.
