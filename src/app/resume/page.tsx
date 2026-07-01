import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { journey, expertise, awards, arsenal } from "@/lib/data";
import { educationNarrative } from "@/lib/education";
import { site } from "@/lib/site";
import { PageSchema } from "@/components/seo/PageSchema";
import { ResumeToc } from "@/components/resume/ResumeToc";

const TOC_ITEMS = [
  { id: "profile", label: "Profile" },
  { id: "experience", label: "Experience" },
  { id: "recognition", label: "Recognition" },
  { id: "tools", label: "Tools" },
  { id: "education", label: "Education" },
  { id: "disciplines", label: "Disciplines" },
];

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Delowar Hossain — Creative Developer & UI/UX Designer. Full resume: experience, education, expertise, and recognition. Download the 2027 PDF.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <>
      <PageSchema
        path="/resume"
        name="Resume — Delowar Hossain"
        description="Delowar Hossain — Creative Developer & UI/UX Designer. Full resume: experience, education, expertise, and recognition. Download the 2027 PDF."
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
            aria-label="Download resume PDF (2027 edition)"
            className="inline-flex items-center gap-2 rounded-full bg-warmwhite px-6 py-3 font-sans text-[11px] uppercase tracking-widest text-ink-900 transition-colors hover:bg-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
          >
            Download PDF (2027) <span aria-hidden>↓</span>
          </a>
          <a
            href={site.resumeMirror}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            data-cursor-label="DRIVE"
            aria-label="Open Drive mirror of the resume (new tab)"
            className="inline-flex items-center gap-2 rounded-full border border-warmwhite/30 px-6 py-3 font-sans text-[11px] uppercase tracking-widest text-warmwhite transition-colors hover:border-peach hover:text-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
          >
            Drive mirror <span aria-hidden>↗</span>
          </a>
        </div>
      </PageHero>

      <section className="bg-ink-900 py-24 md:py-32">
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-10">
          <aside className="md:col-span-3">
            <ResumeToc items={TOC_ITEMS} />
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
                  <Reveal
                    key={j.range}
                    as="li"
                    className="grid grid-cols-12 items-baseline gap-4 py-6"
                  >
                      <span className="col-span-12 font-mono text-[11px] uppercase tracking-widest text-warmwhite/65 md:col-span-3">
                        {j.range}
                      </span>
                      <h3 className="col-span-12 font-serif text-2xl leading-tight tracking-tighter md:col-span-5">
                        {j.title}
                      </h3>
                      <p className="col-span-12 font-sans text-sm leading-relaxed text-warmwhite/65 md:col-span-4">
                        {j.summary}
                      </p>
                  </Reveal>
                ))}
              </ul>
            </Block>

            <Block title="Recognition" id="recognition">
              <p className="mb-8 max-w-3xl font-sans text-sm leading-relaxed text-warmwhite/70">
                Targets are labelled until a public, verifiable result exists.
                Earned recognitions will move into the same ledger with proof
                links.
              </p>
              <ul className="grid grid-cols-1 gap-px bg-warmwhite/15 md:grid-cols-2">
                {awards.map((a) => (
                  <li
                    key={a.index}
                    className="flex flex-col gap-3 bg-ink-900 p-6 md:p-8"
                  >
                    <p className="font-sans text-[10px] uppercase tracking-widest text-peach">
                      {a.status === "earned" ? "Verified" : "Target"} · {a.org} ·{" "}
                      {a.year}
                    </p>
                    <h4 className="font-serif text-2xl tracking-tighter">
                      {a.title}
                    </h4>
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
              <p className="max-w-3xl font-sans text-sm leading-relaxed text-warmwhite/70">
                {educationNarrative.resume}
              </p>
              <div className="mt-8 divide-y divide-warmwhite/15">
                {site.education.map((edu) => (
                  <div
                    key={edu.institution}
                    className="grid grid-cols-12 items-baseline gap-4 py-6 first:pt-0 last:pb-0"
                  >
                    <span className="col-span-12 font-mono text-[11px] uppercase tracking-widest text-warmwhite/65 md:col-span-3">
                      {edu.range}
                    </span>
                    <h4 className="col-span-12 font-serif text-2xl leading-tight tracking-tighter md:col-span-5">
                      {edu.url ? (
                        <a
                          href={edu.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="hover"
                          className="rounded-sm transition-colors hover:text-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peach"
                        >
                          {edu.institution}
                        </a>
                      ) : (
                        edu.institution
                      )}
                    </h4>
                    <p className="col-span-12 font-sans text-sm leading-relaxed text-warmwhite/65 md:col-span-4">
                      {edu.degree} · {edu.role}
                    </p>
                  </div>
                ))}
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

function Block({
  title,
  id,
  children,
}: {
  title: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id ?? title.toLowerCase()}
      className="border-t border-warmwhite/15 py-12 first:border-t-0 first:pt-0"
    >
      <h2 className="font-serif text-[clamp(2rem,4vw,3.6rem)] leading-none tracking-tightest">
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}
