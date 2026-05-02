import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Swatch } from "@/components/colors/Swatch";
import { ColorsVisitTracker } from "@/components/colors/ColorsVisitTracker";

export const metadata: Metadata = {
  title: "Colors — Studio Palette",
  description:
    "The exact hex values, Tailwind tokens, and on-ink contrast ratios for the studio's brand palette. Click any swatch to copy its hex.",
};

type Group = { title: string; eyebrow: string; swatches: { name: string; hex: string; token: string }[] };

const groups: Group[] = [
  {
    title: "Ink",
    eyebrow: "01 — Backgrounds",
    swatches: [
      { name: "Ink 950", hex: "#070708", token: "ink.950" },
      { name: "Ink 900", hex: "#0c0c0c", token: "ink.900" },
      { name: "Ink 800", hex: "#131313", token: "ink.800" },
      { name: "Ink 700", hex: "#1f201f", token: "ink.700" },
      { name: "Ink 600", hex: "#525259", token: "ink.600" },
      { name: "Ink 500", hex: "#717179", token: "ink.500" },
      { name: "Ink 400", hex: "#c6c6c7", token: "ink.400" },
    ],
  },
  {
    title: "Surface",
    eyebrow: "02 — Paper, bone, warm",
    swatches: [
      { name: "Warm white", hex: "#efece9", token: "warmwhite" },
      { name: "Bone", hex: "#e5e2e0", token: "bone" },
      { name: "Paper", hex: "#f3efe9", token: "paper" },
    ],
  },
  {
    title: "Accent",
    eyebrow: "03 — Marks & accents",
    swatches: [
      { name: "Peach", hex: "#e3bfb4", token: "peach" },
      { name: "Electric", hex: "#cdfa00", token: "electric" },
    ],
  },
];

export default function ColorsPage() {
  return (
    <>
      <ColorsVisitTracker />
      <PageHero
        eyebrow="§ 04 — Colors"
        title="The"
        italic="studio palette."
        description="Every hex value used across the site, with its Tailwind token and on-ink contrast ratio. Click any swatch to copy the hex; the page above is the only test you need."
        meta={[
          { label: "Tokens", value: String(groups.reduce((n, g) => n + g.swatches.length, 0)) },
          { label: "Background", value: "ink-950" },
          { label: "Standard", value: "WCAG 2.2" },
          { label: "Edition", value: "MMXXVII" },
        ]}
      />

      <section className="bg-ink-950 py-24 md:py-32">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <div className="space-y-20">
            {groups.map((group) => (
              <div key={group.title}>
                <div className="flex items-baseline justify-between border-b border-warmwhite/15 pb-6">
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                      {group.eyebrow}
                    </p>
                    <h2 className="mt-2 break-words font-serif text-3xl tracking-tighter md:text-5xl">
                      {group.title}
                    </h2>
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-warmwhite/55">
                    {group.swatches.length} tokens
                  </span>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                  {group.swatches.map((s) => (
                    <Swatch key={s.token} name={s.name} hex={s.hex} token={s.token} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-warmwhite/15 bg-ink-900 py-20 md:py-28">
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              ◊ Notes
            </p>
            <h3 className="mt-4 font-serif text-[clamp(1.4rem,2.4vw,2.4rem)] leading-[1.18] text-warmwhite/90">
              Editorial first. Accent never leads.
            </h3>
          </div>
          <div className="md:col-span-7 font-sans text-base leading-relaxed text-warmwhite/70 md:text-lg">
            <p>
              Bodies set on <span className="text-peach">peach</span> on{" "}
              <span className="text-warmwhite">ink-950</span> at headline sizes only — anything below
              <span className="font-mono"> 18 px</span> escalates to <span className="text-warmwhite">warmwhite</span>{" "}
              for legibility. <span className="text-electric">Electric</span> never carries a body line; it&apos;s
              reserved for live markers, focus rings, and the in-progress dot in the studio clock.
            </p>
            <p className="mt-6">
              Contrast is computed against <span className="font-mono">#070708</span> (ink-950) using WCAG 2.2
              relative luminance. AA needs 4.5×, AAA 7×, AA·LG 3× (large text only). The palette is hand-tuned
              so accent tokens land in AA·LG territory at minimum — anything below that is a bug, not a vibe.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
