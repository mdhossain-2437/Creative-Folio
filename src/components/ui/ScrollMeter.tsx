"use client";

import { useEffect, useState } from "react";

export function ScrollMeter() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      if (total <= 0) return;
      const p = Math.min(100, Math.max(0, (h.scrollTop / total) * 100));
      setPct(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-[70] h-px">
      <div
        className="h-full origin-left bg-peach"
        style={{ transform: `scaleX(${pct / 100})` }}
      />
    </div>
  );
}
