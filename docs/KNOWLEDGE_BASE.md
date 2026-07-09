# Knowledge Base — Delowar Hossain · Creative-Folio (MMXXVII)

A single-source reference for the **Delowar Hossain** creative-developer
portfolio at [delowarhossain.dev](https://delowarhossain.dev). Read this
first before making changes. Companion documents:

- [`docs/PERFORMANCE.md`](./PERFORMANCE.md) — frame-budget architecture, scroll, WebGL, lazy-load policy.
- [`docs/LOW_END_DEVICE_VERIFICATION.md`](./LOW_END_DEVICE_VERIFICATION.md) — real Android Chrome performance checklist.
- [`docs/RUM.md`](./RUM.md) — Vercel Web Analytics + Speed Insights validation.
- [`docs/SEO.md`](./SEO.md) — search + generative-engine optimisation playbook.
- [`docs/BRIEF.md`](./BRIEF.md) — working style, brief format, ways of working.
- [`docs/AGENT_SYSTEM_PROMPT.md`](./AGENT_SYSTEM_PROMPT.md) — copy-ready prompt for repo agents.
- [`docs/AGENT_SKILLS.md`](./AGENT_SKILLS.md) — anti-hallucination skills and playbooks.
- [`docs/AGENT_VERIFICATION_MATRIX.md`](./AGENT_VERIFICATION_MATRIX.md) — verification rules by change type.
- [`../SECURITY.md`](../SECURITY.md) — disclosure flow, hardening surface, header reference.
- [`../AGENTS.md`](../AGENTS.md) — short operating manual for AI / human contributors.

---

## 1. Identity

| Field                    | Value                                                                        |
| ------------------------ | ---------------------------------------------------------------------------- |
| Full name                | **Delowar Hossain** (also: Md Delowar Hossain)                               |
| Domain                   | `delowarhossain.dev` (apex, canonical)                                       |
| Email                    | `hello@delowarhossain.dev`                                                   |
| Studio                   | The Compiled Thought                                                         |
| Edition                  | **MMXXVII** (2027)                                                           |
| Booking                  | Q2 '27 → Q4 '27                                                              |
| Base                     | Joypurhat, Bangladesh                                                        |
| Languages                | English · Bengali                                                            |
| Repo                     | `mdhossain-2437/Creative-Folio`                                              |
| GitHub                   | [`@mdhossain-2437`](https://github.com/mdhossain-2437) — 127+ public repos   |
| LinkedIn                 | [`linkedin.com/in/mdhossain2437`](https://www.linkedin.com/in/mdhossain2437) |
| Twitter / X              | [`@mdhossain2437`](https://twitter.com/mdhossain2437)                        |
| read.cv                  | [`read.cv/delowar`](https://read.cv/delowar)                                 |
| Branding source of truth | [`src/lib/site.ts`](../src/lib/site.ts)                                      |

**Education**

- Source of truth: `src/lib/site.ts > site.education`.
- Narrative helper: `src/lib/education.ts` derives the public path from those
  entries: Political Science → self-taught web practice → B.Sc. Computer
  Science at University of the People.
- Public pages must import the helper or map `site.education`; do not restate
  education facts inline.

**Practice**

- Self-taught creative developer since 2023.
- Aspiring Software Engineer formalising CS fundamentals through the current
  `site.education` entry.
- Independent studio The Compiled Thought.
- Works remotely with clients worldwide.

> **Never** edit identity strings inline. If you find one, move it to
> `src/lib/site.ts` and import it.

### Year roll-over checklist

When the year ticks (e.g. 2027 → 2028):

1. `src/lib/site.ts`: `year`, `edition`, `editionShort`, `availability`.
2. `src/lib/data.ts`: bulk-replace year strings, recent project years, archive
   list, journal post dates, `meta` lines on lab arsenal cards.
3. Page-level metadata: `src/app/contact/page.tsx`, `services/page.tsx`,
   `now/page.tsx`, `showreel/page.tsx`, `lab/[slug]/page.tsx`,
   `colors/page.tsx`, `changelog/page.tsx`, `uses/page.tsx`,
   `atlas/page.tsx`, `uses/opengraph-image.tsx`.
4. Components: `Hero.tsx` marquee, `MilestonesScroll.tsx` heading,
   `ConsoleBanner.tsx`, `CommandPalette.tsx`, `Footer.tsx` marquee,
   `ShowreelTeaser.tsx`, `ShowreelModal.tsx` header.
5. Verify: `pnpm typecheck && pnpm lint && pnpm build`.

---

## 2. Stack & Folder Map

| Layer     | Tech                                           | Notes                                  |
| --------- | ---------------------------------------------- | -------------------------------------- |
| Framework | Next.js 16 (App Router, RSC, Turbopack stable) | static-first, server actions in `/api` |
| Language  | TypeScript strict                              | path alias `@/*` → `src/*`             |
| Styling   | Tailwind + custom tokens                       | tokens in `tailwind.config.ts`         |
| Motion    | GSAP, Lenis, Framer Motion                     | reduced-motion respected globally      |
| Graphics  | WebGPU, raw WebGL/GLSL, Canvas2D               | WebGPU is progressive; WebGL/Canvas2D fallbacks stay complete |
| RUM       | Vercel Web Analytics + Speed Insights          | route pageviews + Core Web Vitals after deploy |
| Type      | Newsreader (serif), Inter, JetBrains Mono      | local WOFF2 via `next/font/local`      |
| Icons     | Lucide                                         | `lucide-react`                         |
| Forms     | none — `mailto:` only                          | no third-party form                    |

```
src/
  app/                 # Next.js App Router pages + route handlers
    layout.tsx         # Root metadata + global chrome (Cursor, ClientOverlays, Footer)
    globals.css        # Tokens + atmosphere modes + print stylesheet
    [route]/page.tsx   # All pages
    api/               # Edge route handlers (indexnow, github, feed.json)
  components/
    layout/            # Navbar, Footer, StatusStrip, Preloader, RoutePrefetcher
    sections/          # Page sections (Hero, ShowreelTeaser, MilestonesScroll, …)
    ui/                # Atomic UI (Cursor, Magnetic, Marquee, ShowreelModal, …)
    webgl/             # GLSL hand-rolled WebGL components
    lab/               # Lab shell, shared CanvasDemo runtime, per-slug demo chunks
    seo/               # JsonLd graph (Person + WebSite + Organization + ProfilePage)
    providers/         # SmoothScrollProvider (Lenis-driven CSS vars)
  lib/
    site.ts            # Branding constants (single source of truth)
    data.ts            # All page content (works, archive, journal, reel, lab, …)
    achievements.ts    # localStorage achievement system
docs/
  KNOWLEDGE_BASE.md    # ← you are here
  PERFORMANCE.md       # frame-budget architecture
  SEO.md               # search + generative-engine playbook
  BRIEF.md             # working style + brief format
SECURITY.md            # disclosure + hardening surface
AGENTS.md              # short operating manual
next.config.mjs        # security headers + image domains + remote patterns
```

---

## 3. Design System

### Palette (Tailwind tokens)

| Token       | Hex       | Use                              |
| ----------- | --------- | -------------------------------- |
| `ink-950`   | `#070708` | deepest black, page background   |
| `ink-900`   | `#0c0c0c` | section background               |
| `peach`     | `#e3bfb4` | accent, hover state              |
| `warmwhite` | `#efece9` | primary text                     |
| `electric`  | `#cdfa00` | second accent (storm atmosphere) |

Always reach for the token classes (`bg-ink-950`, `text-warmwhite`, etc.).
Never hard-code hex values in JSX/CSS — add the token in
`tailwind.config.ts`.

### Color contrast rules (WCAG AA)

- **Primary text:** `text-warmwhite` (full opacity) or `text-warmwhite/85`.
- **Secondary text:** `text-warmwhite/65` minimum on dark backgrounds.
  Anything ≤ `/55` is reserved for purely decorative typography (large display
  numerals, marquees) and must never carry critical information.
- **Borders:** `border-warmwhite/15` minimum. `/10` is too low.
- **Status pills / dots:** add a `bg-peach` / `bg-emerald-400` indicator next
  to the text — never rely on color alone.

### Typography

- Display: **Newsreader** with `tracking-tightest` for the largest sizes
  (3rem+). Italics for the second-line accent.
- Body: **Inter** at 15–17px, leading-relaxed.
- Mono / labels: **JetBrains Mono** at 10–11px uppercase tracking-widest.
- Display numerals (year, time, edition, version) → wrap in
  `<span className="display-num">…</span>` to apply the OpenType salt feature.

### Z-index map

| Layer           | z-index | Component                                 |
| --------------- | ------- | ----------------------------------------- |
| Cursor          | **200** | `Cursor.tsx` (always on top)              |
| Modals          | 110     | `ShowreelModal.tsx`, `CommandPalette.tsx` |
| Route curtain   | 95      | page transitions                          |
| Preloader       | 90      | `Preloader.tsx`                           |
| Grid overlay    | 60      | `GridOverlay.tsx`                         |
| Header / Navbar | 50      | `Navbar.tsx`                              |
| Atmosphere pill | 30      | `AtmosphereMode.tsx`                      |
| Default         | 0–10    | section content                           |

> **Critical:** the custom cursor must always be the topmost element so that
> when modals open the cursor stays in front. Never lower `z-[200]` on
> `Cursor.tsx`.

---

## 4. Performance Architecture (high-level)

> Full detail: [`docs/PERFORMANCE.md`](./PERFORMANCE.md).

The MMXXVII performance pass put the site into the same league as
[immersive-g.com](https://immersive-g.com). The three rules to never break:

1. **No React state on the scroll hot path.** `SmoothScrollProvider` writes
   CSS custom properties (`--scroll-vy`, `--scroll-progress`) to `<html>` on
   every Lenis tick. Components that want scroll-coupled animation read those
   vars from CSS — zero React reconciliation.
2. **Every canvas / rAF loop pauses off-screen.** `IntersectionObserver` with
   `threshold: 0.01` cancels `requestAnimationFrame` when the element leaves
   the viewport, restarts when it returns. Audit any new canvas component
   against this rule.
3. **Pre-warm routes during the preloader.** `RoutePrefetcher` fires
   `router.prefetch()` for every primary route while the preloader is on
   screen, then deferred fetches for slug pages. First nav after the
   preloader is essentially instant.

Smaller rules: `decoding="async"` and `loading="lazy"` on every below-fold
image; `priority` only on the LCP element; honour `prefers-reduced-motion`
on every motion path; honour `Save-Data` and `slow-2g`/`2g` for any
prefetch.

---

## 5. Security (high-level)

> Full detail: [`SECURITY.md`](../SECURITY.md).

`next.config.mjs` ships these headers on every route:

| Header                         | What it buys                                                                                                                 |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `Content-Security-Policy`      | Locks script/style/img/connect/frame-ancestors with explicit allow-list for Vercel analytics + Cloudflare Stream + IndexNow. |
| `Strict-Transport-Security`    | `max-age=63072000; includeSubDomains; preload` (HSTS preload-eligible).                                                      |
| `X-Frame-Options`              | `DENY`                                                                                                                       |
| `X-Content-Type-Options`       | `nosniff`                                                                                                                    |
| `Referrer-Policy`              | `strict-origin-when-cross-origin`                                                                                            |
| `Permissions-Policy`           | camera/mic/geo/USB/sensors/payment all disabled                                                                              |
| `Cross-Origin-Opener-Policy`   | `same-origin`                                                                                                                |
| `Cross-Origin-Resource-Policy` | `same-origin`                                                                                                                |

Validators: securityheaders.com, csp-evaluator.withgoogle.com,
hstspreload.org. Goal: **A** rating, A+ once HSTS preload is approved.

CSP intentionally retains `'unsafe-inline'` and `'unsafe-eval'` because
Next 16's RSC boot script and framer-motion need them. Switching to
`strict-dynamic + nonce` is a future-2028 task — see §10.

### IndexNow

The IndexNow protocol key `fd368c2ed2b146b08786d891a327f465` is hardcoded
as the default in `src/app/indexnow.txt/route.ts` and
`src/app/api/indexnow/route.ts`. **This is intentional** — IndexNow keys
are public by design (search engines GET the file to verify ownership).
Override via `NEXT_PUBLIC_INDEXNOW_KEY` env to rotate without a code
deploy.

---

## 6. Source-of-truth Constants

| File                  | Owns                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `src/lib/site.ts`     | Identity, brand strings, year, edition, booking, socials, nav, education, GitHub footprint, portrait + resume paths |
| `src/lib/data.ts`     | Works, archive, journal, reel clips, lab cards, services, awards, journey                                           |
| `tailwind.config.ts`  | Color tokens, type scale, animation utilities                                                                       |
| `src/app/globals.css` | Atmosphere modes, cursor styles, print sheet, kinetic class                                                         |
| `next.config.mjs`     | Image domains + remote patterns + security headers + cache rules                                                    |

---

## 7. The Showreel Modal (functional)

- Opened via `window.dispatchEvent(new CustomEvent("delowar:open-showreel"))`.
- Public chapters use local/static covers unless a verified project recording is
  available in `reelClips[].videoSrc`.
- Keyboard map for verified video chapters: `Space` play/pause · `←/→` ±5s ·
  `M` mute · `Shift` slow-mo · `Esc` close.
- Video chapters auto-advance on `onEnded`; static chapters stay navigable from
  the chapter selector.
- Body scroll is locked while open.
- Legacy stock/mock sources are kept only as draft reference fields
  (`legacyVideoSrc`, `legacyPoster`) and must not be rendered publicly:
  - `https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4`
  - `https://test-videos.co.uk/vids/sintel/mp4/h264/720/Sintel_720_10s_1MB.mp4`
  - `https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_2MB.mp4`
  - `https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_640x360.m4v`

When verified recordings are ready, add self-hosted or Cloudflare Stream URLs
to `videoSrc`, keep local posters, and rerun the full quality gate.

---

## 8. 2027 Future-Stack Features

| Feature                                                             | Trigger                                                                                  | Component                                           |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Atmosphere modes (aura/storm/stillness/eink/terminal)               | press **T** or click pill · Shift-click pill copies a `?atmosphere=<mode>` shareable URL | `AtmosphereMode.tsx` + `globals.css` data-attribute |
| Page-dwell counter                                                  | appears bottom-left after 30 s on a page; "settled" achievement at 3 min                 | `PageDwellCounter.tsx`                              |
| Smart back-link pill                                                | floating "Back to <referrer>" pill on `/works/[slug]`                                    | `SmartBackLink.tsx`                                 |
| Ghost cursors                                                       | 2-3 faint canned cursor trails replay near hero                                          | `GhostCursors.tsx`                                  |
| Variable-weight type                                                | body copy morphs `wght 320 → 540` on scroll-in                                           | `WeightShift.tsx`                                   |
| Hero fluid displacement                                             | curl-noise WebGL2 ripple over hero H1                                                    | `HeroFluidDisplacement.tsx`                         |
| 3D reel chapter carousel                                            | enhanced-only drag/scroll/buttons on `/showreel`; static covers remain canonical         | `ReelChapterCarouselClient.tsx`                     |
| Time capsule (snapshot of page state)                               | press **C**                                                                              | `TimeCapsule.tsx`                                   |
| Funny page titles                                                   | tab loses focus + scroll milestones                                                      | `TabTitleFlicker.tsx`                               |
| Idle drift                                                          | after 60 s of zero input, slow marquees + dim accent · `data-idle="true"` on `<html>`    | `IdleDrift.tsx` + `globals.css`                     |
| Section progress dots                                               | right-edge column tracks `<section>` scroll on `/ai`, `/about`, `/works/[slug]`          | `SectionProgressDots.tsx`                           |
| Quote of the Day                                                    | 64-quote daily rotation in footer, click to copy                                         | `QuoteOfTheDay.tsx`                                 |
| Dynamic SEO JSON-LD (Person + WebSite + Organization + ProfilePage) | always                                                                                   | `JsonLd.tsx`                                        |
| StatusStrip (time / temp / GH stars / booking)                      | always above footer                                                                      | `StatusStrip.tsx`                                   |
| Showreel video player                                               | `delowar:open-showreel` event                                                            | `ShowreelModal.tsx`                                 |
| RoutePrefetcher                                                     | mounts inside layout, warms every primary route during preloader                         | `RoutePrefetcher.tsx`                               |

To add a new global overlay: register the actual dynamic component in
`src/components/layout/ClientOverlaysBundle.tsx`. Keep
`ClientOverlays.tsx` as the tiny on-demand shell so production builds do not
preload every overlay during first scroll. New overlays must respect
`prefers-reduced-motion` and should pause when off-screen if they animate.

---

## 9. SEO + Generative Engine Optimisation

> Full detail: [`docs/SEO.md`](./SEO.md).

### Search engines (Google, Bing, Yandex, Brave, DuckDuckGo)

- `metadataBase` is `site.url`. Don't hard-code domains.
- The root metadata in `src/app/layout.tsx` covers OG, Twitter, canonical,
  keywords. Per-page metadata appends `· Delowar Hossain` via title template.
- JSON-LD: a 4-node graph (`Person`, `WebSite`, `Organization`, `ProfilePage`)
  with stable `@id` cross-refs, injected via `JsonLd.tsx` in `<body>`.
- `Person.alumniOf` maps from `site.education` so JSON-LD stays aligned with
  About, Resume, and `/ai`.
- Sitemap (`/sitemap.xml`) includes `<image:image>` entries for portrait +
  project covers + OG cards. Robots (`/robots.txt`) explicitly allows 16+ AI
  crawlers (GPTBot, ClaudeBot, PerplexityBot, …).
- Atom feed: `/journal/feed.xml`. JSON Feed: `/api/feed.json`.

### AI engines (ChatGPT, Perplexity, Claude, Gemini)

- `/llms.txt` (manifest) and `/llms-full.txt` (full plain-text dump) follow
  the [llmstxt.org](https://llmstxt.org) convention.
- `/ai` page is a clean factual snapshot tuned for AI citation: portrait,
  hard-fact `<dl>`, services, recent works, 8-question FAQ with `FAQPage`
  JSON-LD.
- `/about` leads with a plain-prose factual paragraph derived from
  `src/lib/education.ts`, plus studio, location, and language signals —
  primary GEO citation target.

### IndexNow

After every deploy, `POST /api/indexnow` with the changed URLs to fan out
the announcement to Bing, Yandex, Naver, Seznam, Yep. Key is hardcoded as
default; override via `NEXT_PUBLIC_INDEXNOW_KEY`.

---

## 10. Future Roadmap (post-MMXXVII)

These are **planned**, not blockers. Pick one when you have appetite for a
focused PR.

### Architecture

- **Strict CSP with nonces.** Switch from `'unsafe-inline'` to per-request
  nonces using Next.js middleware. Touches: `next.config.mjs`, every inline
  `<script>` (JSON-LD, GA, etc.). Validate with csp-evaluator.
- **Edge runtime for `/api/github`.** Currently Node runtime; Edge would
  shave ~150ms off the first paint of `/now`.
- **Service worker offline shell** for `/now`, `/journal`, `/ai`.
- **View Transitions API.** Once cross-document is widely supported, adopt
  to replace the `RouteCurtain`.

### Identity / content

- Real GitHub stats via the new edge route — auto-pull repo count + top
  languages instead of static `site.github.repos = 127`.
- LinkedIn live-pull via Brightdata or similar — keep "currently studying"
  copy in sync.
- Add verified showreel recordings via self-hosted files or Cloudflare Stream;
  keep legacy stock samples in draft-only fields.

### SEO

- Submit `delowarhossain.dev` to https://hstspreload.org once the production
  HSTS header has been live for 30+ days.
- Add `BlogPosting` JSON-LD per `/journal/[slug]` (currently only on a
  subset).
- Add `Product` / `Service` JSON-LD per offering on `/services`.

### Performance

- Adopt `<link rel="modulepreload">` for the Lenis chunk so first paint of
  the home page doesn't wait on the smooth-scroll bundle.
- Keep local WOFF2 subsets audited in `src/assets/fonts` when changing the type
  system.
- Keep worker-backed lab simulations limited to the full slug pages unless
  profiling shows compact grid workers would pay for their creation cost.

### "Add 2028+ tech without a refactor" guide

When adding a new framework/library/tool:

1. **Source-of-truth first.** If it's a constant or ID, it goes in
   `src/lib/site.ts`. If it's content, it goes in `src/lib/data.ts`. Never
   inline.
2. **Tokens, not values.** New colours go in `tailwind.config.ts`. New
   spacing scales go in `tailwind.config.ts`. New animations go in
   `globals.css` `@layer utilities`.
3. **Honour the perf rules.** Any new rAF / canvas / motion needs IO pause
   and reduced-motion fallback. Any new client component should be lazy
   where reasonable.
4. **Honour the security rules.** New external origins must be added to
   the CSP `connect-src` (or `img-src` / `media-src`) in `next.config.mjs`.
   Prefer subresource integrity when loading scripts from CDNs.
5. **Honour the SEO rules.** New pages need `export const metadata` with
   a 1-line description, an OG image route (or fall back to the homepage
   OG), and an entry in `sitemap.ts`.
6. **Honour the cursor rule.** Never lower `z-[200]`. Never inline a custom
   cursor — use the existing `data-cursor="hover|view|drag"` API.
7. **Verify the trio.** `pnpm typecheck && pnpm lint && pnpm build` must
   pass before merge. CI runs the same.

---

## 11. Local Dev Setup

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm typecheck    # tsc --noEmit
pnpm lint         # next lint
pnpm build        # production build
pnpm start        # serve production build (test headers / cache)
```

Pre-commit hooks: none. Run `pnpm typecheck && pnpm lint` manually before
opening a PR.

### Optional environment variables

| Var                               | Purpose                                             | Where to set                                         |
| --------------------------------- | --------------------------------------------------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_INDEXNOW_KEY`        | Override the hardcoded default IndexNow key.        | Vercel → Project → Settings → Environment Variables. |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | Google Search Console verification meta.            | Vercel env.                                          |
| `NEXT_PUBLIC_BING_VERIFICATION`   | Bing Webmaster verification meta (`msvalidate.01`). | Vercel env.                                          |
| `NEXT_PUBLIC_YANDEX_VERIFICATION` | Yandex Webmaster verification meta.                 | Vercel env.                                          |
| `NEXT_PUBLIC_SENTRY_DSN`          | Enables Sentry reporting for WebGL/shader failures. | Vercel env.                                          |
| `GITHUB_PAT`                      | Lifts `/api/github` from 60 → 5000 req/hr per IP.   | Vercel env.                                          |

To create a GitHub PAT: github.com → Settings → Developer settings →
Personal access tokens → Fine-grained tokens → Generate new token.
Repository access: _All public repositories_ (read-only). Permissions:
_Metadata = read-only_.

---

## 12. `/api/github` (consolidated GitHub data route)

- Single endpoint feeding `StatusStrip` (the `··· GH` pill),
  `ContributionHeatmap` on `/now`, and the recent-commits list on `/now`.
- Cache: `s-maxage=1800, stale-while-revalidate=86400` (30-minute fresh,
  24-hour SWR). Page-level `revalidate = 1800` on `/now`.
- Implementation: `src/app/api/github/route.ts` thin wrapper over
  `src/lib/github-fetch.ts` (server-only). The `/now` page calls
  `fetchGitHubData()` directly — no HTTP roundtrip.
- Fallback: never throws. On full failure returns a baked snapshot with
  `stale: true` from `githubFallback` in `src/lib/data.ts`.

---

## 13. Mock Asset Sources

When you need a placeholder image or video, use the following verified
sources (HTTP 200 as of MMXXVII rollout). If anything 4xx's, swap it out
and update this list.

- **Images:** Unsplash IDs already wired in `data.ts` (replace dead IDs by
  searching another similar abstract dark/peach photo — verify with
  `curl -I` first).
- **Videos:** see §7 above.

Domains permitted in `next.config.mjs` for `next/image`:

- `images.unsplash.com`
- `flagcdn.com`
- `avatars.githubusercontent.com`

When adding a new external image origin, **also** extend the CSP
`img-src` directive in `next.config.mjs` headers. Both lists must agree.

---

## 14. Common Edits

- **New page:** create `src/app/<slug>/page.tsx` with `export const metadata`,
  use `<PageHero>`, register in `src/lib/site.ts > nav` if it belongs in the
  navbar.
- **New section on home:** add to `src/app/page.tsx`. Wrap in `<Reveal>` for
  scroll-fade entry.
- **New navbar primary item:** edit the `PRIMARY` array in
  `src/components/layout/Navbar.tsx`.
- **New shortcut:** add a handler in `src/components/ui/NavShortcuts.tsx` and
  document it in `src/components/ui/CheatSheet.tsx`.
- **New atmosphere mode:** add a `Mode` to `AtmosphereMode.tsx`, extend the
  `:root[data-atmosphere=...]` block in `globals.css`.
- **New external origin:** add to `next.config.mjs` `images.remotePatterns`
  AND to the CSP `img-src` / `connect-src` in the same file.
- **New rAF / canvas:** add IntersectionObserver pause/resume (see
  `HeroFluidDisplacement.tsx` for the pattern). Honour reduced-motion.

---

## 15. Feature Flags for Unverified Content

The site includes feature flags to hide unverified or aspirational content until it is earned. This prevents credibility issues while preserving the content for future use.

### Available Flags

Located in `src/lib/site.ts`:

| Flag               | Default | Purpose                                                    |
| ------------------ | ------- | ---------------------------------------------------------- |
| `showAwards`       | `false` | Hides earned-awards sections until awards have verification |
| `showTestimonials` | `false` | Hides testimonials from case studies                       |
| `showShowreel`     | `false` | Hides showreel functionality and navigation entry          |

Located in `src/lib/data.ts`:

| Field | Default | Purpose |
| --- | --- | --- |
| `reelClips[].videoSrc` | omitted until verified | Enables a public reel video only when a self-hosted or otherwise verified source is available |
| `legacyPreviewSrc` / `legacyVideoSrc` | draft-only | Keeps old stock/mock URLs for provenance without rendering them publicly |

### How to Enable

When you earn real awards or have verified testimonials:

1. Update `src/lib/site.ts`:

   ```typescript
   showAwards: true,
   showTestimonials: true,
   showShowreel: true,
   ```

2. Update `src/lib/data.ts`:

   - Set earned award records to `status: "earned"` and add a public proof URL
     before they appear as earned JSON-LD.
   - Keep unearned goals as `status: "target"` so public UI labels them as
     recognition targets.
   - Add verified showreel recordings to `reelClips[].videoSrc`; do not move
     stock/mock URLs out of the legacy fields.

3. Uncomment navigation entries in `src/lib/site.ts`:

   ```typescript
   { label: "Recognition", href: "/awards" },
   { label: "Showreel", href: "/showreel" },
   ```

4. Run `pnpm build` to verify.

### What Gets Hidden

- **Awards**: Earned-awards section and earned-award metadata in case study hero
- **Testimonials**: Testimonial sections in case studies
- **Placeholder videos**: Stock/mock URLs stay in legacy fields and are not
  rendered publicly
- **Navigation**: Awards and Showreel routes are commented out

### Why This Exists

Fabricated awards, testimonials, and placeholder videos can destroy credibility when discovered by technical clients, recruiters, or peers. These flags allow you to:

- Keep aspirational content in the codebase for future use
- Present an honest, verifiable portfolio now
- Enable verified content with a single flag change later

---

## 16. Don't

- Don't reduce cursor z-index.
- Don't hard-code branding strings — use `site.*`.
- Don't introduce new domains in `next/image` `src` without adding them to
  `next.config.mjs` (and the CSP).
- Don't ship `console.log`s outside of `ConsoleBanner.tsx`.
- Don't commit `.env*` files.
- Don't downgrade text contrast for "aesthetic" reasons. Pretty +
  unreadable is just unreadable.
- Don't add a per-frame React `setState` on a scroll handler — write to a
  CSS custom property instead.
- Don't ship a canvas without IO pause/resume.
- Don't bypass `prefers-reduced-motion`.
