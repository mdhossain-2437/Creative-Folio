# Real User Monitoring

The site uses Vercel Web Analytics and Speed Insights for production real-user
monitoring. The probes are mounted from `src/app/layout.tsx` through
`src/components/providers/RumProbes.tsx` so every public route emits pageview
and Core Web Vitals telemetry after a Vercel deployment.

## Runtime Components

- `@vercel/analytics/next` injects the Web Analytics script.
- `@vercel/speed-insights/next` injects the Speed Insights script.
- `RumProbes` only renders when `VERCEL=1` or `VERCEL_ENV` is present, and it
  imports both packages dynamically so non-Vercel builds ship zero analytics
  bytes in shared client chunks (the homepage page-weight budget stays intact).
- Local `next start` does not mount the probes because Vercel's local
  `/_vercel/...` script endpoints are unavailable outside a deployment.
- CSP already permits the local `/_vercel/...` scripts through `'self'` and
  keeps Vercel analytics origins in `script-src` and `connect-src`.

## Dashboard Validation

After the production deploy is ready:

1. Open the Vercel project dashboard.
2. Confirm Web Analytics is enabled for the project.
3. Confirm Speed Insights is enabled for the project.
4. Visit `/`, `/works`, `/lab`, `/lab/particle-systems`, `/contact`, and
   `/resume` on the production domain.
5. In DevTools Network, verify these requests are present:
   - `/_vercel/insights/script.js`
   - `/_vercel/speed-insights/script.js`
6. In Web Analytics, confirm pageviews appear for the visited routes.
7. In Speed Insights, confirm real-user CWV samples start appearing once
   enough traffic is collected.

Expected dashboards:

- Web Analytics: route-level pageviews, referrers, countries, devices.
- Speed Insights: LCP, INP, CLS, FCP, and TTFB grouped by route.

## Operational Notes

- Treat Speed Insights as the live-site source of truth for the user's
  deployment-only lag reports. Local Lighthouse and Playwright stay synthetic.
- If live animation feels heavier than local, compare Speed Insights route data
  against `/lab/particle-systems`, `/works`, and `/showreel` first.
- Do not add custom analytics events until a specific product question exists.
  Pageviews and CWV are enough for this RUM milestone.
- If a privacy blocker blocks the probes, the site must keep rendering normally.
