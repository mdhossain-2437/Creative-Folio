"use client";

import { useEffect, useState } from "react";
import { scheduleIdleWork } from "@/lib/clientPerformance";
import type { ComponentType } from "react";

type ChromeBundle = ComponentType;

// LazyChrome — a tiny shell that waits for a quiet user window before importing
// the decorative chrome bundle. Keep the dynamic component definitions out of
// this file; module-level `next/dynamic` calls are still preload-discovered.
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
export function LazyChrome() {
  const [Chrome, setChrome] = useState<ChromeBundle | null>(null);

  useEffect(() => {
    let cancelled = false;
    let loading = false;
    let lastActivity = performance.now();
    let timer: number | undefined;

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

    function scheduleRetry(delay: number) {
      timer = window.setTimeout(runWhenQuiet, delay);
    }

    function loadChromeBundle() {
      if (loading) return;
      loading = true;
      void import("@/components/layout/LazyChromeBundle")
        .then((module) => {
          if (!cancelled) setChrome(() => module.LazyChromeBundle);
        })
        .catch(() => {
          loading = false;
          if (!cancelled) scheduleRetry(5000);
        });
    }

    function runWhenQuiet() {
      if (cancelled) return;
      if (document.visibilityState === "hidden") {
        scheduleRetry(3000);
        return;
      }

      const quietFor = performance.now() - lastActivity;
      if (quietFor < 7000) {
        scheduleRetry(Math.min(5000, 7000 - quietFor + 750));
        return;
      }

      loadChromeBundle();
    }

    for (const eventName of activityEvents) {
      window.addEventListener(eventName, noteActivity, { passive: true });
    }

    const cancelIdle = scheduleIdleWork(runWhenQuiet, 12000);

    return () => {
      cancelled = true;
      cancelIdle();
      if (timer !== undefined) window.clearTimeout(timer);
      for (const eventName of activityEvents) {
        window.removeEventListener(eventName, noteActivity);
      }
    };
  }, []);

  return Chrome ? <Chrome /> : null;
}
