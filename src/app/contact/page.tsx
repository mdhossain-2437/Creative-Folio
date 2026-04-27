import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Start a Project",
  description: "Inquiries, collaborations, retainers, and the occasional ‘just hi’. Open Q3 — Q4 / 2026.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="§ Contact & Colophon"
        title="Start a"
        italic="Project."
        description="The fastest way is the form below — or write directly. I read everything and reply within 48 hours, weekdays."
        meta={[
          { label: "Email", value: site.email },
          { label: "Booking", value: "Q3 — Q4 / 2026" },
          { label: "Time zone", value: "GMT+6" },
          { label: "Location", value: site.location },
        ]}
      />

      <section className="bg-ink-900 py-24 md:py-32">
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/50">
              ◊ Direct Inquiries
            </p>
            <a
              href={`mailto:${site.email}`}
              data-cursor="hover"
              data-cursor-label="WRITE"
              className="mt-6 block font-serif text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] tracking-tightest text-warmwhite hover:text-peach"
            >
              {site.email}
            </a>

            <dl className="mt-12 grid grid-cols-2 gap-y-8">
              <Item label="Location" value={site.base} />
              <Item label="Studio" value={site.studio} />
              <Item label="Hours" value="Mon — Fri · 09:00 → 18:00 GMT+6" />
              <Item label="Languages" value="English · Bangla" />
              <Item label="Booking" value="Open · Q3 — Q4 / 2026" />
              <Item label="Reply time" value="≤ 48 hours, weekdays" />
            </dl>

            <div className="mt-12 border-t border-warmwhite/10 pt-8">
              <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/50">
                ◊ Connect
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-3">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="hover"
                      data-cursor-label="OPEN"
                      className="block rounded-full border border-warmwhite/20 px-4 py-3 font-sans text-[11px] uppercase tracking-widest text-warmwhite/85 hover:border-warmwhite"
                    >
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="border-t border-warmwhite/10 bg-ink-950 py-24 md:py-32">
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-3">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/50">
              ◊ Colophon
            </p>
          </div>
          <div className="md:col-span-9">
            <p className="font-serif text-[clamp(1.4rem,2.4vw,2.4rem)] leading-snug tracking-tighter text-warmwhite">
              The architecture of this digital experience is built upon a modern,
              performance-driven stack. Designed in Figma, built with Next.js,
              Three.js, GSAP, Lenis and Framer Motion. Typeset in{" "}
              <span className="italic">Newsreader</span>, Inter and JetBrains
              Mono.
            </p>
            <ul className="mt-12 grid grid-cols-2 gap-px bg-warmwhite/10 md:grid-cols-4">
              {[
                { v: "Next.js", k: "Framework" },
                { v: "GSAP", k: "Animation" },
                { v: "Three.js", k: "WebGL" },
                { v: "Lenis", k: "Scroll" },
              ].map((s) => (
                <li key={s.k} className="bg-ink-950 p-6">
                  <p className="font-serif text-3xl leading-none tracking-tightest">{s.v}</p>
                  <p className="mt-2 font-sans text-[10px] uppercase tracking-widest text-warmwhite/50">
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
      <dt className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/45">{label}</dt>
      <dd className="mt-2 font-serif text-xl tracking-tighter text-warmwhite">{value}</dd>
    </div>
  );
}
