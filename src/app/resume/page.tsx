import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { journey, expertise, awards, arsenal } from "@/lib/data";
import { site } from "@/lib/site";
import { PageSchema } from "@/components/seo/PageSchema";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Delowar Hossain — Creative Developer & UI/UX Designer. Full resume: experience, education, expertise, and recognition. Download the 2026 PDF.",
  alternates: { canonical: `${site.url}/resume` },
};

export default function ResumePage() {
  return (
    <>
      <PageSchema
        path="/resume"
        name="Resume — Delowar Hossain"
        description="Delowar Hossain — Creative Developer & UI/UX Designer. Full resume: experience, education, expertise, and recognition. Download the 2026 PDF."
        crumbs={[{ name: "Home", href: "/" }, { name: "Resume", href: "/resume" }]}
      />
      <PageHero
        eyebrow="§ Resume — A Living Document"
        title="Delowar"
        italic="Hossain."
        description="A condensed view of the work, the practice, and the recognition. Updated continuously — selected items only."
        meta={[
          { label: "Role", value: "Creative Developer" },
          { label: "Location", value: site.location },
          { label: "Email", value: site.email },
          { label: "Studio", value: site.studio },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={site.resume}
            download="Md-Delowar-Hossain-Resume.pdf"
            data-cursor="hover"
            data-cursor-label="DOWNLOAD"
            className="rounded-full bg-warmwhite px-6 py-3 font-sans text-[11px] uppercase tracking-widest text-ink-900 hover:bg-peach"
          >
            Download PDF (2026)
          </a>
          <a
            href={site.resumeMirror}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            data-cursor-label="DRIVE"
            className="rounded-full border border-warmwhite/30 px-6 py-3 font-sans text-[11px] uppercase tracking-widest hover:border-warmwhite"
          >
            Drive mirror
          </a>
        </div>
      </PageHero>

      <section className="bg-ink-900 py-24 md:py-32">
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-10">
          <aside className="md:col-span-3">
            <div className="sticky top-24 space-y-10">
              <Section label="Profile" />
              <Section label="Experience" />
              <Section label="Awards" />
              <Section label="Tools" />
              <Section label="Education" />
              <Section label="Languages" />
            </div>
          </aside>

          <div className="md:col-span-9">
            <Block title="Profile">
              <p className="font-serif text-2xl leading-snug tracking-tighter md:text-3xl">
                Creative Developer &amp; UI / UX Designer based in {site.location}.
                Building immersive, performance-focused web products at the
                intersection of editorial design, WebGL and AI integration.
              </p>
            </Block>

            <Block title="Experience">
              <ul className="divide-y divide-warmwhite/15">
                {journey.map((j) => (
                  <Reveal key={j.range}>
                    <li className="grid grid-cols-12 items-baseline gap-4 py-6">
                      <span className="col-span-12 font-mono text-[11px] uppercase tracking-widest text-warmwhite/65 md:col-span-3">
                        {j.range}
                      </span>
                      <h3 className="col-span-12 font-serif text-2xl leading-tight tracking-tighter md:col-span-5">
                        {j.title}
                      </h3>
                      <p className="col-span-12 font-sans text-sm leading-relaxed text-warmwhite/65 md:col-span-4">
                        {j.summary}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </Block>

            <Block title="Awards">
              <ul className="grid grid-cols-1 gap-px bg-warmwhite/15 md:grid-cols-2">
                {awards.map((a) => (
                  <li key={a.index} className="flex flex-col gap-3 bg-ink-900 p-6 md:p-8">
                    <p className="font-sans text-[10px] uppercase tracking-widest text-peach">
                      {a.org} · {a.year}
                    </p>
                    <h4 className="font-serif text-2xl tracking-tighter">{a.title}</h4>
                    <p className="font-sans text-sm leading-relaxed text-warmwhite/65">
                      {a.summary}
                    </p>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Tools">
              <div className="grid grid-cols-1 gap-px bg-warmwhite/15 md:grid-cols-2">
                {arsenal.map((g) => (
                  <div key={g.title} className="bg-ink-900 p-6 md:p-8">
                    <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                      {g.title}
                    </p>
                    <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 font-serif text-lg tracking-tighter">
                      {g.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Block>

            <Block title="Education">
              <div className="grid grid-cols-12 items-baseline gap-4 py-2">
                <span className="col-span-12 font-mono text-[11px] uppercase tracking-widest text-warmwhite/65 md:col-span-3">
                  2020 — 2024
                </span>
                <h4 className="col-span-12 font-serif text-2xl leading-tight tracking-tighter md:col-span-5">
                  B.A. in Political Science
                </h4>
                <p className="col-span-12 font-sans text-sm leading-relaxed text-warmwhite/65 md:col-span-4">
                  Scholarly modernity. A systems-level way of thinking about
                  people, behavior, communication, and product structure.
                </p>
              </div>
            </Block>

            <Block title="Disciplines">
              <ul className="flex flex-wrap gap-3">
                {expertise.map((e) => (
                  <li
                    key={e}
                    className="rounded-full border border-warmwhite/20 px-5 py-2 font-sans text-[11px] uppercase tracking-widest text-warmwhite/80"
                  >
                    {e}
                  </li>
                ))}
              </ul>
            </Block>
          </div>
        </div>
      </section>
    </>
  );
}

function Section({ label }: { label: string }) {
  return (
    <a
      href={`#${label.toLowerCase()}`}
      className="block border-l border-warmwhite/15 pl-3 font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 hover:text-warmwhite"
    >
      ◌ {label}
    </a>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section id={title.toLowerCase()} className="border-t border-warmwhite/15 py-12 first:border-t-0 first:pt-0">
      <h2 className="font-serif text-[clamp(2rem,4vw,3.6rem)] leading-none tracking-tightest">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}
