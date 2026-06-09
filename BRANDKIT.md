# Delowar Hossain. — Brand Book

**Edition MMXXVII · § 03.27**
The visual, verbal, and technical system for the identity of **Delowar Hossain.** — Creative Developer & UI/UX Designer, working under the studio name **The Compiled Thought** from Joypurhat, Bangladesh.

> This is the canonical reference. If a layout, a color, a piece of copy, or an exported asset disagrees with this document, this document wins. Read it before you touch the wordmark.

---

## ◌ Contents

1. [Brand overview & positioning](#-01--brand-overview--positioning)
2. [Voice & tone](#-02--voice--tone)
3. [Logo system](#-03--logo-system)
4. [Color](#-04--color)
5. [Typography](#-05--typography)
6. [Motifs](#-06--motifs--the-editorial-language)
7. [Layout, grid & spacing](#-07--layout-grid--spacing)
8. [Asset index](#-08--asset-index)
9. [Social banner specs & safe areas](#-09--social-banner-specs--safe-areas)
10. [Email system](#-10--email-system)
11. [Licensing & contact](#-11--licensing--contact)

---

## § 01 — Brand overview & positioning

### Who

| Field | Value |
| --- | --- |
| Name | **Delowar Hossain** (wordmark always renders as `Delowar Hossain.` with a trailing period) |
| Role | Creative Developer & UI/UX Designer |
| Studio | The Compiled Thought |
| Edition | MMXXVII (2027) · short `MMXXVII` · strap `§ 03.27` |
| Location | Joypurhat, Bangladesh · 25.10° N, 89.02° E |
| Domain | delowarhossain.dev |
| Email | hello@delowarhossain.dev |
| Stack signature | WebGL · Three.js · GSAP · Next.js · GLSL · AI |

### Positioning

> Bridging editorial design and high-performance creative development. I build immersive digital products where typography, motion, and engineering converge.

The brand sits deliberately between two worlds that rarely share a page: the **printed design annual** (serif display, generous negative space, hairline rules, section marks) and the **real-time creative web** (WebGL, shaders, route transitions, smooth scroll). Every artifact in this kit should read like a spread from a design quarterly that happens to be alive.

The competitive frame is not other portfolios — it is the magazine. Reach for the composure of a cover, not the urgency of a landing page.

### Brand pillars

- **Editorial first.** Type, rhythm, and whitespace carry the work. Decoration is rationed.
- **Engineered restraint.** The technical ability (WebGL, GLSL, motion) is implied through polish, never bragged about.
- **One coherent system.** Favicon, OG card, banners, email, and live site all share the same DNA: deep ink, peach accent, Newsreader display, hairline frames.
- **Calm confidence.** Nothing shouts. The accent never leads.

---

## § 02 — Voice & tone

Confident, precise, editorial, calm. Lowercase-friendly in body copy; UPPERCASE for labels and eyebrows. Sentences are crafted, not sold. Tabular, exact, unhurried — a design annual, not a SaaS hero.

### Mechanics

- **Body:** sentence case or lowercase, warm and plain. Short declaratives. No exclamation marks.
- **Labels / eyebrows:** `UPPERCASE`, wide tracking, often prefixed with a glyph — `◌ FOLIO · MMXXVII`, `§ 03 — SELECTED WORK`.
- **Numerals:** tabular. Years as Roman numerals where it earns the gravitas — `MMXXVII`.
- **The period.** The wordmark ends in a full stop. So does the brand's posture: finished, deliberate, closed.

### Do / Don't

| Do | Don't |
| --- | --- |
| "I build immersive digital products where typography, motion, and engineering converge." | "I build INSANE web experiences that will BLOW your mind!" |
| "Open from Q1 '27. Available for select freelance commissions." | "Hire me now — limited slots!! DM me!!!" |
| "Bridging editorial design and high-performance creative development." | "Full-stack ninja / rockstar / 10x developer." |
| Lowercase body, UPPERCASE labels, wide tracking on eyebrows. | Title Case Everywhere Like A Press Release. |
| Let whitespace and one peach accent do the talking. | Stack gradients, emoji, and three accent colors per screen. |
| "§ 03 — Selected Work" | "OUR AMAZING PORTFOLIO" |

**Never:** emoji, hype words (insane, crazy, game-changer, revolutionary), fake scarcity, or salesy CTAs. The reader is a peer, not a lead.

### Canonical strings

```
Wordmark        Delowar Hossain.
Role            Creative Developer & UI/UX Designer
Studio          The Compiled Thought
Edition         MMXXVII · § 03.27
Tagline         Bridging editorial design and high-performance creative
                development. I build immersive digital products where
                typography, motion, and engineering converge.
Stack           WebGL · Three.js · GSAP · Next.js · GLSL · AI
Availability    Open from Q1 '27
Location        Joypurhat, Bangladesh — 25.10° N, 89.02° E
```

---

## § 03 — Logo system

The identity has **no pictorial logo** — it is a **wordmark plus a graphic mark**. This is intentional and editorial.

### 03.1 The wordmark

```
Delowar Hossain.
```

- Set in **Newsreader**, almost always **italic**, weight 400.
- Tracking `-0.03em` to `-0.045em`; line-height `~0.9` when stacked across two lines.
- The trailing **period is peach** (`#e3bfb4`) whenever the surface and scale let it read clearly. Where a single foreground color is required (one-color exports, knockouts, the master OG card — where it is carried in warmwhite), the period inherits the foreground.
- Stacked lockup (`Delowar` / `Hossain.`) for cover-format compositions; inline (`Delowar Hossain.`) for navbars, footers, signatures.

```
┌──────────────────────────────┐
│                              │
│   Delowar                    │   ← Newsreader italic 400, tracking -0.045em
│   Hossain.                   │   ← the period is peach #e3bfb4 where it reads
│                              │
└──────────────────────────────┘
```

### 03.2 The graphic mark — the peach diamond

A **square rotated 45°**, filled solid **peach** (`#e3bfb4`). This is the core mark: it stands in for the brand in favicons, app icons, and corner accents where the full wordmark cannot fit.

- Construction: square, `rotate(45deg)`, centered. In the master OG card it is a `44 × 44` square rotated 45°, parked near the top-right at the optical margin.
- The DH brand mark fuses this diamond with a **knockout serif "D"** in the favicon and app icon (the ink ground shows through the letter). Solo, the diamond is a clean, solid shape with no glyph.
- Never outline-only unless the surface is light (paper / e-ink mode, where the inverted `logomark-ink.svg` is used); never gradient-filled; never given a drop shadow.

### 03.3 Clear space

Reserve clear space equal to the **cap-height of the wordmark's `H`** (call it `x`) on all sides. Nothing — type, rules, image edges — enters that zone. For the diamond mark, clear space is **half the diamond's diagonal** on every side.

```
   ◌ x ◌
 ┌─────────────┐
 x  Hossain.   x      clear space = cap-height of "H"
 └─────────────┘
   ◌ x ◌
```

### 03.4 Minimum sizes

| Lockup | Digital min | Print min |
| --- | --- | --- |
| Inline wordmark `Delowar Hossain.` | 16 px cap-height | 5 mm cap-height |
| Stacked wordmark | 120 px wide | 30 mm wide |
| Diamond / monogram mark (solo) | 16 × 16 px | 4 × 4 mm |
| DH avatar | 48 × 48 px (built to read at 48 px) | — |

Below the inline minimum, drop to the diamond / monogram mark alone.

### 03.5 Generated icon & share assets

The site generates icon and share assets at the edge (Next.js metadata routes) so they always reflect the current system:

| Asset | Source | Size | Notes |
| --- | --- | --- | --- |
| Favicon | `src/app/icon.svg` | 32 × 32 | Ink-950 base, peach 45° diamond, knockout serif **D** (mask) |
| Apple touch icon | `src/app/apple-icon.tsx` | 180 × 180 | Peach diamond (118 px) + knockout serif **D** on ink-950, soft peach glow |
| Root OG image | `src/app/opengraph-image.tsx` | 1200 × 630 | Full cover lockup |
| Twitter image | `src/app/twitter-image.tsx` | 1200 × 630 | Re-exports the OG generator (declares its own `runtime`) |
| Per-route OG images | `src/app/*/opengraph-image.tsx` | 1200 × 630 | One per section — same DNA, route-specific eyebrow |
| Static OG fallback | `public/og.svg` | 1200 × 630 | Hand-authored vector master (see below) |

`public/og.svg` is the **reference master** for the whole kit — the corner radial peach glow (`cx 78% / cy 32% / r 62%` at `0.22`), the inset hairline frame (`40 px` → `1120 × 550`), the peach eyebrow row, the giant italic Newsreader headline, the tapered footer rule, and the uppercase footer row all originate here. The 6 px peach top rule used across banners and email is the same masthead device. Match this DNA across every new asset.

> Note on the master: in `og.svg` the wordmark — including its trailing period — is carried in warmwhite (`Hossain.` at 92% opacity) for tonal evenness. The peach period is the rule for live UI and banners at scale; the master is the documented exception.

### 03.6 Don't — logo misuse

| | Rule |
| --- | --- |
| ✗ | Don't drop the trailing period. The wordmark is `Delowar Hossain.`, never `Delowar Hossain`. |
| ✗ | Don't set the wordmark in a non-serif. Newsreader (italic) only. |
| ✗ | Don't recolor the diamond. It is peach `#e3bfb4` on ink (or ink on paper for the inverted mark). Electric is never the diamond. |
| ✗ | Don't rotate the diamond off 45°, skew it, or round its corners. |
| ✗ | Don't add shadows, bevels, outer glows, or strokes to the wordmark or mark. |
| ✗ | Don't place the wordmark on a busy photo without an ink scrim behind it. |
| ✗ | Don't stretch, condense, or re-track beyond the `-0.03em … -0.045em` window. |
| ✗ | Don't use electric green anywhere in the logo. |

---

## § 04 — Color

Editorial first. The accent **never leads**. Backgrounds are deep ink; text is warmwhite carried at three opacities for hierarchy. Peach is the single brand color and appears only as accent. Electric is forbidden in body and reserved for a tiny live/open marker.

### 04.1 Full palette

| Token | Hex | Role | Usage |
| --- | --- | --- | --- |
| `ink-950` | `#070708` | Primary background | Page base, icon grounds, the deepest ground |
| `ink-900` | `#0c0c0c` | Background (CSS `--bg`) | OG/banner base, cards, surfaces |
| `ink-800` | `#131313` | Raised surface | Panels, hover wells |
| `ink-700` | `#1f201f` | Borders / wells | Dividers on dark, input fields |
| `ink-600` | `#525259` | Disabled / faint | Muted UI, placeholder borders |
| `ink-500` | `#717179` | Tertiary text | Meta, captions on ink |
| `ink-400` | `#c6c6c7` | Muted text / rules | Secondary labels, hairlines on light |
| `warmwhite` | `#efece9` | Primary text on dark (`--fg`) | Body, headlines, wordmark |
| `bone` | `#e5e2e0` | Soft white | Secondary surfaces, quiet text |
| `paper` | `#f3efe9` | Light surface | Print, light/e-ink mode ground |
| `peach` | `#e3bfb4` | **Primary accent (the brand color)** | Trailing period, diamond, eyebrows, links, hairline glow |
| `electric` | `#cdfa00` | **Rare** — live / focus only | A single live/open dot. Never body, never large fields. |

> The page base is `ink-950 #070708`; the OG/banner/card ground and the `--bg` custom property are `ink-900 #0c0c0c`. Both are canonical — pick the one the surface calls for and keep contrast judged against the actual ground.

### 04.2 Derived tokens

| Token | Value | Use |
| --- | --- | --- |
| Hairline rule (dark) | `rgba(239, 236, 233, 0.12)` | 1px editorial rules, inset frames |
| Tapered rule | linear `#efece9` `0 → 0.35 → 0` | Footer straps, signature underlines |
| Glow | radial `#e3bfb4` at `0.18 – 0.22` opacity | Soft peach bleed from a corner |
| Text — primary | `warmwhite` @ 100% | Headlines, lead body |
| Text — secondary | `warmwhite` @ 70% | Supporting copy |
| Text — tertiary | `warmwhite` @ 55% | Eyebrows, meta, captions |

CSS custom properties (from `src/app/globals.css`):

```css
:root {
  --bg: #0c0c0c;
  --fg: #efece9;
  --rule: rgba(239, 236, 233, 0.12);
  --accent: #e3bfb4;
  color-scheme: dark;
}
```

### 04.3 Color rules

- **Editorial first, accent never leads.** A screen is ink + warmwhite type; peach arrives last, as punctuation.
- **Peach is for:** the trailing period, the diamond accent, eyebrows, hairline glows, and links/focus.
- **Electric is forbidden** except a tiny live/open dot. It never touches body text or fills a region.
- **Backgrounds are deep ink. Text is warmwhite** at 100 / 70 / 55% for hierarchy — not new greys.
- One accent per composition. If peach appears three times on a screen, remove one.

### 04.4 Contrast — AA on ink-950 (`#070708`)

Approximate contrast ratios against the primary background, with WCAG 2.1 verdicts. Normal text needs **4.5:1** (AA); large (≥ 24 px, or ≥ 18.66 px bold) text needs **3:1**.

| Foreground | Ratio vs `ink-950` | Normal AA | Large AA | Guidance |
| --- | --- | --- | --- | --- |
| `warmwhite` `#efece9` | ~17.6 : 1 | ✓ Pass (AAA) | ✓ | Body and headlines |
| `bone` `#e5e2e0` | ~16.3 : 1 | ✓ Pass (AAA) | ✓ | Secondary text |
| `electric` `#cdfa00` | ~16.1 : 1 | ✓ Pass (AAA) | ✓ | High-contrast — but reserve for the live dot only |
| `peach` `#e3bfb4` | ~12.0 : 1 | ✓ Pass (AAA) | ✓ | Links, eyebrows, accents |
| `ink-400` `#c6c6c7` | ~9.9 : 1 | ✓ Pass (AAA) | ✓ | Muted text, rules |
| `ink-500` `#717179` | ~3.5 : 1 | ✗ Fail | ✓ Pass | Large meta only, never small body |
| `ink-600` `#525259` | ~2.0 : 1 | ✗ Fail | ✗ Fail | Decorative / disabled only — not for text |

> Opacity counts. Warmwhite at 55% (tertiary text) lands near ~9 : 1 on ink-950 — still AA for body — but warmwhite at lower opacities, or any text on the lighter `ink-900 #0c0c0c` ground, must be re-checked. Rule of thumb: anything carrying readable words on ink stays at `ink-400` / peach or lighter. `ink-500` is a large-label ceiling; `ink-600` and below are structure, never type.

---

## § 05 — Typography

Four faces, four jobs. Never blur their roles.

| Face | Role | Fallback chain |
| --- | --- | --- |
| **Newsreader** | Display / headlines / wordmark (often italic) | `"Newsreader", "Georgia", "Times New Roman", serif` |
| **Inter** | UI labels / eyebrows / nav | `"Inter", "Helvetica Neue", Arial, system-ui, sans-serif` |
| **JetBrains Mono** | Code / meta / coordinates | `"JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace` |
| **Sacramento** | Signature only | `"Sacramento", "Snell Roundhand", cursive` |

Web fonts loaded via `next/font/google` (`src/app/layout.tsx`): Newsreader `300 / 400 / 500` (normal + italic), Inter (variable), JetBrains Mono (variable), Sacramento `400`.

### 05.1 Roles in detail

- **Newsreader** — the voice of the brand. Refined serif, italic for the wordmark and feature headlines. Tight tracking `-0.03em` to `-0.045em`; line-height `~0.9` for stacked display.
- **Inter** — eyebrows and UI labels. Always `UPPERCASE`, letter-spacing `0.18em – 0.32em`, small (10–14 px). This is the only face that gets wide tracking.
- **JetBrains Mono** — coordinates, timestamps, section meta, code. Tabular numerals. `25.10° N · 89.02° E`, `§ 03.27`, `02:17`.
- **Sacramento** — the signature in the footer, and only there. One single sign-off per page, maximum.

### 05.2 Type scale

A fluid editorial scale. Display steps use Newsreader; labels use Inter; meta uses JetBrains Mono.

| Step | Face | Size (desktop) | Tracking | Line-height | Use |
| --- | --- | --- | --- | --- | --- |
| Display XL | Newsreader italic | 120–172 px | `-0.045em` | 0.9 | Cover wordmark, hero |
| Display L | Newsreader italic | 72–96 px | `-0.04em` | 0.92 | Page titles |
| Heading | Newsreader | 40–56 px | `-0.03em` | 0.95 | Section heads |
| Subhead | Newsreader | 24–32 px | `-0.02em` | 1.1 | Lead-ins |
| Body L | Inter / Newsreader | 18–20 px | `0` | 1.5 | Lead body |
| Body | Inter | 16 px | `0` | 1.55 | Default body |
| Eyebrow | Inter UPPERCASE | 11–14 px | `0.18 – 0.32em` | 1.2 | Labels, section marks |
| Meta / mono | JetBrains Mono | 11–13 px | `0.02em` | 1.4 | Coordinates, timestamps |
| Signature | Sacramento | 28–44 px | `0` | 1 | Footer sign-off |

Tailwind tracking tokens available (`tailwind.config`): `tracking-tightest (-0.045em)`, `tracking-tighter (-0.03em)`, `tracking-widest (0.22em)`.

### 05.3 Typesetting rules

- Wordmark and feature headlines: **Newsreader italic**, negative tracking, tight leading.
- Eyebrows: never sentence case. UPPERCASE, wide-tracked Inter, often glyph-prefixed.
- Mono is for things that are literally data — coordinates, durations, version strings. Don't set prose in mono.
- One signature face per page. Sacramento is a flourish, not a UI tool.

---

## § 06 — Motifs · the editorial language

Use tastefully. These are seasonings, not the meal.

### 06.1 Section markers

```
§ 01   § 02   § 03 …        ← section marks, JetBrains Mono or Inter
MMXXVII                     ← the edition, Roman numerals
§ 03.27                     ← the strap
```

### 06.2 Glyph set

```
◊   ◌   ↗   ◇   ¶
```

Use sparingly to prefix eyebrows and mark direction/section. `↗` for outbound links, `◌` / `◊` / `◇` for eyebrow ornaments, `¶` for editorial pause, `§` for sections.

### 06.3 The peach diamond

The core graphic mark — a square rotated 45°, solid peach. Anchors corners, stands in as the favicon / monogram mark, punctuates eyebrow rows. See [§ 03.2](#032-the-graphic-mark--the-peach-diamond).

```svg
<!-- As parked in the master OG card (1200 × 630): top-right optical margin -->
<g transform="translate(1078 130) rotate(45)">
  <rect x="-22" y="-22" width="44" height="44" fill="#e3bfb4" />
</g>
```

### 06.4 Hairlines & frames

- 1px rules at `rgba(239,236,233,0.12)`.
- Thin editorial **frame inset from the edge** — the OG card insets `40 px` on a 1200×630 canvas → a `1120 × 550` frame.
- A rule can be tapered: a linear gradient from transparent → 35% warmwhite → transparent, for footer straps and signature underlines.

### 06.5 The peach glow

A soft radial peach glow bleeding from a corner over deep ink. In the master OG it sits at `cx 78% / cy 32%`, radius `62%`, peach at `0.22` fading to ink at `0`. The icon routes warm a tighter glow from `50% 38%`. Always low opacity; it is atmosphere, never a spotlight.

### 06.6 Composition

Tabular numerals, generous negative space, magazine-cover balance: eyebrow row top, giant headline mid-left, meta footer over a hairline, one accent (diamond or peach period) parked at an optical margin.

---

## § 07 — Layout, grid & spacing

### 07.1 Grid

- **Editorial 12-column grid** with generous gutters. Most content lives on a sub-grid of the 12.
- **Inset frame:** content sits inside a hairline frame inset from the page edge — `~3.3%` of canvas width (40 px on 1200; scale proportionally).
- **Cover composition** (OG, banners, hero): eyebrow row pinned top, display wordmark anchored lower-left, accent mark top-right, meta footer on a hairline along the bottom.

### 07.2 Spacing scale

A `4px` base, doubling editorially:

```
4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 px
```

Negative space is a feature, not a gap to fill. When unsure, add space.

### 07.3 Motion (for living surfaces)

| Token | Value | Use |
| --- | --- | --- |
| `ease` | `cubic-bezier(0.6, 0.05, 0.01, 0.99)` | Default editorial ease |
| `ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entrances, reveals |
| Marquee | `40s linear infinite` | Running labels |
| Slow spin | `28s linear infinite` | Ambient marks |

Honor `prefers-reduced-motion` everywhere. Motion is craft, not noise — the calm build must always exist.

### 07.4 Atmosphere modes

The live site can retone the global ground/accent via `data-atmosphere` (set by `AtmosphereMode.tsx`) without rebuilding the palette. The default equals **aura**. These are runtime moods, not new brand colors — exports, banners, email, and print stay in the canonical palette.

| Mode | `--bg` | `--fg` | `--accent` | `color-scheme` |
| --- | --- | --- | --- | --- |
| `aura` (default) | `#0c0c0c` | `#efece9` | `#e3bfb4` | dark |
| `storm` | `#07080c` | `#f0f4ef` | `#cdfa00` | dark |
| `stillness` | `#050507` | `#ece9e3` | `#efece9` | dark |
| `eink` (light) | `#efece9` | `#0c0c0c` | `#1f1f1f` | light |
| `terminal` | `#030604` | `#b8ffd0` | `#00dc5a` | dark |

---

## § 08 — Asset index

### 08.1 Brand exports — `public/brand/` (distributable)

The `public/brand/` directory is the home for **distributable brand exports**. Every file is a hand-tuned, accessible SVG (each carries `role="img"` with a `<title>`/`<desc>`). Pull from these canonical names — never re-draw the wordmark or diamond by hand. All exports must pass the [§ 03.6 misuse checklist](#036-dont--logo-misuse).

| File | viewBox | When to use |
| --- | --- | --- |
| `brand/wordmark.svg` | 980 × 220 | The inline `Delowar Hossain.` wordmark, Newsreader italic, on transparent |
| `brand/logomark.svg` | 512 × 512 | Primary DH monogram mark — italic-serif DH + peach diamond, on ink |
| `brand/logomark-ink.svg` | 512 × 512 | Inverted DH monogram — ink on paper, for light/print surfaces |
| `brand/monogram.svg` | 256 × 256 | Square ink tile, knockout italic-serif **D** in the peach diamond — app-icon scale |
| `brand/lockup-horizontal.svg` | 1440 × 360 | Horizontal lockup — mark + wordmark side by side |
| `brand/lockup-stacked.svg` | 800 × 760 | Stacked cover lockup — `Delowar` / `Hossain.` |
| `brand/avatar.svg` | 400 × 400 | 1:1 social avatar, DH monogram in a peach ring — reads at 48 px |
| `brand/signature.svg` | 1300 × 220 | Sacramento peach script signature with a fading flourish, transparent |
| `brand/banner-x.svg` | 1500 × 500 | X / Twitter header (see § 09) |
| `brand/banner-linkedin.svg` | 1584 × 396 | LinkedIn banner (see § 09) |
| `brand/banner-email.svg` | 1200 × 360 | Email masthead artwork (see § 10) |
| `brand/business-card-front.svg` | 1050 × 600 | Business card front (3.5 × 2 in @ 300 dpi) |
| `brand/business-card-back.svg` | 1050 × 600 | Business card back |
| `brand/poster.svg` | 1190 × 1684 | A-series brand poster (ISO A ratio) — wordmark, tagline, grid, coordinates |

> Rasterize SVGs to PNG only at the point of use (a platform that rejects SVG). Export at the target pixel dimensions in this table; keep the SVG as the source of truth.

### 08.2 Live site assets — `/public`

| File | Type | Dimensions / size | Use |
| --- | --- | --- | --- |
| `public/og.svg` | SVG | 1200 × 630 | **Reference master** OG card; canonical DNA source |
| `public/profile.png` | PNG | 1317 × 1194 (~1.7 MB) | Hero portrait, JSON-LD `Person.image`, OG fallback |
| `public/profile-og.png` | PNG | 512 × 464 (~256 KB) | Compact portrait for share/OG contexts |
| `public/resume.pdf` | PDF | ~152 KB | Print-ready résumé |
| `public/humans.txt` | text | — | Credits / colophon (`humanstxt.org`) |
| `public/.well-known/security.txt` | text | — | Security contact |

### 08.3 Generated assets — Next.js metadata routes (`/src/app`)

| Route file | Output | Size |
| --- | --- | --- |
| `icon.svg` | Favicon — peach diamond + knockout serif **D** on ink-950 | 32 × 32 |
| `apple-icon.tsx` | Apple touch icon — peach diamond (118 px) + knockout **D** on ink-950 | 180 × 180 |
| `opengraph-image.tsx` | Root OG card | 1200 × 630 |
| `twitter-image.tsx` | Twitter card (re-exports the OG generator) | 1200 × 630 |
| `*/opengraph-image.tsx` | Per-route OG cards (about, works, lab, contact, brand, colophon, services, resume, journal, now, atlas, awards, achievements, archive, ai, colors, portfolios, process, showreel, uses, changelog, plus `journal/[slug]`, `lab/[slug]`, `works/[slug]`) | 1200 × 630 |

---

## § 09 — Social banner specs & safe areas

Every banner is one cover composition: ink-950 ground, corner peach glow, 6 px peach top rule, inset hairline frame, peach eyebrow, Newsreader wordmark with a peach trailing period, mono/Inter meta. Keep all type and the diamond inside the **safe area** so platform avatars and crops never clip them.

| Platform | Canvas | Brand asset | Safe area | Avatar-clip zone |
| --- | --- | --- | --- | --- |
| X / Twitter header | 1500 × 500 | `brand/banner-x.svg` | inset ~60 px; hold key text in the upper-left / center band | bottom-left avatar disc (mobile) |
| LinkedIn banner | 1584 × 396 | `brand/banner-linkedin.svg` | inset ~50 px; keep type right of the lower-left avatar | bottom-left avatar (desktop) |
| Email masthead | 1200 × 360 | `brand/banner-email.svg` | inset ~40 px hairline frame | none |
| OG / Twitter card | 1200 × 630 | `public/og.svg` + route generators | inset 40 px hairline frame | none (no crop) |
| Avatar (1:1) | 400 × 400 | `brand/avatar.svg` | center monogram; corners are decorative ticks only | platforms mask to a circle — keep the mark within the inscribed circle |

> There is no GitHub social-preview file in `public/brand/`. If a 1280 × 640 GitHub preview is needed, export it from the OG master (`public/og.svg`) at that size rather than authoring a new layout.

### Banner recipe (matches `banner-x.svg` / `banner-linkedin.svg`)

```
1. Fill ink-950 #070708 (banner ground).
2. 6 px peach top rule: solid #e3bfb4 across the full width.
3. Radial peach glow from a corner: #e3bfb4 @ ~0.22 fading to ink @ 0.
4. Inset hairline frame: stroke #efece9 @ 0.12, inset per platform.
5. Eyebrow (Inter UPPERCASE, ~0.3em tracking, warmwhite ~60%):
   "◌ FOLIO · MMXXVII"        left
   "JOYPURHAT · BANGLADESH"   right
6. Wordmark (Newsreader italic 400, tracking -0.045em, warmwhite),
   trailing period in peach #e3bfb4. Keep inside the safe area.
7. Role + stack line beneath (Inter UPPERCASE / JetBrains Mono).
8. Footer over a tapered hairline:
   "CREATIVE DEVELOPER · UI / UX DESIGNER"   left, warmwhite ~78%
   "DELOWARHOSSAIN.DEV"                      right, peach
9. Peach diamond parked in a margin, clear of the avatar zone.
```

**Safe-area rule:** assume each platform overlays an avatar disc (and may round the canvas corners). Nothing load-bearing — wordmark, domain, diamond — enters the avatar zone or the outer 40–60 px margin. For the 1:1 avatar, keep the mark inside the circle the platform inscribes.

---

## § 10 — Email system

HTML email templates live in **[`emails/`](emails/)** at the repo root (`announcement.html`, `availability.html`, `newsletter.html`, `welcome.html`, plus `index.html` as the gallery/index). They inherit this system:

- **Ground:** ink `#070708` / `#0c0c0c`, with a 6 px **peach top rule** (`#e3bfb4`) — the same masthead device as the OG card and banners.
- **Frame:** inset hairline `rgba(239,236,233,0.12)`.
- **Eyebrow:** Inter UPPERCASE, wide-tracked, warmwhite ~60%.
- **Headline:** Newsreader — but rely on the Georgia fallback chain. Most clients won't load a webfont; that's expected and acceptable.
- **Body:** warmwhite `#efece9` on ink; links in peach `#e3bfb4`.
- **Signature:** `Delowar Hossain.` (period in peach where supported), role + domain beneath in mono/Inter.

### Email client support matrix

| Client | Webfonts | Background images | Hairline borders | Strategy |
| --- | --- | --- | --- | --- |
| Apple Mail (macOS/iOS) | ✓ | ✓ | ✓ | Full system; Newsreader can load |
| Gmail (web) | ✗ | partial | ✓ | Georgia fallback; fully inlined styles (Gmail strips `<style>`/`<head>`) |
| Gmail (mobile app) | ✗ | partial | ✓ | Georgia fallback; inline styles |
| Outlook (Windows, Word engine) | ✗ | ✗ | partial | Solid ink fill via tables; no radial glow; VML only if a background is truly required |
| Outlook (web / Mac) | partial | ✓ | ✓ | Mostly full |
| Yahoo / others | ✗ | partial | ✓ | Georgia fallback, inline styles |

**Email build rules:**

- **Inline every style.** Gmail strips `<head>`/`<style>`; assume nothing in a stylesheet survives.
- **Tables for layout**, not flexbox/grid. Set explicit `width`, `bgcolor`, `cellpadding="0" cellspacing="0" border="0"`.
- **The radial glow is progressive enhancement** — never let the design depend on it. Outlook (Word engine) will drop background images; the layout must read on a flat ink fill.
- **The 6 px peach top rule is the one device every client must keep** — implement it as a solid colored table row (`bgcolor="#e3bfb4"` with a fixed `height`), not a CSS `border`.
- **Dark mode:** the design is already dark, but Apple Mail / Gmail can auto-invert. Pin critical colors with `bgcolor` on cells (not just CSS), and avoid pure `#000` so inversion has room to behave. Include `<meta name="color-scheme" content="dark light">` and `<meta name="supported-color-schemes" content="dark light">`.
- **Always ship a plaintext part** alongside the HTML.
- **Use absolute `https://` URLs** for any images, with descriptive `alt` text, and never rely on images to convey the wordmark — set it as live text with the Georgia fallback.

---

## § 11 — Licensing & contact

### Licensing

- **The wordmark, the peach-diamond / DH mark, and the name "Delowar Hossain."** are personal identity marks. They are **not** open for reuse, remix, or redistribution.
- The repository's **code** is governed by the root [`LICENSE`](LICENSE) file — read it for any code reuse.
- This brand system (color tokens, type roles, composition, motifs) is documented for collaborators working **on** this identity, not for cloning it onto another.
- Third-party faces — Newsreader, Inter, JetBrains Mono, Sacramento — ship under the **SIL Open Font License**; honor their terms in any export.

### Contact

| | |
| --- | --- |
| Email | hello@delowarhossain.dev |
| Domain | delowarhossain.dev |
| Studio | The Compiled Thought |
| Location | Joypurhat, Bangladesh — 25.10° N, 89.02° E |
| GitHub | [@mdhossain-2437](https://github.com/mdhossain-2437) |
| X | [@mdhossain2437](https://x.com/mdhossain2437) |
| LinkedIn | [in/mdhossain2437](https://www.linkedin.com/in/mdhossain2437) |
| read.cv | [read.cv/delowar](https://read.cv/delowar) |

For brand questions, asset requests, or anything that touches the wordmark, write to **hello@delowarhossain.dev** before shipping.

---

*Delowar Hossain. — The Compiled Thought · MMXXVII · § 03.27*
*Editorial design meets high-performance creative development. ◊*
