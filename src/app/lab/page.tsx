import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { NoiseField } from "@/components/webgl/NoiseField";
import { Reveal } from "@/components/ui/Reveal";
import { experiments, arsenal } from "@/lib/data";
import { Marquee } from "@/components/ui/Marquee";

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
          <ul className="grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/10 md:grid-cols-2 lg:grid-cols-3">
            {experiments.map((e, i) => (
              <Reveal key={e.index} delay={i * 0.05}>
                <li className="flex h-full flex-col bg-ink-900">
                  <div className="relative aspect-square overflow-hidden">
                    <NoiseField seed={i * 3.7} />
                    <div className="absolute inset-0 flex items-center justify-center bg-ink-950/40">
                      <span className="font-serif text-[clamp(2.5rem,5vw,5rem)] leading-none tracking-tightest text-warmwhite">
                        {e.title.split(" ")[0]}
                      </span>
                    </div>
                    <span className="absolute left-5 top-5 font-sans text-[10px] uppercase tracking-widest text-warmwhite/70">
                      {e.index} · {e.category}
                    </span>
                    <span className="absolute right-5 top-5 rounded-full border border-warmwhite/30 px-3 py-1 font-sans text-[9px] uppercase tracking-widest text-warmwhite/80">
                      Live
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-6 p-6 md:p-8">
                    <div>
                      <h3 className="font-serif text-2xl leading-tight tracking-tighter md:text-3xl">
                        {e.title}
                      </h3>
                      <p className="mt-3 font-sans text-sm leading-relaxed text-warmwhite/65">
                        {e.summary}
                      </p>
                    </div>
                    <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/45">
                      {e.meta} · Initialize Demo →
                    </p>
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
