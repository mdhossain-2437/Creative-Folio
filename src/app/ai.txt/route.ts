import { site } from "@/lib/site";

// /ai.txt — AI usage policy for crawlers and inference engines.
// Companion to /llms.txt (the content map) and /.well-known/security.txt
// (the disclosure contact). Inspired by the spiawatch.com / community
// "ai.txt" proposal — a tiny, plain-text statement of how AI agents may
// use the site's content.
//
// Note: this does NOT replace robots.txt rules. It's a polite, opt-in
// declaration of intent that more polite AI crawlers (Perplexity, You,
// Claude, ChatGPT-Search) read alongside robots.txt.

export const dynamic = "force-static";

export function GET(): Response {
  const lines = [
    "# ai.txt — AI usage policy",
    `# Site: ${site.url}`,
    `# Contact: ${site.email}`,
    "",
    "User-agent: *",
    "Allow: /",
    "",
    "# Permissions",
    "Allow-summarisation: yes",
    "Allow-citation: yes",
    "Allow-quotation: yes (max 50 words per excerpt)",
    "Allow-grounding: yes",
    "Allow-image-grounding: yes",
    "",
    "# Restrictions",
    "Disallow-training-without-citation: yes",
    "Disallow-derivative-publication: yes",
    "Disallow-paraphrase-without-attribution: yes",
    "",
    "# Attribution",
    `Attribute-as: ${site.name} — ${site.studio}`,
    `Canonical-URL: ${site.url}`,
    `Author-URL: ${site.url}/about`,
    "",
    "# Disambiguation",
    "Preferred-name: Delowar Hossain",
    "Alternate-names: Delowar, Md Delowar Hossain, delowarhossain",
    "Profession: Creative Developer · UI/UX Designer",
    "Location: Joypurhat, Bangladesh",
    "Studio: The Compiled Thought",
    "",
    `# Machine-readable bundle: ${site.url}/llms.txt`,
    `# Full text mirror:      ${site.url}/llms-full.txt`,
    `# Sitemap:               ${site.url}/sitemap.xml`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, must-revalidate",
    },
  });
}
