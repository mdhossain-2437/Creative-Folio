"use client";

import { ReactNode, useEffect, useRef } from "react";

export function MaskFooter({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) el.classList.add("is-in");
        });
      },
      { threshold: 0, rootMargin: "0px 0px 240px 0px" }
    );
    obs.observe(el);
    const onScrollEnd = () => {
      const bottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4;
      if (bottom) el.classList.add("is-in");
    };
    window.addEventListener("scroll", onScrollEnd, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScrollEnd);
    };
  }, []);

  return (
    <div ref={ref} className="mask-reveal relative">
      {children}
    </div>
  );
}
