"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/lib/site";
import { works, journal, experiments } from "@/lib/data";

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
];

export function RoutePrefetcher() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect Save-Data and slow-2g/2g connections.
    const conn = (navigator as unknown as {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g") return;

    // Primary routes — warm immediately.
    for (const r of PRIMARY_ROUTES) {
      router.prefetch(r);
    }

    // Slug pages + secondary routes, deferred so they don't compete
    // with critical resources.
    const t1 = window.setTimeout(() => {
      for (const r of SECONDARY_ROUTES) router.prefetch(r);
    }, 600);

    const t2 = window.setTimeout(() => {
      for (const w of works) router.prefetch(`/works/${w.slug}`);
      for (const j of journal) router.prefetch(`/journal/${j.slug}`);
      for (const e of experiments) router.prefetch(`/lab/${e.slug}`);
    }, 1200);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
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
