import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { works, journal, experiments } from "@/lib/data";
import { site } from "@/lib/site";
import { AtlasConstellation, type ConstellationStar } from "@/components/atlas/AtlasConstellation";
import { PageSchema } from "@/components/seo/PageSchema";

export const metadata: Metadata = {
  alternates: { canonical: "/atlas" },
  title: "Atlas — Site map as a constellation",
  description:
    "Every route on the site, laid out as a star map. Hover any star to preview, click any star to fly there.",
};

type Star = ConstellationStar;

const STARS: Star[] = [
  ...site.nav.map((n): Star => ({ label: n.label, href: n.href, group: "core", size: "lg" })),
  { label: "Now", href: "/now", group: "studio", size: "md" },
  { label: "Showreel", href: "/showreel", group: "studio", size: "md" },
  { label: "Atlas", href: "/atlas", group: "studio", size: "sm" },
  { label: "Awards", href: "/awards", group: "studio", size: "md" },
  { label: "Archive", href: "/archive", group: "studio", size: "md" },
  { label: "Colophon", href: "/colophon", group: "studio", size: "sm" },
  { label: "Privacy", href: "/legal/privacy", group: "legal", size: "sm" },
  { label: "Terms", href: "/legal/terms", group: "legal", size: "sm" },
  ...works.map((w): Star => ({ label: w.title, href: `/works/${w.slug}`, group: "works", size: "md" })),
  ...experiments.map((e): Star => ({ label: e.title, href: `/lab/${e.slug}`, group: "lab", size: "sm" })),
  ...journal.map((j): Star => ({ label: j.title, href: `/journal/${j.slug}`, group: "journal", size: "sm" })),
];

const GROUP_COLOR: Record<string, string> = {
  core: "text-warmwhite",
  studio: "text-peach",
  works: "text-electric",
  lab: "text-warmwhite/80",
  journal: "text-warmwhite/70",
  legal: "text-warmwhite/65",
};

export default function AtlasPage() {
  return (
    <>
      <PageSchema
        path="/atlas"
        name="Atlas — Site Map"
        description="Every route on the site, laid out as a star map. Hover any star to preview, click any star to fly there."
        crumbs={[{ name: "Home", href: "/" }, { name: "Atlas", href: "/atlas" }]}
      />
      <PageHero
        eyebrow="§09 — Atlas"
        title="Site"
        italic="Constellation."
        description="Every route on the site, laid out as a star map. Each cluster is a section of the site — hover a star to preview, click to fly there."
        meta={[
          { label: "Routes", value: String(STARS.length).padStart(2, "0") },
          { label: "Clusters", value: "06" },
          { label: "Updated", value: "MMXXVII" },
          { label: "Mode", value: "Static" },
        ]}
      />

      <section className="relative overflow-hidden bg-ink-950 py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-20" />
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <AtlasConstellation stars={STARS} />
        </div>
      </section>

      <section className="bg-ink-900 py-24 md:py-32">
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-3">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              ◊ Reading the map
            </p>
          </div>
          <ul className="md:col-span-9 grid grid-cols-2 gap-x-10 gap-y-3 font-mono text-[12px] uppercase tracking-widest text-warmwhite/65 md:grid-cols-3">
            {Object.entries(GROUP_COLOR).map(([key, cls]) => (
              <li key={key} className="flex items-center gap-2">
                <span className={`inline-block h-2 w-2 rounded-full bg-current ${cls}`} />
                <span>{key}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-warmwhite/15 bg-ink-950 py-24">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
            ◊ Full directory
          </p>
          <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {STARS.map((s) => (
              <li key={`flat-${s.href}-${s.label}`} className="border-b border-warmwhite/5 py-2">
                <Link
                  href={s.href}
                  data-cursor="hover"
                  data-cursor-label="VIEW"
                  className="flex items-center justify-between font-sans text-sm text-warmwhite/80 hover:text-peach"
                >
                  <span>{s.label}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-warmwhite/55">
                    {s.href}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
