"use client";

import { ReactNode, useEffect, useRef } from "react";
import { damp, clampDt, K } from "@/lib/damp";

export function Magnetic({
  children,
  strength = 26,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let raf = 0;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let last = performance.now();

    const tick = () => {
      const now = performance.now();
      const dt = clampDt((now - last) / 1000);
      last = now;
      x = damp(x, tx, K.K_FAST, dt);
      y = damp(y, ty, K.K_FAST, dt);
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;

      // Idle sleep gating: stop loop when at rest
      if (tx === 0 && ty === 0 && Math.abs(x) < 0.05 && Math.abs(y) < 0.05) {
        el.style.transform = "translate3d(0, 0, 0)";
        x = 0;
        y = 0;
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      tx = Math.max(-1.4, Math.min(1.4, dx)) * strength;
      ty = Math.max(-1.4, Math.min(1.4, dy)) * strength;
      startLoop();
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
      startLoop();
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.style.transform = "";
    };
  }, [strength]);
  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
