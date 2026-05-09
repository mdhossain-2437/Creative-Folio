import { renderOgCard, OG_SIZE } from "@/lib/og-card";

// Edge-rendered Open Graph card for /showreel. Used by Slack / Discord /
// Twitter / LinkedIn / iMessage / etc when the URL is shared. Layout is
// shared across all primary routes via `renderOgCard` so the visual
// identity stays consistent.

export const alt = "Showreel — 02:17 of selected motion";
export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default async function OG() {
  return renderOgCard({
    section: "§ Showreel",
    eyebrow: "02:17 of motion",
    title: "Showreel",
    titlePeriod: true,
    subtitle:
      "A vertical reel of selected work, 2026–2027. Six chapters. Click any chapter to scrub.",
    path: "/showreel",
  });
}
