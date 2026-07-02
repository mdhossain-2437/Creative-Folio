"use client";

import { CanvasDemo, type LabDemoModuleProps, type InitFn, type TickFn } from "@/components/lab/runtime/CanvasDemo";

// ── 15 — Wave Interference ─────────────────────────────────────────────────
type WaveSource = { x: number; y: number; t0: number; hue: number };
const waveInit: InitFn = ({ store, w, h }) => {
  store.sources = [
    { x: w * 0.32, y: h * 0.42, t0: 0, hue: 30 },
    { x: w * 0.7, y: h * 0.6, t0: 0, hue: 60 },
  ] as WaveSource[];
};
const waveTick: TickFn = ({ ctx, w, h, t, m, store, dpr, compact }) => {
  ctx.fillStyle = "rgba(7,7,8,0.16)";
  ctx.fillRect(0, 0, w, h);
  const sources = store.sources as WaveSource[];
  // Click drops a permanent emitter (de-bounced via clickT).
  if (m.pressed && m.clickT > 0 && t - m.clickT < 0.06) {
    sources.push({
      x: m.x,
      y: m.y,
      t0: t,
      hue: 200 + ((sources.length * 24) % 160),
    });
    if (sources.length > 6) sources.shift();
    m.clickT = -1;
  }

  ctx.globalCompositeOperation = "lighter";
  const ringStep = (compact ? 32 : 22) * dpr;
  const k = 0.06 / dpr;
  const omega = 5;
  const drawSource = (
    sx: number,
    sy: number,
    t0: number,
    hue: number,
    gain: number,
  ) => {
    const age = Math.max(0, t - t0);
    const fade = Math.exp(-age * 0.04);
    if (fade < 0.04) return;
    const reach = Math.hypot(w, h) * 0.6;
    for (let r = ringStep; r < reach; r += ringStep) {
      const phase = Math.cos(r * k - age * omega);
      const intensity = Math.max(0, phase) * fade;
      if (intensity < 0.05) continue;
      ctx.strokeStyle = `hsla(${hue},65%,68%,${intensity * 0.34 * gain})`;
      ctx.lineWidth = 1.4 * dpr;
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  };
  for (const s of sources) drawSource(s.x, s.y, s.t0, s.hue, 1);
  if (m.inside) drawSource(m.x, m.y, t - 1.5, 198, 1.1);

  // bright source dots
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "rgba(239,236,233,0.92)";
  for (const s of sources) ctx.fillRect(s.x - 1, s.y - 1, 2 * dpr, 2 * dpr);
};

export default function WaveInterferenceDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo init={waveInit} tick={waveTick} compact={compact} fpsCap={compact ? 24 : 48} />;
}
