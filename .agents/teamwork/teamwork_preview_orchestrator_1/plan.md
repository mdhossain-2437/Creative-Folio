# Execution Plan: De-sloppifying MMXXVII Portfolio Landing Page

## Objectives
Reduce AI-design-slop score from 13/100 to under 10 (Clean tier) by resolving:
1. R1: Body Text Contrast and System Theme Respect (L >= 0.85, contrast >= #d4d4d8, prefers-color-scheme)
2. R2: Section Labels Typography De-sloppification (eliminate uppercase + tracking-widest kicker tags; use natural sentence case / direct H2s)
3. R3: Process Flow De-sloppification (replace abstract "1 · 2 · 3" generic step sequences with concrete authentic product & engineering workflows with interface context/artifacts)
4. R4: Grounded and Verifiable Stat Metrics (link every metric directly to public source, live project, GitHub footprint, or external proof)

## Quality Gate
- `pnpm typecheck` zero errors
- `pnpm lint` zero errors
- `pnpm build` zero errors

## Phased Approach
1. **Phase 0: Comprehensive Survey**
   - Dispatch 3 Explorers across:
     - Explorer 1: R1 Theme, colors, styles, CSS variables, `globals.css`, Tailwind config, dark mode / prefers-color-scheme handling, contrast L >= 0.85 audit.
     - Explorer 2: R2 Typography, kicker tags, section labels, tracking-widest, text-transform uppercase across landing page components.
     - Explorer 3: R3 & R4 Process flow section (`Process.tsx` / `data.ts`) and Stats banner metrics (`Stats.tsx`, `site.ts`, etc.) and their verification sources.
2. **Phase 1: Synthesis & PROJECT.md Formulation**
   - Synthesize all findings into `PROJECT.md` specifying architecture, feature inventory, exact component files, code layout, and interface contracts.
3. **Phase 2: Milestone Execution (Iterative Direct Loop)**
   - M1: Implement R1 (Theme respect + text contrast L >= 0.85)
   - M2: Implement R2 (Typography & section kicker de-sloppification)
   - M3: Implement R3 (Process flow de-sloppification with concrete artifacts)
   - M4: Implement R4 (Grounded and verifiable stats)
   - For each milestone: Explorer -> Worker -> 2 Reviewers -> 2 Challengers -> Forensic Auditor -> Gate.
4. **Phase 3: Final Verification & Audit**
   - Run full quality gate (`typecheck`, `lint`, `build`).
   - Final review and handoff report back to parent.
