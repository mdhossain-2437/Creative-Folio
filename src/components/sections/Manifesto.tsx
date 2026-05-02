import { Reveal } from "@/components/ui/Reveal";

export function Manifesto() {
  return (
    <section className="relative border-t border-warmwhite/15 bg-ink-900 py-28 md:py-40">
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
          ◊ Manifesto
        </p>
        <Reveal>
          <p className="mt-10 max-w-[1200px] font-serif text-[clamp(1.7rem,3.4vw,3.6rem)] leading-[1.08] tracking-tighter text-warmwhite">
            I believe an interface should disappear, leaving only{" "}
            <span className="italic text-peach">the canvas</span> and the content.
            I build digital products at the intersection of brutalist editorial
            design and fluid, high-performance creative development —{" "}
            <span className="italic text-warmwhite/60">
              where typography, motion, and engineering converge into a single
              physical-feeling experience.
            </span>
          </p>
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

function Pillar({ tag, title, body }: { tag: string; title: string; body: string }) {
  return (
    <Reveal className="border-t border-warmwhite/15 pt-6">
      <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">{tag}</p>
      <h3 className="mt-4 font-serif text-3xl tracking-tightest">{title}</h3>
      <p className="mt-3 font-sans text-sm leading-relaxed text-warmwhite/65">{body}</p>
    </Reveal>
  );
}
