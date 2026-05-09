import { renderOgCard, OG_SIZE } from "@/lib/og-card";

// Edge-rendered Open Graph card for /process. Used by Slack / Discord /
// Twitter / LinkedIn / iMessage / etc when the URL is shared. Layout is
// shared across all primary routes via `renderOgCard` so the visual
// identity stays consistent.

export const alt = "Process — Delowar Hossain";
export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default async function OG() {
  return renderOgCard({
    section: "§ Process",
    eyebrow: "How I work",
    title: "Process",
    titlePeriod: true,
    subtitle:
      "Discovery → Design → Prototype → Production. Four phases from blank Figma to shipped, award-grade work.",
    path: "/process",
  });
}
