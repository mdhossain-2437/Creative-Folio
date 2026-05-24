// Portfolios — every year a different studio: a year-by-year archive of
// the studio's portfolio editions, oldest at the bottom, current edition
// at the top. Each entry is a small editorial card with codename,
// description, accent colour and a short highlights strip. Emits a
// CollectionPage JSON-LD that lists every edition so search engines can
// resolve the studio's "year-portfolio" history as one indexed
// collection.

import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PageSchema } from "@/components/seo/PageSchema";
import { Reveal } from "@/components/ui/Reveal";
import { portfolios } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfolios — Year by Year",
  description:
    "Every year a new portfolio. The legacy archive of every annual portfolio edition Delowar Hossain has shipped — codenames, descriptions, and highlights from each year of the studio.",
  alternates: { canonical: "/portfolios" },
};

// Re-render the page when the build runs so JSON-LD always carries the
// current edition. The content is data-driven so this is safe to fully
// statically prerender.
export const dynamic = "force-static";

export default function PortfoliosPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${site.url}/portfolios#collection`,
    name: "Year-by-Year Portfolios — Delowar Hossain",
    url: `${site.url}/portfolios`,
    description:
      "Every annual portfolio edition Delowar Hossain has shipped — from 2023's first edition to the current MMXXVII edition.",
    author: { "@id": `${site.url}/#person` },
    isPartOf: { "@id": `${site.url}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: portfolios.length,
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      itemListElement: portfolios.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          name: `${p.codename} — ${p.edition}`,
          alternateName: p.codename,
          description: p.description,
          dateCreated: p.year,
          creator: { "@id": `${site.url}/#person` },
        },
      })),
    },
  };

  return (
    <>
      <PageSchema
        path="/portfolios"
        name="Portfolios — Year by Year"
        description="Every year a new portfolio. The legacy archive of every annual portfolio edition Delowar Hossain has shipped."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Portfolios", href: "/portfolios" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />

      <PageHero
        eyebrow="§ 12 — Portfolios"
        title="Year by"
        italic="year."
        description="Every year I rebuild this studio's portfolio from scratch — a new codename, a new visual register, a new set of architectural choices. This is the running record."
        meta={[
          { label: "Editions", value: portfolios.length.toString().padStart(2, "0") },
          { label: "Current", value: portfolios[0]?.edition ?? "MMXXVII" },
          { label: "Oldest", value: portfolios[portfolios.length - 1]?.year ?? "2023" },
          { label: "Cadence", value: "Annual" },
        ]}
      />

      <section className="bg-ink-900 py-20 md:py-32">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <ol className="grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/15 md:grid-cols-2">
            {portfolios.map((p, i) => (
              <Reveal
                key={p.year + p.codename}
                as="li"
                delay={i * 0.05}
                className="group relative flex h-full flex-col gap-8 bg-ink-900 p-8 md:p-12"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-8 top-8 font-serif text-[clamp(4rem,8vw,7rem)] leading-none tracking-tightest opacity-10"
                  style={{ color: p.accent }}
                >
                  {p.year}
                </span>

                <header className="flex items-baseline justify-between gap-4">
                  <span
                    className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest"
                    style={{ color: p.accent }}
                  >
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: p.accent }}
                    />
                    {p.edition} · {p.year}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 font-sans text-[10px] uppercase tracking-widest ${
                      p.status === "Current"
                        ? "border-peach/70 bg-peach/15 text-peach"
                        : p.status === "Live"
                          ? "border-warmwhite/35 text-warmwhite"
                          : "border-warmwhite/20 text-warmwhite/55"
                    }`}
                  >
                    {p.status}
                  </span>
                </header>

                <div>
                  <h2 className="font-serif text-[clamp(2.4rem,4vw,4rem)] leading-[0.95] tracking-tightest">
                    {p.codename}
                  </h2>
                  <p className="mt-4 max-w-prose font-sans text-sm leading-relaxed text-warmwhite/70 md:text-base">
                    {p.description}
                  </p>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {p.highlights.map((h) => (
                    <li
                      key={h}
                      className="inline-flex items-center rounded-full border border-warmwhite/20 px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-warmwhite/70"
                    >
                      {h}
                    </li>
                  ))}
                </ul>

                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="view"
                    data-cursor-label="OPEN LIVE"
                    aria-label={`Open the ${p.year} portfolio (${p.codename}) in a new tab`}
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-warmwhite/25 px-4 py-2 font-sans text-[10px] uppercase tracking-widest text-warmwhite transition-colors hover:border-peach hover:text-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
                  >
                    <span aria-hidden>↗</span> {new URL(p.href).host}
                  </a>
                ) : (
                  <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/45">
                    {p.status === "Current"
                      ? "✦ You are here"
                      : "Archived · screenshots on request"}
                  </p>
                )}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-warmwhite/15 bg-ink-950 py-20 md:py-28">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
            ◊ Note from the studio
          </p>
          <h3 className="mt-4 max-w-3xl font-serif text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.18] tracking-tight">
            The portfolio is a museum of opinions — and the opinions change every year. Older editions are kept as archive snapshots, not living URLs.
          </h3>
        </div>
      </section>
    </>
  );
}
