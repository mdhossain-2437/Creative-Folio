"use client";

import { CanvasDemo, type LabDemoModuleProps, type InitFn, type TickFn } from "@/components/lab/runtime/CanvasDemo";

// ── 25 — Falling Sand ───────────────────────────────────────────────────────
const sandInit: InitFn = ({ w, h, store, compact }) => {
  const cell = compact ? 6 : 4;
  const cols = Math.floor(w / cell);
  const rows = Math.floor(h / cell);
  const grid = new Uint8Array(cols * rows);
  store.grid = grid;
  store.cols = cols;
  store.rows = rows;
  store.cell = cell;
};
const sandTick: TickFn = ({ ctx, w, h, m, store }) => {
  const grid = store.grid as Uint8Array;
  const cols = store.cols as number;
  const rows = store.rows as number;
  const cell = store.cell as number;
  // paint with cursor (drag = sand, click=stone)
  if (m.inside) {
    const cx = Math.floor(m.x / cell);
    const cy = Math.floor(m.y / cell);
    const radius = m.pressed ? 4 : 2;
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const c = cx + dx;
        const r = cy + dy;
        if (c < 0 || c >= cols || r < 0 || r >= rows) continue;
        if (Math.random() < 0.55)
          grid[r * cols + c] = m.pressed && m.shift ? 2 : 1;
      }
    }
  }
  // physics — iterate rows bottom-up
  for (let r = rows - 2; r >= 0; r--) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const v = grid[idx];
      if (v !== 1) continue;
      const below = (r + 1) * cols + c;
      if (grid[below] === 0) {
        grid[below] = 1;
        grid[idx] = 0;
      } else {
        const dir = Math.random() < 0.5 ? -1 : 1;
        const diag = (r + 1) * cols + c + dir;
        if (c + dir >= 0 && c + dir < cols && grid[diag] === 0) {
          grid[diag] = 1;
          grid[idx] = 0;
        }
      }
    }
  }
  // render
  ctx.fillStyle = "#0a0a0c";
  ctx.fillRect(0, 0, w, h);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const v = grid[r * cols + c];
      if (!v) continue;
      ctx.fillStyle = v === 2 ? "#6a655f" : "#e3bfb4";
      ctx.fillRect(c * cell, r * cell, cell, cell);
    }
  }
};

export default function SandPilesDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo init={sandInit} tick={sandTick} compact={compact} fpsCap={compact ? 24 : 45} />;
}
