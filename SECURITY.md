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

| Header                         | Value                                                                                                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Content-Security-Policy`      | locked to `'self'` for default/script/style/font/img/connect/frame-ancestors with explicit allow-list for Vercel analytics + Cloudflare Stream + IndexNow API |
| `Strict-Transport-Security`    | `max-age=63072000; includeSubDomains; preload` (HSTS preload-eligible)                                                                                        |
| `X-Frame-Options`              | `DENY` (no clickjacking)                                                                                                                                      |
| `X-Content-Type-Options`       | `nosniff`                                                                                                                                                     |
| `Referrer-Policy`              | `strict-origin-when-cross-origin`                                                                                                                             |
| `Permissions-Policy`           | camera/mic/geo/USB/sensors/payment all `()`-disabled                                                                                                          |
| `Cross-Origin-Opener-Policy`   | `same-origin`                                                                                                                                                 |
| `Cross-Origin-Resource-Policy` | `same-origin`                                                                                                                                                 |
| `X-XSS-Protection`             | `0` (legacy filter disabled — CSP supersedes)                                                                                                                 |

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

## Form Security

The contact form implements multiple security layers:

- **Server validation**: `/api/contact` validates JSON shape, email, URL,
  selected service values, budget values, and message length before delivery.
- **Payload cap**: Requests over 8 KiB are rejected before parsing.
- **Origin check**: Browser submissions must come from the deployed site origin
  or the active local development origin.
- **Honeypot field**: The hidden `website` field silently accepts bot-like
  submissions without sending email.
- **Best-effort rate limit**: Maximum 3 accepted submissions per hour per IP in
  an in-memory bucket. This is intentionally best-effort on serverless runtimes.
- **Email delivery**: Resend sends only when `RESEND_API_KEY`,
  `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` are configured server-side.
- **Optional Turnstile**: `TURNSTILE_SECRET_KEY` enables Cloudflare Turnstile
  verification before email delivery.
- **Error handling**: Client responses stay generic and avoid exposing secrets,
  provider errors, or stack traces.

## Error Tracking & Monitoring

- WebGL errors are tracked with structured logging including renderer info,
  route, renderer signal, and device tier
- Error logs are kept in memory (max 50 entries) for debugging
- Context loss events are monitored for WebGL components
- When `NEXT_PUBLIC_SENTRY_DSN` is configured, WebGL compile/link/context-loss
  failures are sent to Sentry. Without the DSN, reporting is a no-op.

## Out of Scope

- Self-XSS via DevTools console.
- Issues only reproducible on browsers below the
  [Baseline support matrix](https://web.dev/baseline) cutoff.
- Reports relying on disabling browser security features (e.g. CORS via
  extensions).
