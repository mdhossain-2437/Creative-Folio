"use client";

// SignatureSVG — formal cursive "Delowar Hossain" signature rendered in
// Sacramento (a one-weight signature script). When the footer enters
// the viewport the mark draws itself in with a single sweeping wipe —
// emulating a continuous, premium one-stroke pen flow. The text is
// always present in the DOM for SEO + a11y; the wipe is purely visual
// and is short-circuited under prefers-reduced-motion.

import { useEffect, useRef, useState } from "react";

const SIGNATURE_TEXT = "Delowar Hossain";

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
      { threshold: 0.35 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 1300 220"
      role="img"
      aria-label={`${SIGNATURE_TEXT} signature`}
      className={className}
    >
      <defs>
        {/* The wipe — width animates from 0 → 1300 with a long, soft
            ease so the pen feels like it travels in a single
            continuous motion. */}
        <clipPath id="signature-wipe">
          <rect
            x="0"
            y="0"
            height="220"
            width={drawn ? 1300 : 0}
            style={{
              transition:
                "width 2600ms cubic-bezier(0.65, 0.05, 0.36, 1)",
            }}
          />
        </clipPath>
      </defs>

      <g clipPath="url(#signature-wipe)">
        <text
          x="6"
          y="160"
          fill="currentColor"
          fontFamily="var(--font-sacramento), 'Sacramento', 'Snell Roundhand', 'Apple Chancery', cursive"
          fontSize="180"
          fontWeight="400"
          textLength="1280"
          lengthAdjust="spacingAndGlyphs"
        >
          {SIGNATURE_TEXT}
        </text>
      </g>

      {/* Flourish underline — strokes in once the wipe is past it,
          giving the signature its closing pen-flick. */}
      <path
        d="M16 196 C 320 208, 720 208, 1000 196 C 1100 192, 1200 186, 1286 178"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 1340,
          strokeDashoffset: drawn ? 0 : 1340,
          opacity: 0.55,
          transition:
            "stroke-dashoffset 1800ms cubic-bezier(0.65, 0.05, 0.36, 1) 1600ms",
        }}
      />
    </svg>
  );
}
