import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { awards, earnedAwards, recognitionTargets } from "@/lib/data";
import { PageSchema } from "@/components/seo/PageSchema";

export const metadata: Metadata = {
  alternates: { canonical: "/awards" },
  title: "Recognition Targets",
  description:
    "Clearly labelled recognition targets and earned recognitions for the work of Delowar Hossain.",
};

export default function AwardsPage() {
  const earnedCount = earnedAwards.length;
  const targetCount = recognitionTargets.length;

  return (
    <>
      <PageSchema
        path="/awards"
        name="Recognition Targets — Delowar Hossain"
        description="Clearly labelled recognition targets and earned recognitions for the work of Delowar Hossain."
        crumbs={[{ name: "Home", href: "/" }, { name: "Awards", href: "/awards" }]}
      />
      <PageHero
        eyebrow="§ Recognition Ledger"
        title="Recognition"
        italic="Targets."
        description="A transparent ledger of award bodies the work is being prepared for. Items stay labelled as targets until a public, verifiable result exists."
        meta={[
          { label: "Total", value: awards.length.toString() },
          { label: "Earned", value: earnedCount.toString() },
          { label: "Targets", value: targetCount.toString() },
        ]}
      />

      <section className="bg-ink-900 py-16 md:py-24">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <ul className="grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/15 md:grid-cols-2">
            {awards.map((a, i) => (
              <Reveal
                key={a.index}
                as="li"
                delay={i * 0.06}
                className="flex h-full flex-col justify-between gap-10 bg-ink-900 p-10"
              >
                  <header className="flex items-start justify-between gap-6">
                    <span className="display-num font-serif text-7xl leading-none tracking-tightest text-warmwhite/85">
                      {a.index}
                    </span>
                    <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                      {a.org} · {a.year}
                    </span>
                  </header>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-peach">
                    {a.status === "earned" ? "Verified recognition" : "Recognition target"}
                  </p>
                  <h3 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-none tracking-tightest">
                    {a.title}
                  </h3>
                  <p className="max-w-prose font-sans text-base leading-relaxed text-warmwhite/65">
                    {a.summary}
                  </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
