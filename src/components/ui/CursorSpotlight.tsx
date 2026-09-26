"use client";

// CursorSpotlight — a soft, radial peach glow that follows the cursor
// across dark sections. Uses CSS vars updated on mousemove; cheap.
// Disabled on touch + reduced-motion. Lives behind everything except
// the page background (z-0 fixed, pointer-events-none).

import { useEffect, useState } from "react";
import { damp, clampDt, K } from "@/lib/damp";
import { subscribeRafPriority } from "@/lib/rafBus";

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

    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let tx = cx;
    let ty = cy;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const off = subscribeRafPriority((_now, dt) => {
      const d = clampDt(dt);
      cx = damp(cx, tx, K.K_FAST, d);
      cy = damp(cy, ty, K.K_FAST, d);
      document.documentElement.style.setProperty("--spot-x", `${cx.toFixed(1)}px`);
      document.documentElement.style.setProperty("--spot-y", `${cy.toFixed(1)}px`);
    }, 0);

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      off();
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
