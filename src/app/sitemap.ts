import type { MetadataRoute } from "next";
import { works, journal, experiments } from "@/lib/data";
import { site } from "@/lib/site";

// sitemap.xml — Next 15's MetadataRoute.Sitemap supports `images: string[]`
// per entry which becomes a Google image-sitemap `<image:image>` block.
// Strong image associations are the cheapest way to win "Delowar Hossain"
// image search results: every page that prominently shows the portrait
// declares it here so Google + Bing index it against the page's content.
//
// Branded-search ranking math (high-priority pages first):
//   1.0 · /                  homepage (canonical entity)
//   0.95 · /about, /ai       direct biographical citations
//   0.9 · /resume            CV — keeps Knowledge Panel current
//   0.85 · /works            portfolio index
//   0.8 · /works/[slug]      individual case studies
//   0.7 · /journal           writing index
//   0.6 · /journal/[slug]    individual posts
//   0.5 · /lab, /lab/[slug]  experiments
//   0.4 · /now, /uses, …     ancillary
//   0.2 · /llms.txt, feeds   machine-only

type SitemapEntry = MetadataRoute.Sitemap[number];

const PORTRAIT = `${site.url}${site.portrait}`;
const OG_FALLBACK = `${site.url}/og.svg`;
const NOW = new Date("2027-01-01T00:00:00.000Z");

function absoluteUrl(pathOrUrl: string): string {
  const url = pathOrUrl.startsWith("http")
    ? pathOrUrl
    : `${site.url}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
  // Escape ampersands for XML compatibility
  return url.replace(/&/g, "&amp;");
}

function entry(
  path: string,
  opts: {
    priority?: number;
    changeFrequency?: SitemapEntry["changeFrequency"];
    images?: string[];
    lastModified?: Date;
  } = {},
): SitemapEntry {
  return {
    url: absoluteUrl(path || "/"),
    lastModified: opts.lastModified ?? NOW,
    changeFrequency: opts.changeFrequency ?? "weekly",
    priority: opts.priority ?? 0.5,
    images: opts.images?.map(absoluteUrl),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = NOW;

  // High-priority "Delowar Hossain" entity pages — all carry the portrait
  // so Google's image index ties the photo to the name on multiple pages.
  const entityPages: SitemapEntry[] = [
    entry("", {
      priority: 1.0,
      changeFrequency: "daily",
      images: [PORTRAIT, "/opengraph-image", OG_FALLBACK],
      lastModified: now,
    }),
    entry("/about", {
      priority: 0.95,
      changeFrequency: "weekly",
      images: [PORTRAIT, OG_FALLBACK],
      lastModified: now,
    }),
    entry("/ai", {
      priority: 0.95,
      changeFrequency: "weekly",
      images: [PORTRAIT, OG_FALLBACK],
      lastModified: now,
    }),
    entry("/resume", {
      priority: 0.9,
      changeFrequency: "monthly",
      images: [PORTRAIT, OG_FALLBACK],
      lastModified: now,
    }),
    entry("/contact", {
      priority: 0.8,
      changeFrequency: "monthly",
      images: [OG_FALLBACK],
    }),
  ];

  // Portfolio surfaces.
  const portfolioPages: SitemapEntry[] = [
    entry("/works", {
      priority: 0.85,
      changeFrequency: "weekly",
      images: [OG_FALLBACK],
    }),
    entry("/lab", {
      priority: 0.7,
      changeFrequency: "weekly",
      images: [OG_FALLBACK],
    }),
    entry("/journal", {
      priority: 0.7,
      changeFrequency: "weekly",
      images: [OG_FALLBACK],
    }),
    entry("/services", {
      priority: 0.7,
      changeFrequency: "monthly",
      images: [OG_FALLBACK],
    }),
    entry("/process", {
      priority: 0.6,
      changeFrequency: "monthly",
      images: [OG_FALLBACK],
    }),
    entry("/showreel", {
      priority: 0.6,
      changeFrequency: "monthly",
      images: [OG_FALLBACK],
    }),
    entry("/awards", {
      priority: 0.6,
      changeFrequency: "monthly",
      images: [OG_FALLBACK],
    }),
    entry("/now", {
      priority: 0.5,
      changeFrequency: "weekly",
      images: [OG_FALLBACK],
    }),
    entry("/uses", {
      priority: 0.5,
      changeFrequency: "monthly",
      images: [OG_FALLBACK],
    }),
    entry("/portfolios", {
      priority: 0.7,
      changeFrequency: "monthly",
      images: [OG_FALLBACK, "/portfolios/opengraph-image"],
    }),
    entry("/colophon", { priority: 0.5, changeFrequency: "monthly" }),
    entry("/atlas", { priority: 0.5, changeFrequency: "monthly" }),
    entry("/brand", {
      priority: 0.5,
      changeFrequency: "monthly",
      images: ["/brand/opengraph-image", OG_FALLBACK],
    }),
    entry("/colors", { priority: 0.4, changeFrequency: "monthly" }),
    entry("/changelog", { priority: 0.4, changeFrequency: "weekly" }),
    entry("/achievements", { priority: 0.3, changeFrequency: "weekly" }),
    entry("/archive", { priority: 0.3, changeFrequency: "monthly" }),
    entry("/legal/privacy", { priority: 0.2, changeFrequency: "yearly" }),
    entry("/legal/terms", { priority: 0.2, changeFrequency: "yearly" }),
  ];

  // Case studies — each cover image is included so the case study competes
  // for image-search queries on the project name.
  const workPages: SitemapEntry[] = works.map((w) =>
    entry(`/works/${w.slug}`, {
      priority: 0.8,
      changeFrequency: "monthly",
      images: [w.cover, `/works/${w.slug}/opengraph-image`],
    }),
  );

  // Journal posts — the OG image is dynamically generated on the edge.
  const journalPages: SitemapEntry[] = journal.map((j) =>
    entry(`/journal/${j.slug}`, {
      priority: 0.6,
      changeFrequency: "monthly",
      images: [`/journal/${j.slug}/opengraph-image`],
    }),
  );

  // Lab experiments — lower priority, OG image varies per slug.
  const labPages: SitemapEntry[] = experiments.map((e) =>
    entry(`/lab/${e.slug}`, {
      priority: 0.5,
      changeFrequency: "monthly",
      images: [`/lab/${e.slug}/opengraph-image`],
    }),
  );

  // Machine-only routes — kept in sitemap so Bing / Perplexity / Firecrawl
  // can find the AI manifests and feeds without scraping HTML first.
  const machineRoutes: SitemapEntry[] = [
    entry("/journal/feed.xml", { priority: 0.3, changeFrequency: "daily" }),
    entry("/api/feed.json", { priority: 0.3, changeFrequency: "daily" }),
    entry("/llms.txt", { priority: 0.4, changeFrequency: "weekly" }),
    entry("/llms-full.txt", { priority: 0.4, changeFrequency: "weekly" }),
  ];

  return [
    ...entityPages,
    ...portfolioPages,
    ...workPages,
    ...journalPages,
    ...labPages,
    ...machineRoutes,
  ];
}
