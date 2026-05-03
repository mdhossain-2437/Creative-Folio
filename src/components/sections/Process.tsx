"use client";

// ProcessSection — horizontally-pinned timeline of the studio's phases.
// Desktop ≥ 1024px and motion-on: GSAP ScrollTrigger pins the section and
// scrolls the phase track horizontally as the viewer keeps scrolling
// vertically. Touch + reduced-motion fall back to the original 4-column
// grid, untouched. Numbers + progress rail update with the active phase.

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
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    if (reduced || !wide) return;

    setPinned(true);
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const distance = () => track.scrollWidth - window.innerWidth;
    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
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
            const idx = Math.min(
              processPhases.length - 1,
              Math.round(self.progress * (processPhases.length - 1))
            );
            setActive(idx);
          },
        },
      });
      return () => {
        tween.kill();
      };
    }, wrap);

    return () => {
      ctx.revert();
    };
  }, []);

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

          <ol className="mt-16 grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/15 md:grid-cols-4">
            {processPhases.map((p, i) => (
              <Reveal key={p.phase} delay={i * 0.06}>
                <li className="flex h-full flex-col gap-6 bg-ink-900 p-8 md:p-10">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                    {p.phase}
                  </span>
                  <h3 className="font-serif text-3xl leading-none tracking-tightest md:text-4xl">
                    {p.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-warmwhite/65">
                    {p.summary}
                  </p>
                </li>
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
          ↔ scroll · {String(active + 1).padStart(2, "0")} / {String(processPhases.length).padStart(2, "0")}
        </p>
      </div>

      {/* Bottom progress rail */}
      <div className="pointer-events-none absolute inset-x-0 bottom-10 z-10 mx-auto max-w-[1640px] px-10">
        <div className="flex items-center gap-2">
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
          {processPhases[active]?.phase} · {processPhases[active]?.title}
        </p>
      </div>

      <div ref={trackRef} className="flex h-full will-change-transform">
        {processPhases.map((p, i) => (
          <article
            key={p.phase}
            className="relative flex h-full w-screen shrink-0 flex-col justify-center px-12 md:px-20"
          >
            <span
              aria-hidden
              className="font-serif text-[clamp(8rem,22vw,20rem)] leading-none tracking-tightest text-warmwhite/[0.04]"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="-mt-32 max-w-2xl">
              <p className="font-sans text-[10px] uppercase tracking-widest text-peach">
                {p.phase}
              </p>
              <h3 className="mt-4 font-serif text-[clamp(2.4rem,5vw,5rem)] leading-[0.96] tracking-tightest">
                {p.title}
              </h3>
              <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-warmwhite/85 md:text-lg">
                {p.summary}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
