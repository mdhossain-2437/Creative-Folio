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

| Option            | Value                 | Why                                                                                       |
| ----------------- | --------------------- | ----------------------------------------------------------------------------------------- |
| `duration`        | `0.95`                | Tightened from `1.2` — less floaty, more responsive.                                      |
| `easing`          | `1.001 - 2^(-10t)`    | Standard ease-out-expo, matches GSAP `power3.out`.                                        |
| `wheelMultiplier` | `1`                   | One scroll = ~one viewport step on most setups.                                           |
| `touchMultiplier` | `1.6`                 | Tuned for thumb scrolling on the desktop touch path.                                      |
| `syncTouch`       | `true` (desktop only) | Increases lerp on big inputs — feels native. **Never runs on touch devices** (see below). |
| `smoothWheel`     | `true`                | Trackpad + mouse-wheel both go through Lenis.                                             |

**Touch + reduced-motion: native scroll.** Lenis is bypassed entirely on any
coarse-pointer / `(hover: none)` device _and_ on `prefers-reduced-motion`. This
is the single biggest mobile fix: Lenis `syncTouch` re-drives the page from JS
every frame, so one dropped frame on a weak phone becomes a visible scroll
stall — a string of them reads as "the page is buffering / frozen mid-flick".
Native scrolling is composited off the main thread and never stalls, which is
exactly why large immersive studios ship native momentum on touch and keep
JS smooth-scroll only on `pointer: fine`.

No scroll-coupled feature is lost: the native path still updates the same
`--scroll-vy` / `--scroll-progress` CSS vars and the same `refs` singleton,
sourced from real scroll events (with a damped, clamped velocity in identical
units to the Lenis path, decayed back to 0 when momentum ends). See
§ 16 for the full device-tier model.

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
- `LabDemo.tsx` shell + `lab/runtime/CanvasDemo.tsx` + per-slug modules in
  `src/components/lab/demos/`

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
`<Preloader>`, but it does not compete with first paint. Strategy:

1. **Wait for idle + quiet:** decorative chrome starts only after late idle and
   a quiet user window. If the user is scrolling, touching, clicking or typing,
   cursor/grid/meter/showreel chunks keep waiting so hydration, font
   activation, image decode and hero rendering get the first budget.
2. **Quiet-window gate:** prefetch does not start until roughly 16s after the
   page has settled, and every batch postpones itself while the user has
   scrolled, clicked, typed or touched within the last 5s.
3. **Primary routes, batched:** Home, Works, Lab, Journal, About, Resume,
   Contact, AI are warmed in small batches only after that quiet window.
4. **Secondary routes, delayed:** Now, Services, Achievements, Colophon,
   Colors, Changelog, Uses, Showreel, Portfolios start much later.
5. **Slug pages, high-tier only:** `/works/*`, `/lab/*`, `/journal/*` prefetch
   only on high-tier healthy clients, in slower batches.

This preserves instant-feeling navigation on capable clients while preventing
live deployments from doing dozens of background fetches during first scroll.

Internal links should import `@/components/ui/PerformanceLink`, not
`next/link` directly. `PerformanceLink` keeps client navigation behavior but
sets `prefetch={false}` by default, so production-only App Router prefetching
does not compete with animation, shader, image decode, or first-scroll work.
Use an explicit `prefetch={true}` only when a route has been measured and fits
inside the first-load budget.

Decorative chrome is split as a tiny `LazyChrome` shell plus
`LazyChromeBundle`. Keep module-level `next/dynamic` component definitions in
the bundle, not the shell, because Next can preload dynamic chunks referenced
by a mounted client module even when that module returns `null`.

Global overlays follow the same rule: `ClientOverlays` is an on-demand shell
and `ClientOverlaysBundle` owns the `next/dynamic` declarations. The shell
loads the bundle after a quiet window, or immediately when the user asks for
the command palette, shortcut sheet, or showreel.

### Connection-aware

Skip prefetching entirely when the user is on:

- `Save-Data` header set
- `effectiveType` is `slow-2g`, `2g`, or `3g` (Network Information API)
- very low `downlink` when the browser exposes it

This is a **politeness rule**, not a perf optimisation — pre-fetching on
metered or slow connections is hostile.

Speculation Rules follow the same policy. `RoutePrefetcher` appends the
`/speculation-rules` link only on capable Chromium-style browsers after the
connection gate passes. The route itself also returns empty rules for
`Save-Data`, `slow-2g`, `2g`, and `3g` request hints.

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

| Route family                                                                      | Mode                         | Why                                                                               |
| --------------------------------------------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------- |
| `/`, `/about`, `/services`, …                                                     | Static (○)                   | Pure content.                                                                     |
| `/works/[slug]`, `/journal/[slug]`, `/lab/[slug]`                                 | SSG (●)                      | `generateStaticParams` over `data.ts`. `dynamicParams = false` for `/lab/[slug]`. |
| `/now`                                                                            | SSG with `revalidate = 1800` | Pulls live GitHub data, ISR-cached at edge for 30 min.                            |
| `/api/indexnow`, `/api/github`, `/api/feed.json`                                  | Edge runtime                 | Stateless, fast cold-start.                                                       |
| `/opengraph-image.tsx`, `/twitter-image.tsx`, `/works/[slug]/opengraph-image.tsx` | Edge runtime (next/og)       | ImageResponse can't run in Node.                                                  |

When adding a route that depends on freshness, prefer ISR
(`export const revalidate = N`) over `force-dynamic`. Dynamic routes
defeat the static-first model.

---

## 5. Image Hardening

| Property      | Default             | Override                                 |
| ------------- | ------------------- | ---------------------------------------- |
| `loading`     | `"lazy"`            | `"eager"` for above-fold imagery         |
| `priority`    | `false`             | `true` only after Lighthouse proves image LCP |
| `decoding`    | `"async"`           | never override                           |
| `sizes`       | required            | always set per breakpoint, never default |
| `placeholder` | `"empty"`           | `"blur"` if blurDataURL available        |
| `quality`     | `75` (Next default) | drop to `60` for non-hero                |

2026-07-03 LHCI showed all audited routes (`/`, `/about`, `/works`, `/lab`,
`/lab/particle-systems`, `/contact`, `/services`, `/resume`) using preloader
text as LCP, not images. Do not add image `priority` or `fetchPriority="high"`
to those routes until a fresh Lighthouse report names an image node as LCP.
The preloader is capped to a short cold-load window, but synthetic Lighthouse
may still name its text as LCP on a cold profile. Treat those routes as text
LCP until a report proves otherwise.

### Lighthouse page-weight budgets

`budget.json` enforces route-level `resourceType: "total"` budgets in addition
to the script, stylesheet, font, and image slices. Total route budgets are set
from the latest successful LHCI transfer-size baseline plus roughly 20% headroom,
rounded up to the next 25 KiB. The headroom is for normal compression and build
hash variance, not for feature creep.

| Route | 2026-07-03 baseline | Enforced total budget |
| --- | ---: | ---: |
| `/` | 659.1 KiB | 800 KiB |
| `/about` | 588.5 KiB | 725 KiB |
| `/works` | 700.0 KiB | 775 KiB |
| `/lab` | 579.8 KiB | 700 KiB |
| `/lab/particle-systems` | 576.1 KiB | 700 KiB |
| `/contact` | 571.7 KiB | 700 KiB |
| `/services` | 571.8 KiB | 700 KiB |
| `/resume` | 571.2 KiB | 700 KiB |

When a route intentionally grows, measure it with `pnpm lhci`, update this
table with the new baseline, and keep the budget close enough that accidental
payload regressions fail CI.

`/works` keeps a 135 KiB image-slice cap because Lighthouse can load the first
five AVIF covers in one run. The total route budget remains the real guardrail
for page weight.

For raw `<img>` (used in OG routes only), set `decoding="async"` and
`loading="lazy"` explicitly — `next/image` handles this automatically.

---

## 6. Font Strategy

`next/font/local` loads committed Latin WOFF2 assets from
`src/assets/fonts`. Builds no longer fetch Google Fonts CSS or font binaries;
the exact Inter, Newsreader, JetBrains Mono, and Sacramento files live in the
repo beside their OFL license texts.

Newsreader uses `display: "optional"` because it is the editorial display face:
on slow connections, a stable system fallback for the first paint is less
jarring than a visible serif hot-swap. Inter, JetBrains Mono, and Sacramento keep
`display: "swap"` because they are interface/signature faces where immediate
legibility matters more than avoiding a subtle style swap.

Only the normal Newsreader variable face is wired into the global shell. The
italic WOFF2 is retained in `src/assets/fonts` as source material, but global
italic spans synthesize from the normal face until a route-specific preload can
justify the extra transfer. JetBrains Mono and Sacramento are local,
non-preload faces because they are not first-viewport dependencies on the
audited routes.

---

## 7. Bundle Hygiene

The first-load shared JS is **106 kB** as of MMXXVII. Don't let it grow.
Watch out for:

- Importing all of `framer-motion` instead of `m` + `motion`.
- Importing all of `gsap` instead of named modules from `gsap/all`.
- Adding lodash (use native + small helpers).
- Pulling in `@react-three/fiber` for tiny effects — raw WebGL is smaller.

### R3F exception: `/showreel`

The only intentional Three.js / R3F / drei surface is the 3D chapter carousel on
`/showreel`, because it is real spatial UI: posters are arranged around a
rotating cylinder. It is not a hero shader, hover distortion, or flat fragment
pass, so raw WebGL would be more bespoke code for less maintainable 3D.

The exception is progressive enhancement only:

- `src/app/showreel/page.tsx` renders the complete static chapter list with
  local covers first. That list is the source of truth for crawlers, reduced
  motion, constrained connections, touch devices, and unsupported GPUs.
- `ReelChapterCarouselClient` imports the R3F chunk only after
  `resolveRuntimeGraphicsMode() === "enhanced"`, the document is visible, WebGL2
  probes successfully, and the browser reaches an idle slot.
- `ReelChapterCarousel` mounts the actual `<Canvas>` only while the carousel is
  near the viewport and drops its DPR ceiling to `1.5`, matching the wider WebGL
  cap used elsewhere in the site.
- The smoke suite covers the fallback: with reduced motion on, `/showreel` must
  render four static covers and zero canvases.

Measured during the 2026-07-02 Todo 14 build: the R3F/Three payload emitted as
a lazy dynamic chunk (`.next/static/chunks/2n5p4_aaxeks6.js`, 890,699 B raw /
236,018 B gzip). `/showreel`'s initial `entryJSFiles` did not include that
chunk; it only appears behind the wrapper's idle dynamic import.

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

| Constant   | Old factor at 60fps | Use case                         |
| ---------- | ------------------- | -------------------------------- |
| `K_SLOW`   | `* 0.05`            | Idle-active blends (hero fluid)  |
| `K_HERO`   | `* 0.06`            | Hero shader cursor               |
| `K_GENTLE` | `* 0.08`            | Slant / soft attributes          |
| `K_MID`    | `* 0.12`            | Hover intensity (work cover)     |
| `K_FAST`   | `* 0.18`            | Cursor ring, spotlight, magnetic |
| `K_SNAP`   | `* 0.25`            | Quick snaps                      |

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

| Constant      | Value  | Where                                        |
| ------------- | ------ | -------------------------------------------- |
| `DPR_HERO`    | `1.5`  | HeroShader, HeroFluidDisplacement            |
| `DPR_CANVAS`  | `1.5`  | WorkCoverDisplacement, LabDemo (default)     |
| `DPR_AMBIENT` | `1.25` | NoiseField (passive)                         |
| `DPR_COMPACT` | `1.0`  | LabDemo cards in `/lab` grid (10+ on screen) |

**Tier-scaled.** As of the device-tier pass, `cappedDpr(cap)` multiplies the
cap by the device's `dprScale` (`1` high / `0.85` mid / `0.7` low, floored at
`1.0`) before clamping to `devicePixelRatio`. So a `DPR_HERO` surface renders at
1.5× on a capable desktop and ~1.0× on a weak phone — half the fragments — with
no per-component code change. See § 16.

Always read `cappedDpr(cap)` once per `resize`, not per frame. The
browser can change `devicePixelRatio` when the user zooms.

### Lazy initial sizing in `LabDemo`

`/lab` renders `LabDemo.tsx` as a tiny lazy shell. Each slug maps to exactly one
module in `src/components/lab/demos/`, and compact grid cards do not import
their demo chunk until the shell is near the viewport (`rootMargin: 320px`).

Once a chunk is loaded, the shared `CanvasDemo` runtime still defers each
demo's first `fit()` call (which allocates typed-array stores) until the canvas
`IntersectionObserver` fires. Cards the user never scrolls to never pay the
network, parse, or allocation cost.

```ts
let initialised = false;
const start = () => {
  if (raf) return;
  if (!initialised) {
    fit(); // first paint of this canvas
    initialised = true;
  }
  raf = requestAnimationFrame(tickFrame);
};
```

### Active runtime budget in `/lab`

`src/lib/canvasRuntimeBudget.ts` caps the number of actively ticking lab
canvases. IntersectionObserver still marks every tile as visible/off-screen, but
the registry decides which visible demos are allowed to run:

| Tier | Touch | Active lab canvases |
| ---- | ----- | ------------------- |
| high | no    | 8                   |
| high | yes   | 5                   |
| mid  | no    | 5                   |
| mid  | yes   | 4                   |
| low  | no    | 3                   |
| low  | yes   | 2                   |

Newest visible canvases win the budget; older visible demos pause cleanly and
resume when they re-enter the active set. This prevents a fast scroll through
the grid from letting every near-viewport preview keep its own rAF loop alive.

---

## 12. Shared rAF Bus (`rafBus.ts`)

Paper § "Scroll Management": _"Lenis allows the developers to
synchronize the scroll position with the WebGL rendering loop, ensuring
that every pixel of motion on the screen corresponds exactly to the
user's input."_

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

| Subscriber                      | Priority | Why                                                                                                           |
| ------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| `SmoothScrollProvider` (Lenis)  | `-10`    | Must update scroll FIRST so canvases that read `--scroll-vy` or `getScrollState()` see the new frame's value. |
| `Cursor` (ring follow)          | `0`      | Reads mouse, writes transform.                                                                                |
| `Spotlight` (soft-light radial) | `0`      | Reads mouse, writes transform.                                                                                |

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

## 15. GPU Backend Fallbacks

`src/lib/webgpuHelper.ts` owns the progressive backend selector. It never makes
WebGPU mandatory: reduced-motion, Save-Data/2g, low-tier, software-renderer, and
adapter/device/context failures all stay on the existing renderer.

Fallback order:

1. `WebGPU`
2. `WebGL2`
3. `WebGL1`
4. `Canvas2D`
5. `Static`

Active surfaces:

- `HeroShaderGpu` is dynamically imported only after the runtime graphics gate
  allows live hero graphics. If WebGPU setup fails, it calls back to the
  existing `HeroShader` WebGL path; the static ink background remains the final
  fallback.
- `/lab/particle-systems` attempts WebGPU only for the full playground. Compact
  `/lab` grid previews stay Canvas2D so the index never opens many GPU devices.
  The runtime metric reports the active renderer as `WebGPU` or `Canvas2D`.

## 16. Worker-Backed Lab Simulations

`src/components/lab/runtime/WorkerCanvasDemo.tsx` moves CPU-heavy Canvas2D
simulations off the main thread when `OffscreenCanvas` transfer is available.
The public experience is unchanged; unsupported browsers keep the original
`CanvasDemo` renderer.

Worker-backed full routes:

- `/lab/reaction-diffusion`
- `/lab/boids-flock`
- `/lab/sand-piles`

Rules:

1. Keep compact `/lab` cards on the main thread. Worker creation overhead is
   not worth it for small previews and would create too many workers at once.
2. Mirror the main runtime lifecycle: IO pause, resize, DPR caps, device-tier
   profile changes, pointer state, reseed, and cleanup.
3. Terminate workers on unmount. Do not leave background simulations running
   after route transitions.
4. Treat workers as progressive enhancement. A failed transfer must fall back
   to `CanvasDemo` without user-visible breakage or console errors.

### Remaining roadmap

- **Modulepreload for Lenis.** Add `<link rel="modulepreload" href="...">`
  for the smooth-scroll chunk so first paint doesn't wait on it.
- **View Transitions API.** Once Chromium-stable, replace `RouteCurtain`.
- **Edge runtime for `/api/github`.** Currently Node; Edge would shave
  ~150ms off first paint of `/now`.
- **Service worker offline shell** for `/now`, `/journal`, `/ai`.

---

## 17. Device-Tier Adaptation (`deviceTier.ts` + `frameGate.ts`)

The goal of this pass: run the **same** heavy WebGL on a low-end phone and an
old laptop as on a desktop, with no perceptible scroll jank — and **without
removing or visibly reducing a single effect**. The lever is _internal_ cost
(render resolution, frame-rate, octave count, context count), never the feature
set. This is the technique [immersive-g.com](https://immersive-g.com) and peers
use: identical perception, a fraction of the GPU work.

Physical-device verification lives in
[`docs/LOW_END_DEVICE_VERIFICATION.md`](./LOW_END_DEVICE_VERIFICATION.md). Run
that checklist on Android Chrome after deploy before calling a mobile
performance pass complete.

### The tier model — `src/lib/deviceTier.ts`

`deviceProfile()` resolves once (memoised, re-evaluated on resize/orientation)
into:

| Field           | Meaning                                                                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `tier`          | `"low" \| "mid" \| "high"` from a score over `deviceMemory`, `hardwareConcurrency`, touch, `devicePixelRatio`, shortest viewport edge, and GPU signals |
| `isTouch`       | `(hover: none), (pointer: coarse)`                                                                                                        |
| `reducedMotion` | `prefers-reduced-motion: reduce`                                                                                                          |
| `dprScale`      | `1` / `0.85` / `0.7` — the multiplier `cappedDpr` applies (§ 11)                                                                          |

Scoring is **best-effort and forgiving**: missing signals (Safari hides
`deviceMemory`) are treated as "capable" so we never over-penalise a device we
can't measure. Reduced-motion never lets a device sit above `mid`.

GPU secondary signals now feed the same score:

- A one-time renderer-string check downgrades software renderers
  (`SwiftShader`, `llvmpipe`, WARP, Microsoft Basic Render Driver) and weak
  mobile GPU families when the browser exposes them.
- A tiny first-frame WebGL timing probe runs after paint and can downgrade the
  memoised profile if the GPU takes too long to finish a trivial shader pass.
- Profile changes dispatch `creative-folio:device-profile-change`; lab canvases
  re-fit their DPR and runtime particle density when that event fires.

Renderer and timing signals are exposed on `deviceProfile().gpu` and mirrored by
the `/lab/particle-systems` runtime metric as data attributes:

| Signal                       | Values / thresholds                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| `rendererSignal`             | `software` (-3), `legacy-mobile` (-1), `capable` (+1), `unknown` (0), `unavailable` (-2) |
| `timingAdjustment`           | `0` under 16ms, `-1` over 16ms, `-2` over 24ms for the first-frame shader fence        |
| `timingStatus`               | `pending` before the post-paint probe, then `measured` once the probe has completed   |
| profile-change event         | Fires after resize/orientation and after the timing probe changes diagnostics or tier |

The automated proof lives in `e2e/device-tier.spec.ts`: Playwright fakes a
mid CPU profile, a capable renderer string, and a slow GPU fence, then asserts
the route downgrades to `low` and emits
`creative-folio:device-profile-change`.

**SSR-safe:** on the server it returns `high` so markup is never gated
server-side; the real tier resolves on the client after mount (every consumer
already runs detection inside `useEffect`).

Resolvers built on the profile:

- `targetFps(cost)` — `"ambient" | "hero" | "interactive"` → target FPS.
  Returns `0` (uncapped) on **high tier always**, so desktop is unchanged.
  Mid/low get real caps (ambient 45/30, hero 50/40, interactive uncapped/40).
- `fbmOctaves(full)` — drops one fbm octave **only on low tier** (the smallest,
  sub-pixel octave a phone display cannot resolve). mid/high keep the full count.

> Rule: never gate behaviour on raw `innerWidth`. Route every capability
> decision through `deviceTier` so the whole app shares one classification.

### The frame gate — `src/lib/frameGate.ts`

`makeFrameGate(fps)` returns a tiny closure `(now) => boolean`. A render loop
**advances its simulation every animation frame** (so time-based motion and
damping stay perfectly smooth) but only **issues GL draws when the gate opens**:

```ts
const gate = makeFrameGate(targetFps("ambient"));
const tick = (now) => {
  lastActive = damp(lastActive, active, K.K_SLOW, dt); // every frame
  if (gate(now)) {
    gl.uniform1f(uTime, t);
    gl.drawArrays(/* ... */); // coalesced
  }
  raf = requestAnimationFrame(tick);
};
```

`fps <= 0` → gate is always open (one branch, zero state) — the high-tier path.

### Applied to

| Surface                 | Cost class    | Low-tier behaviour                       |
| ----------------------- | ------------- | ---------------------------------------- |
| `HeroShader`            | `hero`        | 40fps draw, DPR ~1.0, 3 fbm octaves      |
| `HeroFluidDisplacement` | `hero`        | 40fps draw, DPR ~1.0, 3 fbm octaves      |
| `WorkCoverDisplacement` | `interactive` | 40fps; **no GL context at all on touch** |
| `NoiseField`            | `ambient`     | 30fps draw, DPR ~1.0                     |

### Work covers: the context-budget fix

`WorkCoverDisplacement` only ever lives inside the **cursor-following hover
peek**, which is `opacity: 0` until `mouseenter` — an event that never fires on
touch. On phones it was therefore spinning up 5 (home) to 16 (`/works`) WebGL
contexts that **no touch user can ever see**, blowing past the per-page context
budget mobile browsers enforce and triggering context-loss stalls. The fix: on
touch the component renders nothing (the identical `next/image` cover already
sits behind it). On `pointer: fine` it behaves exactly as before. Reduced-motion
still renders the static `<img>` fallback (desktop has a cursor to reveal it).

### WebGL context LRU cap

`src/lib/glContextRegistry.ts` is the WebGL-only context cap. It derives its cap
from `deviceProfile()`:

| Profile              | Max live WebGL contexts |
| -------------------- | ----------------------- |
| reduced motion touch | 2                       |
| reduced motion fine  | 3                       |
| low touch            | 2                       |
| low fine             | 3                       |
| mid touch            | 4                       |
| mid fine             | 5                       |
| high touch           | 5                       |
| high fine            | 8                       |

When live contexts exceed the cap, the registry loses only the least-recently
used offscreen WebGL context. If every WebGL context is currently visible, it
does not blank a visible hero just to satisfy the cap; the next offscreen
transition reconciles the budget.

Canvas2D lab demos are not part of this registry. They are scheduled by
`src/lib/canvasRuntimeBudget.ts`, which pauses and resumes rAF loops instead of
losing GPU contexts.

WebGPU canvases are also outside the WebGL LRU because they do not expose the
`WEBGL_lose_context` extension. Current WebGPU usage is limited to one visible
hero canvas or one full particle playground; if future work adds multiple live
WebGPU canvases, add a matching WebGPU device budget before shipping it.

### Root overflow guard (mobile "shoved to one side")

A separate but related mobile bug: with no `overflow-x: hidden` at the root, any
descendant using `100vw`, a wide fixed element, or negative letter-spacing
bleeding past the edge let the whole page scroll sideways — read as "the site is
off-center, not full-screen". `globals.css` now clips `overflow-x` and sets
`max-width: 100%` on `html, body` (and `width: 100%` on `body`). The
`AtmosphereMode` shockwave was also switched from `100vw/100vh` to `inset: 0`
(`100vw` includes the scrollbar gutter).
