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

Supported surface: the deployed site, the `main` branch, and committed
production routes/components in this repository.

## Hardening Surface

The following protections are baked in (see `next.config.mjs`):

| Header                         | Value                                                                                                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Content-Security-Policy`      | allow-list based CSP for scripts, styles, images, media, fonts, workers, form actions, frame ancestors, Vercel analytics, Cloudflare Stream, and IndexNow |
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

### CSP Origins

Current CSP origins and why they exist:

| Directive     | Origins / tokens                                                                                                                                   | Reason                                      |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `default-src` | `'self'`                                                                                                                                           | Baseline deny-by-default policy.            |
| `script-src`  | `'self'`, `'unsafe-inline'`, `'unsafe-eval'`, `https://*.vercel-insights.com`, `https://*.vercel-analytics.com`                                    | Next.js boot/runtime plus Vercel RUM.       |
| `style-src`   | `'self'`, `'unsafe-inline'`                                                                                                                        | Next/font, Tailwind, and inline style tags. |
| `img-src`     | `'self'`, `data:`, `blob:`, `https:`                                                                                                                | Local assets, generated images, remote OG.  |
| `media-src`   | `'self'`, `blob:`, `https://customer-7l7ux9p61w0c0p3z.cloudflarestream.com`                                                                        | Local media and verified Cloudflare Stream. |
| `font-src`    | `'self'`, `data:`                                                                                                                                  | Self-hosted fonts and Next font data URLs.  |
| `connect-src` | `'self'`, `https://api.indexnow.org`, `https://*.vercel-insights.com`, `https://*.vercel-analytics.com`, `https://customer-7l7ux9p61w0c0p3z.cloudflarestream.com` | API routes, IndexNow, RUM, media manifests. |
| `worker-src`  | `'self'`, `blob:`                                                                                                                                  | Web workers and OffscreenCanvas fallbacks.  |

## Secret Management

- No secrets live in the repo. All runtime keys come from Vercel
  environment variables or are explicitly public (e.g. `NEXT_PUBLIC_*`,
  the IndexNow protocol key which is public by design).
- Rotation: any secret discovered in git history must be rotated
  immediately, even if scrubbed from history afterwards.
- This repository does not currently ship an in-repo secret-scanning workflow.
  Use GitHub secret scanning if enabled for the account/repository, and treat
  local review plus `git diff --cached` as mandatory before every commit.

Runtime env contract:

| Variable                          | Visibility | Purpose                                             |
| --------------------------------- | ---------- | --------------------------------------------------- |
| `NEXT_PUBLIC_INDEXNOW_KEY`        | Public     | Optional IndexNow key override.                     |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | Public     | Google Search Console verification meta.            |
| `NEXT_PUBLIC_BING_VERIFICATION`   | Public     | Bing Webmaster verification meta.                   |
| `NEXT_PUBLIC_YANDEX_VERIFICATION` | Public     | Yandex Webmaster verification meta.                 |
| `NEXT_PUBLIC_SENTRY_DSN`          | Public     | Optional Sentry client DSN for WebGL/shader errors. |
| `GITHUB_PAT`                      | Server     | Optional `/api/github` rate-limit lift.             |
| `RESEND_API_KEY`                  | Server     | Required for live `/api/contact` email delivery.    |
| `CONTACT_TO_EMAIL`                | Server     | Recipient mailbox for contact form inquiries.       |
| `CONTACT_FROM_EMAIL`              | Server     | Verified Resend sender address/domain.              |
| `TURNSTILE_SECRET_KEY`            | Server     | Optional Cloudflare Turnstile verification.         |

`CONTACT_ROUTE_TEST_MODE` is a Playwright-only local test flag. Do not set it
in Vercel production or preview environments.

## Supply-Chain Hygiene

- `pnpm` lockfile is committed and reviewed on every dependency bump.
- This repo currently has no committed Renovate, Dependabot, or security-audit
  workflow config. If those are enabled externally, their reports must be
  reviewed before merging dependency changes.
- New dependencies require a clear user-facing reason, `pnpm audit --prod`,
  and the full local quality gate:

```bash
pnpm audit --prod
pnpm quality
```

- Cadence: run `pnpm audit --prod` on every dependency change and at least
  monthly while the site is actively maintained.

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
