"use client";

// PageDwellCounter — quiet "you've been here a while" pill that fades in
// after the visitor has spent 30s on the current page. Updates every
// second so they can watch their visit accumulate. Resets when the path
// changes. Session-only — no localStorage.
//
// Sits bottom-left, hidden when a modal is open or on touch.

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { unlock } from "@/lib/achievements";

const VISIBLE_AFTER_MS = 30_000;
const SETTLED_AFTER_MS = 180_000;

function fmt(ms: number): string {
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function PageDwellCounter() {
  const pathname = usePathname();
  const [elapsedMs, setElapsedMs] = useState(0);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;

    setElapsedMs(0);
    const start = performance.now();
    let raf = 0;
    let interval: number | undefined;

    const tick = () => {
      if (!active) return;
      const now = performance.now();
      const next = now - start;
      setElapsedMs(next);
      if (next >= SETTLED_AFTER_MS) {
        unlock("settled");
      }
    };

    if (reduce) {
      tick();
      interval = window.setInterval(tick, 1000);
    } else {
      interval = window.setInterval(tick, 1000);
      tick();
    }

    const onVis = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      if (interval !== undefined) window.clearInterval(interval);
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [pathname, active]);

  if (elapsedMs < VISIBLE_AFTER_MS) return null;

  const settled = elapsedMs >= SETTLED_AFTER_MS;

  return (
    <div
      data-floating-overlay
      aria-hidden
      className="floating-overlay pointer-events-none fixed bottom-6 left-6 z-30 hidden md:flex items-center gap-2 rounded-full border border-warmwhite/15 bg-ink-950/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-warmwhite/65 backdrop-blur"
    >
      <span aria-hidden className="display-num">◌</span>
      <span className="display-num">{fmt(elapsedMs)} here</span>
      {settled && (
        <span className="ml-1 rounded-full bg-peach/20 px-2 py-0.5 text-peach">settled</span>
      )}
    </div>
  );
}
