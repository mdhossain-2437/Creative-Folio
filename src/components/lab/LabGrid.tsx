"use client";

// Filterable lab grid. Pills derived from `experiment.category` — clicking one
// narrows the list in-place. State is local; URL is left alone (so the grid
// snaps back when the user returns from a playground). Keeps the original
// reveal-on-scroll cadence by passing `delay={i * 0.04}`.

import { useMemo, useState } from "react";
import Link from "next/link";
import { LabDemo } from "@/components/lab/LabDemo";
import { LabCardCopyLink } from "@/components/lab/LabCardCopyLink";
import { Reveal } from "@/components/ui/Reveal";
import type { ExperimentExtended } from "@/lib/data";

type Props = {
  experiments: ExperimentExtended[];
};

export function LabGrid({ experiments }: Props) {
  const [filter, setFilter] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set<string>();
    experiments.forEach((e) => set.add(e.category));
    return ["All", ...Array.from(set)];
  }, [experiments]);

  const visible = useMemo(() => {
    if (filter === "All") return experiments;
    return experiments.filter((e) => e.category === filter);
  }, [experiments, filter]);

  return (
    <div>
      <div className="-mx-1 mb-8 flex flex-wrap gap-2 overflow-x-auto">
        {categories.map((cat) => {
          const active = cat === filter;
          const count = cat === "All" ? experiments.length : experiments.filter((e) => e.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              data-cursor="hover"
              onClick={() => setFilter(cat)}
              aria-pressed={active}
              className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                active
                  ? "border-peach bg-peach text-ink-900"
                  : "border-warmwhite/15 bg-ink-900/40 text-warmwhite/65 hover:border-warmwhite/35 hover:text-warmwhite"
              }`}
            >
              <span>{cat}</span>
              <span
                className={`rounded-sm px-1 py-px text-[9px] tabular-nums ${
                  active ? "bg-ink-900/15 text-ink-900" : "bg-warmwhite/10 text-warmwhite/55"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="rounded-2xl border border-warmwhite/10 bg-ink-900/40 px-6 py-12 text-center font-sans text-sm text-warmwhite/55">
          No experiments in this category yet.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/10 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((e, i) => (
            <Reveal key={e.index} delay={i * 0.04}>
              <li className="group relative flex h-full flex-col bg-ink-900">
                <Link
                  href={`/lab/${e.slug}`}
                  data-cursor="view"
                  data-cursor-label="OPEN"
                  className="relative block aspect-square overflow-hidden"
                >
                  <LabDemo slug={e.slug} seed={i * 3.7} compact />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/30 via-transparent to-ink-950/65 transition-opacity duration-500 group-hover:opacity-60" />
                  <span className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-warmwhite/70">
                    <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-electric" />
                    {e.index} · {e.category}
                  </span>
                  <span className="pointer-events-none absolute right-5 top-5 rounded-full border border-warmwhite/25 px-3 py-1 font-sans text-[9px] uppercase tracking-widest text-warmwhite/80 backdrop-blur-sm">
                    Live · interactive
                  </span>
                  <span className="pointer-events-none absolute bottom-5 right-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-warmwhite/10 text-warmwhite transition-all duration-500 group-hover:bg-peach group-hover:text-ink-900">
                    ↗
                  </span>
                </Link>
                <LabCardCopyLink slug={e.slug} />
                <div className="flex flex-1 flex-col justify-between gap-6 p-6 md:p-8">
                  <div>
                    <h3 className="break-words font-serif text-xl leading-tight tracking-tighter md:text-2xl">
                      {e.title}
                    </h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-warmwhite/65">
                      {e.summary}
                    </p>
                  </div>
                  <Link
                    href={`/lab/${e.slug}`}
                    data-cursor="view"
                    data-cursor-label="OPEN"
                    className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55 hover:text-peach"
                  >
                    {e.meta} · Open playground →
                  </Link>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      )}
    </div>
  );
}
