# Handoff Report: R1 Theme & Contrast Technical Survey

> **From**: Theme & Contrast Explorer (`teamwork_preview_explorer_survey_1`)  
> **To**: Orchestrator (`teamwork_preview_orchestrator_1`) & Implementing Worker  
> **Date**: 2026-09-26  
> **Status**: Complete (Hard Handoff)  
> **Detailed Companion File**: `.agents/teamwork/teamwork_preview_explorer_survey_1/survey_r1.md`  

---

## 1. Observation

1. **Current Body Text Classes and Low-Contrast Defaults**:
   - In `src/components/sections/Hero.tsx:116`:
     `<p className="md:col-span-7 max-w-xl text-balance font-sans text-base leading-relaxed text-warmwhite/85 md:text-lg">`
   - In `src/components/sections/Manifesto.tsx:28`:
     `<span className="italic text-warmwhite/60">`
   - In `src/components/sections/Manifesto.tsx:101`:
     `<p className="mt-3 font-sans text-sm leading-relaxed text-warmwhite/65">`
   - In `src/components/sections/ShowreelTeaser.tsx:22`:
     `<p className="mt-6 max-w-sm font-sans text-sm leading-relaxed text-warmwhite/80">`
   - In `src/components/ui/StickyTimeline.tsx:98`:
     `<p className="mt-6 max-w-sm font-sans text-sm leading-relaxed text-warmwhite/60">`
   - In `src/components/ui/StickyTimeline.tsx:158`:
     `<p className="mt-4 max-w-xl text-balance font-sans text-base leading-relaxed text-warmwhite/70">`
   - In `src/components/sections/NowTeaser.tsx:18`:
     `<p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-warmwhite/65">`
   - In `src/components/sections/Stats.tsx:41`:
     `<p className="mt-3 font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">`
   - In `src/components/sections/Awards.tsx:23` & `56`:
     `<p className="md:col-span-5 max-w-md font-sans text-base leading-relaxed text-warmwhite/65 md:text-lg">` and `<p className="relative max-w-prose font-sans text-sm leading-relaxed text-warmwhite/65">`
   - In `src/components/sections/Capabilities.tsx:32`:
     `<p className="font-sans text-sm leading-relaxed text-warmwhite/70 md:col-span-4 md:text-base">`
   - In `src/components/sections/Process.tsx:205` & `220`:
     `<p className="font-sans text-sm leading-relaxed text-warmwhite/65">` and `<span className="normal-case tracking-normal text-[13px] text-warmwhite/80">`
   - In `src/components/sections/PortfoliosTeaser.tsx:40` & `82`:
     `<p className="mt-4 max-w-prose font-sans text-sm leading-relaxed text-warmwhite/65 md:text-base">` and `<p className="line-clamp-3 font-sans text-sm leading-relaxed text-warmwhite/65">`
   - In `src/components/sections/SiteMap.tsx:63`:
     `<p className="mt-2 font-sans text-sm leading-relaxed text-warmwhite/55">`

2. **Mathematical Color Computation & Verification**:
   - `#d4d4d8` (reference): $Y = 0.6604$, CIELAB $L^* = 85.02$, Contrast Ratio vs `#070708` is $13.62:1$, vs `#0c0c0c` is $13.24:1$.
   - `text-warmwhite/65` on `#070708`: blended `#9e9c9a`, $L^* = 64.47$ (FAIL).
   - `text-warmwhite/70` on `#070708`: blended `#a9a7a6`, $L^* = 68.62$ (FAIL).
   - `text-warmwhite/80` on `#070708`: blended `#c1bebc`, $L^* = 77.16$ (FAIL).
   - `text-warmwhite/85` on `#070708`: blended `#cccac7`, $L^* = 81.40$ (FAIL — falls short of $L^* = 85.02$).
   - `text-warmwhite/90` on `#070708`: blended `#d8d5d3`, $L^* = 85.45$ (PASS — exceeds $85.02$, Contrast $13.79:1$).
   - `text-bone` (`#e5e2e0`): $L^* = 90.06$ (PASS, Contrast $16.32:1$).
   - `text-warmwhite` (`#efece9`): $L^* = 93.55$ (PASS, Contrast $17.11:1$).

3. **Current Theme & Color Scheme Setup**:
   - `src/components/ui/AtmosphereMode.tsx:98`:
     `let initial: Mode = "aura";` (unconditionally forced dark mode on mount).
   - `src/app/globals.css:10`:
     `:root { color-scheme: dark; }` (unconditionally dark root).
   - `src/app/layout.tsx:172`:
     `export const viewport: Viewport = { themeColor: "#0c0c0c", ... }`.
   - `src/app/layout.tsx:207`:
     `<body className="bg-ink-900 text-warmwhite ...">`.
   - Existing light mode asset in `src/app/globals.css:31-36` and `BRANDKIT.md:390`:
     `:root[data-atmosphere="eink"] { --bg: #efece9; --fg: #0c0c0c; --accent: #1f1f1f; color-scheme: light; }`

---

## 2. Logic Chain

1. **Premise 1**: Requirement R1 requires all body text on dark backgrounds to achieve lightness $L \ge 0.85$ (contrast $\ge$ `#d4d4d8`).
2. **Step 2 (From Obs 2)**: Calculating perceptual lightness via CIELAB / OKLCH proves that opacity does not scale linearly with perceived lightness. Opacities below 0.90 (`text-warmwhite/60`, `/65`, `/70`, `/75`, `/80`, `/85`) all result in $L^* < 85.02$ against `#070708` and `#0c0c0c`.
3. **Step 3 (From Obs 1 & 2)**: Only `text-warmwhite/90` ($L^* = 85.45$), `text-bone` ($L^* = 90.06$), and `text-warmwhite` ($L^* = 93.55$) satisfy $L \ge 0.85$. Therefore, replacing all body copy classes across the 15 landing page sections with `text-warmwhite/90` eliminates mid-grey low-contrast defaults while maintaining visual hierarchy under 100% `text-warmwhite` headings.
4. **Premise 2**: Requirement R1 requires respecting the visitor's `prefers-color-scheme` without breaking existing theme styling.
5. **Step 5 (From Obs 3)**: The site already possesses an editorial light mode, `eink`, in its 5-mode atmosphere system (`aura`, `storm`, `stillness`, `eink`, `terminal`).
6. **Step 6 (From Obs 3)**: Currently, visitors are forced into dark mode because `AtmosphereMode.tsx` initializes `initial = "aura"` without checking `window.matchMedia("(prefers-color-scheme: light)").matches`.
7. **Step 7**: By initializing `initial = prefersLight ? "eink" : "aura"`, listening for system scheme changes when the user has not manually overridden, providing a `@media (prefers-color-scheme: light)` fallback in `globals.css`, and updating `viewport.themeColor` and body classes in `layout.tsx`, the site honors system preferences natively with zero breakage to the existing atmosphere modes.

---

## 3. Caveats

- **WebGL Canvas Interaction in Light Mode**: WebGL shaders (`HeroShader.tsx`, `HeroShaderGpu.tsx`) are calibrated for dark ink backgrounds. In `eink` mode, `globals.css` already disables heavy film grain and vignettes. The worker should ensure canvas backgrounds blend smoothly (or retain their contained stage) in light mode.
- **Eyebrow Kicker Labels (Cross-over with R2)**: Some small labels (`text-[10px] uppercase tracking-widest`) are currently `text-warmwhite/65` or `text-warmwhite/55`. While Requirement R2 addresses typography and tracking of section labels, elevating their contrast to `text-warmwhite/85` or `text-peach` or `text-warmwhite/90` aligns with contrast compliance.

---

## 4. Conclusion

Requirement R1 is fully analyzed, scoped, and ready for immediate implementation by the Worker:
1. **Body Text Contrast**: Upgrading all body text, paragraph descriptions, and article notes from `text-warmwhite/60`, `/65`, `/70`, `/75`, `/80` to **`text-warmwhite/90`** (or `text-bone` / `text-warmwhite`) guarantees $L^* \ge 85.45$ and contrast $\ge 13.8:1$, eliminating mid-grey low-contrast defaults.
2. **System Theme Respect**: Updating `AtmosphereMode.tsx` to detect `prefers-color-scheme: light` and default to the existing `eink` mode, updating `src/app/globals.css` with `@media (prefers-color-scheme: light)` rules and section overrides, updating `src/app/layout.tsx` `viewport.themeColor`, and using `bg-[var(--bg)] text-[var(--fg)]` on body respects the visitor's preference seamlessly.

---

## 5. Verification Method

To verify the implementation once applied by the Worker:
1. **Automated Quality Gate**:
   ```bash
   pnpm typecheck && pnpm lint && pnpm build
   ```
   Must exit with code 0.
2. **Lightness & Contrast Invalidation Check**:
   - In Chrome DevTools or inspect tool, verify computed color of body text on landing page sections is `#d8d5d3` or lighter ($L^* \ge 85.0$).
   - Verify no body text element computes to a color darker than `#d4d4d8`.
3. **Theme Switch Verification**:
   - In DevTools Rendering panel, emulate `prefers-color-scheme: light` -> page must display in the `eink` paper theme.
   - Emulate `prefers-color-scheme: dark` -> page must display in `aura` theme.
   - Pressing `T` must still cycle through all 5 modes (`aura`, `storm`, `stillness`, `eink`, `terminal`).
