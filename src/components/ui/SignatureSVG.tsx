"use client";

// SignatureSVG — handwritten "Delowar" signature that strokes itself in
// when the footer enters the viewport. Pure SVG path with a
// `pathLength` animation. Static fallback under reduced-motion.

import { useEffect, useRef, useState } from "react";

export function SignatureSVG({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setDrawn(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setDrawn(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 520 120"
      role="img"
      aria-label="Delowar Hossain signature"
      className={className}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* "Delowar" cursive — composed of three flowing strokes for a
            handwritten feel. Total path length tuned ~880px. */}
        <path
          d="M14 86 C 24 30, 64 26, 70 70 C 72 88, 50 96, 32 84 C 24 78, 28 60, 50 60 L 96 60"
          style={{
            strokeDasharray: 320,
            strokeDashoffset: drawn ? 0 : 320,
            transition: "stroke-dashoffset 1400ms cubic-bezier(0.6, 0.05, 0.3, 1)",
          }}
        />
        <path
          d="M104 80 C 104 56, 124 50, 132 70 C 138 86, 122 92, 116 80 M 132 60 C 156 36, 178 60, 174 78 C 170 96, 148 96, 148 78 C 148 60, 168 56, 178 70 M 192 86 C 188 56, 224 46, 234 80 C 240 100, 218 102, 218 86 C 218 68, 246 60, 256 80"
          style={{
            strokeDasharray: 540,
            strokeDashoffset: drawn ? 0 : 540,
            transition:
              "stroke-dashoffset 1800ms cubic-bezier(0.6, 0.05, 0.3, 1) 200ms",
          }}
        />
        <path
          d="M268 80 L 280 50 L 296 80 L 286 64 L 304 64 M 322 60 C 322 90, 360 96, 366 78 C 374 56, 348 50, 340 70 C 332 90, 354 96, 376 84"
          style={{
            strokeDasharray: 360,
            strokeDashoffset: drawn ? 0 : 360,
            transition:
              "stroke-dashoffset 1500ms cubic-bezier(0.6, 0.05, 0.3, 1) 600ms",
          }}
        />
        {/* Underline flourish */}
        <path
          d="M14 102 C 100 110, 220 110, 380 102 C 420 100, 460 96, 500 92"
          style={{
            strokeDasharray: 600,
            strokeDashoffset: drawn ? 0 : 600,
            transition:
              "stroke-dashoffset 1600ms cubic-bezier(0.6, 0.05, 0.3, 1) 1100ms",
            opacity: 0.6,
          }}
        />
      </g>
    </svg>
  );
}
