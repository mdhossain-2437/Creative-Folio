# Original User Request

## 2026-09-26T05:23:36Z

Reduce the AI-design-slop score of the MMXXVII portfolio landing page (https://2027.delowarhossain.dev/) from 13/100 to under 10 (Clean tier) by resolving four identified slop patterns across typography, color scheme, workflow visualization, and stat verification.

Working directory: d:/Creative-Folio
Integrity mode: development

## Requirements

### R1. Body Text Contrast and System Theme Respect
Ensure all body copy on dark backgrounds achieves a minimum lightness of L >= 0.85 (contrast equal to or exceeding #d4d4d8), eliminating mid-grey low-contrast defaults. Respect the visitor's prefers-color-scheme rather than forcing dark mode unconditionally.

### R2. Section Labels Typography De-sloppification
Eliminate all section labels styled with text-transform: uppercase combined with positive letter-spacing (tracking-widest). Present section titles in natural sentence case or let section H2 headings lead directly without decorative uppercase kicker labels.

### R3. Process Flow De-sloppification
Replace abstract, numbered "1 · 2 · 3" step sequences containing generic action verbs with concrete, authentic product and engineering workflows featuring real interface context, deliverables, or visual artifacts.

### R4. Grounded and Verifiable Stat Metrics
Transform the stat banner into a set of specific, verifiable, and cited claims. Every featured metric must be directly linked to a public source, live project, GitHub footprint, or verifiable external proof.

## Acceptance Criteria

### Contrast & Themes
- [ ] All body text on dark backgrounds has computed lightness L >= 0.85.
- [ ] Color scheme adapts to system preference (prefers-color-scheme) without breaking existing theme styling.

### Typography & Section Labels
- [ ] Zero section labels or section kicker tags use text-transform: uppercase with letter-spacing > 0.
- [ ] Section titles adopt natural sentence case or clean, non-spaced typography.

### Process & Workflow
- [ ] Process section contains no generic "1 · 2 · 3" numbered step sequences with generic verbs.
- [ ] Every displayed process step includes concrete UI/deliverable context.

### Stat Claims & Evidence
- [ ] Every stat item in the banner links directly to a verifiable external source or specific portfolio proof (no unsubstantiated vanity numbers).

### Quality Gate
- [ ] All existing automated verification commands (pnpm typecheck, pnpm lint, and pnpm build) pass cleanly with zero errors.

## 2026-09-26T06:30:55Z

Upgrade core framework to Next.js 16.3.x and latest compatible dependencies, resolve custom cursor mount latency so it appears instantly on pointer movement, optimize physics and WebGL/GSAP animation pipelines for raw-HTML/CSS speed with strict reduced-motion adherence, and commit and push the verified release directly to origin/main.

Working directory: d:/Creative-Folio
Integrity mode: development

## Requirements

### R1. Framework & Dependency Upgrades
Upgrade Next.js to latest 16.3.x (16.3.6), and align compatible ecosystem dependencies (React, TypeScript, Tailwind CSS, Three.js, GSAP, Lenis) without breaking existing APIs, configurations, or type safety.

### R2. Instant Custom Cursor Appearance
Fix the multi-second delay on custom cursor appearance. Eliminate the excessive 7–12 second idle backoff in LazyChrome.tsx by initializing/mounting the custom cursor immediately upon client hydration or initial pointer movement without degrading Core Web Vitals (LCP/INP).

### R3. High-Performance Motion, Physics & Reduced Motion
Accelerate animation and physics execution to achieve instantaneous HTML/CSS-like responsiveness:
- Enforce strict prefers-reduced-motion compliance across all GSAP timelines, physics interactions, and shader passes.
- Optimize frame-budget execution, rAF loops, and viewport IntersectionObserver pauses for consistent 60/120fps frame rates with zero layout thrashing or main-thread blocking.

### R4. Verification & Main Branch Publishing
Execute the local quality gate (pnpm typecheck && pnpm lint && pnpm build). Once all checks pass with zero errors, review git status and commit and push directly to origin/main in compliance with repository operating procedures.

## Acceptance Criteria

### Dependency & Framework
- [ ] package.json reflects Next.js 16.3.x (16.3.6) and compatible updated libraries.
- [ ] Zero dependency or build conflicts; pnpm typecheck, pnpm lint, and pnpm build compile cleanly across all routes with 0 errors.

### Cursor & Interactivity
- [ ] Custom cursor appears instantly upon initial pointer movement, eliminating the 7–12s idle wait.
- [ ] No regression in Largest Contentful Paint (LCP) or First Input Delay (INP).

### Physics, Motion & Shaders
- [ ] All animations, kinetic triggers, and WebGL shaders strictly honor prefers-reduced-motion: reduce.
- [ ] Animation and shader loops pause when off-screen and clean up properly on unmount.

### Verification & Git Delivery
- [ ] All local quality checks pass without weakening lint or TypeScript rules.
- [ ] Verified changes committed and pushed directly to origin/main.
