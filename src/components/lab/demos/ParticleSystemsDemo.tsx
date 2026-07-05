"use client";

import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { CanvasDemo, type LabDemoModuleProps, type InitFn, type TickFn } from "@/components/lab/runtime/CanvasDemo";
import { deviceProfile, onDeviceProfileChange } from "@/lib/deviceTier";
import {
  particleSystemRuntimeProfile,
  setParticleSystemRenderer,
} from "@/lib/labRuntime";
import { shouldAttemptWebGPU } from "@/lib/webgpuHelper";

const ParticleSystemsWebGpuDemo = lazy(() =>
  import("@/components/lab/demos/ParticleSystemsWebGpuDemo").then((mod) => ({
    default: mod.ParticleSystemsWebGpuDemo,
  })),
);

// ── 03 — Particle Systems: attractor field + click bursts ───────────────────
const partSysInit: InitFn = ({ w, h, store, compact }) => {
  const N = particleSystemRuntimeProfile(deviceProfile().tier, compact).count;
  const parts = new Float32Array(N * 4);
  for (let i = 0; i < N; i++) {
    parts[i * 4] = Math.random() * w;
    parts[i * 4 + 1] = Math.random() * h;
  }
  store.parts = parts;
  store.N = N;
  store.bursts = [];
};
const partSysTick: TickFn = ({ ctx, w, h, t, m, store, dpr }) => {
  const parts = store.parts as Float32Array;
  const N = store.N as number;
  const bursts = store.bursts as {
    x: number;
    y: number;
    r: number;
    life: number;
  }[];
  if (
    m.pressed &&
    (store.lastBurst === undefined || t - (store.lastBurst as number) > 0.18)
  ) {
    bursts.push({ x: m.x, y: m.y, r: 30 * dpr, life: 1 });
    store.lastBurst = t;
  }
  for (let i = bursts.length - 1; i >= 0; i--) {
    const b = bursts[i];
    b.r += 8 * dpr;
    b.life -= 0.02;
    if (b.life <= 0) bursts.splice(i, 1);
  }
  ctx.fillStyle = "rgba(7,8,10,0.18)";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "rgba(205,250,0,0.7)";
  for (let i = 0; i < N; i++) {
    const ix = i * 4;
    let x = parts[ix];
    let y = parts[ix + 1];
    let vx = parts[ix + 2];
    let vy = parts[ix + 3];
    vx += Math.sin((y * 0.003 + t) * 1.4) * 0.04;
    vy += Math.cos((x * 0.003 - t) * 1.4) * 0.04;
    const dx = m.x - x;
    const dy = m.y - y;
    const d2 = dx * dx + dy * dy;
    const range = 260 * dpr;
    if (m.inside && d2 < range * range) {
      const f = (1 - Math.sqrt(d2) / range) * 0.18;
      vx += (dx / 60) * f;
      vy += (dy / 60) * f;
    }
    for (const b of bursts) {
      const bdx = x - b.x;
      const bdy = y - b.y;
      const bd = Math.sqrt(bdx * bdx + bdy * bdy);
      if (Math.abs(bd - b.r) < 18 * dpr) {
        const force = b.life * 0.9;
        vx += (bdx / (bd + 1)) * force;
        vy += (bdy / (bd + 1)) * force;
      }
    }
    vx *= 0.95;
    vy *= 0.95;
    x += vx;
    y += vy;
    if (x < 0) x += w;
    else if (x > w) x -= w;
    if (y < 0) y += h;
    else if (y > h) y -= h;
    parts[ix] = x;
    parts[ix + 1] = y;
    parts[ix + 2] = vx;
    parts[ix + 3] = vy;
    ctx.fillRect(x, y, 1.2 * dpr, 1.2 * dpr);
  }
  // ring overlays
  ctx.strokeStyle = "rgba(205,250,0,0.45)";
  for (const b of bursts) {
    ctx.globalAlpha = b.life * 0.5;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
};

export default function ParticleSystemsDemo({ compact }: LabDemoModuleProps) {
  const [mode, setMode] = useState<"webgpu" | "canvas">("canvas");
  const webGpuFailedRef = useRef(false);

  useEffect(() => {
    let modeTimer = 0;
    const scheduleMode = (nextMode: "webgpu" | "canvas") => {
      window.clearTimeout(modeTimer);
      modeTimer = window.setTimeout(() => setMode(nextMode), 0);
    };

    if (compact) {
      scheduleMode("canvas");
      return () => window.clearTimeout(modeTimer);
    }

    const update = () => {
      if (!webGpuFailedRef.current && shouldAttemptWebGPU()) {
        scheduleMode("webgpu");
      } else {
        scheduleMode("canvas");
        setParticleSystemRenderer("Canvas2D");
      }
    };

    update();
    const offProfile = onDeviceProfileChange(update);
    return () => {
      window.clearTimeout(modeTimer);
      offProfile();
    };
  }, [compact]);

  const fallbackToCanvas = useCallback(() => {
    webGpuFailedRef.current = true;
    setParticleSystemRenderer("Canvas2D");
    setMode("canvas");
  }, []);

  const markWebGpuReady = useCallback(() => {
    setParticleSystemRenderer("WebGPU");
  }, []);

  if (!compact && mode === "webgpu") {
    return (
      <Suspense
        fallback={
          <CanvasDemo
            init={partSysInit}
            tick={partSysTick}
            compact={compact}
            fpsCap={60}
          />
        }
      >
        <ParticleSystemsWebGpuDemo
          compact={compact}
          onFallback={fallbackToCanvas}
          onReady={markWebGpuReady}
        />
      </Suspense>
    );
  }

  return (
    <CanvasDemo
      init={partSysInit}
      tick={partSysTick}
      compact={compact}
      fpsCap={compact ? 30 : 60}
    />
  );
}
