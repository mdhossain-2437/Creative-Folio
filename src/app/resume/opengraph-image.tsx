import { renderOgCard, OG_SIZE } from "@/lib/og-card";

// Edge-rendered Open Graph card for /resume. Used by Slack / Discord /
// Twitter / LinkedIn / iMessage / etc when the URL is shared. Layout is
// shared across all primary routes via `renderOgCard` so the visual
// identity stays consistent.

export const alt = "Resume — Delowar Hossain";
export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default async function OG() {
  return renderOgCard({
    section: "§ Resume",
    eyebrow: "The 2026 PDF",
    title: "Resume",
    titlePeriod: true,
    subtitle:
      "Experience, education, expertise, and recognition. Full HTML resume on the page; PDF mirror on Drive.",
    path: "/resume",
  });
}
