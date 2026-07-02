"use client";

import { CanvasDemo, type LabDemoModuleProps, type TickFn } from "@/components/lab/runtime/CanvasDemo";

// ── 02 — Volumetric Lighting: god rays from a moving sun ────────────────────
const volumetricTick: TickFn = ({ ctx, w, h, t, m, dpr }) => {
  ctx.fillStyle = "#06070a";
  ctx.fillRect(0, 0, w, h);
  // sun follows cursor smoothly when active, else orbits
  const sx = m.inside ? m.x : w * (0.5 + Math.cos(t * 0.3) * 0.32);
  const sy = m.inside ? m.y : h * (0.32 + Math.sin(t * 0.4) * 0.18);
  const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, w * 0.9);
  grd.addColorStop(0, "rgba(255,222,180,0.55)");
  grd.addColorStop(0.4, "rgba(227,191,180,0.18)");
  grd.addColorStop(1, "rgba(8,8,12,0)");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);

  const rays = 36;
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * Math.PI * 2 + t * 0.18;
    const len = w * 1.1;
    const wob = Math.sin(t * 1.3 + i) * 0.04;
    const ax = Math.cos(a + wob);
    const ay = Math.sin(a + wob);
    const x2 = sx + ax * len;
    const y2 = sy + ay * len;
    const lg = ctx.createLinearGradient(sx, sy, x2, y2);
    lg.addColorStop(0, "rgba(255,210,170,0.10)");
    lg.addColorStop(0.4, "rgba(227,191,180,0.04)");
    lg.addColorStop(1, "rgba(0,0,0,0)");
    ctx.strokeStyle = lg;
    ctx.lineWidth = 22 * dpr;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  ctx.globalCompositeOperation = "source-over";
  // dust motes
  ctx.fillStyle = "rgba(255,236,210,0.45)";
  for (let i = 0; i < 60; i++) {
    const x = ((i * 137 + t * 24) % w) | 0;
    const y = (((i * 89 + Math.sin(t + i) * 30 + h * 0.5) % h) + h) % h;
    ctx.fillRect(x, y, 1.2 * dpr, 1.2 * dpr);
  }
};

export default function VolumetricLightingDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo tick={volumetricTick} compact={compact} fpsCap={compact ? 30 : 60} />;
}
