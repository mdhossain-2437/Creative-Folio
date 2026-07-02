"use client";

import { CanvasDemo, type LabDemoModuleProps, type TickFn } from "@/components/lab/runtime/CanvasDemo";

// ── 24 — Plasma Classic ─────────────────────────────────────────────────────
const plasmaTick: TickFn = ({ ctx, w, h, t, m, dpr }) => {
  const step = Math.max(6, Math.floor(8 * dpr));
  const offsetX = m.inside ? (m.x / w - 0.5) * 4 : 0;
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const v =
        Math.sin(x * 0.012 + t) +
        Math.sin(y * 0.018 + t * 1.3) +
        Math.sin((x + y) * 0.01 + t * 0.7 + offsetX) +
        Math.sin(Math.sqrt((x - w / 2) ** 2 + (y - h / 2) ** 2) * 0.012 + t);
      const v01 = (v + 4) / 8;
      const hue = 18 + v01 * 35;
      const sat = 50 + v01 * 30;
      const lit = 35 + v01 * 30;
      ctx.fillStyle = `hsl(${hue} ${sat}% ${lit}%)`;
      ctx.fillRect(x, y, step, step);
    }
  }
};

export default function PlasmaClassicDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo tick={plasmaTick} compact={compact} fpsCap={compact ? 22 : 36} />;
}
