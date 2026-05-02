"use client";

// A subtle radial spotlight that follows the cursor. Renders a single fixed
// element with `mix-blend-mode: soft-light`, so it brightens warm/dark sections
// without ever obscuring content. Pauses entirely when reduced motion is on or
// the user toggles calm motion. Disabled on coarse pointers (touch).

import { useEffect, useRef } from "react";

export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
    if (coarse) return;

    const motion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const calmAttr = () => document.body.classList.contains("calm-motion");

    const updateVisibility = () => {
      const calm = motion?.matches || calmAttr();
      el.style.opacity = calm ? "0" : "";
    };

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const loop = () => {
      raf = 0;
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate3d(${cx - 240}px, ${cy - 240}px, 0)`;
      if (Math.abs(tx - cx) > 0.4 || Math.abs(ty - cy) > 0.4) {
        raf = requestAnimationFrame(loop);
      }
    };

    updateVisibility();
    window.addEventListener("pointermove", onMove, { passive: true });
    motion?.addEventListener?.("change", updateVisibility);
    const observer = new MutationObserver(updateVisibility);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("pointermove", onMove);
      motion?.removeEventListener?.("change", updateVisibility);
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[480px] w-[480px] rounded-full opacity-60 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(closest-side, rgba(247,196,159,0.18), rgba(247,196,159,0.06) 38%, transparent 70%)",
        mixBlendMode: "soft-light",
        willChange: "transform",
      }}
    />
  );
}
