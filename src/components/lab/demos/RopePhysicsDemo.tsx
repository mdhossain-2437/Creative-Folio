"use client";

import { CanvasDemo, type LabDemoModuleProps, type InitFn, type TickFn } from "@/components/lab/runtime/CanvasDemo";

// ── 23 — Rope Physics (Verlet chain) ────────────────────────────────────────
const ropeInit: InitFn = ({ w, h, store, compact }) => {
  const N = compact ? 28 : 48;
  const seg = (h * 0.85) / N;
  const arr = new Float32Array(N * 4); // x, y, px, py
  for (let i = 0; i < N; i++) {
    arr[i * 4] = w * 0.5;
    arr[i * 4 + 1] = h * 0.08 + i * seg;
    arr[i * 4 + 2] = arr[i * 4];
    arr[i * 4 + 3] = arr[i * 4 + 1];
  }
  store.rope = arr;
  store.N = N;
  store.seg = seg;
};
const ropeTick: TickFn = ({ ctx, w, h, m, store, dpr }) => {
  const arr = store.rope as Float32Array;
  const N = store.N as number;
  const seg = store.seg as number;
  ctx.fillStyle = "rgba(10,10,12,0.40)";
  ctx.fillRect(0, 0, w, h);
  // verlet step
  const g = 0.6;
  const friction = 0.992;
  for (let i = 0; i < N; i++) {
    const ix = i * 4;
    const x = arr[ix];
    const y = arr[ix + 1];
    const vx = (x - arr[ix + 2]) * friction;
    const vy = (y - arr[ix + 3]) * friction;
    arr[ix + 2] = x;
    arr[ix + 3] = y;
    arr[ix] = x + vx;
    arr[ix + 1] = y + vy + g;
  }
  // pin top
  arr[0] = w * 0.5;
  arr[1] = h * 0.08;
  // pin tail to cursor when held
  if (m.inside && m.pressed) {
    const last = (N - 1) * 4;
    arr[last] = m.x;
    arr[last + 1] = m.y;
  }
  // constraint passes
  for (let pass = 0; pass < 4; pass++) {
    for (let i = 0; i < N - 1; i++) {
      const ax = i * 4;
      const bx = (i + 1) * 4;
      const dx = arr[bx] - arr[ax];
      const dy = arr[bx + 1] - arr[ax + 1];
      const d = Math.hypot(dx, dy) || 0.0001;
      const diff = (seg - d) / d;
      const ox = dx * 0.5 * diff;
      const oy = dy * 0.5 * diff;
      if (i !== 0) {
        arr[ax] -= ox;
        arr[ax + 1] -= oy;
      }
      arr[bx] += ox;
      arr[bx + 1] += oy;
    }
  }
  // draw
  ctx.strokeStyle = "rgba(227,191,180,0.85)";
  ctx.lineWidth = 3 * dpr;
  ctx.beginPath();
  ctx.moveTo(arr[0], arr[1]);
  for (let i = 1; i < N; i++) ctx.lineTo(arr[i * 4], arr[i * 4 + 1]);
  ctx.stroke();
  // weight at the tail
  const last = (N - 1) * 4;
  ctx.fillStyle = "rgba(255,225,210,0.95)";
  ctx.beginPath();
  ctx.arc(arr[last], arr[last + 1], 10 * dpr, 0, Math.PI * 2);
  ctx.fill();
};

export default function RopePhysicsDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo init={ropeInit} tick={ropeTick} compact={compact} fpsCap={compact ? 30 : 60} />;
}
