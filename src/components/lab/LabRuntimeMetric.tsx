"use client";

import { useEffect, useState } from "react";
import {
  deviceProfile,
  onDeviceProfileChange,
  type DeviceTier,
} from "@/lib/deviceTier";
import {
  formatRuntimeCount,
  particleSystemCountForTier,
} from "@/lib/labRuntime";

function resolveParticleCount(compact: boolean): number {
  const tier: DeviceTier = deviceProfile().tier;
  return particleSystemCountForTier(tier, compact);
}

export function LabRuntimeMetric({ compact = false }: { compact?: boolean }) {
  const [count, setCount] = useState(() =>
    particleSystemCountForTier("high", compact),
  );

  useEffect(() => {
    const update = () => {
      setCount(resolveParticleCount(compact));
    };

    update();
    return onDeviceProfileChange(update);
  }, [compact]);

  return (
    <span title="Runtime count for this device tier">
      {formatRuntimeCount(count)}
    </span>
  );
}
