"use client";

import { useEffect, useState } from "react";

// Floating reel pill — appears bottom-left after the user has scrolled past
// the hero (≈ 60% of the first viewport). Hidden during the hero so it
// stops overlapping the description / CTAs, and hidden whenever a modal is
// open (handled globally by the `[data-modal-open]` rule on <html>).

export function ShowreelPill({ label = "Reel · 02:17" }: { label?: string }) {
  const [hovered, setHovered] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      const threshold = window.innerHeight * 0.6;
      setRevealed(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => window.dispatchEvent(new CustomEvent("delowar:open-showreel"))}
      data-cursor="view"
      data-cursor-label="PLAY"
      data-floating-overlay
      aria-hidden={!revealed}
      tabIndex={revealed ? 0 : -1}
      className={`floating-overlay fixed bottom-6 left-6 z-30 hidden items-center gap-3 rounded-full border border-warmwhite/15 bg-ink-950/70 px-5 py-3 font-sans text-[10px] uppercase tracking-widest text-warmwhite shadow-2xl backdrop-blur transition-[opacity,transform] duration-500 ease-out md:inline-flex ${
        revealed ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <span
        className={`relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-peach text-ink-900 transition-transform duration-500 ${hovered ? "scale-110" : "scale-100"}`}
      >
        <span className="block h-0 w-0 border-y-[5px] border-l-[7px] border-y-transparent border-l-ink-900" />
        <span className="absolute inset-0 animate-ping rounded-full bg-peach opacity-30" />
      </span>
      <span className="display-num">{label}</span>
    </button>
  );
}
