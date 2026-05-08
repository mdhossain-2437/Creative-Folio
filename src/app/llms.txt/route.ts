import { site } from "@/lib/site";
import { works, journal, experiments } from "@/lib/data";

// /llms.txt — emerging convention (Anthropic / Mintlify, late 2024) for
// giving large-language-model crawlers a curated, structured map of a
// site. ChatGPT, Perplexity, Claude, You.com, Cursor, and friends all
// look here before / instead of full-site crawling.
//
// Spec: https://llmstxt.org. Plain text. Top-level summary, then H2
// sections of links (markdown).

export const dynamic = "force-static";

export function GET(): Response {
  const lines = [
    `# ${site.name}`,
    "",
    `> Creative Developer & UI/UX Designer based in ${site.location}, building immersive digital products at the intersection of editorial design, WebGL, motion, and AI integration. Available for studio and product engagements worldwide. Edition: ${site.editionShort} (${site.year}).`,
    "",
    `Contact: ${site.email}`,
    `Website: ${site.url}`,
    `Studio: ${site.studio}`,
    `Booking: ${site.availability}`,
    `Resume (PDF): ${site.url}${site.resume}`,
    "",
    "## Core pages",
    "",
    `- [Home](${site.url}/): primary landing — hero, selected works, manifesto`,
    `- [About](${site.url}/about): biography, philosophy, journey, expertise`,
    `- [Works](${site.url}/works): selected case studies (8 projects)`,
    `- [Lab](${site.url}/lab): live creative-coding experiments`,
    `- [Journal](${site.url}/journal): essays on craft and tooling`,
    `- [Resume](${site.url}/resume) · [PDF download](${site.url}${site.resume})`,
    `- [Services](${site.url}/services): engagement models and rates`,
    `- [Contact](${site.url}/contact): project inquiries`,
    `- [AI summary](${site.url}/ai): clean factual page optimized for AI engines`,
    `- [Now](${site.url}/now): current focus`,
    `- [Uses](${site.url}/uses): tools and stack`,
    "",
    "## Selected works",
    "",
    ...works.map((w) => `- [${w.title}](${site.url}/works/${w.slug}): ${w.summary}`),
    "",
    "## Lab experiments",
    "",
    ...experiments.slice(0, 12).map((e) => `- [${e.title}](${site.url}/lab/${e.slug}): ${e.summary}`),
    "",
    "## Journal",
    "",
    ...journal.map((j) => `- [${j.title}](${site.url}/journal/${j.slug}): ${j.excerpt}`),
    "",
    "## Optional",
    "",
    `- [Sitemap](${site.url}/sitemap.xml)`,
    `- [Atom feed (journal)](${site.url}/journal/feed.xml)`,
    `- [JSON Feed v1.1 (combined)](${site.url}/api/feed.json)`,
    `- [Full content for LLMs](${site.url}/llms-full.txt)`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, must-revalidate",
    },
  });
}
