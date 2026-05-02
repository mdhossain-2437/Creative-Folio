"use client";

// Tiny pill rendered on /lab/[slug] hinting at the prev/next/fullscreen
// shortcuts. Appears once per session — keeps signal-to-noise high.

import { useEffect, useState } from "react";

const KEY = "delowar:lab-hint:v1";

export function LabPlaygroundHints() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) return;
    const t = window.setTimeout(() => setShow(true), 900);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!show) return;
    const t = window.setTimeout(() => {
      setShow(false);
      try {
        window.sessionStorage.setItem(KEY, "1");
      } catch {
        /* silent */
      }
    }, 5200);
    return () => window.clearTimeout(t);
  }, [show]);

  if (!show) return null;
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full border border-warmwhite/15 bg-ink-900/85 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-warmwhite/70 shadow-2xl backdrop-blur animate-toast-in">
      <kbd className="rounded border border-warmwhite/15 bg-ink-950 px-1.5 py-0.5 text-warmwhite/80">
        J
      </kbd>
      <span className="text-warmwhite/45">next</span>
      <kbd className="rounded border border-warmwhite/15 bg-ink-950 px-1.5 py-0.5 text-warmwhite/80">
        K
      </kbd>
      <span className="text-warmwhite/45">prev</span>
      <kbd className="rounded border border-warmwhite/15 bg-ink-950 px-1.5 py-0.5 text-warmwhite/80">
        F
      </kbd>
      <span className="text-warmwhite/45">fullscreen</span>
    </div>
  );
}
