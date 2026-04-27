"use client";

import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";

type ScrollContextValue = {
  velocity: number;
  scroll: number;
  progress: number;
};

const ScrollContext = createContext<ScrollContextValue>({
  velocity: 0,
  scroll: 0,
  progress: 0,
});

export function useScrollState() {
  return useContext(ScrollContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ScrollContextValue>({ velocity: 0, scroll: 0, progress: 0 });
  const last = useRef({ vy: 0, raf: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      const onScroll = () => {
        const max = (document.documentElement.scrollHeight - window.innerHeight) || 1;
        setState({ velocity: 0, scroll: window.scrollY, progress: window.scrollY / max });
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      gestureOrientation: "vertical",
      touchMultiplier: 1.4,
    });

    lenis.on("scroll", ({ velocity, scroll, limit }: { velocity: number; scroll: number; limit: number }) => {
      const v = Math.max(-6, Math.min(6, velocity / 28));
      last.current.vy = last.current.vy * 0.7 + v * 0.3;
      const progress = limit > 0 ? scroll / limit : 0;
      setState({ velocity: last.current.vy, scroll, progress });
      if (typeof document !== "undefined") {
        document.documentElement.style.setProperty("--scroll-vy", String(last.current.vy.toFixed(3)));
      }
    });

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    last.current.raf = raf;

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <ScrollContext.Provider value={state}>{children}</ScrollContext.Provider>;
}
