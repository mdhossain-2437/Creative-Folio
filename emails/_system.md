# Email Design System
### Delowar Hossain — MMXXVII Edition · `§ 03.27`

> The system behind the inbox. This document defines the tokens, the 600px grid, the reusable components, the bulletproof patterns, and the client matrix that keep every letter from `hello@delowarhossain.dev` reading like one object — ink-led, type-first, accent-restrained.

Email is the most hostile rendering environment in the kit: 2007's CSS support against 2027's expectations. Everything here exists to make an editorial, dark-background email survive Outlook's Word engine, Gmail's class-stripping, and Dark Mode's colour inversion — without losing the magazine-cover composition the brand is built on.

```
EDITION    MMXXVII / 03.27
STUDIO     The Compiled Thought
ORIGIN     Joypurhat, Bangladesh — 25.10 N · 89.02 E
DOMAIN     delowarhossain.dev
WIDTH      600px content / 640px outer table
TEMPLATES  welcome · newsletter · announcement · availability
GALLERY    index.html  (preview of all four letters)
```

> **Source of truth.** The four shipped letters live in `/emails`: `welcome.html`, `newsletter.html`, `announcement.html`, `availability.html`. The token block this doc mirrors is the `:root` in `emails/index.html`. If the code and this doc ever disagree, the code wins — then fix the doc.

---

## §00 — Principles

Read these before touching a `<td>`. They override convenience every time.

1. **Editorial first, accent never leads.** Backgrounds are deep ink. Text is `warmwhite` at 100 / 72 / 55% for hierarchy. Peach is the trailing period, the diamond, the eyebrow, the hairline glow, the link, and the one button. It is never a body colour and never a fill behind paragraphs.
2. **Electric is forbidden in email** except a single 8px "live / open" dot in the `availability` letter. Dark-Mode mangling and low-contrast risk make it a liability anywhere else.
3. **Tables, not divs.** Layout is `<table role="presentation">`. Flexbox and grid do not exist in Outlook. CSS Grid is for the preview gallery (`index.html`), never the letters.
4. **Inline every paint-critical style.** Gmail strips `<style>` in some forwarding and clipping scenarios. Colours, fonts, sizes, and spacing that must survive are inlined on the element. `<style>` is progressive enhancement only (hover, dark-mode, media queries).
5. **Legibility floor is 14px.** Body copy never drops below 14px; eyebrows and mono meta never below 11px, and only in uppercase tracked caps where the form is the point.
6. **Images-off is the default render.** Assume every image is blocked. The letter must be fully legible, fully branded, and fully actionable with zero images loaded. The 6px peach rule, the diamond, the wordmark, and the buttons are all CSS/HTML — never images.
7. **One letter, one idea, one primary button.** Each template has a single primary action. Secondary actions are text links, not competing solid buttons.

---

## §01 — Color Tokens

The exact palette. No other hex values enter an email. These mirror the `:root` block in `emails/index.html` — keep them identical so the gallery and the letters never drift.

| Token | Hex | Role in email |
|---|---|---|
| `ink-950` | `#070708` | Primary background. The page, the outer table, every shell. |
| `ink-900` | `#0c0c0c` | Card / content-block surface, one step up from the page. |
| `ink-800` | `#131313` | Inset wells, code blocks, faux-chrome strips. |
| `ink-700` | `#1f201f` | Pressed surfaces, the darkest solid border before a hairline. |
| `ink-600` | `#525259` | Compliance text, the `·` separators, key labels. |
| `ink-500` | `#717179` | Muted meta text, specs, captions. |
| `ink-400` | `#c6c6c7` | Muted body / coordinate text; underline colour on muted links. |
| `warmwhite` | `#efece9` | **Primary text on dark.** Headlines, body at 100%. |
| `bone` | `#e5e2e0` | Values in meta rows, hovered links, a step down from white. |
| `paper` | `#f3efe9` | Light surfaces — only the rare inverted block (e.g. a quote card). |
| `peach` | `#e3bfb4` | **The brand accent.** Trailing period, diamond, eyebrow, links, the one button, hairline glow. |
| `electric` | `#cdfa00` | **Forbidden** except the live/open dot. Never body, never a button. |

**Derived values** (use these literal strings — Dark Mode and Outlook do not honour CSS custom properties, so inline the resolved value):

| Purpose | Value |
|---|---|
| Hairline rule on dark | `rgba(239, 236, 233, 0.12)` |
| Hairline (stronger) | `rgba(239, 236, 233, 0.18)` |
| Inner ghost frame | `rgba(239, 236, 233, 0.05)` |
| Body text ~72% | `rgba(239, 236, 233, 0.72)` |
| Meta text 55% | `rgba(239, 236, 233, 0.55)` |
| Peach glow (corner radial) | `radial-gradient(circle at 88% -8%, rgba(227,191,180,0.16), transparent 60%)` |
| Peach selection | `rgba(227, 191, 180, 0.30)` |
| Peach top rule (gradient) | `linear-gradient(90deg, #e3bfb4 0%, #efd2c8 45%, #d8a99c 100%)` |
| Outlook hairline fallback | solid `#1f201f` (Word ignores `rgba`) |

> **Outlook note:** Word's engine ignores `rgba()`. Anywhere a hairline must show in Outlook desktop, fall back to a *solid* `#1f201f` border or a VML fill. The `rgba` hairline is an enhancement, not a requirement — and never stack both a solid `bgcolor` *and* an `rgba` border on the same 1px cell, or compliant clients paint a 2px rule.

```html
<!-- Hairline (one technique, not two). Outlook sees solid #1f201f; everyone else
     sees it too. To get the softer rgba look, swap the bgcolor for the border,
     never run both at once. -->
<td height="1" style="height:1px; line-height:1px; font-size:1px;
     background-color:#1f201f;">&nbsp;</td>

<!-- Softer rgba variant (Apple/Gmail). Outlook squares to nothing here, so reserve
     this for non-critical rules only. -->
<td height="1" style="height:1px; line-height:1px; font-size:1px;
     border-top:1px solid rgba(239,236,233,0.12);">&nbsp;</td>
```

---

## §02 — Typography

Four families, web-safe fallback chains, and `@font-face` loaded in `<head>` for the clients that honour it (Apple Mail, iOS Mail, some Outlook.com). Outlook desktop will fall back to the chain — **design for the fallback**, treat the web font as a gift.

| Role | Family | Fallback chain | In-email treatment |
|---|---|---|---|
| Display / wordmark | Newsreader | `"Newsreader", "Georgia", "Times New Roman", serif` | Italic 500 for the wordmark + headlines. Tracking −0.02 to −0.045em, line-height 0.9–1.0. |
| UI / eyebrows | Inter | `"Inter", "Helvetica Neue", Arial, system-ui, sans-serif` | UPPERCASE, letter-spacing 0.18–0.32em, 11–13px, weight 600. |
| Code / meta / coords | JetBrains Mono | `"JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace` | Tabular numerals, 11–13px, the §, the coordinates, specs. |
| Signature | Sacramento | `"Sacramento", "Snell Roundhand", cursive` | The signed name in the footer only. Always backed by a tracked-caps fallback line. |

```html
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <!-- Apple Mail / iOS / Outlook.com honour these; Outlook desktop ignores them -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Sacramento&display=swap">

  <!--[if mso]>
  <noscript><xml>
    <o:OfficeDocumentSettings>
      <o:PixelsPerInch>96</o:PixelsPerInch>
      <o:AllowPNG/>
    </o:OfficeDocumentSettings>
  </xml></noscript>
  <style>
    /* Outlook: force the fallback so nothing renders in Times where we want Georgia */
    .serif { font-family: Georgia, "Times New Roman", serif !important; }
    .sans  { font-family: "Helvetica Neue", Arial, sans-serif !important; }
    .mono  { font-family: Consolas, "Courier New", monospace !important; }
    table  { border-collapse: collapse !important; }
  </style>
  <![endif]-->
</head>
```

> **VML needs the namespaces.** The `xmlns:v` and `xmlns:o` declarations on `<html>` are *mandatory* — without them every `v:roundrect`/`v:rect` silently fails to paint in Outlook and you get a blank button. The `OfficeDocumentSettings` / `PixelsPerInch 96` block stops Outlook on high-DPI Windows from over-scaling VML and images.

**Type scale (email-tuned).** Smaller than web — inbox reading distance is closer and the column is narrow.

| Step | px / line-height | Family | Use |
|---|---|---|---|
| Hero | 44 / 0.95 | Newsreader italic | Announcement hero headline (single template). |
| Display | 34 / 0.95 | Newsreader italic | Masthead wordmark, journal title. |
| Title | 26 / 1.0 | Newsreader italic | Content-block headings. |
| Lede | 20 / 1.45 | Newsreader 400 | Opening paragraph / pull-quote. |
| Body | 16 / 1.6 | Inter 400 | Default paragraph. |
| Small | 14 / 1.55 | Inter 400 | Secondary copy. **Floor.** |
| Eyebrow | 12 / 1.4 | Inter 600 caps | Section eyebrows, button labels. |
| Meta | 11–13 / 1.9 | JetBrains Mono | Coordinates, footer, specs. **Mono floor 11px.** |

> **Anti-blue-link:** clients auto-link and recolour `mailto:`, URLs, and addresses. Always wrap them and force the colour: `<a href="..." style="color:#e3bfb4; text-decoration:none;">`. Wrap raw addresses/dates in `<span style="color:#717179;">` so they don't turn iOS-blue.

---

## §03 — The 600px Grid

| Constant | Value | Notes |
|---|---|---|
| Content width | **600px** | The canonical column. Every component fits inside it. |
| Outer table | **640px** | 600 content + 20px gutter each side, so the frame never kisses the chrome. |
| Side padding | **32px** | Desktop. Collapses to 24px on mobile via media query. |
| Vertical rhythm | **8px base** | Spacing is a multiple of 8: 8 / 16 / 24 / 32 / 48 / 64. |
| Section gap | **48px** | Between major content blocks. |
| Block padding | **32px** | Inside a content block / card. |
| Border radius | **4px** | Outer frame and cards. Inner ghost frame 3px. Honoured by Apple/iOS only; Outlook squares them — acceptable, and several buttons ship square on purpose. |

**The outer scaffold.** Every template starts here. `role="presentation"` on all layout tables so screen readers skip the grid; `lang="en"` on `<html>` so they announce in English.

```html
<body style="margin:0; padding:0; background-color:#070708; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;">
  <!-- full-bleed background wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
         bgcolor="#070708" style="background-color:#070708; border-collapse:collapse;">
    <tr>
      <td align="center" style="padding:20px;">

        <!-- 640 outer / 600 content -->
        <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
               style="width:600px; max-width:600px; margin:0 auto; border-collapse:collapse;">
          <!-- 6px peach top rule — the brand spine -->
          <tr>
            <td height="6" bgcolor="#e3bfb4" style="height:6px; line-height:6px; font-size:6px;
                background-color:#e3bfb4;
                background-image:linear-gradient(90deg,#e3bfb4 0%,#efd2c8 45%,#d8a99c 100%);">&nbsp;</td>
          </tr>
          <!-- masthead → hero → content → footer go here -->
        </table>
        <!--[if mso]></td></tr></table><![endif]-->

      </td>
    </tr>
  </table>
</body>
```

**Mobile.** A single fluid breakpoint at 600px. `<style>`-driven, so it is enhancement — the 600px fixed table is the floor for Outlook.

```css
@media only screen and (max-width: 600px) {
  .full      { width: 100% !important; max-width: 100% !important; }
  .pad       { padding-left: 24px !important; padding-right: 24px !important; }
  .hero      { font-size: 34px !important; line-height: 0.95 !important; }
  .stack     { display: block !important; width: 100% !important; }
  .btn a     { display: block !important; text-align: center !important; }
  .meta-right{ text-align: left !important; }   /* footer meta unstacks left */
}
```

---

## §04 — Components

Eight reusable parts. Each is a self-contained table block you paste into the scaffold. Together they compose all four letters.

### 1 — Preheader

Hidden snippet text that controls the inbox preview line. Always present, always immediately after `<body>` opens, always followed by zero-width padding so the client doesn't leak body copy into the preview.

```html
<div style="display:none; max-height:0; overflow:hidden; mso-hide:all;
     font-size:1px; line-height:1px; color:#070708; opacity:0;">
  A note from the studio — typography, motion, and engineering, converged.
  &#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;
</div>
```

- Keep the visible part 40–90 chars. It is the second headline.
- The `&#847;&zwnj;&nbsp;` run is a combining-grapheme-joiner + zero-width-non-joiner + non-breaking-space — this is the exact padding sequence the shipped letters use; it pushes any stray "view in browser" / body text out of the preview snippet without showing visible characters.
- Voice: editorial, calm, no emoji, lowercase-friendly.

### 2 — Masthead / Header Banner

The 6px peach rule, the radial glow, the eyebrow with diamond, the wordmark, and a mono strap. This is the OG card's DNA compressed to 600px. The wordmark is **always** `Delowar Hossain.` with the trailing period in peach.

```html
<tr>
  <td class="pad" style="padding:40px 32px 0; background-color:#070708;
      background-image:radial-gradient(circle at 88% -8%, rgba(227,191,180,0.16), transparent 60%);">

    <!-- eyebrow: diamond + tracked caps -->
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td style="padding-right:12px; vertical-align:middle; font-size:0; line-height:0;">
        <!--[if mso]>
          <v:rect xmlns:v="urn:schemas-microsoft-com:vml"
                  style="width:8px;height:8px;rotation:45;" fillcolor="#e3bfb4" stroked="f">
            <v:fill type="solid" color="#e3bfb4"/>
          </v:rect>
        <![endif]-->
        <!--[if !mso]><!-->
        <span style="display:inline-block; width:8px; height:8px; background-color:#e3bfb4;
              transform:rotate(45deg);">&nbsp;</span>
        <!--<![endif]-->
      </td>
      <td class="sans" style="font-family:'Inter','Helvetica Neue',Arial,sans-serif;
          font-size:12px; font-weight:600; letter-spacing:0.30em; text-transform:uppercase;
          color:#e3bfb4;">§&nbsp;03.27&nbsp;·&nbsp;The Compiled Thought</td>
    </tr></table>

    <!-- wordmark -->
    <p class="serif" style="margin:18px 0 0; font-family:'Newsreader',Georgia,'Times New Roman',serif;
        font-style:italic; font-weight:500; font-size:34px; line-height:0.95;
        letter-spacing:-0.04em; color:#efece9;">
      Delowar Hossain<span style="color:#e3bfb4;">.</span>
    </p>

    <!-- mono strap -->
    <p class="mono" style="margin:14px 0 0; font-family:'JetBrains Mono',ui-monospace,Menlo,monospace;
        font-size:12px; letter-spacing:0.04em; color:#717179;">
      MMXXVII&nbsp;<span style="color:#525259;">·</span>&nbsp;25.10&nbsp;N · 89.02&nbsp;E
    </p>
  </td>
</tr>
```

> **The diamond is honest about Outlook.** Apple/Gmail get the rotated `<span>`. Outlook drops `transform`, so the VML path uses `v:rect` with `rotation:45` (a valid VML rotation; `v:shape` with no `path`/`coordsize` paints nothing and is *not* a substitute). If even VML is unavailable, the worst case is a small upright peach square — still on-brand, still visible with images off. Note `stroked="f"` (VML boolean shorthand), not `stroked="false"`.

### 3 — Hero

The magazine-cover moment. Used in `announcement` (full hero with optional bg image) and `welcome` (type-only). The headline is Newsreader italic; copy sits at ~72% warmwhite. **Background images are decorative only** — the headline must read with the image off, so set a solid `bgcolor="#070708"` on the cell.

```html
<tr>
  <td class="pad" bgcolor="#070708" style="padding:48px 32px 8px; background-color:#070708;">
    <p class="sans" style="margin:0 0 16px; font-family:'Inter','Helvetica Neue',Arial,sans-serif;
        font-size:12px; font-weight:600; letter-spacing:0.28em; text-transform:uppercase;
        color:#e3bfb4;">&#9671; New Work &middot; MMXXVII</p>
    <h1 class="serif hero" style="margin:0; font-family:'Newsreader',Georgia,'Times New Roman',serif;
        font-style:italic; font-weight:500; font-size:44px; line-height:0.95;
        letter-spacing:-0.04em; color:#efece9;">Aura&nbsp;Void&nbsp;v2.</h1>
    <p class="serif" style="margin:20px 0 0; font-family:'Newsreader',Georgia,'Times New Roman',serif;
        font-size:20px; line-height:1.45; color:#c6c6c7;">
      An ambient WebGL world built around a single noise field — now physics-aware.
    </p>
  </td>
</tr>
```

> Lede copy uses solid `#c6c6c7` rather than `rgba` warmwhite so Outlook (no `rgba`) still renders muted-not-black serif. Where `rgba` is safe (Apple/Gmail body), `rgba(239,236,233,0.72)` is preferred; pick per criticality.

### 4 — Content Block

The workhorse paragraph unit. Title (Newsreader), body (Inter, ≥16px), optional inline link in peach. Block-level vertical rhythm of 48px between instances.

```html
<tr>
  <td class="pad" style="padding:32px 32px;">
    <h2 class="serif" style="margin:0 0 12px; font-family:'Newsreader',Georgia,'Times New Roman',serif;
        font-style:italic; font-weight:500; font-size:26px; line-height:1.0;
        letter-spacing:-0.03em; color:#efece9;">The brief.</h2>
    <p class="sans" style="margin:0; font-family:'Inter','Helvetica Neue',Arial,sans-serif;
        font-size:16px; line-height:1.6; color:#efece9;">
      <span style="color:#efece9;">Editorial design and high-performance creative development, converged.</span>
      Read the full case study on
      <a href="https://delowarhossain.dev/works/aura-void" style="color:#e3bfb4; text-decoration:none; border-bottom:1px solid #e3bfb4;">delowarhossain.dev</a>.
    </p>
  </td>
</tr>
```

> For body at 72%, swap the paragraph colour to `rgba(239,236,233,0.72)` for Apple/Gmail; keep solid `#efece9` where Outlook must read clean. Never drop body below 14px or below ~55% opacity.

### 5 — Hairline Divider

The 1px editorial rule. Three flavours: plain hairline, hairline with a centred section glyph (§ 01, ◊, ¶), and hairline with a peach glow. The glow degrades to a plain rule where `rgba`/gradients are unsupported. **One paint technique per cell** — solid `bgcolor` *or* an `rgba` border, never both stacked.

```html
<!-- plain hairline (Outlook-safe: solid ink) -->
<tr><td class="pad" style="padding:0 32px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td height="1" bgcolor="#1f201f" style="height:1px; line-height:1px; font-size:1px;
        background-color:#1f201f;">&nbsp;</td>
  </tr></table>
</td></tr>

<!-- glyph divider: ¶ · § 02 · ¶ -->
<tr><td class="pad" align="center" style="padding:40px 32px;">
  <span class="mono" style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace;
        font-size:12px; letter-spacing:0.22em; text-transform:uppercase; color:#e3bfb4;">&para;&nbsp;&nbsp;&sect;&nbsp;02&nbsp;&nbsp;&para;</span>
</td></tr>
```

### 6 — Bulletproof Button

The single hardest component to get right cross-client. The **VML + anchor** pattern: Outlook paints the VML rounded rect, every other client paints the styled `<a>`. Two variants — **solid peach** (primary, ink text) and **ghost** (peach hairline border, warmwhite text). Never electric, never more than one solid button per email.

```html
<!-- PRIMARY — solid peach, ink text -->
<table role="presentation" cellpadding="0" cellspacing="0" border="0" class="btn"><tr><td align="center">
  <!--[if mso]>
  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"
    href="https://delowarhossain.dev/works/aura-void" style="height:48px;v-text-anchor:middle;width:240px;"
    arcsize="8%" stroke="f" fillcolor="#e3bfb4">
    <w:anchorlock/>
    <center style="color:#070708;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;">VIEW THE CASE STUDY&nbsp;&#8599;</center>
  </v:roundrect>
  <![endif]-->
  <!--[if !mso]><!-->
  <a href="https://delowarhossain.dev/works/aura-void"
     style="display:inline-block; background-color:#e3bfb4; color:#070708;
            font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:12px; font-weight:600;
            letter-spacing:0.16em; text-transform:uppercase; text-decoration:none;
            padding:15px 30px; border-radius:4px;">VIEW THE CASE STUDY&nbsp;&#8599;</a>
  <!--<![endif]-->
</td></tr></table>
```

```html
<!-- GHOST — peach hairline, warmwhite text (secondary CTA) -->
<table role="presentation" cellpadding="0" cellspacing="0" border="0" class="btn"><tr><td align="center">
  <!--[if mso]>
  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"
    href="https://delowarhossain.dev" style="height:48px;v-text-anchor:middle;width:200px;" arcsize="8%"
    strokecolor="#e3bfb4" strokeweight="1px" fillcolor="#070708">
    <w:anchorlock/>
    <center style="color:#efece9;font-family:Arial,sans-serif;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;">START A PROJECT</center>
  </v:roundrect>
  <![endif]-->
  <!--[if !mso]><!-->
  <a href="https://delowarhossain.dev"
     style="display:inline-block; background-color:#070708; color:#efece9;
            border:1px solid #e3bfb4; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:12px;
            font-weight:600; letter-spacing:0.16em; text-transform:uppercase; text-decoration:none;
            padding:14px 28px; border-radius:4px;">START A PROJECT</a>
  <!--<![endif]-->
</td></tr></table>
```

> **Rules of the button.** Min tap target 44×44px (we use 48px tall). Label is tracked caps, ≥12px. The `↗` (`&#8599;`) glyph is the brand's "go" mark. Width on the VML *must* be set explicitly — Outlook will not auto-size. `arcsize` is a percentage of the shorter side: on a 48px button, `8%` ≈ 4px radius. The shipped kit ranges from `arcsize="0%"` (square, Outlook-honest) to `"4%"`/`"6%"` — match the letter you are editing rather than forcing one value.

### 7 — Metrics Row

The OG / case-study metric quartet (Lighthouse · GLSL size · frame budget · dwell). A 4-column table that **stacks to 2×2 on mobile** via `.stack`. Mono tabular figures in peach, label in tracked caps.

```html
<tr><td class="pad" style="padding:8px 32px 24px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <!-- repeat 4× -->
    <td class="stack" width="25%" align="center" valign="top"
        style="padding:18px 8px; border-top:1px solid #1f201f;">
      <div class="mono" style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace;
           font-size:24px; font-weight:500; color:#e3bfb4; line-height:1;
           mso-line-height-rule:exactly; font-variant-numeric:tabular-nums;">98</div>
      <div class="sans" style="font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:11px;
           font-weight:600; letter-spacing:0.16em; text-transform:uppercase;
           color:#717179; margin-top:8px;">Lighthouse</div>
    </td>
  </tr></table>
</td></tr>
```

> Label colour is solid `#717179` (≈55% feel) rather than `rgba` warmwhite so the metric labels survive Outlook. `mso-line-height-rule:exactly` keeps Outlook from inflating the big figure's leading.

### 8 — Footer

The OG card's footer row, vertically arranged for email. Hairline above, signature (Sacramento + tracked-caps fallback), domain / email left, location / edition right, then the unsubscribe + physical-address compliance line. The live/open dot — **the only electric in the kit** — lives here in `availability`.

```html
<tr><td class="pad" style="padding:40px 32px 48px; border-top:1px solid #1f201f;">

  <!-- signature -->
  <p style="margin:0; font-family:'Sacramento','Snell Roundhand',cursive; font-size:34px;
     line-height:1; color:#e3bfb4;">Delowar Hossain</p>
  <p class="sans" style="margin:6px 0 0; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:11px;
     letter-spacing:0.2em; text-transform:uppercase; color:#717179;">
     Creative Developer &amp; UI/UX Designer</p>

  <!-- meta row -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;"><tr>
    <td class="stack mono" valign="top" style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace;
        font-size:12px; line-height:1.9; color:#717179;">
      <a href="https://delowarhossain.dev" style="color:#e5e2e0; text-decoration:none;">delowarhossain.dev</a><br>
      <a href="mailto:hello@delowarhossain.dev" style="color:#e5e2e0; text-decoration:none;">hello@delowarhossain.dev</a>
    </td>
    <td class="stack meta-right mono" valign="top" align="right"
        style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace; font-size:12px;
        line-height:1.9; color:#717179; text-align:right;">
      Joypurhat, Bangladesh<br>MMXXVII &middot; 25.10 N &middot; 89.02 E
    </td>
  </tr></table>

  <!-- the ONLY electric: live/open dot (availability template only) -->
  <p class="mono" style="margin:20px 0 0; font-family:'JetBrains Mono',ui-monospace,Menlo,monospace;
     font-size:11px; letter-spacing:0.04em; color:#717179;">
    <span style="display:inline-block; width:8px; height:8px; line-height:8px; font-size:0;
          border-radius:8px; background-color:#cdfa00; vertical-align:middle; margin-right:7px;">&nbsp;</span>
    OPEN FROM Q1 '27 — select freelance commissions
  </p>

  <!-- compliance: required for bulk -->
  <p class="sans" style="margin:24px 0 0; font-family:'Inter','Helvetica Neue',Arial,sans-serif; font-size:11px;
     line-height:1.7; color:#525259;">
    You are receiving this because you subscribed at delowarhossain.dev.
    <a href="{{unsubscribe_url}}" target="_blank" style="color:#c6c6c7; text-decoration:underline;">Unsubscribe</a> &middot;
    The Compiled Thought, Panchbibi, Joypurhat, Bangladesh.
  </p>
</td></tr>
```

> **Legal floor:** bulk sends (newsletter, availability) **must** carry a working unsubscribe link and a physical postal address (CAN-SPAM / GDPR). Transactional `welcome` may omit unsubscribe but keeps the address. Never ship a list email without both. `{{unsubscribe_url}}` is the provider-agnostic Handlebars merge tag the shipped letters use — swap per ESP (Resend `{unsubscribeUrl}`, Mailchimp `*|UNSUB|*`, Buttondown `{{ unsubscribe_url }}`).

---

## §05 — Template Map

The four letters in `/emails`, each composed from the components above. The `index.html` gallery previews all four.

| File | § | Glyph | Components in order | Primary action |
|---|---|---|---|---|
| `welcome.html` | 01 | ◊ | preheader → masthead → type-hero → content×2 → ghost button → footer | Read the journal |
| `newsletter.html` | 02 | ◌ | preheader → masthead → glyph divider → content (essay) → metrics → hairline → content (experiment) → ghost button → footer | Read full essay |
| `announcement.html` | 03 | ◇ | preheader → masthead → full hero → content (brief) → metrics row → **solid peach button** → footer | View case study |
| `availability.html` | 04 | ↗ | preheader → masthead → content (open slate) → scope list → **solid + ghost buttons** → footer w/ live dot | Start a project |

> Filenames match the repo exactly. There is no `journal.html` or `new-work.html` — the journal letter is `newsletter.html` and the new-work letter is `announcement.html`.

---

## §06 — Client-Support Matrix

What you can rely on, per engine. ● full · ◐ partial / needs fallback · ○ none.

| Feature | Apple Mail / iOS | Gmail (web/app) | Outlook 365 (Win) | Outlook desktop (2016–21) | Outlook.com / Mac | Dark Mode |
|---|---|---|---|---|---|---|
| `<table>` layout | ● | ● | ● | ● | ● | ● |
| Inlined CSS | ● | ● | ● | ● | ● | ● |
| `<style>` in `<head>` | ● | ◐ (stripped on forward/clip) | ◐ | ◐ | ● | ◐ |
| Media queries | ● | ◐ (app only) | ○ | ○ | ◐ | — |
| Web fonts (`@font-face`) | ● | ○ | ○ | ○ | ◐ | — |
| `border-radius` | ● | ● | ○ (squared) | ○ (squared) | ● | — |
| `rgba()` / opacity | ● | ● | ○ (needs solid fallback) | ○ | ● | ◐ |
| Linear/radial gradients | ● | ◐ | ○ (VML only) | ○ | ◐ | — |
| `background-image` on `<td>` | ● | ◐ | ◐ (VML) | ◐ (VML) | ◐ | — |
| CSS custom props (`--token`) | ◐ | ○ | ○ | ○ | ○ | — |
| `transform: rotate` (diamond) | ● | ● | ○ (use VML `rotation`) | ○ | ● | — |
| VML buttons / shapes | — | — | ● | ● | — | — |
| Dark-mode colour handling | ◐ | ◐ (forces own) | ◐ | ◐ | ◐ | varies |

**Takeaways:**

- **Outlook desktop** is the constraint. Anything that must paint there needs a `<!--[if mso]>` VML path or a solid-colour fallback. No radius, no `rgba`, no gradient, no `transform`, no web font — and VML needs the `xmlns:v`/`xmlns:o` namespaces on `<html>`.
- **Gmail** strips `<style>` in clipped/forwarded states — inline anything load-bearing. Gmail also **clips messages over ~102KB** ("View entire message"); keep total HTML under 100KB. Our letters run 26–33KB on disk.
- **Web fonts** only reach Apple/iOS and partially Outlook.com — the Newsreader / Inter / JetBrains Mono / Sacramento fallbacks ARE the design for everyone else. Tracking and sizes are tuned for the fallback, not the web font.

---

## §07 — Dark Mode

Email "dark mode" is three different behaviours wearing one name, and our base is *already dark* — which protects us but introduces the inverse risk: clients that **re-tint a dark email toward light**, washing peach to mud.

The shipped letters declare **`color-scheme: dark light`** (and `supported-color-schemes: dark light`), not dark-only. Declaring both schemes tells the client "I have considered both — leave my colours alone" and is the more compatible signal across Apple Mail, Gmail, and Outlook than a hard `dark`. Keep this in lockstep with the code.

| Client | Behaviour | Our defence |
|---|---|---|
| Apple Mail (macOS/iOS) | Respects `color-scheme`, light hand on already-dark mail | `<meta name="color-scheme" content="dark light">` + `<meta name="supported-color-schemes" content="dark light">` |
| Gmail app | Re-tints some palettes, partial | Inline solid `bgcolor` on every cell so it has nothing to "fix" |
| Outlook (Win/365) | Can hard-invert backgrounds | VML fills + solid `#070708` cells; never rely on transparency |

```html
<head>
  <meta name="color-scheme" content="dark light">
  <meta name="supported-color-schemes" content="dark light">
  <style>
    :root { color-scheme: dark light; }
    /* Apple/iOS dark-mode hook — lock the peach so it doesn't get re-tinted */
    @media (prefers-color-scheme: dark) {
      .lock-peach { color: #e3bfb4 !important; }
      .lock-ink   { background-color: #070708 !important; }
    }
    /* Outlook.com dark-mode wrapper hooks */
    [data-ogsc] .lock-peach { color: #e3bfb4 !important; }
    [data-ogsb] .lock-ink   { background-color: #070708 !important; }
  </style>
</head>
```

- Put `bgcolor="#070708"` **and** `style="background-color:#070708"` on every structural cell. Belt and suspenders — some clients read one, some the other.
- Tag the peach text/period and the diamond with `.lock-peach` so a re-tinting client can't drag the accent toward grey.
- **Never** use pure `#ffffff` text — `warmwhite #efece9` already reads correctly under inversion and won't trigger an aggressive forced re-tint.

---

## §08 — Do / Don't

**Legibility & structure**

- **Do** keep body copy ≥ 14px, mono meta ≥ 11px. Reading distance in the inbox is intimate; don't shrink to web sizes.
- **Do** maintain warmwhite-on-ink contrast: 100% for headings, ~72% for body, 55% for meta. `warmwhite` at 100% on `#070708` is ~16:1; at 55% it is ~6.2:1 — still passing AA for normal text. Treat 55% as the floor; below it you start losing AA.
- **Don't** put paragraphs on a peach background — peach with ink text is ~4.x:1 at best and fails outright under warmwhite. Peach holds the period, the diamond, the eyebrow, the link, and one button. Nothing else.
- **Don't** use electric anywhere but the single live/open dot. It is a ~1.x:1 nightmare for text and re-tints unpredictably.

**Images-off resilience**

- **Do** assume images are blocked. Every headline, button, divider, and the wordmark are HTML/CSS, never sliced images.
- **Do** set `bgcolor` on any cell that carries a background image, so the cell paints ink when the image fails.
- **Do** give every `<img>` an `alt`, an explicit `width`/`height`, and `style="display:block; border:0;"`. Decorative images get `alt=""`.
- **Don't** put text inside an image. If it can't be selected, it can't be read with images off, and it can't be translated or zoomed.

**Outlook & bulletproofing**

- **Do** declare `xmlns:v` / `xmlns:o` on `<html>` and the `OfficeDocumentSettings`/`PixelsPerInch 96` block — without them VML silently fails to paint.
- **Do** wrap every button in the VML + `<a>` pattern. Test it in actual Outlook desktop, not just a preview tool.
- **Do** set explicit pixel widths on VML shapes — Outlook won't infer them.
- **Do** use the `<!--[if mso]>` conditional table around the 600px wrapper so Outlook centres correctly.
- **Don't** rely on `border-radius`, `box-shadow`, `rgba`, gradients, `transform`, or flex/grid in Outlook. Provide a solid-colour, square-cornered fallback that still looks intentional.
- **Don't** stack a solid `bgcolor` and an `rgba` border on the same 1px hairline cell — compliant clients render a 2px rule. One technique per cell.
- **Don't** ship CSS custom properties (`var(--peach)`) into a letter — they're for `index.html` only. Inline the resolved hex.

**Voice & restraint**

- **Do** write subject lines and preheaders like an editor: precise, calm, lowercase-friendly, no emoji, no hype. "A new piece is live." not "🔥 YOU WON'T BELIEVE THIS NEW WORK!!!"
- **Do** keep one idea and one primary button per letter.
- **Don't** stack competing CTAs. Secondary actions are text links in peach, never a second solid button.

---

## §09 — Subject & Preheader Library

Studio voice, per template. Sentence-crafted, never salesy.

| Template | Subject | Preheader |
|---|---|---|
| Welcome | `You are on the list. — Delowar Hossain` | Notes on creative development, WebGL, type, and new work — roughly once a month, never noise. |
| Newsletter | `Dispatch §02 — Shader math, from a field to a world` | One essay, one experiment, one coordinate. |
| Announcement | `Aura Void v2 is live.` | An ambient WebGL world built on one GLSL noise field and a physics-aware cursor. View the case study. |
| Availability | `Two slots, Q2–Q4 '27.` | Open for select freelance commissions. Scope and how to start inside. |

---

## §10 — Pre-Send Checklist

```
☐ <html lang="en" xmlns:v xmlns:o> present; OfficeDocumentSettings/PPI 96 set
☐ Renders fully legible with ALL images disabled
☐ 6px peach top rule + wordmark "Delowar Hossain." with peach period present
☐ Body ≥14px · mono ≥11px · warmwhite at 100/72/55% only
☐ Every layout cell carries bgcolor="#070708" AND style background-color
☐ Buttons: VML + <a> dual path, 48px tall, ≥44px tap target, ↗ glyph, explicit VML width
☐ Single primary action; secondaries are peach text links
☐ Hairlines use ONE technique per cell (solid #1f201f for Outlook)
☐ Diamond: rotated <span> for Apple/Gmail AND v:rect rotation:45 for Outlook
☐ Web fonts load on Apple/iOS; fallback chain reads correctly everywhere else
☐ Dark-mode meta = "dark light"; .lock-peach / .lock-ink + [data-ogsc]/[data-ogsb] hooks
☐ Electric appears ONCE (live dot) or never
☐ Preheader set, padded with &#847;&zwnj;&nbsp; run, 40–90 visible chars
☐ Footer: unsubscribe (bulk) + postal address present; merge tag wired per ESP
☐ Total HTML < 100KB (Gmail clip guard)
☐ Tested: Apple Mail · iOS · Gmail web+app · Outlook 365 · Outlook desktop · dark mode
☐ All links absolute https:// · mailto: forced to peach, no auto-blue
☐ alt text on every <img>; decorative = alt=""
```

---

*Colophon — Newsreader · Inter · JetBrains Mono · Sacramento. Built at The Compiled Thought, Joypurhat — 25.10 N · 89.02 E. Tokens mirror `emails/index.html`; templates are `welcome` · `newsletter` · `announcement` · `availability`. Keep them in lockstep. MMXXVII · `§ 03.27`.*
