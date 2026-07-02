"use client";

import { CanvasDemo, type LabDemoModuleProps, type InitFn, type TickFn } from "@/components/lab/runtime/CanvasDemo";

// ── 16 — Kaleidoscope Mirror ───────────────────────────────────────────────
type KaleidoPoint = { x: number; y: number; t: number };
const kaleidoInit: InitFn = ({ store, ctx, w, h }) => {
  store.trail = [] as KaleidoPoint[];
  ctx.fillStyle = "#070708";
  ctx.fillRect(0, 0, w, h);
};
const kaleidoTick: TickFn = ({ ctx, w, h, t, m, store, dpr, compact }) => {
  // gentle ghosting so trails fade smoothly
  ctx.fillStyle = "rgba(7,7,8,0.07)";
  ctx.fillRect(0, 0, w, h);
  const tr = store.trail as KaleidoPoint[];
  // record cursor position (centred on canvas centre) only when moving
  if (m.inside && Math.abs(m.vx) + Math.abs(m.vy) > 0.4) {
    tr.push({ x: m.x - w / 2, y: m.y - h / 2, t });
    if (tr.length > (compact ? 60 : 120)) tr.shift();
  }
  if (tr.length < 2) return;

  const segments = 6;
  ctx.globalCompositeOperation = "lighter";
  ctx.lineCap = "round";
  for (let s = 0; s < segments; s++) {
    const ang = (s / segments) * Math.PI * 2;
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.rotate(ang);
    if (s % 2 === 0) ctx.scale(1, -1);
    for (let i = 1; i < tr.length; i++) {
      const a = tr[i - 1];
      const b = tr[i];
      const age = t - b.t;
      const alpha = Math.max(0, 1 - age / 3.5);
      if (alpha < 0.04) continue;
      const hue = (b.t * 28) % 360;
      ctx.strokeStyle = `hsla(${hue},70%,68%,${alpha * 0.55})`;
      ctx.lineWidth = (1.4 + alpha * 3) * dpr;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    ctx.restore();
  }
  ctx.globalCompositeOperation = "source-over";
};

export default function KaleidoscopeDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo init={kaleidoInit} tick={kaleidoTick} compact={compact} fpsCap={compact ? 30 : 60} />;
}
