"use client";

import dynamic from "next/dynamic";
import { HeroShader } from "@/components/webgl/HeroShader";
import { HeroFluidDisplacement } from "@/components/webgl/HeroFluidDisplacement";
import { MagneticLetters } from "@/components/ui/MagneticLetters";
import { Marquee } from "@/components/ui/Marquee";
import { Magnetic } from "@/components/ui/Magnetic";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { GhostCursors } from "@/components/ui/GhostCursors";
import Link from "@/components/ui/PerformanceLink";
import { site } from "@/lib/site";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  resolveRuntimeGraphicsMode,
  scheduleIdleWork,
  type RuntimeGraphicsMode,
} from "@/lib/clientPerformance";
import { onDeviceProfileChange } from "@/lib/deviceTier";
import { shouldAttemptWebGPU } from "@/lib/webgpuHelper";

const HeroShaderGpu = dynamic(
  () =>
    import("@/components/webgl/HeroShaderGpu").then(
      (mod) => mod.HeroShaderGpu,
    ),
  { ssr: false },
);

type HeroShaderBackend = "webgpu" | "webgl";

export function Hero() {
  const [graphicsMode, setGraphicsMode] =
    useState<RuntimeGraphicsMode>("static");
  const [shaderBackend, setShaderBackend] =
    useState<HeroShaderBackend>("webgl");
  const cancelEnhancementRef = useRef<() => void>(() => {});
  const fallbackToWebGl = useCallback(() => {
    setShaderBackend("webgl");
  }, []);

  useEffect(() => {
    let cancelled = false;
    const applyMode = () => {
      cancelEnhancementRef.current();
      const mode = resolveRuntimeGraphicsMode();

      if (mode !== "enhanced") {
        setGraphicsMode(mode);
        cancelEnhancementRef.current = () => {};
        return;
      }

      // Ship the signature field first, then let the additive fluid/cursor
      // layers join only after the live page has had a quiet moment.
      setShaderBackend(shouldAttemptWebGPU() ? "webgpu" : "webgl");
      setGraphicsMode("base");
      const cancelEnhancement = scheduleIdleWork(() => {
        if (!cancelled) setGraphicsMode("enhanced");
      }, 9000);
      cancelEnhancementRef.current = cancelEnhancement;
    };

    const cancelIdle = scheduleIdleWork(applyMode, 1200);
    const offProfile = onDeviceProfileChange(applyMode);

    return () => {
      cancelled = true;
      cancelIdle();
      cancelEnhancementRef.current();
      offProfile();
    };
  }, []);

  const showShader = graphicsMode === "base" || graphicsMode === "enhanced";
  const showEnhancedLayers = graphicsMode === "enhanced";

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden md:min-h-[760px]">
      <div className="absolute inset-0 bg-ink-950" aria-hidden />
      {showShader &&
        (shaderBackend === "webgpu" ? (
          <HeroShaderGpu onFallback={fallbackToWebGl} />
        ) : (
          <HeroShader />
        ))}
      {showEnhancedLayers && <HeroFluidDisplacement />}
      {showEnhancedLayers && <GhostCursors />}
      <div className="vignette absolute inset-0" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1640px] flex-col px-6 pb-16 pt-24 md:px-10 md:pb-20 md:pt-28">
        {/* Single quiet eyebrow — everything else lives in the StatusStrip / Footer now. */}
        <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
          <ScrambleText trigger="mount" duration={900}>
            {`◌ Folio ${site.editionShort}`}
          </ScrambleText>
        </p>

        <div className="mt-auto">
          {/* aria-label gives screen readers + Google a real space-separated
              name. Visual stays identical (two stacked lines, italic on
              `Hossain.`). */}
          <h1
            aria-label="Delowar Hossain."
            className="break-words font-serif leading-[0.88] tracking-tightest text-warmwhite"
          >
            <span aria-hidden className="block text-[clamp(3rem,11vw,11rem)]">
              <MagneticLetters text="Delowar" />
            </span>
            <span aria-hidden className="block text-[clamp(3rem,11vw,11rem)] italic text-warmwhite/90">
              <MagneticLetters text="Hossain." italic />
            </span>
          </h1>

          <div className="mt-8 grid grid-cols-1 items-end gap-6 md:mt-10 md:grid-cols-12 md:gap-10">
            <p className="md:col-span-7 max-w-xl text-balance font-sans text-base leading-relaxed text-warmwhite/85 md:text-lg">
              Creative Developer. Award-grade web experiences where typography,
              motion, and engineering converge.
            </p>
            <div className="flex flex-wrap items-center gap-3 md:col-span-5 md:justify-end">
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
