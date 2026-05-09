import { renderOgCard, OG_SIZE } from "@/lib/og-card";

// Edge-rendered Open Graph card for /atlas. Used by Slack / Discord /
// Twitter / LinkedIn / iMessage / etc when the URL is shared. Layout is
// shared across all primary routes via `renderOgCard` so the visual
// identity stays consistent.

export const alt = "Atlas — Site map as a constellation";
export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default async function OG() {
  return renderOgCard({
    section: "§ Atlas",
    eyebrow: "Site map",
    title: "Atlas",
    titlePeriod: true,
    subtitle:
      "Every route on the site, laid out as a star map. Hover to preview, click to fly there.",
    path: "/atlas",
  });
}
