# AGENTS.md - Operating Manual for Creative-Folio

> Read this before modifying anything. This repo is Delowar Hossain's
> creative portfolio and experiment laboratory: treat it like production
> software, an editorial design system, and a living creative direction
> archive at the same time.

Deep references:

- [docs/KNOWLEDGE_BASE.md](docs/KNOWLEDGE_BASE.md) - system reference,
  folder map, roadmap, common edits.
- [docs/PERFORMANCE.md](docs/PERFORMANCE.md) - frame-budget rules for scroll,
  rAF, WebGL, prefetching, damping, DPR caps.
- [docs/SEO.md](docs/SEO.md) - SEO + generative-engine optimization playbook.
- [docs/BRIEF.md](docs/BRIEF.md) - work style, branch rituals, voice.
- [SECURITY.md](SECURITY.md) - hardening surface, CSP, headers, secrets.

## Project Identity

- Repo: `mdhossain-2437/Creative-Folio`
- Canonical domain: `https://delowarhossain.dev`
- Owner: Delowar Hossain, Joypurhat, Bangladesh
- Edition: `MMXXVII / 03.27` in `src/lib/site.ts`
- Purpose: award-tier creative developer portfolio, portfolio archive, lab
  playground, SEO/GEO identity surface, and experiment library.
- Mindset: act as a senior software engineer, creative developer, and creative
  director. Protect performance and security, but also protect rhythm,
  typography, pacing, and narrative.

## Tech Stack

- Framework: Next.js 16 App Router, React 19, TypeScript 5.9.
- Styling: Tailwind CSS 3.4, global CSS atmosphere modes, CSS custom
  properties, editorial font stack via `next/font/google`.
- Motion: GSAP, Framer Motion, Lenis, hand-tuned CSS transitions.
- Graphics: Three.js, `@react-three/fiber`, `@react-three/drei`, raw WebGL2,
  GLSL shaders, canvas experiments.
- UI details: lucide-react icons, custom cursor system, command palette,
  overlays, route curtain, sound toggle.
- Package manager: pnpm only.
- Deployment assumptions: Vercel-compatible Next build with hardened headers
  from `next.config.mjs`.

## Project Architecture

The app is static-first with selective route handlers. Most pages are React
Server Components under `src/app`, while interactive overlays, motion widgets,
and WebGL/canvas pieces are client components.

- `src/app/` owns routes, metadata exports, route handlers, Open Graph images,
  `robots.ts`, `sitemap.ts`, `manifest.ts`, `/llms.txt`, `/llms-full.txt`, and
  API endpoints.
- `src/app/layout.tsx` composes the shell: fonts, metadata, JSON-LD,
  `SmoothScrollProvider`, `Preloader`, `LazyChrome`, `SoundProvider`,
  `ClientOverlays`, `Navbar`, `RouteCurtain`, and `Footer`.
- `src/components/layout/` owns persistent chrome: navigation, footer, status
  strip, preloader, lazy chrome, route prefetcher, page hero.
- `src/components/sections/` owns route-level editorial sections composed by
  pages.
- `src/components/ui/` owns reusable interaction atoms and overlays such as
  cursor, command palette, cheat sheet, reveal, magnetic behavior, scroll
  progress, sound, and toast.
- `src/components/webgl/` owns raw WebGL2 canvas components. These must obey
  reduced-motion, IntersectionObserver pause, cleanup, and DPR caps.
- `src/components/seo/` owns JSON-LD and page schema.
- `src/components/providers/` owns client providers, especially
  `SmoothScrollProvider`.
- `src/lib/` owns canonical data, identity constants, GitHub fetch helpers,
  rAF bus, math helpers, DPR helpers, noise baking, quotes, and achievements.
- `public/` owns committed static assets: resume, portrait, icons, OG assets,
  llms/humans-style public files.

## Source-of-Truth Rules

When values disagree, trust this order and remove duplication:

1. `src/lib/site.ts` - identity, branding, canonical URL, socials, education,
   GitHub footprint, showreel, nav, command actions.
2. `src/lib/data.ts` - works, archive, journal, lab experiments, services,
   process, awards, reel clips, testimonials, fallback content.
3. `next.config.mjs` - security headers, CSP, image remote patterns, cache
   policy.
4. `tailwind.config.ts` - color tokens, type families, animations, easing.
5. `src/app/globals.css` - atmosphere modes, cursor styles, print sheet,
   global utility classes.
6. Individual components - implementation only, not canonical identity data.

Never inline identity strings, brand URLs, social links, nav labels, or major
content that belongs in `site.ts` or `data.ts`.

## Setup And Commands

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm lint
pnpm build
pnpm start
```

Command details:

- `pnpm dev` runs `next dev -p 3000`.
- `pnpm typecheck` runs `tsc --noEmit`.
- `pnpm lint` runs `eslint .`.
- `pnpm build` runs `next build`.
- `pnpm start` runs `next start -p 3000`.

There are no pre-commit hooks and no test runner in this repository. The local
quality gate is typecheck, lint, production build, and visual/manual
verification.

## Testing Strategy

Run this before committing or publishing meaningful work:

```bash
pnpm typecheck && pnpm lint && pnpm build
```

For frontend or creative changes, also run the app and verify the affected
routes in a browser:

```bash
pnpm dev
```

Manual verification rules:

- New or changed page: check desktop and mobile responsive layout, hover/focus
  states, keyboard access, metadata, OG image route if present, sitemap entry,
  and canonical.
- WebGL/canvas/rAF change: verify reduced-motion fallback, off-screen pause,
  resize behavior, cleanup on unmount, DPR cap, and no blank canvas.
- Scroll or animation change: verify no React state writes on scroll hot paths
  and no visual jank on slower devices.
- SEO/JSON-LD change: validate with <https://validator.schema.org> after
  deployment or using rendered markup.
- Header/CSP/origin change: verify with securityheaders.com and CSP Evaluator
  after preview deployment.
- API route change: verify offline/fallback behavior, cache headers, and that
  no secrets are exposed to the client.

When adding a formal test runner in the future, do it as a dedicated tooling PR
and document exact commands here. Until then, do not invent fake test commands.

## Coding Standards

- TypeScript is strict. `allowJs` is false. Keep source in `.ts` and `.tsx`.
- Use `@/*` imports for source-root imports.
- Prefer precise types, discriminated unions, and exported data types for
  structured content. Avoid `any`; use `unknown` plus narrowing when needed.
- Keep React component files in `PascalCase.tsx`; file name should match the
  exported component.
- Route folders are lowercase URL slugs. Use `page.tsx`, `route.ts`,
  `layout.tsx`, `opengraph-image.tsx`, and `twitter-image.tsx` conventions.
- Utilities should be small and focused. Use `camelCase.ts` for local helper
  style already present (`bakeNoise.ts`, `github-fetch.ts` is the existing
  kebab exception).
- Component props and variables use `camelCase`.
- Constants use `UPPER_SNAKE_CASE` only for real module-level constants.
- CSS custom properties use `--kebab-case`.
- Data slugs use `kebab-case`.
- Keep comments short and useful. Explain timing, security, or rendering
  intent; do not narrate obvious assignments.
- Use ASCII by default. Keep existing non-ASCII copy where it is part of the
  brand voice or content.

## React And Next.js Rules

- Prefer Server Components by default in `src/app`. Add `"use client"` only
  for browser APIs, state, effects, refs, event handlers, canvas, media, or
  animation libraries.
- Keep client components as small as possible and pass serializable props from
  server pages.
- Export `metadata` for every new page. Do not override the root title
  template; set page-specific `title`.
- Use `metadataBase` plus relative paths for canonical, OG, and alternates.
  Do not hard-code the production domain inside page metadata.
- New public routes need sitemap coverage in `src/app/sitemap.ts`.
- New nav-visible routes must be added to `site.nav`, `Navbar.tsx`'s `PRIMARY`
  list if primary, and `RoutePrefetcher.tsx` route arrays.
- Route handlers must be cache-aware and must include offline or baked fallback
  behavior when they call an external service.

## Design And Creative Direction Standards

- Tokens, not raw values: use `bg-ink-950`, `text-warmwhite`,
  `border-peach/40`, and other Tailwind tokens. Hex values belong in
  `tailwind.config.ts` or content data accents when already modeled there.
- Preserve the editorial voice: concise, direct, personal, art-directed.
  Avoid corporate filler and generic SaaS marketing copy.
- Interface copy usually uses calm title case or lowercase according to nearby
  patterns. Match the existing route.
- Typography is part of the product: Newsreader for editorial moments,
  JetBrains Mono for system labels, Inter for body, Sacramento only for the
  signature system.
- Maintain WCAG AA contrast. Body copy on dark must be at least
  `text-warmwhite/65`; borders should generally be at least
  `border-warmwhite/15`.
- Do not flatten the site into generic cards. Preserve the immersive,
  editorial, high-performance creative direction.
- The brand/product/person signal must appear in the first viewport for
  identity-bearing pages.

## Motion, Scroll, And WebGL Performance

- No React state on the scroll hot path. `SmoothScrollProvider` writes
  `--scroll-vy` and `--scroll-progress` to `<html>`; components should react
  through CSS or refs.
- Use `useScrollVelocityRef()` for imperative loops that need live scroll
  metrics without re-rendering.
- Every canvas and rAF loop must pause off-screen with `IntersectionObserver`
  using `threshold: 0.01`.
- Always cancel rAF, remove listeners, disconnect observers, and clean WebGL
  resources where applicable.
- Honor `prefers-reduced-motion` before initializing heavy animations,
  shaders, cursor effects, or smooth scrolling.
- Respect `navigator.connection.saveData` and slow network hints. Skip
  prefetching and reduce expensive loading on metered connections.
- Use `src/lib/damp.ts` for frame-rate-independent damping. Do not write
  60fps-tuned magic lerps for behavior that should feel stable on 120/240Hz.
- Use `src/lib/dpr.ts` DPR caps for canvas/WebGL. Do not blindly render at
  full `devicePixelRatio`.
- Prefer the shared `rafBus` for recurring UI ticks that can share one rAF.
  Independent WebGL loops are acceptable when IO-paused and scoped.

## Security Rules

- Do not break the securityheaders.com grade A target.
- All security headers live in `next.config.mjs` `async headers()`.
- CSP is allow-list based. New external origins must be added only to the
  directives they need: `img-src`, `media-src`, `connect-src`, etc.
- New image domains must be added to both `next.config.mjs > images.remotePatterns`
  and the CSP image policy when required.
- No secrets in the repo. Runtime secrets come from environment variables.
  `NEXT_PUBLIC_*` values and the IndexNow key are public by design.
- Do not expose server-only env vars in client components.
- Verify `sameAs` and `rel="me"` identity URLs when editing JSON-LD or socials.
- Do not add inline scripts, third-party scripts, or CDN resources casually.

## SEO And GEO Rules

- Every new page needs `metadata`, canonical alternates, sitemap entry, and
  appropriate Open Graph support.
- Root title template appends `· Delowar Hossain`; do not replace it.
- JSON-LD edits must preserve the Person, Organization, WebSite, and
  ProfilePage graph.
- `alumniOf` must remain an array with the education entries from `site.ts`.
- `/llms.txt`, `/llms-full.txt`, and `/ai` are the AI-engine contract. Mirror
  major new public content there.
- `robots.ts` should continue allowing major AI crawlers and pointing to the
  sitemap.
- For meaningful deploys, use IndexNow and search-console submission steps
  described in `docs/SEO.md`.

## Dependency Rules

- Use pnpm. Do not introduce npm, yarn, or bun lockfiles.
- Prefer existing dependencies before adding new ones.
- New runtime dependencies require a clear user-visible reason, bundle impact
  awareness, and documentation in the relevant source-of-truth doc.
- Do not add a major Next/React/TypeScript upgrade in the same change as
  feature work.
- Do not add browser-only libraries to Server Components.
- Do not add animation libraries that duplicate GSAP, Framer Motion, Lenis, or
  existing CSS/rAF utilities without a strong reason.

## Forbidden Patterns

- Do not delete files unless the user explicitly asks and the deletion is
  reviewed in the diff.
- Do not use `var`; use `const` by default and `let` only for reassignment.
- Do not use `any` to silence TypeScript. Prefer correct types, `unknown`, or
  narrow helper functions.
- Do not fake passing checks by weakening lint, TypeScript, build, security, or
  test configuration.
- Do not add `console.log` outside `src/components/ui/ConsoleBanner.tsx`.
  `console.warn` and `console.error` are acceptable only in real error paths.
- Do not add per-frame `setState`, especially from scroll, pointer, rAF, or
  Lenis callbacks.
- Do not ship a canvas/WebGL/rAF loop without IO pause and cleanup.
- Do not bypass `prefers-reduced-motion`.
- Do not hard-code domains where `metadataBase`, `site.url`, `site.domain`, or
  relative URLs should be used.
- Do not add runtime API calls without offline fallback or cache strategy.
- Do not introduce dead media links. Verify external video/image sources before
  relying on them.
- Do not change `Cursor.tsx` z-index from `z-[200]` or modal layering from
  `z-[110]` without a documented design-system reason.
- Do not create broad refactors unrelated to the brief.

## Adding Common Things

- Page: create `src/app/<slug>/page.tsx`, export `metadata`, use `<PageHero>`,
  update `src/app/sitemap.ts`, add OG image if route deserves one, update
  `/llms` routes for public content.
- Nav item: update `site.nav`, `Navbar.tsx` `PRIMARY` when primary, and
  `RoutePrefetcher.tsx` `PRIMARY_ROUTES` or `SECONDARY_ROUTES`.
- Work or case study: update typed entries in `src/lib/data.ts`; keep slugs
  unique and gallery media verified.
- Lab experiment: update experiment data, add matching route/demo component,
  and ensure reduced-motion/fallback behavior.
- Keyboard shortcut: update `NavShortcuts.tsx`, `CheatSheet.tsx`, and optional
  achievement logic in `src/lib/achievements.ts`.
- Atmosphere mode: update `AtmosphereMode.tsx` mode type and matching
  `:root[data-atmosphere="..."]` block in `globals.css`.
- External origin: update `next.config.mjs` image patterns and CSP directive,
  then verify headers after deployment.
- API route: add `src/app/api/<name>/route.ts`, keep secrets server-only, set
  cache headers, and provide fallback content.

## Git And Publishing Workflow

The user's preference is to keep work integrated on the GitHub `main` branch,
but safety still comes first.

- Before changing files, inspect `git status --short --branch`.
- Never discard or overwrite user changes. If unrelated files are dirty, leave
  them alone.
- Do not delete files as part of normal work. If removal is truly needed, ask
  first and explain why.
- Commit only after the requested work is complete and the relevant checks have
  run or the reason they could not run is documented.
- If the user explicitly asks for direct main-branch publishing, commit on
  `main` and push to `origin/main` only after confirming the branch is `main`,
  reviewing the diff, and running the gate.
- If repo docs, CI, or team policy require PRs, prefer the documented PR flow:
  branch from `main`, use `devin/<unix-ts>-<topic>`, push, and open a PR.
- Never force-push to `main`. Never use `git reset --hard` unless the user
  explicitly requests it.
- Commit style: use conventional commits when practical, for example
  `docs: strengthen agent operating manual`.

## Work Style For Agents

For every meaningful change, start with the brief from `docs/BRIEF.md`:

1. What user-visible outcome are we producing?
2. What is the smallest set of files that must change?
3. How will this be verified?
4. How can it be rolled back?

Then work like a careful engineer:

- Read nearby files before editing.
- Match existing patterns before inventing abstractions.
- Keep changes scoped to the request.
- Prefer structured APIs and typed data over string hacks.
- Update docs when a new convention, route, dependency, or source of truth is
  introduced.
- Verify with commands and browser checks appropriate to the change.
- End with a concise summary of what changed, what was verified, and any
  residual risk.

And work like a creative director:

- Ask whether the change improves the site's rhythm, clarity, hierarchy,
  tactility, and identity.
- Protect the first viewport, typography scale, motion timing, and contrast.
- Keep experiments polished enough to belong in a portfolio, even when they are
  playful.
- Preserve Delowar's voice: ambitious, editorial, technically fluent, and
  personal.

## Last Rule

When unsure, read the existing code in the same folder and mirror the best
working example. This codebase is already opinionated; future work should make
those opinions clearer, faster, safer, and more expressive.
