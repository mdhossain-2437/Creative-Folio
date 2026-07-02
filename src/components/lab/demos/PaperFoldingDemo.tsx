"use client";

import { CanvasDemo, type LabDemoModuleProps, type InitFn, type TickFn } from "@/components/lab/runtime/CanvasDemo";

// ── 30 — Paper Folding ──────────────────────────────────────────────────────
const foldInit: InitFn = ({ store }) => {
  store.last = 0;
};
const foldTick: TickFn = ({ ctx, w, h, t, m, dpr, compact }) => {
  ctx.fillStyle = "#0a0a0c";
  ctx.fillRect(0, 0, w, h);
  const cell = compact ? 38 : 28;
  const cx = m.inside ? m.x : w / 2;
  const cy = m.inside ? m.y : h / 2;
  for (let y = -cell; y < h + cell; y += cell) {
    for (let x = -cell; x < w + cell; x += cell) {
      const dx = x + cell / 2 - cx;
      const dy = y + cell / 2 - cy;
      const d = Math.hypot(dx, dy);
      const noise =
        Math.sin(x * 0.02 + t * 0.6) + Math.cos(y * 0.025 + t * 0.5);
      const lift = Math.exp(-d / (w * 0.18)) * 0.6 + noise * 0.18;
      const shade = Math.max(0, Math.min(1, 0.4 + lift * 0.45));
      ctx.fillStyle = `rgba(227,191,180,${shade * 0.85})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + cell, y);
      ctx.lineTo(x, y + cell);
      ctx.closePath();
      ctx.fill();
      const shade2 = Math.max(0, Math.min(1, 0.5 - lift * 0.45));
      ctx.fillStyle = `rgba(255,225,210,${shade2 * 0.6})`;
      ctx.beginPath();
      ctx.moveTo(x + cell, y);
      ctx.lineTo(x + cell, y + cell);
      ctx.lineTo(x, y + cell);
      ctx.closePath();
      ctx.fill();
    }
  }
  // outline grid for crease feel
  ctx.strokeStyle = "rgba(8,8,10,0.45)";
  ctx.lineWidth = Math.max(0.6, dpr * 0.7);
  for (let x = 0; x < w; x += cell) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
};

export default function PaperFoldingDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo init={foldInit} tick={foldTick} compact={compact} fpsCap={compact ? 20 : 36} />;
}
