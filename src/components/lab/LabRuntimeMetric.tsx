"use client";

import { useEffect, useState } from "react";
import {
  deviceProfile,
  onDeviceProfileChange,
  type GpuTierProbe,
  type DeviceTier,
} from "@/lib/deviceTier";
import {
  formatRuntimeCount,
  particleSystemRuntimeProfile,
  type ParticleSystemRuntimeProfile,
} from "@/lib/labRuntime";

type RuntimeMetricProfile = ParticleSystemRuntimeProfile & {
  dprScale: number;
  gpu: GpuTierProbe;
};

function resolveParticleRuntime(
  compact: boolean,
): RuntimeMetricProfile {
  const profile = deviceProfile();
  const tier: DeviceTier = profile.tier;

  return {
    ...particleSystemRuntimeProfile(tier, compact),
    dprScale: profile.dprScale,
    gpu: profile.gpu,
  };
}

export function LabRuntimeMetric({ compact = false }: { compact?: boolean }) {
  const [profile, setProfile] = useState<RuntimeMetricProfile | null>(null);

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
        data-dpr-scale=""
        data-gpu-renderer=""
        data-gpu-renderer-signal="pending"
        data-gpu-renderer-adjustment=""
        data-gpu-timing-adjustment=""
        data-gpu-timing-status="pending"
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
      data-dpr-scale={profile.dprScale}
      data-gpu-renderer={profile.gpu.renderer}
      data-gpu-renderer-signal={profile.gpu.rendererSignal}
      data-gpu-renderer-adjustment={profile.gpu.rendererAdjustment}
      data-gpu-timing-adjustment={profile.gpu.timingAdjustment}
      data-gpu-timing-status={profile.gpu.timingStatus}
      title={`Runtime count for ${profile.tier} tier on ${profile.renderer}; GPU ${profile.gpu.rendererSignal}, timing ${profile.gpu.timingStatus}`}
    >
      <span>{formatRuntimeCount(profile.count)}</span>
      <span className="ml-2 text-warmwhite/60">
        {profile.tier} / {profile.renderer}
      </span>
    </span>
  );
}
