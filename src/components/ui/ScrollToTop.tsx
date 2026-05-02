"use client";

import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    // Sits above the AtmosphereMode pill (`bottom-6 right-6`) so the two
    // don't collide. `floating-overlay` lets the global rule hide it
    // when a modal is open.
    <button
      aria-label="Scroll to top"
      onClick={scrollUp}
      data-cursor="hover"
      data-cursor-label="UP"
      data-floating-overlay
      className={`floating-overlay fixed bottom-20 right-6 z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-warmwhite/20 bg-ink-900/80 font-sans text-warmwhite/70 backdrop-blur-sm transition-all duration-300 hover:border-warmwhite/50 hover:text-warmwhite md:bottom-[5.5rem] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}
