import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { works, journal, experiments } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Atlas — Site map as a constellation",
  description:
    "Every route on the site, laid out as a star map. Hover any star to preview, click any star to fly there.",
};

type Star = { label: string; href: string; group: string; size?: "sm" | "md" | "lg" };

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
  legal: "text-warmwhite/40",
};

const SIZE_CLASS: Record<NonNullable<Star["size"]>, string> = {
  sm: "text-[clamp(1rem,1.5vw,1.4rem)]",
  md: "text-[clamp(1.4rem,2.2vw,2.4rem)]",
  lg: "text-[clamp(2rem,3.4vw,4rem)]",
};

function deterministicPos(seed: number) {
  // simple hashed pseudo-random in [0,1)
  const a = Math.sin(seed * 12.9898) * 43758.5453;
  const x = a - Math.floor(a);
  const b = Math.sin(seed * 78.233) * 43758.5453;
  const y = b - Math.floor(b);
  return { x, y };
}

export default function AtlasPage() {
  return (
    <>
      <PageHero
        eyebrow="§09 — Atlas"
        title="Site"
        italic="Constellation."
        description="Every route on the site, laid out as a star map. Each cluster is a section of the site — hover a star to preview, click to fly there."
        meta={[
          { label: "Routes", value: String(STARS.length).padStart(2, "0") },
          { label: "Clusters", value: "06" },
          { label: "Updated", value: "MMXXVI" },
          { label: "Mode", value: "Static" },
        ]}
      />

      <section className="relative overflow-hidden bg-ink-950 py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-20" />
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <div className="relative h-[68vh] min-h-[520px] overflow-hidden rounded-3xl border border-warmwhite/10 bg-ink-900">
            {STARS.map((s, i) => {
              const { x, y } = deterministicPos(i + 7);
              const left = 6 + x * 88;
              const top = 6 + y * 88;
              return (
                <Link
                  key={`${s.href}-${i}`}
                  href={s.href}
                  data-cursor="view"
                  data-cursor-label="GO"
                  className={`group absolute -translate-x-1/2 -translate-y-1/2 font-serif tracking-tightest ${
                    GROUP_COLOR[s.group] ?? "text-warmwhite"
                  } ${SIZE_CLASS[s.size ?? "md"]}`}
                  style={{ left: `${left}%`, top: `${top}%` }}
                >
                  <span className="relative inline-flex items-center gap-2 transition-colors">
                    <span className="block h-1.5 w-1.5 rounded-full bg-current opacity-60 transition-opacity group-hover:opacity-100" />
                    <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {s.label}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-ink-900 py-24 md:py-32">
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-3">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/45">
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

      <section className="border-t border-warmwhite/10 bg-ink-950 py-24">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/45">
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
                  <span className="font-mono text-[10px] uppercase tracking-widest text-warmwhite/35">
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
