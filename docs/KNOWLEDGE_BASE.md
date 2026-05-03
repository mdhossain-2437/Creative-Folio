# Knowledge Base — Delowar Hossain · Creative-Folio (MMXXVII)

A single-source reference for the **Delowar Hossain** creative-developer
portfolio at [delowarhossain.dev](https://delowarhossain.dev).
Read this first before making changes.

---

## 1. Branding

| Field | Value |
| --- | --- |
| Name | **Delowar Hossain** |
| Domain | `delowarhossain.dev` |
| Email | `hello@delowarhossain.dev` |
| Studio | The Compiled Thought |
| Edition | **MMXXVII** (2027) |
| Booking | Q2 '27 → Q4 '27 |
| GitHub repo | `mdhossain-2437/Creative-Folio` |
| Branding source of truth | `src/lib/site.ts` |

> **Never** edit branding strings inline. If you find one, move it to
> `src/lib/site.ts` and import it.

### Year roll-over checklist

When the year ticks (e.g. 2027 → 2028):

1. `src/lib/site.ts`: `year`, `edition` (`MMXXVII / MM.DD` → next), `editionShort`, `availability`.
2. `src/lib/data.ts`: bulk-replace year strings, recent project years, archive
   list, journal post dates, `meta` lines on lab arsenal cards.
3. Page-level metadata: `src/app/contact/page.tsx`, `services/page.tsx`,
   `now/page.tsx`, `showreel/page.tsx`, `lab/[slug]/page.tsx`, `colors/page.tsx`,
   `changelog/page.tsx`, `uses/page.tsx`, `atlas/page.tsx`,
   `uses/opengraph-image.tsx`.
4. Components: `Hero.tsx` marquee, `MilestonesScroll.tsx` heading,
   `ConsoleBanner.tsx`, `CommandPalette.tsx`, `Footer.tsx` marquee,
   `ShowreelTeaser.tsx`, `ShowreelModal.tsx` header.
5. Verify: `pnpm typecheck && pnpm lint && pnpm build`.

---

## 2. Stack & Folder Map

| Layer | Tech | Notes |
| --- | --- | --- |
| Framework | Next.js 15 (App Router, RSC) | static-first, server actions in `/api` |
| Language | TypeScript strict | path alias `@/*` → `src/*` |
| Styling | Tailwind + custom tokens | tokens in `tailwind.config.ts` |
| Motion | GSAP, Lenis, Framer Motion | reduced-motion respected globally |
| WebGL | raw GLSL + R3F | hero shader is hand-rolled WebGL |
| Type | Newsreader (serif), Inter, JetBrains Mono | loaded via `next/font` |
| Icons | Lucide | `lucide-react` |
| Forms | none — `mailto:` only | no third-party form |

```
src/
  app/                 # Next.js App Router pages + route handlers
    layout.tsx         # Root metadata + global chrome (Cursor, ClientOverlays, Footer)
    globals.css        # Tokens + atmosphere modes + print stylesheet
    [route]/page.tsx   # All pages
  components/
    layout/            # Navbar, Footer, StatusStrip, Preloader, ClientOverlays
    sections/          # Page sections (Hero, ShowreelTeaser, MilestonesScroll, …)
    ui/                # Atomic UI (Cursor, Magnetic, Marquee, ShowreelModal, …)
    webgl/             # GLSL + R3F components
    seo/               # JsonLd
  lib/
    site.ts            # Branding constants (single source of truth)
    data.ts            # All page content (works, archive, journal, reel, etc.)
    achievements.ts    # localStorage achievement system
docs/
  KNOWLEDGE_BASE.md    # ← you are here
AGENTS.md              # Operating manual for AI / human contributors
```

---

## 3. Design System

### Palette (Tailwind tokens)

| Token | Hex | Use |
| --- | --- | --- |
| `ink-950` | `#070708` | deepest black, page background |
| `ink-900` | `#0c0c0c` | section background |
| `peach` | `#e3bfb4` | accent, hover state |
| `warmwhite` | `#efece9` | primary text |
| `electric` | `#cdfa00` | second accent (storm atmosphere) |

Always reach for the token classes (`bg-ink-950`, `text-warmwhite`, etc.).
Never hard-code hex values in JSX/CSS — add the token in
`tailwind.config.ts`.

### Color contrast rules (WCAG AA)

* **Primary text:** `text-warmwhite` (full opacity) or `text-warmwhite/85`.
* **Secondary text:** `text-warmwhite/65` minimum on dark backgrounds.
  Anything ≤ `/55` is reserved for purely decorative typography (large display
  numerals, marquees) and must never carry critical information.
* **Borders:** `border-warmwhite/15` minimum. `/10` is too low.
* **Status pills / dots:** add a `bg-peach`/`bg-emerald-400` indicator next to
  the text — never rely on color alone.

When changing a class from `/40`–`/50` to `/65`+, run a quick visual pass on the
`/atlas`, `/journal`, and `/uses` pages — those have the most secondary copy.

### Typography

* Display: **Newsreader** with `tracking-tightest` for the largest sizes
  (3rem+). Italics for the second-line accent.
* Body: **Inter** at 15–17px, leading-relaxed.
* Mono / labels: **JetBrains Mono** at 10–11px uppercase tracking-widest.
* Display numerals (year, time, edition, version) → wrap in
  `<span className="display-num">…</span>` to apply the OpenType salt feature.

### Z-index map

| Layer | z-index | Component |
| --- | --- | --- |
| Cursor | **200** | `Cursor.tsx` (always on top) |
| Modals | 110 | `ShowreelModal.tsx`, `CommandPalette.tsx` |
| Route curtain | 95 | page transitions |
| Grid overlay | 60 | `GridOverlay.tsx` |
| Header / Navbar | 50 | `Navbar.tsx` |
| Atmosphere pill | 30 | `AtmosphereMode.tsx` |
| Default | 0–10 | section content |

> **Critical:** the custom cursor must always be the topmost element so that
> when modals open the cursor stays in front (the user explicitly asked for
> this in MMXXVII). Never lower `z-[200]` on `Cursor.tsx`.

---

## 4. The Showreel Modal (functional)

* Opened via `window.dispatchEvent(new CustomEvent("delowar:open-showreel"))`.
* Plays a real `<video>` element — sources are listed in
  `reelClips[].videoSrc` in `src/lib/data.ts`.
* Keyboard map: `Space` play/pause · `←/→` ±5s · `M` mute · `Shift` slow-mo · `Esc` close.
* Auto-advances chapters on `onEnded`.
* Body scroll is locked while open.
* The poster `<Image fill>` falls back behind the video while it buffers — the
  poster URLs use Unsplash (must be in `next.config.mjs` `remotePatterns`).
* Mock video sources (always verified during the MMXXVII rebuild):
  * `https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4`
  * `https://test-videos.co.uk/vids/sintel/mp4/h264/720/Sintel_720_10s_1MB.mp4`
  * `https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_2MB.mp4`
  * `https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_640x360.m4v`

If a video URL goes 4xx, replace it with another from the lists above and
re-run `pnpm build` to verify no runtime errors.

---

## 5. 2027 Future-Stack Features

| Feature | Trigger | Component |
| --- | --- | --- |
| Atmosphere modes (aura/storm/stillness/eink) | press **T** or click pill | `AtmosphereMode.tsx` + `globals.css` data-attribute |
| Time capsule (snapshot of page state) | press **C** | `TimeCapsule.tsx` |
| Funny page titles | tab loses focus + scroll milestones | `TabTitleFlicker.tsx` |
| Dynamic SEO JSON-LD (Person + WebSite + Organization) | always | `JsonLd.tsx` |
| StatusStrip (time / temp / GH stars / booking) | always above footer | `StatusStrip.tsx` |
| Showreel video player | `delowar:open-showreel` event | `ShowreelModal.tsx` |
| Achievement unlock on cycle | press T four times | `achievements.ts` |
| Achievement unlock on capture | press C | `achievements.ts` |

To add a new global overlay: register it in
`src/components/layout/ClientOverlays.tsx`. Keep them client-side only
(`"use client"`).

---

## 6. SEO

* `metadataBase` is `site.url`. Don't hard-code domains.
* The root metadata in `src/app/layout.tsx` covers OG, Twitter, canonical, and
  keywords.
* Per-page metadata is exported from each `page.tsx` — the title template
  appends `· Delowar Hossain`.
* JSON-LD: three blocks (`Person`, `WebSite`, `Organization`) injected via
  `JsonLd.tsx` in `<body>`.
* Atom feed: `/journal/feed.xml`. JSON Feed: `/api/feed.json`.

---

## 7. Local Dev Setup

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm typecheck    # tsc --noEmit
pnpm lint         # next lint
pnpm build        # production build
```

Pre-commit hooks: none. Run `pnpm typecheck && pnpm lint` manually before
opening a PR.

### Optional environment variables

| Var | Purpose | Where to set |
| --- | --- | --- |
| `GITHUB_PAT` | Lifts the `/api/github` route from 60 → 5000 req/hr per IP and unlocks the GraphQL `contributionsCollection` query (real heatmap data instead of the public-proxy fallback). | Vercel → Project → Settings → Environment Variables (all environments). |

To create a token: github.com → Settings → Developer settings → Personal
access tokens → **Fine-grained tokens** → Generate new token. Repository
access: *All public repositories* (read-only). Permissions: *Metadata =
read-only* (that's the only scope needed). Without this, the route still
works — just rate-limited and falls back to the
`github-contributions-api.jogruber.de` public proxy for the heatmap.

### `/api/github` (consolidated GitHub data route)

* Single endpoint feeding `StatusStrip` (the `··· GH` pill),
  `ContributionHeatmap` on `/now`, and the recent-commits list on `/now`.
* Cache: `s-maxage=1800, stale-while-revalidate=86400` (30-minute fresh,
  24-hour SWR). Page-level `revalidate = 1800` on `/now`.
* Implementation: `src/app/api/github/route.ts` thin wrapper over
  `src/lib/github-fetch.ts` (server-only). The `/now` page calls
  `fetchGitHubData()` directly — no HTTP roundtrip.
* Fallback: never throws. On full failure returns a baked snapshot with
  `stale: true` from `githubFallback` in `src/lib/data.ts`.

---

## 8. Mock Asset Sources

When you need a placeholder image or video, use the following verified
sources (HTTP 200 as of MMXXVII rollout). If anything 4xx's, swap it out and
update this list.

* **Images:** Unsplash IDs already wired in `data.ts` (replace dead IDs by
  searching another similar abstract dark/peach photo — verify with
  `curl -I` first).
* **Videos:** see §4 above.

Domains permitted in `next.config.mjs` for `next/image`:

* `images.unsplash.com`
* `flagcdn.com`
* `avatars.githubusercontent.com`

---

## 9. Common Edits

* **New page:** create `src/app/<slug>/page.tsx` with `export const metadata`,
  use `<PageHero>`, register in `src/lib/site.ts > nav` if it belongs in the
  navbar.
* **New section on home:** add to `src/app/page.tsx`. Wrap in `<Reveal>` for
  scroll-fade entry.
* **New navbar primary item:** edit the `PRIMARY` array in
  `src/components/layout/Navbar.tsx`.
* **New shortcut:** add a handler in `src/components/ui/NavShortcuts.tsx` and
  document it in `src/components/ui/CheatSheet.tsx`.
* **New atmosphere mode:** add a `Mode` to `AtmosphereMode.tsx`, extend the
  `:root[data-atmosphere=...]` block in `globals.css`.

---

## 10. Don't

* Don't reduce cursor z-index.
* Don't hard-code branding strings.
* Don't introduce new domains in `next/image` `src` without adding them to
  `next.config.mjs`.
* Don't ship `console.log`s outside of `ConsoleBanner.tsx`.
* Don't commit `.env*` files.
* Don't downgrade text contrast for "aesthetic" reasons. Pretty + unreadable
  is just unreadable.
