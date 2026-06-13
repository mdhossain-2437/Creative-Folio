import { milestones } from "@/lib/data";
import { StickyTimeline } from "@/components/ui/StickyTimeline";
import { ScrambleText } from "@/components/ui/ScrambleText";

export function MilestonesScroll() {
  return (
    <section className="border-t border-warmwhite/15">
      <div className="mx-auto max-w-[1640px] px-6 md:px-10 pt-24">
        <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
          <ScrambleText>§04 — Milestones · 2023 → 2027</ScrambleText>
        </p>
        <h2 className="mt-4 font-serif text-[clamp(2.4rem,4.5vw,4.5rem)] leading-[0.95] tracking-tightest">
          Five years. <span className="italic text-warmwhite/60">Five chapters.</span>
        </h2>
      </div>
      <StickyTimeline items={milestones} label="◊ scroll the chapters" />
    </section>
  );
}
