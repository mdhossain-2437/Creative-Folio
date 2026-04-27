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

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <MarqueeBand />
      <SelectedWorks />
      <Stats />
      <AwardsSection />
      <Capabilities />
      <ProcessSection />
      <JournalPreview />
      <SiteMap />
    </>
  );
}
