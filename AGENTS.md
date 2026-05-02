# AGENTS.md — Operating Manual for Creative-Folio

> Read this **before** modifying anything. The full reference lives in
> [`docs/KNOWLEDGE_BASE.md`](docs/KNOWLEDGE_BASE.md). This file is the quick
> map for AI / human contributors.

## Project at a Glance

* **Repo:** `mdhossain-2437/Creative-Folio`
* **Owner:** Delowar Hossain (`delowarhossain.dev`)
* **Edition:** MMXXVII (2027)
* **Stack:** Next.js 15 · TypeScript · Tailwind · GSAP · Three.js · Lenis · Framer Motion
* **Package manager:** pnpm

## Setup

```bash
pnpm install
pnpm dev          # → http://localhost:3000
pnpm typecheck    # tsc --noEmit
pnpm lint         # next lint
pnpm build        # full production build
```

There are no pre-commit hooks. There is no test runner — visual + typecheck +
lint + build is the pre-merge gate.

## Source-of-truth Constants

| File | Owns |
| --- | --- |
| `src/lib/site.ts` | Brand strings, year, edition, booking, socials, nav |
| `src/lib/data.ts` | Works, archive, journal, reel clips, lab cards |
| `tailwind.config.ts` | Color tokens, type scale, animation utilities |
| `src/app/globals.css` | Atmosphere modes, cursor cursor styles, print sheet |

## Style Rules (must)

1. **Tokens, not hex.** `bg-ink-950`, `text-warmwhite`, `border-peach/40`.
2. **Branding via `site`.** Import from `@/lib/site` — never inline.
3. **Contrast: WCAG AA.** Body copy on dark ≥ `text-warmwhite/65`. Borders ≥
   `border-warmwhite/15`.
4. **Cursor stays on top.** `Cursor.tsx` is `z-[200]`. Modals are `z-[110]`.
5. **Reduced motion is honoured.** Wrap heavy animations in checks for
   `prefers-reduced-motion`.
6. **No `console.log`** outside `ConsoleBanner.tsx`.
7. **No new image domains** without adding to `next.config.mjs > images`.

## Adding Things

* **A page:** `src/app/<slug>/page.tsx` with an exported `metadata` and
  `<PageHero>`. Register in `site.nav` if it should appear in the navbar.
* **A nav item:** add the slug to the `PRIMARY` array in `Navbar.tsx`.
* **A keyboard shortcut:** handler in `NavShortcuts.tsx`, label in
  `CheatSheet.tsx`, optional achievement in `achievements.ts`.
* **An atmosphere mode:** new `Mode` in `AtmosphereMode.tsx` + matching
  `:root[data-atmosphere="…"]` block in `globals.css`.
* **A reel chapter:** push to `reelClips` in `data.ts` with a verified `videoSrc`.

## Don'ts

* Don't change the cursor z-index.
* Don't fake passing CI by mutating tests/lints.
* Don't add a runtime API call without an offline fallback.
* Don't introduce dead Unsplash IDs (`curl -I` to verify before committing).

## PR Etiquette

1. `pnpm typecheck && pnpm lint && pnpm build` must all pass locally.
2. Branch name: `devin/<unix-ts>-<topic>`.
3. PR template lives in `.github/PULL_REQUEST_TEMPLATE.md` (if present).
4. Include preview deploy link (Vercel) when sharing the PR.

## Repository Tour

```
src/app/                # routes (RSC by default)
src/components/layout/  # chrome (Navbar, Footer, StatusStrip, Cursor host)
src/components/sections # page sections (Hero, ShowreelTeaser, …)
src/components/ui/      # atomic widgets (ShowreelModal, AtmosphereMode, …)
src/components/webgl/   # GLSL + R3F
src/lib/                # site config + data + utilities
docs/KNOWLEDGE_BASE.md  # detailed system reference
```

## Future Roadmap (post-MMXXVII)

* Server-driven scheduling integration (`/contact`).
* Service-worker offline shell for `/now` and `/journal`.
* WebGPU fallback for `HeroShader`.
* Self-hosted media bucket (replace test-videos.co.uk samples).
* Real GitHub stats via Edge function (replace public unauth API).
