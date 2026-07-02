"use client";

import { CanvasDemo, type LabDemoModuleProps, type InitFn, type TickFn } from "@/components/lab/runtime/CanvasDemo";

// ── 14 — Boids Flock ────────────────────────────────────────────────────────
const boidsInit: InitFn = ({ w, h, store, compact }) => {
  const N = compact ? 110 : 320;
  const arr = new Float32Array(N * 4);
  for (let i = 0; i < N; i++) {
    arr[i * 4] = Math.random() * w;
    arr[i * 4 + 1] = Math.random() * h;
    const a = Math.random() * Math.PI * 2;
    arr[i * 4 + 2] = Math.cos(a) * 1.6;
    arr[i * 4 + 3] = Math.sin(a) * 1.6;
  }
  store.arr = arr;
  store.N = N;
};
const boidsTick: TickFn = ({ ctx, w, h, m, store, dpr }) => {
  const arr = store.arr as Float32Array;
  const N = store.N as number;
  const PERC = 60 * dpr;
  const PERC2 = PERC * PERC;
  ctx.fillStyle = "rgba(8,8,10,0.18)";
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < N; i++) {
    const ix = i * 4;
    const x = arr[ix];
    const y = arr[ix + 1];
    let vx = arr[ix + 2];
    let vy = arr[ix + 3];

    let sx = 0,
      sy = 0; // separation
    let ax = 0,
      ay = 0; // alignment
    let cx = 0,
      cy = 0; // cohesion
    let cnt = 0;
    // sample nearby every 4th boid for perf
    for (let j = 0; j < N; j += 4) {
      if (j === i) continue;
      const jx = j * 4;
      const dx = arr[jx] - x;
      const dy = arr[jx + 1] - y;
      const d2 = dx * dx + dy * dy;
      if (d2 < PERC2) {
        cnt++;
        ax += arr[jx + 2];
        ay += arr[jx + 3];
        cx += arr[jx];
        cy += arr[jx + 1];
        if (d2 < 400) {
          sx -= dx;
          sy -= dy;
        }
      }
    }
    if (cnt > 0) {
      ax /= cnt;
      ay /= cnt;
      cx = cx / cnt - x;
      cy = cy / cnt - y;
    }
    vx += sx * 0.02 + ax * 0.04 + cx * 0.0009;
    vy += sy * 0.02 + ay * 0.04 + cy * 0.0009;

    if (m.inside) {
      const dx = m.x - x;
      const dy = m.y - y;
      const sign = m.shift ? -1 : 1;
      vx += dx * 0.0006 * sign;
      vy += dy * 0.0006 * sign;
    }
    // limit speed
    const sp = Math.sqrt(vx * vx + vy * vy);
    const lim = 2.6;
    if (sp > lim) {
      vx = (vx / sp) * lim;
      vy = (vy / sp) * lim;
    }
    let nx = x + vx;
    let ny = y + vy;
    if (nx < 0) nx += w;
    else if (nx > w) nx -= w;
    if (ny < 0) ny += h;
    else if (ny > h) ny -= h;
    arr[ix] = nx;
    arr[ix + 1] = ny;
    arr[ix + 2] = vx;
    arr[ix + 3] = vy;

    const angle = Math.atan2(vy, vx);
    const len = 5 * dpr;
    ctx.strokeStyle =
      m.shift && m.inside ? "rgba(255,120,90,0.7)" : "rgba(227,191,180,0.7)";
    ctx.lineWidth = 1.2 * dpr;
    ctx.beginPath();
    ctx.moveTo(nx, ny);
    ctx.lineTo(nx - Math.cos(angle) * len, ny - Math.sin(angle) * len);
    ctx.stroke();
  }
};

export default function BoidsFlockDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo init={boidsInit} tick={boidsTick} compact={compact} fpsCap={compact ? 30 : 60} reseedOnClick />;
}
