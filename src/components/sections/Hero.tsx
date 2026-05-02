"use client";

import { HeroShader } from "@/components/webgl/HeroShader";
import { SplitText } from "@/components/ui/SplitText";
import { Marquee } from "@/components/ui/Marquee";
import { Magnetic } from "@/components/ui/Magnetic";
import Link from "next/link";
import { site } from "@/lib/site";

// Hero — MMXXVII (post-audit). One vertically-centred editorial cluster
// instead of four corners. Eyebrow → h1 → description → CTAs read top-to-bottom
// in a single rhythm; the keyword marquee anchors the bottom edge below the
// floating overlays so it stops fighting `ShowreelPill` / `AtmosphereMode`.

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[760px] w-full overflow-hidden">
      <HeroShader />
      <div className="vignette absolute inset-0" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1640px] flex-col px-6 pt-28 pb-28 md:px-10 md:pt-32 md:pb-32">
        {/* Single editorial cluster, vertically centred. */}
        <div className="my-auto max-w-[1100px]">
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
            ◌ Folio {site.editionShort}
          </p>

          {/* h1: visually `Delowar` + `Hossain.` (italic). aria-label gives screen
              readers and search engines a real space-separated name. */}
          <h1
            aria-label="Delowar Hossain."
            className="mt-6 break-words font-serif leading-[0.88] tracking-tightest text-warmwhite md:mt-8"
          >
            <span aria-hidden className="block text-[clamp(3rem,11vw,11rem)]">
              <SplitText text="Delowar" />
            </span>
            <span aria-hidden className="block text-[clamp(3rem,11vw,11rem)]">
              <SplitText
                text="Hossain."
                delay={0.12}
                className="italic text-warmwhite/90"
              />
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-balance font-sans text-base leading-relaxed text-warmwhite/85 md:mt-10 md:text-lg">
            Creative Developer. Award-grade web experiences where typography,
            motion, and engineering converge.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
            <Magnetic>
              <Link
                href="/works"
                data-cursor="view"
                data-cursor-label="VIEW"
                className="inline-flex items-center gap-2 rounded-full bg-warmwhite px-6 py-3.5 font-sans text-[11px] uppercase tracking-widest text-ink-900 hover:bg-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
              >
                Selected Works
                <span aria-hidden>↗</span>
              </Link>
            </Magnetic>
            <Magnetic strength={18}>
              <Link
                href="/contact"
                data-cursor="hover"
                data-cursor-label="WRITE"
                className="inline-flex items-center gap-2 rounded-full border border-warmwhite/40 px-5 py-3.5 font-sans text-[11px] uppercase tracking-widest text-warmwhite hover:border-warmwhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
              >
                Start a Project
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Bottom keyword marquee — sits just above the floating overlays so it
          doesn't compete with `ShowreelPill` / `AtmosphereMode` pills. */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] border-t border-warmwhite/15 bg-ink-950/40 py-2 backdrop-blur-sm">
        <Marquee
          speed={42}
          size="sm"
          items={[
            "UI / UX DESIGN",
            "WEBGL",
            "THREE.JS",
            "GSAP",
            "CREATIVE DIRECTION",
            "WEB DESIGN",
            "LOGO & BRANDING",
            "FRAMER · WEBFLOW",
            "GLSL SHADERS",
            "AI INTEGRATION",
            "MMXXVII",
          ]}
        />
      </div>
    </section>
  );
}
