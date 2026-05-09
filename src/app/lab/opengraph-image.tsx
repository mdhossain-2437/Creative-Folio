import { renderOgCard, OG_SIZE } from "@/lib/og-card";

// Edge-rendered Open Graph card for /lab. Used by Slack / Discord /
// Twitter / LinkedIn / iMessage / etc when the URL is shared. Layout is
// shared across all primary routes via `renderOgCard` so the visual
// identity stays consistent.

export const alt = "The Lab — Experiments";
export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default async function OG() {
  return renderOgCard({
    section: "§ Lab",
    eyebrow: "Experiments",
    title: "The Lab",
    titlePeriod: true,
    subtitle:
      "WebGL, GLSL shaders, motion systems and creative coding patterns. Where code meets art.",
    path: "/lab",
  });
}
