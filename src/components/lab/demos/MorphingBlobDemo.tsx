"use client";

import { CanvasDemo, type LabDemoModuleProps, type InitFn, type TickFn } from "@/components/lab/runtime/CanvasDemo";

// ── 28 — Morphing Blob (super-formula) ──────────────────────────────────────
const blobInit: InitFn = ({ store }) => {
  store.frozen = false;
};
const blobTick: TickFn = ({ ctx, w, h, t, m, store, dpr }) => {
  if (m.pressed) store.frozen = !store.frozen;
  ctx.fillStyle = "rgba(10,10,12,0.36)";
  ctx.fillRect(0, 0, w, h);
  const cx = w * 0.5;
  const cy = h * 0.5;
  const r = Math.min(w, h) * 0.32;
  const time = store.frozen ? 0 : t;
  const samples = 220;
  ctx.strokeStyle = "rgba(227,191,180,0.95)";
  ctx.lineWidth = 2 * dpr;
  ctx.beginPath();
  for (let i = 0; i <= samples; i++) {
    const a = (i / samples) * Math.PI * 2;
    // super-formula radius
    const m1 = 6 + Math.sin(time * 0.4) * 2;
    const rad =
      r *
      (1 +
        Math.sin(a * m1 + time * 1.2) * 0.12 +
        Math.cos(a * (m1 + 2) - time) * 0.08);
    let x = cx + Math.cos(a) * rad;
    let y = cy + Math.sin(a) * rad;
    if (m.inside) {
      const dx = m.x - x;
      const dy = m.y - y;
      const d = Math.hypot(dx, dy);
      if (d < r) {
        const f = (1 - d / r) * 30;
        x += dx * 0.02 + f * Math.cos(a);
        y += dy * 0.02 + f * Math.sin(a);
      }
    }
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
  // inner glow
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  glow.addColorStop(0, "rgba(255,225,210,0.18)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);
};

export default function MorphingBlobDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo init={blobInit} tick={blobTick} compact={compact} fpsCap={compact ? 30 : 60} />;
}
