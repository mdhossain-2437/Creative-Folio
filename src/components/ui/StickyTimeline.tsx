"use client";

import { useEffect, useRef, useState } from "react";

type Item = { year: string; title: string; body: string };

export function StickyTimeline({ items, label = "§ Timeline" }: { items: Item[]; label?: string }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(idx)) setActiveIdx(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0.01 }
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
            <p className="mt-6 font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              {String(activeIdx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
            <div className="relative mt-4 h-[clamp(8rem,22vw,18rem)] overflow-hidden">
              {items.map((it, i) => (
                <span
                  key={it.year}
                  className={`absolute inset-x-0 top-0 chapter-year font-serif text-[clamp(7rem,18vw,16rem)] leading-none tracking-tightest text-warmwhite transition-all duration-700 ${
                    i === activeIdx
                      ? "translate-y-0 opacity-100"
                      : i < activeIdx
                      ? "-translate-y-full opacity-0"
                      : "translate-y-full opacity-0"
                  }`}
                >
                  {it.year}
                </span>
              ))}
            </div>
            <p className="mt-6 max-w-sm font-sans text-sm leading-relaxed text-warmwhite/60">
              Scroll to walk through the timeline. The year on the left flips as you cross each
              chapter — entry by entry, year by year.
            </p>
          </div>
        </aside>
        <ol className="md:col-span-7 space-y-16 md:space-y-24">
          {items.map((it, i) => (
            <li
              key={it.year}
              data-idx={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="relative min-h-[60vh] border-l border-warmwhite/15 pl-6 md:pl-10"
            >
              <span
                className={`absolute -left-1.5 top-2 inline-flex h-3 w-3 rounded-full transition-colors duration-500 ${
                  i === activeIdx ? "bg-peach" : "bg-warmwhite/20"
                }`}
              />
              <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                §{String(i + 1).padStart(2, "0")} · {it.year}
              </p>
              <h3 className="mt-3 font-serif text-3xl tracking-tight text-warmwhite md:text-4xl">
                {it.title}
              </h3>
              <p className="mt-4 max-w-xl text-balance font-sans text-base leading-relaxed text-warmwhite/65">
                {it.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
