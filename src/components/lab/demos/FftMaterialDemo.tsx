"use client";

import { CanvasDemo, type LabDemoModuleProps, type InitFn, type TickFn } from "@/components/lab/runtime/CanvasDemo";
import { damp, K } from "@/lib/damp";

// ── 06 — FFT Material: pseudo-audio bars (spectrum visualizer) ──────────────
const fftInit: InitFn = ({ store }) => {
  store.bars = new Float32Array(64);
  store.targets = new Float32Array(64);
};
const fftTick: TickFn = ({ ctx, w, h, t, dt, m, store, dpr }) => {
  const bars = store.bars as Float32Array;
  const targets = store.targets as Float32Array;
  ctx.fillStyle = "#070708";
  ctx.fillRect(0, 0, w, h);
  const N = bars.length;
  for (let i = 0; i < N; i++) {
    const ph = i * 0.42;
    const beat = Math.max(0, Math.sin(t * 2.4 + ph) * 0.5 + 0.5);
    const groove = Math.max(0, Math.sin(t * 0.6 + ph * 0.3) * 0.4);
    const cursor = m.inside
      ? Math.max(0, 1 - Math.abs(i / N - m.x / w) * 5) * 0.6
      : 0;
    targets[i] = Math.min(1, beat * 0.5 + groove + cursor);
    // Frame-rate-independent decay so spectrum bars rise at identical
    // speed on 60 / 120 / 144 / 240Hz panels.
    bars[i] = damp(bars[i], targets[i], K.K_FAST, dt);
  }
  const bw = w / N;
  for (let i = 0; i < N; i++) {
    const v = bars[i];
    const bh = v * h * 0.8;
    const x = i * bw;
    const grd = ctx.createLinearGradient(0, h - bh, 0, h);
    grd.addColorStop(0, "rgba(205,250,0,0.95)");
    grd.addColorStop(0.7, "rgba(227,191,180,0.7)");
    grd.addColorStop(1, "rgba(227,191,180,0.05)");
    ctx.fillStyle = grd;
    ctx.fillRect(x + 1 * dpr, h - bh, bw - 2 * dpr, bh);
    // mirror reflection
    ctx.fillStyle = `rgba(255,255,255,${v * 0.05})`;
    ctx.fillRect(x + 1 * dpr, h - bh, bw - 2 * dpr, 2 * dpr);
  }
  // floor line
  ctx.fillStyle = "rgba(239,236,233,0.16)";
  ctx.fillRect(0, h - 1, w, 1);
};

export default function FftMaterialDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo init={fftInit} tick={fftTick} compact={compact} fpsCap={compact ? 30 : 60} />;
}
