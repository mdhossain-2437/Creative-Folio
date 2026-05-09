import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { AchievementsBoard } from "@/components/ui/AchievementsBoard";
import { PageSchema } from "@/components/seo/PageSchema";

export const metadata: Metadata = {
  title: "Achievements — A Studio Game",
  description:
    "Hidden interactions across the studio site. Unlock them by playing with the place.",
};

export default function AchievementsPage() {
  return (
    <>
      <PageSchema
        path="/achievements"
        name="Achievements — A Studio Game"
        description="Hidden interactions across the studio site. Unlock them by playing with the place."
        crumbs={[{ name: "Home", href: "/" }, { name: "Achievements", href: "/achievements" }]}
      />
      <PageHero
        eyebrow="§07 — Achievements"
        title="Studio"
        italic="Compendium."
        description="A small game baked into the site. Hidden interactions, keyboard chords, easter eggs — each one rewards the curious. State persists in this browser only."
        meta={[
          { label: "System", value: "localStorage" },
          { label: "Reset", value: "Clear site data" },
          { label: "Spoilers", value: "Earned, not given" },
        ]}
      />
      <section className="bg-ink-900 py-16 md:py-24">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <AchievementsBoard />
        </div>
      </section>
    </>
  );
}
