import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { works } from "@/lib/data";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";

type Params = { slug: string };

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const w = works.find((x) => x.slug === slug);
  if (!w) return {};
  return {
    title: `${w.title} — Case Study`,
    description: w.summary,
  };
}

export default async function CaseStudy({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) notFound();

  const idx = works.findIndex((w) => w.slug === work.slug);
  const next = works[(idx + 1) % works.length];

  return (
    <>
      <PageHero
        eyebrow={`§ Case ${work.index} — ${work.category}`}
        title={work.title}
        italic={work.year}
        description={work.summary}
        meta={[
          { label: "Year", value: work.year },
          { label: "Role", value: work.role[0] ?? "Lead" },
          { label: "Stack", value: work.stack.slice(0, 2).join(" · ") },
          ...(work.award ? [{ label: "Award", value: work.award }] : []),
        ]}
        noise={false}
      />

      <section className="bg-ink-900 py-16 md:py-24">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <Reveal>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md">
              <Image src={work.cover} alt={work.title} fill priority className="object-cover" />
              <div
                className="absolute inset-0 mix-blend-multiply"
                style={{ background: work.accent + "33" }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-warmwhite/10 bg-ink-900 py-24 md:py-32">
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-3">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/50">
              ◊ Brief
            </p>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-serif text-[clamp(2rem,4vw,4rem)] leading-[1.05] tracking-tightest">
              <span className="italic text-warmwhite/65">{work.title}</span> is a
              study in restraint — the kind of project where the loudest decision
              is what we chose <em className="italic text-peach">not</em> to add.
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
              <p className="font-sans text-base leading-relaxed text-warmwhite/70">
                The brief asked for an experience that could carry brand without
                shouting it — interaction that felt physical, type that read like
                editorial, performance that survived a 4G connection.
              </p>
              <p className="font-sans text-base leading-relaxed text-warmwhite/70">
                We answered with a single noise field, a strict editorial grid,
                and a small library of motion primitives. Everything else is
                composition.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-warmwhite/10 bg-ink-950 py-24 md:py-32">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <ul className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
            {[
              { k: "Lighthouse", v: "98" },
              { k: "Time to Ship", v: "10w" },
              { k: "Frame Budget", v: "16ms" },
              { k: "Bundle (gz)", v: "62kb" },
            ].map((s) => (
              <li key={s.k} className="border-l border-warmwhite/15 pl-6">
                <p className="display-num font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-none tracking-tightest text-warmwhite">
                  {s.v}
                </p>
                <p className="mt-2 font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                  {s.k}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-warmwhite/10 bg-ink-900 py-24 md:py-32">
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-3">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/50">
              ◊ Stack
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-6 md:col-span-9 md:grid-cols-4">
            {work.stack.map((s) => (
              <li key={s} className="border-t border-warmwhite/10 pt-4">
                <p className="font-serif text-2xl tracking-tighter">{s}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-warmwhite/10 bg-ink-950 py-24 md:py-32">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
            Next case
          </p>
          <Link
            href={`/works/${next.slug}`}
            data-cursor="view"
            data-cursor-label="NEXT"
            className="group mt-4 flex items-end justify-between"
          >
            <h3 className="font-serif text-[clamp(2.5rem,8vw,8rem)] leading-[0.9] tracking-tightest text-warmwhite group-hover:text-peach">
              {next.title}
            </h3>
            <span aria-hidden className="text-3xl">
              ↗
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
