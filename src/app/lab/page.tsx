import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { LabRandomButton } from "@/components/lab/LabRandomButton";
import { LabGrid } from "@/components/lab/LabGrid";
import { experiments, arsenal } from "@/lib/data";
import { Marquee } from "@/components/ui/Marquee";
import { PageSchema } from "@/components/seo/PageSchema";

export const metadata: Metadata = {
  title: "The Lab — Experiments",
  description:
    "Technical explorations: WebGL, GLSL shaders, motion systems and creative coding patterns. Where code meets art.",
};

export default function LabPage() {
  return (
    <>
      <PageSchema
        path="/lab"
        name="The Lab — Experiments"
        description="Technical explorations: WebGL, GLSL shaders, motion systems and creative coding patterns. Where code meets art."
        crumbs={[{ name: "Home", href: "/" }, { name: "Lab", href: "/lab" }]}
      />
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
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              ◊ {experiments.length} live experiments · hover any tile to feel it react
            </p>
            <LabRandomButton slugs={experiments.map((x) => x.slug)} />
          </div>
          <LabGrid experiments={experiments} />
        </div>
      </section>

      <section className="border-y border-warmwhite/15 bg-ink-950 py-12">
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

      <section className="border-t border-warmwhite/15 bg-ink-900 py-28 md:py-40">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <header className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 md:col-span-3">
              §03 — The Arsenal
            </p>
            <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest md:col-span-9">
              The tools <span className="italic text-warmwhite/60">behind the work.</span>
            </h2>
          </header>
          <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/15 md:grid-cols-2 lg:grid-cols-4">
            {arsenal.map((g) => (
              <div key={g.title} className="bg-ink-900 p-8 md:p-10">
                <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                  {g.title}
                </p>
                <ul className="mt-6 space-y-4 border-t border-warmwhite/15 pt-6">
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
