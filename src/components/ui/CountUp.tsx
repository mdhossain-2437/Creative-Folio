"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Final value to count up to. */
  to: number;
  /** Optional starting value. Default 0. */
  from?: number;
  /** Animation duration in ms. Default 1400. */
  duration?: number;
  /** Decimal places. Default 0. */
  decimals?: number;
  /** Optional prefix (e.g. '$'). */
  prefix?: string;
  /** Optional suffix (e.g. '+', '%'). */
  suffix?: string;
  /** Group thousands with comma. */
  separator?: boolean;
  className?: string;
  /** Restart animation when re-entering viewport. */
  replay?: boolean;
};

/**
 * CountUp — animates a number from `from` to `to` when the element scrolls
 * into view. Honours `prefers-reduced-motion` (renders the final value).
 */
export function CountUp({
  to,
  from = 0,
  duration = 1400,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = false,
  className,
  replay = false,
}: Props) {
  const [val, setVal] = useState(from);
  const ref = useRef<HTMLSpanElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setVal(to);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const run = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        // easeOutExpo for a satisfying decel
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        setVal(from + (to - from) * eased);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };

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
  }, [from, to, duration, replay]);

  const formatted = val.toFixed(decimals);
  const display = separator
    ? formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : formatted;

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{`${prefix}${to}${suffix}`}</span>
      <span aria-hidden>
        {prefix}
        {display}
        {suffix}
      </span>
    </span>
  );
}
