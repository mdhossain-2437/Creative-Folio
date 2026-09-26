# Technical Investigation Report: Requirement R2 (Section Labels Typography De-sloppification)

**Report ID**: `survey_r2`  
**Explorer Agent**: Teamwork Explorer (Survey 2)  
**Target Requirement**: R2 — Section Labels Typography De-sloppification  
**Date**: 2026-09-26  
**Status**: Completed (Read-Only Technical Investigation)

---

## 1. Executive Summary

Requirement R2 mandates:
> "Eliminate all section labels styled with `text-transform: uppercase` combined with positive letter-spacing (`tracking-widest`). Present section titles in natural sentence case or let section H2 headings lead directly without decorative uppercase kicker labels."

### Core Architectural Findings
1. **The Artificial Section Numbering Scheme**:
   Across the landing page (`src/app/page.tsx`), every major section component hardcodes a decorative kicker tag structured as:
   `§01 — Manifesto`, `§02 — Selected Works`, `§03 — Reel · 02:17`, `§04 — Milestones · 2023 → 2027`, `§05 — /now`, `§06 — Collaboration`, `§07 — Recognition Ledger`, `§08 — Expertise`, `§09 — Process`, `§10 — Journal`, `§11 — Beyond Home`, `◊ §12 — Portfolios`.
2. **Extreme Letter Spacing Token**:
   In `tailwind.config.ts` line 38, `widest` is configured as:
   ```ts
   letterSpacing: {
     tightest: "-0.045em",
     tighter: "-0.03em",
     widest: "0.22em", // 22% letter-spacing!
   }
   ```
   Combined with `font-sans text-[10px] uppercase`, this produces an unnatural, spaced-out micro-label that constitutes one of the defining aesthetic markers of AI-generated portfolio templates.
3. **Visual Redundancy / Stutter**:
   In several sections, the kicker tag literally duplicates the headline immediately beneath it:
   - `SelectedWorks.tsx`: `§02 — Selected Works` directly above `Selected & Targeted.`
   - `Awards.tsx`: `§07 — Recognition Ledger` directly above `Recognition Ledger`
   - `Process.tsx`: `§09 — Process` directly above `Concept to Shader.`
   - `JournalPreview.tsx`: `§10 — Journal` directly above `Notes on the craft.`
   - `PortfoliosTeaser.tsx`: `◊ §12 — Portfolios` directly above `Every year a new portfolio.`
4. **Strategic Direction**:
   - **Lead Directly with `<h2>`**: On primary editorial sections, eliminate the decorative kicker label entirely. The bold, serif headlines (`font-serif leading-[0.94] tracking-tightest`) are art-directed and carry the hierarchy cleanly without decorative scaffolding.
   - **Clean Typography for Functional Labels**: Where a label serves genuine wayfinding, taxonomy, or data purposes (e.g. `StickyTimeline`, `SectionRail`, `SectionProgressDots`, `Stats`), convert from `font-sans text-[10px] uppercase tracking-widest` to clean, un-spaced JetBrains Mono (`font-mono text-xs text-warmwhite/65 tracking-normal`) or natural sentence case without positive tracking.

---

## 2. Landing Page (`src/app/page.tsx`) Section Inventory & Proposals

The landing page renders 15 distinct sections in order:
`Hero` → `Manifesto` → `MarqueeBand` → `SelectedWorks` → `ShowreelTeaser` → `MilestonesScroll` → `NowTeaser` → `Stats` → `Testimonials` → `AwardsSection` → `Capabilities` → `ProcessSection` → `PortfoliosTeaser` → `JournalPreview` → `SiteMap`.

Below is the exhaustive audit of every occurrence, exact line numbers, current JSX, and recommended de-sloppified replacements.

---

### 2.1. Hero (`src/components/sections/Hero.tsx`)

#### Occurrence 2.1.A: Hero Eyebrow Kicker
- **File**: `src/components/sections/Hero.tsx`
- **Lines**: 93–97
- **Current JSX**:
  ```tsx
  {/* Single quiet eyebrow — everything else lives in the StatusStrip / Footer now. */}
  <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
    <ScrambleText trigger="mount" duration={900}>
      {`◌ Folio ${site.editionShort}`}
    </ScrambleText>
  </p>
  ```
- **Analysis**: Uses `uppercase tracking-widest` (`0.22em`) and decorative `◌` symbol directly above `<h1 aria-label="Delowar Hossain.">`.
- **Proposed Replacement**:
  Present in clean JetBrains Mono system case without wide tracking, removing the decorative glyph:
  ```tsx
  <p className="font-mono text-xs text-warmwhite/70 tracking-normal">
    <ScrambleText trigger="mount" duration={900}>
      {`Folio ${site.editionShort}`}
    </ScrambleText>
  </p>
  ```

#### Occurrence 2.1.B: Action Buttons
- **File**: `src/components/sections/Hero.tsx`
- **Lines**: 126–127, 137–138
- **Current JSX**:
  ```tsx
  className="inline-flex items-center gap-2 rounded-full bg-warmwhite px-6 py-3.5 font-sans text-[11px] uppercase tracking-widest text-ink-900 hover:bg-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
  ```
  ```tsx
  className="inline-flex items-center gap-2 rounded-full border border-warmwhite/40 px-5 py-3.5 font-sans text-[11px] uppercase tracking-widest text-warmwhite hover:border-warmwhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
  ```
- **Proposed Replacement**:
  Remove `uppercase tracking-widest`, style with natural case:
  ```tsx
  className="inline-flex items-center gap-2 rounded-full bg-warmwhite px-6 py-3.5 font-sans text-xs font-medium text-ink-900 hover:bg-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
  ```
  ```tsx
  className="inline-flex items-center gap-2 rounded-full border border-warmwhite/40 px-5 py-3.5 font-sans text-xs font-medium text-warmwhite hover:border-warmwhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
  ```

---

### 2.2. Manifesto (`src/components/sections/Manifesto.tsx`)

#### Occurrence 2.2.A: Section Kicker
- **File**: `src/components/sections/Manifesto.tsx`
- **Lines**: 12–14
- **Current JSX**:
  ```tsx
  <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
    §01 — Manifesto
  </p>
  ```
- **Analysis**: Textbook AI kicker tag combining `§01 —`, `uppercase`, and `tracking-widest`.
- **Proposed Replacement**:
  **Eliminate the decorative kicker label entirely!**
  Remove lines 12–14 so the editorial `Reveal` block containing `<p className="mt-10 max-w-[1200px] font-serif ...">` leads the section directly. If spacing requires adjustment, adjust top padding on the section or reveal container.

#### Occurrence 2.2.B: Practitioner Card Eyebrow
- **File**: `src/components/sections/Manifesto.tsx`
- **Lines**: 44–46
- **Current JSX**:
  ```tsx
  <p className="font-sans text-[10px] uppercase tracking-widest text-peach">
    ◊ Practitioner
  </p>
  ```
- **Proposed Replacement**:
  Remove `◊` and use clean mono system typography:
  ```tsx
  <p className="font-mono text-xs text-peach tracking-normal">
    Practitioner
  </p>
  ```

#### Occurrence 2.2.C: Pillar Tags
- **File**: `src/components/sections/Manifesto.tsx`
- **Lines**: 97–99
- **Current JSX**:
  ```tsx
  <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
    {tag}
  </p>
  <h3 className="mt-4 font-serif text-3xl tracking-tightest">{title}</h3>
  ```
- **Proposed Replacement**:
  Present the category tag in natural system mono:
  ```tsx
  <p className="font-mono text-xs text-warmwhite/65 tracking-normal">
    {tag}
  </p>
  <h3 className="mt-3 font-serif text-3xl tracking-tightest">{title}</h3>
  ```

---

### 2.3. SelectedWorks (`src/components/sections/SelectedWorks.tsx`)

#### Occurrence 2.3.A: Section Kicker before H2
- **File**: `src/components/sections/SelectedWorks.tsx`
- **Lines**: 17–19
- **Current JSX**:
  ```tsx
  <div>
    <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
      <ScrambleText>§02 — Selected Works</ScrambleText>
    </p>
    <h2 className="mt-4 font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tightest">
      Selected
      <span className="italic text-peach"> &amp; </span>
      <br className="hidden md:block" />
      Targeted.
    </h2>
  </div>
  ```
- **Analysis**: High-impact slop pattern. Redundantly announces `§02 — Selected Works` right before `Selected & Targeted.`
- **Proposed Replacement**:
  **Remove the `<p>` kicker entirely.**
  Let `<h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tightest">` lead directly:
  ```tsx
  <div>
    <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tightest">
      Selected
      <span className="italic text-peach"> &amp; </span>
      <br className="hidden md:block" />
      Targeted.
    </h2>
  </div>
  ```

#### Occurrence 2.3.B: Work Row Index & Metadata
- **File**: `src/components/sections/SelectedWorks.tsx`
- **Lines**: 145–147, 152–157
- **Current JSX**:
  ```tsx
  <span className="display-num font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
    {work.index} · {work.year}
  </span>
  ```
  ```tsx
  <span className="hidden text-right font-sans text-[10px] uppercase tracking-widest text-warmwhite/55 md:block">
    <span className="block">{work.category}</span>
    <span className="mt-1 block text-warmwhite/55">
      {work.stack.slice(0, 3).join(" · ")}
    </span>
  </span>
  ```
- **Proposed Replacement**:
  Convert to `font-mono text-xs tracking-normal`:
  ```tsx
  <span className="display-num font-mono text-xs text-warmwhite/65 tracking-normal">
    {work.index} · {work.year}
  </span>
  ```
  ```tsx
  <span className="hidden text-right font-mono text-xs text-warmwhite/55 tracking-normal md:block">
    <span className="block">{work.category}</span>
    <span className="mt-1 block text-warmwhite/55">
      {work.stack.slice(0, 3).join(" · ")}
    </span>
  </span>
  ```

---

### 2.4. ShowreelTeaser (`src/components/sections/ShowreelTeaser.tsx`)

#### Occurrence 2.4.A: Section Kicker
- **File**: `src/components/sections/ShowreelTeaser.tsx`
- **Lines**: 15–17
- **Current JSX**:
  ```tsx
  <div className="md:col-span-5">
    <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
      §03 — Reel · 02:17
    </p>
    <h2 className="kinetic mt-6 font-serif text-[clamp(2.5rem,6vw,5.4rem)] leading-[0.96] tracking-tightest">
      Six chapters,
      <span className="block italic text-warmwhite/60">one quiet reel.</span>
    </h2>
  ```
- **Analysis**: Numbered kicker tag with artificial uppercase letter-spacing preceding `<h2>`.
- **Proposed Replacement**:
  **Remove the decorative kicker label entirely!**
  Let the kinetic H2 headline lead directly:
  ```tsx
  <div className="md:col-span-5">
    <h2 className="kinetic font-serif text-[clamp(2.5rem,6vw,5.4rem)] leading-[0.96] tracking-tightest">
      Six chapters,
      <span className="block italic text-warmwhite/60">one quiet reel.</span>
    </h2>
    <p className="mt-6 max-w-sm font-sans text-sm leading-relaxed text-warmwhite/80">
      A vertical reel index for selected motion work (02:17), 2026–2027. Public
      chapters use verified static covers while project footage is cut.
    </p>
  ```
- **Table items (Lines 54, 60, 63)**:
  Replace `font-mono text-[10px] uppercase tracking-widest text-warmwhite/65` with `font-mono text-xs text-warmwhite/65 tracking-normal`.

---

### 2.5. MilestonesScroll (`src/components/sections/MilestonesScroll.tsx`) & StickyTimeline (`src/components/ui/StickyTimeline.tsx`)

#### Occurrence 2.5.A: Milestones Kicker
- **File**: `src/components/sections/MilestonesScroll.tsx`
- **Lines**: 8–10
- **Current JSX**:
  ```tsx
  <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
    §04 — Milestones · 2023 → 2027
  </p>
  <h2 className="mt-6 max-w-4xl font-serif text-[clamp(2.5rem,6vw,5.4rem)] leading-[0.96] tracking-tightest">
    Five years. Five chapters.
    <span className="block italic text-warmwhite/70">One slow, deliberate climb.</span>
  </h2>
  ```
- **Proposed Replacement**:
  **Remove the decorative kicker label entirely!**
  Let the editorial H2 lead directly:
  ```tsx
  <h2 className="max-w-4xl font-serif text-[clamp(2.5rem,6vw,5.4rem)] leading-[0.96] tracking-tightest">
    Five years. Five chapters.
    <span className="block italic text-warmwhite/70">One slow, deliberate climb.</span>
  </h2>
  ```

#### Occurrence 2.5.B: StickyTimeline Props & Labels
- **File**: `src/components/sections/MilestonesScroll.tsx` line 16 & `src/components/ui/StickyTimeline.tsx` line 22, 66, 67, 149
- **Current JSX**:
  ```tsx
  <StickyTimeline items={milestones} label="◊ scroll the chapters" />
  ```
  In `StickyTimeline.tsx`:
  ```tsx
  <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">{label}</p>
  ```
  ```tsx
  <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
    <span className="display-num">§{String(i + 1).padStart(2, "0")}</span>
  ```
- **Proposed Replacement**:
  Pass clean natural label: `label="Timeline chapters"`.
  In `StickyTimeline.tsx`:
  ```tsx
  <p className="font-mono text-xs text-warmwhite/65 tracking-normal">{label}</p>
  ```
  ```tsx
  <p className="font-mono text-xs text-warmwhite/65 tracking-normal">
    <span className="display-num">{String(i + 1).padStart(2, "0")}</span>
    <span className="mx-2 text-warmwhite/40">·</span>
    <span className="display-num text-warmwhite/85">{it.year}</span>
  </p>
  ```

---

### 2.6. NowTeaser (`src/components/sections/NowTeaser.tsx`)

#### Occurrence 2.6.A: Section Kicker
- **File**: `src/components/sections/NowTeaser.tsx`
- **Lines**: 11–13
- **Current JSX**:
  ```tsx
  <div className="md:col-span-4">
    <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
      §05 — /now
    </p>
    <h2 className="mt-6 font-serif text-[clamp(2.5rem,6vw,5.4rem)] leading-[0.96] tracking-tightest">
      What I&apos;m
      <span className="block italic text-warmwhite/60">doing right now.</span>
    </h2>
  ```
- **Proposed Replacement**:
  **Remove the decorative kicker label entirely!**
  ```tsx
  <div className="md:col-span-4">
    <h2 className="font-serif text-[clamp(2.5rem,6vw,5.4rem)] leading-[0.96] tracking-tightest">
      What I&apos;m
      <span className="block italic text-warmwhite/60">doing right now.</span>
    </h2>
  ```
- **Feed tag items (Line 34)**:
  `<p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">{it.tag}</p>`
  -> `<p className="font-mono text-xs text-warmwhite/65 tracking-normal">{it.tag}</p>`

---

### 2.7. Stats (`src/components/sections/Stats.tsx`)

#### Occurrence 2.7.A: Stat Metric Labels
- **File**: `src/components/sections/Stats.tsx`
- **Lines**: 41–43
- **Current JSX**:
  ```tsx
  <p className="mt-3 font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
    {s.label}
  </p>
  ```
- **Analysis**: Every metric title below the count-up is forced into micro-uppercase with `tracking-widest`.
- **Proposed Replacement**:
  Convert to natural sentence case with clean typography:
  ```tsx
  <p className="mt-3 font-sans text-xs text-warmwhite/70 tracking-normal">
    {s.label}
  </p>
  ```
  *(Note: Coordinate with Requirement R4 for verified stat links/citations)*.

---

### 2.8. Testimonials (`src/components/sections/Testimonials.tsx`)

#### Occurrence 2.8.A: Header Section Kicker
- **File**: `src/components/sections/Testimonials.tsx`
- **Lines**: 8–15
- **Current JSX**:
  ```tsx
  <header className="grid grid-cols-1 gap-10 md:grid-cols-12">
    <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 md:col-span-3">
      §06 — Collaboration
    </p>
    <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest md:col-span-9">
      Process notes, <span className="italic text-warmwhite/60">until quotes are verified.</span>
    </h2>
  </header>
  ```
- **Proposed Replacement**:
  **Remove the decorative kicker label entirely!**
  Let the H2 occupy the header with natural authority:
  ```tsx
  <header className="max-w-4xl">
    <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest">
      Process notes, <span className="italic text-warmwhite/60">until quotes are verified.</span>
    </h2>
  </header>
  ```

---

### 2.9. AwardsSection (`src/components/sections/Awards.tsx`)

#### Occurrence 2.9.A: Duplicate Section Kicker
- **File**: `src/components/sections/Awards.tsx`
- **Lines**: 15–21
- **Current JSX**:
  ```tsx
  <div className="md:col-span-7">
    <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
      <ScrambleText>§07 — Recognition Ledger</ScrambleText>
    </p>
    <h2 className="mt-4 font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest">
      Recognition{" "}
      <span className="italic text-warmwhite/60">Ledger</span>
    </h2>
  </div>
  ```
- **Analysis**: Extreme visual stutter — `§07 — RECOGNITION LEDGER` stacked verbatim on top of `Recognition Ledger`.
- **Proposed Replacement**:
  **Remove the `<p>` kicker entirely.**
  ```tsx
  <div className="md:col-span-7">
    <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest">
      Recognition{" "}
      <span className="italic text-warmwhite/60">Ledger</span>
    </h2>
  </div>
  ```
- **Card Badges (Lines 45, 52)**:
  Line 45: `<span className="font-mono text-xs text-warmwhite/65 tracking-normal">{a.org} · {a.year}</span>`
  Line 52: `<p className="relative font-sans text-xs text-peach tracking-normal">{a.status === "earned" ? "Verified recognition" : "Recognition target"}</p>`

---

### 2.10. Capabilities (`src/components/sections/Capabilities.tsx`)

#### Occurrence 2.10.A: Header Section Kicker
- **File**: `src/components/sections/Capabilities.tsx`
- **Lines**: 9–16
- **Current JSX**:
  ```tsx
  <header className="grid grid-cols-1 gap-10 md:grid-cols-12">
    <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 md:col-span-3">
      §08 — Expertise
    </p>
    <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest md:col-span-9">
      What I do, <span className="italic text-warmwhite/60">in detail.</span>
    </h2>
  </header>
  ```
- **Proposed Replacement**:
  **Remove the decorative kicker label entirely!**
  ```tsx
  <header className="max-w-4xl">
    <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest">
      What I do, <span className="italic text-warmwhite/60">in detail.</span>
    </h2>
  </header>
  ```
- **Metadata Elements (Lines 26, 43, 54)**:
  Line 26: `<p className="display-num font-mono text-xs text-warmwhite/65 tracking-normal md:col-span-1">{s.index}</p>`
  Line 43 (Tag pills): `rounded-full border border-warmwhite/20 px-3 font-mono text-xs text-warmwhite/75 tracking-normal`
  Line 54: `<p className="font-sans text-xs text-warmwhite/65 tracking-normal">Process · Discovery → Design → Prototype → Production</p>`

---

### 2.11. ProcessSection (`src/components/sections/Process.tsx`)

#### Occurrence 2.11.A: Header Section Kicker
- **File**: `src/components/sections/Process.tsx`
- **Lines**: 54–61
- **Current JSX**:
  ```tsx
  <header className="grid grid-cols-1 gap-10 md:grid-cols-12">
    <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 md:col-span-3">
      <ScrambleText>§09 — Process</ScrambleText>
    </p>
    <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest md:col-span-9">
      Concept <span className="italic text-warmwhite/60">to</span> Shader.
    </h2>
  </header>
  ```
- **Proposed Replacement**:
  **Remove the decorative kicker label entirely!**
  ```tsx
  <header className="max-w-4xl">
    <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest">
      Concept <span className="italic text-warmwhite/60">to</span> Shader.
    </h2>
  </header>
  ```
- **Phase Pills & Panels (Lines 76, 157, 185, 215, 229, 239)**:
  Line 76: `font-mono text-xs tracking-normal` (replacing `uppercase tracking-widest`)
  Line 185: `<span className="font-mono text-xs text-peach tracking-normal">{phase.phase}</span>`
  Line 229, 239: `<p className="font-sans text-xs font-medium text-warmwhite/70 tracking-normal">Deliverables</p>`
  *(Note: Coordinate with Requirement R3 for concrete workflow visualization)*.

---

### 2.12. PortfoliosTeaser (`src/components/sections/PortfoliosTeaser.tsx`)

#### Occurrence 2.12.A: Header Section Kicker
- **File**: `src/components/sections/PortfoliosTeaser.tsx`
- **Lines**: 34–39
- **Current JSX**:
  ```tsx
  <div className="max-w-3xl">
    <p className="font-sans text-[10px] uppercase tracking-widest text-peach">
      ◊ §12 — Portfolios
    </p>
    <h2 className="mt-4 font-serif text-[clamp(2.4rem,5vw,5rem)] leading-[0.95] tracking-tightest">
      Every year a <span className="italic text-peach">new portfolio.</span>
    </h2>
  ```
- **Analysis**: Contains glyph `◊`, section number `§12 —`, uppercase, and `tracking-widest`.
- **Proposed Replacement**:
  **Remove the decorative kicker label entirely!**
  Let the headline lead directly:
  ```tsx
  <div className="max-w-3xl">
    <h2 className="font-serif text-[clamp(2.4rem,5vw,5rem)] leading-[0.95] tracking-tightest">
      Every year a <span className="italic text-peach">new portfolio.</span>
    </h2>
  ```
- **Card Edition Badge (Line 70)**:
  `<span className="inline-flex items-center gap-2 font-mono text-xs tracking-normal" style={{ color: p.accent }}>`

---

### 2.13. JournalPreview (`src/components/sections/JournalPreview.tsx`)

#### Occurrence 2.13.A: Section Kicker before H2
- **File**: `src/components/sections/JournalPreview.tsx`
- **Lines**: 11–16
- **Current JSX**:
  ```tsx
  <div>
    <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
      §10 — Journal
    </p>
    <h2 className="mt-4 font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest">
      Notes <span className="italic text-warmwhite/60">on the craft.</span>
    </h2>
  </div>
  ```
- **Proposed Replacement**:
  **Remove the decorative kicker label entirely!**
  ```tsx
  <div>
    <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest">
      Notes <span className="italic text-warmwhite/60">on the craft.</span>
    </h2>
  </div>
  ```
- **Table Columns (Lines 38, 44, 47)**:
  Replace `font-sans text-[10px] uppercase tracking-widest` with `font-mono text-xs tracking-normal`.

---

### 2.14. SiteMap (`src/components/sections/SiteMap.tsx`)

#### Occurrence 2.14.A: Section Kicker before H2
- **File**: `src/components/sections/SiteMap.tsx`
- **Lines**: 34–39
- **Current JSX**:
  ```tsx
  <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
    §11 — Beyond Home
  </p>
  <h2 className="mt-4 font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest">
    Continue <span className="italic text-peach">exploring.</span>
  </h2>
  ```
- **Proposed Replacement**:
  **Remove the decorative kicker label entirely!**
  ```tsx
  <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest">
    Continue <span className="italic text-peach">exploring.</span>
  </h2>
  ```
- **Group Labels (Line 44–46)**:
  `{g.label}` currently styled as `font-sans text-[10px] uppercase tracking-widest text-warmwhite/65`.
  -> Convert to:
  ```tsx
  <p className="font-mono text-xs text-warmwhite/65 tracking-normal">
    {g.label}
  </p>
  ```

---

### 2.15. Footer (`src/components/layout/Footer.tsx`)

#### Occurrence 2.15.A: Footer Kicker before H2
- **File**: `src/components/layout/Footer.tsx`
- **Lines**: 69–75
- **Current JSX**:
  ```tsx
  <div className="lg:col-span-7">
    <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
      ◊ {site.availability} · Selected projects
    </p>
    <h2 className="mt-6 break-words font-serif text-[clamp(2.5rem,7.5vw,7rem)] leading-[0.94] tracking-tightest">
      <span className="block italic text-warmwhite/60">Have an idea?</span>
      <span className="block">Let&apos;s build it.</span>
    </h2>
  ```
- **Proposed Replacement**:
  **Remove the decorative kicker label entirely!**
  ```tsx
  <div className="lg:col-span-7">
    <h2 className="break-words font-serif text-[clamp(2.5rem,7.5vw,7rem)] leading-[0.94] tracking-tightest">
      <span className="block italic text-warmwhite/60">Have an idea?</span>
      <span className="block">Let&apos;s build it.</span>
    </h2>
  ```
- **Footer Column Headings (Line 220)**:
  `<p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">{title}</p>`
  -> `<p className="font-mono text-xs text-warmwhite/65 tracking-normal">{title}</p>`

---

## 3. Persistent Overlays & Navigation System Audit

### 3.1. SectionLabel (`src/components/ui/SectionLabel.tsx`)
- **File**: `src/components/ui/SectionLabel.tsx`
- **Lines**: 1–10
- **Current JSX**:
  ```tsx
  export function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
    return (
      <p className="flex items-center gap-3 font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
        <span className="display-num">§{index}</span>
        <span aria-hidden className="h-px w-8 bg-warmwhite/20" />
        <span>{children}</span>
      </p>
    );
  }
  ```
- **Proposed Replacement**:
  De-sloppify the shared component to use clean mono with normal tracking:
  ```tsx
  export function SectionLabel({ index, children }: { index?: string; children: React.ReactNode }) {
    return (
      <p className="flex items-center gap-2 font-mono text-xs text-warmwhite/70 tracking-normal">
        {index && <span className="display-num text-peach">{index}</span>}
        {index && <span aria-hidden className="text-warmwhite/30">·</span>}
        <span>{children}</span>
      </p>
    );
  }
  ```

### 3.2. SectionRail (`src/components/ui/SectionRail.tsx`)
- **File**: `src/components/ui/SectionRail.tsx`
- **Occurrences**:
  - Line 250: `tracking-[0.18em] uppercase font-sans text-[10px]` -> `font-mono text-xs tracking-normal normal-case`
  - Line 310: `truncate font-sans text-[10px] uppercase tracking-widest text-warmwhite` -> `truncate font-mono text-xs text-warmwhite tracking-normal`
  - Line 340: `◊ Jump to section` with `uppercase tracking-widest` -> `Jump to section` with `font-sans text-xs text-warmwhite/70 tracking-normal`
  - Line 374: `font-sans text-[10px] uppercase tracking-widest` -> `font-mono text-xs tracking-normal`

### 3.3. SectionProgressDots (`src/components/ui/SectionProgressDots.tsx`)
- **File**: `src/components/ui/SectionProgressDots.tsx`
- **Lines**: 103–105
- **Current JSX**:
  ```tsx
  className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md border border-warmwhite/15 bg-ink-950/90 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-warmwhite/80 opacity-0 transition-opacity group-hover:opacity-100"
  ```
- **Proposed Replacement**:
  Change to clean normal-tracking mono:
  ```tsx
  className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md border border-warmwhite/15 bg-ink-950/90 px-2 py-1 font-mono text-xs text-warmwhite/85 tracking-normal opacity-0 transition-opacity group-hover:opacity-100"
  ```

### 3.4. PageHero (`src/components/layout/PageHero.tsx`)
- **File**: `src/components/layout/PageHero.tsx`
- **Lines**: 31–33
- **Current JSX**:
  ```tsx
  <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
    {eyebrow}
  </p>
  ```
- **Proposed Replacement**:
  ```tsx
  <p className="font-mono text-xs text-warmwhite/65 tracking-normal">
    {eyebrow}
  </p>
  ```
  *(In addition, sanitize all subpage `eyebrow` prop values to remove pseudo-editorial `§01 —`, `◊`, etc., e.g. in `src/app/about/page.tsx`, `src/app/works/page.tsx`, `src/app/contact/page.tsx`)*.

---

## 4. Subpages Section Headers Audit

Beyond the landing page, the same template slop pattern was identified on inner subpages:

| File Path | Lines | Current JSX | Recommended Replacement |
|---|---|---|---|
| `src/app/about/page.tsx` | 128 | `<p ...>◊ Philosophy</p>` | Remove kicker, let content lead or use `font-mono text-xs tracking-normal` |
| `src/app/about/page.tsx` | 187 | `<p ...>◊ Practice</p>` | Remove kicker or use `font-mono text-xs tracking-normal` |
| `src/app/about/page.tsx` | 247 | `<p ...>◊ Background</p>` | Remove kicker or use `font-mono text-xs tracking-normal` |
| `src/app/about/page.tsx` | 301 | `<p ...>◊ Formal Education & CS Foundation</p>` | Remove kicker or use `font-mono text-xs tracking-normal` |
| `src/app/about/page.tsx` | 359 | `<p ...>◊ Operating Principles</p>` | Remove kicker or use `font-mono text-xs tracking-normal` |
| `src/app/about/page.tsx` | 392 | `<p ...>◊ Current Focus</p>` | Remove kicker or use `font-mono text-xs tracking-normal` |
| `src/app/services/page.tsx` | 139 | `<p ...>◊ Tiers</p>` | Remove kicker before H2 "Three ways to work together." |
| `src/app/services/page.tsx` | 203 | `<p ...>◊ Capabilities ...</p>` | Remove kicker or use `font-mono text-xs tracking-normal` |
| `src/app/services/page.tsx` | 244 | `<p ...>◊ Process</p>` | Remove kicker before H2 "Concept to Shader." |
| `src/app/services/page.tsx` | 275 | `<p ...>◊ Engagements</p>` | Remove kicker or use `font-mono text-xs tracking-normal` |
| `src/app/contact/page.tsx` | 47 | `<p ...>◊ §01 — Direct Inquiry</p>` | Remove kicker or use `font-mono text-xs tracking-normal` |
| `src/app/contact/page.tsx` | 78 | `<p ...>◊ §02 — The Brief</p>` | Remove kicker or use `font-mono text-xs tracking-normal` |
| `src/app/contact/page.tsx` | 96 | `<p ...>◊ §03 — Elsewhere</p>` | Remove kicker or use `font-mono text-xs tracking-normal` |
| `src/app/contact/page.tsx` | 134 | `<p ...>◊ §04 — Colophon</p>` | Remove kicker or use `font-mono text-xs tracking-normal` |
| `src/app/brand/page.tsx` | 124 | `SectionHead: <p ...>{eyebrow}</p>` | Remove kicker or use `font-mono text-xs tracking-normal` |
| `src/app/lab/page.tsx` | 70 | `<p ...>§03 — The Arsenal</p>` | Remove kicker before H2 "The tools behind the work." |

---

## 5. Implementation Guide for the Worker

When the orchestrator assigns the Worker implementation task, the Worker should execute the refactoring in three structured passes:

### Pass 1: Landing Page Section Components (`src/components/sections/`)
1. **`Hero.tsx`**: Change eyebrow to `font-mono text-xs text-warmwhite/70 tracking-normal`, remove `◌`. Change CTA button tracking to `tracking-normal normal-case`.
2. **`Manifesto.tsx`**: Delete `§01 — Manifesto` `<p>` tag. Convert `◊ Practitioner` and `{tag}` to `font-mono text-xs tracking-normal`.
3. **`SelectedWorks.tsx`**: Delete `§02 — Selected Works` `<p>` tag. Convert table display numbers and category tags to `font-mono text-xs tracking-normal`.
4. **`ShowreelTeaser.tsx`**: Delete `§03 — Reel · 02:17` `<p>` tag. Convert table columns to `font-mono text-xs tracking-normal`.
5. **`MilestonesScroll.tsx`**: Delete `§04 — Milestones · 2023 → 2027` `<p>` tag. Pass clean label to `StickyTimeline`.
6. **`NowTeaser.tsx`**: Delete `§05 — /now` `<p>` tag. Convert item tags to `font-mono text-xs tracking-normal`.
7. **`Stats.tsx`**: Convert `{s.label}` to `font-sans text-xs text-warmwhite/70 tracking-normal`.
8. **`Testimonials.tsx`**: Delete `§06 — Collaboration` `<p>` tag; let H2 lead cleanly.
9. **`Awards.tsx`**: Delete `§07 — Recognition Ledger` `<p>` tag; let H2 lead cleanly. Convert badges to `font-mono text-xs tracking-normal`.
10. **`Capabilities.tsx`**: Delete `§08 — Expertise` `<p>` tag; let H2 lead cleanly. Convert tags and process line to `tracking-normal`.
11. **`Process.tsx`**: Delete `§09 — Process` `<p>` tag; let H2 lead cleanly. Convert phase pills, durations, tools to `font-mono text-xs tracking-normal`.
12. **`PortfoliosTeaser.tsx`**: Delete `◊ §12 — Portfolios` `<p>` tag; let H2 lead cleanly. Convert edition badge to `font-mono text-xs tracking-normal`.
13. **`JournalPreview.tsx`**: Delete `§10 — Journal` `<p>` tag; let H2 lead cleanly. Convert metadata to `font-mono text-xs tracking-normal`.
14. **`SiteMap.tsx`**: Delete `§11 — Beyond Home` `<p>` tag; let H2 lead cleanly. Convert group headers to `font-mono text-xs tracking-normal`.

### Pass 2: Layout & Persistent UI Components
1. **`Footer.tsx`**: Delete `◊ {site.availability} · Selected projects` kicker tag before H2. Convert column headers to `font-mono text-xs tracking-normal`.
2. **`PageHero.tsx`**: Change eyebrow to `font-mono text-xs text-warmwhite/65 tracking-normal`.
3. **`SectionLabel.tsx`**: Refactor component to render `font-mono text-xs tracking-normal`.
4. **`SectionRail.tsx`**: Replace `tracking-[0.18em]` and `tracking-widest` with `font-mono text-xs tracking-normal`.
5. **`SectionProgressDots.tsx`**: Replace tooltip tracking with `font-mono text-xs tracking-normal`.
6. **`StickyTimeline.tsx`**: Replace kicker tracking with `font-mono text-xs tracking-normal`.

### Pass 3: Verification
1. Run `pnpm typecheck` to confirm zero TypeScript errors.
2. Run `pnpm lint` to confirm ESLint clean.
3. Run `pnpm build` to ensure production compilation succeeds without errors.
4. Verify acceptance criteria:
   - Zero section labels or section kicker tags use `text-transform: uppercase` with `letter-spacing > 0`.
   - Section titles adopt natural sentence case or clean, non-spaced typography.

---

## 6. Conclusion

Requirement R2 addresses the primary typography artifact that inflated the AI-design-slop score to 13/100. By removing the redundant, spaced uppercase kicker labels (`§01` to `§12`), the MMXXVII landing page transforms from looking like an AI prompt template into an authentic, award-tier editorial portfolio where the typography and layout lead directly.
