import { renderOgCard, OG_SIZE } from "@/lib/og-card";

// Edge-rendered Open Graph card for /contact. Used by Slack / Discord /
// Twitter / LinkedIn / iMessage / etc when the URL is shared. Layout is
// shared across all primary routes via `renderOgCard` so the visual
// identity stays consistent.

export const alt = "Contact — Delowar Hossain";
export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default async function OG() {
  return renderOgCard({
    section: "§ Contact",
    eyebrow: "Open for inquiries",
    title: "Hello",
    titlePeriod: true,
    subtitle:
      "Inquiries, collaborations, retainers. Open Q1 — Q4 / 2027. The studio replies within two business days.",
    path: "/contact",
  });
}
