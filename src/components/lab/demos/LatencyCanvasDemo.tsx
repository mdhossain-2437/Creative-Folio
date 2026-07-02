"use client";

import { CanvasDemo, type LabDemoModuleProps, type InitFn, type TickFn } from "@/components/lab/runtime/CanvasDemo";

// ── 09 — Latency Canvas: frame-pacing dot heatmap ───────────────────────────
const latencyInit: InitFn = ({ store }) => {
  store.samples = [] as { dt: number }[];
  store.lastFrame = performance.now();
};
const latencyTick: TickFn = ({ ctx, w, h, store, m, dpr }) => {
  const now = performance.now();
  const dtMs = now - (store.lastFrame as number);
  store.lastFrame = now;
  const samples = store.samples as { dt: number }[];
  // Skip the first frame after IntersectionObserver paused us — the gap is
  // the entire offscreen duration, not actual jank, and would pollute the buffer.
  if (dtMs < 200) samples.push({ dt: dtMs });
  const max = Math.floor(w / (10 * dpr));
  while (samples.length > max) samples.shift();

  ctx.fillStyle = "#070708";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "rgba(239,236,233,0.07)";
  for (let i = 1; i < 5; i++) {
    const y = h - ((i * 16.6) / 60) * h * 0.9;
    ctx.fillRect(0, y, w, 1);
  }

  const target = 16.6;
  const baseY = h - 28 * dpr;
  for (let i = 0; i < samples.length; i++) {
    const s = samples[i];
    const norm = Math.min(2, s.dt / target);
    const y = baseY - Math.min(h - 40 * dpr, norm * 60 * dpr);
    const danger = Math.min(1, Math.max(0, (s.dt - 16.6) / 22));
    const r = 80 + danger * 175;
    const g = 230 - danger * 180;
    const b = 60;
    const radius = 1.6 * dpr + danger * 2;
    ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${0.55 + danger * 0.4})`;
    ctx.beginPath();
    ctx.arc(8 * dpr + i * 10 * dpr, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  // budget label crosshair near cursor
  if (m.inside) {
    ctx.strokeStyle = "rgba(239,236,233,0.18)";
    ctx.beginPath();
    ctx.moveTo(m.x, 0);
    ctx.lineTo(m.x, h);
    ctx.stroke();
  }
};

export default function LatencyCanvasDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo init={latencyInit} tick={latencyTick} compact={compact} />;
}
