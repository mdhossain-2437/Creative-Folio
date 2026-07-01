"use client";

import { useEffect, useState } from "react";
import {
  deviceProfile,
  onDeviceProfileChange,
  type DeviceTier,
} from "@/lib/deviceTier";
import {
  formatRuntimeCount,
  particleSystemRuntimeProfile,
  type ParticleSystemRuntimeProfile,
} from "@/lib/labRuntime";

function resolveParticleRuntime(
  compact: boolean,
): ParticleSystemRuntimeProfile {
  const tier: DeviceTier = deviceProfile().tier;
  return particleSystemRuntimeProfile(tier, compact);
}

export function LabRuntimeMetric({ compact = false }: { compact?: boolean }) {
  const [profile, setProfile] = useState<ParticleSystemRuntimeProfile | null>(
    null,
  );

  useEffect(() => {
    const update = () => {
      setProfile(resolveParticleRuntime(compact));
    };

    update();
    return onDeviceProfileChange(update);
  }, [compact]);

  if (!profile) {
    return (
      <span
        data-lab-runtime-metric
        data-particle-count=""
        data-device-tier="pending"
        data-renderer="pending"
        title="Runtime count resolves after the browser device-tier probe"
      >
        device-tiered
      </span>
    );
  }

  return (
    <span
      data-lab-runtime-metric
      data-particle-count={profile.count}
      data-device-tier={profile.tier}
      data-renderer={profile.renderer}
      title={`Runtime count for ${profile.tier} tier on ${profile.renderer}`}
    >
      <span>{formatRuntimeCount(profile.count)}</span>
      <span className="ml-2 text-warmwhite/45">
        {profile.tier} / {profile.renderer}
      </span>
    </span>
  );
}
