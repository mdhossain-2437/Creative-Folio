"use client";

import { CanvasDemo, type LabDemoModuleProps, type InitFn, type TickFn } from "@/components/lab/runtime/CanvasDemo";

// ── 19 — Perlin Terrain (line-by-line scrolling heightfield) ────────────────
const terrainInit: InitFn = ({ store }) => {
  store.offset = 0;
  store.dir = 1;
};
const terrainTick: TickFn = ({ ctx, w, h, t, m, store, dpr, compact }) => {
  ctx.fillStyle = "rgba(12,12,12,0.32)";
  ctx.fillRect(0, 0, w, h);
  const step = compact ? 14 : 8;
  const cols = Math.ceil(w / step);
  if (m.pressed) store.dir = -(store.dir as number);
  store.offset = (store.offset as number) + (store.dir as number) * 0.5;
  const off = store.offset as number;
  const hover = m.inside ? Math.max(0, 1 - Math.abs(m.x - w / 2) / (w / 2)) : 0;
  const layers = 18;
  for (let l = 0; l < layers; l++) {
    const yBase = h * 0.35 + (l / layers) * (h * 0.55);
    ctx.beginPath();
    for (let c = 0; c <= cols; c++) {
      const x = c * step;
      const noise =
        Math.sin((c + off + l * 12) * 0.07) * 18 +
        Math.sin((c + off * 0.6 + l * 4) * 0.21) * 10 +
        Math.cos((c + off * 0.3) * 0.05 + l) * 8;
      const lift = hover * 36 * Math.exp(-Math.pow((x - m.x) / (w * 0.18), 2));
      const y = yBase + noise - lift - (1 - l / layers) * 22;
      if (c === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    const alpha = 0.06 + l * 0.025;
    ctx.fillStyle = `rgba(227,191,180,${alpha})`;
    ctx.fill();
    ctx.strokeStyle = `rgba(255,225,210,${0.18 + l * 0.012})`;
    ctx.lineWidth = Math.max(1, 0.8 * dpr);
    ctx.stroke();
  }
  // horizon glow
  const sun = ctx.createRadialGradient(
    w / 2,
    h * 0.32,
    0,
    w / 2,
    h * 0.32,
    w * 0.4,
  );
  sun.addColorStop(0, "rgba(255,210,170,0.18)");
  sun.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = sun;
  ctx.fillRect(0, 0, w, h);
  void t;
};

export default function PerlinTerrainDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo init={terrainInit} tick={terrainTick} compact={compact} fpsCap={compact ? 24 : 48} />;
}
