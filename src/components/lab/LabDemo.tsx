"use client";

import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type LazyExoticComponent,
} from "react";
import { NoiseField } from "@/components/webgl/NoiseField";
import type { LabDemoModuleProps } from "@/components/lab/runtime/CanvasDemo";

type DemoComponent = ComponentType<LabDemoModuleProps>;
type LazyDemoComponent = LazyExoticComponent<DemoComponent>;

type LabDemoProps = {
  slug: string;
  seed: number;
  compact?: boolean;
};

const FluidDynamicsDemo = lazy(
  () => import("@/components/lab/demos/FluidDynamicsDemo"),
);
const VolumetricLightingDemo = lazy(
  () => import("@/components/lab/demos/VolumetricLightingDemo"),
);
const ParticleSystemsDemo = lazy(
  () => import("@/components/lab/demos/ParticleSystemsDemo"),
);
const MagneticCursorDemo = lazy(
  () => import("@/components/lab/demos/MagneticCursorDemo"),
);
const FftMaterialDemo = lazy(
  () => import("@/components/lab/demos/FftMaterialDemo"),
);
const ShaderStormDemo = lazy(
  () => import("@/components/lab/demos/ShaderStormDemo"),
);
const LatencyCanvasDemo = lazy(
  () => import("@/components/lab/demos/LatencyCanvasDemo"),
);
const ReactionDiffusionDemo = lazy(
  () => import("@/components/lab/demos/ReactionDiffusionDemo"),
);
const VoronoiCellsDemo = lazy(
  () => import("@/components/lab/demos/VoronoiCellsDemo"),
);
const FlowFieldDemo = lazy(
  () => import("@/components/lab/demos/FlowFieldDemo"),
);
const LissajousOrbitsDemo = lazy(
  () => import("@/components/lab/demos/LissajousOrbitsDemo"),
);
const BoidsFlockDemo = lazy(
  () => import("@/components/lab/demos/BoidsFlockDemo"),
);
const WaveInterferenceDemo = lazy(
  () => import("@/components/lab/demos/WaveInterferenceDemo"),
);
const KaleidoscopeDemo = lazy(
  () => import("@/components/lab/demos/KaleidoscopeDemo"),
);
const MetaballsDemo = lazy(
  () => import("@/components/lab/demos/MetaballsDemo"),
);
const VariableFontScrollDemo = lazy(
  () => import("@/components/lab/demos/VariableFontScrollDemo"),
);
const SignedDistanceLettersDemo = lazy(
  () => import("@/components/lab/demos/SignedDistanceLettersDemo"),
);
const TruchetTilesDemo = lazy(
  () => import("@/components/lab/demos/TruchetTilesDemo"),
);
const PerlinTerrainDemo = lazy(
  () => import("@/components/lab/demos/PerlinTerrainDemo"),
);
const DvdBouncerDemo = lazy(
  () => import("@/components/lab/demos/DvdBouncerDemo"),
);
const StarfieldWarpDemo = lazy(
  () => import("@/components/lab/demos/StarfieldWarpDemo"),
);
const VortexSpiralDemo = lazy(
  () => import("@/components/lab/demos/VortexSpiralDemo"),
);
const RopePhysicsDemo = lazy(
  () => import("@/components/lab/demos/RopePhysicsDemo"),
);
const PlasmaClassicDemo = lazy(
  () => import("@/components/lab/demos/PlasmaClassicDemo"),
);
const SandPilesDemo = lazy(
  () => import("@/components/lab/demos/SandPilesDemo"),
);
const RotationBlurDemo = lazy(
  () => import("@/components/lab/demos/RotationBlurDemo"),
);
const ConstellationNetDemo = lazy(
  () => import("@/components/lab/demos/ConstellationNetDemo"),
);
const MorphingBlobDemo = lazy(
  () => import("@/components/lab/demos/MorphingBlobDemo"),
);
const ChromaticAberrationDemo = lazy(
  () => import("@/components/lab/demos/ChromaticAberrationDemo"),
);
const PaperFoldingDemo = lazy(
  () => import("@/components/lab/demos/PaperFoldingDemo"),
);

const demoComponents: Record<string, LazyDemoComponent> = {
  "fluid-dynamics": FluidDynamicsDemo,
  "volumetric-lighting": VolumetricLightingDemo,
  "particle-systems": ParticleSystemsDemo,
  "magnetic-cursor": MagneticCursorDemo,
  "fft-material": FftMaterialDemo,
  "shader-storm": ShaderStormDemo,
  "latency-canvas": LatencyCanvasDemo,
  "reaction-diffusion": ReactionDiffusionDemo,
  "voronoi-cells": VoronoiCellsDemo,
  "flow-field": FlowFieldDemo,
  "lissajous-orbits": LissajousOrbitsDemo,
  "boids-flock": BoidsFlockDemo,
  "wave-interference": WaveInterferenceDemo,
  kaleidoscope: KaleidoscopeDemo,
  metaballs: MetaballsDemo,
  "variable-font-scroll": VariableFontScrollDemo,
  "signed-distance-letters": SignedDistanceLettersDemo,
  "truchet-tiles": TruchetTilesDemo,
  "perlin-terrain": PerlinTerrainDemo,
  "dvd-bouncer": DvdBouncerDemo,
  "starfield-warp": StarfieldWarpDemo,
  "vortex-spiral": VortexSpiralDemo,
  "rope-physics": RopePhysicsDemo,
  "plasma-classic": PlasmaClassicDemo,
  "sand-piles": SandPilesDemo,
  "rotation-blur": RotationBlurDemo,
  "constellation-net": ConstellationNetDemo,
  "morphing-blob": MorphingBlobDemo,
  "chromatic-aberration": ChromaticAberrationDemo,
  "paper-folding": PaperFoldingDemo,
};

function LabDemoFallback({ compact }: { compact: boolean }) {
  return (
    <div
      aria-hidden
      data-lab-demo-fallback
      className="absolute inset-0 overflow-hidden bg-ink-950"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(227,191,180,0.16),transparent_38%),radial-gradient(circle_at_78%_70%,rgba(205,250,0,0.12),transparent_34%)]" />
      <div
        className={`absolute inset-0 grid-lines ${
          compact ? "opacity-20" : "opacity-25"
        }`}
      />
    </div>
  );
}

export function LabDemo({ slug, seed, compact = false }: LabDemoProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(!compact);
  const Demo = demoComponents[slug];

  useEffect(() => {
    if (armed || !compact) return;
    const shell = shellRef.current;
    if (!shell || !("IntersectionObserver" in window)) {
      setArmed(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setArmed(true);
        io.disconnect();
      },
      { rootMargin: "320px", threshold: 0.01 },
    );
    io.observe(shell);
    return () => io.disconnect();
  }, [armed, compact]);

  return (
    <div
      ref={shellRef}
      data-lab-demo-shell={slug}
      data-lab-demo-armed={armed ? "true" : "false"}
      className="absolute inset-0"
    >
      {!Demo ? (
        <NoiseField seed={seed} />
      ) : !armed ? (
        <LabDemoFallback compact={compact} />
      ) : (
        <Suspense fallback={<LabDemoFallback compact={compact} />}>
          <Demo seed={seed} compact={compact} />
        </Suspense>
      )}
    </div>
  );
}
