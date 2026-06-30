"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { scheduleIdleWork } from "@/lib/clientPerformance";

// LazyChrome — defers the load of every chrome component that is purely
// decorative and doesn't need to be present on the very first paint.
//
// Why this is safe:
//   • Cursor / CursorSpotlight: replace the native cursor, but until they
//     mount the browser's native cursor is fully functional. No layout
//     shift.
//   • ScrollToTop: button that only appears after the user has scrolled
//     a few screens — never visible on first paint.
//   • RoutePrefetcher: only schedules prefetch work; safe to start late.
//   • ShowreelPill: bottom-left "Reel · 02:17" indicator. Loads after
//     hydration so the LCP path stays uncluttered.
//
// Each component is split into its own chunk via `next/dynamic`, with
// SSR explicitly disabled so the server HTML stays light. Setting
// `ssr: false` from inside a client component is the only legal way
// to do it on Next 16 (it's a hard error inside RSC).

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

export function LazyChrome() {
  const [ready, setReady] = useState(false);

  useEffect(() => scheduleIdleWork(() => setReady(true), 4200), []);

  if (!ready) return null;

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
