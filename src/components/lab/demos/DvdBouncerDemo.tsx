"use client";

import { CanvasDemo, type LabDemoModuleProps, type InitFn, type TickFn } from "@/components/lab/runtime/CanvasDemo";

// ── 20 — DVD Bouncer ────────────────────────────────────────────────────────
const dvdInit: InitFn = ({ w, h, store }) => {
  const make = (x: number, y: number) => ({
    x,
    y,
    vx: 2 + Math.random(),
    vy: 1.4 + Math.random(),
    hue: Math.random() * 360,
  });
  store.boxes = [make(w * 0.4, h * 0.4)];
};
const dvdTick: TickFn = ({ ctx, w, h, dt, m, store, dpr }) => {
  type Box = { x: number; y: number; vx: number; vy: number; hue: number };
  const boxes = store.boxes as Box[];
  ctx.fillStyle = "rgba(8,8,8,0.42)";
  ctx.fillRect(0, 0, w, h);
  const bw = 140 * dpr;
  const bh = 70 * dpr;
  if (m.pressed && m.shift && boxes.length < 4) {
    boxes.push({ x: m.x, y: m.y, vx: -1.6, vy: 1.8, hue: 200 });
  }
  for (const b of boxes) {
    b.x += b.vx * dt * 60;
    b.y += b.vy * dt * 60;
    let bounced = false;
    if (b.x < 0) {
      b.x = 0;
      b.vx = Math.abs(b.vx);
      bounced = true;
    }
    if (b.x + bw > w) {
      b.x = w - bw;
      b.vx = -Math.abs(b.vx);
      bounced = true;
    }
    if (b.y < 0) {
      b.y = 0;
      b.vy = Math.abs(b.vy);
      bounced = true;
    }
    if (b.y + bh > h) {
      b.y = h - bh;
      b.vy = -Math.abs(b.vy);
      bounced = true;
    }
    if (bounced) b.hue = (b.hue + 47) % 360;
    if (m.pressed && !m.shift) {
      // nudge toward cursor
      const dx = m.x - (b.x + bw / 2);
      const dy = m.y - (b.y + bh / 2);
      b.vx += dx * 0.0005;
      b.vy += dy * 0.0005;
    }
    ctx.fillStyle = `hsl(${b.hue} 70% 62%)`;
    ctx.fillRect(b.x, b.y, bw, bh);
    ctx.fillStyle = "rgba(12,12,12,0.85)";
    ctx.font = `${Math.floor(bh * 0.42)}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("DH", b.x + bw / 2, b.y + bh / 2);
  }
};

export default function DvdBouncerDemo({ compact }: LabDemoModuleProps) {
  return <CanvasDemo init={dvdInit} tick={dvdTick} compact={compact} fpsCap={compact ? 30 : 60} />;
}
