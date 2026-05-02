import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { SelectedWorks } from "@/components/sections/SelectedWorks";
import { AwardsSection } from "@/components/sections/Awards";
import { MilestonesScroll } from "@/components/sections/MilestonesScroll";
import { ShowreelTeaser } from "@/components/sections/ShowreelTeaser";
import { CurrentBand } from "@/components/sections/CurrentBand";

// Homepage — MMXXVII edition (post-audit, May '26). Trimmed from 13 sections to
// 7 to fix the "unplanned UI/UX" feel. Cuts: MarqueeBand (hero+footer already
// have marquees), Stats (folded into AwardsSection), Testimonials (currently
// empty content; lives on /about), Capabilities + Process (full versions on
// /services and /process), SiteMap (footer's link grid covers it). NowTeaser +
// JournalPreview merged into CurrentBand. Section eyebrows now use a single
// `◊` mark instead of mechanical §NN — numbering.

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <SelectedWorks />
      <div className="cv-auto"><ShowreelTeaser /></div>
      <div className="cv-auto"><MilestonesScroll /></div>
      <div className="cv-auto"><AwardsSection /></div>
      <div className="cv-auto"><CurrentBand /></div>
    </>
  );
}
