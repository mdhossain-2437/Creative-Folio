"use client";

import { useEffect, useRef, useState } from "react";
import { scheduleIdleWork } from "@/lib/clientPerformance";
import type { ComponentType } from "react";

type OverlayBundle = ComponentType;
type ReplayEvent =
  | "delowar:open-command-palette"
  | "delowar:open-cheat-sheet"
  | "delowar:open-showreel";

type OverlayReplayWindow = Window & {
  __delowarPendingOverlayReplay?: ReplayEvent;
};

function isEditableTarget(target: EventTarget | null): boolean {
  const node = target instanceof HTMLElement ? target : document.activeElement;
  const tag = (node?.tagName || "").toLowerCase();
  return (
    ["input", "textarea", "select"].includes(tag) ||
    Boolean((node as HTMLElement | null)?.isContentEditable)
  );
}

export function ClientOverlays() {
  const [OverlayBundle, setOverlayBundle] = useState<OverlayBundle | null>(null);
  const replayRef = useRef<ReplayEvent | null>(null);

  useEffect(() => {
    if (!OverlayBundle || !replayRef.current) return;
    const eventName = replayRef.current;
    replayRef.current = null;
    const timers = [0, 120, 360, 800, 1500, 2400].map((delay) =>
      window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent(eventName));
      }, delay),
    );
    return () => {
      for (const timer of timers) window.clearTimeout(timer);
    };
  }, [OverlayBundle]);

  useEffect(() => {
    if (OverlayBundle) return;

    let cancelled = false;
    let loading = false;
    let lastActivity = performance.now();
    let timer: number | undefined;

    const noteActivity = () => {
      lastActivity = performance.now();
    };

    const scheduleRetry = (delay: number) => {
      timer = window.setTimeout(runWhenQuiet, delay);
    };

    const loadBundle = (replay?: ReplayEvent) => {
      if (replay) {
        replayRef.current = replay;
        (window as OverlayReplayWindow).__delowarPendingOverlayReplay = replay;
      }
      if (loading || OverlayBundle) return;
      loading = true;
      void import("@/components/layout/ClientOverlaysBundle")
        .then((module) => {
          if (!cancelled) setOverlayBundle(() => module.ClientOverlaysBundle);
        })
        .catch(() => {
          loading = false;
          if (!cancelled) scheduleRetry(5000);
        });
    };

    function runWhenQuiet() {
      if (cancelled || OverlayBundle) return;
      if (document.visibilityState === "hidden") {
        scheduleRetry(5000);
        return;
      }

      const quietFor = performance.now() - lastActivity;
      if (quietFor < 9000) {
        scheduleRetry(Math.min(6000, 9000 - quietFor + 1000));
        return;
      }

      loadBundle();
    }

    const onKey = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return;

      const key = event.key.toLowerCase();
      if (key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        loadBundle("delowar:open-command-palette");
        return;
      }
      if (key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        loadBundle("delowar:open-command-palette");
        return;
      }
      if (event.key === "?" && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        loadBundle("delowar:open-cheat-sheet");
        return;
      }

      noteActivity();
      loadBundle();
    };

    const onShowreel = () => {
      loadBundle("delowar:open-showreel");
    };

    const activityEvents: Array<keyof WindowEventMap> = [
      "scroll",
      "wheel",
      "pointerdown",
      "touchstart",
    ];
    for (const eventName of activityEvents) {
      window.addEventListener(eventName, noteActivity, { passive: true });
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("delowar:open-showreel", onShowreel);

    const cancelIdle = scheduleIdleWork(runWhenQuiet, 16000);

    return () => {
      cancelled = true;
      cancelIdle();
      if (timer !== undefined) window.clearTimeout(timer);
      for (const eventName of activityEvents) {
        window.removeEventListener(eventName, noteActivity);
      }
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("delowar:open-showreel", onShowreel);
    };
  }, [OverlayBundle]);

  return OverlayBundle ? <OverlayBundle /> : null;
}
