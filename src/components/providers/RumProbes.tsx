function isVercelDeployment(): boolean {
  return process.env.VERCEL === "1" || Boolean(process.env.VERCEL_ENV);
}

// Dynamic imports keep the analytics client chunks out of the page graph on
// non-Vercel builds, so local page-weight budgets don't pay for unmounted probes.
export async function RumProbes() {
  if (!isVercelDeployment()) return null;

  const [{ Analytics }, { SpeedInsights }] = await Promise.all([
    import("@vercel/analytics/next"),
    import("@vercel/speed-insights/next"),
  ]);

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
