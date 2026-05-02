import { Reveal } from "@/components/ui/Reveal";
import { awards, stats } from "@/lib/data";

// Recognition — MMXXVII (post-audit). Merged Stats + Awards into one
// "industry recognition" surface so the homepage isn't carrying two
// number-led sections back-to-back. Stats live as a 4-up band right
// under the heading, awards grid stays untouched.

export function AwardsSection() {
  return (
    <section className="relative border-t border-warmwhite/15 bg-ink-950 py-28 md:py-40">
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              ◊ Industry Recognition
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

        {/* Stats band — merged from the deleted Stats section so the
            "by the numbers" rhythm lives next to its natural home. */}
        <ul className="mt-14 grid grid-cols-2 gap-y-8 border-y border-warmwhite/15 py-10 md:grid-cols-4 md:gap-x-10 md:py-12">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="border-l border-warmwhite/15 pl-6">
              <p className="display-num font-serif text-[clamp(2.4rem,5vw,4.4rem)] leading-none tracking-tightest text-warmwhite">
                {s.value}
              </p>
              <p className="mt-3 font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                {s.label}
              </p>
            </Reveal>
          ))}
        </ul>

        <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/15 md:grid-cols-2">
          {awards.map((a, i) => (
            <Reveal key={a.index} delay={i * 0.06}>
              <li className="flex h-full flex-col justify-between gap-10 bg-ink-950 p-8 md:p-10">
                <header className="flex items-start justify-between gap-6">
                  <span className="display-num font-serif text-5xl tracking-tightest text-warmwhite/80">
                    {a.index}
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                    {a.org} · {a.year}
                  </span>
                </header>
                <h3 className="font-serif text-[clamp(2rem,4vw,3.4rem)] leading-[1] tracking-tightest">
                  {a.title}
                </h3>
                <p className="max-w-prose font-sans text-sm leading-relaxed text-warmwhite/65">
                  {a.summary}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
