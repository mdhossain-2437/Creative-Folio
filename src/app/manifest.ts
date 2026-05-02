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
    icons: [
      { src: "/og.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
    shortcuts: [
      { name: "Lab", short_name: "Lab", url: "/lab" },
      { name: "Now", short_name: "Now", url: "/now" },
      { name: "Journal", short_name: "Journal", url: "/journal" },
      { name: "Contact", short_name: "Contact", url: "/contact" },
    ],
  };
}
