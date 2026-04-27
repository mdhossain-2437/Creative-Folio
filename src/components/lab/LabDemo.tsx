"use client";

import { useEffect, useRef } from "react";
import { NoiseField } from "@/components/webgl/NoiseField";

type Mode = "particles" | "magnetic" | "kinetic-type" | "shader-storm" | "ambient";

const MODE_BY_SLUG: Record<string, Mode> = {
  "fluid-dynamics": "particles",
  "particle-systems": "particles",
  "magnetic-cursor": "magnetic",
  "signed-distance-letters": "kinetic-type",
  "variable-font-scroll": "kinetic-type",
  "shader-storm": "shader-storm",
  "fft-material": "shader-storm",
  "volumetric-lighting": "magnetic",
  "latency-canvas": "magnetic",
};

export function LabDemo({ slug, seed }: { slug: string; seed: number }) {
  const mode: Mode = MODE_BY_SLUG[slug] ?? "ambient";
  if (mode === "particles") return <ParticleField slug={slug} />;
  if (mode === "magnetic") return <MagneticField slug={slug} />;
  if (mode === "kinetic-type") return <KineticType slug={slug} />;
  if (mode === "shader-storm") return <ShaderStripes seed={seed} />;
  return <NoiseField seed={seed} />;
}

// ── Particle field with cursor vortex ───────────────────────────────────────
function ParticleField({ slug }: { slug: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const fit = () => {
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
    };
    fit();

    const N = slug === "fluid-dynamics" ? 1400 : 2200;
    const parts = new Float32Array(N * 4); // x, y, vx, vy
    for (let i = 0; i < N; i++) {
      parts[i * 4] = Math.random() * canvas.width;
      parts[i * 4 + 1] = Math.random() * canvas.height;
    }
    let mx = canvas.width / 2;
    let my = canvas.height / 2;
    let pmx = mx;
    let pmy = my;
    let mvx = 0;
    let mvy = 0;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = (e.clientX - r.left) * (canvas.width / r.width);
      my = (e.clientY - r.top) * (canvas.height / r.height);
    };
    canvas.addEventListener("pointermove", onMove);
    const onLeave = () => {
      mx = canvas.width / 2;
      my = canvas.height / 2;
    };
    canvas.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", fit);

    let raf = 0;
    const isFluid = slug === "fluid-dynamics";

    const tick = () => {
      mvx = mx - pmx;
      mvy = my - pmy;
      pmx = mx;
      pmy = my;

      ctx.fillStyle = "rgba(12, 12, 12, 0.16)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = isFluid ? "rgba(227, 191, 180, 0.85)" : "rgba(205, 250, 0, 0.7)";

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const t = performance.now() * 0.0006;

      for (let i = 0; i < N; i++) {
        const ix = i * 4;
        let x = parts[ix];
        let y = parts[ix + 1];
        let vx = parts[ix + 2];
        let vy = parts[ix + 3];

        // curl-like noise (cheap pseudo)
        const fx = Math.sin((y * 0.004 + t) * 1.2) * 0.7;
        const fy = Math.cos((x * 0.004 - t) * 1.2) * 0.7;
        vx += fx * 0.05;
        vy += fy * 0.05;

        // Cursor influence
        const dx = mx - x;
        const dy = my - y;
        const d2 = dx * dx + dy * dy;
        const range = 220 * dpr;
        if (d2 < range * range) {
          const f = (1 - Math.sqrt(d2) / range) * 0.16;
          if (isFluid) {
            // vortex
            vx += (-dy / 80) * f + mvx * 0.04;
            vy += (dx / 80) * f + mvy * 0.04;
          } else {
            // attract
            vx += (dx / 60) * f;
            vy += (dy / 60) * f;
          }
        }

        // damping + center pull
        vx *= 0.96;
        vy *= 0.96;
        vx += (cx - x) * 0.00006;
        vy += (cy - y) * 0.00006;
        x += vx;
        y += vy;

        // wrap
        if (x < 0) x += canvas.width;
        else if (x > canvas.width) x -= canvas.width;
        if (y < 0) y += canvas.height;
        else if (y > canvas.height) y -= canvas.height;

        parts[ix] = x;
        parts[ix + 1] = y;
        parts[ix + 2] = vx;
        parts[ix + 3] = vy;

        ctx.fillRect(x, y, 1.2 * dpr, 1.2 * dpr);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", fit);
    };
  }, [slug]);
  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full bg-ink-950" />;
}

// ── Magnetic field of dots ──────────────────────────────────────────────────
function MagneticField({ slug }: { slug: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const fit = () => {
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
    };
    fit();
    const STEP = 36 * dpr;
    let mx = canvas.width / 2;
    let my = canvas.height / 2;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = (e.clientX - r.left) * (canvas.width / r.width);
      my = (e.clientY - r.top) * (canvas.height / r.height);
    };
    canvas.addEventListener("pointermove", onMove);
    window.addEventListener("resize", fit);

    const isLatency = slug === "latency-canvas";
    let raf = 0;
    const tick = () => {
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const t = performance.now() * 0.0008;
      for (let y = STEP; y < canvas.height; y += STEP) {
        for (let x = STEP; x < canvas.width; x += STEP) {
          const dx = mx - x;
          const dy = my - y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const pull = Math.min(1, 280 * dpr / (d + 1));
          const ox = (dx / (d || 1)) * pull * 22 * dpr;
          const oy = (dy / (d || 1)) * pull * 22 * dpr;
          const wob = Math.sin(t + (x + y) * 0.002) * 1.4;
          const r = isLatency
            ? 1 + Math.max(0, (1 - d / (300 * dpr))) * 5
            : 1.2 + pull * 2;
          const c = isLatency
            ? `rgba(${Math.floor(255 - pull * 200)}, ${Math.floor(120 + pull * 130)}, 0, ${0.45 + pull * 0.55})`
            : `rgba(227, 191, 180, ${0.18 + pull * 0.7})`;
          ctx.fillStyle = c;
          ctx.beginPath();
          ctx.arc(x + ox + wob, y + oy + wob, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", fit);
    };
  }, [slug]);
  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full bg-ink-950" />;
}

// ── Kinetic type controlled by mouse velocity ──────────────────────────────
function KineticType({ slug }: { slug: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const wrap = wrapRef.current;
    const text = textRef.current;
    if (!wrap || !text) return;
    let lastX = 0;
    let lastY = 0;
    let weight = 500;
    let slant = 0;
    let stretch = 100;
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const dx = x - lastX;
      const dy = y - lastY;
      lastX = x;
      lastY = y;
      const v = Math.min(40, Math.sqrt(dx * dx + dy * dy));
      weight = 300 + v * 20;
      slant = Math.max(-12, Math.min(0, -dx * 0.4));
      stretch = 75 + v * 1.4;
    };
    wrap.addEventListener("pointermove", onMove);
    let raf = 0;
    const tick = () => {
      // ease back to neutral
      weight += (450 - weight) * 0.06;
      slant += (0 - slant) * 0.08;
      stretch += (90 - stretch) * 0.06;
      text.style.fontWeight = String(Math.max(200, Math.min(900, weight)));
      text.style.fontStretch = `${Math.max(70, Math.min(140, stretch))}%`;
      text.style.fontStyle = slant < -2 ? "italic" : "normal";
      text.style.transform = `skewX(${slant * 0.4}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("pointermove", onMove);
    };
  }, [slug]);
  const word = slug === "signed-distance-letters" ? "GLYPH" : "MOTION";
  return (
    <div ref={wrapRef} className="absolute inset-0 flex items-center justify-center bg-ink-950">
      <div
        ref={textRef}
        className="font-serif text-[clamp(6rem,18vw,18rem)] leading-none tracking-tightest text-warmwhite/85 transition-[color] duration-300 will-change-transform"
        style={{ fontVariationSettings: "'wght' 600, 'slnt' 0" }}
      >
        {word}
      </div>
      <div className="pointer-events-none absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-widest text-warmwhite/45">
        Drag the mouse — type reacts to velocity
      </div>
    </div>
  );
}

// ── Shader-storm style stripes ─────────────────────────────────────────────
function ShaderStripes({ seed }: { seed: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const fit = () => {
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
    };
    fit();
    window.addEventListener("resize", fit);
    let raf = 0;
    const tick = () => {
      const t = performance.now() * 0.001;
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const stripeH = 6 * dpr;
      for (let y = 0; y < canvas.height; y += stripeH) {
        const k = (y / canvas.height) * 6 + t + seed;
        const r = 120 + Math.sin(k) * 100;
        const g = 200 + Math.cos(k * 1.3) * 50;
        const b = 80 + Math.sin(k * 0.7) * 60;
        const off = Math.sin(t * 2 + y * 0.01) * 14 * dpr;
        ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, 0.22)`;
        ctx.fillRect(off, y, canvas.width, stripeH * 0.55);
        ctx.fillStyle = `rgba(255, 255, 255, 0.04)`;
        ctx.fillRect(0, y + stripeH * 0.55, canvas.width, stripeH * 0.45);
      }
      // RGB shift band sweeping
      const sweep = ((t * 0.4) % 2 - 1) * canvas.height;
      const grad = ctx.createLinearGradient(0, sweep - 80, 0, sweep + 80);
      grad.addColorStop(0, "rgba(205, 250, 0, 0)");
      grad.addColorStop(0.5, "rgba(205, 250, 0, 0.18)");
      grad.addColorStop(1, "rgba(205, 250, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fit);
    };
  }, [seed]);
  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
