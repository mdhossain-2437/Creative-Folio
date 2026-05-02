import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { LabDemo } from "@/components/lab/LabDemo";
import { LabRandomButton } from "@/components/lab/LabRandomButton";
import { LabCardCopyLink } from "@/components/lab/LabCardCopyLink";
import { Reveal } from "@/components/ui/Reveal";
import { experiments, arsenal } from "@/lib/data";
import { Marquee } from "@/components/ui/Marquee";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Lab — Experiments",
  description:
    "Technical explorations: WebGL, GLSL shaders, motion systems and creative coding patterns. Where code meets art.",
};

export default function LabPage() {
  return (
    <>
      <PageHero
        eyebrow="§02 — Experimentation"
        title="The"
        italic="Lab."
        description="A collection of technical explorations focusing on WebGL, GLSL shaders, audio-reactive systems and creative coding patterns. Where code meets art."
        meta={[
          { label: "Live demos", value: experiments.length.toString() },
          { label: "Tech", value: "WebGL · GLSL" },
          { label: "Updated", value: "Weekly" },
        ]}
      />

      <section className="bg-ink-900 py-16 md:py-24">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/45">
              ◊ {experiments.length} live experiments · hover any tile to feel it react
            </p>
            <LabRandomButton slugs={experiments.map((x) => x.slug)} />
          </div>
          <ul className="grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/10 md:grid-cols-2 lg:grid-cols-3">
            {experiments.map((e, i) => (
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
        </div>
      </section>

      <section className="border-y border-warmwhite/10 bg-ink-950 py-12">
        <Marquee
          speed={48}
          items={[
            "GLSL · FRAGMENT SHADER",
            "RAYMARCHING · SDF",
            "GPGPU · PARTICLES",
            "CURL NOISE · FBM",
            "WEB AUDIO · FFT",
            "VARIABLE FONTS",
            "GRAY-SCOTT · REACTION",
            "VORONOI · GEOMETRY",
            "BOIDS · FLOCKING",
            "LISSAJOUS · PARAMETRIC",
          ]}
        />
      </section>

      <section className="border-t border-warmwhite/10 bg-ink-900 py-28 md:py-40">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <header className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/50 md:col-span-3">
              §03 — The Arsenal
            </p>
            <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest md:col-span-9">
              The tools <span className="italic text-warmwhite/60">behind the work.</span>
            </h2>
          </header>
          <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/10 md:grid-cols-2 lg:grid-cols-4">
            {arsenal.map((g) => (
              <div key={g.title} className="bg-ink-900 p-8 md:p-10">
                <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/45">
                  {g.title}
                </p>
                <ul className="mt-6 space-y-4 border-t border-warmwhite/10 pt-6">
                  {g.items.map((it) => (
                    <li key={it} className="font-serif text-xl tracking-tighter text-warmwhite">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
