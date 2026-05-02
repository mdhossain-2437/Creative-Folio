"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { WorkGalleryImage } from "@/lib/data";

const ASPECT_CLASS: Record<NonNullable<WorkGalleryImage["aspect"]>, string> = {
  wide: "aspect-[16/9] md:col-span-8",
  square: "aspect-square md:col-span-4",
  tall: "aspect-[3/4] md:col-span-4",
};

export function CaseStudyGallery({
  images,
  accent,
}: {
  images: WorkGalleryImage[];
  accent: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(() => {
    setActive((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);
  const prev = useCallback(() => {
    setActive((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close, next, prev]);

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {images.map((img, i) => {
          const cls = ASPECT_CLASS[img.aspect ?? "wide"];
          return (
            <li key={img.src} className={cls}>
              <button
                type="button"
                onClick={() => setActive(i)}
                data-cursor="view"
                data-cursor-label="OPEN"
                className="group relative block h-full w-full overflow-hidden rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-electric"
                aria-label={`Open figure ${i + 1}: ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 mix-blend-multiply opacity-30 transition-opacity duration-500 group-hover:opacity-10"
                  style={{ background: accent }}
                />
                {img.caption && (
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink-950/85 via-ink-950/30 to-transparent p-4 font-sans text-[11px] uppercase tracking-widest text-warmwhite/85 md:p-5">
                    <span className="line-clamp-2 normal-case tracking-normal text-warmwhite/80 md:text-xs">
                      {img.caption}
                    </span>
                    <span aria-hidden className="shrink-0 text-warmwhite/55">
                      ⤢
                    </span>
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[60] flex flex-col bg-ink-950/95 backdrop-blur-sm"
          onClick={close}
        >
          <div className="flex items-center justify-between border-b border-warmwhite/15 px-6 py-4 md:px-10">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/60">
              Figure {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="font-sans text-[11px] uppercase tracking-widest text-warmwhite/70 hover:text-warmwhite"
            >
              Close · esc
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-6 py-6 md:px-10">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous figure"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-warmwhite/20 px-4 py-2 font-sans text-[11px] uppercase tracking-widest text-warmwhite/80 hover:border-warmwhite/60 md:left-8"
            >
              ‹ Prev
            </button>
            <div
              className="relative h-full w-full max-w-[1200px]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[active].src}
                alt={images[active].alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next figure"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-warmwhite/20 px-4 py-2 font-sans text-[11px] uppercase tracking-widest text-warmwhite/80 hover:border-warmwhite/60 md:right-8"
            >
              Next ›
            </button>
          </div>
          {images[active].caption && (
            <p className="mx-auto max-w-3xl border-t border-warmwhite/15 px-6 py-4 text-center font-sans text-sm leading-relaxed text-warmwhite/70 md:px-10">
              {images[active].caption}
            </p>
          )}
        </div>
      )}
    </>
  );
}
