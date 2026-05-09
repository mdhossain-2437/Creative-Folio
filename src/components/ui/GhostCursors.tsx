"use client";

// GhostCursors — 2-3 faint cursor trails replay canned paths in the
// hero region every ~10s to give the page a "site is occupied" feel.
//
// All paths are deterministic and seeded — no real multiplayer here.
// Disabled on touch, prefers-reduced-motion, or when the document has
// `data-modal-open` set.

import { useEffect, useRef } from "react";

type Path = { x: number; y: number; t: number }[];

// Three pre-baked paths, expressed as percentages of viewport. Each cursor
// follows one path on a loop, offset by a per-cursor delay.
const PATHS: Path[] = [
  [
    { x: 0.18, y: 0.32, t: 0 },
    { x: 0.34, y: 0.42, t: 1300 },
    { x: 0.46, y: 0.36, t: 2400 },
    { x: 0.58, y: 0.5, t: 3700 },
    { x: 0.42, y: 0.62, t: 5200 },
    { x: 0.22, y: 0.55, t: 6800 },
  ],
  [
    { x: 0.84, y: 0.22, t: 0 },
    { x: 0.74, y: 0.38, t: 1500 },
    { x: 0.66, y: 0.52, t: 2800 },
    { x: 0.78, y: 0.62, t: 4400 },
    { x: 0.88, y: 0.5, t: 5800 },
    { x: 0.92, y: 0.32, t: 7200 },
  ],
  [
    { x: 0.5, y: 0.7, t: 0 },
    { x: 0.4, y: 0.78, t: 1100 },
    { x: 0.55, y: 0.85, t: 2300 },
    { x: 0.66, y: 0.74, t: 3600 },
    { x: 0.5, y: 0.68, t: 5200 },
  ],
];
const LOOP_DURATION = 9000;
const STAGGER = 3000;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function sample(path: Path, ms: number): { x: number; y: number } | null {
  const t = ms % LOOP_DURATION;
  if (t < path[0].t || t > path[path.length - 1].t + 600) return null;
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i];
    const b = path[i + 1];
    if (t >= a.t && t <= b.t) {
      const k = (t - a.t) / Math.max(1, b.t - a.t);
      const ease = k * k * (3 - 2 * k);
      return { x: lerp(a.x, b.x, ease), y: lerp(a.y, b.y, ease) };
    }
  }
  return null;
}

export function GhostCursors() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (reduce || isTouch) return;

    const container = containerRef.current;
    if (!container) return;

    const dots: HTMLDivElement[] = Array.from(
      container.querySelectorAll<HTMLDivElement>("[data-ghost]")
    );
    if (!dots.length) return;

    startRef.current = performance.now();

    const tick = () => {
      const now = performance.now();
      const elapsed = now - startRef.current;
      if (typeof document !== "undefined" && document.documentElement.dataset.modalOpen === "true") {
        for (const d of dots) d.style.opacity = "0";
      } else {
        const w = window.innerWidth;
        const h = Math.min(window.innerHeight, container.clientHeight || window.innerHeight);
        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i];
          const path = PATHS[i % PATHS.length];
          const offset = i * STAGGER;
          const point = sample(path, elapsed + offset);
          if (!point) {
            dot.style.opacity = "0";
            continue;
          }
          const x = point.x * w;
          const y = point.y * h;
          dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          dot.style.opacity = "0.42";
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // Pause when the hero scrolls off-screen — ghosts only matter while
    // visible. Saves a per-frame loop over the dot list on every page.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && rafRef.current === 0) {
          rafRef.current = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = 0;
        }
      },
      { threshold: 0.01 },
    );
    io.observe(container);

    return () => {
      io.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
    >
      {PATHS.map((_, i) => (
        <div
          key={i}
          data-ghost
          className="absolute left-0 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-warmwhite/45 opacity-0 transition-opacity duration-700 mix-blend-screen"
          style={{
            background: "radial-gradient(circle, rgba(227,191,180,0.65) 0%, rgba(227,191,180,0) 70%)",
            boxShadow: "0 0 12px rgba(227,191,180,0.35)",
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
