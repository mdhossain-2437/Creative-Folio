"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string>("");
  const [variant, setVariant] = useState<"default" | "hover" | "view" | "drag">("default");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest("[data-cursor]");
      if (interactive) {
        const v = interactive.getAttribute("data-cursor") as typeof variant;
        const l = interactive.getAttribute("data-cursor-label") || "";
        setVariant(v || "hover");
        setLabel(l);
      } else {
        setVariant("default");
        setLabel("");
      }
    };
    document.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <div className="cursor-shell pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-warmwhite mix-blend-difference"
      />
      <div
        ref={ringRef}
        className={`absolute left-0 top-0 flex items-center justify-center rounded-full border border-warmwhite/40 transition-[width,height,background,color] duration-300 ease-out ${
          variant === "hover"
            ? "h-20 w-20 bg-warmwhite text-ink-900"
            : variant === "view"
            ? "h-24 w-24 bg-peach text-ink-900"
            : variant === "drag"
            ? "h-28 w-28 bg-warmwhite/10 text-warmwhite"
            : "h-9 w-9 bg-transparent text-warmwhite"
        }`}
      >
        {label && (
          <span className="font-sans text-[10px] uppercase tracking-widest">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
