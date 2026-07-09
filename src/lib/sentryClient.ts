type SentryMetadataValue =
  | string
  | number
  | boolean
  | null
  | undefined;

type SentryMetadata = Record<string, SentryMetadataValue>;

const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

export function hasSentryDsn(): boolean {
  return Boolean(sentryDsn);
}

export function reportClientError(
  error: Error,
  tags: SentryMetadata,
  context: SentryMetadata,
): void {
  if (!sentryDsn) return;

  void import("@sentry/nextjs")
    .then((Sentry) => {
      Sentry.withScope((scope) => {
        for (const [key, value] of Object.entries(tags)) {
          if (value === undefined || value === null) continue;
          scope.setTag(key, String(value));
        }
        scope.setContext("webgl", context);
        Sentry.captureException(error);
      });
    })
    .catch(() => {
      // Error reporting must never break rendering or recovery paths.
    });
}
