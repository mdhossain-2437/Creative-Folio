import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/PerformanceLink";
import { notFound } from "next/navigation";
import {
  publicRecognitionLabel,
  works,
  type Work,
  type WorkSection,
} from "@/lib/data";
import { site } from "@/lib/site";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CaseStudyGallery } from "@/components/works/CaseStudyGallery";
import { WorkVisitTracker } from "@/components/works/WorkVisitTracker";
import { SmartBackLink } from "@/components/works/SmartBackLink";

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
    alternates: { canonical: `/works/${w.slug}` },
  };
}

const KIND_LABEL: Record<WorkSection["kind"], string> = {
  brief: "01 · Brief",
  approach: "02 · Approach",
  solution: "03 · Solution",
  outcome: "04 · Outcome",
};

export default async function CaseStudy({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) notFound();

  const idx = works.findIndex((w) => w.slug === work.slug);
  const next = works[(idx + 1) % works.length];
  const prev = works[(idx - 1 + works.length) % works.length];
  const study = work.caseStudy;
  const recognitionLabel = publicRecognitionLabel(work.recognition);

  return (
    <>
      <WorkVisitTracker slug={work.slug} />
      <SmartBackLink />
      <PageHero
        eyebrow={`§ Case ${work.index} — ${work.category}`}
        title={work.title}
        italic={work.year}
        description={work.summary}
        meta={[
          { label: "Year", value: work.year },
          { label: "Role", value: work.role[0] ?? "Lead" },
          { label: "Stack", value: work.stack.slice(0, 2).join(" · ") },
          ...(recognitionLabel
            ? [
                {
                  label:
                    work.recognition?.status === "earned"
                      ? "Award"
                      : "Recognition target",
                  value: recognitionLabel,
                },
              ]
            : []),
        ]}
        noise={false}
      />

      <CoverHero work={work} />

      {study ? (
        <>
          <BriefAndMeta work={work} />
          <SectionsBlock work={work} />
          {study.gallery.length > 0 && <GallerySection work={work} />}
          <MetricsSection work={work} />
          <DeliverablesSection work={work} />
          {site.showTestimonials && study.testimonial && (
            <TestimonialSection work={work} />
          )}
          <StackSection work={work} />
        </>
      ) : (
        <LegacyFallback work={work} />
      )}

      <PrevNextSection prev={prev} next={next} />
    </>
  );
}

function CoverHero({ work }: { work: Work }) {
  return (
    <section
      id="cover"
      data-section-label="Cover"
      className="bg-ink-900 py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <Reveal>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md">
            <Image
              src={work.cover}
              alt={work.title}
              fill
              priority
              className="object-cover"
            />
            <div
              className="absolute inset-0 mix-blend-multiply"
              style={{ background: work.accent + "33" }}
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink-950/85 via-ink-950/30 to-transparent p-6 md:p-10">
              <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/70">
                Case {work.index} · {work.year}
              </p>
              <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                {work.category}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BriefAndMeta({ work }: { work: Work }) {
  const study = work.caseStudy!;
  const brief = study.sections.find((s) => s.kind === "brief");
  const metaRows: { label: string; value: string }[] = [
    { label: "Client", value: work.client ?? "Confidential" },
    { label: "Duration", value: work.duration ?? "—" },
    { label: "Team", value: work.team ?? "Solo" },
    { label: "Year", value: work.year },
  ];

  return (
    <section
      id="brief"
      data-section-label="Brief"
      className="border-t border-warmwhite/15 bg-ink-900 py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-10">
        <aside className="md:col-span-4">
          <div className="md:sticky md:top-28 md:max-h-[calc(100vh-7rem)] md:overflow-y-auto md:pr-4">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
              ◊ Project facts
            </p>
            <dl className="mt-6 space-y-5 border-t border-warmwhite/15 pt-6">
              {metaRows.map((row) => (
                <div key={row.label}>
                  <dt className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                    {row.label}
                  </dt>
                  <dd className="mt-1 break-words font-serif text-lg leading-snug tracking-tight text-warmwhite">
                    {row.value}
                  </dd>
                </div>
              ))}
              <div>
                <dt className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                  Roles
                </dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {work.role.map((r) => (
                    <span
                      key={r}
                      className="rounded-full border border-warmwhite/15 px-3 py-1 font-sans text-[11px] uppercase tracking-widest text-warmwhite/75"
                    >
                      {r}
                    </span>
                  ))}
                </dd>
              </div>
              {work.liveUrl && (
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                    Live
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={work.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="hover"
                      data-cursor-label="VISIT"
                      className="group inline-flex items-baseline gap-2 font-serif text-lg tracking-tight text-warmwhite hover:text-peach"
                    >
                      <span className="border-b border-warmwhite/30 group-hover:border-peach">
                        {prettyHost(work.liveUrl)}
                      </span>
                      <span aria-hidden>↗</span>
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </aside>

        <div className="md:col-span-8">
          {brief && (
            <Reveal>
              <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                {KIND_LABEL[brief.kind]}
              </p>
              <h2 className="mt-6 break-words font-serif text-[clamp(2rem,4vw,4rem)] leading-[1.05] tracking-tightest">
                <span className="italic text-warmwhite/65">{work.title}</span> —{" "}
                <span className="text-warmwhite">
                  {brief.heading.toLowerCase()}
                </span>
              </h2>
              <p className="mt-8 max-w-[60ch] font-sans text-base leading-relaxed text-warmwhite/75 md:text-lg">
                {brief.body}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

function SectionsBlock({ work }: { work: Work }) {
  const study = work.caseStudy!;
  const rest = study.sections.filter(
    (s) => s.kind !== "brief" && s.kind !== "outcome",
  );
  if (rest.length === 0) return null;

  return (
    <section
      id="approach"
      data-section-label="Approach"
      className="border-t border-warmwhite/15 bg-ink-950 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <ul className="grid grid-cols-1 gap-16 md:gap-24">
          {rest.map((s, i) => (
            <li
              key={s.kind}
              className="grid grid-cols-1 gap-10 md:grid-cols-12"
            >
              <div className="md:col-span-4">
                <Reveal>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                    {KIND_LABEL[s.kind]}
                  </p>
                  <h3 className="mt-5 font-serif text-[clamp(1.75rem,3vw,3rem)] leading-[1.05] tracking-tightest text-warmwhite">
                    {s.heading}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-6 block h-px w-12"
                    style={{ background: work.accent }}
                  />
                </Reveal>
              </div>
              <div className="md:col-span-8">
                <Reveal delay={0.05 + i * 0.04}>
                  <p className="max-w-[62ch] font-sans text-base leading-relaxed text-warmwhite/75 md:text-lg">
                    {s.body}
                  </p>
                </Reveal>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function GallerySection({ work }: { work: Work }) {
  const study = work.caseStudy!;
  return (
    <section
      id="gallery"
      data-section-label="Gallery"
      className="border-t border-warmwhite/15 bg-ink-900 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
              ◊ Gallery
            </p>
            <h3 className="mt-4 font-serif text-[clamp(1.75rem,3vw,3rem)] leading-[1.05] tracking-tightest text-warmwhite">
              Selected frames
            </h3>
          </div>
          <p className="max-w-md font-sans text-sm leading-relaxed text-warmwhite/55">
            Click any image to enter the lightbox. Use ←/→ to step through, Esc
            to close.
          </p>
        </div>
        <Reveal>
          <CaseStudyGallery images={study.gallery} accent={work.accent} />
        </Reveal>
      </div>
    </section>
  );
}

function MetricsSection({ work }: { work: Work }) {
  const study = work.caseStudy!;
  if (study.metrics.length === 0) return null;
  return (
    <section
      id="numbers"
      data-section-label="Numbers"
      className="border-t border-warmwhite/15 bg-ink-950 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
          ◊ Numbers
        </p>
        <ul className="mt-10 grid grid-cols-2 gap-y-12 md:grid-cols-4">
          {study.metrics.map((m) => (
            <li key={m.label} className="border-l border-warmwhite/15 pl-6">
              <p className="display-num font-serif text-[clamp(2.25rem,4.5vw,4.25rem)] leading-none tracking-tightest text-warmwhite">
                {m.value}
              </p>
              <p className="mt-3 font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                {m.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function DeliverablesSection({ work }: { work: Work }) {
  const study = work.caseStudy!;
  const outcome = study.sections.find((s) => s.kind === "outcome");

  return (
    <section
      id="deliverables"
      data-section-label="Deliverables"
      className="border-t border-warmwhite/15 bg-ink-900 py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
            ◊ Deliverables
          </p>
          <ul className="mt-8 space-y-3">
            {study.deliverables.map((d, i) => (
              <li
                key={d}
                className="flex items-baseline gap-4 border-t border-warmwhite/15 pt-3"
              >
                <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-base leading-relaxed text-warmwhite/80">
                  {d}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {outcome && (
          <div className="md:col-span-7">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
              {KIND_LABEL[outcome.kind]}
            </p>
            <h3 className="mt-5 font-serif text-[clamp(1.75rem,3vw,3rem)] leading-[1.05] tracking-tightest text-warmwhite">
              {outcome.heading}
            </h3>
            <p className="mt-8 max-w-[62ch] font-sans text-base leading-relaxed text-warmwhite/75 md:text-lg">
              {outcome.body}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function TestimonialSection({ work }: { work: Work }) {
  const t = work.caseStudy!.testimonial!;
  return (
    <section
      id="testimonial"
      data-section-label="Testimonial"
      className="border-t border-warmwhite/15 bg-ink-950 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <p
            aria-hidden
            className="font-serif text-6xl leading-none text-warmwhite/30 md:text-7xl"
          >
            “
          </p>
          <blockquote className="mt-4 font-serif text-[clamp(1.75rem,3.6vw,3.5rem)] italic leading-[1.15] tracking-tight text-warmwhite">
            {t.quote}
          </blockquote>
          <footer className="mt-10 flex flex-wrap items-baseline gap-4 border-t border-warmwhite/15 pt-6">
            <p className="font-sans text-sm uppercase tracking-widest text-warmwhite/85">
              {t.attribution}
            </p>
            <p className="font-sans text-xs uppercase tracking-widest text-warmwhite/65">
              {t.role}
            </p>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}

function StackSection({ work }: { work: Work }) {
  return (
    <section
      id="stack"
      data-section-label="Stack"
      data-work-end
      className="border-t border-warmwhite/15 bg-ink-900 py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-3">
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
            ◊ Stack
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-6 md:col-span-9 md:grid-cols-4">
          {work.stack.map((s) => (
            <li key={s} className="border-t border-warmwhite/15 pt-4">
              <p className="font-serif text-2xl tracking-tighter">{s}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PrevNextSection({ prev, next }: { prev: Work; next: Work }) {
  return (
    <section
      id="more-cases"
      data-section-label="More cases"
      className="border-t border-warmwhite/15 bg-ink-950 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <Link
            href={`/works/${prev.slug}`}
            data-cursor="view"
            data-cursor-label="PREV"
            className="group block border-t border-warmwhite/15 pt-6"
          >
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
              ← Previous case
            </p>
            <h3 className="mt-4 font-serif text-[clamp(1.75rem,4vw,3.25rem)] leading-[1] tracking-tightest text-warmwhite group-hover:text-peach">
              {prev.title}
            </h3>
            <p className="mt-2 font-sans text-xs uppercase tracking-widest text-warmwhite/65">
              {prev.year} · {prev.category}
            </p>
          </Link>
          <Link
            href={`/works/${next.slug}`}
            data-cursor="view"
            data-cursor-label="NEXT"
            className="group block border-t border-warmwhite/15 pt-6 text-right"
          >
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
              Next case →
            </p>
            <h3 className="mt-4 font-serif text-[clamp(1.75rem,4vw,3.25rem)] leading-[1] tracking-tightest text-warmwhite group-hover:text-peach">
              {next.title}
            </h3>
            <p className="mt-2 font-sans text-xs uppercase tracking-widest text-warmwhite/65">
              {next.year} · {next.category}
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}

function LegacyFallback({ work }: { work: Work }) {
  return (
    <>
      <section className="border-t border-warmwhite/15 bg-ink-900 py-24 md:py-32">
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-3">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              ◊ Brief
            </p>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-serif text-[clamp(2rem,4vw,4rem)] leading-[1.05] tracking-tightest">
              <span className="italic text-warmwhite/65">{work.title}</span> is
              a study in restraint — the kind of project where the loudest
              decision is what we chose{" "}
              <em className="italic text-peach">not</em> to add.
            </h2>
            <p className="mt-10 max-w-2xl font-sans text-base leading-relaxed text-warmwhite/70">
              {work.summary}
            </p>
          </div>
        </div>
      </section>
      <StackSection work={work} />
    </>
  );
}

function prettyHost(url: string): string {
  try {
    const u = new URL(url);
    return (
      u.host.replace(/^www\./, "") + (u.pathname === "/" ? "" : u.pathname)
    );
  } catch {
    return url;
  }
}
