import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { journal } from "@/lib/data";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Thoughts, experiments and technical deep-dives on creative development, motion design, AI and the discipline of craft.",
};

export default function JournalPage() {
  return (
    <>
      <PageHero
        eyebrow="§04 — Journal"
        title="Journal"
        italic="& Notes."
        description="Thoughts, experiments and technical deep-dives into creative development and computational design."
        meta={[
          { label: "Posts", value: journal.length.toString() },
          { label: "Topics", value: "WebGL · Type · AI" },
          { label: "Cadence", value: "Monthly" },
        ]}
      />

      <section className="bg-ink-900 py-12 md:py-16">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <div className="grid grid-cols-12 items-baseline gap-3 border-b border-warmwhite/10 pb-3 font-sans text-[10px] uppercase tracking-widest text-warmwhite/45">
            <span className="col-span-2">Date</span>
            <span className="col-span-7">Title</span>
            <span className="col-span-2">Category</span>
            <span className="col-span-1 text-right">Read</span>
          </div>
          <ul className="divide-y divide-warmwhite/10">
            {journal.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.04}>
                <li>
                  <Link
                    href={`/journal/${p.slug}`}
                    data-cursor="view"
                    data-cursor-label="READ"
                    className="grid grid-cols-12 items-baseline gap-3 py-8 transition-colors hover:bg-warmwhite/[0.02]"
                  >
                    <span className="col-span-2 font-mono text-[11px] uppercase tracking-widest text-warmwhite/50">
                      {p.date}
                    </span>
                    <span className="col-span-7 font-serif text-2xl leading-tight tracking-tighter md:text-3xl">
                      {p.title}
                    </span>
                    <span className="col-span-2 font-sans text-[10px] uppercase tracking-widest text-warmwhite/45">
                      {p.category}
                    </span>
                    <span className="col-span-1 text-right font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                      {p.readingTime}
                    </span>
                    <p className="col-span-12 max-w-3xl font-sans text-sm leading-relaxed text-warmwhite/55 md:col-span-9 md:col-start-3">
                      {p.excerpt}
                    </p>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
