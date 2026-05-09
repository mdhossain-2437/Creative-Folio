import { renderOgCard, OG_SIZE } from "@/lib/og-card";

// Edge-rendered Open Graph card for /services. Used by Slack / Discord /
// Twitter / LinkedIn / iMessage / etc when the URL is shared. Layout is
// shared across all primary routes via `renderOgCard` so the visual
// identity stays consistent.

export const alt = "Services — Delowar Hossain";
export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default async function OG() {
  return renderOgCard({
    section: "§ Services",
    eyebrow: "Engagement Tiers",
    title: "Services",
    titlePeriod: true,
    subtitle:
      "Project, retainer, and embedded engagements. Editorial design + creative development at studio rate.",
    path: "/services",
  });
}
