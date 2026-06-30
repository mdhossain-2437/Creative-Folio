import type { Metadata } from "next";
import Link from "@/components/ui/PerformanceLink";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { JournalShare } from "@/components/journal/JournalShare";
import { journal } from "@/lib/data";
import { site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return journal.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = journal.find((j) => j.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
  };
}

const sampleBody: string[] = [
  "There is a quiet conviction in my work: most of the time, you don't need a third texture, a fourth font weight, or another animation layer. You need to commit to the one good idea harder. The math behind that conviction is small.",
  "A single, well-tuned noise function — fbm sampled across three octaves, advected slowly by time — is enough scene for an entire page. The trick is in the color ramp and the vignette. Treat them like a print job.",
  "Below: the small fragment that runs every frame on this site, lightly annotated. It is the same shape we used on Aura Void, simplified to read in one breath.",
  "We don't need GPGPU here. We don't even need a normal map. We need a sense of pressure. The mouse is a soft attractor, the noise is the ocean, the vignette is the proscenium.",
  "If you can hold a single idea in your head while reading the file end to end, the rest of the system tends to follow. That is the whole brief.",
];

function isoFromYmd(ymd: string): string {
  const [y, m, d] = ymd.split(".");
  return `${y}-${m}-${d}T12:00:00Z`;
}

// Convert "11 min read" → ISO 8601 duration "PT11M". Returns undefined for
// unparseable strings so JSON-LD just omits the field.
function toISODuration(readingTime: string): string | undefined {
  const match = readingTime.match(/(\d+)\s*min/i);
  if (!match) return undefined;
  return `PT${match[1]}M`;
}

function wordCount(paragraphs: string[]): number {
  return paragraphs.reduce(
    (n, p) => n + p.split(/\s+/).filter(Boolean).length,
    0,
  );
}

export default async function JournalPost({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = journal.find((j) => j.slug === slug);
  if (!post) notFound();
  const idx = journal.findIndex((j) => j.slug === post.slug);
  const next = journal[(idx + 1) % journal.length];
  const url = `${site.url}/journal/${post.slug}`;
  const wc = wordCount(sampleBody);
  const timeRequired = toISODuration(post.readingTime);
  // Categories on the journal are pipe / dot separated phrases
  // ("Creative Direction · Editorial"). Split into individual keywords so
  // search engines can match topical queries.
  const keywords = post.category
    .split(/[·|,]/)
    .map((s) => s.trim())
    .filter(Boolean);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description: post.excerpt,
    image: {
      "@type": "ImageObject",
      url: `${url}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    datePublished: isoFromYmd(post.date),
    dateModified: isoFromYmd(post.date),
    author: { "@type": "Person", "@id": `${site.url}#person`, name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      "@id": `${site.url}#organization`,
      name: site.studio,
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/og.svg`,
      },
    },
    articleSection: post.category,
    keywords,
    wordCount: wc,
    ...(timeRequired ? { timeRequired } : {}),
    articleBody: sampleBody.join("\n\n"),
    isAccessibleForFree: true,
    inLanguage: "en",
    url,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Journal", item: `${site.url}/journal` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageHero
        eyebrow={`${post.date} · ${post.category} · ${post.readingTime}`}
        title={post.title.split(":")[0] || post.title}
        italic={post.title.includes(":") ? post.title.split(":")[1].trim() : undefined}
        description={post.excerpt}
        noise={false}
      />

      <ReadingProgress targetId="post-body" />

      <article id="post-body" className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <div className="space-y-8 font-serif text-[clamp(1.15rem,1.4vw,1.45rem)] leading-[1.6] text-warmwhite/85">
          {sampleBody.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <pre className="overflow-x-auto rounded-md bg-ink-950 p-6 font-mono text-[12px] leading-relaxed text-warmwhite/85">
{`float fbm(vec3 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise3(p);
    p *= 2.04;
    a *= 0.5;
  }
  return v;
}`}
          </pre>
          <p className="border-l-2 border-peach pl-6 italic text-warmwhite/70">
            “The interface should disappear, leaving only the canvas and the
            content.” — a sticky note above the desk.
          </p>
        </div>

        <div className="mt-20 border-t border-warmwhite/15 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-6 font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
            <Link href="/journal" data-cursor="hover" data-cursor-label="BACK" className="hover:text-warmwhite">
              ← All Posts
            </Link>
            <JournalShare slug={post.slug} title={post.title} />
            <Link
              href={`/journal/${next.slug}`}
              data-cursor="view"
              data-cursor-label="NEXT"
              className="text-right hover:text-warmwhite"
            >
              Next: {next.title} →
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
