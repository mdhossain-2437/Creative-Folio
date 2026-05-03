"use client";

import { useEffect, useRef } from "react";

type Props = {
  text: string;
  className?: string;
  /** Proximity radius in px. Default 220. */
  radius?: number;
  /** Max pull distance in px. Default 12. */
  pull?: number;
  /** Italic span on/off (matches Hero `Hossain.` italic). */
  italic?: boolean;
};

/**
 * MagneticLetters — splits a string into per-letter spans that gently bend
 * toward the cursor when within `radius` px. Returns to rest with a soft
 * spring on mouse leave. Disabled on touch + reduced-motion.
 *
 * Renders `text` verbatim with `aria-label` so screen-readers and SEO get
 * the original string. Visual children are aria-hidden.
 */
export function MagneticLetters({
  text,
  className,
  radius = 220,
  pull = 12,
  italic = false,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !fine) return;

    const node = ref.current;
    if (!node) return;
    const letters = Array.from(node.querySelectorAll<HTMLElement>("[data-letter]"));
    let mx = -9999;
    let my = -9999;
    let raf = 0;

    const apply = () => {
      letters.forEach((letter) => {
        const r = letter.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < radius) {
          const fall = 1 - dist / radius;
          const tx = (dx / radius) * pull * fall * 1.6;
          const ty = (dy / radius) * pull * fall * 1.6;
          letter.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        } else {
          letter.style.transform = "translate3d(0, 0, 0)";
        }
      });
      raf = requestAnimationFrame(apply);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onLeave = () => {
      mx = -9999;
      my = -9999;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(apply);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      letters.forEach((l) => (l.style.transform = ""));
    };
  }, [text, radius, pull]);

  const chars = text.split("");
  return (
    <span
      ref={ref}
      className={className}
      aria-label={text}
      style={italic ? { fontStyle: "italic" } : undefined}
    >
      {chars.map((c, i) => (
        <span
          key={i}
          aria-hidden
          data-letter
          style={{
            display: "inline-block",
            transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
            willChange: "transform",
          }}
        >
          {c === " " ? "\u00a0" : c}
        </span>
      ))}
    </span>
  );
}
