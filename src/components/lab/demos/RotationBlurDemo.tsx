"use client";

import { CanvasDemo, type LabDemoModuleProps, type InitFn, type TickFn } from "@/components/lab/runtime/CanvasDemo";

// ── 26 — Rotation Blur (motion-blurred pinwheel) ────────────────────────────
const rotInit: InitFn = ({ store }) => {
  store.angle = 0;
  store.vel = 0.6;
};
const rotTick: TickFn = ({ ctx, w, h, dt, m, store, dpr }) => {
  // progressive blur — paint dark with low alpha so prior frames bleed.
  ctx.fillStyle = "rgba(10,10,12,0.18)";
  ctx.fillRect(0, 0, w, h);
  const targetVel = m.inside ? Math.hypot(m.vx, m.vy) * 0.02 + 0.2 : 0.4;
  store.vel =
    (store.vel as number) + (targetVel - (store.vel as number)) * dt * 4;
  store.angle = (store.angle as number) + (store.vel as number) * dt * 4;
  const cx = w * 0.5;
  const cy = h * 0.5;
  const radius = Math.min(w, h) * 0.4;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(store.angle as number);
  const spokes = 12;
  for (let i = 0; i < spokes; i++) {
    const a = (i / spokes) * Math.PI * 2;
    const x = Math.cos(a) * radius;
    const y = Math.sin(a) * radius;
    ctx.strokeStyle = `rgba(227,191,180,${0.4 + (i / spokes) * 0.5})`;
    ctx.lineWidth = 4 * dpr;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.fillStyle = "rgba(255,225,210,0.95)";
    ctx.beginPath();
    ctx.arc(x, y, 6 * dpr, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
};

export default function RotationBlurDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo init={rotInit} tick={rotTick} compact={compact} fpsCap={compact ? 30 : 60} />;
}
