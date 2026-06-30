"use client";

import dynamic from "next/dynamic";

// Each component is split into its own chunk via `next/dynamic`, with SSR
// disabled so the server HTML stays light. This bundle is itself imported by
// `LazyChrome` only after the user has had a quiet window.

const Cursor = dynamic(
  () => import("@/components/ui/Cursor").then((m) => m.Cursor),
  { ssr: false },
);

const CursorSpotlight = dynamic(
  () => import("@/components/ui/CursorSpotlight").then((m) => m.CursorSpotlight),
  { ssr: false },
);

const RoutePrefetcher = dynamic(
  () =>
    import("@/components/layout/RoutePrefetcher").then((m) => m.RoutePrefetcher),
  { ssr: false },
);

const ScrollToTop = dynamic(
  () => import("@/components/ui/ScrollToTop").then((m) => m.ScrollToTop),
  { ssr: false },
);

const ShowreelPill = dynamic(
  () => import("@/components/ui/ShowreelPill").then((m) => m.ShowreelPill),
  { ssr: false },
);

const ScrollMeter = dynamic(
  () => import("@/components/ui/ScrollMeter").then((m) => m.ScrollMeter),
  { ssr: false },
);

const GridOverlay = dynamic(
  () => import("@/components/ui/GridOverlay").then((m) => m.GridOverlay),
  { ssr: false },
);

export function LazyChromeBundle() {
  return (
    <>
      <RoutePrefetcher />
      <CursorSpotlight />
      <Cursor />
      <GridOverlay />
      <ScrollMeter />
      <ShowreelPill />
      <ScrollToTop />
    </>
  );
}
