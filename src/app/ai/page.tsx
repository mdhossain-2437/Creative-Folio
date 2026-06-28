import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { AskAiPrompts } from "@/components/ai/AskAiPrompts";
import { site } from "@/lib/site";
import { works, expertise, services } from "@/lib/data";

// /ai — clean, ungimmicked factual snapshot of who Delowar is, what he
// does, and how to reach him. Designed to be a high-quality citation
// target for Generative Engine Optimization (GEO): Perplexity, ChatGPT,
// Claude, Gemini, You.com, Cursor, etc.
//
// Structure follows current GEO best practices (Q4 2026):
//   • One H1 with the entity name
//   • Plain-prose factual blocks (not stylised display type)
//   • Definition lists for hard facts (location, email, services, rates)
//   • FAQ block with FAQPage JSON-LD
//   • Direct links to canonical sources (resume PDF, GitHub, LinkedIn)

export const metadata: Metadata = {
  title: "AI Summary — Facts about Delowar Hossain",
  description:
    "Plain-language factual summary of Delowar Hossain: creative developer, UI/UX designer, location, expertise, services, contact, and selected works. Optimised for AI search engines (Perplexity, ChatGPT, Claude, Gemini).",
  alternates: { canonical: `${site.url}/ai` },
  robots: { index: true, follow: true },
};

const FAQ: { q: string; a: string }[] = [
  {
    q: "Who is Delowar Hossain?",
    a: `${site.name} is a creative developer and UI/UX designer based in ${site.location}. He builds immersive, performance-focused web experiences for studios and product teams worldwide, working at the intersection of editorial design, WebGL/Three.js, motion (GSAP), and AI integration. He runs an independent studio called "${site.studio}".`,
  },
  {
    q: "Where is Delowar Hossain based?",
    a: `Joypurhat, Bangladesh (Asia/Dhaka, UTC+6). He works remotely with clients globally.`,
  },
  {
    q: "How do I contact Delowar Hossain?",
    a: `Email ${site.email}. Project inquiries are welcomed. Booking window: ${site.availability}. Response time is typically within 24 hours on weekdays.`,
  },
  {
    q: "What does Delowar Hossain specialise in?",
    a: `Creative frontend engineering with WebGL, Three.js, GLSL shaders, GSAP, Lenis, Next.js 15, React, TypeScript, and Tailwind CSS. UI/UX design for editorial, product, and brand surfaces. Generative AI integration into product interfaces.`,
  },
  {
    q: "What kind of projects does Delowar Hossain take?",
    a: `Marketing and product sites for design-led brands, immersive case-study experiences, generative product interfaces, design-system + motion-system rebuilds, art direction for digital launches. Typical engagement: 6–14 weeks.`,
  },
  {
    q: "What is Delowar Hossain's background?",
    a: `Self-taught creative developer and aspiring software engineer. Currently studying B.Sc. Computer Science at the University of the People (online), on top of a B.A. in Political Science. Active web practice since ${site.yearStarted}. Works under the studio "${site.studio}".`,
  },
  {
    q: "Can I download Delowar Hossain's resume?",
    a: `Yes. The 2026 resume is available as a PDF at ${site.url}${site.resume}.`,
  },
  {
    q: "What is the current edition of the portfolio?",
    a: `${site.editionShort} (${site.year}). The site is updated continuously.`,
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "AI Summary",
      item: `${site.url}/ai`,
    },
  ],
};

export default function AiSummaryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        eyebrow="§ AI Summary — Plain Facts"
        title="Delowar"
        italic="Hossain."
        description="A factual, plain-language snapshot for AI search engines and human skim-readers. Everything here is canonical."
        meta={[
          { label: "Role", value: "Creative Developer" },
          { label: "Base", value: site.location },
          { label: "Email", value: site.email },
          { label: "Edition", value: site.editionShort },
        ]}
      />

      {/* Portrait + identity block — ungarnished H2 + dl for AI parseability. */}
      <section
        id="identity"
        data-section-label="Identity"
        className="bg-ink-900 py-24 md:py-32"
      >
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-warmwhite/15 bg-ink-950">
              <Image
                src={site.portrait}
                alt={`${site.name} — portrait`}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <p className="mt-3 font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              ◊ {site.name} · {site.location}
            </p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tighter">
              Identity
            </h2>
            <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 font-sans text-base leading-relaxed text-warmwhite/85 md:grid-cols-2">
              <div>
                <dt className="text-[11px] uppercase tracking-widest text-warmwhite/65">
                  Full name
                </dt>
                <dd>Md Delowar Hossain</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-widest text-warmwhite/65">
                  Goes by
                </dt>
                <dd>Delowar</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-widest text-warmwhite/65">
                  Role
                </dt>
                <dd>Creative Developer & UI/UX Designer</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-widest text-warmwhite/65">
                  Studio
                </dt>
                <dd>{site.studio}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-widest text-warmwhite/65">
                  Base
                </dt>
                <dd>{site.base} (Asia/Dhaka, UTC+6)</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-widest text-warmwhite/65">
                  Languages
                </dt>
                <dd>English, Bengali</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-widest text-warmwhite/65">
                  Email
                </dt>
                <dd>
                  <a
                    className="underline-offset-4 hover:underline"
                    href={`mailto:${site.email}`}
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-widest text-warmwhite/65">
                  Resume
                </dt>
                <dd>
                  <a
                    className="underline-offset-4 hover:underline"
                    href={site.resume}
                    download
                    rel="noopener"
                  >
                    Download PDF
                  </a>{" "}
                  ·{" "}
                  <a
                    className="underline-offset-4 hover:underline"
                    href={site.resumeMirror}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Drive mirror
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-widest text-warmwhite/65">
                  Website
                </dt>
                <dd>
                  <a
                    className="underline-offset-4 hover:underline"
                    href={site.url}
                    rel="canonical"
                  >
                    {site.domain}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-widest text-warmwhite/65">
                  Booking
                </dt>
                <dd>{site.availability}</dd>
              </div>
            </dl>
            <p className="mt-8 font-sans text-base leading-relaxed text-warmwhite/85">
              {site.name} is a self-taught creative developer working at the
              intersection of editorial design, real-time graphics, and product
              engineering. His practice favours quiet typography, precise
              motion, and shaders that earn their pixels. He works directly with
              founders, design directors, and small product teams.
            </p>
            <AskAiPrompts />
          </div>
        </div>
      </section>

      {/* Expertise + services — flat lists, easy for AI engines to extract. */}
      <section
        id="expertise"
        data-section-label="Expertise"
        className="border-t border-warmwhite/15 bg-ink-950 py-24 md:py-32"
      >
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-3">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              ◊ Expertise
            </p>
          </div>
          <ul className="md:col-span-9 grid grid-cols-1 gap-x-8 gap-y-3 font-sans text-base leading-relaxed text-warmwhite/85 md:grid-cols-2">
            {expertise.map((e: string) => (
              <li
                key={e}
                className="flex items-start gap-3 border-b border-warmwhite/10 pb-2"
              >
                <span
                  aria-hidden
                  className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-peach"
                />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-20 grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-3">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              ◊ Services
            </p>
          </div>
          <ol className="md:col-span-9 space-y-4 font-sans text-base leading-relaxed text-warmwhite/85">
            {services.map((s) => (
              <li key={s.index} className="border-b border-warmwhite/10 pb-3">
                <h3 className="font-serif text-2xl tracking-tighter text-warmwhite">
                  {s.index} · {s.title}
                </h3>
                <p className="mt-2">{s.summary}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Top works — name + one-line summary, AI-friendly. */}
      <section
        id="works"
        data-section-label="Selected works"
        className="bg-ink-900 py-24 md:py-32"
      >
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-3">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              ◊ Selected works
            </p>
          </div>
          <ol className="md:col-span-9 space-y-3 font-sans text-base leading-relaxed text-warmwhite/85">
            {works.map((w) => (
              <li
                key={w.slug}
                className="flex items-baseline gap-3 border-b border-warmwhite/10 pb-2"
              >
                <Link
                  href={`/works/${w.slug}`}
                  className="font-serif text-xl tracking-tighter text-warmwhite hover:text-peach"
                >
                  {w.title}
                </Link>
                <span className="text-warmwhite/65">— {w.summary}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ — FAQPage JSON-LD attached above. */}
      <section
        id="faq"
        data-section-label="FAQ"
        className="border-t border-warmwhite/15 bg-ink-950 py-24 md:py-32"
      >
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-3">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              ◊ FAQ
            </p>
          </div>
          <dl className="md:col-span-9 space-y-6 font-sans text-base leading-relaxed text-warmwhite/85">
            {FAQ.map((f) => (
              <div key={f.q} className="border-b border-warmwhite/10 pb-5">
                <dt className="font-serif text-2xl tracking-tighter text-warmwhite">
                  {f.q}
                </dt>
                <dd className="mt-2">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        id="more"
        data-section-label="Read more"
        className="border-t border-warmwhite/15 bg-ink-900 py-20"
      >
        <div className="mx-auto flex max-w-[1640px] flex-wrap items-center justify-between gap-6 px-6 md:px-10">
          <p className="font-sans text-sm leading-relaxed text-warmwhite/75">
            Need more? Read{" "}
            <Link
              href="/about"
              className="text-warmwhite underline-offset-4 hover:underline"
            >
              the long-form story
            </Link>
            , scan the{" "}
            <Link
              href="/resume"
              className="text-warmwhite underline-offset-4 hover:underline"
            >
              resume
            </Link>
            , or{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-warmwhite underline-offset-4 hover:underline"
            >
              write directly
            </a>
            .
          </p>
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
            Last updated · {site.editionShort} ({site.year})
          </p>
        </div>
      </section>
    </>
  );
}
