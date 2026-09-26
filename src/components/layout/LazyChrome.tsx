"use client";

import { useEffect, useState } from "react";
import { scheduleIdleWork } from "@/lib/clientPerformance";
import type { ComponentType } from "react";

type ChromeBundle = ComponentType;

export function LazyChrome() {
  const [Chrome, setChrome] = useState<ChromeBundle | null>(null);
  const [CursorGroup, setCursorGroup] = useState<ChromeBundle | null>(null);

  // Tier 1: Instant Custom Cursor & Spotlight on desktop with fine pointer
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    let cancelled = false;
    let loaded = false;

    const loadCursor = () => {
      if (loaded || cancelled) return;
      loaded = true;
      cleanup();

      void Promise.all([
        import("@/components/ui/Cursor"),
        import("@/components/ui/CursorSpotlight"),
      ]).then(([cursorMod, spotlightMod]) => {
        if (!cancelled) {
          const CursorComponent = cursorMod.Cursor;
          const SpotlightComponent = spotlightMod.CursorSpotlight;
          setCursorGroup(() => function InstantCursorLayer() {
            return (
              <>
                <SpotlightComponent />
                <CursorComponent />
              </>
            );
          });
        }
      });
    };

    const cleanup = () => {
      window.removeEventListener("pointermove", loadCursor);
      window.removeEventListener("mousemove", loadCursor);
    };

    // Activate immediately on initial pointer movement
    window.addEventListener("pointermove", loadCursor, { passive: true, once: true });
    window.addEventListener("mousemove", loadCursor, { passive: true, once: true });

    // Fallback: activate shortly after hydration (200ms) even without movement
    const fallbackTimer = window.setTimeout(loadCursor, 200);

    return () => {
      cancelled = true;
      cleanup();
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  // Tier 2: Deferred Secondary Chrome (RoutePrefetcher, ScrollToTop, etc.)
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

  return (
    <>
      {CursorGroup ? <CursorGroup /> : null}
      {Chrome ? <Chrome /> : null}
    </>
  );
}
