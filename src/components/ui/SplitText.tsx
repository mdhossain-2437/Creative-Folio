"use client";

import { useEffect, useRef } from "react";

// Simple character-mask reveal using IntersectionObserver. No GSAP runtime cost on idle.
export function SplitText({
  text,
  as: Tag = "span",
  delay = 0,
  stagger = 0.04,
  className = "",
}: {
  text: string;
  as?: React.ElementType;
  delay?: number;
  stagger?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"));
    spans.forEach((s, i) => {
      s.style.transition = `transform 1s cubic-bezier(0.22,1,0.36,1)`;
      s.style.transitionDelay = `${delay + i * stagger}s`;
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            spans.forEach((s) => (s.style.transform = "translateY(0%)"));
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, stagger]);

  const words = text.split(" ");

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={className}>
      {words.map((w, i) => (
        <span key={i} className="word-mask mr-[0.25em]">
          <span data-w>{w}</span>
        </span>
      ))}
    </Tag>
  );
}
