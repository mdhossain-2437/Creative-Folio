import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { journey, expertise } from "@/lib/data";
import { site } from "@/lib/site";
import Link from "next/link";
import { SkillsGraph } from "@/components/about/SkillsGraph";

export const metadata: Metadata = {
  title: "About — Story & Philosophy",
  description:
    "Delowar Hossain — creative developer in Bangladesh. Background, philosophy and the thinking behind the work across development, AI and interface design.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="§01 — About / Story"
        title="Delowar"
        italic="Hossain."
        description="Bridging brutalist editorial design and fluid, high-performance creative development. I build digital experiences that feel physical."
        meta={[
          { label: "Base", value: site.base },
          { label: "Studio", value: site.studio },
          { label: "Education", value: "B.A. Political Science" },
          { label: "Practice", value: "Self-Taught Engineer" },
        ]}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/resume"
            data-cursor="hover"
            data-cursor-label="RESUME"
            className="rounded-full border border-warmwhite/30 px-6 py-3 font-sans text-[11px] uppercase tracking-widest hover:border-warmwhite"
          >
            Download Resume
          </Link>
          <Link
            href="/contact"
            data-cursor="hover"
            data-cursor-label="WRITE"
            className="rounded-full bg-warmwhite px-6 py-3 font-sans text-[11px] uppercase tracking-widest text-ink-900 hover:bg-peach"
          >
            Get in Touch
          </Link>
        </div>
      </PageHero>

      <section className="bg-ink-900 py-28 md:py-40">
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-3">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/50">
              ◊ Philosophy
            </p>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <p className="font-serif text-[clamp(1.7rem,3.4vw,3.4rem)] leading-[1.08] tracking-tighter">
                I work where{" "}
                <span className="italic text-warmwhite/60">
                  creative frontend engineering, scalable architecture and AI integration
                </span>{" "}
                meet — building interfaces that feel distinct, perform well, and turn
                technical complexity into something{" "}
                <span className="italic text-peach">clear, useful, and memorable.</span>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-warmwhite/10 bg-ink-950 py-10">
        <Marquee
          size="lg"
          speed={50}
          items={["WEBGL", "THREE.JS", "GLSL", "REACT", "TAILWIND", "GSAP", "FRAMER", "WEBFLOW"]}
        />
      </section>

      <section className="bg-ink-900 py-28 md:py-40">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <header className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/50 md:col-span-3">
              ◊ Personal Signals
            </p>
            <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.96] tracking-tightest md:col-span-9">
              The {""}
              <span className="italic text-warmwhite/60">non-traditional path.</span>
            </h2>
          </header>
          <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/10 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                tag: "Base",
                title: "Joypurhat, Bangladesh",
                body: "Grounded locally, building for a global digital audience.",
              },
              {
                tag: "Path",
                title: "Self-Taught Developer",
                body: "Built through curiosity, repetition, experimentation and independent study.",
              },
              {
                tag: "Background",
                title: "Not from a CSE Track",
                body: "A non-traditional path that shaped a different way of thinking about technology.",
              },
              {
                tag: "Current Mode",
                title: "Web + AI Learning",
                body: "Growing deeper at the intersection of creative frontend craft and intelligent systems.",
              },
            ].map((s, i) => (
              <Reveal key={s.tag} delay={i * 0.06}>
                <div className="flex h-full flex-col gap-5 bg-ink-900 p-8 md:p-10">
                  <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/50">
                    {s.tag}
                  </p>
                  <h3 className="font-serif text-2xl leading-tight tracking-tighter md:text-3xl">
                    {s.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-warmwhite/65">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-warmwhite/10 bg-ink-950 py-28 md:py-40">
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-3">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/50">
              ◊ The Journey
            </p>
          </div>
          <ol className="md:col-span-9">
            {journey.map((j, i) => (
              <Reveal key={j.range} delay={i * 0.05}>
                <li className="grid grid-cols-12 items-baseline gap-4 border-b border-warmwhite/10 py-8 last:border-b-0">
                  <span className="col-span-12 font-mono text-[11px] uppercase tracking-widest text-warmwhite/50 md:col-span-3">
                    {j.range}
                  </span>
                  <h3 className="col-span-12 font-serif text-3xl leading-tight tracking-tighter text-warmwhite md:col-span-5 md:text-4xl">
                    {j.title}
                  </h3>
                  <p className="col-span-12 font-sans text-sm leading-relaxed text-warmwhite/65 md:col-span-4">
                    {j.summary}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ink-900 py-28 md:py-40">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/50">
            ◊ Expertise
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.96] tracking-tightest">
            6 domains, <span className="italic text-warmwhite/60">one practice.</span>
          </h2>
          <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-warmwhite/65">
            Drag any node to test the springs. Click a cluster to dim everything that isn&apos;t
            it — the graph re-settles around your focus.
          </p>
          <div className="mt-10">
            <SkillsGraph />
          </div>
          <ul className="mt-10 flex flex-wrap gap-3">
            {expertise.map((e) => (
              <li
                key={e}
                className="rounded-full border border-warmwhite/20 px-5 py-3 font-sans text-[11px] uppercase tracking-widest text-warmwhite/85"
              >
                {e}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
