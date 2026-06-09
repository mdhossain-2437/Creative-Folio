# Delowar Hossain. — Brand Asset Index

`public/brand/` · Edition **MMXXVII** · § 03.27 · The Compiled Thought

The source-of-truth vector kit for the identity of **Delowar Hossain.** — Creative
Developer & UI/UX Designer. Every file here is hand-tuned SVG: deep ink grounds, a
peach diamond, hairline frames, and italic Newsreader display. Treat this folder as
the master; raster exports (PNG/JPG) are downstream and disposable. If a mark needs
to change, change the SVG and re-export — never edit a PNG by hand.

Each file is served verbatim at `/brand/<file>` and is surfaced on the live brand
page at `/brand` (`src/app/brand/page.tsx`). Keep this index, that page, and the
files themselves in sync — if you add, rename, or resize an asset, update all three.

> One system. Editorial first, accent never leads. Peach `#e3bfb4` is the brand
> color; it carries the trailing period, the diamond, eyebrows, links, and the
> corner glow — nothing else. Electric `#cdfa00` is forbidden except a single
> live/open dot (it appears exactly once in the kit, on the LinkedIn banner).

---

## ◌ Asset table

There are **14** SVGs. All canvases use a **deep-ink ground** unless the surface
column says otherwise. "on-dark" means the mark is drawn for placement over
`ink-950 #070708`; "on-light" inverts the ground to read on `paper #f3efe9`.
"transparent" means no background rect — the mark must sit on a dark surface to
read (the period and accents are warm, low-contrast tones).

Canvas sizes are the exact `viewBox` of each file; the live `/brand` page lists the
same dimensions.

| File | Purpose | Canvas | Surface | Where used |
| --- | --- | --- | --- | --- |
| `logomark.svg` | **Primary mark** — DH monogram fused with the peach diamond, eyebrow strap, footer wordmark, corner ticks | 512 × 512 | on-dark | Default brand mark, PWA/app icon, social profile, repo avatar, share previews |
| `logomark-ink.svg` | Logomark inverted — ink on a warm paper field | 512 × 512 | on-light | Light email headers, paper, invoices, light decks, print stationery |
| `monogram.svg` | Square tile — knockout italic *D* inside a peach diamond on ink, peach top edge, hairline frame | 256 × 256 | on-dark | Avatars, favicon source, app tile, stamp watermark |
| `avatar.svg` | 1:1 social avatar — ringed DH monogram, strap, edition year; tuned to read at 48 px | 400 × 400 | on-dark | Profile pictures (GitHub, X, LinkedIn, read.cv), comment avatars |
| `wordmark.svg` | Full wordmark — *Delowar Hossain.* in italic Newsreader, peach trailing period, left-aligned | 1180 × 220 | transparent | Site footer, signature lockup, email sign-off, press kit (place on dark) |
| `lockup-horizontal.svg` | **Signature lockup** — diamond mark · hairline divider · wordmark + role line | 1440 × 360 | on-dark | Site headers, README banners, talk slides, wide cards |
| `lockup-stacked.svg` | Centered lockup — mark over two-line *Delowar* / *Hossain.* + strap | 800 × 760 | on-dark | Cover compositions, intro screens, email banner source, narrow rails |
| `signature.svg` | Sacramento-script "Delowar Hossain" in peach with a fading flourish | 1300 × 220 | transparent | Letter sign-off, colophon, hand-signed feel (place on dark) |
| `banner-x.svg` | X / Twitter header — wordmark, role, stack line; avatar + UI safe areas respected | 1500 × 500 | on-dark | X / Twitter profile header |
| `banner-linkedin.svg` | LinkedIn cover — lockup held centre-right of the photo overlap; carries the lone electric "open" dot | 1584 × 396 | on-dark | LinkedIn profile cover |
| `banner-email.svg` | Email header — centered stacked lockup; survives a 50% downscale to 600 px | 1200 × 360 | on-dark | Newsletter / campaign header, email sign-off block |
| `business-card-front.svg` | Card front — monogram + diamond, wordmark, role, meta row (3.5 × 2 in) | 1050 × 600 | on-dark | Printed business card, front face |
| `business-card-back.svg` | Card back — "Let's build something." headline + contact block (email, web, social, studio) | 1050 × 600 | on-dark | Printed business card, back face |
| `poster.svg` | A-series statement poster — giant two-line wordmark, tagline, stack signature, footer | 1190 × 1684 | on-dark | Print poster (1 : 1.414 / ISO A), feature hero, framed piece |

> The kit's OG / share card is **not** a file in this folder — it is generated at
> the `/brand/opengraph-image` route and the site-wide `public/og.svg`. For social
> link unfurls, point `og:image` at those, or export `logomark.svg` /
> `lockup-horizontal.svg` to PNG. The whole kit mirrors the OG DNA: ink base, a
> 6px peach top rule, a corner peach radial glow at ~0.20–0.22, an inset hairline
> frame (`#efece9` @ 12%), a tracked peach eyebrow, an italic Newsreader headline,
> and the 45° peach diamond.

---

## ◊ Palette reference

Only these values appear in the kit. No off-system colors; the only gradients are
the defined peach glows, the hairline rules, and a subtle peach diamond sheen.

| Token | Hex | Role in the marks |
| --- | --- | --- |
| `ink-950` | `#070708` | Primary ground for every on-dark asset |
| `ink-900` | `#0c0c0c` | Card preview background on the `/brand` page |
| `ink-800` | `#131313` | Inset fills, panel steps |
| `ink-700` | `#1f201f` | Raised edges, subtle steps |
| `ink-600` | `#525259` | Disabled / deep meta |
| `ink-500` | `#717179` | Meta text, coordinate dimming |
| `ink-400` | `#c6c6c7` | Muted text and rules on light |
| `warmwhite` | `#efece9` | Primary text on dark (100 / 70 / 55%) and the hairline rule |
| `bone` | `#e5e2e0` | Light surface secondary |
| `paper` | `#f3efe9` | Primary light surface (`logomark-ink` ground) |
| `peach` | `#e3bfb4` | **Brand accent** — period, diamond, eyebrows, links, glow |
| `electric` | `#cdfa00` | Forbidden except a single live/open dot (`banner-linkedin.svg` only) |

Hairline rule (on dark): `rgba(239,236,233,0.12)` — i.e. `#efece9` at 12%.
Corner glow: `radialGradient` of peach `#e3bfb4` at `0.20`–`0.22` → transparent ink.
Diamond sheen (where used): a quiet peach gradient `#ecd0c7 → #e3bfb4 → #d6ab9e`.

---

## ¶ Typography in the marks

Fonts are referenced by family with full fallback chains. For pixel-stable raster
exports, **outline the text** (Inkscape: *Path → Object to Path*; Figma: *Outline
stroke / flatten*) so renderers without the webfonts still match. Without the
webfonts, the fallback serif (Georgia) and script (Snell Roundhand) will shift
metrics — outline before exporting anything for distribution.

| Use | Family | Fallback chain | Treatment |
| --- | --- | --- | --- |
| Display / wordmark | Newsreader | `"Newsreader", "Georgia", "Times New Roman", serif` | Italic, tracking −0.03 to −0.045em, leading ~0.9 |
| Eyebrows / labels | Inter | `"Inter", "Helvetica Neue", Arial, system-ui, sans-serif` | UPPERCASE, tracking 0.18–0.32em, 10–14px |
| Coordinates / meta | JetBrains Mono | `"JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace` | Tabular numerals |
| Signature | Sacramento | `"Sacramento", "Snell Roundhand", cursive` | Script, single weight, peach |

---

## ◇ Clear space & minimum sizes

**Clear space.** For the wordmark, reserve a margin equal to the cap-height of the
**D** (call it `1×`) on all four sides — nothing (type, rules, image edges, other
logos) enters that zone. For `logomark` / `monogram` / `avatar` and the bare
diamond, clear space is **half the mark's own width** on every side. The framed
marks (`logomark`, `monogram`, `avatar`, banners, cards, poster) already carry an
inset hairline frame — treat the area *outside* the frame as additional clear space;
do not crop into it.

**Minimum sizes.** Below these thresholds, switch to the simpler mark in the same row.

| Mark | Min width (screen) | Min width (print) | Below minimum, use |
| --- | --- | --- | --- |
| `lockup-horizontal.svg` | 320 px | 60 mm | `wordmark.svg` |
| `lockup-stacked.svg` | 200 px | 40 mm | `logomark.svg` |
| `wordmark.svg` | 180 px | 32 mm | `logomark.svg` |
| `logomark.svg` | 64 px | 14 mm | `monogram.svg` |
| `monogram.svg` / `avatar.svg` | 32 px | 8 mm | `monogram.svg` (already atomic at this size) |
| `banner-*.svg` | render at native size | — | do not scale a banner below 50% of native |
| `business-card-*.svg` | — | print at 3.5 × 2 in (89 × 51 mm) | — |
| `poster.svg` | — | print at ISO A (e.g. A3 297 × 420 mm, A2 420 × 594 mm) | — |

**Don'ts.** Don't recolor the diamond off-peach. Don't drop the trailing period.
Don't set the wordmark upright/roman (it is italic by design). Don't add shadows,
bevels, or outer glows beyond the defined corner radial. Don't place the
transparent marks (`wordmark`, `signature`) on light surfaces — they're tuned for
dark; on paper use `logomark-ink.svg`. Don't place on-dark marks over busy
photography without an ink scrim. Don't stretch — scale uniformly only.

---

## ↗ Exporting to PNG

SVG is the master. Generate raster only at the moment of need, at exact pixel
targets. Pick one tool and stay consistent. All commands assume you run them from
the repository root.

### librsvg (`rsvg-convert`) — fastest, CI-friendly

```bash
# Single export at a fixed width (height auto-keeps aspect ratio)
rsvg-convert -w 512 public/brand/logomark.svg -o logomark-512.png

# Force both dimensions for an exact 1:1 tile
rsvg-convert -w 512 -h 512 public/brand/logomark.svg -o logomark-512.png

# Banner at native size (exact share-card dimensions)
rsvg-convert -w 1500 -h 500 public/brand/banner-x.svg -o banner-x.png

# App-icon ladder from the square logomark
for s in 192 256 512; do
  rsvg-convert -w "$s" -h "$s" public/brand/logomark.svg -o "icon-${s}.png"
done
```

> `rsvg-convert` does **not** load system fonts reliably. Outline the text in the
> SVG first (see Typography), or the Newsreader/Sacramento glyphs fall back and
> shift. Prefer Inkscape or Figma when type fidelity matters.

### Inkscape (≥ 1.0) — best font/effect fidelity

```bash
inkscape public/brand/logomark.svg --export-type=png \
  --export-width=512 --export-height=512 \
  --export-filename=logomark-512.png

# Batch the app-icon set
for s in 192 256 512; do
  inkscape public/brand/logomark.svg --export-type=png \
    --export-width="$s" --export-height="$s" \
    --export-filename="icon-${s}.png"
done
```

### Figma — design review & hand-tuning

Drop the SVG onto a frame sized to its canvas (e.g. 1500 × 500 for `banner-x`),
then *Export* the frame. Use **1×** for share cards and banners (platforms expect
native pixel dimensions), **2×** for retina UI. Install the four webfonts locally
or outline the text before exporting so the wordmark renders true.

### Common target sizes

| Asset | Recommended PNG exports |
| --- | --- |
| `logomark.svg` | 192, 256, 512 (+ 1024 for app stores) |
| `monogram.svg` | 32, 64, 128, 256 (favicon source: 16–48) |
| `avatar.svg` | 200, 400, 460 (read.cv), 800 |
| `lockup-horizontal.svg` | native 1440 × 360, plus 2× for retina |
| `lockup-stacked.svg` | native 800 × 760, plus 2× |
| `wordmark.svg` | 2× and 3× of placement width |
| `signature.svg` | 2× and 3× of placement width |
| `banner-x.svg` | 1500 × 500 (X / Twitter native) |
| `banner-linkedin.svg` | 1584 × 396 (LinkedIn native) |
| `banner-email.svg` | 1200 × 360 (and a 600 × 180 retina-paired @1×) |
| `business-card-*.svg` | 1050 × 600 @ 300 dpi, or export to PDF for print |
| `poster.svg` | native 1190 × 1684, or scale to A3/A2 at 300 dpi |

> Optimize SVGs before commit with `svgo --multipass`; strip editor metadata but
> **keep** `viewBox`, `role="img"`, and the `<title>` / `<desc>` referenced by
> `aria-labelledby`. For social, flatten to PNG — many scrapers won't render an SVG
> `og:image`. Every mark in this kit already ships with a `<title>` and `<desc>`
> for accessibility; preserve them.

---

## § Usage license & credit

These marks identify a specific person and studio. They are **not** open-licensed.
The logomark, monogram, wordmark, lockups, diamond, signature, banners, cards,
poster, and edition marks are the proprietary identity of **Delowar Hossain.** /
**The Compiled Thought** — © MMXXVII, all rights reserved. You may reproduce them
unaltered to link to, cite, credit, or write about Delowar Hossain (press,
interviews, conference bios, "built by" footers), preserving proportions, color,
and clear space. You may not modify the marks, imply endorsement or partnership, or
use them in any other identity. For any other use, ask first —
**hello@delowarhossain.dev** · delowarhossain.dev · 25.10° N / 89.02° E,
Joypurhat, Bangladesh.

<sub>◊ MMXXVII — The Compiled Thought. Bridging editorial design and high-performance creative development.</sub>
