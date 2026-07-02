"use client";

import { CanvasDemo, type LabDemoModuleProps, type InitFn, type TickFn } from "@/components/lab/runtime/CanvasDemo";

// ── 01 — Fluid Dynamics: vortex particles seeded by cursor velocity ─────────
const fluidInit: InitFn = ({ w, h, store, compact }) => {
  const N = compact ? 360 : 1400;
  const parts = new Float32Array(N * 4);
  for (let i = 0; i < N; i++) {
    parts[i * 4] = Math.random() * w;
    parts[i * 4 + 1] = Math.random() * h;
  }
  store.parts = parts;
  store.N = N;
};
const fluidTick: TickFn = ({ ctx, w, h, t, m, store, dpr }) => {
  const parts = store.parts as Float32Array;
  const N = store.N as number;
  ctx.fillStyle = "rgba(12,12,12,0.18)";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "rgba(227,191,180,0.78)";
  for (let i = 0; i < N; i++) {
    const ix = i * 4;
    let x = parts[ix];
    let y = parts[ix + 1];
    let vx = parts[ix + 2];
    let vy = parts[ix + 3];
    vx += Math.sin((y * 0.004 + t) * 1.2) * 0.05;
    vy += Math.cos((x * 0.004 - t) * 1.2) * 0.05;
    const dx = m.x - x;
    const dy = m.y - y;
    const d2 = dx * dx + dy * dy;
    const range = 220 * dpr;
    if (m.inside && d2 < range * range) {
      const f = (1 - Math.sqrt(d2) / range) * 0.18;
      vx += (-dy / 80) * f + m.vx * 0.04;
      vy += (dx / 80) * f + m.vy * 0.04;
    }
    vx *= 0.96;
    vy *= 0.96;
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
};

export default function FluidDynamicsDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo init={fluidInit} tick={fluidTick} compact={compact} fpsCap={compact ? 30 : 60} />;
}
