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
import { PortfoliosTeaser } from "@/components/sections/PortfoliosTeaser";
import { SectionRail } from "@/components/ui/SectionRail";

const railItems = [
  { id: "hero", label: "Hero" },
  { id: "manifesto", label: "Manifesto" },
  { id: "works", label: "Works" },
  { id: "showreel", label: "Reel" },
  { id: "milestones", label: "Milestones" },
  { id: "now", label: "Now" },
  { id: "stats", label: "Stats" },
  { id: "testimonials", label: "Words" },
  { id: "awards", label: "Awards" },
  { id: "capabilities", label: "Studio" },
  { id: "process", label: "Process" },
  { id: "portfolios", label: "Editions" },
  { id: "journal", label: "Journal" },
  { id: "sitemap", label: "Map" },
];

export default function HomePage() {
  return (
    <>
      <SectionRail items={railItems} />
      <div data-section-id="hero"><Hero /></div>
      <div data-section-id="manifesto"><Manifesto /></div>
      <div data-section-id="marquee"><MarqueeBand /></div>
      <div data-section-id="works"><SelectedWorks /></div>
      <div data-section-id="showreel" className="cv-auto"><ShowreelTeaser /></div>
      <div data-section-id="milestones" className="cv-auto"><MilestonesScroll /></div>
      <div data-section-id="now" className="cv-auto"><NowTeaser /></div>
      <div data-section-id="stats" className="cv-auto"><Stats /></div>
      <div data-section-id="testimonials" className="cv-auto"><Testimonials /></div>
      <div data-section-id="awards" className="cv-auto"><AwardsSection /></div>
      <div data-section-id="capabilities" className="cv-auto"><Capabilities /></div>
      <div data-section-id="process" className="cv-auto"><ProcessSection /></div>
      <div data-section-id="portfolios" className="cv-auto"><PortfoliosTeaser /></div>
      <div data-section-id="journal" className="cv-auto"><JournalPreview /></div>
      <div data-section-id="sitemap" className="cv-auto"><SiteMap /></div>
    </>
  );
}
