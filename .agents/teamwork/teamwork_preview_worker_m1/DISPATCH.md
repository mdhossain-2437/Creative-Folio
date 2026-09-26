## 2026-09-26T05:35:45Z
You are the Implementing Worker for Milestone M1 (MMXXVII Landing Page De-sloppification) of Creative-Folio.
Your working directory is: d:\Creative-Folio\.agents\teamwork\teamwork_preview_worker_m1

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

MANDATORY INPUTS (READ BEFORE STARTING WORK):
1. d:\Creative-Folio\.agents\teamwork\ORIGINAL_REQUEST.md
2. d:\Creative-Folio\AGENTS.md
3. d:\Creative-Folio\PROJECT.md
4. d:\Creative-Folio\.agents\teamwork\teamwork_preview_explorer_survey_1\survey_r1.md (Theme & Contrast R1 Blueprint)
5. d:\Creative-Folio\.agents\teamwork\teamwork_preview_explorer_survey_2\survey_r2.md (Typography & Section Labels R2 Blueprint)
6. d:\Creative-Folio\.agents\teamwork\teamwork_preview_explorer_survey_3\survey_r3_r4.md (Process R3 & Stats R4 Blueprint)

FILE WRITE OWNERSHIP:
You have exclusive write ownership over:
- src/app/globals.css
- src/components/ui/AtmosphereMode.tsx
- src/app/layout.tsx
- src/lib/data.ts
- src/components/sections/Process.tsx
- src/app/process/page.tsx
- src/components/sections/Stats.tsx
- src/components/sections/Hero.tsx
- src/components/sections/Manifesto.tsx
- src/components/sections/SelectedWorks.tsx
- src/components/sections/ShowreelTeaser.tsx
- src/components/sections/MilestonesScroll.tsx
- src/components/sections/NowTeaser.tsx
- src/components/sections/Testimonials.tsx
- src/components/sections/Awards.tsx
- src/components/sections/Capabilities.tsx
- src/components/sections/PortfoliosTeaser.tsx
- src/components/sections/JournalPreview.tsx
- src/components/sections/SiteMap.tsx
- src/components/layout/Footer.tsx
- src/components/ui/SectionLabel.tsx
- src/components/ui/SectionRail.tsx
- src/components/ui/SectionProgressDots.tsx
- src/components/layout/PageHero.tsx
- src/components/ui/StickyTimeline.tsx

IMPLEMENTATION TASKS:

Task 1 — R1: Body Text Contrast and System Theme Respect:
1. In src/components/ui/AtmosphereMode.tsx:
   - When no saved atmosphere is in localStorage and no ?atmosphere URL override is present, check `window.matchMedia("(prefers-color-scheme: light)").matches`. If light mode is preferred, initialize mode to "eink" (the official editorial light mode). Otherwise, default to "aura".
   - Listen for system preference changes when the user has not manually overridden.
2. In src/app/globals.css:
   - Add `@media (prefers-color-scheme: light)` rule on `:root:not([data-atmosphere])` defaulting to `--bg: #efece9; --fg: #0c0c0c; --accent: #1f1f1f; color-scheme: light;` for seamless SSR/hydration.
   - Refine `:root[data-atmosphere="eink"]` and light mode styles so all landing page sections and cards render with high-contrast text and warm paper background.
3. In src/app/layout.tsx:
   - Update viewport themeColor to support light/dark media queries.
   - Update body class to `bg-[var(--bg)] text-[var(--fg)]` so atmosphere modes seamlessly control canvas and body background.
4. Across all landing page section components (Hero, Manifesto, ShowreelTeaser, StickyTimeline, NowTeaser, Awards, Capabilities, PortfoliosTeaser, SiteMap, Process, Stats, etc.):
   - Elevate all body copy, descriptions, and subtitles from low-contrast mid-greys (`text-warmwhite/60`, `/65`, `/70`, `/75`, `/80`, `/85`) to `text-warmwhite/90` (computed CIELAB L* = 85.45, contrast 13.8:1 >= #d4d4d8) or `text-bone` / `text-warmwhite`. Ensure every body text element on dark background achieves lightness L >= 0.85.

Task 2 — R2: Section Labels Typography De-sloppification:
1. Eliminate all section kicker tags styled with `uppercase tracking-widest` (e.g. `<p className="... uppercase tracking-widest ...">§01 — Manifesto</p>`, `§02 — Selected Works`, etc.) across all landing page sections:
   - Hero.tsx, Manifesto.tsx, SelectedWorks.tsx, ShowreelTeaser.tsx, MilestonesScroll.tsx, NowTeaser.tsx, Testimonials.tsx, Awards.tsx, Capabilities.tsx, PortfoliosTeaser.tsx, JournalPreview.tsx, SiteMap.tsx, Footer.tsx.
   - Let the section H2 headings lead directly with clean, art-directed editorial typography.
2. On shared navigation and functional UI (SectionRail.tsx, SectionProgressDots.tsx, SectionLabel.tsx, PageHero.tsx):
   - Replace any `uppercase tracking-widest` with clean natural sentence case or `font-mono text-xs tracking-normal`.

Task 3 — R3: Process Flow De-sloppification:
1. In src/lib/data.ts:
   - Replace generic agency phases (Discovery/Design/Prototype/Production) and abstract numbered steps with 4 authentic creative engineering workflows:
     * Workflow 01: Editorial Scaffolding & Token Architecture (Tailwind tokens, CSS variables, WCAG AA contrast L >= 0.85, Next.js 16 metadataBase, JSON-LD + llms.txt)
     * Workflow 02: GLSL Shader Pipeline & WebGL Canvas (WebGL2 canvas, fbm noise, DPR clamp 1.75, IntersectionObserver 0.01 threshold GPU pause)
     * Workflow 03: Kinetic Choreography & Shared rAF Bus (Lenis smooth scroll, zero React state on scroll hot path, unified rafBus.ts priority queue, frame-rate independent exponential damping in damp.ts)
     * Workflow 04: Zero-Jank Hardening & Verification Gate (Strict CSP targeting Grade A on securityheaders.com, INP < 50ms, 0.00 CLS, TypeScript 5.9 strict gate)
   - Ensure the Phase interface in data.ts supports deliverables and context.
2. In src/components/sections/Process.tsx:
   - Eliminate all `uppercase tracking-widest` labels and pills.
   - Remove the `<ol>` numbered step sequence (`01..05`). Replace with semantic deliverable cards showing real interface context.
   - Replace empty decorative giant watermark numbers with an embedded Visual Artifact Preview box for each slide (e.g. Token & Contrast Matrix, GLSL Fragment snippet, rAF Bus Sync diagram, Production Audit Scorecard).
   - Harmonize src/app/process/page.tsx so it builds cleanly.

Task 4 — R4: Grounded and Verifiable Stat Metrics:
1. In src/lib/data.ts:
   - Update `Stat` type to include `href`, `source`, `proof`, `external`.
   - Replace vanity numbers with 4 verified public metrics:
     * "100" — Lighthouse Performance (links to `https://pagespeed.web.dev/analysis?url=https%3A%2F%2F2027.delowarhossain.dev%2F`)
     * "127" — Public Repositories (links to `https://github.com/mdhossain-2437`)
     * "30" — Interactive Lab Demos (links to `/lab`)
     * "05" — Shipped Portfolio Editions (links to `/portfolios`)
2. In src/components/sections/Stats.tsx:
   - Render stats as interactive cards (`<a>` / `<Link>`).
   - Include external link icon (e.g. `ArrowUpRight`), source domain badge, and verified high-contrast proof description (L >= 0.85).
   - Eliminate `uppercase tracking-widest` from `{s.label}`.

VERIFICATION COMMANDS (MANDATORY):
After completing the changes, you MUST run:
1. `pnpm typecheck`
2. `pnpm lint`
3. `pnpm build`
All three MUST pass with 0 errors.

OUTPUT:
Write your handoff report to:
`d:\Creative-Folio\.agents\teamwork\teamwork_preview_worker_m1\handoff.md`
Include:
- Files modified
- Exact verification commands executed and raw outputs
- Confirmation of R1 (contrast L >= 0.85 & theme adaptation), R2 (zero uppercase tracking-widest on section labels), R3 (concrete workflows & artifacts), R4 (verified links)
Send a completion message back to parent.
