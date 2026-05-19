# AGENTS.md — Operating Manual for Creative-Folio

> Read this **before** modifying anything. The deeper docs live in
> [`docs/KNOWLEDGE_BASE.md`](docs/KNOWLEDGE_BASE.md),
> [`docs/PERFORMANCE.md`](docs/PERFORMANCE.md),
> [`docs/SEO.md`](docs/SEO.md),
> [`docs/BRIEF.md`](docs/BRIEF.md), and
> [`SECURITY.md`](SECURITY.md). This file is the quick map.

## Project at a Glance

* **Repo:** `mdhossain-2437/Creative-Folio`
* **Owner:** Delowar Hossain — `delowarhossain.dev` · Joypurhat, Bangladesh
* **Edition:** **MMXXVII** (2027)
* **Stack:** Next.js 16 · React 19 · TypeScript · Tailwind · GSAP · raw WebGL2 · Lenis · Framer Motion
* **Package manager:** pnpm
* **Education:** B.Sc. Computer Science (in progress, University of the People) + B.A. Political Science

## Setup

```bash
pnpm install
pnpm dev          # → http://localhost:3000
pnpm typecheck    # tsc --noEmit
pnpm lint         # next lint
pnpm build        # full production build
pnpm start        # serve production build (test headers, cache)
```

There are no pre-commit hooks. There is no test runner — visual +
typecheck + lint + build is the pre-merge gate.

## Source-of-truth Constants

| File | Owns |
| --- | --- |
| `src/lib/site.ts` | Identity (incl. education + GitHub footprint), brand strings, year, edition, booking, socials, nav |
| `src/lib/data.ts` | Works, archive, journal, reel clips, lab cards |
| `tailwind.config.ts` | Color tokens, type scale, animation utilities |
| `src/app/globals.css` | Atmosphere modes, cursor styles, print sheet, `.kinetic` |
| `next.config.mjs` | Security headers, image domains, cache rules |

## Style Rules (must)

1. **Tokens, not hex.** `bg-ink-950`, `text-warmwhite`, `border-peach/40`.
2. **Branding via `site`.** Import from `@/lib/site` — never inline.
3. **Contrast: WCAG AA.** Body copy on dark ≥ `text-warmwhite/65`. Borders ≥
   `border-warmwhite/15`.
4. **Cursor stays on top.** `Cursor.tsx` is `z-[200]`. Modals are `z-[110]`.
5. **Reduced motion is honoured.** Wrap heavy animations in checks for
   `prefers-reduced-motion`.
6. **No `console.log`** outside `ConsoleBanner.tsx`.
7. **No new image domains** without adding to both `next.config.mjs > images`
   AND the CSP `img-src` directive.

## Performance Rules (must)

1. **No React state on the scroll hot path.** Use the `--scroll-vy` /
   `--scroll-progress` CSS custom properties on `<html>` (written by
   `SmoothScrollProvider`). Components react via plain CSS — no hook
   subscriptions.
2. **Every canvas / rAF loop pauses off-screen.** Wire an
   `IntersectionObserver` with `threshold: 0.01`; cancel `rAF` when
   off-screen, restart when visible.
3. **Pre-warm routes during the preloader.** New nav routes go into
   `RoutePrefetcher.tsx`'s `PRIMARY_ROUTES` or `SECONDARY_ROUTES` arrays.
4. **Save-Data is sacred.** Skip prefetch / lazy harder when
   `navigator.connection.saveData` is true.

Full detail: [`docs/PERFORMANCE.md`](docs/PERFORMANCE.md).

## Security Rules (must)

1. **Don't break securityheaders.com grade A.** All headers live in
   `next.config.mjs`'s `async headers()`.
2. **CSP allow-list only what you need.** New external origin → extend
   `connect-src` / `img-src` / `media-src` in `next.config.mjs`.
3. **Verify all `sameAs` URLs in JSON-LD.** Broken links undermine
   entity resolution.
4. **IndexNow key default is intentional.** It's public by design.
   Override via `NEXT_PUBLIC_INDEXNOW_KEY` env to rotate.

Full detail: [`SECURITY.md`](SECURITY.md).

## SEO + GEO Rules (must)

1. **Title template adds `· Delowar Hossain`** to every page. Don't
   override the template; just set page-specific `title`.
2. **Every new page needs `metadata` + sitemap entry + canonical alt.**
3. **JSON-LD edits must validate** on https://validator.schema.org.
4. **`/llms.txt` and `/llms-full.txt`** are the AI-engine contract.
   When adding new content sections, mirror them into both.
5. **`alumniOf` is an array** (UoPeople + Political Science). Don't
   regress to a single object.

Full detail: [`docs/SEO.md`](docs/SEO.md).

## Adding Things

* **A page:** `src/app/<slug>/page.tsx` with an exported `metadata` and
  `<PageHero>`. Register in `site.nav` if it should appear in the navbar.
  Add a sitemap entry in `src/app/sitemap.ts`.
* **A nav item:** add the slug to the `PRIMARY` array in `Navbar.tsx`,
  and to `RoutePrefetcher.tsx`'s `PRIMARY_ROUTES`.
* **A keyboard shortcut:** handler in `NavShortcuts.tsx`, label in
  `CheatSheet.tsx`, optional achievement in `achievements.ts`.
* **An atmosphere mode:** new `Mode` in `AtmosphereMode.tsx` + matching
  `:root[data-atmosphere="…"]` block in `globals.css`.
* **A reel chapter:** push to `reelClips` in `data.ts` with a verified `videoSrc`.
* **A canvas / WebGL component:** wire IntersectionObserver pause + reduced-motion
  fallback. Reference `HeroFluidDisplacement.tsx`.
* **An external origin:** add to `next.config.mjs` `images.remotePatterns`
  AND to the CSP directive (img-src / connect-src / media-src).

## Don'ts

* Don't change the cursor z-index.
* Don't fake passing CI by mutating tests/lints.
* Don't add a runtime API call without an offline fallback.
* Don't introduce dead Unsplash IDs (`curl -I` to verify before committing).
* Don't add a per-frame `setState` on a scroll handler.
* Don't ship a new canvas without IntersectionObserver pause.
* Don't bypass `prefers-reduced-motion`.
* Don't hard-code domains — use `metadataBase` + relative paths.

## PR Etiquette

1. `pnpm typecheck && pnpm lint && pnpm build` must all pass locally.
2. Branch name: `devin/<unix-ts>-<topic>`.
3. PR template lives in `.github/PULL_REQUEST_TEMPLATE.md`.
4. Include preview deploy link (Vercel) when sharing the PR.
5. Don't force-push to a shared branch. Use `--force-with-lease` only on
   your own feature branch after a rebase.
6. Don't amend commits. Push new commits to fix prior issues.

Full ways-of-working detail: [`docs/BRIEF.md`](docs/BRIEF.md).

## Repository Tour

```
src/app/                # routes (RSC by default)
src/components/layout/  # chrome (Navbar, Footer, StatusStrip, Cursor host, RoutePrefetcher)
src/components/sections # page sections (Hero, ShowreelTeaser, …)
src/components/ui/      # atomic widgets
src/components/webgl/   # raw WebGL2 canvases (HeroShader, HeroFluidDisplacement, NoiseField)
src/components/seo/     # JsonLd graph
src/components/providers # SmoothScrollProvider (Lenis + CSS vars)
src/lib/                # site config + data + utilities
docs/KNOWLEDGE_BASE.md  # detailed system reference
docs/PERFORMANCE.md     # frame-budget architecture
docs/SEO.md             # SEO + GEO playbook
docs/BRIEF.md           # working style + brief format
SECURITY.md             # disclosure + hardening surface
```

## Future Roadmap (post-MMXXVII)

See [`docs/KNOWLEDGE_BASE.md` §10](docs/KNOWLEDGE_BASE.md) for the full
list. Highlights:

* Strict CSP with nonces (drop `'unsafe-inline'`).
* WebGPU fallback for `HeroShader`.
* Edge runtime for `/api/github` + service-worker offline shell.
* Bangla locale (`/bn/`) — `metadata.alternates.languages` is wired.
* Self-hosted Cloudflare Stream uploads (replace test-videos.co.uk).
