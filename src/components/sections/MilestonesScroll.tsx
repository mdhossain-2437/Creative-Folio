import { milestones } from "@/lib/data";
import { StickyTimeline } from "@/components/ui/StickyTimeline";

export function MilestonesScroll() {
  return (
    <section className="border-t border-warmwhite/10">
      <div className="mx-auto max-w-[1640px] px-6 md:px-10 pt-24">
        <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/45">
          §04 — Milestones · 2017 → 2026
        </p>
        <h2 className="mt-6 max-w-4xl font-serif text-[clamp(2.5rem,6vw,5.4rem)] leading-[0.96] tracking-tightest">
          Nine years. Five chapters.
          <span className="block italic text-warmwhite/60">One slow, deliberate climb.</span>
        </h2>
      </div>
      <StickyTimeline items={milestones} label="◊ scroll the chapters" />
    </section>
  );
}
