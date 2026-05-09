import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { journey, expertise } from "@/lib/data";
import { site } from "@/lib/site";
import Link from "next/link";
import { PageSchema } from "@/components/seo/PageSchema";

export const metadata: Metadata = {
  title: "About — Story & Philosophy",
  description:
    "Delowar Hossain — creative developer in Bangladesh. Background, philosophy and the thinking behind the work across development, AI and interface design.",
  alternates: { canonical: `${site.url}/about` },
};

// FAQ on /about doubles as a citation target for AI engines (Perplexity,
// Claude, ChatGPT). The same questions live on /ai for human-readable
// access; here we just add the structured data alongside the page.
const aboutFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who is Delowar Hossain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `${site.name} is a self-taught creative developer and UI/UX designer based in ${site.location}, building immersive digital products at the intersection of editorial design, WebGL, motion, and AI integration.`,
      },
    },
    {
      "@type": "Question",
      name: "Where is Delowar based?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `${site.base} (Asia/Dhaka, UTC+6). He works remotely with clients globally.`,
      },
    },
    {
      "@type": "Question",
      name: "How can I reach Delowar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Email ${site.email}. Booking window: ${site.availability}.`,
      },
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <PageSchema
        path="/about"
        name="About — Delowar Hossain"
        description="Delowar Hossain — creative developer in Bangladesh. Background, philosophy and the thinking behind the work across development, AI and interface design."
        crumbs={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutFaqSchema) }}
      />
      <PageHero
        eyebrow="§01 — About / Story"
        title="Delowar"
        italic="Hossain."
        description="Bridging brutalist editorial design and fluid, high-performance creative development. I build digital experiences that feel physical."
        meta={[
          { label: "Base", value: site.base },
          { label: "Studio", value: site.studio },
          { label: "Education", value: "B.Sc. CS · UoPeople (in progress)" },
          { label: "Background", value: "B.A. Political Science" },
          { label: "Practice", value: "Aspiring Software Engineer" },
        ]}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/resume"
            data-cursor="hover"
            data-cursor-label="RESUME"
            className="rounded-full border border-warmwhite/30 px-6 py-3 font-sans text-[11px] uppercase tracking-widest hover:border-warmwhite"
          >
            Download Resume
          </Link>
          <Link
            href="/contact"
            data-cursor="hover"
            data-cursor-label="WRITE"
            className="rounded-full bg-warmwhite px-6 py-3 font-sans text-[11px] uppercase tracking-widest text-ink-900 hover:bg-peach"
          >
            Get in Touch
          </Link>
        </div>
      </PageHero>

      <section id="philosophy" data-section-label="Philosophy" className="bg-ink-900 py-24 md:py-32">
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-4">
            <Reveal>
              <figure className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-warmwhite/15 bg-ink-950">
                <Image
                  src={site.portrait}
                  alt={`${site.name} — portrait`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover grayscale transition-[filter] duration-700 hover:grayscale-0"
                />
              </figure>
              <figcaption className="mt-3 font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                ◊ {site.name} · {site.location}
              </figcaption>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              ◊ Philosophy
            </p>
            <Reveal>
              <p className="mt-6 font-serif text-[clamp(1.7rem,3.4vw,3.4rem)] leading-[1.08] tracking-tighter">
                I work where{" "}
                <span className="italic text-warmwhite/60">
                  creative frontend engineering, scalable architecture and AI integration
                </span>{" "}
                meet — building interfaces that feel distinct, perform well, and turn
                technical complexity into something{" "}
                <span className="italic text-peach">clear, useful, and memorable.</span>
              </p>
            </Reveal>
            {/* Plain-prose factual block — primary GEO citation target. */}
            <Reveal>
              <p className="mt-8 font-sans text-base leading-relaxed text-warmwhite/85 md:text-lg">
                {site.name} (also known as Delowar) is a self-taught creative
                developer, UI/UX designer, and aspiring software engineer
                based in {site.base}. He is currently studying B.Sc.
                Computer Science at the University of the People (online),
                building a formal foundation on top of years of independent
                practice. He has been building for the web since
                {" "}{site.yearStarted} and runs an independent studio called
                {" "}{site.studio}. His practice spans creative frontend
                engineering with WebGL, Three.js, GLSL, GSAP, Lenis, and
                Next.js — alongside design systems, motion systems, and
                generative AI integration into product interfaces. He works
                remotely with clients worldwide and is{" "}
                <span className="text-warmwhite">currently {site.availability.toLowerCase()}</span>.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-warmwhite/15 bg-ink-950 py-10">
        <Marquee
          size="lg"
          speed={50}
          items={["WEBGL", "THREE.JS", "GLSL", "REACT", "TAILWIND", "GSAP", "FRAMER", "WEBFLOW"]}
        />
      </section>

      <section id="signals" data-section-label="Signals" className="bg-ink-900 py-28 md:py-40">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <header className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 md:col-span-3">
              ◊ Personal Signals
            </p>
            <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.96] tracking-tightest md:col-span-9">
              The {""}
              <span className="italic text-warmwhite/60">non-traditional path.</span>
            </h2>
          </header>
          <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/15 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                tag: "Base",
                title: "Joypurhat, Bangladesh",
                body: "Grounded locally, building for a global digital audience.",
              },
              {
                tag: "Path",
                title: "Self-Taught Developer",
                body: "Built through curiosity, repetition, experimentation and independent study.",
              },
              {
                tag: "Background",
                title: "Not from a CSE Track",
                body: "A non-traditional path that shaped a different way of thinking about technology.",
              },
              {
                tag: "Current Mode",
                title: "Web + AI Learning",
                body: "Growing deeper at the intersection of creative frontend craft and intelligent systems.",
              },
            ].map((s, i) => (
              <Reveal key={s.tag} delay={i * 0.06}>
                <div className="flex h-full flex-col gap-5 bg-ink-900 p-8 md:p-10">
                  <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                    {s.tag}
                  </p>
                  <h3 className="font-serif text-2xl leading-tight tracking-tighter md:text-3xl">
                    {s.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-warmwhite/65">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Education + Open Source — surfaces UoPeople CS studies and the
          GitHub footprint. Both feed JSON-LD's alumniOf and sameAs. */}
      <section
        id="education"
        data-section-label="Education"
        className="border-t border-warmwhite/15 bg-ink-950 py-24 md:py-32"
      >
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-3">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              ◊ Education
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[0.96] tracking-tightest">
              Aspiring{" "}
              <span className="italic text-peach">software engineer.</span>
            </h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-warmwhite/65">
              Formal Computer Science studies stacked on top of years of
              self-taught practice — political-science fluency in systems,
              CS fluency in their machinery.
            </p>
          </div>
          <ol className="md:col-span-9">
            {site.education.map((edu, i) => (
              <Reveal key={edu.institution} delay={i * 0.05}>
                <li className="grid grid-cols-12 items-baseline gap-4 border-b border-warmwhite/15 py-7 last:border-b-0">
                  <span className="col-span-12 font-mono text-[11px] uppercase tracking-widest text-warmwhite/65 md:col-span-3">
                    {edu.degree}
                  </span>
                  <h3 className="col-span-12 font-serif text-2xl leading-tight tracking-tighter text-warmwhite md:col-span-5 md:text-3xl">
                    {edu.url ? (
                      <a
                        href={edu.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="hover"
                        className="hover:text-peach"
                      >
                        {edu.institution}
                      </a>
                    ) : (
                      edu.institution
                    )}
                  </h3>
                  <p className="col-span-12 font-sans text-sm leading-relaxed text-warmwhite/65 md:col-span-4">
                    {edu.role}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="open-source"
        data-section-label="Open Source"
        className="border-t border-warmwhite/15 bg-ink-900 py-24 md:py-32"
      >
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-4">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              ◊ Open Source · GitHub
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[0.96] tracking-tightest">
              <span className="italic text-warmwhite/60">{site.github.repos}+</span> public repos.
            </h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-warmwhite/85">
              {site.github.bio}
            </p>
            <a
              href={site.github.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              data-cursor-label="GITHUB"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-warmwhite/30 px-5 py-2.5 font-sans text-[11px] uppercase tracking-widest hover:border-peach hover:text-peach"
            >
              @{site.github.handle} ↗
            </a>
          </div>
          <ul className="md:col-span-8 grid grid-cols-1 gap-3 md:grid-cols-2">
            {site.github.highlights.map((repo, i) => (
              <Reveal key={repo.name} delay={i * 0.04}>
                <li className="flex flex-col gap-2 rounded-2xl border border-warmwhite/15 bg-ink-950 p-5">
                  <a
                    href={`https://github.com/${site.github.handle}/${repo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="font-mono text-sm text-warmwhite hover:text-peach"
                  >
                    {repo.name}
                  </a>
                  <p className="font-sans text-sm leading-relaxed text-warmwhite/65">
                    {repo.note}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section id="journey" data-section-label="Journey" className="border-t border-warmwhite/15 bg-ink-950 py-28 md:py-40">
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-3">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              ◊ The Journey
            </p>
          </div>
          <ol className="md:col-span-9">
            {journey.map((j, i) => (
              <Reveal key={j.range} delay={i * 0.05}>
                <li className="grid grid-cols-12 items-baseline gap-4 border-b border-warmwhite/15 py-8 last:border-b-0">
                  <span className="col-span-12 font-mono text-[11px] uppercase tracking-widest text-warmwhite/65 md:col-span-3">
                    {j.range}
                  </span>
                  <h3 className="col-span-12 font-serif text-3xl leading-tight tracking-tighter text-warmwhite md:col-span-5 md:text-4xl">
                    {j.title}
                  </h3>
                  <p className="col-span-12 font-sans text-sm leading-relaxed text-warmwhite/65 md:col-span-4">
                    {j.summary}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="expertise" data-section-label="Expertise" className="bg-ink-900 py-28 md:py-40">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
            ◊ Expertise
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.96] tracking-tightest">
            6 domains, <span className="italic text-warmwhite/60">one practice.</span>
          </h2>
          <ul className="mt-12 flex flex-wrap gap-3">
            {expertise.map((e) => (
              <li
                key={e}
                className="rounded-full border border-warmwhite/20 px-5 py-3 font-sans text-[11px] uppercase tracking-widest text-warmwhite/85"
              >
                {e}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
