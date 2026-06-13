import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { archive, works } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { PageSchema } from "@/components/seo/PageSchema";

export const metadata: Metadata = {
  alternates: { canonical: "/archive" },
  title: "Archive — All Works",
  description: "An exhaustive index of every project, every year — from solo experiments to client engagements.",
};

export default function ArchivePage() {
  // Combine archive + works for a fuller index, dedupe by title.
  const seen = new Set<string>();
  const all = [
    ...works.map((w) => ({
      year: w.year,
      title: w.title,
      category: w.category,
      role: w.role.join(" · "),
      slug: w.slug,
    })),
    ...archive.map((a) => ({ ...a, slug: undefined })),
  ].filter((it) => {
    if (seen.has(it.title)) return false;
    seen.add(it.title);
    return true;
  });

  return (
    <>
      <PageSchema
        path="/archive"
        name="Archive — All Works"
        description="An exhaustive index of every project, every year — from solo experiments to client engagements."
        crumbs={[{ name: "Home", href: "/" }, { name: "Archive", href: "/archive" }]}
      />
      <PageHero
        eyebrow="§ Archive — All Works"
        title="The"
        italic="Archive."
        description="An exhaustive index of every project, every year — from solo experiments and side studies to client engagements and collaborations."
        meta={[
          { label: "Total", value: all.length.toString() },
          { label: "Period", value: "2023 — Now" },
        ]}
      />

      <section className="bg-ink-900 py-16 md:py-24">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <div className="hidden grid-cols-12 items-baseline gap-3 border-b border-warmwhite/15 pb-3 font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 md:grid">
            <span className="col-span-2">Year</span>
            <span className="col-span-5">Title</span>
            <span className="col-span-3">Category</span>
            <span className="col-span-2 text-right">Role</span>
          </div>
          <ul className="divide-y divide-warmwhite/15">
            {all.map((a, i) => (
              <Reveal key={`${a.title}-${i}`} delay={i * 0.02}>
                <li>
                  {a.slug ? (
                    <Link
                      href={`/works/${a.slug}`}
                      data-cursor="view"
                      data-cursor-label="OPEN"
                      aria-label={`Open case study: ${a.title} — ${a.category}, ${a.year}`}
                      className="grid grid-cols-1 items-baseline gap-1 px-3 py-5 transition-colors hover:bg-warmwhite/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-peach md:grid-cols-12 md:gap-3 md:py-6"
                    >
                      <Row {...a} />
                    </Link>
                  ) : (
                    <div className="grid grid-cols-1 items-baseline gap-1 px-3 py-5 md:grid-cols-12 md:gap-3 md:py-6">
                      <Row {...a} />
                    </div>
                  )}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function Row({
  year,
  title,
  category,
  role,
}: {
  year: string;
  title: string;
  category: string;
  role: string;
}) {
  return (
    <>
      <span className="font-mono text-[11px] uppercase tracking-widest text-warmwhite/55 md:col-span-2">
        {year}
      </span>
      <span className="font-serif text-2xl tracking-tighter text-warmwhite md:col-span-5 md:text-3xl">
        {title}
      </span>
      <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55 md:col-span-3">
        {category}
      </span>
      <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 md:col-span-2 md:text-right">
        {role}
      </span>
    </>
  );
}
