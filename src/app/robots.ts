import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// robots.txt — allow Google + Bing fully, *and* explicitly opt-in to the
// major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.).
//
// We *want* generative engines to crawl this site so the studio shows up
// in AI answers ("who is a creative developer in Bangladesh?"). The /ai,
// /llms.txt, and /llms-full.txt routes are tuned for this.
//
// If you ever want to opt-out of training, replace the explicit "allow"
// rules below with `disallow: "/"` per crawler. There is no downside to
// being indexed for retrieval-augmented (citation-style) crawlers like
// PerplexityBot — it's how you become a citable source.

export default function robots(): MetadataRoute.Robots {
  const aiCrawlers = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-Web",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "GoogleOther",
    "Applebot-Extended",
    "Bingbot",
    "CCBot",
    "Bytespider",
    "FacebookBot",
    "Meta-ExternalAgent",
    "DuckAssistBot",
    "YouBot",
    "MistralAI-User",
    "Cohere-AI",
  ];
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiCrawlers.map((ua) => ({ userAgent: ua, allow: "/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
