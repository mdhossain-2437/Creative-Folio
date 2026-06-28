import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { services, process, serviceTiers } from "@/lib/data";
import { site } from "@/lib/site";

// Parse "From $4,800" → 4800; "$8,800/mo" → 8800. Returns undefined when
// the price isn't a clean number so JSON-LD omits the field rather than
// shipping a malformed PriceSpecification.
function parsePriceUSD(s: string): number | undefined {
  const match = s.replace(/,/g, "").match(/\$(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : undefined;
}

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Services & Process",
  description:
    "Engagement scope, capabilities and the four-phase process — from discovery to production. Booking 2027.",
};

export default function ServicesPage() {
  // Schema.org Service + OfferCatalog gives Google the rich-results
  // eligibility for service offerings (price snippets, provider link).
  // The OfferCatalog wraps the three serviceTiers as Offer entries with
  // priceCurrency + priceSpecification.
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/services#service`,
    name: "Creative Development & Design Engagements",
    description:
      "High-end digital experiences merging editorial art direction with creative development. Project, retainer, and embedded engagement models.",
    provider: {
      "@type": "Person",
      "@id": `${site.url}#person`,
      name: site.name,
      url: site.url,
    },
    serviceType: services.map((s) => s.title),
    areaServed: "Worldwide",
    availableLanguage: ["English", "Bengali"],
    url: `${site.url}/services`,
    offers: {
      "@type": "OfferCatalog",
      name: "Engagement Tiers",
      itemListElement: serviceTiers.map((tier) => {
        const price = parsePriceUSD(tier.starts);
        // Retainer prices are per-month; sprint/engagement are flat.
        const isMonthly = /\/mo/i.test(tier.starts);
        return {
          "@type": "Offer",
          name: tier.name,
          description: tier.pitch,
          eligibleDuration: tier.duration,
          ...(price
            ? {
                priceSpecification: {
                  "@type": isMonthly
                    ? "UnitPriceSpecification"
                    : "PriceSpecification",
                  price,
                  priceCurrency: "USD",
                  ...(isMonthly
                    ? { unitText: "per month", referenceQuantity: { "@type": "QuantitativeValue", unitCode: "MON", value: 1 } }
                    : { description: "Starting price" }),
                },
              }
            : {}),
          itemOffered: {
            "@type": "Service",
            name: tier.name,
            description: tier.pitch,
            // Deliverables become the service's serviceType list — these
            // surface in some rich-results contexts as feature bullets.
            serviceType: tier.deliverables,
          },
        };
      }),
    },
    termsOfService: `${site.url}/colophon`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageHero
        eyebrow="§ Services & Process"
        title="Expertise"
        italic="& Engagements."
        description="Specialising in high-end digital experiences. Merging technical precision with editorial art direction to create recognition-ready interactive platforms."
        meta={[
          { label: "Booking", value: "Q1 — Q4 / 2027" },
          { label: "Models", value: "Project · Retainer" },
          { label: "Industries", value: "SaaS · AI · Studios" },
          { label: "Time zone", value: "GMT+6" },
        ]}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            data-cursor="hover"
            data-cursor-label="INQUIRE"
            className="inline-flex items-center gap-2 rounded-full bg-warmwhite px-6 py-3 font-sans text-[11px] uppercase tracking-widest text-ink-900 transition-colors hover:bg-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
          >
            Start a Project <span aria-hidden>↗</span>
          </Link>
          <Link
            href="/works"
            data-cursor="hover"
            data-cursor-label="WORKS"
            className="inline-flex items-center gap-2 rounded-full border border-warmwhite/30 px-6 py-3 font-sans text-[11px] uppercase tracking-widest text-warmwhite transition-colors hover:border-peach hover:text-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
          >
            See Selected Works <span aria-hidden>↗</span>
          </Link>
        </div>
      </PageHero>

      <section className="border-t border-warmwhite/15 bg-ink-900 py-24 md:py-32">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <header className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 md:col-span-3">
              ◊ Tiers
            </p>
            <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest md:col-span-9">
              Three ways{" "}
              <span className="italic text-warmwhite/60">to work together.</span>
            </h2>
          </header>
          <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/15 md:grid-cols-3">
            {serviceTiers.map((t, i) => (
              <Reveal key={t.index} delay={i * 0.08}>
                <li className="relative flex h-full flex-col gap-7 bg-ink-900 p-8 md:p-10">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                      {t.index}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-peach">
                      {t.duration}
                    </span>
                  </div>
                  <h3 className="font-serif text-[clamp(2.4rem,3.6vw,3.6rem)] leading-[0.96] tracking-tightest">
                    {t.name}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-warmwhite/70">
                    {t.pitch}
                  </p>
                  <ul className="space-y-2 border-t border-warmwhite/15 pt-5 font-mono text-[11px] uppercase tracking-widest text-warmwhite/55">
                    {t.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-1 w-1 shrink-0 rounded-full bg-electric" />
                        <span className="normal-case tracking-tight text-warmwhite/80">{d}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-end justify-between gap-3 border-t border-warmwhite/15 pt-5">
                    <div>
                      <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                        Best for
                      </p>
                      <p className="mt-2 max-w-[18ch] font-serif text-sm leading-snug text-warmwhite/75">
                        {t.best}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                        From
                      </p>
                      <p className="mt-2 font-serif text-2xl tracking-tight text-warmwhite">
                        {t.starts}
                      </p>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink-900 py-20 md:py-28">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
            ◊ Capabilities · what each tier draws from
          </p>
          <ul className="mt-12 space-y-px overflow-hidden bg-warmwhite/15">
            {services.map((s, i) => (
              <Reveal key={s.index} delay={i * 0.05}>
                <li className="grid grid-cols-1 gap-6 bg-ink-900 p-8 md:grid-cols-12 md:gap-10 md:p-12">
                  <div className="md:col-span-2">
                    <span className="display-num font-serif text-7xl leading-none tracking-tightest text-warmwhite/85">
                      {s.index}
                    </span>
                  </div>
                  <h3 className="font-serif text-[clamp(2rem,4vw,3.6rem)] leading-[0.96] tracking-tightest md:col-span-4">
                    {s.title}
                  </h3>
                  <p className="font-sans text-base leading-relaxed text-warmwhite/70 md:col-span-4">
                    {s.summary}
                  </p>
                  <ul className="flex flex-wrap gap-2 md:col-span-2 md:justify-end">
                    {s.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-warmwhite/20 px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-warmwhite/65"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-warmwhite/15 bg-ink-950 py-28 md:py-40">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <header className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 md:col-span-3">
              ◊ Process
            </p>
            <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest md:col-span-9">
              Concept <span className="italic text-warmwhite/60">to Shader.</span>
            </h2>
          </header>
          <ol className="mt-16 grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/15 md:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.phase} delay={i * 0.05}>
                <li className="flex h-full flex-col gap-6 bg-ink-950 p-8 md:p-10">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                    {p.phase}
                  </span>
                  <h3 className="font-serif text-3xl leading-none tracking-tightest md:text-4xl">
                    {p.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-warmwhite/65">{p.summary}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-warmwhite/15 bg-ink-900 py-28 md:py-40">
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-3">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              ◊ Engagements
            </p>
          </div>
          <ul className="md:col-span-9 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: "Project",
                tagline: "Fixed scope, 4 — 12 weeks",
                desc: "Sites, microsites, and case-study pages. Discovery → Production with measurable performance and a public outcome.",
              },
              {
                title: "Retainer",
                tagline: "Monthly, 30h+",
                desc: "Ongoing creative engineering, motion systems and design support. For studios and AI-native product teams shipping quickly.",
              },
              {
                title: "Studio Lead",
                tagline: "Long-term, embedded",
                desc: "Lead creative engineering inside a product team. Build motion systems, hire, and codify a craft language.",
              },
            ].map((e, i) => (
              <Reveal key={e.title} delay={i * 0.05}>
                <li className="aura relative flex h-full flex-col gap-5 rounded-md border border-warmwhite/15 bg-ink-900 p-8">
                  <p className="font-sans text-[10px] uppercase tracking-widest text-peach">
                    {e.tagline}
                  </p>
                  <h3 className="font-serif text-3xl tracking-tighter">{e.title}</h3>
                  <p className="font-sans text-sm leading-relaxed text-warmwhite/65">{e.desc}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
