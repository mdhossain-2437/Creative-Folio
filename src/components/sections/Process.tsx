"use client";

// ProcessSection — "Concept → Shader."
//
// Restored the previous, prettier 4-column editorial grid (with all four
// phases fully fleshed out — Discovery · Design · Prototype · Production)
// instead of the GSAP horizontal-pin track. Each phase reveals on scroll
// so the reader walks through the whole journey vertically; nothing is
// hidden behind a scrub interaction or only visible while pinned.
//
// On desktop the grid is 4 columns. On tablet it's 2x2. On mobile it
// stacks. All breakpoints get the same information system — summary,
// ordered sub-steps, deliverables, tools, duration tag.

import { process as processPhases } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { ScrambleText } from "@/components/ui/ScrambleText";

export function ProcessSection() {
  return (
    <section className="relative border-t border-warmwhite/15 bg-ink-900 py-28 md:py-40">
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <header className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 md:col-span-3">
            <ScrambleText>§09 — Process</ScrambleText>
          </p>
          <div className="md:col-span-9">
            <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest">
              Concept <span className="italic text-warmwhite/60">to</span> Shader.
            </h2>
            <p className="mt-6 max-w-2xl font-sans text-sm leading-relaxed text-warmwhite/65 md:text-base">
              Four phases · roughly 8 — 15 weeks end to end · scroll through to see
              what happens, what you receive, and the stack the studio reaches for.
            </p>
          </div>
        </header>

        <ol className="mt-16 grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/15 md:grid-cols-2 xl:grid-cols-4">
          {processPhases.map((p, i) => (
            <Reveal
              key={p.phase}
              as="li"
              delay={i * 0.08}
              className="group flex h-full flex-col gap-6 bg-ink-900 p-8 transition-colors duration-500 hover:bg-ink-950 md:p-10"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-sans text-[10px] uppercase tracking-widest text-peach">
                  {p.phase}
                </span>
                <span className="display-num font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                  {p.duration}
                </span>
              </div>

              <span
                aria-hidden
                className="display-num -mt-1 font-serif text-[clamp(3.4rem,5vw,5rem)] leading-none tracking-tightest text-warmwhite/[0.08] transition-colors duration-500 group-hover:text-peach/30"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div>
                <h3 className="font-serif text-3xl leading-none tracking-tightest md:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-warmwhite/70">
                  {p.summary}
                </p>
              </div>

              <ol className="mt-2 space-y-1.5">
                {p.steps.map((s, j) => (
                  <li
                    key={s}
                    className="flex items-start gap-3 font-sans text-[12px] leading-snug text-warmwhite/80"
                  >
                    <span className="display-num mt-[1px] shrink-0 text-[10px] uppercase tracking-widest text-peach">
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-auto grid grid-cols-1 gap-4 border-t border-warmwhite/10 pt-5">
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                    Deliverables
                  </p>
                  <ul className="mt-2 space-y-1 font-sans text-[12px] text-warmwhite/75">
                    {p.deliverables.map((d) => (
                      <li key={d}>· {d}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                    Tools
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {p.tools.map((t) => (
                      <li
                        key={t}
                        className="inline-flex h-6 items-center rounded-full border border-warmwhite/15 px-2 font-sans text-[10px] uppercase tracking-widest text-warmwhite/65"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="sr-only">
                Phase {i + 1} of {processPhases.length}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
