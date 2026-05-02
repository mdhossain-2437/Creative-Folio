"use client";

import { HeroShader } from "@/components/webgl/HeroShader";
import { SplitText } from "@/components/ui/SplitText";
import { Marquee } from "@/components/ui/Marquee";
import { Magnetic } from "@/components/ui/Magnetic";
import Link from "next/link";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[760px] w-full overflow-hidden">
      <HeroShader />
      <div className="vignette absolute inset-0" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1640px] flex-col px-6 pb-16 pt-28 md:px-10 md:pb-20 md:pt-28">
        {/* Single quiet eyebrow — everything else lives in the StatusStrip / Footer now. */}
        <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
          ◌ Folio {site.editionShort}
        </p>

        <div className="mt-auto">
          <h1 className="break-words font-serif leading-[0.88] tracking-tightest text-warmwhite">
            <span className="block text-[clamp(3rem,11vw,11rem)]">
              <SplitText text="Delowar" />
            </span>
            <span className="block text-[clamp(3rem,11vw,11rem)]">
              <SplitText
                text="Hossain."
                delay={0.12}
                className="italic text-warmwhite/90"
              />
            </span>
          </h1>

          <div className="mt-8 grid grid-cols-1 items-end gap-6 md:mt-10 md:grid-cols-12 md:gap-10">
            <p className="md:col-span-7 max-w-xl text-balance font-sans text-base leading-relaxed text-warmwhite/85 md:text-lg">
              Creative Developer. Award-grade web experiences where typography,
              motion, and engineering converge.
            </p>
            <div className="flex items-center gap-3 md:col-span-5 md:justify-end">
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
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-warmwhite/15 py-2">
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
