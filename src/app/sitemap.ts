import type { MetadataRoute } from "next";
import { works, journal, experiments } from "@/lib/data";
import { site } from "@/lib/site";

const STATIC_PATHS = [
  "",
  "/works",
  "/lab",
  "/about",
  "/resume",
  "/journal",
  "/services",
  "/contact",
  "/archive",
  "/awards",
  "/colophon",
  "/now",
  "/process",
  "/showreel",
  "/atlas",
  "/achievements",
  "/legal/privacy",
  "/legal/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...STATIC_PATHS.map((p) => ({ url: `${site.url}${p}`, lastModified: now })),
    ...works.map((w) => ({ url: `${site.url}/works/${w.slug}`, lastModified: now })),
    ...journal.map((j) => ({ url: `${site.url}/journal/${j.slug}`, lastModified: now })),
    ...experiments.map((e) => ({ url: `${site.url}/lab/${e.slug}`, lastModified: now })),
    { url: `${site.url}/journal/feed.xml`, lastModified: now },
  ];
}
