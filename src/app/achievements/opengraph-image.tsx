import { renderOgCard, OG_SIZE } from "@/lib/og-card";

// Edge-rendered Open Graph card for /achievements. Used by Slack / Discord /
// Twitter / LinkedIn / iMessage / etc when the URL is shared. Layout is
// shared across all primary routes via `renderOgCard` so the visual
// identity stays consistent.

export const alt = "Achievements — A Studio Game";
export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default async function OG() {
  return renderOgCard({
    section: "§ Achievements",
    eyebrow: "A Studio Game",
    title: "Achievements",
    titlePeriod: true,
    subtitle:
      "Hidden interactions across the studio site. Twelve unlocks. Konami, ⌘K, secret words. Play with the place.",
    path: "/achievements",
  });
}
