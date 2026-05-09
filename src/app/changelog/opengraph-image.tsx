import { renderOgCard, OG_SIZE } from "@/lib/og-card";

// Edge-rendered Open Graph card for /changelog. Used by Slack / Discord /
// Twitter / LinkedIn / iMessage / etc when the URL is shared. Layout is
// shared across all primary routes via `renderOgCard` so the visual
// identity stays consistent.

export const alt = "Changelog — What shipped & when";
export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default async function OG() {
  return renderOgCard({
    section: "§ Changelog",
    eyebrow: "What shipped & when",
    title: "Changelog",
    titlePeriod: true,
    subtitle:
      "A running log of the studio site itself. Feature drops, micro-interactions, and engineering polish.",
    path: "/changelog",
  });
}
