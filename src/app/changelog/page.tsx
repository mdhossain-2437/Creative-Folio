import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { ChangelogVisitTracker } from "@/components/changelog/ChangelogVisitTracker";
import { site } from "@/lib/site";
import { PageSchema } from "@/components/seo/PageSchema";

export const metadata: Metadata = {
  title: "Changelog — What shipped & when",
  description:
    "A running log of the studio site itself — feature drops, lab experiments, micro-interactions and engineering polish, in reverse-chronological order.",
};

type Tag = "feat" | "fix" | "lab" | "polish" | "seo" | "infra";
type Entry = {
  date: string; // yyyy.mm.dd
  tag: Tag;
  title: string;
  bullets: string[];
  pr?: number;
};

const ENTRIES: Entry[] = [
  {
    date: "2026.04.30",
    tag: "feat",
    title: "Snapshot, fullscreen, and a public changelog",
    pr: 22,
    bullets: [
      "D shortcut + visible Save PNG button on every /lab/<slug> playground — dumps the live canvas as a timestamped PNG.",
      "/changelog page (this one) reading from a static, hand-curated list. New Curator and Snapshotter achievements (12th and 13th).",
    ],
  },
  {
    date: "2026.04.30",
    tag: "seo",
    title: "OG images for /uses, /now, /about",
    pr: 21,
    bullets: [
      "Edge-rendered 1200×630 OpenGraph images for the three biggest static pages. Same template family as the existing per-slug OGs.",
      "11th achievement Tinkerer added, unlocked on first /uses visit.",
    ],
  },
  {
    date: "2026.04.30",
    tag: "feat",
    title: "/uses page + JSON Feed v1.1 endpoint",
    pr: 20,
    bullets: [
      "New /uses route — opinionated 7-section answer to ‘what's your setup?’.",
      "Public /api/feed.json combining journal posts, works, and lab experiments. Date-sorted, edge-cached, CORS-open.",
      "/lab/<slug> bottom now shows Previous and Next experiment links plus a [ / ] · J / K hint chip.",
    ],
  },
  {
    date: "2026.04.30",
    tag: "lab",
    title: "Three more lab experiments",
    pr: 18,
    bullets: [
      "Wave Interference, Kaleidoscope Mirror, and Metaballs Field — each with its own init + tick + Brief / Controls / README.",
      "All three respect prefers-reduced-motion, pause off-screen via IntersectionObserver, and cap FPS individually.",
    ],
  },
  {
    date: "2026.04.30",
    tag: "feat",
    title: "Command-palette content search & per-post JSON-LD",
    pr: 17,
    bullets: [
      "⌘K now indexes journal post bodies and lab summaries — typing surfaces matching content, not just routes.",
      "Per-post BlogPosting schema.org JSON-LD on /journal/<slug> for richer Google previews.",
      "Footer shows a monospaced commit-hash link to the exact GitHub commit.",
    ],
  },
  {
    date: "2026.04.29",
    tag: "seo",
    title: "Edge OG images + /journal/feed.xml",
    pr: 16,
    bullets: [
      "Per-slug OG images on works, journal, and lab — generated at the edge.",
      "Atom feed at /journal/feed.xml. Anchor-link copy buttons on hero titles. Hero-italic scramble-text effect.",
    ],
  },
  {
    date: "2026.04.29",
    tag: "polish",
    title: "Tab-title flicker, ::selection, print stylesheet",
    pr: 15,
    bullets: [
      "Title flickers a wink message when the tab loses focus.",
      "Custom ::selection color, full print stylesheet, once-ever first-visit nudge.",
      "Live Joypurhat-local clock in the footer.",
    ],
  },
  {
    date: "2026.04.29",
    tag: "feat",
    title: "Scroll progress, S-key share, true-believer easter egg",
    pr: 14,
    bullets: [
      "Top scroll-progress hairline on every non-journal page (defers to ReadingProgress on journal posts).",
      "S key copies the current page URL with a toast.",
      "Type d-e-l-o-w-a-r anywhere → brand reveal modal + 10th achievement True believer.",
      "Share-post pill on every journal entry.",
    ],
  },
  {
    date: "2026.04.29",
    tag: "feat",
    title: "Achievements page, lab filters, J/K/F shortcuts",
    pr: 13,
    bullets: [
      "/achievements board — see every unlock and its description live.",
      "Lab category filter pills, prev/next/fullscreen shortcuts on playgrounds.",
      "Cursor-spotlight glow on dark sections (respects reduced-motion).",
    ],
  },
  {
    date: "2026.04.29",
    tag: "feat",
    title: "Toasts, achievements, G-key nav, Konami",
    pr: 12,
    bullets: [
      "Global toast primitive + 9-id achievement system, persisted in localStorage.",
      "G+key chord navigation. Animated favicon. DevTools console banner with open-detection.",
      "Lab page random pill + per-card hover-reveal copy-link.",
    ],
  },
  {
    date: "2026.04.28",
    tag: "lab",
    title: "Unique demo per experiment + 5 new playgrounds",
    pr: 11,
    bullets: [
      "Every lab card now shows its own runtime mini-preview — no more shared demos or duplicate first-word overlay.",
      "5 new experiments: reaction-diffusion, voronoi-cells, flow-field, lissajous-orbits, boids-flock.",
      "Several review-found bug fixes: shader-storm tear-down, off-screen rAF still scheduled, latency false-jank, mouse-velocity drift, Gray-Scott edge depletion.",
    ],
  },
];

const TAG_STYLES: Record<Tag, { label: string; cls: string }> = {
  feat: { label: "feat", cls: "bg-electric/15 text-electric" },
  fix: { label: "fix", cls: "bg-emerald-300/15 text-emerald-300" },
  lab: { label: "lab", cls: "bg-peach/20 text-peach" },
  polish: { label: "polish", cls: "bg-warmwhite/15 text-warmwhite" },
  seo: { label: "seo", cls: "bg-amber-200/15 text-amber-200" },
  infra: { label: "infra", cls: "bg-rose-300/15 text-rose-300" },
};

export default function ChangelogPage() {
  return (
    <>
      <PageSchema
        path="/changelog"
        name="Changelog — What shipped & when"
        description="A running log of the studio site itself — feature drops, lab experiments, micro-interactions and engineering polish, in reverse-chronological order."
        crumbs={[{ name: "Home", href: "/" }, { name: "Changelog", href: "/changelog" }]}
      />
      <ChangelogVisitTracker />
      <PageHero
        eyebrow="§ 09 — Changelog"
        title="What"
        italic="shipped & when."
        description="A running log of this studio site itself — features, lab experiments, micro-interactions, and the engineering polish that makes them stick. Newest first."
        meta={[
          { label: "Entries", value: String(ENTRIES.length) },
          { label: "Edition", value: "MMXXVII" },
          { label: "Source", value: "Hand-curated" },
          { label: "Repo", value: "GitHub" },
        ]}
      />

      <section className="bg-ink-900 py-24 md:py-32">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <ol className="space-y-16 border-l border-warmwhite/15 pl-6 md:pl-10">
            {ENTRIES.map((entry) => {
              const tag = TAG_STYLES[entry.tag];
              return (
                <li key={`${entry.date}-${entry.title}`} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[33px] top-3 h-2 w-2 rounded-full bg-peach md:-left-[43px]"
                  />
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-warmwhite/55">
                      {entry.date}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${tag.cls}`}
                    >
                      §{tag.label}
                    </span>
                    {entry.pr && (
                      <Link
                        href={`${site.repo}/pull/${entry.pr}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="hover"
                        data-cursor-label="PR"
                        className="rounded-full border border-warmwhite/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-warmwhite/55 hover:border-warmwhite/40 hover:text-warmwhite"
                      >
                        PR #{entry.pr}
                      </Link>
                    )}
                  </div>
                  <h2 className="mt-4 break-words font-serif text-3xl tracking-tight md:text-5xl">
                    {entry.title}
                  </h2>
                  <ul className="mt-6 max-w-3xl space-y-3 font-sans text-base leading-relaxed text-warmwhite/70 md:text-lg">
                    {entry.bullets.map((b, i) => (
                      <li key={i} className="flex gap-4">
                        <span aria-hidden className="mt-2 h-px w-4 bg-warmwhite/30" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="border-t border-warmwhite/15 bg-ink-950 py-20 md:py-28">
        <div className="mx-auto flex max-w-[1640px] flex-wrap items-center justify-between gap-6 px-6 md:px-10">
          <p className="max-w-2xl font-serif text-[clamp(1.4rem,2.4vw,2.4rem)] leading-[1.2] text-warmwhite/85">
            The full diff lives on GitHub — every PR, every commit, every preview deploy.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={site.repo}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              data-cursor-label="REPO"
              className="rounded-full bg-warmwhite px-6 py-3 font-sans text-[11px] uppercase tracking-widest text-ink-900 hover:bg-peach"
            >
              Browse the repo →
            </Link>
            <Link
              href="/api/feed.json"
              data-cursor="hover"
              data-cursor-label="JSON"
              className="rounded-full border border-warmwhite/30 px-6 py-3 font-sans text-[11px] uppercase tracking-widest hover:border-warmwhite"
            >
              Subscribe (JSON Feed)
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
