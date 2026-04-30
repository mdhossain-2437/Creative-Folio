"use client";

import { HeroShader } from "@/components/webgl/HeroShader";
import { SplitText } from "@/components/ui/SplitText";
import { Marquee } from "@/components/ui/Marquee";
import { Magnetic } from "@/components/ui/Magnetic";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[760px] w-full overflow-hidden">
      <HeroShader />
      <div className="vignette absolute inset-0" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1640px] flex-col px-6 pb-16 pt-28 md:px-10 md:pb-20 md:pt-28">
        <div className="flex items-start justify-between font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
          <p>Portfolio · 02.04 · 2026</p>
          <p className="hidden md:block">
            ◊ Creative Developer / UI &amp; UX Designer / Art Direction
          </p>
          <p className="hidden md:block display-num">Joypurhat · 25.10°N 89.02°E</p>
        </div>

        <div className="mt-auto">
          <p className="font-sans text-[11px] uppercase tracking-widest text-warmwhite/60">
            ◌ &nbsp; Delowar Hossain &nbsp;—&nbsp; Folio MMXXVI
          </p>
          <h1 className="mt-4 font-serif leading-[0.86] tracking-tightest text-warmwhite md:mt-6">
            <span className="block text-[clamp(3.5rem,13vw,14rem)]">
              <SplitText text="Delowar" />
            </span>
            <span className="block text-[clamp(3.5rem,13vw,14rem)]">
              <SplitText
                text="Hossain."
                delay={0.12}
                className="italic text-warmwhite/85"
              />
            </span>
          </h1>

          <div className="mt-8 grid grid-cols-1 items-end gap-6 md:mt-10 md:grid-cols-12 md:gap-10">
            <p className="md:col-span-5 max-w-lg text-balance font-sans text-sm leading-relaxed text-warmwhite/70 md:text-base">
              Creative Developer &amp; UI / UX Designer building immersive,
              award-grade web experiences. WebGL · Three.js · GLSL · GSAP — wired
              into editorial typography and a quiet, opinionated grid.
            </p>
            <div className="md:col-span-3 font-sans text-[10px] uppercase tracking-widest text-warmwhite/50">
              <p className="mb-2 text-warmwhite">⏵ Now</p>
              <p>Building shaders for Aura Void v2.</p>
              <p>Booking Q3 — Q4 / 2026.</p>
            </div>
            <div className="flex items-center gap-3 md:col-span-4 md:justify-end">
              <Magnetic>
                <Link
                  href="/works"
                  data-cursor="view"
                  data-cursor-label="VIEW"
                  className="inline-flex items-center gap-2 rounded-full bg-warmwhite px-6 py-3.5 font-sans text-[11px] uppercase tracking-widest text-ink-900 hover:bg-peach"
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
                  className="inline-flex items-center gap-2 rounded-full border border-warmwhite/30 px-5 py-3.5 font-sans text-[11px] uppercase tracking-widest text-warmwhite hover:border-warmwhite"
                >
                  Start a Project
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-warmwhite/10 py-2">
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
          ]}
        />
      </div>
    </section>
  );
}
