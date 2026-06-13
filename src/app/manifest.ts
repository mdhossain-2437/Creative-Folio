import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.role}`,
    short_name: site.shortName,
    description: site.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#070708",
    theme_color: "#070708",
    lang: "en",
    categories: ["design", "developer-tools", "portfolio"],
    // Square, edge-to-edge brand mark (the ink square + peach diamond + "D").
    // og.svg was a 1200×630 social card — wrong aspect for an app icon and a
    // PWA-installability failure. icon.svg is square and scalable, and the
    // full-bleed ink background + centered diamond make it a valid maskable
    // icon (safe-zone respected). apple-icon.tsx covers the iOS touch icon.
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Lab", short_name: "Lab", url: "/lab" },
      { name: "Now", short_name: "Now", url: "/now" },
      { name: "Journal", short_name: "Journal", url: "/journal" },
      { name: "Contact", short_name: "Contact", url: "/contact" },
    ],
  };
}
