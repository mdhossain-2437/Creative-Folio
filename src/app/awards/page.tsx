import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { awards } from "@/lib/data";
import { PageSchema } from "@/components/seo/PageSchema";

export const metadata: Metadata = {
  alternates: { canonical: "/awards" },
  title: "Awards — Trophy Room",
  description:
    "International design and engineering recognition for the work of Delowar Hossain.",
};

export default function AwardsPage() {
  return (
    <>
      <PageSchema
        path="/awards"
        name="Awards — Trophy Room"
        description="International design and engineering recognition for the work of Delowar Hossain."
        crumbs={[{ name: "Home", href: "/" }, { name: "Awards", href: "/awards" }]}
      />
      <PageHero
        eyebrow="§ The Trophy Room"
        title="Awards"
        italic="& Mentions."
        description="A record of work that has been recognised by international design and engineering juries — beyond the dopamine, validation that the craft is travelling."
        meta={[
          { label: "Total", value: awards.length.toString() },
          { label: "Latest", value: "2024" },
          { label: "Bodies", value: "Awwwards · FWA · CSSDA" },
        ]}
      />

      <section className="bg-ink-900 py-16 md:py-24">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <ul className="grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/15 md:grid-cols-2">
            {awards.map((a, i) => (
              <Reveal key={a.index} delay={i * 0.06}>
                <li className="flex h-full flex-col justify-between gap-10 bg-ink-900 p-10">
                  <header className="flex items-start justify-between gap-6">
                    <span className="display-num font-serif text-7xl leading-none tracking-tightest text-warmwhite/85">
                      {a.index}
                    </span>
                    <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                      {a.org} · {a.year}
                    </span>
                  </header>
                  <h3 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-none tracking-tightest">
                    {a.title}
                  </h3>
                  <p className="max-w-prose font-sans text-base leading-relaxed text-warmwhite/65">
                    {a.summary}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
