import type { Metadata } from "next";
import Link from "next/link";
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
  return { title: post.title, description: post.excerpt };
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

export default async function JournalPost({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = journal.find((j) => j.slug === slug);
  if (!post) notFound();
  const idx = journal.findIndex((j) => j.slug === post.slug);
  const next = journal[(idx + 1) % journal.length];
  const url = `${site.url}/journal/${post.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description: post.excerpt,
    image: `${url}/opengraph-image`,
    datePublished: isoFromYmd(post.date),
    dateModified: isoFromYmd(post.date),
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.studio,
      url: site.url,
    },
    articleSection: post.category,
    inLanguage: "en",
    url,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
