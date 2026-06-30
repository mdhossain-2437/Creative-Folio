"use client";

import { deviceProfile, type DeviceTier } from "@/lib/deviceTier";

type NavigatorConnection = {
  saveData?: boolean;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
};

export type RuntimeGraphicsMode = "static" | "base" | "enhanced";

function connection(): NavigatorConnection | undefined {
  if (typeof navigator === "undefined") return undefined;
  return (
    navigator as Navigator & {
      connection?: NavigatorConnection;
      mozConnection?: NavigatorConnection;
      webkitConnection?: NavigatorConnection;
    }
  ).connection;
}

export function isConstrainedConnection(options?: {
  include3g?: boolean;
}): boolean {
  const conn = connection();
  if (!conn) return false;
  if (conn.saveData) return true;

  const effectiveType = conn.effectiveType;
  if (effectiveType === "slow-2g" || effectiveType === "2g") return true;
  if (options?.include3g && effectiveType === "3g") return true;
  if (typeof conn.downlink === "number" && conn.downlink > 0) {
    return conn.downlink < (options?.include3g ? 1.7 : 0.9);
  }
  return false;
}

export function scheduleIdleWork(
  callback: () => void,
  timeout = 1200,
): () => void {
  if (typeof window === "undefined") return () => {};

  const idleWindow = window as Window & {
    requestIdleCallback?: (
      cb: IdleRequestCallback,
      options?: IdleRequestOptions,
    ) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

  if (typeof idleWindow.requestIdleCallback === "function") {
    const id = idleWindow.requestIdleCallback(callback, { timeout });
    return () => idleWindow.cancelIdleCallback?.(id);
  }

  const id = globalThis.setTimeout(callback, Math.min(timeout, 600));
  return () => globalThis.clearTimeout(id);
}

export function resolveRuntimeGraphicsMode(): RuntimeGraphicsMode {
  if (typeof window === "undefined") return "static";

  const profile = deviceProfile();
  if (profile.reducedMotion || isConstrainedConnection()) return "static";

  if (
    profile.tier === "low" ||
    profile.isTouch ||
    isConstrainedConnection({ include3g: true })
  ) {
    return "base";
  }

  if (profile.tier === "mid") return "base";
  return "enhanced";
}

export function shouldPrefetchDeepRoutes(tier: DeviceTier): boolean {
  return tier === "high" && !isConstrainedConnection({ include3g: true });
}

export function optimizedImageTextureSrc(src: string, width = 640): string {
  if (!src.startsWith("https://images.unsplash.com/")) return src;
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=60`;
}
