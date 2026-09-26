# Plan: Creative-Folio Next.js 16.3.6 Upgrade & Motion Optimization

## Goal
Fulfill all requirements in ORIGINAL_REQUEST.md (header '## 2026-09-26T06:30:55Z'):
- R1: Framework & Dependency Upgrades (Next.js 16.3.6 and compatible ecosystem)
- R2: Instant Custom Cursor Appearance (Eliminate 7–12s idle backoff in LazyChrome.tsx)
- R3: High-Performance Motion, Physics & Reduced Motion (prefers-reduced-motion, rAF pause, 60/120fps frame budget)
- R4: Local Quality Gate (typecheck, lint, build) & Commit/Push to origin/main

## Execution Phases
1. **Phase 0: Survey**
   - Dispatch 3 parallel Explorers:
     - Explorer 1 (Dependencies): package.json, Next.js 16.3.6, React 19, TypeScript, Three.js, GSAP, Lenis, pnpm lock, breaking changes.
     - Explorer 2 (Cursor): LazyChrome.tsx, Cursor.tsx, hydration & pointer event listeners, performance & CWV (LCP/INP).
     - Explorer 3 (Motion & Physics & Shaders): GSAP timelines, WebGL/Three.js canvases, rAF loops, prefers-reduced-motion queries, IntersectionObserver pauses, cleanup hooks, and git status.
   - Aggregate survey reports into PROJECT.md.

2. **Phase 1: Milestone Decomposition & Implementation**
   - Worker dispatch with exact Explorer findings and integrity warning.
   - Milestone M1: Core Framework & Dependencies Upgrade (Next.js 16.3.6, lockfile, typecheck/lint/build validation).
   - Milestone M2: Instant Custom Cursor Mount & Responsive Hydration (LazyChrome.tsx, pointer events).
   - Milestone M3: High-Performance Motion, Physics, Shaders & prefers-reduced-motion compliance.

3. **Phase 2: Independent Review, Adversarial Challenge & Forensic Audit**
   - 2 Reviewers independently checking correctness, completeness, and adherence to AGENTS.md.
   - 2 Challengers checking performance regressions, boundary cases, reduced motion toggles, and frame budgets.
   - 1 Forensic Auditor verifying zero cheating, no dummy mocks, authentic upgrades and implementations.
   - Gate evaluation in GATE_STATUS.md.

4. **Phase 3: Verification & Main Branch Publishing**
   - Run full quality gate: `pnpm typecheck && pnpm lint && pnpm build`.
   - Worker checks git status, commits with conventional commit message, and pushes to `origin/main`.
   - Verify push status on remote.

5. **Phase 4: Synthesis & Sentinel Delivery**
   - Compile final handoff.md with verification evidence.
   - Send completion message to Sentinel.
