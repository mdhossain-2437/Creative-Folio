import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { nowFeed, githubFallback } from "@/lib/data";
import { Marquee } from "@/components/ui/Marquee";
import { ContributionHeatmap } from "@/components/now/ContributionHeatmap";

export const metadata: Metadata = {
  title: "Now — What I'm doing this season",
  description:
    "A small Derek-Sivers /now page. The current season — what I'm building, reading, listening to, and obsessing over. Updated monthly.",
};

const SEASON = "Spring 2027 · Joypurhat";

export default function NowPage() {
  return (
    <>
      <PageHero
        eyebrow="§07 — /now"
        title="Now."
        italic="The current season."
        description="A snapshot of what I&apos;m building, reading, and obsessing over right now. The page updates roughly once a month — if it&apos;s out of date, ⌘K and ping me."
        meta={[
          { label: "Updated", value: SEASON },
          { label: "Booking", value: "Q2 ’27 → Q4 ’27" },
          { label: "Inbox", value: "Open" },
          { label: "Mood", value: "Patient · Curious" },
        ]}
      />

      <section className="bg-ink-900 py-24 md:py-32">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <ul className="grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/15 md:grid-cols-2 lg:grid-cols-3">
            {nowFeed.map((it, i) => (
              <li key={it.tag} className="bg-ink-900 p-8 md:p-10">
                <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                  §0{i + 1} · {it.tag}
                </p>
                <p className="mt-6 font-serif text-2xl leading-snug tracking-tight text-warmwhite md:text-3xl">
                  {it.line}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink-950 py-16 md:py-24">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <ContributionHeatmap user="mdhossain-2437" />
        </div>
      </section>

      <section className="border-y border-warmwhite/15 bg-ink-950 py-10">
        <Marquee
          speed={48}
          items={[
            "BUILDING · AURA VOID v2",
            "WRITING · FLEXIBLE PAGE TRANSITIONS",
            "READING · DESIGNING SOUND",
            "LISTENING · FLOATING POINTS",
            "BOOKING · Q2 2027 → Q4 2027",
          ]}
        />
      </section>

      <section className="bg-ink-900 py-24 md:py-32">
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-4">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              ◊ Recent commits
            </p>
            <p className="mt-6 max-w-sm font-sans text-sm leading-relaxed text-warmwhite/65">
              Pulled from{" "}
              <Link
                href="https://github.com/mdhossain-2437"
                data-cursor="hover"
                data-cursor-label="GITHUB"
                className="text-peach underline-offset-4 hover:underline"
              >
                github.com/mdhossain-2437
              </Link>
              . Falls back to a snapshot if the rate limit catches us.
            </p>
          </div>
          <ul className="md:col-span-8 divide-y divide-warmwhite/15 border-y border-warmwhite/15">
            {githubFallback.map((c) => (
              <li key={c.sha} className="grid grid-cols-12 gap-4 py-5 font-mono text-[12px] uppercase tracking-widest text-warmwhite/65">
                <span className="col-span-2 text-warmwhite">{c.sha}</span>
                <span className="col-span-3 text-peach">{c.repo}</span>
                <span className="col-span-5 text-warmwhite/85 normal-case tracking-normal">
                  {c.message}
                </span>
                <span className="col-span-2 text-right text-warmwhite/65">{c.ago} ago</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-warmwhite/15 bg-ink-950 py-24 md:py-32">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
            ◊ Inspired by
          </p>
          <p className="mt-4 max-w-3xl font-serif text-[clamp(1.4rem,2.4vw,2.4rem)] leading-[1.2] text-warmwhite/85">
            Derek Sivers&apos; <span className="italic text-peach">/now page</span> movement —
            websites tell you who someone <em>was</em>, /now pages tell you who they
            <em> are</em>. Read the original at{" "}
            <Link
              href="https://nownownow.com"
              data-cursor="hover"
              data-cursor-label="NOWNOWNOW"
              className="text-warmwhite underline-offset-4 hover:underline"
            >
              nownownow.com
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
