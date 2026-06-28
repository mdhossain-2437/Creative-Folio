import { renderOgCard, OG_SIZE } from "@/lib/og-card";

// Edge-rendered Open Graph card for /awards. Used by Slack / Discord /
// Twitter / LinkedIn / iMessage / etc when the URL is shared. Layout is
// shared across all primary routes via `renderOgCard` so the visual
// identity stays consistent.

export const alt = "Recognition Targets — Delowar Hossain";
export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default async function OG() {
  return renderOgCard({
    section: "§ Recognition",
    eyebrow: "Transparent ledger",
    title: "Recognition Targets",
    titlePeriod: true,
    subtitle:
      "Award bodies the work is being prepared for, labelled as targets until public verification exists.",
    path: "/awards",
  });
}
