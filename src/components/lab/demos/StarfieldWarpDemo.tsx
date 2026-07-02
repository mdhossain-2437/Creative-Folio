"use client";

import { CanvasDemo, type LabDemoModuleProps, type InitFn, type TickFn } from "@/components/lab/runtime/CanvasDemo";

// ── 21 — Starfield Warp ─────────────────────────────────────────────────────
const starInit: InitFn = ({ store, compact }) => {
  const N = compact ? 220 : 520;
  const arr = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    arr[i * 3] = Math.random() * 2 - 1;
    arr[i * 3 + 1] = Math.random() * 2 - 1;
    arr[i * 3 + 2] = Math.random();
  }
  store.stars = arr;
  store.N = N;
  store.warp = 1;
};
const starTick: TickFn = ({ ctx, w, h, dt, m, store, dpr }) => {
  const arr = store.stars as Float32Array;
  const N = store.N as number;
  ctx.fillStyle = "rgba(8,8,10,0.32)";
  ctx.fillRect(0, 0, w, h);
  const cx = m.inside ? m.x : w * 0.5;
  const cy = m.inside ? m.y : h * 0.5;
  const targetWarp = m.pressed ? 3.6 : 1.3;
  store.warp =
    (store.warp as number) + (targetWarp - (store.warp as number)) * dt * 3;
  const warp = store.warp as number;
  ctx.lineCap = "round";
  for (let i = 0; i < N; i++) {
    const ix = i * 3;
    let z = arr[ix + 2];
    z -= dt * 0.5 * warp;
    if (z <= 0.02) {
      arr[ix] = Math.random() * 2 - 1;
      arr[ix + 1] = Math.random() * 2 - 1;
      z = 1;
    }
    arr[ix + 2] = z;
    const px = arr[ix] / z;
    const py = arr[ix + 1] / z;
    const x = cx + px * w * 0.5;
    const y = cy + py * h * 0.5;
    const tail = warp * 12;
    const pz = Math.min(1, z + 0.03);
    const x2 = cx + (arr[ix] / pz) * w * 0.5;
    const y2 = cy + (arr[ix + 1] / pz) * h * 0.5;
    const a = (1 - z) * 0.9;
    ctx.strokeStyle = `rgba(255,236,222,${a})`;
    ctx.lineWidth = (1 + (1 - z) * 2.5) * dpr;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - (x - x2) * tail * 0.06, y - (y - y2) * tail * 0.06);
    ctx.stroke();
  }
};

export default function StarfieldWarpDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo init={starInit} tick={starTick} compact={compact} fpsCap={compact ? 30 : 60} />;
}
