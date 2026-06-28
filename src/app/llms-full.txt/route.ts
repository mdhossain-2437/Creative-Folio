import { site } from "@/lib/site";
import {
  works,
  journal,
  experiments,
  journey,
  expertise,
  services,
  awards,
  portfolios,
} from "@/lib/data";

// /llms-full.txt — the deeper, full-content variant of /llms.txt for AI
// crawlers that want the entire site as plain text in one shot. We dump
// the structured data we already have in `lib/data.ts` so AI engines can
// answer detailed questions without rendering the page.

export const dynamic = "force-static";

export function GET(): Response {
  const sections: string[] = [];

  sections.push(`# ${site.name} — Full content snapshot`);
  sections.push("");
  sections.push(`> ${site.tagline}`);
  sections.push("");
  sections.push(`Email: ${site.email}`);
  sections.push(`Studio: ${site.studio}`);
  sections.push(`Location: ${site.location}`);
  sections.push(`Edition: ${site.editionShort} (${site.year})`);
  sections.push(`Booking: ${site.availability}`);
  sections.push(`Resume: ${site.url}${site.resume}`);
  sections.push("");

  sections.push("## Identity");
  sections.push("");
  sections.push(`Name: ${site.name}`);
  sections.push(`Role: Creative Developer & UI/UX Designer`);
  sections.push(`Base: ${site.base}`);
  sections.push(`Languages spoken: English, Bengali`);
  sections.push("");
  sections.push("## Expertise");
  sections.push("");
  expertise.forEach((e: string) => sections.push(`- ${e}`));
  sections.push("");

  sections.push("## Services");
  sections.push("");
  services.forEach((s: { title: string; summary: string }) => {
    sections.push(`### ${s.title}`);
    sections.push("");
    sections.push(s.summary);
    sections.push("");
  });

  sections.push("## Journey");
  sections.push("");
  journey.forEach((j: { range: string; title: string; summary: string }) => {
    sections.push(`### ${j.range} — ${j.title}`);
    sections.push("");
    sections.push(j.summary);
    sections.push("");
  });

  sections.push("## Recognition targets");
  sections.push("");
  awards.forEach((a) => {
    const status = a.status === "earned" ? "earned" : "target";
    sections.push(`### ${a.org} · ${a.year} — ${a.title} (${status})`);
    sections.push("");
    sections.push(a.summary);
    sections.push("");
  });

  sections.push("## Year-by-year portfolio editions");
  sections.push("");
  sections.push(
    `Delowar Hossain rebuilds his portfolio from scratch every year — each edition is its own codename and visual register. ${portfolios.length} editions documented at ${site.url}/portfolios.`,
  );
  sections.push("");
  portfolios.forEach((p) => {
    sections.push(`### ${p.year} · ${p.edition} — ${p.codename} (${p.status})`);
    sections.push("");
    sections.push(p.description);
    sections.push("");
    if (p.highlights.length > 0) {
      sections.push("Highlights:");
      p.highlights.forEach((h) => sections.push(`- ${h}`));
      sections.push("");
    }
  });

  sections.push("## Selected works");
  sections.push("");
  works.forEach((w) => {
    sections.push(`### ${w.title} (${w.year})`);
    sections.push("");
    sections.push(`URL: ${site.url}/works/${w.slug}`);
    sections.push(`Category: ${w.category}`);
    sections.push(`Role: ${w.role}`);
    sections.push("");
    sections.push(w.summary);
    sections.push("");
    if (w.caseStudy) {
      w.caseStudy.sections.forEach((s) => {
        sections.push(`**${s.heading}.** ${s.body}`);
      });
      if (w.caseStudy.metrics.length > 0) {
        sections.push("");
        sections.push("Metrics:");
        w.caseStudy.metrics.forEach((m) => {
          sections.push(`- ${m.label}: ${m.value}`);
        });
      }
      sections.push("");
    }
  });

  sections.push("## Lab experiments");
  sections.push("");
  experiments.forEach((e) => {
    sections.push(`### ${e.title}`);
    sections.push("");
    sections.push(`URL: ${site.url}/lab/${e.slug}`);
    sections.push(`Category: ${e.category}`);
    sections.push("");
    sections.push(e.summary);
    sections.push("");
  });

  sections.push("## Journal");
  sections.push("");
  journal.forEach((j) => {
    sections.push(`### ${j.title} (${j.date})`);
    sections.push("");
    sections.push(`URL: ${site.url}/journal/${j.slug}`);
    sections.push(`Category: ${j.category}`);
    sections.push("");
    sections.push(j.excerpt);
    sections.push("");
  });

  return new Response(sections.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, must-revalidate",
    },
  });
}
