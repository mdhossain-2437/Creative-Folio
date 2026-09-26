# Project: Creative-Folio De-sloppification MMXXVII

## Architecture
- Framework: Next.js 16 App Router, React 19, TypeScript 5.9, Tailwind CSS 3.4.
- Theme system: Custom atmosphere mode engine with 5 modes (`aura`, `storm`, `stillness`, `eink`, `terminal`), where `eink` serves as the high-contrast editorial light mode (`--bg: #efece9`, `--fg: #0c0c0c`).
- Motion & Canvas: GSAP, Lenis smooth scroll, rAF bus (`rafBus.ts`), raw WebGL2 canvas with off-screen `IntersectionObserver` pause and DPR clamping.
- Data Layer: Canonical identity in `src/lib/site.ts`, works, experiments, process workflows, and verified stats in `src/lib/data.ts`.

## Feature Inventory
Every feature from the Survey phase appears here with its assigned milestone:
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Body Text Contrast ($L \ge 0.85$) | Upgrade body copy classes from mid-grey opacities (`text-warmwhite/60..85`) to `text-warmwhite/90` ($L^* = 85.45$, contrast 13.8:1 $\ge$ `#d4d4d8`) | M1 | Survey 1 |
| 2 | System Theme Respect (`prefers-color-scheme`) | Adapt color scheme to visitor's system preference by defaulting to `eink` light mode when light scheme is requested, adding `@media` CSS fallback and responsive viewport theme-color | M1 | Survey 1 |
| 3 | Eliminate Uppercase Kicker Labels | Remove all decorative uppercase kicker labels (`§01..§12`) preceding section H2 headings across all landing page sections so H2s lead directly | M1 | Survey 2 |
| 4 | De-sloppify Typography Tracking | Replace `uppercase tracking-widest` (22% spacing) with natural sentence case or clean `font-mono text-xs tracking-normal` on functional badges and shared navigation | M1 | Survey 2 |
| 5 | Concrete Engineering Workflows | Replace abstract "1 · 2 · 3" numbered steps and generic verbs with 4 authentic engineering workflows in `data.ts` and `Process.tsx` | M1 | Survey 3 |
| 6 | Visual Artifact Previews | Embed interactive/tangible technical artifact panels (Token Matrix, GLSL Fragment, rAF Bus, Audit Scorecard) into the Process carousel | M1 | Survey 3 |
| 7 | Verifiable Grounded Stat Metrics | Upgrade `Stat` schema with proof links and replace vanity numbers with 4 cited public metrics (Lighthouse 100/100, 127 Repos, 30 Lab Demos, 05 Editions) | M1 | Survey 3 |
| 8 | Interactive Cited Stat Banner | Refactor `Stats.tsx` with clickable cards linking directly to public proofs (`pagespeed.web.dev`, GitHub, `/lab`, `/portfolios`) with verified contrast | M1 | Survey 3 |
| 9 | Quality Gate & Build Verification | Verify `pnpm typecheck`, `pnpm lint`, and `pnpm build` pass with zero errors across all changes | M1 | Quality Gate |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: MMXXVII Landing Page De-sloppification | Full implementation of R1 (Contrast & Theme), R2 (Typography & Labels), R3 (Process Flow), R4 (Grounded Stats) & Quality Gate | None | DONE |

## Interface Contracts

### Atmosphere & Theme Contract (`AtmosphereMode.tsx` ↔ `globals.css`)
- Type: `Mode = "aura" | "storm" | "stillness" | "eink" | "terminal"`
- HTML attribute: `document.documentElement.dataset.atmosphere = mode`
- System preference: When `!saved && !urlOverride`, if `window.matchMedia("(prefers-color-scheme: light)").matches === true`, default mode is `"eink"`.
- CSS variable binding:
  - Dark modes (`aura`, `storm`, `stillness`, `terminal`): `--bg: #070708` / `#0a0a0b`, `--fg: #efece9`.
  - Light mode (`eink`): `--bg: #efece9`, `--fg: #0c0c0c`, `--accent: #1f1f1f`, `color-scheme: light`.

### Process Workflow Contract (`src/lib/data.ts` ↔ `src/components/sections/Process.tsx`)
- Type `Phase`:
  ```ts
  export type Phase = {
    id: string;
    num: string;
    name: string;
    tagline: string;
    description: string;
    duration: string;
    deliverables: string[];
    context: {
      domain: string;
      artifactTitle: string;
      artifactType: "matrix" | "code" | "diagram" | "audit";
      details: string[];
    };
    steps?: string[]; // kept for backward compatibility if needed
  };
  ```

### Stat Metric Contract (`src/lib/data.ts` ↔ `src/components/sections/Stats.tsx`)
- Type `Stat`:
  ```ts
  export type Stat = {
    label: string;
    value: string;
    sub?: string;
    href: string;
    source: string;
    proof: string;
    external: boolean;
  };
  ```

## Code Layout

- **M1 (Theme & Contrast)**:
  - `src/app/globals.css`
  - `src/components/ui/AtmosphereMode.tsx`
  - `src/app/layout.tsx`
  - Body paragraph classes across `src/components/sections/`
- **M2 (Typography & Labels)**:
  - `src/components/sections/Hero.tsx`
  - `src/components/sections/Manifesto.tsx`
  - `src/components/sections/SelectedWorks.tsx`
  - `src/components/sections/ShowreelTeaser.tsx`
  - `src/components/sections/MilestonesScroll.tsx`
  - `src/components/sections/NowTeaser.tsx`
  - `src/components/sections/Testimonials.tsx`
  - `src/components/sections/Awards.tsx`
  - `src/components/sections/Capabilities.tsx`
  - `src/components/sections/PortfoliosTeaser.tsx`
  - `src/components/sections/JournalPreview.tsx`
  - `src/components/sections/SiteMap.tsx`
  - `src/components/layout/Footer.tsx`
  - `src/components/ui/SectionLabel.tsx`
  - `src/components/ui/SectionRail.tsx`
  - `src/components/ui/SectionProgressDots.tsx`
  - `src/components/layout/PageHero.tsx`
- **M3 (Process Flow)**:
  - `src/lib/data.ts` (process array & types)
  - `src/components/sections/Process.tsx`
  - `src/app/process/page.tsx`
- **M4 (Stats Banner)**:
  - `src/lib/data.ts` (stats array & types)
  - `src/components/sections/Stats.tsx`
