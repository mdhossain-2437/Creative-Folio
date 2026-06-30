import Link from "@/components/ui/PerformanceLink";
import { Reveal } from "@/components/ui/Reveal";
import { WeightShift } from "@/components/ui/WeightShift";
import { ScrollScrubText } from "@/components/ui/ScrollScrubText";
import { site } from "@/lib/site";

export function Manifesto() {
  return (
    <section className="relative border-t border-warmwhite/15 bg-ink-900 py-28 md:py-40">
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
          §01 — Manifesto
        </p>
        <Reveal>
          <p className="mt-10 max-w-[1200px] font-serif text-[clamp(1.7rem,3.4vw,3.6rem)] leading-[1.08] tracking-tighter text-warmwhite">
            <ScrollScrubText
              text="I believe an interface should disappear, leaving only"
              className="inline"
              as="span"
            />{" "}
            <span className="italic text-peach">the canvas</span>{" "}
            <ScrollScrubText
              text="and the content. I build digital products at the intersection of brutalist editorial design and fluid, high-performance creative development —"
              className="inline"
              as="span"
            />{" "}
            <span className="italic text-warmwhite/60">
              <ScrollScrubText
                text="where typography, motion, and engineering converge into a single physical-feeling experience."
                className="inline"
                as="span"
              />
            </span>
          </p>
        </Reveal>

        {/* Practitioner card — quick, citation-friendly statement of who is
            actually behind this manifesto. Mentions Joypurhat / Bangladesh,
            self-taught practice, and the formal CS programme at UoPeople so
            both human readers and AI engines have a clean fact block. */}
        <Reveal>
          <div className="mt-12 flex flex-col gap-6 rounded-2xl border border-warmwhite/12 bg-ink-950/40 p-6 md:flex-row md:items-center md:justify-between md:gap-12 md:p-8">
            <div className="flex flex-col gap-2">
              <p className="font-sans text-[10px] uppercase tracking-widest text-peach">
                ◊ Practitioner
              </p>
              <p className="max-w-2xl font-sans text-base leading-relaxed text-warmwhite/85 md:text-lg">
                <span className="text-warmwhite">{site.name}</span> —
                self-taught creative developer from {site.location}, currently
                an aspiring software engineer reading{" "}
                <a
                  href="https://www.uopeople.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-cursor-label="UoPeople"
                  className="text-warmwhite underline-offset-4 hover:text-peach hover:underline"
                >
                  B.Sc. Computer Science at University of the People
                </a>
                . Building for the web since {site.yearStarted}.
              </p>
            </div>
            <Link
              href="/about"
              data-cursor="hover"
              data-cursor-label="STORY"
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-warmwhite/25 px-5 py-2.5 font-sans text-[10px] uppercase tracking-widest text-warmwhite/85 transition-colors hover:border-peach hover:text-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach md:self-auto"
            >
              Full story <span aria-hidden>↗</span>
            </Link>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-warmwhite/15 pt-10 md:grid-cols-3 md:gap-16">
          <Pillar
            tag="Direction"
            title="Editorial Restraint"
            body="Massive whitespace. Strict grids. Type that demands attention. Decisions, not decoration."
          />
          <Pillar
            tag="Engineering"
            title="Performance Discipline"
            body="Sub-50 ms interactions. 60 fps motion. Lighthouse 95+. Craft, measured."
          />
          <Pillar
            tag="System"
            title="Production-Grade Motion"
            body="Choreographed scroll, GSAP timelines, custom shaders — repeatable, accessible, calm."
          />
        </div>
      </div>
    </section>
  );
}

function Pillar({
  tag,
  title,
  body,
}: {
  tag: string;
  title: string;
  body: string;
}) {
  return (
    <Reveal className="border-t border-warmwhite/15 pt-6">
      <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
        {tag}
      </p>
      <h3 className="mt-4 font-serif text-3xl tracking-tightest">{title}</h3>
      <p className="mt-3 font-sans text-sm leading-relaxed text-warmwhite/65">
        <WeightShift>{body}</WeightShift>
      </p>
    </Reveal>
  );
}
