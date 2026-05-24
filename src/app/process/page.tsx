import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { process as phases } from "@/lib/data";
import { PageSchema } from "@/components/seo/PageSchema";

export const metadata: Metadata = {
  title: "Process — How I work",
  description:
    "The four-phase studio process: Discovery, Design, Prototype, Production. How I move from a blank Figma file to a shipped, award-grade web experience.",
};

const TIMELINE = ["LISTEN", "SKETCH", "BUILD", "SHIP"];

export default function ProcessPage() {
  return (
    <>
      <PageSchema
        path="/process"
        name="Process — How I work"
        description="The four-phase studio process: Discovery, Design, Prototype, Production. How I move from a blank Figma file to a shipped, award-grade web experience."
        crumbs={[{ name: "Home", href: "/" }, { name: "Process", href: "/process" }]}
      />
      <PageHero
        eyebrow="§04 — How I work"
        title="The"
        italic="Process."
        description="Four phases, calibrated for ambitious creative briefs. Each one earns the right to the next — no production code until the design system is settled."
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
                <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
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
                <p className="mt-3 font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                  {p.phase} · {TIMELINE[i]}
                </p>
              </div>
              <div className="md:col-span-8">
                <Reveal>
                  <h2 className="font-serif text-[clamp(2.6rem,5vw,5rem)] leading-[0.96] tracking-tightest">
                    {p.title}
                  </h2>
                </Reveal>
                <p className="mt-8 max-w-2xl font-serif text-2xl leading-[1.25] tracking-tight text-warmwhite/85 md:text-3xl">
                  {p.summary}
                </p>
                <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {(
                    [
                      ["Inputs", "Brief · references · constraints"],
                      ["Output", "Concept doc · moodboard · plan"],
                      ["Tools", "Figma · Are.na · iA Writer"],
                      ["Days", "5 — 8 working days"],
                      ["Inputs", "Tokens · grid · type system"],
                      ["Output", "High-fidelity Figma · motion spec"],
                      ["Tools", "Figma · Lottie · After Effects"],
                      ["Days", "10 — 14 working days"],
                      ["Inputs", "Visual system · interaction map"],
                      ["Output", "Coded prototype · WebGL scenes"],
                      ["Tools", "Next.js · Three.js · GSAP"],
                      ["Days", "10 — 12 working days"],
                      ["Inputs", "Approved prototype · CMS plan"],
                      ["Output", "Shipped site · Loom handover"],
                      ["Tools", "Vercel · Cloudflare · Sanity"],
                      ["Days", "8 — 10 working days"],
                    ] as [string, string][]
                  )
                    .slice(i * 4, i * 4 + 4)
                    .map(([k, v]) => (
                      <li
                        key={`${p.phase}-${k}`}
                        className="flex items-center justify-between border-y border-warmwhite/15 py-3 font-mono text-[12px] uppercase tracking-widest text-warmwhite/55"
                      >
                        <span className="text-warmwhite/70">{k}</span>
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
              className="inline-flex items-center gap-2 rounded-full bg-warmwhite px-6 py-3 font-sans text-[11px] uppercase tracking-widest text-ink-900 transition-colors hover:bg-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
            >
              Brief me <span aria-hidden>↗</span>
            </Link>
            <Link
              href="/services"
              data-cursor="hover"
              data-cursor-label="TIERS"
              className="inline-flex items-center gap-2 rounded-full border border-warmwhite/30 px-6 py-3 font-sans text-[11px] uppercase tracking-widest text-warmwhite transition-colors hover:border-peach hover:text-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
            >
              See tiers <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
