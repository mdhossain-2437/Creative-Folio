"use client";

// StickyTimeline — vertical timeline whose left rail year flips as the
// reader scrolls through each chapter on the right. Improvements over
// the previous build:
//
//   · The big year on the left is the *active* year, swapped via an
//     IntersectionObserver whose rootMargin targets the viewport's
//     midline — so the flip lines up with what the reader's eye is on.
//   · Every right-hand chapter carries its own clearly readable year
//     badge + large display number, so even after scrolling past, it's
//     obvious which entry belonged to which year.
//   · A small dot/marker on the rail lights up + a horizontal index
//     pill ("§02 / 05") so progress is legible.
//   · Reduced-motion bypasses the cross-fade and just shows the year
//     swap as an instant state change.

import { useEffect, useRef, useState } from "react";

type Item = { year: string; title: string; body: string };

export function StickyTimeline({ items, label = "§ Timeline" }: { items: Item[]; label?: string }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) return;

    // Map of idx -> ratio. Recompute the most-visible idx on every
    // entry update. Using a midline-anchored rootMargin keeps the
    // active year locked to whatever chapter the reader's eye is on.
    const ratios = new Map<number, number>();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.idx);
          if (Number.isNaN(idx)) return;
          ratios.set(idx, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        let bestIdx = 0;
        let bestRatio = -1;
        ratios.forEach((r, i) => {
          if (r > bestRatio) {
            bestRatio = r;
            bestIdx = i;
          }
        });
        if (bestRatio > 0) setActiveIdx(bestIdx);
      },
      {
        // Trigger when the chapter crosses the viewport midline.
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.01, 0.25, 0.5, 0.75, 1],
      }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [items.length]);

  return (
    <section className="relative bg-ink-900 py-28 md:py-40">
      <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
        <aside className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">{label}</p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-warmwhite/15 bg-ink-950/60 px-3 py-1.5 font-sans text-[10px] uppercase tracking-widest text-warmwhite/85 backdrop-blur">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-peach"
              />
              <span className="display-num">
                §{String(activeIdx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
              <span aria-hidden className="text-warmwhite/30">·</span>
              <span className="display-num text-peach">{items[activeIdx]?.year}</span>
            </div>
            <div className="relative mt-6 h-[clamp(7rem,18vw,14rem)] overflow-hidden">
              {items.map((it, i) => (
                <span
                  key={it.year}
                  aria-hidden={i !== activeIdx}
                  className={`chapter-year display-num absolute inset-x-0 top-0 font-serif text-[clamp(6rem,16vw,14rem)] leading-none tracking-tightest text-warmwhite transition-all duration-700 ease-out ${
                    i === activeIdx
                      ? "translate-y-0 opacity-100"
                      : i < activeIdx
                        ? "-translate-y-1/2 opacity-0"
                        : "translate-y-1/2 opacity-0"
                  }`}
                >
                  {it.year}
                </span>
              ))}
            </div>
            <p className="mt-2 font-serif text-2xl italic text-warmwhite/80 md:text-3xl">
              {items[activeIdx]?.title}
            </p>
            <p className="mt-6 max-w-sm font-sans text-sm leading-relaxed text-warmwhite/60">
              Scroll to walk through the chapters. The year on the left flips as you cross each
              entry — every right-hand card carries its own year badge so nothing slips by.
            </p>

            {/* progress rail */}
            <ol className="mt-8 flex items-center gap-2" aria-hidden>
              {items.map((it, i) => (
                <li
                  key={it.year}
                  className={`h-px flex-1 origin-left transition-[background,transform] duration-500 ${
                    i <= activeIdx ? "bg-peach" : "bg-warmwhite/15"
                  }`}
                />
              ))}
            </ol>
          </div>
        </aside>

        <ol className="md:col-span-7 space-y-16 md:space-y-24">
          {items.map((it, i) => {
            const isActive = i === activeIdx;
            return (
              <li
                key={it.year}
                data-idx={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                aria-current={isActive ? "true" : undefined}
                className={`relative rounded-2xl border border-warmwhite/10 bg-ink-950/40 p-6 transition-[border-color,background-color] duration-500 md:p-10 ${
                  isActive ? "border-peach/40 bg-ink-950/70" : "hover:border-warmwhite/25"
                }`}
              >
                {/* Big watermark year per card — readable even after scrolling past */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute right-4 top-3 font-serif text-[clamp(3.2rem,7vw,6rem)] leading-none tracking-tightest transition-opacity duration-500 md:right-8 md:top-6 ${
                    isActive ? "text-peach/30 opacity-100" : "text-warmwhite/[0.07] opacity-100"
                  }`}
                >
                  {it.year}
                </span>

                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-block h-2 w-2 shrink-0 rounded-full transition-colors duration-500 ${
                        isActive ? "bg-peach" : "bg-warmwhite/30"
                      }`}
                    />
                    <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                      <span className="display-num">§{String(i + 1).padStart(2, "0")}</span>
                      <span className="mx-2 text-warmwhite/30">·</span>
                      <span className="display-num text-warmwhite/85">{it.year}</span>
                    </p>
                  </div>
                  <h3 className="mt-4 font-serif text-3xl tracking-tight text-warmwhite md:text-4xl">
                    {it.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-balance font-sans text-base leading-relaxed text-warmwhite/70">
                    {it.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
