import { renderOgCard, OG_SIZE } from "@/lib/og-card";

// Edge-rendered Open Graph card for /colophon. Used by Slack / Discord /
// Twitter / LinkedIn / iMessage / etc when the URL is shared. Layout is
// shared across all primary routes via `renderOgCard` so the visual
// identity stays consistent.

export const alt = "Colophon — Delowar Hossain";
export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default async function OG() {
  return renderOgCard({
    section: "§ Colophon",
    eyebrow: "The Making Of",
    title: "Colophon",
    titlePeriod: true,
    subtitle:
      "How this site was built — stack, type, motion, and a few notes on craft.",
    path: "/colophon",
  });
}
