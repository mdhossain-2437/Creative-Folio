"use client";

// When the tab loses focus (`document.hidden`), swap the document title to a
// short come-back nudge. Restore the original on focus. Cycles through a few
// phrases so the tab list doesn't look static across multiple peeks.

import { useEffect } from "react";

const PHRASES = [
  "Come back —",
  "still here.",
  "the studio is warm.",
  "press ⌘K to fly.",
];

export function TabTitleFlicker() {
  useEffect(() => {
    let original = document.title;
    let interval: number | undefined;
    let phaseIdx = 0;

    const stop = () => {
      if (interval !== undefined) {
        window.clearInterval(interval);
        interval = undefined;
      }
    };

    const start = () => {
      stop();
      original = document.title;
      phaseIdx = 0;
      const cycle = () => {
        const phrase = PHRASES[phaseIdx % PHRASES.length];
        document.title = `◊ ${phrase}`;
        phaseIdx += 1;
      };
      cycle();
      interval = window.setInterval(cycle, 2400);
    };

    const onVisibility = () => {
      if (document.hidden) {
        start();
      } else {
        stop();
        document.title = original;
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      stop();
    };
  }, []);

  return null;
}
