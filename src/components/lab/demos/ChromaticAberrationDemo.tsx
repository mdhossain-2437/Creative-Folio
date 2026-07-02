"use client";

import { CanvasDemo, type LabDemoModuleProps, type InitFn, type TickFn } from "@/components/lab/runtime/CanvasDemo";

// ── 29 — Chromatic Aberration (typographic) ─────────────────────────────────
const chromaInit: InitFn = ({ store }) => {
  store.shake = 0;
};
const chromaTick: TickFn = ({ ctx, w, h, dt, m, store, dpr }) => {
  const targetShake = m.inside ? Math.hypot(m.vx, m.vy) * 0.4 : 0.6;
  store.shake =
    (store.shake as number) + (targetShake - (store.shake as number)) * dt * 6;
  const shake = Math.min(40, store.shake as number);
  ctx.fillStyle = "rgba(10,10,12,0.42)";
  ctx.fillRect(0, 0, w, h);
  const text = "DELOWAR · HOSSAIN";
  const size = Math.min(w / 8, h / 3);
  ctx.font = `bold ${size}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const cx = w / 2;
  const cy = h / 2;
  ctx.globalCompositeOperation = "lighter";
  ctx.fillStyle = "rgba(255,72,72,0.85)";
  ctx.fillText(text, cx - shake * dpr, cy);
  ctx.fillStyle = "rgba(72,255,168,0.85)";
  ctx.fillText(text, cx, cy);
  ctx.fillStyle = "rgba(72,168,255,0.85)";
  ctx.fillText(text, cx + shake * dpr, cy);
  ctx.globalCompositeOperation = "source-over";
};

export default function ChromaticAberrationDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo init={chromaInit} tick={chromaTick} compact={compact} fpsCap={compact ? 30 : 60} />;
}
