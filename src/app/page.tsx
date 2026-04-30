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
      <ShowreelTeaser />
      <MilestonesScroll />
      <NowTeaser />
      <Stats />
      <Testimonials />
      <AwardsSection />
      <Capabilities />
      <ProcessSection />
      <JournalPreview />
      <SiteMap />
    </>
  );
}
