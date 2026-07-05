# Working Brief — Delowar Hossain Creative-Folio

> Companion: [`KNOWLEDGE_BASE.md`](./KNOWLEDGE_BASE.md), [`AGENTS.md`](../AGENTS.md).

This file documents **how work happens** on this codebase — the brief
format, working style, naming conventions, and the rituals that keep the
site shippable. It's the on-boarding doc for any future contributor
(human or AI), so when 2028 brings new tech / new requirements, you can
pick up without re-deriving how to operate.

---

## 1. The Brief Format

Every meaningful change begins with a brief. A brief answers four
questions in this order:

1. **What's the user-visible outcome?** ("Scroll feels smooth on a Pixel
   4a", not "refactor SmoothScrollProvider").
2. **What's the smallest set of files that need to change?** Not the
   refactor we'd love to do — the minimum.
3. **What's the verification?** What does success look like? (CI green,
   curl returns header, Lighthouse score, manual check on `/works/aura-void`.)
4. **What's the rollback?** If this breaks production, can we revert
   with `git revert <sha>` and be safe? If not, why not?

### Example brief

```
What:    Make the scroll feel native on mid-range mobile.
Why:     User reported "scroll atke jacce" — visible stutter mid-page.
Files:   SmoothScrollProvider.tsx, KineticHeadline.tsx, ShowreelTeaser.tsx,
         globals.css (.kinetic), 4 canvas components (IO pause).
Test:    Open /works on a 4× CPU-throttled DevTools session, scroll for
         5 seconds, watch frame chart for long tasks > 16ms.
Rollback: git revert this PR; behaviour returns to per-frame setState.
          No data migrations, no env changes.
```

The brief is sometimes the PR description, sometimes a paragraph in
chat. Either way, write it before opening any file.

---

## 2. Working Style

### Move in PRs, never in commits

Every shippable unit is a PR. Branch name: `devin/<unix-ts>-<topic>`.
PR title: lowercase imperative `feat(scope): summary`. PR description
follows the template in `.github/PULL_REQUEST_TEMPLATE.md` — Summary +
Review checklist + Notes.

Do not push directly to `main`. Do not merge a PR until CI is green
(except documented flaky checks like the `Agent` autofind bot, which
fails on every PR and is non-blocking).

### Small PRs, frequent merges

A PR should be reviewable in 15 minutes. If it's bigger, it's two PRs.
The MMXXVII rebuild was 38 PRs over a few months — that's the cadence.

### Branch from `main`, rebase before merging

Every branch starts from latest `main`. If `main` moves while you're
working, `git fetch origin main && git rebase origin/main`. This keeps
the history linear and `git bisect`-friendly.

### Never amend, never force-push to shared branches

Amending commits and force-pushing breaks reviewers and breaks Devin
Review's "previous comments" links. Push new commits.
`git push --force-with-lease` is acceptable on your own feature branch
after a rebase, never on `main`.

### Lint and typecheck before pushing

The pre-merge gate is:

```bash
pnpm typecheck && pnpm lint && pnpm build
```

If any of those fail locally, do not push. CI runs the same trio and
will reject the PR.

---

## 3. Naming Conventions

### Files

- React components: `PascalCase.tsx`. One default-or-named component per
  file. File name matches the component name.
- Utilities: `kebab-case.ts` if multi-word, `camelCase.ts` for single
  responsibility.
- Routes: lowercase folder name = URL slug. `page.tsx` for page,
  `route.ts` for handler, `layout.tsx` for layouts, `*-image.tsx` for
  edge-rendered OG/Twitter images.
- Tests: there are no tests. Visual + typecheck + lint + build is the
  pre-merge gate.

### Components

- `Layout/` — chrome that lives outside the route content (Navbar,
  Footer, StatusStrip, Cursor host, Preloader, RoutePrefetcher).
- `Sections/` — page-section blocks composed inside route pages
  (Hero, ShowreelTeaser, MilestonesScroll).
- `Ui/` — atomic widgets (Magnetic, ScrambleText, ShowreelModal).
- `Webgl/` — `<canvas>` components with WebGL/GLSL.
- `Seo/` — JSON-LD generators.
- `Providers/` — client-side context providers (SmoothScrollProvider).

### Identifiers

- React component prop: `camelCase`.
- CSS custom prop: `--kebab-case`.
- Tailwind class token: only the canonical names (`ink-950`, `peach`,
  `warmwhite`, `electric`).
- Data key: `camelCase` — except when it represents a URL slug, in which
  case `kebab-case`.

### Branches

`devin/<unix-ts>-<topic>`. Topic is 2–4 lowercase words separated by
dashes (`identity-security`, `performance`, `knowledge-base`).

### Commits

Conventional commits when reasonable: `feat:`, `fix:`, `chore:`, `docs:`,
`perf:`, `refactor:`. Subject line ≤ 72 chars. Body explains the *why*
in prose, not just bullet points.

---

## 4. Engineering Principles (in this codebase)

These are not abstract rules — they are decisions already baked in. Don't
re-litigate them inside a PR; if you disagree, raise it as a separate
discussion.

1. **Static-first.** The site is SSG with edge route handlers. Adding a
   server runtime requires a real reason.
2. **Tokens, not values.** Colours / spacing / type / shadows go through
   Tailwind tokens or CSS custom properties. No inline hex outside
   `tailwind.config.ts`.
3. **One source of truth per concept.** Identity in `site.ts`. Content
   in `data.ts`. No duplication.
4. **Reduced motion is a contract.** Honour `prefers-reduced-motion` on
   every motion path.
5. **Cursor on top of everything.** `Cursor.tsx` is `z-[200]`. Modals
   are `z-[110]`. Don't change this.
6. **No console output.** `console.log` lives only in `ConsoleBanner.tsx`
   (which intentionally writes a banner to DevTools on first load).
   `console.warn` / `console.error` are acceptable in error paths.
7. **Pause off-screen.** Every animated `<canvas>` pauses via
   IntersectionObserver. Every rAF loop checks visibility.
8. **Save-Data is sacred.** If `navigator.connection.saveData` is true,
   skip prefetches, lazy-load harder, drop quality. Don't punish metered
   users.
9. **Security headers are non-negotiable.** Don't ship a PR that breaks
   securityheaders.com grade A. Don't ship a PR that adds an inline
   script without a CSP allow-list.
10. **JSON-LD is identity.** Don't break the cross-referenced Person /
    Organization / WebSite / ProfilePage graph. Always validate on
    https://validator.schema.org after editing `JsonLd.tsx`.

---

## 5. Adding 2028+ Tech Without a Refactor

When a new framework / library / tool / platform feature ships, follow
this protocol so the new thing slots in cleanly:

### Decision tree

1. **Is it solving a real user-visible problem?** If no, defer.
2. **Can it be added behind a feature flag?** Prefer yes — wire it
   through an env var or a `data-experiment` attribute.
3. **Does it require a dependency bump?** If it bumps Next or React
   majors, that's a separate dedicated PR. Don't combine major version
   bumps with feature work.
4. **Does it touch security headers, CSP, or the JSON-LD graph?** If yes,
   review with `securityheaders.com` and `validator.schema.org` before
   merging.
5. **Does it run client-side animation?** Audit against
   [`PERFORMANCE.md`](./PERFORMANCE.md) §2 (IO pause), §1 (no scroll
   re-renders), §6 (reduced motion).

### Onboarding pattern

```
1. Add the dependency:           pnpm add <pkg>@<exact-version>
2. Pin in `package.json`:        no `^` ranges for runtime deps
3. Constants → `site.ts`:        any IDs, names, URLs
4. Content → `data.ts`:          any prose, copy, structured content
5. Tokens → `tailwind.config`:   any new colours, spacing, animation
6. Component → matching folder:  PascalCase, "use client" if needed
7. Wire through provider:        if it needs context, add to /providers
8. Lazy-load if heavy:           next/dynamic ssr:false + loading fallback
9. Test the trio:                pnpm typecheck && pnpm lint && pnpm build
10. Document in KNOWLEDGE_BASE:  one row in the Future-Stack Features table
```

### "Future tech, no refactor" examples

| Hypothetical 2028+ feature | How to slot it in |
| --- | --- |
| **View Transitions API** | Wrap `RouteCurtain` with `document.startViewTransition()` when `'startViewTransition' in document`. Falls back to current curtain. |
| **WebGPU compute particles** | Build on the existing WebGPU render selector; keep Canvas2D as the browser fallback. |
| **CSS `@container queries` + style queries** | Add new container queries inside existing rule blocks; safe because of progressive enhancement. |
| **New AI crawler** | Add the user-agent to the `Allow: /` block in `src/app/robots.ts`. One-line change. |
| **New design token / colour** | Add to `tailwind.config.ts > theme.extend.colors`. Reference via `bg-<token>`. |
| **New page** | `src/app/<slug>/page.tsx` + `metadata` + `<PageHero>` + `site.nav` entry + sitemap. |
| **New external API** | Edge route handler in `src/app/api/<name>/route.ts`. Server-only key in env. CSP `connect-src` allow-list. Fallback to baked snapshot in `data.ts`. |
| **Per-region content** | `next-intl` or built-in `app/[lang]/` segment. `hreflang` alternates already wired in `metadata.alternates.languages`. |

---

## 6. Daily Rituals

### Before starting

- `git checkout main && git pull --ff-only`
- `pnpm install` (catches new lockfile changes)
- Read the most recent merged PR's notes — context for what shipped
  yesterday.

### While working

- One PR's worth of change in flight at a time.
- Commit frequently with small, focused messages.
- Run `pnpm typecheck` between major chunks (catches breaking changes
  before lint sees them).

### Before pushing

- `pnpm typecheck && pnpm lint && pnpm build` — all three must be green.
- `git diff --merge-base origin/main` — re-read your own diff.
  Anything that doesn't belong to this PR's brief comes out.

### Before merging

- CI is green (except the documented flaky `Agent` check).
- Vercel preview URL exists and the affected pages render correctly.
- If JSON-LD changed: validate on https://validator.schema.org.
- If headers changed: validate on https://securityheaders.com (after
  preview deploys).
- If identity strings changed: confirm `<title>`, OG card, JSON-LD all
  agree.

### After merging

- Delete the feature branch (origin auto-cleans, local with
  `git branch -d`).
- Update `KNOWLEDGE_BASE.md` if the PR introduced a new pattern,
  feature, or convention.

---

## 7. When Things Go Wrong

### CI fails

1. Read the failed job logs end-to-end before guessing.
2. If lint fails: fix the lint, don't disable the rule.
3. If typecheck fails: never use `as any` — find the correct type.
4. If build fails: it's almost always a server-component / client-component
   boundary issue or a missing `"use client"` directive.

### Preview deploy looks broken

1. Open the preview URL in incognito (rules out cache).
2. Open DevTools console — first error is usually the cause.
3. Compare against the previous preview deploy on the merged main.
4. If it's a CSS issue, check `globals.css` ordering — late rules win.

### Production looks broken

1. Don't panic. Don't force-push.
2. `git revert <merge-sha>` and push. Vercel rolls back automatically.
3. Investigate after rollback, on a fresh branch.

### A user reports a bug

1. Reproduce locally first.
2. Write a brief (see §1).
3. Add a regression note to `docs/KNOWLEDGE_BASE.md > §15 Don't` if the
   bug came from a forbidden pattern.

---

## 8. The Voice

The site has a voice. Maintain it.

- **Lowercase tone in interface copy.** "Selected works", not "Selected
  Works". Headlines may capitalise.
- **Bilingual fluency.** Bangla and English sit side by side in user
  feedback. Don't strip Bangla messages — they're how the principal
  communicates.
- **Editorial typography.** Newsreader italic for accents. JetBrains
  Mono for system labels. Inter for body.
- **Short and direct.** "Available Q2 '27" is better than "I am
  currently accepting new project enquiries for Q2 of 2027".
- **No corporate fillers.** No "We are excited to announce". No
  "passionate about delivering value". The site is one person's voice.

---

## 9. Source-of-Truth Hierarchy

When two places disagree, this is the precedence:

1. `src/lib/site.ts` — wins for identity, branding, navigation.
2. `src/lib/data.ts` — wins for content.
3. `next.config.mjs` — wins for security headers, image domains, redirects.
4. `tailwind.config.ts` — wins for design tokens.
5. `src/app/globals.css` — wins for atmosphere modes, print sheet,
   special CSS.
6. Any individual component — last to be trusted, first to be edited.

If you find a value duplicated across two of these, the one higher in
the list is canonical. Move the duplicate to a reference and import it.

---

## 10. The Last Rule

When in doubt: read the existing code in the same folder. The codebase
is internally consistent. Pick a working example, mirror its structure,
keep it small. Then ship.
