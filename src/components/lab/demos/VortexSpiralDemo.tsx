"use client";

import { CanvasDemo, type LabDemoModuleProps, type InitFn, type TickFn } from "@/components/lab/runtime/CanvasDemo";

// ── 22 — Vortex Spiral ──────────────────────────────────────────────────────
const vortexInit: InitFn = ({ store, compact }) => {
  const N = compact ? 280 : 720;
  const arr = new Float32Array(N * 3); // a, r, life
  for (let i = 0; i < N; i++) {
    arr[i * 3] = Math.random() * Math.PI * 2;
    arr[i * 3 + 1] = Math.random();
    arr[i * 3 + 2] = Math.random();
  }
  store.parts = arr;
  store.N = N;
};
const vortexTick: TickFn = ({ ctx, w, h, t, m, store, dpr }) => {
  const arr = store.parts as Float32Array;
  const N = store.N as number;
  ctx.fillStyle = "rgba(10,10,12,0.30)";
  ctx.fillRect(0, 0, w, h);
  const cx = m.inside ? m.x : w / 2;
  const cy = m.inside ? m.y : h / 2;
  const inward = m.pressed ? -0.4 : 0.18;
  const maxR = Math.min(w, h) * 0.48;
  ctx.fillStyle = "rgba(227,191,180,0.85)";
  for (let i = 0; i < N; i++) {
    const ix = i * 3;
    let a = arr[ix];
    let r = arr[ix + 1];
    a += 0.012 + (1 - r) * 0.04;
    r += inward * 0.004;
    if (r > 1) r = 0;
    if (r < 0) r = 1;
    arr[ix] = a;
    arr[ix + 1] = r;
    const rr = r * maxR * (1 + Math.sin(t + i * 0.7) * 0.02);
    const x = cx + Math.cos(a) * rr;
    const y = cy + Math.sin(a) * rr;
    const s = (1.2 + (1 - r) * 2.4) * dpr;
    ctx.fillRect(x - s / 2, y - s / 2, s, s);
  }
};

export default function VortexSpiralDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo init={vortexInit} tick={vortexTick} compact={compact} fpsCap={compact ? 30 : 60} />;
}
