"use client";

import { useEffect, useRef } from "react";

const SAMPLE_TEXT = "404";

type Particle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  size: number;
  baseTx: number;
  baseTy: number;
};

function buildTargets(width: number, height: number) {
  const off = document.createElement("canvas");
  off.width = width;
  off.height = height;
  const ctx = off.getContext("2d");
  if (!ctx) return [] as { x: number; y: number }[];

  const fontSize = Math.min(width * 0.42, 520);
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${fontSize}px "Newsreader", serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(SAMPLE_TEXT, width / 2, height / 2);

  const data = ctx.getImageData(0, 0, width, height).data;
  const targets: { x: number; y: number }[] = [];
  const step = Math.max(4, Math.floor(width / 240));
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const idx = (y * width + x) * 4;
      if (data[idx + 3] > 80) {
        targets.push({ x, y });
      }
    }
  }
  return targets;
}

export function ParticleField404() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const particles = useRef<Particle[]>([]);
  const animateRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setup = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targets = buildTargets(w, h);
      const max = Math.min(targets.length, 1400);
      const sampled: { x: number; y: number }[] = [];
      const stride = Math.max(1, Math.floor(targets.length / max));
      for (let i = 0; i < targets.length; i += stride) sampled.push(targets[i]);

      particles.current = sampled.map((t) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        tx: t.x,
        ty: t.y,
        baseTx: t.x,
        baseTy: t.y,
        vx: 0,
        vy: 0,
        size: 1.2 + Math.random() * 1.4,
      }));
    };

    setup();
    const onResize = () => setup();
    window.addEventListener("resize", onResize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const tick = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(239,236,233,0.85)";
      const m = mouseRef.current;
      const list = particles.current;
      for (let i = 0; i < list.length; i++) {
        const p = list[i];
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        p.vx = p.vx * 0.86 + dx * 0.04;
        p.vy = p.vy * 0.86 + dy * 0.04;
        if (m.active) {
          const mdx = p.x - m.x;
          const mdy = p.y - m.y;
          const dist2 = mdx * mdx + mdy * mdy;
          if (dist2 < 22000) {
            const force = 80 / Math.sqrt(dist2 + 30);
            p.vx += (mdx / Math.sqrt(dist2 + 1)) * force * 0.18;
            p.vy += (mdy / Math.sqrt(dist2 + 1)) * force * 0.18;
          }
        }
        p.x += p.vx;
        p.y += p.vy;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      animateRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(animateRef.current);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
