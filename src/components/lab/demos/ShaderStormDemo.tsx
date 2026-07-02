"use client";

import { useMemo } from "react";
import { CanvasDemo, type LabDemoModuleProps, type InitFn, type TickFn, type Mouse } from "@/components/lab/runtime/CanvasDemo";

// ── 07 — Shader Storm: stripes, RGB sweep, scanlines ────────────────────────
// `seed` is read from the store so the tick function itself stays stable across
// renders (a fresh `tick` reference would tear down the canvas runtime).
const shaderStormInitFactory =
  (seed: number): InitFn =>
  ({ store }) => {
    store.seed = seed;
  };
const shaderStormTick: TickFn = ({ ctx, w, h, t, dpr, m, store }) => {
  const seed = (store.seed as number) ?? 0;
  return shaderStormBody(ctx, w, h, t, dpr, m, seed);
};
function shaderStormBody(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  dpr: number,
  m: Mouse,
  seed: number,
) {
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, w, h);
  const stripeH = 6 * dpr;
  const cursorGain = m.inside ? 1 + (m.x / w) * 1.2 : 1;
  for (let y = 0; y < h; y += stripeH) {
    const k = (y / h) * 6 + t + seed;
    const r = 120 + Math.sin(k) * 100 * cursorGain;
    const g = 200 + Math.cos(k * 1.3) * 50;
    const b = 80 + Math.sin(k * 0.7) * 60;
    const off = Math.sin(t * 2 + y * 0.01) * 14 * dpr * cursorGain;
    ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, 0.22)`;
    ctx.fillRect(off, y, w, stripeH * 0.55);
    ctx.fillStyle = `rgba(255, 255, 255, 0.04)`;
    ctx.fillRect(0, y + stripeH * 0.55, w, stripeH * 0.45);
  }
  const sweep = (((t * 0.4) % 2) - 1) * h;
  const grad = ctx.createLinearGradient(0, sweep - 80, 0, sweep + 80);
  grad.addColorStop(0, "rgba(205,250,0,0)");
  grad.addColorStop(0.5, "rgba(205,250,0,0.18)");
  grad.addColorStop(1, "rgba(205,250,0,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
}

// Memoize the shader-storm init so the seed prop doesn't tear down the
// canvas runtime on every parent render.
export default function ShaderStormDemo({
  seed,
  compact,
}: LabDemoModuleProps) {
  const init = useMemo(() => shaderStormInitFactory(seed), [seed]);
  return (
    <CanvasDemo
      init={init}
      tick={shaderStormTick}
      compact={compact}
      fpsCap={compact ? 30 : 60}
    />
  );
}
