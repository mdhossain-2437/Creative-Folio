import Link from "next/link";
import { services } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function Capabilities() {
  return (
    <section className="relative border-t border-warmwhite/10 bg-ink-900 py-28 md:py-40">
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <header className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/50 md:col-span-3">
            §04 — Expertise
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest md:col-span-9">
            What I do, <span className="italic text-warmwhite/60">in detail.</span>
          </h2>
        </header>

        <ul className="mt-16 divide-y divide-warmwhite/10 border-t border-warmwhite/10">
          {services.map((s, i) => (
            <Reveal key={s.index} delay={i * 0.05}>
              <li className="grid grid-cols-1 gap-6 py-10 md:grid-cols-12 md:gap-10 md:py-14">
                <p className="display-num font-sans text-[10px] uppercase tracking-widest text-warmwhite/40 md:col-span-1">
                  {s.index}
                </p>
                <h3 className="font-serif text-[clamp(2rem,5vw,4.5rem)] leading-[0.96] tracking-tightest md:col-span-5">
                  {s.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-warmwhite/70 md:col-span-4 md:text-base">
                  {s.summary}
                </p>
                <ul className="flex flex-wrap gap-2 md:col-span-2 md:justify-end">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-warmwhite/20 px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-warmwhite/65"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ul>

        <div className="mt-14 flex items-center justify-between border-t border-warmwhite/10 pt-10">
          <p className="font-sans text-[11px] uppercase tracking-widest text-warmwhite/55">
            Process · Discovery → Design → Prototype → Production
          </p>
          <Link
            href="/services"
            data-cursor="hover"
            data-cursor-label="SERVICES"
            className="font-sans text-[11px] uppercase tracking-widest text-warmwhite hover:text-peach"
          >
            View Services →
          </Link>
        </div>
      </div>
    </section>
  );
}
