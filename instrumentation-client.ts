const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (sentryDsn) {
  void import("@sentry/nextjs").then((Sentry) => {
    Sentry.init({
      dsn: sentryDsn,
      environment:
        process.env.NEXT_PUBLIC_VERCEL_ENV ??
        process.env.VERCEL_ENV ??
        process.env.NODE_ENV,
      tracesSampleRate: 0.05,
      replaysSessionSampleRate: 0,
      replaysOnErrorSampleRate: 0,
    });
  });
}

export function onRouterTransitionStart(
  href: string,
  navigationType: string,
) {
  if (!sentryDsn) return;

  void import("@sentry/nextjs").then((Sentry) => {
    Sentry.captureRouterTransitionStart(href, navigationType);
  });
}
