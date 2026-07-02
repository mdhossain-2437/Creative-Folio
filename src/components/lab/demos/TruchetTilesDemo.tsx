"use client";

import { CanvasDemo, type LabDemoModuleProps, type InitFn, type TickFn } from "@/components/lab/runtime/CanvasDemo";

// ── 18 — Truchet Tiles ──────────────────────────────────────────────────────
const truchetInit: InitFn = ({ w, h, store, compact }) => {
  const size = compact ? 28 : 36;
  const cols = Math.ceil(w / size) + 1;
  const rows = Math.ceil(h / size) + 1;
  const tiles = new Uint8Array(cols * rows);
  for (let i = 0; i < tiles.length; i++) tiles[i] = Math.random() < 0.5 ? 0 : 1;
  store.tiles = tiles;
  store.cols = cols;
  store.rows = rows;
  store.size = size;
};
const truchetTick: TickFn = ({ ctx, w, h, m, store, dpr, t }) => {
  const tiles = store.tiles as Uint8Array;
  const cols = store.cols as number;
  const rows = store.rows as number;
  const size = store.size as number;
  ctx.fillStyle = "#0c0c0c";
  ctx.fillRect(0, 0, w, h);
  // re-orient tiles near the cursor over time
  if (m.inside) {
    const mc = Math.floor(m.x / size);
    const mr = Math.floor(m.y / size);
    const radius = 3;
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const c = mc + dx;
        const r = mr + dy;
        if (c < 0 || c >= cols || r < 0 || r >= rows) continue;
        if (Math.random() < 0.02) tiles[r * cols + c] ^= 1;
      }
    }
  }
  ctx.strokeStyle = "rgba(227,191,180,0.78)";
  ctx.lineWidth = Math.max(1.4, 2 * dpr);
  const r = size * 0.5;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * size;
      const y = row * size;
      const orient = tiles[row * cols + col];
      ctx.beginPath();
      if (orient === 0) {
        ctx.arc(x, y, r, 0, Math.PI * 0.5);
        ctx.moveTo(x + size, y + size);
        ctx.arc(x + size, y + size, r, Math.PI, Math.PI * 1.5);
      } else {
        ctx.arc(x + size, y, r, Math.PI * 0.5, Math.PI);
        ctx.moveTo(x, y + size);
        ctx.arc(x, y + size, r, Math.PI * 1.5, Math.PI * 2);
      }
      ctx.stroke();
    }
  }
  // subtle pulse so the panel reads as alive even at rest
  const a = (Math.sin(t * 0.6) * 0.5 + 0.5) * 0.06;
  ctx.fillStyle = `rgba(227,191,180,${a})`;
  ctx.fillRect(0, 0, w, h);
};

export default function TruchetTilesDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo init={truchetInit} tick={truchetTick} compact={compact} fpsCap={compact ? 24 : 40} />;
}
