import { journal } from "@/lib/data";
import { site } from "@/lib/site";

// Atom 1.0 feed for the studio journal. We expose this at
// `/journal/feed.xml` so feed readers can autodiscover via the
// `<link rel="alternate" type="application/atom+xml" />` tag in the layout
// head. Each entry uses `site.url + /journal/${slug}` as a stable id.

export const dynamic = "force-static";

function escape(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isoDate(yyyymmdd: string): string {
  // `yyyy.mm.dd` -> ISO at noon UTC (avoids TZ flips making dates jump a day).
  const [y, m, d] = yyyymmdd.split(".");
  return `${y}-${m}-${d}T12:00:00Z`;
}

export async function GET(): Promise<Response> {
  const updated = journal[0]?.date ? isoDate(journal[0].date) : new Date().toISOString();

  const entries = journal
    .map((post) => {
      const url = `${site.url}/journal/${post.slug}`;
      return `  <entry>
    <id>${url}</id>
    <title>${escape(post.title)}</title>
    <link href="${url}" />
    <published>${isoDate(post.date)}</published>
    <updated>${isoDate(post.date)}</updated>
    <category term="${escape(post.category)}" />
    <summary>${escape(post.excerpt)}</summary>
    <author><name>${escape(site.name)}</name><email>${escape(site.email)}</email></author>
  </entry>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escape(site.studio)} — Journal</title>
  <subtitle>${escape(site.tagline)}</subtitle>
  <link rel="self" type="application/atom+xml" href="${site.url}/journal/feed.xml" />
  <link rel="alternate" type="text/html" href="${site.url}/journal" />
  <id>${site.url}/journal/feed.xml</id>
  <updated>${updated}</updated>
  <author><name>${escape(site.name)}</name><email>${escape(site.email)}</email></author>
${entries}
</feed>
`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
