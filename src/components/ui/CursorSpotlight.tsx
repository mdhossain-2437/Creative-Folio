"use client";

// CursorSpotlight — a soft, radial peach glow that follows the cursor
// across dark sections. Uses CSS vars updated on mousemove; cheap.
// Disabled on touch + reduced-motion. Lives behind everything except
// the page background (z-0 fixed, pointer-events-none).

import { useEffect, useState } from "react";

export function CursorSpotlight() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !fine) return;
    setEnabled(true);

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          document.documentElement.style.setProperty("--spot-x", `${tx}px`);
          document.documentElement.style.setProperty("--spot-y", `${ty}px`);
          raf = 0;
        });
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(227, 191, 180, 0.10), transparent 60%)",
        transition: "opacity 600ms ease",
      }}
    />
  );
}
