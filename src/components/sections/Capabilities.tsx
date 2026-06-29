import Link from "next/link";
import { services } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function Capabilities() {
  return (
    <section className="relative border-t border-warmwhite/15 bg-ink-900 py-28 md:py-40">
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <header className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 md:col-span-3">
            §08 — Expertise
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest md:col-span-9">
            What I do, <span className="italic text-warmwhite/60">in detail.</span>
          </h2>
        </header>

        <ul className="mt-16 divide-y divide-warmwhite/15 border-t border-warmwhite/15">
          {services.map((s, i) => (
            <Reveal
              key={s.index}
              as="li"
              delay={i * 0.05}
              className="grid grid-cols-1 gap-6 py-10 md:grid-cols-12 md:gap-10 md:py-14"
            >
                <p className="display-num font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 md:col-span-1">
                  {s.index}
                </p>
                <h3 className="font-serif text-[clamp(2rem,5vw,4.5rem)] leading-[0.96] tracking-tightest md:col-span-4">
                  {s.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-warmwhite/70 md:col-span-4 md:text-base">
                  {s.summary}
                </p>
                {/* Tag pills — always rendered as a strict 2×2 grid so all four
                    services share the exact same visual rhythm regardless of
                    individual tag length (fixes the previous flex-wrap where
                    services 01 and 04 looked taller/shorter than 02 and 03). */}
                <ul className="grid grid-cols-2 gap-2 self-center md:col-span-3 md:justify-end">
                  {s.tags.slice(0, 4).map((t) => (
                    <li
                      key={t}
                      className="inline-flex h-8 items-center justify-center whitespace-nowrap rounded-full border border-warmwhite/20 px-3 font-sans text-[10px] uppercase tracking-widest text-warmwhite/75 transition-colors hover:border-peach/60 hover:text-peach"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
            </Reveal>
          ))}
        </ul>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-warmwhite/15 pt-10">
          <p className="font-sans text-[11px] uppercase tracking-widest text-warmwhite/55">
            Process · Discovery → Design → Prototype → Production
          </p>
          <Link
            href="/services"
            data-cursor="hover"
            data-cursor-label="SERVICES"
            className="inline-flex items-center gap-2 rounded-full border border-warmwhite/15 px-4 py-2 font-sans text-[10px] uppercase tracking-widest text-warmwhite/85 transition-colors hover:border-peach hover:text-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
          >
            View Services <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
