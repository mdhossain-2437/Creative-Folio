"use client";

// WorksConstellation — a drag-pan archive view used at the top of `/works`.
// Works are scattered as floating thumbnails on an oversized canvas; the
// viewer can drag, scroll-wheel-pan, and click a card to open its case
// study. The grid below remains intact — this is an additive Awwwards-y
// alternate view, not a replacement.

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Work } from "@/lib/data";

type Props = {
  works: Work[];
};

// Pseudo-random (deterministic) layout so SSR + hydration match.
function seededLayout(works: Work[]) {
  return works.map((w, i) => {
    const angle = (i * 137.508 * Math.PI) / 180; // golden-angle spiral
    const radius = 220 + i * 38;
    return {
      slug: w.slug,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      rotate: ((i * 19) % 11) - 5, // -5..+5 degrees
    };
  });
}

export function WorksConstellation({ works }: Props) {
  const stage = useRef<HTMLDivElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragging = useRef<{ x: number; y: number; sx: number; sy: number } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // Default enabled on fine pointers (desktop). Touch users get the grid.
    setEnabled(fine && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = stage.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      // Don't grab if user is clicking a link directly.
      const link = (e.target as HTMLElement).closest("a");
      if (link) return;
      dragging.current = { x: e.clientX, y: e.clientY, sx: pan.x, sy: pan.y };
      el.setPointerCapture?.(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - dragging.current.x;
      const dy = e.clientY - dragging.current.y;
      setPan({ x: dragging.current.sx + dx, y: dragging.current.sy + dy });
    };
    const onPointerUp = (e: PointerEvent) => {
      dragging.current = null;
      el.releasePointerCapture?.(e.pointerId);
      el.style.cursor = "grab";
    };
    const onWheel = (e: WheelEvent) => {
      // Prevent vertical scroll only when pointer is over the canvas AND user
      // intends a pan (deltaX present). Otherwise let page scroll continue.
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        setPan((p) => ({ x: p.x - e.deltaX, y: p.y - e.deltaY }));
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    el.addEventListener("wheel", onWheel, { passive: false });
    el.style.cursor = "grab";

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("wheel", onWheel);
    };
  }, [enabled, pan.x, pan.y]);

  if (!enabled) return null;

  const layout = seededLayout(works);

  return (
    <section
      aria-label="Drag to explore the archive"
      className="relative h-[78vh] min-h-[640px] overflow-hidden border-y border-warmwhite/15 bg-ink-950"
    >
      <div
        ref={stage}
        className="absolute inset-0 select-none"
        data-cursor="drag"
        data-cursor-label="DRAG"
      >
        <div
          ref={surface}
          className="pointer-events-none absolute left-1/2 top-1/2"
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0)`,
            transition: dragging.current
              ? "none"
              : "transform 700ms cubic-bezier(0.22,1,0.36,1)",
            willChange: "transform",
          }}
        >
          {works.map((w, i) => {
            const pos = layout[i];
            return (
              <Link
                key={w.slug}
                href={`/works/${w.slug}`}
                data-cursor="view"
                data-cursor-label="OPEN"
                className="group pointer-events-auto absolute block h-44 w-72 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md ring-1 ring-warmwhite/15 transition-transform duration-500 hover:scale-[1.04] hover:ring-peach/50"
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  transform: `translate(-50%, -50%) rotate(${pos.rotate}deg)`,
                }}
              >
                <Image
                  src={w.cover}
                  alt={w.title}
                  fill
                  sizes="288px"
                  className="object-cover"
                />
                <span
                  className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-60"
                  style={{ background: w.accent + "60" }}
                />
                <span className="pointer-events-none absolute inset-x-3 bottom-3 flex items-baseline justify-between font-sans text-[10px] uppercase tracking-widest text-warmwhite">
                  <span>{w.index} · {w.title}</span>
                  <span className="text-warmwhite/70">{w.year}</span>
                </span>
              </Link>
            );
          })}
        </div>

        <div className="pointer-events-none absolute left-6 top-6 flex items-center gap-3 font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-peach" />
          <span>Drag to roam · {works.length} projects · scroll horiz to pan</span>
        </div>
        <button
          type="button"
          onClick={() => setPan({ x: 0, y: 0 })}
          data-cursor="hover"
          data-cursor-label="RECENTER"
          className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full border border-warmwhite/25 bg-ink-900/70 px-3 py-1.5 font-sans text-[10px] uppercase tracking-widest text-warmwhite/75 backdrop-blur transition-colors hover:border-peach/60 hover:text-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
        >
          ◌ recenter
        </button>
      </div>
    </section>
  );
}
