"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789§◌·".split("");

type Trigger = "view" | "mount" | "hover";

type Props = {
  children: string;
  className?: string;
  /** Total scramble duration in ms (default 700). */
  duration?: number;
  /** When to start the scramble. Default: 'view' (IntersectionObserver). */
  trigger?: Trigger;
  /** Restart scramble each time it re-enters the viewport. */
  replay?: boolean;
  /** Glyph palette used for the scramble noise. */
  glyphs?: string[];
  /** Optional delay (ms) before scramble starts after the trigger fires. */
  delay?: number;
  /** Render as block instead of inline. */
  as?: "span" | "div" | "p";
};

/**
 * ScrambleText — letters cycle through random glyphs and progressively settle
 * on the real character. Honours `prefers-reduced-motion` (renders the final
 * string immediately).
 */
export function ScrambleText({
  children,
  className,
  duration = 700,
  trigger = "view",
  replay = false,
  glyphs = DEFAULT_GLYPHS,
  delay = 0,
  as: Tag = "span",
}: Props) {
  const target = children;
  const [display, setDisplay] = useState(target);
  const ref = useRef<HTMLSpanElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setDisplay(target);
      return;
    }

    const run = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const start = performance.now() + delay;
      const total = duration;
      const chars = target.split("");

      const tick = (now: number) => {
        const elapsed = Math.max(0, now - start);
        const progress = Math.min(1, elapsed / total);

        const out = chars
          .map((char, i) => {
            if (char === " " || char === "\u00a0") return char;
            const reveal = i / chars.length;
            // Letters lock in left-to-right as progress rolls past their reveal threshold.
            if (progress >= reveal + 0.18) return char;
            return glyphs[Math.floor(Math.random() * glyphs.length)] || char;
          })
          .join("");
        setDisplay(out);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setDisplay(target);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    if (trigger === "mount") {
      run();
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }

    if (trigger === "hover") {
      const node = ref.current;
      if (!node) return;
      const onEnter = () => run();
      node.addEventListener("mouseenter", onEnter);
      return () => {
        node.removeEventListener("mouseenter", onEnter);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }

    // trigger === 'view'
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!replay && startedRef.current) continue;
          startedRef.current = true;
          run();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(node);
    return () => {
      io.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, trigger, replay, delay, glyphs]);

  return (
    <Tag ref={ref as never} className={className}>
      <span className="sr-only">{target}</span>
      <span aria-hidden>{display}</span>
    </Tag>
  );
}
