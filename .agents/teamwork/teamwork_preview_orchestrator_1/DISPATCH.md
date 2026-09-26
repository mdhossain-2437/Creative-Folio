## 2026-09-26T05:24:10Z
Reduce the AI-design-slop score of the MMXXVII portfolio landing page (https://2027.delowarhossain.dev/) from 13/100 to under 10 (Clean tier) by resolving four identified slop patterns across typography, color scheme, workflow visualization, and stat verification.

Requirements:
- R1. Body Text Contrast and System Theme Respect: Ensure all body copy on dark backgrounds achieves minimum lightness L >= 0.85 (contrast >= #d4d4d8). Respect visitor's prefers-color-scheme rather than forcing dark mode unconditionally.
- R2. Section Labels Typography De-sloppification: Eliminate all section labels styled with text-transform: uppercase combined with positive letter-spacing (tracking-widest). Present section titles in natural sentence case or let section H2 headings lead directly without decorative uppercase kicker labels.
- R3. Process Flow De-sloppification: Replace abstract, numbered "1 · 2 · 3" step sequences containing generic action verbs with concrete, authentic product and engineering workflows featuring real interface context, deliverables, or visual artifacts.
- R4. Grounded and Verifiable Stat Metrics: Transform the stat banner into a set of specific, verifiable, and cited claims. Every featured metric must be directly linked to a public source, live project, GitHub footprint, or verifiable external proof.

Quality Gate:
Run and ensure `pnpm typecheck`, `pnpm lint`, and `pnpm build` pass with zero errors.
