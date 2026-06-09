import { renderOgCard, OG_SIZE } from "@/lib/og-card";
import { site } from "@/lib/site";

// Route-segment exports must live in the route file — Next inlines them at
// build time, so they can't come from the shared helper.
export const alt = `Brand — Identity Kit · ${site.name}`;
export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default function OG() {
  return renderOgCard({
    section: "§ Brand",
    eyebrow: "Identity Kit · MMXXVII",
    title: "The brand system",
    subtitle:
      "Logomark, wordmark, the peach diamond, ink palette, type and downloadable banners — one identity, end to end.",
    path: "/brand",
  });
}
