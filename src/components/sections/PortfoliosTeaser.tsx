// PortfoliosTeaser — home-page section that surfaces the year-by-year
// archive of every portfolio edition Delowar Hossain has shipped. Shows
// the four most-recent editions; "see all" CTA points to `/portfolios`.
//
// Why on the home page: this is one of the most-asked questions in the
// inbox ("what did your 2024 portfolio look like?"). Surfacing the
// archive at the top of the funnel removes a question and adds a
// long-tail SEO target ("delowar hossain portfolio 2024", etc.).
//
// Each card is two layers:
//   · the card itself links to the archive page (so screen-readers and
//     keyboard users always have a clear primary action), and
//   · when the edition has its own subdomain (2023/2024/.../2026, or
//     delowarhossain.delowarhossain.dev for the current MMXXVII build)
//     a small "↗ open live" pill in the corner opens that archive in a
//     new tab.

import Link from "next/link";
import { portfolios } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function PortfoliosTeaser() {
  // Show the four newest editions on the home page; the rest live on /portfolios.
  const featured = portfolios.slice(0, 4);

  return (
    <section
      aria-label="Portfolios — every year a new portfolio"
      className="border-y border-warmwhite/15 bg-ink-950 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <header className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="font-sans text-[10px] uppercase tracking-widest text-peach">
              ◊ §12 — Portfolios
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2.4rem,5vw,5rem)] leading-[0.95] tracking-tightest">
              Every year a <span className="italic text-peach">new portfolio.</span>
            </h2>
            <p className="mt-4 max-w-prose font-sans text-sm leading-relaxed text-warmwhite/65 md:text-base">
              The studio rebuilds its portfolio from scratch every year — a different codename,
              a different visual register, a different idea about what a portfolio should be.
              {" "}{portfolios.length} editions and counting, each one still live at its own
              subdomain.
            </p>
          </div>
          <Link
            href="/portfolios"
            data-cursor="view"
            data-cursor-label="OPEN ARCHIVE"
            className="inline-flex w-fit items-center gap-2 self-start rounded-full border border-peach/55 px-5 py-3 font-sans text-[10px] uppercase tracking-widest text-peach transition-colors hover:bg-peach hover:text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach md:self-end"
          >
            See all {portfolios.length.toString().padStart(2, "0")} editions <span aria-hidden>↗</span>
          </Link>
        </header>

        <ol className="grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/15 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.year + p.codename} as="li" delay={i * 0.05}>
              <article className="group relative flex h-full flex-col gap-5 bg-ink-900 p-6 transition-colors hover:bg-ink-950 md:p-8">
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-3 font-serif text-[clamp(3rem,6vw,5rem)] leading-none tracking-tightest opacity-15 transition-opacity duration-500 group-hover:opacity-30"
                  style={{ color: p.accent }}
                >
                  {p.year}
                </span>
                <span
                  className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest"
                  style={{ color: p.accent }}
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: p.accent }}
                  />
                  {p.edition}
                </span>
                <h3 className="break-words font-serif text-[clamp(1.4rem,2.2vw,2.2rem)] leading-tight tracking-tightest">
                  {p.codename}
                </h3>
                <p className="line-clamp-3 font-sans text-sm leading-relaxed text-warmwhite/65">
                  {p.description}
                </p>

                {/* Primary action — opens that year's archive subdomain in a new tab when available. */}
                <div className="mt-auto flex flex-wrap items-center gap-2">
                  {p.href && (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="view"
                      data-cursor-label="OPEN LIVE"
                      aria-label={`Open the ${p.year} portfolio (${p.codename}) in a new tab`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-warmwhite/25 px-3 py-1.5 font-sans text-[10px] uppercase tracking-widest text-warmwhite/85 transition-colors hover:border-peach hover:text-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
                    >
                      ↗ {new URL(p.href).host}
                    </a>
                  )}
                  <Link
                    href="/portfolios"
                    data-cursor="view"
                    data-cursor-label="ARCHIVE"
                    className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55 transition-colors hover:text-peach"
                  >
                    {p.status === "Current" ? "✦ You are here" : "↗ View archive"}
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
