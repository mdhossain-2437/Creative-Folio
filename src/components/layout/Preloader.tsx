"use client";

import { useEffect, useState } from "react";

const SEEN_KEY = "delowar:preloader-seen";
// Hard ceiling — keep the cold-load theatre short enough that it does not own
// LCP on deployed Lighthouse runs.
const MAX_DURATION_MS = 650;
const EXIT_DELAY_MS = 120;

export function Preloader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(SEEN_KEY) === "1") {
      setDone(true);
      return;
    }
    // Honour reduced motion — skip the loader entirely.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      window.sessionStorage.setItem(SEEN_KEY, "1");
      setDone(true);
      return;
    }
    setActive(true);

    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const elapsed = performance.now() - start;
      // Linear time-keyed progress so the bar moves predictably even when
      // the page is doing heavy boot work and RAF is being throttled.
      const linear = Math.min(100, (elapsed / MAX_DURATION_MS) * 100);
      const ready = document.readyState === "complete";
      const next = ready ? Math.max(linear, 96) : linear;
      setPct(Math.floor(next));
      if (next < 100 && elapsed < MAX_DURATION_MS) {
        raf = requestAnimationFrame(tick);
      } else {
        setPct(100);
        window.sessionStorage.setItem(SEEN_KEY, "1");
        setTimeout(() => setDone(true), EXIT_DELAY_MS);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!active && done) return null;

  return (
    <div
      aria-hidden={done}
      className={`pointer-events-none fixed inset-0 z-[90] flex items-end justify-between bg-ink-950 px-6 pb-10 pt-12 transition-[transform,opacity] duration-500 ease-out md:px-10 ${
        done ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div>
        <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
          ◌ Folio MMXXVII
        </p>
        <p className="mt-3 font-serif text-3xl italic text-warmwhite/80">
          Loading folio
        </p>
      </div>
      <div className="flex flex-col items-end">
        <p className="display-num font-serif text-[clamp(4rem,15vw,12rem)] leading-none tracking-tightest text-warmwhite">
          {pct.toString().padStart(3, "0")}
        </p>
        <div className="mt-3 h-px w-72 max-w-[60vw] overflow-hidden bg-warmwhite/15">
          <div
            className="h-full origin-left bg-peach transition-transform duration-300"
            style={{ transform: `scaleX(${pct / 100})` }}
          />
        </div>
      </div>
    </div>
  );
}
