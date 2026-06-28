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
import { PageSchema } from "@/components/seo/PageSchema";
import { site } from "@/lib/site";
import type { Metadata } from "next";

// Homepage self-referencing canonical. The root layout intentionally no longer
// sets a blanket canonical (it would propagate to every page); the homepage
// declares its own here. Title/description fall through to the layout defaults,
// which are already tuned for the branded "Delowar Hossain" query.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <PageSchema
        path="/"
        name={`${site.name} — Creative Developer & UI/UX Designer`}
        description={`${site.name} runs ${site.studio}, building WebGL, Next.js, UI/UX and AI-augmented digital experiences from ${site.location}.`}
        crumbs={[{ name: "Home", href: "/" }]}
        primaryImage={site.portrait}
      />
      <div data-section-id="hero"><Hero /></div>
      <div data-section-id="manifesto"><Manifesto /></div>
      <div data-section-id="marquee"><MarqueeBand /></div>
      <div data-section-id="works"><SelectedWorks /></div>
      <div data-section-id="showreel"><ShowreelTeaser /></div>
      <div data-section-id="milestones"><MilestonesScroll /></div>
      <div data-section-id="now"><NowTeaser /></div>
      <div data-section-id="stats"><Stats /></div>
      <div data-section-id="testimonials"><Testimonials /></div>
      <div data-section-id="awards"><AwardsSection /></div>
      <div data-section-id="capabilities"><Capabilities /></div>
      {/* No cv-auto here: this section uses a GSAP ScrollTrigger pin + a
          horizontal track whose width must be measured at init. content-visibility
          virtualises the off-screen size and freezes the scrub on phase one. */}
      <div data-section-id="process"><ProcessSection /></div>
      <div data-section-id="portfolios"><PortfoliosTeaser /></div>
      <div data-section-id="journal"><JournalPreview /></div>
      <div data-section-id="sitemap"><SiteMap /></div>
    </>
  );
}
