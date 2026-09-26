import { milestones } from "@/lib/data";
import { StickyTimeline } from "@/components/ui/StickyTimeline";

export function MilestonesScroll() {
  return (
    <section className="border-t border-warmwhite/15">
      <div className="mx-auto max-w-[1640px] px-6 md:px-10 pt-24">
        <h2 className="max-w-4xl font-serif text-[clamp(2.5rem,6vw,5.4rem)] leading-[0.96] tracking-tightest">
          Five years. Five chapters.
          <span className="block italic text-warmwhite/90">One slow, deliberate climb.</span>
        </h2>
      </div>
      <StickyTimeline items={milestones} label="Timeline chapters" />
    </section>
  );
}
