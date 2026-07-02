"use client";

import { CanvasDemo, type LabDemoModuleProps, type InitFn, type TickFn } from "@/components/lab/runtime/CanvasDemo";

// ── 27 — Constellation Net ──────────────────────────────────────────────────
const netInit: InitFn = ({ w, h, store, compact }) => {
  const N = compact ? 36 : 80;
  const arr = new Float32Array(N * 4); // x, y, vx, vy
  for (let i = 0; i < N; i++) {
    arr[i * 4] = Math.random() * w;
    arr[i * 4 + 1] = Math.random() * h;
    arr[i * 4 + 2] = (Math.random() - 0.5) * 0.4;
    arr[i * 4 + 3] = (Math.random() - 0.5) * 0.4;
  }
  store.nodes = arr;
  store.N = N;
};
const netTick: TickFn = ({ ctx, w, h, m, store, dpr }) => {
  const arr = store.nodes as Float32Array;
  const N = store.N as number;
  ctx.fillStyle = "rgba(8,8,10,0.40)";
  ctx.fillRect(0, 0, w, h);
  const linkR = Math.min(w, h) * 0.18;
  const linkR2 = linkR * linkR;
  // move
  for (let i = 0; i < N; i++) {
    const ix = i * 4;
    arr[ix] += arr[ix + 2];
    arr[ix + 1] += arr[ix + 3];
    if (arr[ix] < 0 || arr[ix] > w) arr[ix + 2] *= -1;
    if (arr[ix + 1] < 0 || arr[ix + 1] > h) arr[ix + 3] *= -1;
  }
  // links
  for (let i = 0; i < N; i++) {
    const ix = i * 4;
    for (let j = i + 1; j < N; j++) {
      const jx = j * 4;
      const dx = arr[ix] - arr[jx];
      const dy = arr[ix + 1] - arr[jx + 1];
      const d2 = dx * dx + dy * dy;
      if (d2 > linkR2) continue;
      const a = 1 - d2 / linkR2;
      ctx.strokeStyle = `rgba(227,191,180,${a * 0.6})`;
      ctx.lineWidth = Math.max(0.6, dpr * 0.6);
      ctx.beginPath();
      ctx.moveTo(arr[ix], arr[ix + 1]);
      ctx.lineTo(arr[jx], arr[jx + 1]);
      ctx.stroke();
    }
  }
  // cursor node
  if (m.inside) {
    for (let i = 0; i < N; i++) {
      const ix = i * 4;
      const dx = arr[ix] - m.x;
      const dy = arr[ix + 1] - m.y;
      const d2 = dx * dx + dy * dy;
      if (d2 > linkR2 * 2) continue;
      const a = 1 - d2 / (linkR2 * 2);
      ctx.strokeStyle = `rgba(255,225,210,${a})`;
      ctx.lineWidth = Math.max(1, dpr);
      ctx.beginPath();
      ctx.moveTo(arr[ix], arr[ix + 1]);
      ctx.lineTo(m.x, m.y);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(255,225,210,1)";
    ctx.beginPath();
    ctx.arc(m.x, m.y, 6 * dpr, 0, Math.PI * 2);
    ctx.fill();
  }
  // node dots
  ctx.fillStyle = "rgba(227,191,180,0.85)";
  for (let i = 0; i < N; i++) {
    const ix = i * 4;
    ctx.fillRect(arr[ix] - dpr, arr[ix + 1] - dpr, 2 * dpr, 2 * dpr);
  }
};

export default function ConstellationNetDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo init={netInit} tick={netTick} compact={compact} fpsCap={compact ? 24 : 50} />;
}
