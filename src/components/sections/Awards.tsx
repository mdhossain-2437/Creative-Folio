import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { awards } from "@/lib/data";

export function AwardsSection() {
  return (
    <section className="relative border-t border-warmwhite/15 bg-ink-950 py-28 md:py-40">
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              <ScrambleText>§07 — Industry Recognition</ScrambleText>
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest">
              Awards <span className="italic text-warmwhite/60">&amp;</span> Mentions
            </h2>
          </div>
          <p className="md:col-span-5 max-w-md font-sans text-base leading-relaxed text-warmwhite/65 md:text-lg">
            A short list of work that has been recognised by international design
            and engineering juries — beyond the dopamine, validation that the
            craft is travelling.
          </p>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/15 md:grid-cols-2">
          {awards.map((a, i) => (
            <Reveal key={a.index} delay={i * 0.06}>
              <TiltCard
                as="li"
                max={4}
                className="relative flex h-full flex-col justify-between gap-10 overflow-hidden bg-ink-950 p-8 md:p-10"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 [background:radial-gradient(280px_circle_at_var(--tilt-mx,50%)_var(--tilt-my,50%),rgba(227,191,180,0.18),transparent_60%)] hover:opacity-100"
                />
                <header className="relative flex items-start justify-between gap-6">
                  <span className="display-num font-serif text-5xl tracking-tightest text-warmwhite/80">
                    {a.index}
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                    {a.org} · {a.year}
                  </span>
                </header>
                <h3 className="relative font-serif text-[clamp(2rem,4vw,3.4rem)] leading-[1] tracking-tightest">
                  {a.title}
                </h3>
                <p className="relative max-w-prose font-sans text-sm leading-relaxed text-warmwhite/65">
                  {a.summary}
                </p>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
