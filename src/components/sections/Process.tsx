"use client";

// ProcessSection — Concept → Shader, fully readable.
//
// Every phase (Discovery · Design · Prototype · Production) renders as a
// rich, equally-treated panel with summary, ordered sub-steps, deliverables,
// tools and a duration tag. Two presentation modes:
//
//   · Desktop ≥ 1024px + motion-on: ScrollTrigger pins the section and
//     the horizontal phase track scrolls as the viewer continues
//     scrolling vertically. The bottom rail + jump pills + numeric
//     readout all update with the active phase. Arrow keys jump
//     forward / backward.
//
//   · Touch / reduced-motion / narrow: the same panels render as a
//     clean editorial grid (or stacked column on mobile) so nothing is
//     hidden behind a scrub interaction.
//
// Previously this component only showed Phase I (Discovery) in detail
// during scrolling; the others were missing the system. Now every panel
// is identical in structure and treatment.

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { process as processPhases } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { ScrambleText } from "@/components/ui/ScrambleText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProcessSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);

  // Decide whether to pin: desktop ≥1024px + motion on. Runs once. Flipping
  // `pinned` swaps the editorial grid fallback for the horizontal-scroll layout
  // (whose section/track carry wrapRef/trackRef).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    if (reduced || !wide) return;
    setPinned(true);
  }, []);

  // Wire the ScrollTrigger horizontal scrub AFTER the pinned layout has
  // actually mounted — wrapRef/trackRef only exist once `pinned` is true, so
  // this effect MUST depend on `pinned`.
  //
  // The earlier single-effect version called setPinned(true) and then read the
  // refs in the SAME tick, before the pinned layout had rendered, so the refs
  // were null, the effect early-returned, and ScrollTrigger never initialised —
  // the phase track stayed frozen on "Discovery" with no way to scrub to the
  // other four phases. Splitting it fixes exactly that.
  useEffect(() => {
    if (!pinned) return;
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const distance = () => track.scrollWidth - window.innerWidth;
    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          pin: true,
          scrub: 0.6,
          start: "top top",
          end: () => `+=${distance() + window.innerHeight * 0.2}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            scrollTriggerRef.current = self;
            const idx = Math.min(
              processPhases.length - 1,
              Math.round(self.progress * (processPhases.length - 1))
            );
            setActive(idx);
          },
        },
      });
    }, wrap);

    // Recompute once layout + fonts settle so track.scrollWidth (and the
    // resulting scroll distance) is measured correctly.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [pinned]);

  // Jump the page scroll position so a given phase becomes active.
  // Used by the "jump-to-phase" pills + keyboard arrow nav. Falls back
  // to a no-op when ScrollTrigger isn't yet wired (mobile / reduced
  // motion fallback already shows every phase in full anyway).
  const jumpTo = (idx: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const clamped = Math.max(0, Math.min(processPhases.length - 1, idx));
    const progress = clamped / (processPhases.length - 1);
    const target = st.start + (st.end - st.start) * progress;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  useEffect(() => {
    if (!pinned) return;
    const onKey = (e: KeyboardEvent) => {
      // Only react when the pinned section is roughly in view.
      const wrap = wrapRef.current;
      if (!wrap) return;
      const r = wrap.getBoundingClientRect();
      const inView = r.top < window.innerHeight && r.bottom > 0;
      if (!inView) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        jumpTo(active + 1);
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        jumpTo(active - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pinned, active]);

  if (!pinned) {
    return (
      <section className="relative border-t border-warmwhite/15 bg-ink-900 py-28 md:py-40">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <header className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 md:col-span-3">
              <ScrambleText>§09 — Process</ScrambleText>
            </p>
            <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest md:col-span-9">
              Concept <span className="italic text-warmwhite/60">to</span> Shader.
            </h2>
          </header>

          <ol className="mt-16 grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/15 md:grid-cols-2 xl:grid-cols-4">
            {processPhases.map((p, i) => (
              <Reveal key={p.phase} as="li" delay={i * 0.06} className="flex h-full flex-col gap-6 bg-ink-900 p-8 md:p-10">
                <PhasePanel phase={p} index={i} variant="grid" />
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={wrapRef}
      className="relative h-screen overflow-hidden border-t border-warmwhite/15 bg-ink-900"
    >
      {/* Header sits over the pinned panel */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 mx-auto flex max-w-[1640px] items-end justify-between gap-6 px-10 pt-12">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
            <ScrambleText>§09 — Process</ScrambleText>
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2.2rem,4.4vw,4rem)] leading-[0.94] tracking-tightest">
            Concept <span className="italic text-warmwhite/60">to</span> Shader.
          </h2>
        </div>
        <p className="hidden font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 md:block">
          ↔ scroll · ← → keys · {String(active + 1).padStart(2, "0")} / {String(processPhases.length).padStart(2, "0")}
        </p>
      </div>

      {/* Jump-to-phase pills (top-right corner under the title) */}
      <nav
        aria-label="Process phases"
        className="pointer-events-auto absolute inset-x-0 top-32 z-10 mx-auto flex max-w-[1640px] flex-wrap items-center gap-2 px-10 md:top-40"
      >
        {processPhases.map((p, i) => (
          <button
            key={p.phase}
            type="button"
            onClick={() => jumpTo(i)}
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

      {/* Bottom progress rail */}
      <div className="pointer-events-none absolute inset-x-0 bottom-10 z-10 mx-auto max-w-[1640px] px-10">
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
          {processPhases[active]?.phase} · {processPhases[active]?.title} · {processPhases[active]?.duration}
        </p>
      </div>

      <div ref={trackRef} className="flex h-full will-change-transform">
        {processPhases.map((p, i) => (
          <article
            key={p.phase}
            className="relative flex h-full w-screen shrink-0 flex-col justify-center px-12 md:px-20"
            aria-current={i === active ? "true" : undefined}
          >
            <span
              aria-hidden
              className="absolute right-12 top-1/2 -translate-y-1/2 font-serif text-[clamp(8rem,22vw,20rem)] leading-none tracking-tightest text-warmwhite/[0.05] md:right-20"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="relative z-10 max-w-3xl">
              <PhasePanel phase={p} index={i} variant="pinned" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// PhasePanel — shared phase markup so the pinned-horizontal scroller and
// the fallback grid both render the *same* information system. The only
// difference is type sizing + spacing.
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
