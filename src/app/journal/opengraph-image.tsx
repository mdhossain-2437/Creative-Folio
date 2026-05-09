import { renderOgCard, OG_SIZE } from "@/lib/og-card";

// Edge-rendered Open Graph card for /journal. Used by Slack / Discord /
// Twitter / LinkedIn / iMessage / etc when the URL is shared. Layout is
// shared across all primary routes via `renderOgCard` so the visual
// identity stays consistent.

export const alt = "Journal — Notes on Craft";
export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default async function OG() {
  return renderOgCard({
    section: "§ Journal",
    eyebrow: "Notes on craft",
    title: "Journal",
    titlePeriod: true,
    subtitle:
      "Thoughts, experiments and technical deep-dives on creative development, motion, AI, and craft.",
    path: "/journal",
  });
}
