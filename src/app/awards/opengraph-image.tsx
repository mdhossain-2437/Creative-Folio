import { renderOgCard, OG_SIZE } from "@/lib/og-card";

// Edge-rendered Open Graph card for /awards. Used by Slack / Discord /
// Twitter / LinkedIn / iMessage / etc when the URL is shared. Layout is
// shared across all primary routes via `renderOgCard` so the visual
// identity stays consistent.

export const alt = "Awards — Delowar Hossain";
export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default async function OG() {
  return renderOgCard({
    section: "§ Awards",
    eyebrow: "Trophy Room",
    title: "Awards",
    titlePeriod: true,
    subtitle:
      "International design and engineering recognition. Awwwards, CSSDA, FWA, Product Hunt — 2024 to present.",
    path: "/awards",
  });
}
