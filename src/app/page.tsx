import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { SelectedWorks } from "@/components/sections/SelectedWorks";
import { AwardsSection } from "@/components/sections/Awards";
import { Capabilities } from "@/components/sections/Capabilities";
import { ProcessSection } from "@/components/sections/Process";
import { Stats } from "@/components/sections/Stats";
import { MarqueeBand } from "@/components/sections/MarqueeBand";
import { JournalPreview } from "@/components/sections/JournalPreview";
import { SiteMap } from "@/components/sections/SiteMap";
import { MilestonesScroll } from "@/components/sections/MilestonesScroll";
import { NowTeaser } from "@/components/sections/NowTeaser";
import { ShowreelTeaser } from "@/components/sections/ShowreelTeaser";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <MarqueeBand />
      <SelectedWorks />
      <div className="cv-auto"><ShowreelTeaser /></div>
      <div className="cv-auto"><MilestonesScroll /></div>
      <div className="cv-auto"><NowTeaser /></div>
      <div className="cv-auto"><Stats /></div>
      <div className="cv-auto"><Testimonials /></div>
      <div className="cv-auto"><AwardsSection /></div>
      <div className="cv-auto"><Capabilities /></div>
      <div className="cv-auto"><ProcessSection /></div>
      <div className="cv-auto"><JournalPreview /></div>
      <div className="cv-auto"><SiteMap /></div>
    </>
  );
}
