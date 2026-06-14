"use client";

// ProcessSection — Concept → Shader.
//
// A click-driven carousel. One phase (Discovery · Design · Prototype ·
// Production) is shown at a time and the viewer steps through them with the
// phase pills, the prev / next arrows, or the left / right arrow keys.
//
// There is intentionally NO scroll-pinning or horizontal scroll-jacking here:
// the section is a normal block in the page flow, so scrolling past it behaves
// like every other section instead of pinning the viewport and stranding the
// reader on a blank screen / the final phase.

import { useEffect, useRef, useState } from "react";
import { process as processPhases } from "@/lib/data";
import { ScrambleText } from "@/components/ui/ScrambleText";

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const last = processPhases.length - 1;

  const go = (idx: number) => setActive(Math.max(0, Math.min(last, idx)));

  // Left / right arrow keys step the carousel while the section is in view.
  // Only ArrowLeft / ArrowRight are intercepted so normal page scrolling
  // (PageUp / PageDown / Space) is never hijacked.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const inView = r.top < window.innerHeight && r.bottom > 0;
      if (!inView) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActive((a) => Math.min(last, a + 1));
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [last]);

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-warmwhite/15 bg-ink-900 py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <header className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 md:col-span-3">
            <ScrambleText>§09 — Process</ScrambleText>
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest md:col-span-9">
            Concept <span className="italic text-warmwhite/60">to</span> Shader.
          </h2>
        </header>

        {/* Jump-to-phase pills — the primary carousel navigation */}
        <nav
          aria-label="Process phases"
          className="mt-12 flex flex-wrap items-center gap-2"
        >
          {processPhases.map((p, i) => (
            <button
              key={p.phase}
              type="button"
              onClick={() => go(i)}
              data-cursor="hover"
              data-cursor-label={`PHASE ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              className={`rounded-full border px-3 py-1.5 font-sans text-[10px] uppercase tracking-widest transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach ${
                i === active
                  ? "border-peach/70 bg-peach/15 text-warmwhite"
                  : "border-warmwhite/20 text-warmwhite/65 hover:border-warmwhite/45 hover:text-warmwhite"
              }`}
            >
              {p.phase} · {p.title}
            </button>
          ))}
        </nav>

        {/* Carousel viewport — one phase visible, the track slides on change */}
        <div className="relative mt-10 overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {processPhases.map((p, i) => (
              <article
                key={p.phase}
                className="relative flex w-full shrink-0 flex-col gap-6 px-1"
                aria-current={i === active ? "true" : undefined}
                aria-hidden={i === active ? undefined : true}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-0 top-0 font-serif text-[clamp(6rem,18vw,16rem)] leading-none tracking-tightest text-warmwhite/[0.05]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative z-10 max-w-3xl">
                  <PhasePanel phase={p} index={i} variant="pinned" />
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Controls — prev / next arrows + progress rail + readout */}
        <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(active - 1)}
              disabled={active === 0}
              data-cursor="hover"
              aria-label="Previous phase"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-warmwhite/20 font-sans text-sm text-warmwhite/75 transition-colors hover:border-warmwhite/45 hover:text-warmwhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-warmwhite/20 disabled:hover:text-warmwhite/75"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              disabled={active === last}
              data-cursor="hover"
              aria-label="Next phase"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-warmwhite/20 font-sans text-sm text-warmwhite/75 transition-colors hover:border-warmwhite/45 hover:text-warmwhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-warmwhite/20 disabled:hover:text-warmwhite/75"
            >
              →
            </button>
          </div>

          <div className="flex-1">
            <div
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={processPhases.length}
              aria-valuenow={active + 1}
              aria-label="Process phase progress"
              className="flex items-center gap-2"
            >
              {processPhases.map((p, i) => (
                <div
                  key={p.phase}
                  className={`h-px flex-1 transition-colors duration-500 ${
                    i <= active ? "bg-peach" : "bg-warmwhite/20"
                  }`}
                />
              ))}
            </div>
            <p className="mt-3 font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              {processPhases[active]?.phase} · {processPhases[active]?.title} ·{" "}
              {processPhases[active]?.duration} ·{" "}
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(processPhases.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// PhasePanel — shared phase markup so the carousel slides render the full
// information system: summary, ordered sub-steps, deliverables, and tools.
function PhasePanel({
  phase,
  index,
  variant,
}: {
  phase: (typeof processPhases)[number];
  index: number;
  variant: "pinned" | "grid";
}) {
  const isPinned = variant === "pinned";
  return (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-sans text-[10px] uppercase tracking-widest text-peach">
          {phase.phase}
        </span>
        <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
          {phase.duration}
        </span>
      </div>
      <h3
        className={
          isPinned
            ? "font-serif text-[clamp(2.4rem,5vw,5rem)] leading-[0.96] tracking-tightest"
            : "font-serif text-3xl leading-none tracking-tightest md:text-4xl"
        }
      >
        {phase.title}
      </h3>
      <p
        className={
          isPinned
            ? "max-w-xl font-sans text-base leading-relaxed text-warmwhite/85 md:text-lg"
            : "font-sans text-sm leading-relaxed text-warmwhite/65"
        }
      >
        {phase.summary}
      </p>

      <ol className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {phase.steps.map((s, i) => (
          <li
            key={s}
            className="flex items-start gap-3 font-sans text-[12px] uppercase tracking-widest text-warmwhite/70"
          >
            <span className="display-num shrink-0 text-peach">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="normal-case tracking-normal text-[13px] text-warmwhite/80">
              {s}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
            Deliverables
          </p>
          <ul className="mt-2 space-y-1 font-sans text-[12px] text-warmwhite/75">
            {phase.deliverables.map((d) => (
              <li key={d}>· {d}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
            Tools
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {phase.tools.map((t) => (
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

      <p className="sr-only">Phase {index + 1} of {processPhases.length}</p>
    </>
  );
}
