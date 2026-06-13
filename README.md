# Creative-Folio — Delowar Hossain · MMXXVII

An Awwward-winning–grade, typography-first, immersive creative-developer
portfolio for **Delowar Hossain**. Heavy WebGL + custom GLSL shaders + smooth
scroll, engineered to feel like a raw HTML/CSS page on everything from a
high-refresh desktop to a low-end phone.

> "The interface should disappear, leaving only the canvas and the content."

- **Live:** https://delowarhossain.dev
- **Edition:** MMXXVII / 03.27
- **Studio:** The Compiled Thought

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | **Next.js 16** (App Router, RSC, Turbopack) |
| Language | **TypeScript** (strict) |
| Styling | **Tailwind CSS 3** + custom design tokens |
| Type | Newsreader (display serif), Inter (UI), JetBrains Mono (code), Sacramento (signature) |
| Motion | **GSAP** + **Lenis** (smooth scroll), **Framer Motion** (transitions) |
| WebGL | **Custom GLSL shaders** on raw WebGL/WebGL2 — small bundle, large effect |
| 3D | **Three.js** + **@react-three/fiber** + **drei** (showreel carousel) |
| Icons | Lucide |
| Package manager | **pnpm** |

This project uses **pnpm** (see `pnpm-lock.yaml`). Do not install with npm/yarn —
it will desync the lockfile.

---

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build
pnpm start        # serve the production build
pnpm lint         # eslint
pnpm typecheck    # tsc --noEmit
```

---

## Pages

| Route | What |
| --- | --- |
| `/` | Home — shader hero, manifesto, selected works, milestones, now, stats, testimonials, awards, capabilities, process, editions, journal, sitemap |
| `/works` · `/works/[slug]` | Selected works + case-study template |
| `/lab` · `/lab/[slug]` | Generative experiments (canvas/shader cards) |
| `/about` | Story, philosophy, journey |
| `/resume` | Long-form CV with sticky TOC |
| `/journal` · `/journal/[slug]` | Studio journal index + posts (Atom + JSON feeds) |
| `/services` | Engagements & process |
| `/contact` | Inquiry form (services, budget, message) |
| `/showreel` | Reel + WebGL chapter carousel (desktop) |
| `/now` | Live GitHub activity (ISR, 30 min) |
| `/portfolios` | Edition archive across years |
| `/brand` | Identity kit — logo, wordmark, palette, downloadable assets |
| `/archive` · `/awards` · `/colophon` · `/colors` · `/changelog` · `/uses` · `/process` · `/atlas` · `/achievements` | Supporting pages |
| `/legal/privacy` · `/legal/terms` | Plain-language legal |
| `/ai` + `ai.txt` / `llms.txt` / `llms-full.txt` | AI-engine surfaces |

---

## Signature features

- **Custom hero shader** (`src/components/webgl/HeroShader.tsx`) — cursor-attracted
  fbm noise field with warm/cool aurora ramp, halo, film grain, vignette.
- **Hero fluid displacement** (`src/components/webgl/HeroFluidDisplacement.tsx`) —
  WebGL2 curl-noise ripple layered over the headline with `mix-blend-screen`.
- **Work-cover displacement** (`src/components/works/WorkCoverDisplacement.tsx`) —
  per-cover fluid + chromatic-aberration shader on hover.
- **Ambient noise field** (`src/components/webgl/NoiseField.tsx`) — pre-baked
  256² tileable noise texture, one fetch per octave.
- **Smooth scroll** (Lenis) coupled to WebGL via a shared rAF bus.
- **Custom cursor**, magnetic letters, ghost cursors, marquee bands, scramble
  text, split-text reveals, section rail, command palette, atmosphere modes.

---

## Performance & mobile architecture

Heavy WebGL on a phone is normally where immersive sites fall apart. This one
adapts **internal cost** (render resolution, frame-rate, WebGL context count,
scroll strategy) to the device — **without removing or visibly reducing a single
effect**. Every shader, cursor, and displacement is present on every device; only
the off-screen pixel cost changes.

Core pieces:

- **`src/lib/deviceTier.ts`** — one source of truth for device capability
  (`low` / `mid` / `high` from `deviceMemory`, `hardwareConcurrency`, touch, DPR,
  viewport), plus `targetFps()` and `fbmOctaves()` resolvers. SSR-safe, memoised.
- **`src/lib/frameGate.ts`** — coalesces canvas *draws* to a target FPS while the
  simulation still advances every frame (motion stays smooth). High tier is
  always uncapped — desktop is byte-for-byte unchanged.
- **`src/lib/dpr.ts`** — DPR caps now multiply by the device tier, so every canvas
  downscales on weak hardware with zero per-component changes.
- **Mobile scroll** — touch devices use **native momentum scroll** (never stalls),
  while `--scroll-vy` / `--scroll-progress` keep updating so scroll-coupled effects
  are untouched. Desktop keeps full Lenis smooth scroll.
- **Work covers** skip their WebGL context entirely on touch — they only live
  inside a cursor-following peek that never opens without a pointer, which on
  phones otherwise blew the browser's per-page WebGL context budget.

Full write-up: **[`docs/PERFORMANCE.md`](docs/PERFORMANCE.md)**.
Build/engineering story: **[`docs/CASE-STUDY.md`](docs/CASE-STUDY.md)**.

---

## Documentation

| Doc | Purpose |
| --- | --- |
| [`docs/CASE-STUDY.md`](docs/CASE-STUDY.md) | The build story: goals, constraints, decisions, the mobile-perf pass |
| [`docs/PERFORMANCE.md`](docs/PERFORMANCE.md) | Performance architecture reference |
| [`docs/KNOWLEDGE_BASE.md`](docs/KNOWLEDGE_BASE.md) | Component + system knowledge base |
| [`docs/SEO.md`](docs/SEO.md) | SEO / structured-data strategy |
| [`docs/BRIEF.md`](docs/BRIEF.md) | Original creative brief |
| [`BRANDKIT.md`](BRANDKIT.md) · [`/brand`](https://delowarhossain.dev/brand) | Identity system + downloadable assets |
| [`SECURITY.md`](SECURITY.md) | Security policy |
| [`AGENTS.md`](AGENTS.md) | Agent operating manual for this repo |

---

## Conventions

- **Add a new animated canvas?** Import from `deviceTier` / `frameGate`, size with
  `cappedDpr(...)` (already tier-aware), gate draws with
  `makeFrameGate(targetFps(<class>))`, and pause off-screen with an
  `IntersectionObserver` (`threshold: 0.01`). Never gate by raw `innerWidth` —
  go through `deviceTier`.
- **Content** lives in `src/lib/data.ts`; site-wide config in `src/lib/site.ts`.
- **Reduced-motion** is honoured everywhere: animations either disable, snap to
  the end state, or fall back to native behaviour.
- The hero/noise shaders gracefully no-op when WebGL is unavailable.
