import { renderOgCard, OG_SIZE } from "@/lib/og-card";

// Edge-rendered Open Graph card for /archive. Used by Slack / Discord /
// Twitter / LinkedIn / iMessage / etc when the URL is shared. Layout is
// shared across all primary routes via `renderOgCard` so the visual
// identity stays consistent.

export const alt = "Archive — All Works";
export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default async function OG() {
  return renderOgCard({
    section: "§ Archive",
    eyebrow: "All works, every year",
    title: "Archive",
    titlePeriod: true,
    subtitle:
      "An exhaustive index of every project — solo experiments, client engagements, and the long tail.",
    path: "/archive",
  });
}
