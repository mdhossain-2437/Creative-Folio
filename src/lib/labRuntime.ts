import type { DeviceTier } from "@/lib/deviceTier";

type Density = "full" | "compact";
export type ParticleSystemRenderer = "WebGPU" | "Canvas2D";

export type ParticleSystemRuntimeProfile = {
  count: number;
  density: Density;
  renderer: ParticleSystemRenderer;
  tier: DeviceTier;
};

export const PARTICLE_SYSTEM_RENDERER: ParticleSystemRenderer = "Canvas2D";
export const PARTICLE_SYSTEM_RENDERER_LABEL = "WebGPU / Canvas2D";
export const PARTICLE_SYSTEM_RENDERER_EVENT =
  "creative-folio:particle-renderer-change";

let activeParticleSystemRenderer: ParticleSystemRenderer =
  PARTICLE_SYSTEM_RENDERER;

const PARTICLE_SYSTEM_COUNTS = {
  full: {
    low: 1100,
    mid: 1600,
    high: 2200,
  },
  compact: {
    low: 240,
    mid: 320,
    high: 420,
  },
} satisfies Record<Density, Record<DeviceTier, number>>;

export function particleSystemCountForTier(
  tier: DeviceTier,
  compact = false,
): number {
  return PARTICLE_SYSTEM_COUNTS[compact ? "compact" : "full"][tier];
}

export function particleSystemRuntimeProfile(
  tier: DeviceTier,
  compact = false,
  renderer = activeParticleSystemRenderer,
): ParticleSystemRuntimeProfile {
  const density = compact ? "compact" : "full";

  return {
    count: PARTICLE_SYSTEM_COUNTS[density][tier],
    density,
    renderer,
    tier,
  };
}

export function formatRuntimeCount(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function setParticleSystemRenderer(
  renderer: ParticleSystemRenderer,
): void {
  if (activeParticleSystemRenderer === renderer) return;
  activeParticleSystemRenderer = renderer;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(PARTICLE_SYSTEM_RENDERER_EVENT));
  }
}

export function particleSystemRenderer(): ParticleSystemRenderer {
  return activeParticleSystemRenderer;
}

export function onParticleSystemRendererChange(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(PARTICLE_SYSTEM_RENDERER_EVENT, callback);
  return () => {
    window.removeEventListener(PARTICLE_SYSTEM_RENDERER_EVENT, callback);
  };
}
