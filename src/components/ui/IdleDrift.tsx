"use client";

// IdleDrift — MMXXVII micro-feature.
//
// After ~60 s of zero input (no pointer move / keypress / scroll), tag the
// document root with `data-idle="true"`. CSS rules in globals.css then dial
// down marquee speeds, soften the cursor, and subtly breathe the hero
// headline. First input clears the flag instantly.
//
// Designed to be invisible on purpose: it's a "the studio is napping"
// signal, not a flashy effect. Users only notice if they linger.
//
// Respects `prefers-reduced-motion` — when the OS asks for less motion
// the drift effect is suppressed; only the data attribute stays so other
// components can still hook into it if they want.

import { useEffect } from "react";

const IDLE_AFTER_MS = 60_000;

export function IdleDrift() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    let timer: number | undefined;
    let idle = false;

    const setIdle = (next: boolean) => {
      if (next === idle) return;
      idle = next;
      if (next) root.dataset.idle = "true";
      else delete root.dataset.idle;
    };

    const reset = () => {
      setIdle(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setIdle(true), IDLE_AFTER_MS);
    };

    reset();
    const events: (keyof WindowEventMap)[] = [
      "pointermove",
      "pointerdown",
      "keydown",
      "wheel",
      "touchstart",
    ];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    document.addEventListener("scroll", reset, { passive: true });

    return () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, reset));
      document.removeEventListener("scroll", reset);
      delete root.dataset.idle;
    };
  }, []);

  return null;
}
