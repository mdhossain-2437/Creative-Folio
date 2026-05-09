# Security Policy

Maintainer: **Delowar Hossain** — `hello@delowarhossain.dev`

## Reporting a Vulnerability

If you find a security vulnerability — anything from XSS, CSRF, or
header-manipulation issues to dependency CVEs that affect this repo —
please report it privately rather than opening a public issue.

- Email: `hello@delowarhossain.dev` with the subject `[SECURITY] <topic>`.
- For sensitive disclosures, use GitHub's private vulnerability reporting
  flow: https://github.com/mdhossain-2437/Creative-Folio/security/advisories/new

You will get an acknowledgement within **72 hours**. Disclosures are
coordinated in good faith — we'll patch and credit responsibly.

## Hardening Surface

The following protections are baked in (see `next.config.mjs`):

| Header | Value |
| --- | --- |
| `Content-Security-Policy` | locked to `'self'` for default/script/style/font/img/connect/frame-ancestors with explicit allow-list for Vercel analytics + Cloudflare Stream + IndexNow API |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` (HSTS preload-eligible) |
| `X-Frame-Options` | `DENY` (no clickjacking) |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | camera/mic/geo/USB/sensors/payment all `()`-disabled |
| `Cross-Origin-Opener-Policy` | `same-origin` |
| `Cross-Origin-Resource-Policy` | `same-origin` |
| `X-XSS-Protection` | `0` (legacy filter disabled — CSP supersedes) |

Validate after deploy:

- https://securityheaders.com/?q=https%3A%2F%2Fdelowarhossain.dev → expect **A** rating.
- https://csp-evaluator.withgoogle.com → paste the CSP and review.
- https://hstspreload.org/?domain=delowarhossain.dev → submit for HSTS preload.

## Secret Management

- No secrets live in the repo. All runtime keys come from Vercel
  environment variables or are explicitly public (e.g. `NEXT_PUBLIC_*`,
  the IndexNow protocol key which is public by design).
- GitGuardian runs on every PR and every commit.
- Rotation: any secret discovered in git history must be rotated
  immediately, even if scrubbed from history afterwards.

## Supply-Chain Hygiene

- `pnpm` lockfile is committed and reviewed on every dependency bump.
- Renovate / Dependabot PRs are merged only when CI and the changelog
  show no breaking changes.
- New dependencies require a `pnpm audit --prod` clean run before merge.

## Out of Scope

- Self-XSS via DevTools console.
- Issues only reproducible on browsers below the
  [Baseline support matrix](https://web.dev/baseline) cutoff.
- Reports relying on disabling browser security features (e.g. CORS via
  extensions).
