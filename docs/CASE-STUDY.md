# Case Study — Creative-Folio (MMXXVII)

> The build story of [delowarhossain.dev](https://delowarhossain.dev): how an
> immersive, shader-heavy creative-developer portfolio stays as smooth as a raw
> HTML/CSS page on everything from a 144Hz desktop to a low-end phone.
>
> Companions: [`PERFORMANCE.md`](./PERFORMANCE.md) · [`KNOWLEDGE_BASE.md`](./KNOWLEDGE_BASE.md) · [`BRIEF.md`](./BRIEF.md)

---

## 1. The brief

A personal portfolio that reads as an *award-grade studio site*, not a template:
editorial typography, custom WebGL/GLSL, smooth scroll, a custom cursor, and a
dense set of "MMXXVII" micro-interactions — while still being fast, accessible,
and indexable. The north star for feel and performance was
[immersive-g.com](https://immersive-g.com): heavy WebGL that nonetheless feels
weightless.

**Non-negotiables**

- Typography-first. The interface disappears; type and canvas carry it.
- Every effect is real WebGL/GLSL or real motion — no faked gradients.
- Fully responsive and genuinely usable on phones.
- Accessible: reduced-motion honoured, keyboard navigable, semantic markup.
- Static-first for speed and SEO.

---

## 2. Stack & shape

- **Next.js 16** App Router (RSC + Turbopack), **TypeScript** strict.
- **Tailwind CSS 3** with custom tokens; Newsreader / Inter / JetBrains Mono /
  Sacramento type system.
- **Raw WebGL/WebGL2 GLSL** for the hero, fluid displacement, work covers, and
  ambient noise — chosen over a 3D framework where the effect is a single
  full-screen fragment pass (smaller bundle, full control).
- **Three.js + @react-three/fiber + drei** only where real 3D is needed (the
  showreel chapter carousel).
- **GSAP** (ScrollTrigger for the pinned Process scroller) + **Lenis** (smooth
  scroll) + **Framer Motion** (transitions).
- **Static-first**: all content lives in `src/lib/data.ts`; pages are SSG, with
  ISR only where data must stay fresh (`/now` pulls live GitHub activity).

---

## 3. The performance philosophy

Every frame has a budget — 16.67ms at 60Hz, 8.33ms at 120Hz. The architecture
is built so **99% of frames never touch React**:

- **Scroll hot path with zero re-renders.** Scroll velocity/progress are written
  to CSS custom properties (`--scroll-vy`, `--scroll-progress`) and a singleton
  `refs` object, not React state. CSS-coupled motion reads the vars directly;
  WebGL reads the ref inside its own loop.
- **Shared rAF bus.** One `requestAnimationFrame` for the app, priority-ordered
  so Lenis updates scroll *before* any canvas reads it — no one-frame lag.
- **Frame-rate-independent damping** (`damp.ts`) so cursor/camera follow is
  identical on 60/120/144/240Hz panels.
- **Off-screen pause.** Every animated canvas pauses its loop via
  `IntersectionObserver`.
- **Pre-baked noise** sampled as a texture instead of per-pixel hashing.

This got the desktop experience into the target league. The phone did not
follow — which became the defining problem of the MMXXVII pass.

---

## 4. The mobile problem

On phones and low-end laptops the site loaded, then **stalled and buffered while
scrolling**, and the layout could shift sideways out of full-screen. Profiling
and a read of the architecture surfaced four distinct root causes:

1. **Lenis `syncTouch` hijacked native touch scroll.** Re-driving the page from
   JS every frame means one dropped frame on a weak GPU becomes a visible stall;
   a run of them reads as "frozen mid-flick".
2. **Two full-screen fragment shaders stacked on the hero**, each running 4-octave
   fbm per pixel at DPR 1.5 — brutal on a 3×-DPR phone GPU.
3. **A WebGL context per work cover.** The homepage spun up 5, `/works` up to 16.
   Mobile browsers cap simultaneous contexts (~8–16); exceeding it triggers
   context-loss and stalls. Worse, these covers live inside a *cursor-following*
   peek that can never open on a touchscreen — the contexts did nothing visible.
4. **No central capability model.** Each component guessed independently
   (`pointer: coarse` here, `prefers-reduced-motion` there), and nothing checked
   the actual CPU/GPU/memory budget — so low-end *desktops* suffered too.

A fifth, layout bug: no root `overflow-x` guard, so any `100vw` child (e.g. the
AtmosphereMode shockwave) or edge-bleeding element let the page scroll sideways.

---

## 5. The constraint: remove nothing

The explicit rule was that **no feature could be removed or visibly reduced** —
years of immersive detail had to survive on mobile. That rules out the easy
answer (strip effects on small screens) and forces the real one: adapt *internal*
cost while keeping the *perceived* result identical. Exactly what the reference
studios do.

---

## 6. The solution: device-tier adaptation

A single capability model drives everything.

- **`src/lib/deviceTier.ts`** classifies the device once (`low`/`mid`/`high`)
  from `deviceMemory`, `hardwareConcurrency`, touch, DPR, and viewport — forgiving
  of unknown signals, SSR-safe, memoised. It exposes `dprScale`, `targetFps(cost)`,
  and `fbmOctaves(full)`.
- **`src/lib/frameGate.ts`** coalesces canvas *draws* to a target FPS while the
  simulation advances every frame, so motion stays smooth. High tier is always
  uncapped → desktop is byte-for-byte unchanged.
- **`src/lib/dpr.ts`** multiplies every DPR cap by the tier, so all canvases
  downscale on weak hardware with no per-component edits.

Per-surface outcome (low tier): hero shaders → ~1.0 DPR, 40fps, 3 fbm octaves;
ambient noise → 30fps; work covers → **no GL context on touch at all** (the
identical `next/image` cover already renders behind the never-opened peek).

**Scroll** was the highest-leverage fix: touch devices now use **native momentum
scroll** (composited off-thread, never stalls), while `--scroll-vy` /
`--scroll-progress` keep updating from real scroll events — so every
scroll-coupled effect is untouched. Desktop keeps full Lenis.

**Layout** was guarded at the root: `html, body { overflow-x: hidden; max-width:
100% }`, and the shockwave switched from `100vw/100vh` to `inset: 0`.

Full reference: [`PERFORMANCE.md` § 16](./PERFORMANCE.md#16-device-tier-adaptation-devicetierts--framegatets).

---

## 7. What stayed the same

Everything visible. On a phone you still get the animated aurora hero, the fluid
displacement ripple, the smooth scroll feel, the marquees, the section rail, the
atmosphere modes — the full immersive surface. The only differences are ones the
eye can't see: fewer off-screen render pixels, a coalesced repaint rate, and one
fewer sub-pixel noise octave on the weakest devices.

Cursor-bound effects (custom cursor, cursor trail, magnetic letters, ghost
cursors, spotlight) are desktop-only **by nature** — there is no pointer to drive
them on a touchscreen — and were already gated as such.

---

## 8. Verification

- `pnpm build` — clean compile, TypeScript clean, all static pages generated.
- The desktop path is unchanged by construction (high tier = uncapped gate,
  `dprScale = 1`, full octaves, full Lenis).
- Recommended manual pass: DevTools device emulation (low-end mobile) + 4× CPU
  throttle, scroll for 5s — frame chart should stay green; toggle
  `prefers-reduced-motion` and confirm the page is still navigable.

---

## 9. Engineering principles that generalise

- **One capability model, not scattered guesses.** Route every device decision
  through `deviceTier`.
- **Adapt internals, not features.** Resolution, frame-rate, and octave count are
  invisible knobs; the effect itself is the contract.
- **Native beats clever on touch.** The OS compositor scrolls better than any JS
  loop on a weak device.
- **Budget the scarce resource.** WebGL contexts are finite on mobile — never
  hold one for something the user can't see.
- **Guard the root.** A single `overflow-x: hidden` prevents a whole class of
  "shoved sideways" layout bugs.
