import type { DeviceTier } from "@/lib/deviceTier";

type Density = "full" | "compact";

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

export function formatRuntimeCount(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}
