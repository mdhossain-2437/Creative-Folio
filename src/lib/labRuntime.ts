import type { DeviceTier } from "@/lib/deviceTier";

type Density = "full" | "compact";
export type ParticleSystemRenderer = "Canvas2D";

export type ParticleSystemRuntimeProfile = {
  count: number;
  density: Density;
  renderer: ParticleSystemRenderer;
  tier: DeviceTier;
};

export const PARTICLE_SYSTEM_RENDERER: ParticleSystemRenderer = "Canvas2D";

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
): ParticleSystemRuntimeProfile {
  const density = compact ? "compact" : "full";

  return {
    count: PARTICLE_SYSTEM_COUNTS[density][tier],
    density,
    renderer: PARTICLE_SYSTEM_RENDERER,
    tier,
  };
}

export function formatRuntimeCount(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}
