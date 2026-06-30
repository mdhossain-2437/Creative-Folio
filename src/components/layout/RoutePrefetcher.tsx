"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { site } from "@/lib/site";
import { works, journal, experiments } from "@/lib/data";
import { deviceProfile } from "@/lib/deviceTier";
import {
  isConstrainedConnection,
  scheduleIdleWork,
  shouldPrefetchDeepRoutes,
} from "@/lib/clientPerformance";

// Pre-warms every primary route while the preloader is on screen.
// After the preloader fades, the very first navigation has the route's
// HTML + JS already in the Next.js client cache, so the transition is
// effectively instant.
//
// Tradeoff:
//   On first paint we kick off ~14 background fetches (one per route).
//   These race with critical resources but are deprioritised by Next's
//   prefetch implementation (it uses `<link rel="prefetch">` where
//   supported and falls back to silent fetches at low priority).
//
// Strategy:
//   1. Prefetch primary nav routes immediately (critical paths users
//      most likely to visit first).
//   2. After 600ms (when LCP-class resources are settled), prefetch
//      secondary routes (slug pages, /achievements, /colophon, etc).
//   3. Skip on `prefers-reduced-data` or save-data Network Information
//      API hint to be polite to metered connections.

const PRIMARY_ROUTES = [
  "/",
  "/works",
  "/lab",
  "/journal",
  "/about",
  "/resume",
  "/contact",
  "/ai",
];

const SECONDARY_ROUTES = [
  "/now",
  "/services",
  "/achievements",
  "/colophon",
  "/colors",
  "/changelog",
  "/uses",
  "/showreel",
  "/portfolios",
];

export function RoutePrefetcher() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (document.visibilityState === "hidden") return;

    // Respect Save-Data and slow/strained connections. On live deploys this
    // keeps prefetch work from competing with hydration, image decode, and the
    // first scroll frame.
    if (isConstrainedConnection({ include3g: true })) return;

    let cancelled = false;
    const timers: number[] = [];
    const profile = deviceProfile();
    const primaryRoutes = PRIMARY_ROUTES.filter((route) => route !== pathname);

    const scheduleBatch = (
      routes: string[],
      delay: number,
      batchSize: number,
      gap: number,
    ) => {
      const timer = window.setTimeout(() => {
        if (cancelled || document.visibilityState === "hidden") return;

        let index = 0;
        const run = () => {
          if (cancelled || document.visibilityState === "hidden") return;
          for (let i = 0; i < batchSize && index < routes.length; i++) {
            router.prefetch(routes[index]);
            index++;
          }
          if (index < routes.length) {
            timers.push(window.setTimeout(run, gap));
          }
        };
        run();
      }, delay);
      timers.push(timer);
    };

    const cancelIdle = scheduleIdleWork(() => {
      if (cancelled) return;
      scheduleBatch(primaryRoutes, 700, 3, 450);
      scheduleBatch(SECONDARY_ROUTES, 6400, 2, 700);

      if (shouldPrefetchDeepRoutes(profile.tier)) {
        scheduleBatch(
          [
            ...works.map((w) => `/works/${w.slug}`),
            ...journal.map((j) => `/journal/${j.slug}`),
            ...experiments.map((e) => `/lab/${e.slug}`),
          ],
          12000,
          3,
          900,
        );
      }
    }, 4800);

    return () => {
      cancelled = true;
      cancelIdle();
      for (const timer of timers) window.clearTimeout(timer);
    };
    // We intentionally only run once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Also pre-connect to external origins we know we'll hit so the TLS
  // handshake is done before we need the resource. Rendered as a hidden
  // ssr-friendly fragment that adds <link rel="dns-prefetch"> tags.
  return (
    <>
      {/* Pre-connect / DNS-prefetch to known third-party origins. */}
      <link rel="dns-prefetch" href={`https://${site.domain}`} />
      <link rel="preconnect" href="https://api.indexnow.org" crossOrigin="" />
      <link
        rel="preconnect"
        href="https://customer-7l7ux9p61w0c0p3z.cloudflarestream.com"
        crossOrigin=""
      />
    </>
  );
}
