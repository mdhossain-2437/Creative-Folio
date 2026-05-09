import { renderOgCard, OG_SIZE } from "@/lib/og-card";

// Edge-rendered Open Graph card for /colors. Used by Slack / Discord /
// Twitter / LinkedIn / iMessage / etc when the URL is shared. Layout is
// shared across all primary routes via `renderOgCard` so the visual
// identity stays consistent.

export const alt = "Colors — Studio Palette";
export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default async function OG() {
  return renderOgCard({
    section: "§ Colors",
    eyebrow: "Studio Palette",
    title: "Colors",
    titlePeriod: true,
    subtitle:
      "Hex values, Tailwind tokens, and on-ink contrast ratios for the studio's brand palette.",
    path: "/colors",
  });
}
