import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { reelClips } from "@/lib/data";
import { ShowreelOpener } from "@/components/sections/ShowreelOpener";
import { ReelChapterCarouselClient } from "@/components/showreel/ReelChapterCarouselClient";

export const metadata: Metadata = {
  title: "Showreel — 02:17 of selected motion",
  description:
    "A vertical reel of selected work, 2026–2027. Six chapters, autoplay muted, click any chapter to scrub.",
};

export default function ShowreelPage() {
  return (
    <>
      <PageHero
        eyebrow="§08 — Reel"
        title="Showreel"
        italic="2027."
        description="Six chapters, 02:17 total. The reel is autoplay-muted and chapter-scrubbable. Press play in the floating pill at any moment to open the immersive view."
        meta={[
          { label: "Length", value: "02:17" },
          { label: "Chapters", value: String(reelClips.length).padStart(2, "0") },
          { label: "Resolution", value: "1080p / 4K master" },
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
