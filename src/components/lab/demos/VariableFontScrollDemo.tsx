"use client";

import { useEffect, useRef } from "react";
import { clampDt, damp, K } from "@/lib/damp";
import type { LabDemoModuleProps } from "@/components/lab/runtime/CanvasDemo";

// ── DOM-based: Variable Font (variable-font-scroll) ─────────────────────────
export default function VariableFontDemo({ compact }: LabDemoModuleProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const wrap = wrapRef.current;
    const text = textRef.current;
    if (!wrap || !text) return;
    let lastX = 0;
    let lastY = 0;
    let weight = 500;
    let slant = 0;
    let stretch = 100;
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const dx = x - lastX;
      const dy = y - lastY;
      lastX = x;
      lastY = y;
      const v = Math.min(40, Math.sqrt(dx * dx + dy * dy));
      weight = 300 + v * 20;
      slant = Math.max(-12, Math.min(0, -dx * 0.4));
      stretch = 75 + v * 1.4;
    };
    wrap.addEventListener("pointermove", onMove);
    let raf = 0;
    let last = performance.now();
    const tick = () => {
      const now = performance.now();
      const dt = clampDt((now - last) / 1000);
      last = now;
      // Frame-rate-independent decay back to neutral when the pointer
      // stops moving — same feel on 60/120/240Hz panels.
      weight = damp(weight, 450, K.K_HERO, dt);
      slant = damp(slant, 0, K.K_GENTLE, dt);
      stretch = damp(stretch, 90, K.K_HERO, dt);
      text.style.fontWeight = String(Math.max(200, Math.min(900, weight)));
      text.style.fontStretch = `${Math.max(70, Math.min(140, stretch))}%`;
      text.style.fontStyle = slant < -2 ? "italic" : "normal";
      text.style.transform = `skewX(${slant * 0.4}deg)`;
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              if (entry?.isIntersecting) start();
              else stop();
            },
            { rootMargin: "200px" },
          )
        : null;
    if (io) io.observe(wrap);
    else start();
    return () => {
      stop();
      io?.disconnect();
      wrap.removeEventListener("pointermove", onMove);
    };
  }, []);
  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 flex items-center justify-center bg-ink-950"
    >
      <div
        ref={textRef}
        className={`font-serif leading-none tracking-tightest text-warmwhite/85 will-change-transform ${
          compact
            ? "text-[clamp(2.4rem,9vw,5rem)]"
            : "text-[clamp(6rem,18vw,18rem)]"
        }`}
        style={{ fontVariationSettings: "'wght' 600, 'slnt' 0" }}
      >
        MOTION
      </div>
      {!compact && (
        <div className="pointer-events-none absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-widest text-warmwhite/65">
          Drag the mouse — type reacts to velocity
        </div>
      )}
    </div>
  );
}
