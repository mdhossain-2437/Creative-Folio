"use client";

import { useEffect, useRef } from "react";
import { supportsNativeScrollTimeline } from "@/lib/nativeScrollAnimation";

export function ScrollMeter() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (supportsNativeScrollTimeline()) {
      if (barRef.current) barRef.current.style.transform = "";
      return;
    }

    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      if (total <= 0) return;
      const p = Math.min(100, Math.max(0, (h.scrollTop / total) * 100));
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${p / 100})`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-[70] h-px">
      <div
        ref={barRef}
        className="scroll-progress-native h-full origin-left bg-peach"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
