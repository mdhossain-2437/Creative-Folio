import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Colophon — The Making Of",
  description: "How this site was built — stack, type, motion and a few notes on craft.",
};

export default function ColophonPage() {
  return (
    <>
      <PageHero
        eyebrow="§ Colophon — The Making Of"
        title="Colophon"
        italic="& Credits."
        description="This site is built with intent. Designed in Figma, typeset in Newsreader, Inter and JetBrains Mono. Engineered with Next.js, Three.js, GSAP, Lenis and Framer Motion."
        meta={[
          { label: "Framework", value: "Next.js" },
          { label: "Motion", value: "GSAP · Lenis" },
          { label: "WebGL", value: "Three.js · GLSL" },
          { label: "Hosting", value: "Vercel" },
        ]}
      />

      <section className="bg-ink-900 py-24 md:py-32">
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-3">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              ◊ Credits
            </p>
          </div>
          <ul className="md:col-span-9 grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              { k: "Design Direction", v: "Delowar Hossain" },
              { k: "Engineering", v: "Delowar Hossain · The Compiled Thought" },
              { k: "Typography", v: "Newsreader · Inter · JetBrains Mono" },
              { k: "Photography", v: "Unsplash creators (placeholders)" },
              { k: "Motion / Sound", v: "GSAP · Web Audio API" },
              { k: "Special Thanks", v: "Awwwards / FWA / The CSS community" },
            ].map((c) => (
              <li key={c.k} className="border-t border-warmwhite/15 pt-4">
                <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                  {c.k}
                </p>
                <p className="mt-2 font-serif text-2xl tracking-tighter">{c.v}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-warmwhite/15 bg-ink-950 py-24 md:py-32">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tightest">
            Built in {site.location}.
          </h2>
          <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-warmwhite/70 md:text-lg">
            Every element on this site is hand-tuned: the easing curves, the
            grain on the hero shader, the line height of the journal posts. If
            you spotted something that could be sharper, write to me at{" "}
            <a href={`mailto:${site.email}`} className="text-warmwhite underline-offset-4 hover:underline">
              {site.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
