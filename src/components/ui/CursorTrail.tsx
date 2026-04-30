"use client";

import { useEffect, useRef } from "react";

// Subtle particle trail behind the cursor. Honours the global motion preference
// (`localStorage['delowar:motion']`) and pauses entirely when the document is
// hidden. Pointer-events: none, fixed under the custom cursor — never blocks UI.
export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const motion = typeof window !== "undefined" && window.localStorage.getItem("delowar:motion");
    if (motion === "off") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const fit = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
    };
    fit();
    window.addEventListener("resize", fit);

    type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; r: number };
    const parts: P[] = [];
    const MAX = 80;

    let mx = -1000;
    let my = -1000;
    let pmx = mx;
    let pmy = my;

    const onMove = (e: PointerEvent) => {
      const nx = e.clientX * dpr;
      const ny = e.clientY * dpr;
      const dx = nx - pmx;
      const dy = ny - pmy;
      const v = Math.sqrt(dx * dx + dy * dy);
      pmx = nx;
      pmy = ny;
      mx = nx;
      my = ny;
      // emit particles proportional to velocity, capped
      const count = Math.min(4, Math.floor(v / 18));
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = Math.random() * 0.6 + 0.2;
        parts.push({
          x: nx + (Math.random() - 0.5) * 6,
          y: ny + (Math.random() - 0.5) * 6,
          vx: Math.cos(a) * s + dx * 0.04,
          vy: Math.sin(a) * s + dy * 0.04,
          life: 0,
          max: 600 + Math.random() * 400,
          r: (Math.random() * 1.5 + 0.6) * dpr,
        });
        if (parts.length > MAX) parts.shift();
      }
    };
    window.addEventListener("pointermove", onMove);

    let motionOff = false;
    let raf = 0;
    let last = performance.now();
    const tick = () => {
      const now = performance.now();
      const dt = Math.min(40, now - last);
      last = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life += dt;
        if (p.life > p.max) {
          parts.splice(i, 1);
          continue;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;
        const t = 1 - p.life / p.max;
        ctx.globalAlpha = t * 0.55;
        ctx.fillStyle = "rgba(227, 191, 180, 1)"; // peach
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (0.4 + t * 0.6), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!motionOff) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    const onMotionChange = (e: StorageEvent) => {
      if (e.key === "delowar:motion" && e.newValue === "off") {
        motionOff = true;
        cancelAnimationFrame(raf);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    window.addEventListener("storage", onMotionChange);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fit);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("storage", onMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="cursor-trail pointer-events-none fixed inset-0 z-[58] hidden md:block"
    />
  );
}
