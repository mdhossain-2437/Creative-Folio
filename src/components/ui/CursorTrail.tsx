"use client";

import { useEffect, useRef, useState } from "react";

// Subtle particle trail behind the cursor. Honours the global motion preference
// (`localStorage['delowar:motion']`) and pauses entirely when the document is
// hidden. Pointer-events: none, fixed under the custom cursor — never blocks UI.
export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Track whether the effect should run at all. We gate by both viewport size
  // (matchMedia min-width: 768px) and the motion preference. Below that gate
  // we don't even render the <canvas> so no listeners or RAF attach on mobile.
  const [active, setActive] = useState(false);

  // Mount-time gate: viewport + motion preference + reactive media-query / motion-toggle.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const isMotionOff = () => window.localStorage.getItem("delowar:motion") === "off";

    const compute = () => setActive(mq.matches && !isMotionOff());
    compute();

    const onMq = () => compute();
    if (typeof mq.addEventListener === "function") mq.addEventListener("change", onMq);
    else mq.addListener(onMq); // legacy Safari

    // Same-tab signal dispatched by MotionToggle when the preference changes.
    const onMotion = () => compute();
    window.addEventListener("delowar:motion-change", onMotion as EventListener);
    // Cross-tab signal (StorageEvent only fires in *other* tabs).
    const onStorage = (e: StorageEvent) => {
      if (e.key === "delowar:motion") compute();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      if (typeof mq.removeEventListener === "function") mq.removeEventListener("change", onMq);
      else mq.removeListener(onMq);
      window.removeEventListener("delowar:motion-change", onMotion as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  // Particle effect — only attaches when `active` is true; tears down completely
  // when motion is disabled or the viewport drops below md.
  useEffect(() => {
    if (!active) return;

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

    let pmx = -1000;
    let pmy = -1000;

    const onMove = (e: PointerEvent) => {
      const nx = e.clientX * dpr;
      const ny = e.clientY * dpr;
      const dx = nx - pmx;
      const dy = ny - pmy;
      const v = Math.sqrt(dx * dx + dy * dy);
      pmx = nx;
      pmy = ny;
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

    let raf = 0;
    let last = performance.now();
    let stopped = false;

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
      if (!stopped) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!stopped) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fit);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [active]);

  if (!active) return null;
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="cursor-trail pointer-events-none fixed inset-0 z-[58] hidden md:block"
    />
  );
}
