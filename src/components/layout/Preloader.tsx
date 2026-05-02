"use client";

import { useEffect, useState } from "react";

const SEEN_KEY = "delowar:preloader-seen";

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
    setActive(true);
    let raf = 0;
    let p = 0;
    const tick = () => {
      p = Math.min(100, p + Math.random() * 7 + 1.4);
      setPct(Math.floor(p));
      if (p < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        window.sessionStorage.setItem(SEEN_KEY, "1");
        setTimeout(() => setDone(true), 380);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!active && done) return null;

  return (
    <div
      aria-hidden={done}
      className={`pointer-events-none fixed inset-0 z-[90] flex items-end justify-between bg-ink-950 px-6 pb-10 pt-12 transition-[transform,opacity] duration-1000 ease-out md:px-10 ${
        done ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div>
        <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
          Loading · Delowar.dev
        </p>
        <p className="mt-3 font-serif text-3xl italic text-warmwhite/80">
          Calibrating shaders &amp; type
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
