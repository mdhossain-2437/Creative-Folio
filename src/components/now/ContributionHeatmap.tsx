// Server component — receives prefetched contribution data from the
// /api/github edge function (called once per /now request via
// fetchGitHubData() in src/lib/github-fetch.ts). Renders the same
// 53×7 SVG heatmap; falls back to an empty grid when stale.

import type { GitHubDay } from "@/lib/github";

type Day = GitHubDay;

const LEVEL_FILL = [
  "rgba(239, 236, 233, 0.07)",
  "rgba(227, 191, 180, 0.32)",
  "rgba(227, 191, 180, 0.62)",
  "rgba(205, 250, 0, 0.65)",
  "rgba(205, 250, 0, 1)",
];

type Props = {
  user: string;
  days: Day[];
  total: number;
  stale?: boolean;
};

export function ContributionHeatmap({ user, days, total, stale }: Props) {
  // Layout: 53 columns × 7 rows. Cell 11×11 + 3 px gap → grid is 53*14-3 = 739 wide.
  const CELL = 11;
  const GAP = 3;
  const cols = 53;
  const rows = 7;
  const w = cols * (CELL + GAP) - GAP;
  const h = rows * (CELL + GAP) - GAP;

  // Pad/trim to 53 weeks ending today, Monday-start.
  const cells: (Day | null)[] = Array.from({ length: cols * rows }, () => null);
  if (days.length) {
    // Map each day onto a weekday × week column relative to the latest day.
    const last = new Date(days[days.length - 1]?.date ?? new Date().toISOString().slice(0, 10));
    const lastWeekday = (last.getDay() + 6) % 7; // Monday=0..Sunday=6
    for (let i = days.length - 1; i >= 0; i--) {
      const d = days[i];
      const offset = days.length - 1 - i; // 0 = last day
      const weekday = (lastWeekday - (offset % 7) + 7 * 7) % 7;
      const col = cols - 1 - Math.floor((offset + (6 - lastWeekday)) / 7);
      if (col < 0 || col >= cols) continue;
      cells[weekday * cols + col] = d;
    }
  }
  const hasData = days.length > 0;

  const months: { col: number; label: string }[] = [];
  for (let c = 0; c < cols; c++) {
    const cell = cells[c]; // top row, gives a sense of week start
    if (!cell) continue;
    const m = new Date(cell.date).toLocaleString("en", { month: "short" });
    if (!months.length || months[months.length - 1].label !== m) {
      months.push({ col: c, label: m });
    }
  }

  return (
    <div className="rounded-3xl border border-warmwhite/15 bg-ink-900 p-8 md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
            ◊ GitHub · last 365 days
          </p>
          <p className="mt-2 font-serif text-[clamp(1.6rem,3vw,2.6rem)] leading-none tracking-tightest text-warmwhite">
            {hasData ? total.toLocaleString("en") : "—"}
            <span className="ml-2 text-warmwhite/55">contributions</span>
            {stale ? (
              <span className="ml-3 align-middle font-sans text-[9px] uppercase tracking-widest text-warmwhite/45">
                · cached
              </span>
            ) : null}
          </p>
        </div>
        <a
          href={`https://github.com/${user}`}
          data-cursor="hover"
          data-cursor-label="GITHUB"
          className="font-mono text-[12px] uppercase tracking-widest text-peach underline-offset-4 hover:underline"
        >
          @{user}
        </a>
      </div>

      <div className="mt-8 overflow-x-auto">
        <svg
          role="img"
          aria-label={`GitHub contributions heatmap for ${user}, ${total} contributions in the last 365 days`}
          viewBox={`0 0 ${w} ${h + 18}`}
          width="100%"
          className="block"
        >
          <g transform="translate(0, 16)">
            {cells.map((cell, idx) => {
              const r = Math.floor(idx / cols);
              const c = idx % cols;
              const x = c * (CELL + GAP);
              const y = r * (CELL + GAP);
              const level = cell?.level ?? 0;
              return (
                <rect
                  key={idx}
                  x={x}
                  y={y}
                  width={CELL}
                  height={CELL}
                  rx={2}
                  fill={LEVEL_FILL[level]}
                >
                  {cell ? <title>{`${cell.date} · ${cell.count} contributions`}</title> : null}
                </rect>
              );
            })}
          </g>
          {months.map((m) => (
            <text
              key={m.label + m.col}
              x={m.col * (CELL + GAP)}
              y={10}
              fill="rgba(239,236,233,0.45)"
              fontSize={9}
              fontFamily="JetBrains Mono, ui-monospace, monospace"
              style={{ letterSpacing: "0.18em", textTransform: "uppercase" }}
            >
              {m.label}
            </text>
          ))}
        </svg>
      </div>

      <div className="mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-warmwhite/55">
        <span>less</span>
        {LEVEL_FILL.map((fill, i) => (
          <span
            key={i}
            className="inline-block rounded-[2px]"
            style={{ width: 11, height: 11, background: fill }}
            aria-hidden
          />
        ))}
        <span>more</span>
        {!hasData ? (
          <span className="ml-auto text-warmwhite/35">— offline; rendering placeholder grid</span>
        ) : null}
      </div>
    </div>
  );
}
