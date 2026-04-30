import Link from "next/link";
import { nowFeed } from "@/lib/data";

export function NowTeaser() {
  return (
    <section className="relative border-t border-warmwhite/10 bg-ink-950 py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-20" />
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/45">
              §05 — /now
            </p>
            <h2 className="mt-6 font-serif text-[clamp(2.5rem,6vw,5.4rem)] leading-[0.96] tracking-tightest">
              What I&apos;m
              <span className="block italic text-warmwhite/60">doing right now.</span>
            </h2>
            <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-warmwhite/65">
              Updated roughly once a month. The full /now page has the recent
              commits feed, the books I&apos;m reading, and what&apos;s on the deck.
            </p>
            <Link
              href="/now"
              data-cursor="hover"
              data-cursor-label="OPEN"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-warmwhite/30 px-5 py-2.5 font-sans text-[11px] uppercase tracking-widest hover:border-warmwhite"
            >
              Open /now ↗
            </Link>
          </div>
          <ul className="md:col-span-8 grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/10 sm:grid-cols-2">
            {nowFeed.slice(0, 4).map((it) => (
              <li key={it.tag} className="bg-ink-950 p-6 md:p-8">
                <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/45">
                  {it.tag}
                </p>
                <p className="mt-4 font-serif text-xl leading-snug tracking-tight text-warmwhite md:text-2xl">
                  {it.line}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
