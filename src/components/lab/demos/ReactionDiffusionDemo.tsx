"use client";

import { CanvasDemo, type LabDemoModuleProps, type InitFn, type TickFn } from "@/components/lab/runtime/CanvasDemo";

// ── 10 — Reaction Diffusion (Gray–Scott on a coarse grid) ───────────────────
const rdInit: InitFn = ({ w, h, store, compact }) => {
  const cell = compact ? 6 : 4;
  const cols = Math.max(20, Math.floor(w / cell));
  const rows = Math.max(20, Math.floor(h / cell));
  const a = new Float32Array(cols * rows);
  const b = new Float32Array(cols * rows);
  const a2 = new Float32Array(cols * rows);
  const b2 = new Float32Array(cols * rows);
  for (let i = 0; i < cols * rows; i++) {
    a[i] = 1;
    a2[i] = 1;
    b[i] = 0;
  }
  // seed — scatter ~14 hot patches so the field always has visible chemistry
  const seedCount = 14;
  for (let s = 0; s < seedCount; s++) {
    const cx = (Math.random() * cols) | 0;
    const cy = (Math.random() * rows) | 0;
    const r = 4 + ((Math.random() * 3) | 0);
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        const x = cx + dx;
        const y = cy + dy;
        if (
          x >= 0 &&
          x < cols &&
          y >= 0 &&
          y < rows &&
          dx * dx + dy * dy <= r * r
        ) {
          b[y * cols + x] = 1;
        }
      }
    }
  }
  store.cell = cell;
  store.cols = cols;
  store.rows = rows;
  store.a = a;
  store.b = b;
  store.a2 = a2;
  store.b2 = b2;
};
const rdTick: TickFn = ({ ctx, w, h, m, store, compact }) => {
  const cell = store.cell as number;
  const cols = store.cols as number;
  const rows = store.rows as number;
  let a = store.a as Float32Array;
  let b = store.b as Float32Array;
  let a2 = store.a2 as Float32Array;
  let b2 = store.b2 as Float32Array;
  const dA = 1.0;
  const dB = 0.5;
  const feed = 0.055;
  const kill = 0.062;
  const steps = compact ? 4 : 8;
  // mouse seeds
  if (m.inside) {
    const mx = ((m.x / w) * cols) | 0;
    const my = ((m.y / h) * rows) | 0;
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        const x = mx + dx;
        const y = my + dy;
        if (x > 0 && x < cols - 1 && y > 0 && y < rows - 1) {
          b[y * cols + x] = Math.min(1, b[y * cols + x] + 0.4);
        }
      }
    }
  }
  for (let s = 0; s < steps; s++) {
    for (let y = 1; y < rows - 1; y++) {
      for (let x = 1; x < cols - 1; x++) {
        const i = y * cols + x;
        // 9-point Laplacian (sides 0.2, diagonals 0.05, center -1) — sums to 0
        const lapA =
          a[i - 1] * 0.2 +
          a[i + 1] * 0.2 +
          a[i - cols] * 0.2 +
          a[i + cols] * 0.2 +
          a[i - cols - 1] * 0.05 +
          a[i - cols + 1] * 0.05 +
          a[i + cols - 1] * 0.05 +
          a[i + cols + 1] * 0.05 -
          a[i];
        const lapB =
          b[i - 1] * 0.2 +
          b[i + 1] * 0.2 +
          b[i - cols] * 0.2 +
          b[i + cols] * 0.2 +
          b[i - cols - 1] * 0.05 +
          b[i - cols + 1] * 0.05 +
          b[i + cols - 1] * 0.05 +
          b[i + cols + 1] * 0.05 -
          b[i];
        const ab2 = a[i] * b[i] * b[i];
        const na = a[i] + (dA * lapA - ab2 + feed * (1 - a[i]));
        const nb = b[i] + (dB * lapB + ab2 - (kill + feed) * b[i]);
        a2[i] = na < 0 ? 0 : na > 1 ? 1 : na;
        b2[i] = nb < 0 ? 0 : nb > 1 ? 1 : nb;
      }
    }
    [a, a2] = [a2, a];
    [b, b2] = [b2, b];
  }
  store.a = a;
  store.b = b;
  store.a2 = a2;
  store.b2 = b2;
  // render
  ctx.fillStyle = "#070708";
  ctx.fillRect(0, 0, w, h);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const v = b[y * cols + x];
      if (v < 0.05) continue;
      const tt = Math.min(1, v * 2.4);
      const r = 60 + tt * 195;
      const g = 60 + tt * 132;
      const bl = 80 + tt * 100;
      ctx.fillStyle = `rgba(${r | 0},${g | 0},${bl | 0},${0.35 + tt * 0.6})`;
      ctx.fillRect(x * cell, y * cell, cell, cell);
    }
  }
};

export default function ReactionDiffusionDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo init={rdInit} tick={rdTick} compact={compact} fpsCap={compact ? 24 : 50} reseedOnClick />;
}
