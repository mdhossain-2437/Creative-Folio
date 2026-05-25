import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { site } from "@/lib/site";
import { PageSchema } from "@/components/seo/PageSchema";

export const metadata: Metadata = {
  title: "Contact — Start a Project",
  description: "Inquiries, collaborations, retainers, and the occasional ‘just hi’. Open Q1 — Q4 / 2027.",
};

export default function ContactPage() {
  return (
    <>
      <PageSchema
        path="/contact"
        name="Contact — Start a Project"
        description="Inquiries, collaborations, retainers, and the occasional 'just hi'. Open Q1 — Q4 / 2027."
        crumbs={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]}
      />
      <PageHero
        eyebrow="§ Contact & Colophon"
        title="Start a"
        italic="Project."
        description="The fastest way is the form below — or write directly. I read everything and reply within 48 hours, weekdays."
        meta={[
          { label: "Email", value: site.email },
          { label: "Booking", value: "Q1 — Q4 / 2027" },
          { label: "Time zone", value: "GMT+6" },
          { label: "Location", value: site.location },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────
          §01 — Direct inquiry. A single, calm column that breathes:
          mailto link in a sensible serif size (no longer the giant
          1.5–2.4rem clamp which felt shouty next to the form), a short
          reply-time note, then a clean keyline-separated meta grid.
          The dense socials list moved down into its own block so it
          doesn't crowd the inbox card.
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-ink-900 py-24 md:py-32">
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-10">
          {/* Left — Direct inquiry card */}
          <div className="md:col-span-5">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
              ◊ §01 — Direct Inquiry
            </p>
            <a
              href={`mailto:${site.email}`}
              data-cursor="hover"
              data-cursor-label="WRITE"
              className="mt-5 inline-flex max-w-full items-baseline gap-3 break-all font-serif text-[clamp(1.15rem,1.8vw,1.65rem)] leading-tight tracking-tight text-warmwhite underline-offset-4 transition-colors hover:text-peach hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
            >
              <span aria-hidden className="font-sans text-[10px] uppercase tracking-widest text-peach">
                ↗
              </span>
              <span>{site.email}</span>
            </a>
            <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-warmwhite/65">
              Briefs, retainers, collaborations — or just a hello. I read every line
              and reply within 48 hours, weekdays.
            </p>

            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-warmwhite/12 pt-10">
              <Item label="Location" value={site.base} />
              <Item label="Studio" value={site.studio} />
              <Item label="Hours" value="Mon — Fri · 09:00 → 18:00" />
              <Item label="Time zone" value="GMT+6" />
              <Item label="Booking" value="Open · Q1 — Q4 / 2027" />
              <Item label="Reply" value="≤ 48 hours, weekdays" />
            </dl>
          </div>

          {/* Right — Form */}
          <div className="md:col-span-7">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
              ◊ §02 — The Brief
            </p>
            <div className="mt-5">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          §03 — Channels (socials). Pulled out of the inquiry card so
          the keyline grid doesn't compete with link chips. Quiet
          two-line layout with the elsewhere-on-the-internet list.
      ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-warmwhite/12 bg-ink-900 py-20 md:py-24">
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-3">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
              ◊ §03 — Elsewhere
            </p>
            <p className="mt-3 max-w-xs font-serif text-xl leading-snug tracking-tight text-warmwhite">
              Quieter rooms — process notes, reels, and code.
            </p>
          </div>
          <div className="md:col-span-9">
            <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    data-cursor="hover"
                    data-cursor-label="OPEN"
                    aria-label={`Open ${s.label} in a new tab`}
                    className="inline-flex w-full items-center justify-between gap-2 rounded-full border border-warmwhite/15 px-4 py-2.5 font-sans text-[11px] uppercase tracking-widest text-warmwhite/80 transition-colors hover:border-peach hover:text-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
                  >
                    <span>{s.label}</span>
                    <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          §04 — Colophon. Same tone as before but with restrained
          type: clamps brought down so the column reads as a paragraph,
          not as a second headline.
      ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-warmwhite/15 bg-ink-950 py-24 md:py-32">
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-3">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
              ◊ §04 — Colophon
            </p>
          </div>
          <div className="md:col-span-9">
            <p className="font-serif text-[clamp(1.15rem,1.8vw,1.65rem)] leading-snug tracking-tight text-warmwhite/90">
              The architecture of this digital experience is built upon a modern,
              performance-driven stack. Designed in Figma, built with Next.js,
              Three.js, GSAP, Lenis and Framer Motion. Typeset in{" "}
              <span className="italic">Newsreader</span>, Inter and JetBrains
              Mono.
            </p>
            <ul className="mt-12 grid grid-cols-2 gap-px bg-warmwhite/12 md:grid-cols-4">
              {[
                { v: "Next.js", k: "Framework" },
                { v: "GSAP", k: "Animation" },
                { v: "Three.js", k: "WebGL" },
                { v: "Lenis", k: "Scroll" },
              ].map((s) => (
                <li key={s.k} className="bg-ink-950 p-6">
                  <p className="font-serif text-3xl leading-none tracking-tightest">{s.v}</p>
                  <p className="mt-2 font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                    {s.k}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">{label}</dt>
      <dd className="mt-2 font-sans text-base leading-snug text-warmwhite">{value}</dd>
    </div>
  );
}
