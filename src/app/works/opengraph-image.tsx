import { renderOgCard, OG_SIZE } from "@/lib/og-card";

// Edge-rendered Open Graph card for /works. Used by Slack / Discord /
// Twitter / LinkedIn / iMessage / etc when the URL is shared. Layout is
// shared across all primary routes via `renderOgCard` so the visual
// identity stays consistent.

export const alt = "Selected Works — Delowar Hossain";
export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default async function OG() {
  return renderOgCard({
    section: "§ Selected Works",
    eyebrow: "Selected Works",
    title: "Works",
    titlePeriod: true,
    subtitle:
      "A curated collection of digital experiences, interactive installations and experimental web architecture.",
    path: "/works",
  });
}
