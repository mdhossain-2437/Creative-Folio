"use client";

import { ReactNode, useEffect, useRef, type CSSProperties } from "react";
import { supportsNativeViewTimeline } from "@/lib/nativeScrollAnimation";

// React 19's tightened typing makes dynamic `as` props infer `never` for
// children / ref unless we forward through a permissive component shape.
// We rely on call sites to keep the contract honest.
type AsTag = React.ComponentType<{
  ref?: React.Ref<HTMLElement>;
  className?: string;
  style?: CSSProperties;
  "data-scroll-reveal"?: string;
  children?: ReactNode;
}>;

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("transition-delay", "0s");
      el.classList.add("is-in");
      return;
    }
    el.style.setProperty("transition-delay", `${delay}s`);
    el.style.setProperty("--reveal-delay", `${delay}s`);
    if (supportsNativeViewTimeline()) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  const Component = Tag as unknown as AsTag;
  return (
    <Component
      ref={ref}
      className={`reveal ${className}`}
      data-scroll-reveal="true"
      style={{ "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </Component>
  );
}
