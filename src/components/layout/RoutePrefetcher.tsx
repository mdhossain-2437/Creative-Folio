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

// Route pre-warming is deliberately late and quiet-window gated. On live
// deploys, eager prefetching can compete with hydration, shader setup, image
// decode and the user's first scroll. Navigation still warms up for readers
// who linger, but it never steals the opening frame budget.

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
    let lastActivity = performance.now();
    const timers: number[] = [];
    const profile = deviceProfile();
    const primaryRoutes = PRIMARY_ROUTES.filter((route) => route !== pathname);
    const noteActivity = () => {
      lastActivity = performance.now();
    };
    const activityEvents: Array<keyof WindowEventMap> = [
      "scroll",
      "wheel",
      "pointerdown",
      "keydown",
      "touchstart",
    ];
    for (const eventName of activityEvents) {
      window.addEventListener(eventName, noteActivity, { passive: true });
    }

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
          if (performance.now() - lastActivity < 5000) {
            timers.push(window.setTimeout(run, 3000));
            return;
          }
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
      scheduleBatch(primaryRoutes, 1000, 2, 900);
      scheduleBatch(SECONDARY_ROUTES, 14000, 2, 1200);

      if (shouldPrefetchDeepRoutes(profile.tier)) {
        scheduleBatch(
          [
            ...works.map((w) => `/works/${w.slug}`),
            ...journal.map((j) => `/journal/${j.slug}`),
            ...experiments.map((e) => `/lab/${e.slug}`),
          ],
          30000,
          3,
          1500,
        );
      }
    }, 16000);

    return () => {
      cancelled = true;
      cancelIdle();
      for (const timer of timers) window.clearTimeout(timer);
      for (const eventName of activityEvents) {
        window.removeEventListener(eventName, noteActivity);
      }
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
