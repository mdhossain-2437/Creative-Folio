"use client";

import { CanvasDemo, type LabDemoModuleProps, type InitFn, type TickFn } from "@/components/lab/runtime/CanvasDemo";
import { damp, K } from "@/lib/damp";

// ── 13 — Lissajous Orbits ───────────────────────────────────────────────────
const lissaInit: InitFn = ({ store }) => {
  const aHist = new Float32Array(2);
  aHist[0] = 3;
  aHist[1] = 2;
  store.aHist = aHist;
};
const lissaTick: TickFn = ({ ctx, w, h, t, dt, m, dpr, compact, store }) => {
  ctx.fillStyle = "rgba(7,7,8,0.18)";
  ctx.fillRect(0, 0, w, h);
  const cx = w / 2;
  const cy = h / 2;
  const rx = w * 0.35;
  const ry = h * 0.32;
  const aHist = store.aHist as Float32Array;
  const targetA = m.inside ? 2 + (m.x / w) * 5 : 3;
  const targetB = m.inside ? 2 + (m.y / h) * 5 : 2;
  // Frame-rate-independent decay so the curve morphs at identical speed
  // on 60 / 120 / 144 / 240Hz panels.
  aHist[0] = damp(aHist[0], targetA, K.K_SLOW, dt);
  aHist[1] = damp(aHist[1], targetB, K.K_SLOW, dt);
  const a = aHist[0];
  const b = aHist[1];
  const layers = compact ? 2 : 4;
  for (let l = 0; l < layers; l++) {
    const phase = t * 0.4 + l * 0.6;
    ctx.beginPath();
    const N = compact ? 220 : 600;
    for (let i = 0; i <= N; i++) {
      const u = (i / N) * Math.PI * 2;
      const x = cx + rx * Math.sin(a * u + phase);
      const y = cy + ry * Math.sin(b * u);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle =
      l === 0 ? "rgba(205,250,0,0.65)" : `rgba(227,191,180,${0.5 - l * 0.1})`;
    ctx.lineWidth = (l === 0 ? 1.4 : 0.9) * dpr;
    ctx.stroke();
  }
  // ratio readout dot
  ctx.fillStyle = "rgba(239,236,233,0.85)";
  ctx.fillRect(cx - 1, cy - 1, 2 * dpr, 2 * dpr);
};

export default function LissajousOrbitsDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo init={lissaInit} tick={lissaTick} compact={compact} fpsCap={compact ? 30 : 60} />;
}
