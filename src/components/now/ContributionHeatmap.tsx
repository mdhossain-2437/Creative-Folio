// Server component — fetched at build time + revalidated hourly.
type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

type ApiResponse = {
  total: { [year: string]: number };
  contributions: Day[];
};

async function fetchContributions(user: string): Promise<ApiResponse | null> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, {
      next: { revalidate: 60 * 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as ApiResponse;
  } catch {
    return null;
  }
}

const LEVEL_FILL = [
  "rgba(239, 236, 233, 0.07)",
  "rgba(227, 191, 180, 0.32)",
  "rgba(227, 191, 180, 0.62)",
  "rgba(205, 250, 0, 0.65)",
  "rgba(205, 250, 0, 1)",
];

export async function ContributionHeatmap({ user }: { user: string }) {
  const data = await fetchContributions(user);

  // Layout: 53 columns × 7 rows. Cell 11×11 + 3 px gap → grid is 53*14-3 = 739 wide.
  const CELL = 11;
  const GAP = 3;
  const cols = 53;
  const rows = 7;
  const w = cols * (CELL + GAP) - GAP;
  const h = rows * (CELL + GAP) - GAP;

  // Pad/trim to 53 weeks ending today, Monday-start.
  let cells: (Day | null)[] = Array.from({ length: cols * rows }, () => null);
  let total = 0;
  if (data) {
    const days = data.contributions;
    total = days.reduce((acc, d) => acc + d.count, 0);
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
    <div className="rounded-3xl border border-warmwhite/10 bg-ink-900 p-8 md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/45">
            ◊ GitHub · last 365 days
          </p>
          <p className="mt-2 font-serif text-[clamp(1.6rem,3vw,2.6rem)] leading-none tracking-tightest text-warmwhite">
            {data ? total.toLocaleString("en") : "—"}
            <span className="ml-2 text-warmwhite/55">contributions</span>
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
        {!data ? (
          <span className="ml-auto text-warmwhite/35">— offline; rendering placeholder grid</span>
        ) : null}
      </div>
    </div>
  );
}
