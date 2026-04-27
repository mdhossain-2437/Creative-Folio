"use client";

import { useEffect, useState } from "react";

export function ShowreelPill({ label = "Reel · 02:17" }: { label?: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => window.dispatchEvent(new CustomEvent("delowar:open-showreel"))}
      data-cursor="view"
      data-cursor-label="PLAY"
      className="fixed bottom-6 left-6 z-30 hidden items-center gap-3 rounded-full border border-warmwhite/15 bg-ink-950/70 px-5 py-3 font-sans text-[10px] uppercase tracking-widest text-warmwhite shadow-2xl backdrop-blur md:inline-flex"
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
