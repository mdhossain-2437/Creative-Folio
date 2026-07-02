"use client";

import { CanvasDemo, type LabDemoModuleProps, type InitFn, type TickFn } from "@/components/lab/runtime/CanvasDemo";

// ── 11 — Voronoi Cells ──────────────────────────────────────────────────────
const voronoiInit: InitFn = ({ w, h, store, compact }) => {
  const N = compact ? 18 : 36;
  const sites = new Float32Array(N * 4);
  for (let i = 0; i < N; i++) {
    sites[i * 4] = Math.random() * w;
    sites[i * 4 + 1] = Math.random() * h;
    sites[i * 4 + 2] = (Math.random() - 0.5) * 1.2;
    sites[i * 4 + 3] = (Math.random() - 0.5) * 1.2;
  }
  store.sites = sites;
  store.N = N;
};
const voronoiTick: TickFn = ({ ctx, w, h, m, store, compact, dpr }) => {
  const sites = store.sites as Float32Array;
  const N = store.N as number;
  for (let i = 0; i < N; i++) {
    const x = sites[i * 4] + sites[i * 4 + 2];
    const y = sites[i * 4 + 1] + sites[i * 4 + 3];
    if (x < 0 || x > w) sites[i * 4 + 2] *= -1;
    if (y < 0 || y > h) sites[i * 4 + 3] *= -1;
    sites[i * 4] = Math.max(0, Math.min(w, x));
    sites[i * 4 + 1] = Math.max(0, Math.min(h, y));
  }
  ctx.fillStyle = "#070708";
  ctx.fillRect(0, 0, w, h);
  const step = compact ? 8 * dpr : 5 * dpr;
  // for each pixel-block find nearest site (heavy site = cursor)
  const heavyW = m.inside ? 0.55 : 1;
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      let best = Infinity;
      let bi = 0;
      for (let i = 0; i < N; i++) {
        const dx = sites[i * 4] - x;
        const dy = sites[i * 4 + 1] - y;
        const d = dx * dx + dy * dy;
        if (d < best) {
          best = d;
          bi = i;
        }
      }
      if (m.inside) {
        const dx = m.x - x;
        const dy = m.y - y;
        const d = (dx * dx + dy * dy) * heavyW;
        if (d < best) {
          best = d;
          bi = -1;
        }
      }
      const isCursor = bi === -1;
      const tone = isCursor
        ? "rgba(205,250,0,0.55)"
        : `rgba(227,191,180,${0.06 + ((bi % 7) / 7) * 0.32})`;
      ctx.fillStyle = tone;
      ctx.fillRect(x, y, step, step);
    }
  }
  // edges via site dots
  ctx.fillStyle = "rgba(239,236,233,0.85)";
  for (let i = 0; i < N; i++) {
    ctx.fillRect(sites[i * 4] - 1, sites[i * 4 + 1] - 1, 2 * dpr, 2 * dpr);
  }
};

export default function VoronoiCellsDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo init={voronoiInit} tick={voronoiTick} compact={compact} fpsCap={compact ? 24 : 45} reseedOnClick />;
}
