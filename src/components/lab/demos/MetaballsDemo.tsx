"use client";

import { CanvasDemo, type LabDemoModuleProps, type InitFn, type TickFn } from "@/components/lab/runtime/CanvasDemo";

// ── 17 — Metaballs Field ───────────────────────────────────────────────────
type Metaball = { x: number; y: number; vx: number; vy: number; r: number };
const metaInit: InitFn = ({ store, w, h, compact }) => {
  const N = compact ? 5 : 8;
  const arr: Metaball[] = [];
  for (let i = 0; i < N; i++) {
    arr.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 80,
      vy: (Math.random() - 0.5) * 80,
      r: (compact ? 60 : 90) + Math.random() * (compact ? 60 : 100),
    });
  }
  store.balls = arr;
};
const metaTick: TickFn = ({ ctx, w, h, dt, m, store }) => {
  const balls = store.balls as Metaball[];
  for (const b of balls) {
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    if (b.x < b.r) {
      b.x = b.r;
      b.vx = Math.abs(b.vx);
    } else if (b.x > w - b.r) {
      b.x = w - b.r;
      b.vx = -Math.abs(b.vx);
    }
    if (b.y < b.r) {
      b.y = b.r;
      b.vy = Math.abs(b.vy);
    } else if (b.y > h - b.r) {
      b.y = h - b.r;
      b.vy = -Math.abs(b.vy);
    }
  }
  ctx.fillStyle = "#070708";
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = "lighter";
  for (const b of balls) {
    const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
    grad.addColorStop(0, "rgba(247,196,159,0.85)");
    grad.addColorStop(0.45, "rgba(192,222,255,0.32)");
    grad.addColorStop(1, "rgba(247,196,159,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
  }
  if (m.inside) {
    const cr = 160;
    const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, cr);
    grad.addColorStop(0, "rgba(255,255,255,0.55)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(m.x, m.y, cr, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalCompositeOperation = "source-over";
};

export default function MetaballsDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo init={metaInit} tick={metaTick} compact={compact} fpsCap={compact ? 30 : 60} />;
}
