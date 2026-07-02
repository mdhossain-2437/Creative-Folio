"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { LabDemoModuleProps } from "@/components/lab/runtime/CanvasDemo";

// ── DOM-based: SDF Glyph (signed-distance-letters) ──────────────────────────
export default function SdfGlyphDemo({ compact }: LabDemoModuleProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      wrap.style.setProperty("--mx", `${x * 100}%`);
      wrap.style.setProperty("--my", `${y * 100}%`);
    };
    wrap.addEventListener("pointermove", onMove);
    return () => wrap.removeEventListener("pointermove", onMove);
  }, []);
  const word = "GLYPH";
  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-ink-950"
      style={
        {
          backgroundImage:
            "radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), rgba(205,250,0,0.18), transparent 60%)",
        } as CSSProperties
      }
    >
      <div className="relative">
        {/* dilated outline echoes */}
        <span
          aria-hidden
          className={`absolute inset-0 font-serif leading-none tracking-tightest text-transparent ${
            compact
              ? "text-[clamp(2.4rem,10vw,5.5rem)]"
              : "text-[clamp(6rem,18vw,18rem)]"
          }`}
          style={{ WebkitTextStroke: "1px rgba(227,191,180,0.45)" }}
        >
          {word}
        </span>
        <span
          aria-hidden
          className={`absolute inset-0 font-serif leading-none tracking-tightest text-transparent translate-x-[6px] translate-y-[3px] ${
            compact
              ? "text-[clamp(2.4rem,10vw,5.5rem)]"
              : "text-[clamp(6rem,18vw,18rem)]"
          }`}
          style={{ WebkitTextStroke: "1px rgba(205,250,0,0.35)" }}
        >
          {word}
        </span>
        <span
          className={`relative font-serif leading-none tracking-tightest text-warmwhite ${
            compact
              ? "text-[clamp(2.4rem,10vw,5.5rem)]"
              : "text-[clamp(6rem,18vw,18rem)]"
          }`}
        >
          {word}
        </span>
      </div>
      {!compact && (
        <div className="pointer-events-none absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-widest text-warmwhite/65">
          SDF · move cursor for halo
        </div>
      )}
    </div>
  );
}
