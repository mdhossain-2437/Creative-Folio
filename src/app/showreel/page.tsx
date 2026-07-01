import type { Metadata } from "next";
import Link from "@/components/ui/PerformanceLink";
import { PageHero } from "@/components/layout/PageHero";
import { reelClips } from "@/lib/data";
import { ShowreelOpener } from "@/components/sections/ShowreelOpener";
import { ReelChapterCarouselClient } from "@/components/showreel/ReelChapterCarouselClient";
import { PageSchema } from "@/components/seo/PageSchema";

export const metadata: Metadata = {
  alternates: { canonical: "/showreel" },
  title: "Showreel — selected motion chapters",
  description:
    "A vertical reel index of selected work, 2026–2027. Public chapters use verified static covers until project footage is published.",
};

export default function ShowreelPage() {
  return (
    <>
      <PageSchema
        path="/showreel"
        name="Showreel — selected motion chapters"
        description="A vertical reel index of selected work, 2026–2027. Public chapters use verified static covers until project footage is published."
        crumbs={[{ name: "Home", href: "/" }, { name: "Showreel", href: "/showreel" }]}
      />
      <PageHero
        eyebrow="§08 — Reel"
        title="Showreel"
        italic="2027."
        description="Four public chapters. Verified motion footage is being cut from project recordings; until then, the reel opens as a static cover sequence with the same chapter structure."
        meta={[
          { label: "Runtime", value: "Static covers" },
          { label: "Chapters", value: String(reelClips.length).padStart(2, "0") },
          { label: "Media", value: "No stock video" },
          { label: "Captions", value: "EN" },
        ]}
      >
        <ShowreelOpener label="Open immersive view" />
      </PageHero>

      <ReelChapterCarouselClient clips={reelClips} />

      <section className="bg-ink-900 py-20 md:py-28">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <ol className="space-y-px overflow-hidden border-y border-warmwhite/15">
            {reelClips.map((c) => (
              <li
                key={c.index}
                className="group grid grid-cols-12 items-center gap-4 bg-ink-900 px-2 py-8 transition-colors duration-500 hover:bg-ink-950 md:px-6"
              >
                <span className="col-span-2 font-mono text-[10px] uppercase tracking-widest text-warmwhite/65 md:col-span-1">
                  §{c.index}
                </span>
                <span className="col-span-7 font-serif text-2xl tracking-tight text-warmwhite md:col-span-7 md:text-4xl">
                  {c.title}
                </span>
                <span className="col-span-3 hidden font-mono text-[10px] uppercase tracking-widest text-warmwhite/65 md:col-span-3 md:block">
                  {c.topic}
                </span>
                <span className="col-span-3 text-right font-mono text-[10px] uppercase tracking-widest text-warmwhite/65 md:col-span-1">
                  {c.duration}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-warmwhite/15 bg-ink-950 py-20 md:py-28">
        <div className="mx-auto flex max-w-[1640px] flex-wrap items-center justify-between gap-6 px-6 md:px-10">
          <p className="max-w-md font-serif text-3xl tracking-tight text-warmwhite md:text-5xl">
            Want the full reel as a download or for a pitch deck?
          </p>
          <Link
            href="/contact"
            data-cursor="hover"
            data-cursor-label="WRITE"
            className="rounded-full bg-warmwhite px-6 py-3 font-sans text-[11px] uppercase tracking-widest text-ink-900 hover:bg-peach"
          >
            Request reel ↗
          </Link>
        </div>
      </section>
    </>
  );
}
