# R1 Technical Survey: Body Text Contrast & System Theme Respect

> **Author**: Theme & Contrast Explorer  
> **Date**: 2026-09-26  
> **Status**: Completed  
> **Target Requirement**: R1 (Body Text Contrast L >= 0.85 & System Theme Respect)  
> **Target Workspace**: `d:\Creative-Folio`  

---

## 1. Executive Summary

Requirement R1 mandates two critical de-sloppification outcomes for the MMXXVII portfolio:
1. **Body Text Contrast**: Ensure all body copy on dark backgrounds achieves minimum lightness $L \ge 0.85$ (contrast $\ge$ `#d4d4d8` / Zinc-300), eliminating mid-grey low-contrast defaults (`text-warmwhite/65`, `text-warmwhite/60`, `text-warmwhite/55`).
2. **System Theme Respect**: Respect the visitor's `prefers-color-scheme` (light vs. dark) rather than forcing dark mode unconditionally, while preserving existing atmosphere modes (`aura`, `storm`, `stillness`, `eink`, `terminal`) and editorial aesthetic integrity.

### Key Investigation Discoveries:
- **The Opacity Trap ($0.85 \ne L^* 85$)**: The codebase frequently uses `text-warmwhite/65` ($L^* \approx 64.5$) and `text-warmwhite/70` ($L^* \approx 68.6$) as low-contrast defaults. Even `text-warmwhite/85` ($L^* = 81.40$) fails the $L \ge 0.85$ requirement because perceptual lightness ($L^*$ in CIELAB / OKLCH) is non-linear. To achieve $L \ge 0.85$ and equal or exceed `#d4d4d8` ($L^* = 85.02$), body copy must be set to **`text-warmwhite/90`** ($L^* = 85.45$, contrast $13.8:1$), **`text-bone`** ($L^* = 90.06$, contrast $16.3:1$), or pure **`text-warmwhite`** ($L^* = 93.55$, contrast $17.1:1$).
- **Forced Dark Mode Mechanism**: Dark mode is currently hardcoded in three places:
  1. `AtmosphereMode.tsx` initializes `initial = "aura"` unconditionally when no URL param is present, setting `document.documentElement.dataset.atmosphere = "aura"`.
  2. `src/app/globals.css` sets `:root { color-scheme: dark; }` unconditionally.
  3. `src/app/layout.tsx` hardcodes `<body className="bg-ink-900 text-warmwhite ...">` and `viewport: { themeColor: "#0c0c0c" }`.
- **Pre-existing Light Mode Asset (`eink`)**: The studio already has an official, beautifully conceived light theme mode: **`eink`** (`--bg: #efece9`, `--fg: #0c0c0c`, `--accent: #1f1f1f`, `color-scheme: light`). However, `eink` is currently masked because sections have hardcoded dark background classes (`bg-ink-950`, `bg-ink-900`).
- **Zero-Disruption Architecture**: By routing `prefers-color-scheme: light` into the existing `eink` atmosphere mode, we honor system preferences natively with zero new dependencies and zero breakage to the four dark atmosphere modes (`aura`, `storm`, `stillness`, `terminal`).

---

## 2. Mathematical Color Science & Contrast Audit

### 2.1 The Standard Reference: `#d4d4d8` (Tailwind Zinc-300)
- **sRGB Value**: `rgb(212, 212, 216)` (Normalized: `[0.8314, 0.8314, 0.8471]`)
- **Relative Luminance ($Y$)**: `0.6604`
- **CIELAB $L^*$**: `85.02`
- **OKLCH $L$**: `0.865`
- **Contrast Ratio against `#070708` (`ink-950`)**: `13.62 : 1` (Exceeds WCAG AAA 7.0:1)
- **Contrast Ratio against `#0c0c0c` (`ink-900`)**: `13.24 : 1` (Exceeds WCAG AAA 7.0:1)

### 2.2 Mathematical Evaluation of `warmwhite` (`#efece9`) Opacities on Ink Backgrounds
Measured against primary studio background `#070708` (`ink-950`) and secondary background `#0c0c0c` (`ink-900`):

| Tailwind Class | Alpha | Blended Hex on `ink-950` | CIELAB $L^*$ | HSL Lightness | WCAG Contrast | Verdict ($L \ge 0.85$ / $\ge$ `#d4d4d8`) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `text-warmwhite/55` | 0.55 | `#878584` | 55.68 | 52.35% | 5.48 : 1 | ❌ **FAIL** (Severely low mid-grey) |
| `text-warmwhite/60` | 0.60 | `#92908f` | 59.93 | 56.67% | 6.34 : 1 | ❌ **FAIL** (Mid-grey default) |
| `text-warmwhite/65` | 0.65 | `#9e9c9a` | 64.47 | 61.18% | 7.36 : 1 | ❌ **FAIL** (Common studio body default) |
| `text-warmwhite/70` | 0.70 | `#a9a7a6` | 68.62 | 65.69% | 8.40 : 1 | ❌ **FAIL** (Subhead/lead default) |
| `text-warmwhite/75` | 0.75 | `#b5b3b1` | 73.05 | 70.20% | 9.63 : 1 | ❌ **FAIL** (Below threshold) |
| `text-warmwhite/80` | 0.80 | `#c1bebc` | 77.16 | 74.71% | 10.89 : 1 | ❌ **FAIL** (Below threshold) |
| `text-warmwhite/85` | 0.85 | `#cccac7` | 81.40 | 79.02% | 12.31 : 1 | ❌ **FAIL** (Falls short of $L^* = 85.02$) |
| `text-warmwhite/88` | 0.88 | `#d3d1ce` | 83.92 | 81.76% | 13.21 : 1 | ❌ **FAIL** (Borderline) |
| **`text-warmwhite/90`** | **0.90** | **`#d8d5d3`** | **85.45** | **83.73%** | **13.79 : 1** | ✅ **PASS** (Optimal editorial body copy) |
| **`text-warmwhite/95`** | **0.95** | **`#e3e1de`** | **89.61** | **88.04%** | **15.43 : 1** | ✅ **PASS** (High emphasis lead body) |
| **`text-bone`** (`#e5e2e0`)| 1.00 | `#e5e2e0` | **90.06** | **88.82%** | **16.32 : 1** | ✅ **PASS** (Solid token alternative) |
| **`text-warmwhite`** | 1.00 | `#efece9` | **93.55** | **92.55%** | **17.11 : 1** | ✅ **PASS** (Headline & strong body) |

### 2.3 Verdict on Body Text Standard
- **Primary Body Copy Standard**: Change all body text, paragraph descriptions, and article notes from `text-warmwhite/60`, `text-warmwhite/65`, `text-warmwhite/70`, `text-warmwhite/75` to **`text-warmwhite/90`**.
- **Alternative / Token**: `text-bone` (`#e5e2e0`) or pure `text-warmwhite` can also be used where solid opacity is preferred.
- **Visual Hierarchy Maintained**: Setting body text to `text-warmwhite/90` leaves `text-warmwhite` (100%) available for primary headlines, creating distinct, refined editorial hierarchy while guaranteeing compliance with $L \ge 0.85$.

---

## 3. System Theme (`prefers-color-scheme`) Strategy

### 3.1 Current Architecture & Deficiencies
1. **`src/components/ui/AtmosphereMode.tsx`**:
   ```tsx
   let initial: Mode = "aura";
   try {
     const params = new URLSearchParams(window.location.search);
     const fromUrl = params.get("atmosphere");
     if (isMode(fromUrl)) initial = fromUrl;
   } catch {}
   applyMode(initial);
   ```
   `initial` is unconditionally hardcoded to `"aura"`, ignoring the user's OS preference entirely.
2. **`src/app/globals.css`**:
   `:root` sets `color-scheme: dark;` unconditionally.
3. **`src/app/layout.tsx`**:
   Hardcodes `themeColor: "#0c0c0c"` in viewport, and `<body className="bg-ink-900 text-warmwhite ...">`.
4. **Section Background Hardcoding**:
   Sections across `src/components/sections/` hardcode `bg-ink-900` or `bg-ink-950`. When `data-atmosphere="eink"` is enabled, these sections remain dark because `.bg-ink-900` and `.bg-ink-950` have higher specificity than the body background.

### 3.2 The Proposed Adaptation Strategy
We connect `prefers-color-scheme` directly into the existing atmosphere system without adding any heavy theme libraries or breaking the 5-stop atmosphere cycle:

#### A. Mount-time Detection in `AtmosphereMode.tsx`
```tsx
const prefersLight =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-color-scheme: light)").matches;

let initial: Mode = prefersLight ? "eink" : "aura";

try {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("atmosphere");
  if (isMode(fromUrl)) initial = fromUrl;
} catch {
  // ignore SSR
}
applyMode(initial);
```

#### B. Dynamic Listener for OS Theme Switch
If the user switches their OS theme while browsing and has not manually clicked/cycled the atmosphere pill during the session, update the mode:
```tsx
useEffect(() => {
  const mq = window.matchMedia("(prefers-color-scheme: light)");
  const onChange = (e: MediaQueryListEvent) => {
    if (userManuallySelectedRef.current) return;
    const nextMode: Mode = e.matches ? "eink" : "aura";
    setMode(nextMode);
    applyMode(nextMode);
  };
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}, []);
```

#### C. SSR / Pre-hydration CSS Fallback in `src/app/globals.css`
Before JavaScript mounts, browsers honoring `prefers-color-scheme: light` must not flash dark:
```css
@media (prefers-color-scheme: light) {
  :root:not([data-atmosphere="aura"]):not([data-atmosphere="storm"]):not([data-atmosphere="stillness"]):not([data-atmosphere="terminal"]) {
    --bg: #efece9;
    --fg: #0c0c0c;
    --rule: rgba(12, 12, 12, 0.12);
    --accent: #1f1f1f;
    color-scheme: light;
  }
}
```

#### D. Viewport Theme Color in `src/app/layout.tsx`
Update `viewport` to use media query-aware `themeColor`:
```ts
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#efece9" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0c" },
  ],
  width: "device-width",
  initialScale: 1,
};
```
And change `<body>` in `src/app/layout.tsx`:
```tsx
<body className="bg-[var(--bg)] text-[var(--fg)] font-sans antialiased selection:bg-peach selection:text-ink-900">
```

#### E. Robust Styling for `eink` Mode in `src/app/globals.css`
Empower `:root[data-atmosphere="eink"]` (and the light media query) to style all sections, cards, borders, and text cleanly:
```css
:root[data-atmosphere="eink"] .bg-ink-950,
@media (prefers-color-scheme: light) {
  :root:not([data-atmosphere="aura"]):not([data-atmosphere="storm"]):not([data-atmosphere="stillness"]):not([data-atmosphere="terminal"]) .bg-ink-950 {
    background-color: #f7f5f2 !important;
  }
}

:root[data-atmosphere="eink"] .bg-ink-900,
@media (prefers-color-scheme: light) {
  :root:not([data-atmosphere="aura"]):not([data-atmosphere="storm"]):not([data-atmosphere="stillness"]):not([data-atmosphere="terminal"]) .bg-ink-900 {
    background-color: #efece9 !important;
  }
}

:root[data-atmosphere="eink"] .text-warmwhite,
@media (prefers-color-scheme: light) {
  :root:not([data-atmosphere="aura"]):not([data-atmosphere="storm"]):not([data-atmosphere="stillness"]):not([data-atmosphere="terminal"]) .text-warmwhite {
    color: #0c0c0c !important;
  }
}

:root[data-atmosphere="eink"] [class*="text-warmwhite/"],
@media (prefers-color-scheme: light) {
  :root:not([data-atmosphere="aura"]):not([data-atmosphere="storm"]):not([data-atmosphere="stillness"]):not([data-atmosphere="terminal"]) [class*="text-warmwhite/"] {
    color: #1a1a1a !important;
  }
}

:root[data-atmosphere="eink"] [class*="border-warmwhite/"],
@media (prefers-color-scheme: light) {
  :root:not([data-atmosphere="aura"]):not([data-atmosphere="storm"]):not([data-atmosphere="stillness"]):not([data-atmosphere="terminal"]) [class*="border-warmwhite/"] {
    border-color: rgba(12, 12, 12, 0.12) !important;
  }
}
```
This guarantees that when `eink` is selected or `prefers-color-scheme: light` is active, the entire page renders in a high-contrast, editorial paper aesthetic with WCAG AAA compliance.

---

## 4. Landing Page Body Copy Audit (Section by Section)

The following table provides the exhaustive audit of every landing page section, specifying the current low-contrast class, line number, computed lightness, proposed replacement, and resulting metrics:

| Section & Component | File Path | Line | Current Class | Current $L^*$ | Proposed Class | New $L^*$ | Contrast vs Ink | Role / Text Element |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero** | `src/components/sections/Hero.tsx` | 93 | `text-warmwhite/65` | 64.47 | `text-warmwhite/90` | 85.45 | 13.8:1 | Eyebrow: `Folio MMXXVII` |
| **Hero** | `src/components/sections/Hero.tsx` | 116 | `text-warmwhite/85` | 81.40 | `text-warmwhite/90` | 85.45 | 13.8:1 | Lead body: `Creative Developer...` |
| **Manifesto** | `src/components/sections/Manifesto.tsx` | 28 | `text-warmwhite/60` | 59.93 | `text-warmwhite/90` | 85.45 | 13.8:1 | Statement: `where typography...` |
| **Manifesto** | `src/components/sections/Manifesto.tsx` | 47 | `text-warmwhite/85` | 81.40 | `text-warmwhite/90` | 85.45 | 13.8:1 | Practitioner card description |
| **Manifesto** | `src/components/sections/Manifesto.tsx` | 101 | `text-warmwhite/65` | 64.47 | `text-warmwhite/90` | 85.45 | 13.8:1 | Pillar body description |
| **SelectedWorks** | `src/components/sections/SelectedWorks.tsx` | 152 | `text-warmwhite/55` | 55.68 | `text-warmwhite/90` | 85.45 | 13.8:1 | Work category label |
| **SelectedWorks** | `src/components/sections/SelectedWorks.tsx` | 154 | `text-warmwhite/55` | 55.68 | `text-warmwhite/90` | 85.45 | 13.8:1 | Work stack tags |
| **ShowreelTeaser**| `src/components/sections/ShowreelTeaser.tsx` | 20 | `text-warmwhite/60` | 59.93 | `text-warmwhite/90` | 85.45 | 13.8:1 | Subtitle: `one quiet reel.` |
| **ShowreelTeaser**| `src/components/sections/ShowreelTeaser.tsx` | 22 | `text-warmwhite/80` | 77.16 | `text-warmwhite/90` | 85.45 | 13.8:1 | Reel intro body copy |
| **Milestones** | `src/components/sections/MilestonesScroll.tsx` | 13 | `text-warmwhite/70` | 68.62 | `text-warmwhite/90` | 85.45 | 13.8:1 | Subtitle: `One slow, deliberate climb.` |
| **StickyTimeline**| `src/components/ui/StickyTimeline.tsx` | 98 | `text-warmwhite/60` | 59.93 | `text-warmwhite/90` | 85.45 | 13.8:1 | Timeline rail instructions |
| **StickyTimeline**| `src/components/ui/StickyTimeline.tsx` | 158 | `text-warmwhite/70` | 68.62 | `text-warmwhite/90` | 85.45 | 13.8:1 | Milestone chapter card body |
| **NowTeaser** | `src/components/sections/NowTeaser.tsx` | 16 | `text-warmwhite/60` | 59.93 | `text-warmwhite/90` | 85.45 | 13.8:1 | Subtitle: `doing right now.` |
| **NowTeaser** | `src/components/sections/NowTeaser.tsx` | 18 | `text-warmwhite/65` | 64.47 | `text-warmwhite/90` | 85.45 | 13.8:1 | Now section body copy |
| **Stats** | `src/components/sections/Stats.tsx` | 41 | `text-warmwhite/55` | 55.68 | `text-warmwhite/85` | 81.40 | 12.3:1 | Metric claim labels (see R4) |
| **Testimonials** | `src/components/sections/Testimonials.tsx` | 13 | `text-warmwhite/60` | 59.93 | `text-warmwhite/90` | 85.45 | 13.8:1 | Subtitle: `until quotes are verified.` |
| **Testimonials** | `src/components/sections/Testimonials.tsx` | 26 | `text-warmwhite/85` | 81.40 | `text-warmwhite/90` | 85.45 | 13.8:1 | Testimonial quote body |
| **Testimonials** | `src/components/sections/Testimonials.tsx` | 46 | `text-warmwhite/65` | 64.47 | `text-warmwhite/85` | 81.40 | 12.3:1 | Author title & company |
| **AwardsSection** | `src/components/sections/Awards.tsx` | 20 | `text-warmwhite/60` | 59.93 | `text-warmwhite/90` | 85.45 | 13.8:1 | Subtitle: `Ledger` |
| **AwardsSection** | `src/components/sections/Awards.tsx` | 23 | `text-warmwhite/65` | 64.47 | `text-warmwhite/90` | 85.45 | 13.8:1 | Recognition intro body |
| **AwardsSection** | `src/components/sections/Awards.tsx` | 56 | `text-warmwhite/65` | 64.47 | `text-warmwhite/90` | 85.45 | 13.8:1 | Award item summary body |
| **Capabilities** | `src/components/sections/Capabilities.tsx` | 14 | `text-warmwhite/60` | 59.93 | `text-warmwhite/90` | 85.45 | 13.8:1 | Subtitle: `in detail.` |
| **Capabilities** | `src/components/sections/Capabilities.tsx` | 32 | `text-warmwhite/70` | 68.62 | `text-warmwhite/90` | 85.45 | 13.8:1 | Service summary body |
| **ProcessSection**| `src/components/sections/Process.tsx` | 59 | `text-warmwhite/60` | 59.93 | `text-warmwhite/90` | 85.45 | 13.8:1 | Header: `to` |
| **ProcessSection**| `src/components/sections/Process.tsx` | 204 | `text-warmwhite/85` | 81.40 | `text-warmwhite/90` | 85.45 | 13.8:1 | Pinned phase summary body |
| **ProcessSection**| `src/components/sections/Process.tsx` | 205 | `text-warmwhite/65` | 64.47 | `text-warmwhite/90` | 85.45 | 13.8:1 | Grid phase summary body |
| **ProcessSection**| `src/components/sections/Process.tsx` | 220 | `text-warmwhite/80` | 77.16 | `text-warmwhite/90` | 85.45 | 13.8:1 | Process step description |
| **ProcessSection**| `src/components/sections/Process.tsx` | 232 | `text-warmwhite/75` | 73.05 | `text-warmwhite/90` | 85.45 | 13.8:1 | Deliverables item text |
| **PortfoliosTeaser**| `src/components/sections/PortfoliosTeaser.tsx` | 40 | `text-warmwhite/65` | 64.47 | `text-warmwhite/90` | 85.45 | 13.8:1 | Section intro body |
| **PortfoliosTeaser**| `src/components/sections/PortfoliosTeaser.tsx` | 82 | `text-warmwhite/65` | 64.47 | `text-warmwhite/90` | 85.45 | 13.8:1 | Portfolio edition description |
| **JournalPreview**| `src/components/sections/JournalPreview.tsx` | 15 | `text-warmwhite/60` | 59.93 | `text-warmwhite/90` | 85.45 | 13.8:1 | Subtitle: `on the craft.` |
| **SiteMap** | `src/components/sections/SiteMap.tsx` | 63 | `text-warmwhite/55` | 55.68 | `text-warmwhite/90` | 85.45 | 13.8:1 | Nav group item note body |
| **Footer** | `src/components/layout/Footer.tsx` | 73 | `text-warmwhite/60` | 59.93 | `text-warmwhite/90` | 85.45 | 13.8:1 | Subtitle: `Have an idea?` |
| **Footer** | `src/components/layout/Footer.tsx` | 144 | `text-warmwhite/55` | 55.68 | `text-warmwhite/85` | 81.40 | 12.3:1 | Quote note description |

---

## 5. Implementation Roadmap for the Worker

The following sequence outlines the exact changes the implementing Worker should perform:

### Step 1: Update Theme Fallback and System Preference in `src/app/globals.css`
1. Under `:root`, keep default dark tokens for SSR.
2. Add `@media (prefers-color-scheme: light)` block for `:root:not([data-atmosphere="aura"]):not([data-atmosphere="storm"]):not([data-atmosphere="stillness"]):not([data-atmosphere="terminal"])`.
3. Enhance `:root[data-atmosphere="eink"]` and light mode styles to cover `.bg-ink-950`, `.bg-ink-900`, `.text-warmwhite`, `[class*="text-warmwhite/"]`, and `[class*="border-warmwhite/"]`.

### Step 2: Update Viewport Theme Color & Body in `src/app/layout.tsx`
1. Change `viewport.themeColor` from a single string `#0c0c0c` to a media query array:
   ```ts
   export const viewport: Viewport = {
     themeColor: [
       { media: "(prefers-color-scheme: light)", color: "#efece9" },
       { media: "(prefers-color-scheme: dark)", color: "#0c0c0c" },
     ],
     width: "device-width",
     initialScale: 1,
   };
   ```
2. In `<body className="...">`, change `bg-ink-900 text-warmwhite` to `bg-[var(--bg)] text-[var(--fg)]`.

### Step 3: Implement `prefers-color-scheme` in `src/components/ui/AtmosphereMode.tsx`
1. Check `window.matchMedia("(prefers-color-scheme: light)").matches ? "eink" : "aura"` for `initial` mode when no `?atmosphere=` query param is present.
2. Attach a `change` event listener on `matchMedia("(prefers-color-scheme: light)")` that updates mode dynamically if the user has not manually clicked or cycled modes in the session.

### Step 4: Batch Upgrade Body Copy Opacities across Landing Page Sections
Perform targeted replacement across the 15 landing page component files:
- Replace body text classes using `text-warmwhite/60`, `text-warmwhite/65`, `text-warmwhite/70`, `text-warmwhite/75`, and `text-warmwhite/80` with **`text-warmwhite/90`**.
- Replace italic subtitles (`one quiet reel.`, `in detail.`, `doing right now.`, etc.) using `text-warmwhite/60` with **`text-warmwhite/90`**.
- Update descriptions and explanatory notes in `StickyTimeline.tsx`, `Process.tsx`, `PortfoliosTeaser.tsx`, `SiteMap.tsx`, `Awards.tsx`, and `Capabilities.tsx` to `text-warmwhite/90`.

### Step 5: Run Automated Verification Suite
Verify with:
```bash
pnpm typecheck && pnpm lint && pnpm build
```
Verify that zero type errors or lint warnings are introduced.

---

## 6. Verification and Acceptance Checklist

- [ ] **Computed Lightness Verification**: All body text paragraphs have computed $L^* \ge 85.0$ and contrast $\ge 13.5:1$ against the dark background.
- [ ] **System Theme Verification**: 
  - Opening the site in a browser with OS theme set to Dark loads `aura` (or current dark preset).
  - Opening the site in a browser with OS theme set to Light loads `eink` (light paper aesthetic).
  - Pressing `T` or clicking the atmosphere pill cycles through all 5 modes (`eink` -> `terminal` -> `aura` -> `storm` -> `stillness`).
- [ ] **Quality Gate**: `pnpm typecheck`, `pnpm lint`, and `pnpm build` pass with exit code 0.
