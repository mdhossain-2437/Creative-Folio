"use client";

// Funny react-helmet-style dynamic title manager. Two modes:
//
//  1. Tab loses focus → cycle through playful "come back" phrases.
//  2. Scroll milestones on a long page → swap the title once per milestone
//     (e.g., halfway = "↓ keep falling", footer = "✓ end of the void").
//
// MMXXVII edition — phrasing is intentionally weird, soft, future-ish.

import { useEffect, useRef } from "react";

const AFK_PHRASES = [
  "◊ Come back. The shaders miss you.",
  "◊ — still compiling thought —",
  "◊ Folio MMXXVII · ⌘K to fly",
  "◊ AFK · the grid awaits",
  "◊ The cursor is lonely",
  "◊ 2027.delowarhossain.dev",
  "◊ pssst — unread chapters in the reel",
];

const SCROLL_PHRASES: { at: number; title: string; ttl: number }[] = [
  { at: 0.25, title: "◊ ↓ keep falling", ttl: 1800 },
  { at: 0.5, title: "◊ midway — breathe", ttl: 1800 },
  { at: 0.85, title: "◊ ✓ end of the void", ttl: 2200 },
];

export function TabTitleFlicker() {
  const originalRef = useRef<string>("");
  const restoreTimeout = useRef<number | undefined>(undefined);
  const lastScrollMilestone = useRef<number>(-1);

  useEffect(() => {
    originalRef.current = document.title;

    let cycleId: number | undefined;
    let phaseIdx = 0;

    const stopCycle = () => {
      if (cycleId !== undefined) {
        window.clearInterval(cycleId);
        cycleId = undefined;
      }
    };

    const startCycle = () => {
      stopCycle();
      originalRef.current = document.title;
      phaseIdx = 0;
      const tick = () => {
        const phrase = AFK_PHRASES[phaseIdx % AFK_PHRASES.length];
        document.title = phrase;
        phaseIdx += 1;
      };
      tick();
      cycleId = window.setInterval(tick, 2400);
    };

    const onVisibility = () => {
      if (document.hidden) {
        startCycle();
      } else {
        stopCycle();
        document.title = originalRef.current;
      }
    };

    // Scroll milestone dance: only on the home / long pages where the user
    // actually has scroll distance.
    const onScroll = () => {
      if (document.hidden) return;
      const scrollH =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollH <= 200) return;
      const ratio = window.scrollY / scrollH;
      const idx = SCROLL_PHRASES.findIndex(
        (p, i) =>
          ratio >= p.at &&
          (i === SCROLL_PHRASES.length - 1 || ratio < SCROLL_PHRASES[i + 1].at)
      );
      if (idx === -1 || idx === lastScrollMilestone.current) return;
      lastScrollMilestone.current = idx;
      const original = originalRef.current || document.title;
      document.title = SCROLL_PHRASES[idx].title;
      window.clearTimeout(restoreTimeout.current);
      restoreTimeout.current = window.setTimeout(() => {
        document.title = original;
      }, SCROLL_PHRASES[idx].ttl);
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
      stopCycle();
      window.clearTimeout(restoreTimeout.current);
    };
  }, []);

  return null;
}
