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
    let isSettled = true;

    // Cache letter centers relative to viewport to avoid layout thrashing per frame
    let letterCenters: { el: HTMLElement; cx: number; cy: number }[] = [];
    const cacheRects = () => {
      letterCenters = letters.map((el) => {
        const r = el.getBoundingClientRect();
        return { el, cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
      });
    };
    cacheRects();

    const apply = () => {
      let anyActive = false;
      for (let i = 0; i < letterCenters.length; i++) {
        const { el, cx, cy } = letterCenters[i];
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < radius) {
          const fall = 1 - dist / radius;
          const tx = (dx / radius) * pull * fall * 1.6;
          const ty = (dy / radius) * pull * fall * 1.6;
          el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
          anyActive = true;
        } else {
          if (el.style.transform && el.style.transform !== "translate3d(0, 0, 0)") {
            el.style.transform = "translate3d(0, 0, 0)";
          }
        }
      }
      if (!anyActive) {
        letterCenters.forEach(({ el }) => {
          el.style.transform = "translate3d(0, 0, 0)";
        });
        isSettled = true;
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(apply);
    };

    const startIfNear = () => {
      const nodeRect = node.getBoundingClientRect();
      const near =
        mx >= nodeRect.left - radius &&
        mx <= nodeRect.right + radius &&
        my >= nodeRect.top - radius &&
        my <= nodeRect.bottom + radius;

      if (near) {
        if (isSettled || !raf) {
          isSettled = false;
          if (!raf) raf = requestAnimationFrame(apply);
        }
      } else if (!isSettled && !raf) {
        raf = requestAnimationFrame(apply);
      }
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      startIfNear();
    };

    const onLeave = () => {
      mx = -9999;
      my = -9999;
      if (!isSettled && !raf) {
        raf = requestAnimationFrame(apply);
      }
    };

    window.addEventListener("resize", cacheRects, { passive: true });
    window.addEventListener("scroll", cacheRects, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", cacheRects);
      window.removeEventListener("scroll", cacheRects);
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
