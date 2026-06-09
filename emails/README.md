<!-- README · emails/ · Delowar Hossain. · MMXXVII -->

# Email Campaign Kit — `emails/`

```
§ 03.27 · ◊ MMXXVII
Delowar Hossain. — The Compiled Thought
Editorial email system · ink-led · type-first · accent-restrained
25.10 N · 89.02 E — Joypurhat, Bangladesh
```

This directory holds the **MMXXVII edition** transactional and broadcast email kit:
bulletproof, table-based HTML templates plus a self-contained preview gallery. Every
template carries the same DNA as the brand's OG card — a deep-ink ground (`#070708`), a
6px peach top rule, a corner peach radial glow, an inset hairline frame, an UPPERCASE
tracked peach eyebrow, a giant Newsreader headline, and an UPPERCASE meta footer over a
hairline. The whole kit is one system; nothing here should ever feel like a SaaS blast.

> The interface should disappear, leaving only the type, the coordinate, and the letter.

---

## ¶ 00 — Contents

This folder ships **all four templates** today — `welcome.html`, `newsletter.html`
(the Journal Dispatch), `announcement.html` (New Work), and `availability.html` — plus the
preview gallery. The table below marks status plainly so nobody ships a link to a file that
isn't there.

| File | Status | What it is | Role | Trigger |
|------|--------|------------|------|---------|
| `index.html` | ✓ shipped | **Preview gallery.** Renders all four templates in framed iframes. Internal review only (`noindex, nofollow`). | Internal review. | Open in a browser. |
| `welcome.html` | ✓ shipped | **◊ 01 — Welcome.** The first letter. An editorial handshake that introduces the practice and what arrives next. Two CTAs: *Read the journal* (`/journal`) + ghost *See selected work* (`/works`). | Onboarding / double opt-in. | On confirmed subscribe. |
| `newsletter.html` | ✓ shipped | **◌ 02 — Journal Dispatch.** A recurring missive from the lab: one lead essay, an "also in this issue" set, one featured experiment, one coordinate. | Newsletter / broadcast. | On each Journal drop. |
| `announcement.html` | ✓ shipped | **◇ 03 — New Work.** A case-study drop ("Aura Void v2 is live."): magazine-cover hero, a metrics row, a solid *View the case study* CTA (`/works/aura-void`) + ghost *Watch the reel*. | Announcement. | On project launch. |
| `availability.html` | ✓ shipped | **↗ 04 — Availability.** A quiet booking notice: open-slate signal, a Sprint/Engagement/Retainer table, an invitation to talk. | Outreach. | On booking window open. |

> **Naming note.** The dispatch template lives at **`newsletter.html`** and the work-launch
> template at **`announcement.html`**. The preview gallery points its iframes at
> `./newsletter.html` and `./announcement.html` to match — keep those filenames in sync if you
> rename anything.

All shipped templates are **600px** wide, table-safe, VML-buttoned, dark-mode aware, and
built to degrade gracefully to a hairline-clean light fallback where dark is stripped.

---

## ¶ 01 — Preview

No build step. No server. No dependencies. Open the gallery directly:

```bash
# macOS
open emails/index.html

# Windows
start emails/index.html

# Linux
xdg-open emails/index.html
```

Or open a single shipped template on its own — each file is standalone and renders without
the gallery:

```bash
open emails/welcome.html       # or: emails/announcement.html
```

### Preview the way clients will see it

The browser is a forgiving renderer; real inboxes are not. Before any send, proof against
the matrix in [§ 08](#-08--tested-client-support). A pragmatic loop:

```bash
# Serve the folder so relative links + remote images behave like a real client
npx serve emails        # → http://localhost:3000

# Or Python's stdlib server
python3 -m http.server 8080 --directory emails
```

- **Light + dark.** Toggle your OS theme and reload. The **templates** declare
  `<meta name="color-scheme" content="dark light">` (and a matching
  `supported-color-schemes`) plus dark-mode `@media` overrides; the **gallery** declares
  `dark` only. Outlook/Gmail will still recolor — verify legibility of warmwhite-on-ink
  **and** the light fallback.
- **Mobile.** Squeeze the viewport below 600px. The single-column stack, 16px+ tap targets,
  and fluid hero should hold.
- **Images off.** Disable images in devtools. Preheader, alt text, and the VML/`bgcolor`
  button fallbacks must still carry the message ([§ 07](#-07--accessibility--deliverability)).

---

## ¶ 02 — Anatomy of a template

Every file shares the same scaffold so edits transfer cleanly between templates.

```
┌─ 6px peach top rule ─────────────────────────────┐  ← brand spine
│  ╭─ inset hairline frame (rgba(239,236,233,.12)) ╮│
│  │  ◊  EYEBROW · UPPERCASE · peach · 0.32em      ││  ← § marker + diamond
│  │  Headline — Newsreader italic, lh 0.92        ││
│  │  ……… body — warmwhite @ 70% …………              ││
│  │  ▟ BULLETPROOF CTA (VML + table, peach)        ││
│  │  — hairline —                                  ││
│  │  studio · coords — UPPERCASE mono              ││  ← address block
│  │  domain · socials — UPPERCASE                  ││  ← meta row
│  │  ‹ update prefs · unsubscribe › + postal addr  ││
│  ╰────────────────────────────────────────────────╯│
└──────────────────────────────────────────────────┘
   peach radial glow bleeds from a top corner over ink
```

**Design tokens** (mirror of `index.html` `:root`, repeated inline per CSS-email rules):

```css
/* Ground & ink */
--ink-950:   #070708;  /* primary email background         */
--ink-900:   #0c0c0c;  /* card / panel ground              */
--ink-800:   #131313;  /* chrome strips, sub-panels         */
--ink-700:   #1f201f;  /* dividers on panels                */
--ink-600:   #525259;  /* meta keys, faint dividers         */
--ink-500:   #717179;  /* meta values, specs                */
--ink-400:   #c6c6c7;  /* muted text / rules                */

/* Type on dark */
--warmwhite: #efece9;  /* primary text (100/70/55% opacity) */
--bone:      #e5e2e0;  /* secondary meta value              */
--paper:     #f3efe9;  /* light-surface fallback ground     */

/* Accents — restrained */
--peach:     #e3bfb4;  /* THE brand accent. period, diamond, eyebrow, links, CTA */
--electric:  #cdfa00;  /* FORBIDDEN in body. A single ≤6px live/open dot only     */

/* Lines & glow */
--hair:        rgba(239,236,233,0.12);  /* 1px hairline rule        */
--hair-strong: rgba(239,236,233,0.18);
--glow:        radial-gradient(900px 520px at 88% -8%, rgba(227,191,180,0.16), transparent 60%);
```

**Type stack** (full fallback chains — never assume a webfont loads in mail):

```css
--serif:  "Newsreader", "Georgia", "Times New Roman", serif;        /* display, often italic */
--sans:   "Inter", "Helvetica Neue", Arial, system-ui, sans-serif;  /* eyebrows / UI labels  */
--mono:   "JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace; /* meta / coords */
--script: "Sacramento", "Snell Roundhand", cursive;                 /* signature only        */
```

> **Color law.** Editorial first; the accent never leads. Peach carries the trailing period,
> the 45° diamond, eyebrows, hairline glows, and links. **Electric is forbidden** in body —
> permitted only as a single ≤6px "live / open" dot. Note: the **current shipped templates
> use no electric at all** — "open from Q1 '27" is set in peach (welcome) and warmwhite
> (announcement), per the color law. Backgrounds are deep ink; text is warmwhite at
> 100 / 70 / 55% for hierarchy. Tabular numerals throughout.

---

## ¶ 03 — Merge-tag reference

Author every template with the **canonical token** in `{{double_brace}}` form. When you
hand a file to a platform, run it through one find-and-replace pass to that platform's
syntax (or let Resend/React-Email interpolate at render). Keep the canonical files as the
source of truth; never edit platform-specific copies by hand.

> **Reconcile first.** The two shipped files currently disagree on a couple of Buttondown
> mappings — `welcome.html` uses `{{ subscriber.first_name|default:"there" }}` and
> `{{ subscription_url }}`, while `announcement.html` uses
> `{{ subscriber.metadata.first_name }}` and `{{ subscriber.preferences_url }}`. The tables
> below are the **canonical** mapping; bring both files into line with them.

### Recipient & personalization

| Canonical token | Means | Resend / React-Email | Mailchimp | Buttondown |
|---|---|---|---|---|
| `{{first_name}}` | Subscriber first name | `{firstName}` | `*\|FNAME\|*` | `{{ subscriber.metadata.first_name }}` |
| `{{last_name}}` | Subscriber last name | `{lastName}` | `*\|LNAME\|*` | `{{ subscriber.metadata.last_name }}` |
| `{{full_name}}` | Full name | `{fullName}` | `*\|FNAME\|* *\|LNAME\|*` | `{{ subscriber.metadata.name }}` |
| `{{email}}` | Subscriber email | `{email}` | `*\|EMAIL\|*` | `{{ subscriber.email }}` |
| `{{first_name \| "there"}}` | First name w/ fallback | `{firstName ?? "there"}` | `*\|FNAME\|there\|*` | `{{ subscriber.metadata.first_name\|default:"there" }}` |

> **Fallback rule.** The wordmark greeting is always graceful. If `first_name` is empty the
> line must read **"Hello there,"** never "Hello ,". Bake the default into the tag.

### Studio constants (hard-code; do not merge unless a platform requires it)

| Canonical token | Value | Resend / React-Email | Mailchimp | Buttondown |
|---|---|---|---|---|
| `{{studio}}` | The Compiled Thought | `{site.studio}` | — (literal) | — (literal) |
| `{{wordmark}}` | Delowar Hossain**.** | `{site.name}` + peach `.` | — (literal) | — (literal) |
| `{{edition}}` | MMXXVII / 03.27 | `{site.edition}` | — (literal) | — (literal) |
| `{{domain}}` | delowarhossain.dev | `{site.domain}` | — (literal) | — (literal) |
| `{{sender_email}}` | hello@delowarhossain.dev | `{site.email}` | — (literal) | — (literal) |
| `{{location}}` | Joypurhat, Bangladesh | `{site.location}` | — (literal) | — (literal) |
| `{{coords}}` | 25.10 N · 89.02 E | `{site.coords}` | — (literal) | — (literal) |

### Campaign content (per-send)

| Canonical token | Means | Resend / React-Email | Mailchimp | Buttondown |
|---|---|---|---|---|
| `{{preheader}}` | Inbox preview line | `{preheader}` | — (set in builder) | — (set in builder) |
| `{{subject}}` | Subject line | `{subject}` | `*\|MC:SUBJECT\|*` | `{{ subject }}` |
| `{{headline}}` | Newsreader hero line | `{headline}` | — (content block) | — (content block) |
| `{{body_html}}` | Main editorial body | `{children}` | — (content block) | `{{ body }}` (Markdown) |
| `{{cta_label}}` | Button text | `{ctaLabel}` | — (literal) | — (literal) |
| `{{cta_url}}` | Button href | `{ctaUrl}` | — (literal) | — (literal) |
| `{{post_title}}` | Journal / work title | `{postTitle}` | `*\|RSSITEM:TITLE\|*` | — (literal) |
| `{{post_url}}` | Journal / work link | `{postUrl}` | `*\|RSSITEM:URL\|*` | — (literal) |
| `{{date}}` | Issue date | `{date}` | `*\|DATE:j F Y\|*` | `{{ "now" \| date: "%-d %B %Y" }}` |
| `{{issue_no}}` | Dispatch № (tabular) | `{issueNo}` | — (literal) | — (literal) |

> Several of these — `{{headline}}`, `{{body_html}}`, `{{post_title}}`, `{{post_url}}`,
> `{{issue_no}}`, `{{coords}}` — are **conventions for the planned Journal template** and the
> Node sender; the current `welcome.html`/`announcement.html` hard-code their copy and only
> wire the recipient + compliance tags below. Add the content tags as you templatize.

### System / compliance tags (required — see [§ 07](#-07--accessibility--deliverability))

| Canonical token | Means | Resend / React-Email | Mailchimp | Buttondown |
|---|---|---|---|---|
| `{{unsubscribe_url}}` | One-click opt-out | `{unsubscribeUrl}` | `*\|UNSUB\|*` | `{{ unsubscribe_url }}` |
| `{{preferences_url}}` | Manage preferences | `{preferencesUrl}` | `*\|UPDATE_PROFILE\|*` | `{{ subscriber.preferences_url }}` |
| `{{view_online_url}}` | Browser version | `{viewOnlineUrl}` | `*\|ARCHIVE\|*` | `{{ canonical_url }}` |
| `{{list_address}}` | Postal address (CAN-SPAM) | `{listAddress}` | `*\|LIST:ADDRESS\|*` | `{{ owner_address }}` |
| `{{rfc_list_unsub}}` | `List-Unsubscribe` header | set via headers | automatic | automatic |

> **Wiring status.** `{{unsubscribe_url}}` and `{{preferences_url}}` are live in both shipped
> footers. `{{view_online_url}}` is **not yet placed** in either template — add a "View in
> browser" link, ideally near the preheader/header. `announcement.html` carries a postal line
> ("Panchbibi, Joypurhat, Bangladesh."); `welcome.html` does **not** — add `{{list_address}}`
> there before any bulk send (CAN-SPAM).

> **Escaping note.** In the Markdown tables above, Mailchimp/Buttondown pipes are shown
> escaped (`\|`). In the actual template files write them unescaped, e.g. `*|FNAME|*` and
> `{{ subscriber.email }}`.

---

## ¶ 04 — Sending with Resend (Node)

The canonical files are plain HTML, so the simplest production path is: read the file,
do a token pass, POST through the Resend SDK. No React build required.

```bash
npm i resend
export RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxx"
```

```js
// emails/send.mjs — node emails/send.mjs welcome you@example.com
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const here = dirname(fileURLToPath(import.meta.url));

/** Replace every {{token}} (with optional `| "fallback"`) from a data map. */
function merge(html, data) {
  return html.replace(/\{\{\s*([\w.]+)(?:\s*\|\s*"([^"]*)")?\s*\}\}/g, (_, key, fb) => {
    const val = data[key];
    return (val === undefined || val === null || val === "") ? (fb ?? "") : String(val);
  });
}

/** Naive but dependable HTML→text part for the plain-text alternative. */
function toText(html) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<head[\s\S]*?<\/head>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\/(p|div|tr|h[1-6])>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ").replace(/&middot;/g, "·").replace(/&mdash;/g, "—")
    .replace(/&amp;/g, "&")
    .replace(/\n{3,}/g, "\n\n").trim();
}

async function send(template, to, data = {}) {
  const raw = await readFile(join(here, `${template}.html`), "utf8");
  const html = merge(raw, {
    studio: "The Compiled Thought",
    domain: "delowarhossain.dev",
    sender_email: "hello@delowarhossain.dev",
    location: "Joypurhat, Bangladesh",
    coords: "25.10 N · 89.02 E",
    edition: "MMXXVII / 03.27",
    ...data,
  });

  return resend.emails.send({
    from: "Delowar Hossain <hello@delowarhossain.dev>",
    to,
    subject: data.subject ?? "A note from The Compiled Thought",
    html,
    text: toText(html),                 // always ship the plain-text part
    replyTo: "hello@delowarhossain.dev",
    headers: {
      "List-Unsubscribe": `<${data.unsubscribe_url}>, <mailto:hello@delowarhossain.dev?subject=unsubscribe>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  });
}

// Note: top-level await requires "type":"module" (this is a .mjs file).
const [, , template = "welcome", to = "you@example.com"] = process.argv;
const { data, error } = await send(template, to, {
  first_name: "there",
  subject: "Welcome — the first letter",
  preheader: "Editorial design and high-performance creative development, in your inbox.",
  cta_label: "Read the journal",
  cta_url: "https://delowarhossain.dev/journal",
  unsubscribe_url: "https://delowarhossain.dev/unsubscribe?e=token",
});
if (error) { console.error("✗", error); process.exit(1); }
console.log("◊ sent", data?.id);
```

```bash
node emails/send.mjs welcome you@example.com
# announcement: node emails/send.mjs announcement you@example.com
```

> **Valid template names** are the files that exist: `welcome` and `announcement`. Passing
> `journal` or `availability` will throw `ENOENT` until those files are built.

**React-Email path (optional).** If you prefer JSX, port a template into
`@react-email/components`, render with `render(<Welcome {...props} />)`, and feed the result
into the same `resend.emails.send(...)` call. Keep the inline-style tokens identical to the
HTML files so both renderers stay visually in lockstep.

> **Domain auth before first send.** Verify the sending domain in Resend (SPF, DKIM, and a
> DMARC record) or everything below lands in spam regardless of craft. See
> [§ 07](#-07--accessibility--deliverability).

---

## ¶ 05 — Authoring rules (bulletproof HTML email)

- **Tables, not divs.** Layout in nested `<table role="presentation" cellpadding="0"
  cellspacing="0" border="0">`. Outer wrapper 100%, content table fixed at **600px**.
- **Inline everything.** Every visual style inlined on the element. The `<style>` block is
  for media queries, `:hover`, and dark-mode only — Gmail strips much of it.
- **No external CSS, no flexbox/grid for layout, no JS.** Buttons are bulletproof: a VML
  `<v:roundrect>` for Outlook wrapped around a `bgcolor` table cell with an `<a>` for the rest.
- **Peach CTA, ink text.** Solid peach (`#e3bfb4`) fill, ink (`#070708`) label. Ghost
  variant = ink fill, peach `1px` border, peach label. (Both shipped templates follow this:
  welcome pairs solid + ghost; announcement pairs solid + ghost.)
- **Images:** absolute HTTPS URLs (host under `delowarhossain.dev/email/…`), explicit
  `width`/`height`, `display:block`, `border:0`, and real `alt`. Hero ≤ 600px wide,
  retina source at 1200px. Total weight target < 100KB; raw HTML < 100KB to dodge Gmail clipping.
- **The wordmark** is always `Delowar Hossain` with the trailing period set in peach:
  `Delowar&nbsp;Hossain<span style="color:#e3bfb4">.</span>`
- **The diamond** is a 45°-rotated square; in mail render it as a tiny inline image or a
  `▪`/`◆` glyph in peach where `transform` is unsafe.

---

## ¶ 06 — Per-template notes

### ◊ 01 — `welcome.html` · Onboarding · ✓ shipped
The editorial handshake. Greeting line uses `{{first_name | "there"}}`. Two CTAs — solid
peach *Read the journal* (`/journal`) and ghost *See selected work* (`/works`). Includes
"The Lab — 30 live experiments" panel and the "open from Q1 '27" line set in **peach**. Sets
expectations: cadence, what lands next, how to leave. Tone: calm, precise, a design annual
opening its first spread. **To finish before bulk send:** add a `{{list_address}}` postal
line to the footer.

### ◇ 03 — `announcement.html` · Announcement · ✓ shipped
"Aura Void v2 is live." Magazine-cover hero composition: oversized Newsreader title, the
project pull-quote, a metric line (Lighthouse 98 · Awwwards SOTD), a solid *View the case
study* CTA (`/works/aura-void`) + ghost *Watch the reel* (`/works/aura-void#reel`). Footer
carries coords, location, socials, and a postal line ("Panchbibi, Joypurhat, Bangladesh.").
The "open from Q1 '27" line is set in **warmwhite**. Restrain to a single primary action —
the hero does the persuading.

### ◌ 02 — `newsletter.html` · Newsletter · ✓ shipped
The recurring dispatch. Masthead carries `§ {{issue_number}}` and the date in JetBrains Mono
with tabular figures. Body: a lead-essay feature (`{{post_title}}` → `{{post_url}}`) with a
*Read the essay* CTA, an "also in this issue" set, a featured Lab experiment, and a single
"Now" coordinate line — hairline dividers between sections. Dark-mode tuned; degrades to
paper-light.

### ↗ 04 — `availability.html` · Outreach · ✓ shipped
The quiet booking notice. Open-slate headline ("Two slots open. Q2 to Q4, 2027."), a
Sprint / Engagement / Retainer table with starting prices, two buttons (solid peach *Start a
project* + ghost *See services*), ending on the signature. The `OPEN FROM Q1 '27` marker
carries the one sanctioned **electric** dot — a true availability "live" status; everywhere
else the accent stays peach.

---

## ¶ 07 — Accessibility + deliverability

Ship-blockers. A template is not done until every box is checked.

### Accessibility
- [ ] **Semantic lang + roles.** `<html lang="en">`, layout tables `role="presentation"`,
      decorative images `alt=""`, meaningful images with real `alt`.
- [ ] **Contrast.** Body warmwhite `#efece9` on ink `#070708` ≈ 17:1. Never drop body text
      below the 55% opacity tier; muted ink-500 is for meta only, not reading copy.
- [ ] **Tap targets ≥ 44×44px**, ≥ 16px body on mobile, links visibly peach (not color-only —
      pair with weight/underline-on-hover where supported).
- [ ] **Reading order** survives single-column collapse; no information lives in images alone.
- [ ] **`prefers-reduced-motion`** respected (the gallery already disables transitions).
- [ ] **Dark-mode legibility** verified both ways; the peach `.` and links stay distinguishable.

### Deliverability + spam
- [ ] **Preheader.** A hidden, ≤ 90-char `{{preheader}}` immediately after `<body>`, followed
      by a zero-width spacer so body copy doesn't leak into the preview:
      `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">{{preheader}}</div>`
      `<div style="display:none;max-height:0;overflow:hidden;">&zwnj;&nbsp;&zwnj;</div>`
      (Both shipped templates already include the hidden preheader div.)
- [ ] **Alt text on every image** — the message must survive images-off.
- [ ] **Plain-text part** always sent (the `toText()` helper in [§ 04](#-04--sending-with-resend-node)).
      A missing text/plain alternative is a top spam signal.
- [ ] **`List-Unsubscribe` + `List-Unsubscribe-Post: List-Unsubscribe=One-Click`** headers,
      plus a visible `{{unsubscribe_url}}` in the footer (present in both shipped templates).
      Required by Gmail/Yahoo bulk rules.
- [ ] **`{{view_online_url}}` link** — add a "View in browser" link to both templates
      (currently missing); some recipients need it when rendering breaks.
- [ ] **Physical postal address** `{{list_address}}` in every footer (CAN-SPAM).
      `announcement.html` has one; **`welcome.html` still needs it.**
- [ ] **Domain auth:** SPF, DKIM, and an enforcing DMARC record on `delowarhossain.dev`.
      Send from `hello@delowarhossain.dev`, `Reply-To` the same.
- [ ] **Raw HTML < 100KB** to avoid Gmail clipping (which hides the unsubscribe footer).
- [ ] **No spam-trigger styling:** no hidden text for keyword stuffing, no all-image emails,
      balanced text-to-image ratio (≥ 60% text), no link shorteners, no `!!!`/ALL-CAPS subjects.
- [ ] **Honest `{{subject}}` + `{{preheader}}`** — voice is editorial, never salesy; this is a
      design annual, not a SaaS landing page.

---

## ¶ 08 — Tested client support

Rendering reality across the major clients. Legend: **✓** full · **◑** partial / known
quirks (a graceful fallback fires) · **✗** unsupported (the kit degrades cleanly) ·
**n/a** not applicable.

| Feature | Apple Mail | Gmail (web) | Gmail (app) | Outlook 365 win | Outlook.com | Yahoo / AOL | Samsung Mail |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| 600px table layout | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Inline styles | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `<style>` block (media/hover) | ✓ | ◑¹ | ◑¹ | ✗ | ◑ | ✓ | ✓ |
| Webfonts (Newsreader/Inter) | ✓ | ✗² | ✗² | ✗² | ✗² | ✗² | ◑ |
| Serif fallback (Georgia/Times) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Dark-mode `@media` overrides | ✓ | ◑³ | ◑³ | ✗³ | ◑³ | ✓ | ◑³ |
| VML bulletproof button | n/a | n/a | n/a | ✓ | ✓ | n/a | n/a |
| `bgcolor` button fallback | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Background images | ✓ | ✗⁴ | ✗⁴ | ◑⁴ | ◑⁴ | ✓ | ✓ |
| Radial peach glow | ✓ | ✗⁴ | ✗⁴ | ✗ | ✗ | ◑ | ◑ |
| Rounded corners | ✓ | ✓ | ✓ | ✗⁵ | ✗⁵ | ✓ | ✓ |
| `List-Unsubscribe` one-click | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

**Footnotes**
1. Gmail keeps `<style>` only when the email isn't clipped and is reasonably clean; assume
   `:hover`/media queries are a progressive enhancement, never load-bearing.
2. Most non-Apple clients ignore webfonts → the **Georgia / Times** serif and **Arial** sans
   fallbacks carry the design. Headlines were chosen to hold their composition in the fallback.
3. Outlook ignores `@media`; Gmail/Yahoo run their **own** auto color-inversion on top of your
   dark styles. Verify the ink/warmwhite/peach trio survives forced inversion in each.
4. Gmail strips most `background-image`; the glow is decorative-only and the layout reads
   identically without it. Outlook (Word engine) needs a VML `<v:rect>` fill or it drops too.
5. Outlook's Word engine squares off `border-radius`; the kit's `arcsize="0%"`–`4%` buttons
   are near-square by design, so the squared corners stay on-brand.

> **Proof before every campaign.** Run a real send to seed inboxes (Apple Mail, Gmail web +
> iOS, Outlook 365 + .com, Yahoo) or a Litmus/Email-on-Acid pass. The matrix is a map, not a
> guarantee — clients change their rendering quietly.

---

## ¶ 09 — Colophon

```
Delowar Hossain.
Creative Developer & UI/UX Designer — The Compiled Thought
Newsreader · Inter · JetBrains Mono · Sacramento
delowarhossain.dev · hello@delowarhossain.dev
Joypurhat, Bangladesh — 25.10 N · 89.02 E
§ 03.27 — Edition MMXXVII
```

The gallery (`index.html`) is **internal review only** — `noindex, nofollow`, not for
distribution. Render every template in-client before it leaves the studio.
