"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Frame = { label: string; filter: string; tag: string };

// Five deterministic treatments of the cover image — a "contact sheet" of the
// case study. Drag horizontally to scrub between them.
const FRAMES: Frame[] = [
  { label: "Hero",    filter: "none",                                                                    tag: "01" },
  { label: "Duotone", filter: "saturate(140%) contrast(108%) hue-rotate(-12deg)",                        tag: "02" },
  { label: "Wire",    filter: "grayscale(1) contrast(180%) brightness(0.85)",                             tag: "03" },
  { label: "Bloom",   filter: "blur(2px) brightness(1.15) saturate(160%)",                                tag: "04" },
  { label: "Grain",   filter: "saturate(0.7) contrast(115%) sepia(0.18)",                                 tag: "05" },
];

export function DragScrubHero({ src, alt, accent }: { src: string; alt: string; accent: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [scrubbing, setScrubbing] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const w = el.clientWidth;
      const i = Math.round(el.scrollLeft / w);
      setActive(Math.max(0, Math.min(FRAMES.length - 1, i)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Mouse drag-to-scroll (touch already works natively).
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let down = false;
    let startX = 0;
    let startLeft = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      setScrubbing(true);
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      el.scrollLeft = startLeft - (e.clientX - startX);
    };
    const onUp = (e: PointerEvent) => {
      if (!down) return;
      down = false;
      setScrubbing(false);
      try { el.releasePointerCapture(e.pointerId); } catch { /* noop */ }
      // Snap to nearest frame.
      const w = el.clientWidth;
      const target = Math.round(el.scrollLeft / w) * w;
      el.scrollTo({ left: target, behavior: "smooth" });
    };
    const onLeave = () => {
      down = false;
      setScrubbing(false);
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: el.clientWidth * i, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        data-lenis-prevent
        data-cursor="view"
        data-cursor-label={scrubbing ? "SCRUBBING" : "DRAG · SCRUB"}
        className={`scrub-track relative flex aspect-[16/9] w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden rounded-md ${
          scrubbing ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ scrollbarWidth: "none" }}
        aria-label={`${alt} — drag to scrub through ${FRAMES.length} treatments`}
      >
        {FRAMES.map((f, i) => (
          <div
            key={f.tag}
            data-scrub-frame={f.tag}
            className="relative h-full w-full flex-shrink-0 snap-center"
          >
            <Image
              src={src}
              alt={`${alt} — ${f.label}`}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 1640px, 100vw"
              className="object-cover transition-[filter] duration-200"
              style={{ filter: f.filter }}
              draggable={false}
            />
            <div
              className="pointer-events-none absolute inset-0 mix-blend-multiply transition-opacity duration-300"
              style={{ background: accent + "33", opacity: i === 2 ? 0.05 : 1 }}
            />
            <div className="pointer-events-none absolute left-6 top-6 font-mono text-[11px] uppercase tracking-widest text-warmwhite/85">
              <span className="text-peach">{f.tag}</span> · {f.label}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom rail: index + dots */}
      <div className="mt-5 flex items-center gap-6">
        <p
          className="font-mono text-[11px] uppercase tracking-widest text-warmwhite/55"
          aria-live="polite"
        >
          <span className="text-warmwhite">{String(active + 1).padStart(2, "0")}</span>
          <span className="text-warmwhite/40"> / {String(FRAMES.length).padStart(2, "0")}</span>
          <span className="ml-3 text-peach">{FRAMES[active].label}</span>
        </p>
        <div className="flex flex-1 items-center gap-3">
          {FRAMES.map((f, i) => (
            <button
              key={f.tag}
              type="button"
              data-scrub-dot={i}
              onClick={() => goTo(i)}
              data-cursor="hover"
              data-cursor-label={`F${f.tag}`}
              className={`group flex flex-1 items-center gap-2`}
              aria-label={`Jump to frame ${i + 1} (${f.label})`}
            >
              <span
                className={`block h-px flex-1 transition-colors ${
                  i === active ? "bg-peach" : "bg-warmwhite/15 group-hover:bg-warmwhite/40"
                }`}
              />
              <span
                className={`font-mono text-[10px] uppercase tracking-widest transition-colors ${
                  i === active ? "text-peach" : "text-warmwhite/30 group-hover:text-warmwhite/65"
                }`}
              >
                {f.tag}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
