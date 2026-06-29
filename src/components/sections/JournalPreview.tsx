import Link from "next/link";
import { journal } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function JournalPreview() {
  return (
    <section className="relative border-t border-warmwhite/15 bg-ink-900 py-28 md:py-40">
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <header className="flex items-end justify-between gap-6">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              §10 — Journal
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest">
              Notes <span className="italic text-warmwhite/60">on the craft.</span>
            </h2>
          </div>
          <Link
            href="/journal"
            data-cursor="hover"
            data-cursor-label="ALL POSTS"
            className="hidden items-baseline gap-2 rounded-full border border-warmwhite/15 px-4 py-2 font-sans text-[10px] uppercase tracking-widest text-warmwhite/85 transition-colors hover:border-peach hover:text-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach md:inline-flex"
          >
            All Posts <span aria-hidden>↗</span>
          </Link>
        </header>

        <ul className="mt-16 divide-y divide-warmwhite/15 border-y border-warmwhite/15">
          {journal.slice(0, 4).map((p, i) => (
            <Reveal key={p.slug} as="li" delay={i * 0.05}>
                <Link
                  href={`/journal/${p.slug}`}
                  data-cursor="view"
                  data-cursor-label="READ"
                  aria-label={`Read: ${p.title} — ${p.category}, ${p.readingTime}, ${p.date}`}
                  className="group grid grid-cols-1 items-baseline gap-3 px-3 py-7 transition-colors hover:bg-warmwhite/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-peach md:grid-cols-12 md:gap-6"
                >
                  <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 md:col-span-2">
                    {p.date}
                  </span>
                  <span className="font-serif text-2xl leading-tight tracking-tighter text-warmwhite transition-colors duration-300 group-hover:text-peach md:col-span-7 md:text-3xl">
                    {p.title}
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 md:col-span-2">
                    {p.category}
                  </span>
                  <span className="text-right font-sans text-[10px] uppercase tracking-widest text-warmwhite/55 md:col-span-1">
                    {p.readingTime}
                  </span>
                </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
