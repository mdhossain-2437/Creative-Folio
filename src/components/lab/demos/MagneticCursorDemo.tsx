"use client";

import { CanvasDemo, type LabDemoModuleProps, type TickFn } from "@/components/lab/runtime/CanvasDemo";

// ── 05 — Magnetic Cursor: dot grid pulled toward cursor ─────────────────────
const magneticTick: TickFn = ({ ctx, w, h, t, m, dpr, compact }) => {
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, w, h);
  const STEP = (compact ? 22 : 36) * dpr;
  for (let y = STEP; y < h; y += STEP) {
    for (let x = STEP; x < w; x += STEP) {
      const dx = m.x - x;
      const dy = m.y - y;
      const d = Math.sqrt(dx * dx + dy * dy);
      const pull = m.inside ? Math.min(1, (280 * dpr) / (d + 1)) : 0.05;
      const ox = (dx / (d || 1)) * pull * 22 * dpr;
      const oy = (dy / (d || 1)) * pull * 22 * dpr;
      const wob = Math.sin(t + (x + y) * 0.002) * 1.4;
      const r = 1.2 + pull * 2;
      ctx.fillStyle = `rgba(227,191,180,${0.18 + pull * 0.7})`;
      ctx.beginPath();
      ctx.arc(x + ox + wob, y + oy + wob, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
};

export default function MagneticCursorDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo tick={magneticTick} compact={compact} fpsCap={compact ? 30 : 60} />;
}
