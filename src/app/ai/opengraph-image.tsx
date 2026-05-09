import { renderOgCard, OG_SIZE } from "@/lib/og-card";

// Edge-rendered Open Graph card for /ai. Used by Slack / Discord /
// Twitter / LinkedIn / iMessage / etc when the URL is shared. Layout is
// shared across all primary routes via `renderOgCard` so the visual
// identity stays consistent.

export const alt = "AI Summary — Delowar Hossain";
export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default async function OG() {
  return renderOgCard({
    section: "§ AI Summary",
    eyebrow: "For AI engines",
    title: "AI Summary",
    titlePeriod: true,
    subtitle:
      "Plain-text snapshot for ChatGPT, Perplexity, Claude, Gemini. Hard facts and citation-ready prose.",
    path: "/ai",
  });
}
