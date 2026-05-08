import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// robots.txt — explicit, hand-curated rules for every major
// 2026/2027 crawler family. Three goals:
//
//   1. Branded-search SEO: Google + Bing should crawl unrestricted so
//      "Delowar Hossain" queries surface this site as the canonical
//      entity (Knowledge Panel + image carousel).
//   2. Generative Engine Optimization (GEO): we *want* GPTBot, ClaudeBot,
//      PerplexityBot, etc. to retrieve `/`, `/ai`, `/llms.txt`, and
//      `/llms-full.txt` so the site becomes a citable source in AI
//      answers ("who is a creative developer in Bangladesh?").
//   3. Tooling crawlers: Firecrawl, Brave, Common Crawl, You.com etc.
//      are explicitly allowlisted so future GEO platforms find content
//      without us having to revise the file.
//
// Intentionally *not* blocked: API/RSS endpoints (/journal/feed.xml,
// /api/feed.json, /llms.txt, /llms-full.txt) — these are part of our
// machine-readable footprint.
//
// To opt out of any specific bot in the future, add a `disallow: "/"`
// rule for that user agent below.

export default function robots(): MetadataRoute.Robots {
  // Generative-AI / retrieval crawlers we want to *allow*. Each gets an
  // explicit `Allow: /` so that even if something else changes the
  // wildcard policy, these stay opted-in.
  const aiCrawlers = [
    // OpenAI / ChatGPT
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    // Anthropic / Claude
    "ClaudeBot",
    "Claude-Web",
    "anthropic-ai",
    // Perplexity
    "PerplexityBot",
    "Perplexity-User",
    // Google AI surfaces (separate from regular Googlebot)
    "Google-Extended",
    "GoogleOther",
    // Apple Intelligence
    "Applebot-Extended",
    // Microsoft Copilot uses Bingbot
    "Bingbot",
    "BingPreview",
    // Common Crawl — feeds many open-source LLM training sets
    "CCBot",
    // ByteDance / Doubao
    "Bytespider",
    // Meta AI
    "FacebookBot",
    "Meta-ExternalAgent",
    "Meta-ExternalFetcher",
    // DuckDuckGo Assist
    "DuckAssistBot",
    "DuckDuckBot",
    // You.com
    "YouBot",
    // Mistral
    "MistralAI-User",
    // Cohere
    "Cohere-AI",
    // Brave Search index + Brave AI
    "BraveBot",
    "Brave-WebSearch",
    // Firecrawl (developer-side scraping for AI agents)
    "FirecrawlAgent",
    "Firecrawl",
    // Phind
    "PhindBot",
    // Diffbot
    "Diffbot",
    // Kagi search index
    "Kagibot",
  ];

  return {
    rules: [
      // Default: every other bot is allowed. Sensitive routes (none, here)
      // would go in the disallow list.
      { userAgent: "*", allow: "/" },

      // Explicit allow + a tiny crawl-delay for the highest-volume
      // generative bots so we don't get hammered on a single deploy.
      ...aiCrawlers.map((ua) => ({ userAgent: ua, allow: "/", crawlDelay: 1 })),

      // Googlebot + Bingbot already use sitemaps + IndexNow; leave them
      // unthrottled so first-party search ranking is uncapped.
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Googlebot-Image", allow: "/" },
      { userAgent: "Googlebot-News", allow: "/" },
    ],
    sitemap: [
      `${site.url}/sitemap.xml`,
    ],
    host: site.domain,
  };
}
