"use client";

import { CanvasDemo, type LabDemoModuleProps, type TickFn } from "@/components/lab/runtime/CanvasDemo";

// ── 12 — Flow Field (curl-noise vectors) ────────────────────────────────────
const flowTick: TickFn = ({ ctx, w, h, t, m, dpr, compact }) => {
  ctx.fillStyle = "#070708";
  ctx.fillRect(0, 0, w, h);
  const STEP = (compact ? 26 : 18) * dpr;
  ctx.lineCap = "round";
  ctx.lineWidth = 1 * dpr;
  for (let y = STEP; y < h; y += STEP) {
    for (let x = STEP; x < w; x += STEP) {
      const nx = x * 0.005 + t * 0.18;
      const ny = y * 0.005 - t * 0.12;
      let a =
        Math.sin(nx) * 0.7 + Math.cos(ny * 1.4) * 0.6 + Math.sin(nx + ny) * 0.3;
      a *= Math.PI * 0.6;
      // cursor injects rotational bias
      if (m.inside) {
        const dx = x - m.x;
        const dy = y - m.y;
        const d = Math.sqrt(dx * dx + dy * dy) + 1;
        const swirl = Math.atan2(dy, dx) + Math.PI / 2;
        const w2 = Math.min(1, (200 * dpr) / d);
        a = a * (1 - w2) + swirl * w2;
      }
      const len = STEP * 0.45;
      const ax = Math.cos(a) * len;
      const ay = Math.sin(a) * len;
      const bright = 0.15 + Math.abs(Math.sin(t + (x + y) * 0.003)) * 0.55;
      ctx.strokeStyle = `rgba(227,191,180,${bright})`;
      ctx.beginPath();
      ctx.moveTo(x - ax * 0.5, y - ay * 0.5);
      ctx.lineTo(x + ax * 0.5, y + ay * 0.5);
      ctx.stroke();
      // arrowhead dot
      ctx.fillStyle = `rgba(205,250,0,${bright * 0.7})`;
      ctx.fillRect(x + ax * 0.5 - 1, y + ay * 0.5 - 1, 2 * dpr, 2 * dpr);
    }
  }
};

export default function FlowFieldDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo tick={flowTick} compact={compact} fpsCap={compact ? 30 : 60} />;
}
