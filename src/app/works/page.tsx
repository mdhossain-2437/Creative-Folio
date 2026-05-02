import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightTile } from "@/components/ui/SpotlightTile";
import { works, archive } from "@/lib/data";

export const metadata: Metadata = {
  title: "Selected Works",
  description:
    "A curated collection of digital experiences, interactive installations and experimental web architecture by Delowar Hossain.",
};

export default function WorksPage() {
  return (
    <>
      <PageHero
        eyebrow="§02 — Selected & Works"
        title="Selected"
        italic="& Works."
        description="A curated collection of digital experiences, interactive installations, and experimental web architecture. Exploring the intersection of motion, depth, and editorial typography."
        meta={[
          { label: "Years", value: "2020 — Now" },
          { label: "Total", value: "32" },
          { label: "Awarded", value: "12" },
          { label: "Available", value: "Q3 ’26" },
        ]}
      />

      <section className="relative bg-ink-900 py-16 md:py-24">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <ul className="grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/15 md:grid-cols-2">
            {works.map((w, i) => (
              <Reveal key={w.slug} delay={i * 0.05}>
                <li className="bg-ink-900">
                  <Link
                    href={`/works/${w.slug}`}
                    data-cursor="view"
                    data-cursor-label="OPEN CASE"
                    className="group block"
                  >
                    <SpotlightTile accent={w.accent}>
                      <div className="spotlight-tile-img absolute inset-0 will-change-transform">
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
                    <div className="flex flex-col gap-4 p-6 md:p-10">
                      <h3 className="font-serif text-[clamp(2rem,4vw,4rem)] leading-[0.95] tracking-tightest">
                        {w.title}
                      </h3>
                      <p className="max-w-prose font-sans text-sm leading-relaxed text-warmwhite/65 md:text-base">
                        {w.summary}
                      </p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {w.stack.map((s) => (
                          <li
                            key={s}
                            className="rounded-full border border-warmwhite/20 px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-warmwhite/65"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                      {w.award && (
                        <p className="mt-4 font-sans text-[10px] uppercase tracking-widest text-peach">
                          ✦ {w.award}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-warmwhite/15 bg-ink-950 py-28 md:py-40">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <header className="flex items-end justify-between">
            <h2 className="font-serif text-[clamp(2rem,5vw,4.5rem)] leading-none tracking-tightest">
              The Archive
            </h2>
            <Link
              href="/archive"
              className="font-sans text-[11px] uppercase tracking-widest text-warmwhite/70 hover:text-warmwhite"
            >
              Full Archive →
            </Link>
          </header>
          <ul className="mt-10 divide-y divide-warmwhite/15 border-y border-warmwhite/15">
            {archive.slice(0, 6).map((a, i) => (
              <li
                key={i}
                className="grid grid-cols-12 items-baseline gap-3 py-5 font-sans text-sm text-warmwhite/75"
              >
                <span className="col-span-2 font-mono text-[11px] uppercase tracking-widest text-warmwhite/65">
                  {a.year}
                </span>
                <span className="col-span-5 font-serif text-2xl tracking-tighter text-warmwhite">
                  {a.title}
                </span>
                <span className="col-span-3 text-[11px] uppercase tracking-widest text-warmwhite/65">
                  {a.category}
                </span>
                <span className="col-span-2 text-right text-[11px] uppercase tracking-widest text-warmwhite/65">
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
