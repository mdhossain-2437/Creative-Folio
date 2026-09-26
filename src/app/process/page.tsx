import type { Metadata } from "next";
import Link from "@/components/ui/PerformanceLink";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { process as phases } from "@/lib/data";
import { PageSchema } from "@/components/seo/PageSchema";

export const metadata: Metadata = {
  alternates: { canonical: "/process" },
  title: "Process — How I work",
  description:
    "The four-phase engineering workflow: Scaffolding, Shaders, Motion, Hardening. How I move from technical architecture to a shipped, award-grade web experience.",
};

const TIMELINE = ["SCAFFOLD", "SHADERS", "MOTION", "HARDEN"];

export default function ProcessPage() {
  return (
    <>
      <PageSchema
        path="/process"
        name="Process — How I work"
        description="The four-phase engineering workflow: Scaffolding, Shaders, Motion, Hardening. How I move from technical architecture to a shipped, award-grade web experience."
        crumbs={[{ name: "Home", href: "/" }, { name: "Process", href: "/process" }]}
      />
      <PageHero
        eyebrow="Workflow & Engineering"
        title="The"
        italic="Process."
        description="Four creative engineering workflows, calibrated for high-performance web experiences. Each one establishes the foundation for the next — no production code until the token and shader architecture is settled."
        meta={[
          { label: "Phases", value: "04" },
          { label: "Default duration", value: "6 — 9 weeks" },
          { label: "Owners", value: "Solo + cherry-picked partners" },
          { label: "Output", value: "Production code + handover" },
        ]}
      />

      <section className="bg-ink-900 py-16">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <ol className="grid grid-cols-2 gap-px overflow-hidden bg-warmwhite/15 md:grid-cols-4">
            {TIMELINE.map((step, i) => (
              <li key={step} className="bg-ink-900 p-6 text-center md:p-10">
                <span className="font-mono text-xs tracking-normal text-warmwhite/85">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 font-serif text-3xl tracking-tight text-warmwhite md:text-5xl">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {phases.map((p, i) => (
        <section
          key={p.phase}
          className={`relative border-t border-warmwhite/15 py-24 md:py-32 ${
            i % 2 === 0 ? "bg-ink-900" : "bg-ink-950"
          }`}
        >
          <div className="mx-auto max-w-[1640px] px-6 md:px-10">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
              <div className="md:col-span-4 md:sticky md:top-28 md:self-start">
                <span className="block font-serif text-[clamp(7rem,18vw,16rem)] leading-none tracking-tightest text-warmwhite/80">
                  0{i + 1}
                </span>
                <p className="mt-3 font-mono text-xs tracking-normal text-warmwhite/85">
                  {p.phase} · {TIMELINE[i]}
                </p>
              </div>
              <div className="md:col-span-8">
                <Reveal>
                  <h2 className="font-serif text-[clamp(2.6rem,5vw,5rem)] leading-[0.96] tracking-tightest text-warmwhite">
                    {p.title}
                  </h2>
                </Reveal>
                <p className="mt-8 max-w-2xl font-serif text-2xl leading-[1.25] tracking-tight text-warmwhite/90 md:text-3xl">
                  {p.summary}
                </p>
                <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {(
                    [
                      ["Inputs", "Design tokens · CSS vars · type scale"],
                      ["Output", "Token schema · App Router scaffolding"],
                      ["Tools", "Tailwind CSS · Next.js 16 · TypeScript 5.9"],
                      ["Days", "5 — 8 working days"],
                      ["Inputs", "SIMD math · fbm noise · DPR budget"],
                      ["Output", "GLSL shaders · WebGL2 canvas harness"],
                      ["Tools", "raw WebGL2 · GLSL · Three.js"],
                      ["Days", "10 — 14 working days"],
                      ["Inputs", "rAF bus · Lenis scroll · damping constant"],
                      ["Output", "Synchronized scroll · zero-lag loop"],
                      ["Tools", "Lenis · GSAP · rafBus.ts · damp.ts"],
                      ["Days", "10 — 12 working days"],
                      ["Inputs", "CSP headers · INP latency · CLS shift"],
                      ["Output", "Grade A security · 100/100 Lighthouse"],
                      ["Tools", "securityheaders.com · PageSpeed · ESLint"],
                      ["Days", "8 — 10 working days"],
                    ] as [string, string][]
                  )
                    .slice(i * 4, i * 4 + 4)
                    .map(([k, v]) => (
                      <li
                        key={`${p.phase}-${k}`}
                        className="flex items-center justify-between border-y border-warmwhite/15 py-3 font-mono text-xs tracking-normal text-warmwhite/85"
                      >
                        <span className="text-warmwhite/90">{k}</span>
                        <span className="text-peach normal-case tracking-tight">{v}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="border-t border-warmwhite/15 bg-ink-950 py-24 md:py-32">
        <div className="mx-auto flex max-w-[1640px] flex-wrap items-center justify-between gap-6 px-6 md:px-10">
          <p className="max-w-md font-serif text-3xl tracking-tight text-warmwhite md:text-5xl">
            Like the process? Let&apos;s start the conversation.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              data-cursor="hover"
              data-cursor-label="WRITE"
              className="inline-flex items-center gap-2 rounded-full bg-warmwhite px-6 py-3 font-sans text-xs font-medium text-ink-900 transition-colors hover:bg-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
            >
              Brief me <span aria-hidden>↗</span>
            </Link>
            <Link
              href="/services"
              data-cursor="hover"
              data-cursor-label="TIERS"
              className="inline-flex items-center gap-2 rounded-full border border-warmwhite/30 px-6 py-3 font-sans text-xs font-medium text-warmwhite transition-colors hover:border-peach hover:text-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
            >
              See tiers <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
