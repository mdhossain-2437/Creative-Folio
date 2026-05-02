import Link from "next/link";
import { nowFeed, journal } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

// CurrentBand — MMXXVII (post-audit). Combines the previous NowTeaser +
// JournalPreview into a single split-grid: "what's current" on the left
// (now feed, 4 items) and "latest from the journal" on the right (3 posts).
// One section instead of two, half the vertical real estate.

export function CurrentBand() {
  const latestPosts = journal.slice(0, 3);

  return (
    <section className="relative border-t border-warmwhite/15 bg-ink-950 py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-20" />
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <header className="grid grid-cols-1 items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              ◊ /now &amp; Journal
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2.5rem,6.5vw,5.6rem)] leading-[0.96] tracking-tightest">
              Currently
              <span className="block italic text-warmwhite/60">in motion.</span>
            </h2>
          </div>
          <p className="md:col-span-5 max-w-md font-sans text-base leading-relaxed text-warmwhite/65 md:text-lg">
            What I&apos;m building, writing, reading, and listening to right now —
            plus the latest posts from the studio journal.
          </p>
        </header>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Left column: /now feed */}
          <div className="md:col-span-7">
            <div className="flex items-baseline justify-between border-b border-warmwhite/15 pb-4">
              <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                What&apos;s on the deck
              </p>
              <Link
                href="/now"
                data-cursor="hover"
                data-cursor-label="OPEN"
                className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 hover:text-warmwhite"
              >
                Open /now ↗
              </Link>
            </div>
            <ul className="grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/15 sm:grid-cols-2">
              {nowFeed.slice(0, 4).map((it) => (
                <li key={it.tag} className="bg-ink-950 p-6 md:p-8">
                  <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                    {it.tag}
                  </p>
                  <p className="mt-4 font-serif text-xl leading-snug tracking-tight text-warmwhite md:text-[1.55rem]">
                    {it.line}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column: latest journal posts */}
          <div className="md:col-span-5">
            <div className="flex items-baseline justify-between border-b border-warmwhite/15 pb-4">
              <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                From the Journal
              </p>
              <Link
                href="/journal"
                data-cursor="hover"
                data-cursor-label="ALL POSTS"
                className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 hover:text-warmwhite"
              >
                All Posts →
              </Link>
            </div>
            <ul className="divide-y divide-warmwhite/15">
              {latestPosts.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.05}>
                  <li>
                    <Link
                      href={`/journal/${p.slug}`}
                      data-cursor="view"
                      data-cursor-label="READ"
                      className="block py-6 transition-colors hover:bg-warmwhite/[0.02]"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                          {p.date}
                        </span>
                        <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                          {p.readingTime}
                        </span>
                      </div>
                      <p className="mt-3 font-serif text-2xl leading-tight tracking-tighter text-warmwhite group-hover:text-peach md:text-[1.6rem]">
                        {p.title}
                      </p>
                      <p className="mt-2 font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                        {p.category}
                      </p>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
