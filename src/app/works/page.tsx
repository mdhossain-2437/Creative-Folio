import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightTile } from "@/components/ui/SpotlightTile";
import { WorksConstellation } from "@/components/works/WorksConstellation";
import { publicRecognitionLabel, works, archive } from "@/lib/data";
import { PageSchema } from "@/components/seo/PageSchema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/works" },
  title: "Selected Works",
  description:
    "A curated collection of digital experiences, interactive installations and experimental web architecture by Delowar Hossain.",
};

// ItemList JSON-LD — turns the /works route into a list result. Google
// prefers ItemList over CollectionPage for portfolio indexes; each item
// is a CreativeWork pointing back at its own case-study URL. This lets
// the page rank for "delowar hossain selected works" plus serve as a
// strong internal-linking root for every project page.
const worksItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${site.url}/works#list`,
  name: "Selected Works — Delowar Hossain",
  url: `${site.url}/works`,
  numberOfItems: works.length,
  itemListOrder: "https://schema.org/ItemListOrderDescending",
  itemListElement: works.map((w, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${site.url}/works/${w.slug}`,
    item: {
      "@type": "CreativeWork",
      "@id": `${site.url}/works/${w.slug}#work`,
      name: w.title,
      url: `${site.url}/works/${w.slug}`,
      description: w.summary,
      image: w.cover,
      dateCreated: w.year,
      creator: { "@id": `${site.url}/#person` },
    },
  })),
};

export default function WorksPage() {
  return (
    <>
      <PageSchema
        path="/works"
        name="Selected Works"
        description="A curated collection of digital experiences, interactive installations and experimental web architecture by Delowar Hossain."
        crumbs={[{ name: "Home", href: "/" }, { name: "Works", href: "/works" }]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(worksItemList) }}
      />
      <PageHero
        eyebrow="§02 — Selected & Works"
        title="Selected"
        italic="& Works."
        description="A curated collection of digital experiences, interactive installations, and experimental web architecture. Exploring the intersection of motion, depth, and editorial typography."
        meta={[
          { label: "Years", value: "2023 — Now" },
          { label: "Total", value: "32" },
          { label: "Recognition", value: "Targets labelled" },
          { label: "Available", value: "Q1 ’27" },
        ]}
      />

      <WorksConstellation works={works} />

      <section className="relative bg-ink-900 py-16 md:py-24">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          {/* Works grid — every tile is now the same height so the columns
              read as a clean editorial sheet. The cover keeps the 4:3
              SpotlightTile crop; the body underneath uses a deterministic
              row layout (title clamped to 2 lines, summary clamped to 3,
              stack pinned to one row, footer hugging the bottom). */}
          <ul className="grid grid-cols-1 items-stretch gap-px overflow-hidden bg-warmwhite/15 md:grid-cols-2">
            {works.map((w, i) => (
              <Reveal key={w.slug} delay={i * 0.05}>
                <li className="h-full bg-ink-900">
                  <Link
                    href={`/works/${w.slug}`}
                    data-cursor="view"
                    data-cursor-label="OPEN CASE"
                    aria-label={`Open case study: ${w.title} — ${w.category}, ${w.year}`}
                    className="group flex h-full flex-col rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-peach"
                  >
                    <SpotlightTile accent={w.accent}>
                      <div className="spotlight-tile-img absolute inset-0 ">
                        <Image
                          src={w.cover}
                          alt={w.title}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.04]"
                        />
                      </div>
                      <div
                        className="absolute inset-0 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-30"
                        style={{ background: w.accent + "55" }}
                      />
                      <div className="spotlight-tile-glow absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
                        <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite">
                          {w.index} — {w.category}
                        </span>
                        <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/85">
                          {w.year}
                        </span>
                      </div>
                    </SpotlightTile>
                    <div className="flex flex-1 flex-col gap-4 p-6 md:p-10">
                      <h3 className="line-clamp-2 min-h-[2.4em] font-serif text-[clamp(2rem,4vw,4rem)] leading-[0.95] tracking-tightest">
                        {w.title}
                      </h3>
                      <p className="line-clamp-3 min-h-[4.5em] max-w-prose font-sans text-sm leading-relaxed text-warmwhite/65 md:text-base">
                        {w.summary}
                      </p>
                      <ul className="mt-2 flex min-h-[2rem] flex-wrap gap-2">
                        {w.stack.slice(0, 4).map((s) => (
                          <li
                            key={s}
                            className="inline-flex h-7 items-center rounded-full border border-warmwhite/20 px-3 font-sans text-[10px] uppercase tracking-widest text-warmwhite/65"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-auto pt-4 font-sans text-[10px] uppercase tracking-widest text-peach">
                        {publicRecognitionLabel(w.recognition) ??
                          "— Selected work"}
                      </p>
                    </div>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-warmwhite/15 bg-ink-950 py-20 md:py-28 lg:py-40">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <header className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-[clamp(2rem,5vw,4.5rem)] leading-none tracking-tightest">
              The Archive
            </h2>
            <Link
              href="/archive"
              data-cursor="hover"
              data-cursor-label="ARCHIVE"
              className="inline-flex items-baseline gap-2 rounded-full border border-warmwhite/15 px-4 py-2 font-sans text-[10px] uppercase tracking-widest text-warmwhite/85 transition-colors hover:border-peach hover:text-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
            >
              Full Archive <span aria-hidden>↗</span>
            </Link>
          </header>
          <ul className="mt-10 divide-y divide-warmwhite/15 border-y border-warmwhite/15">
            {archive.slice(0, 6).map((a, i) => (
              <li
                key={i}
                className="grid grid-cols-1 items-baseline gap-1 py-5 font-sans text-sm text-warmwhite/75 md:grid-cols-12 md:gap-3"
              >
                <span className="font-mono text-[11px] uppercase tracking-widest text-warmwhite/65 md:col-span-2">
                  {a.year}
                </span>
                <span className="font-serif text-2xl tracking-tighter text-warmwhite md:col-span-5">
                  {a.title}
                </span>
                <span className="text-[11px] uppercase tracking-widest text-warmwhite/65 md:col-span-3">
                  {a.category}
                </span>
                <span className="text-[11px] uppercase tracking-widest text-warmwhite/65 md:col-span-2 md:text-right">
                  {a.role}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
