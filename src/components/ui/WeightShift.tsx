"use client";

// WeightShift — variable-font weight transition on scroll. Wrap a
// long-form paragraph with this and the body weight morphs from `from`
// → `to` once the element crosses the viewport threshold.
//
// Inter is a variable font; the weight transition runs on the
// `font-variation-settings` axis. Falls back instantly on
// prefers-reduced-motion.

import { useEffect, useRef } from "react";

type Props = {
  from?: number;
  to?: number;
  duration?: number; // ms
  threshold?: number;
  className?: string;
  children: React.ReactNode;
};

export function WeightShift({
  from = 320,
  to = 540,
  duration = 1800,
  threshold = 0.35,
  className,
  children,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.fontVariationSettings = `"wght" ${to}`;
      return;
    }
    el.style.fontVariationSettings = `"wght" ${from}`;
    el.style.transition = `font-variation-settings ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          el.style.fontVariationSettings = `"wght" ${to}`;
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [from, to, duration, threshold]);

  return (
    <span ref={ref} className={className} style={{ display: "inline" }}>
      {children}
    </span>
  );
}
