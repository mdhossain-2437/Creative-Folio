"use client";

import { useEffect, useRef } from "react";

export function ReadingProgress({ targetId = "post-body" }: { targetId?: string }) {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    let raf = 0;
    const update = () => {
      const r = target.getBoundingClientRect();
      const total = r.height + window.innerHeight * -0.6;
      const passed = Math.max(0, window.innerHeight * 0.4 - r.top);
      const p = Math.max(0, Math.min(1, passed / Math.max(1, total)));
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [targetId]);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-warmwhite/10"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-peach"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
