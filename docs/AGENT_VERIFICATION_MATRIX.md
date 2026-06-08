# Agent Verification Matrix - Creative-Folio

Use this matrix to choose verification honestly. Not every change needs every
command, but every final response must say what actually ran.

## Baseline

For meaningful code changes:

```bash
pnpm typecheck && pnpm lint && pnpm build
```

For docs-only changes:

```bash
git diff --check
```

If dependencies are missing, run `pnpm install` only when the user approves or
when the task requires full verification.

## Change Type Matrix

| Change type | Required checks | Extra checks |
| --- | --- | --- |
| Docs only | `git diff --check` | Link/path sanity by reading changed docs |
| TypeScript utility | `pnpm typecheck`, `pnpm lint` | `pnpm build` if imported by app routes |
| React UI component | `pnpm typecheck`, `pnpm lint`, `pnpm build` | Browser check desktop/mobile affected routes |
| New page | `pnpm typecheck`, `pnpm lint`, `pnpm build` | Metadata, sitemap, canonical, OG image, mobile layout |
| Navigation route | `pnpm typecheck`, `pnpm lint`, `pnpm build` | `site.nav`, `Navbar.tsx`, `RoutePrefetcher.tsx`, sitemap |
| WebGL/canvas/rAF | `pnpm typecheck`, `pnpm lint`, `pnpm build` | Reduced motion, IO pause, resize, DPR cap, no blank canvas |
| Scroll/motion | `pnpm typecheck`, `pnpm lint`, `pnpm build` | No scroll setState, reduced motion, slow-device visual pass |
| API route | `pnpm typecheck`, `pnpm lint`, `pnpm build` | Cache headers, fallback behavior, no client secret exposure |
| SEO/JSON-LD | `pnpm typecheck`, `pnpm lint`, `pnpm build` | schema.org validation, sitemap check, llms route check |
| Security/CSP | `pnpm typecheck`, `pnpm lint`, `pnpm build` | securityheaders.com, CSP Evaluator after preview deploy |
| Dependency change | `pnpm install`, `pnpm typecheck`, `pnpm lint`, `pnpm build` | Bundle impact and lockfile review |
| Public media/origin | `pnpm build` | Verify URL returns success, update CSP/image/media config |

## Browser Verification

Use browser verification for visual and interactive changes. Check:

- Affected route loads without console errors.
- Desktop and mobile layouts do not overlap.
- Hover, focus, keyboard, and reduced-motion behavior are sane.
- Canvas/WebGL output is visible when expected and absent/fallback when reduced
  motion applies.
- Navigation and route transitions still work.

## SEO Verification

For page or identity changes:

- Inspect the page's exported `metadata`.
- Check `src/app/sitemap.ts`.
- Check any relevant `opengraph-image.tsx`.
- Check `/llms.txt` and `/llms-full.txt` route sources when public content
  changes.
- Validate JSON-LD with <https://validator.schema.org> when rendered output is
  available.

## Security Verification

For headers, CSP, external origins, or API changes:

- Read `next.config.mjs`.
- Confirm the least-permissive CSP directive was changed.
- Confirm no secret appears in code or public env usage.
- Confirm API cache headers and fallback behavior.
- Validate deployed headers with securityheaders.com when a preview exists.

## Final Report Template

Use this shape:

```text
Changed: <files and outcome>
Verified: <commands/checks that passed>
Skipped: <checks not run and why>
Risk: <remaining risk, or "low">
```

Never include checks that were not actually performed.
