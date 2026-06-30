import {
  journal,
  works,
  experiments,
  publicRecognitionLabel,
} from "@/lib/data";
import { site } from "@/lib/site";

export const dynamic = "force-static";

function isoFromYmd(ymd: string): string {
  const [y, m, d] = ymd.split(".");
  return `${y}-${m}-${d}T12:00:00Z`;
}

// JSON Feed v1.1 — https://www.jsonfeed.org/version/1.1/
export async function GET(): Promise<Response> {
  const items = [
    ...journal.map((p) => ({
      id: `${site.url}/journal/${p.slug}`,
      url: `${site.url}/journal/${p.slug}`,
      title: p.title,
      content_text: p.excerpt,
      summary: p.excerpt,
      date_published: isoFromYmd(p.date),
      tags: ["journal", p.category.toLowerCase()],
      _kind: "journal" as const,
      _reading_time: p.readingTime,
    })),
    ...works.map((w) => ({
      id: `${site.url}/works/${w.slug}`,
      url: `${site.url}/works/${w.slug}`,
      title: w.title,
      content_text: w.summary,
      summary: w.summary,
      date_published: `${w.year}-01-01T12:00:00Z`,
      tags: ["work", w.category.toLowerCase()],
      _kind: "work" as const,
      _stack: w.stack,
      _recognition: w.recognition
        ? {
            status: w.recognition.status,
            label: publicRecognitionLabel(w.recognition),
          }
        : undefined,
    })),
    ...experiments.map((e) => ({
      id: `${site.url}/lab/${e.slug}`,
      url: `${site.url}/lab/${e.slug}`,
      title: e.title,
      content_text: e.summary,
      summary: e.summary,
      date_published: "2026-01-01T12:00:00Z",
      tags: ["lab", e.category.toLowerCase()],
      _kind: "lab" as const,
      _meta: e.meta,
    })),
  ].sort((a, b) =>
    a.date_published < b.date_published ? 1 : a.date_published > b.date_published ? -1 : 0
  );

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: `${site.studio} — Combined Feed`,
    home_page_url: site.url,
    feed_url: `${site.url}/api/feed.json`,
    description:
      "Combined feed of journal posts, selected works, and lab experiments. Newest first.",
    language: "en",
    authors: [{ name: site.name, url: site.url }],
    items,
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
