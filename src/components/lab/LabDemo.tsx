"use client";

import { useEffect, useMemo, useRef } from "react";
import { NoiseField } from "@/components/webgl/NoiseField";
import { damp, clampDt, K } from "@/lib/damp";

// Each lab experiment has its own dedicated demo — no two slugs share a
// renderer. Every demo is cursor-reactive and pauses via IntersectionObserver
// the moment it scrolls off-screen, so the /lab grid can host every preview at
// once without melting the main thread.

type Mouse = {
  x: number;
  y: number;
  px: number;
  py: number;
  vx: number;
  vy: number;
  inside: boolean;
  pressed: boolean;
  clickT: number;
  shift: boolean;
};

type Store = Record<string, unknown>;

type RenderState = {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  dpr: number;
  t: number;
  dt: number;
  m: Mouse;
  compact: boolean;
  store: Store;
  reseed: () => void;
};

type TickFn = (s: RenderState) => void;
type InitFn = (s: Omit<RenderState, "t" | "dt">) => void;

function emptyMouse(): Mouse {
  return {
    x: 0,
    y: 0,
    px: 0,
    py: 0,
    vx: 0,
    vy: 0,
    inside: false,
    pressed: false,
    clickT: -1,
    shift: false,
  };
}

// ── Shared canvas runtime ───────────────────────────────────────────────────
function CanvasDemo({
  init,
  tick,
  compact = false,
  className = "absolute inset-0 h-full w-full bg-ink-950",
  fpsCap,
  reseedOnClick = false,
}: {
  init?: InitFn;
  tick: TickFn;
  compact?: boolean;
  className?: string;
  fpsCap?: number;
  reseedOnClick?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = compact
      ? Math.min(window.devicePixelRatio || 1, 1)
      : Math.min(window.devicePixelRatio || 1, 1.5);
    const m = emptyMouse();
    const store: Store = {};
    let reseedRequested = false;

    const fit = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      m.x = canvas.width / 2;
      m.y = canvas.height / 2;
      m.px = m.x;
      m.py = m.y;
      if (init) {
        init({ ctx, w: canvas.width, h: canvas.height, dpr, m, compact, store, reseed });
      }
    };

    const reseed = () => {
      reseedRequested = true;
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      m.x = (e.clientX - r.left) * (canvas.width / r.width);
      m.y = (e.clientY - r.top) * (canvas.height / r.height);
      m.inside = true;
      m.shift = e.shiftKey;
    };
    const onLeave = () => {
      m.inside = false;
      m.vx = 0;
      m.vy = 0;
    };
    const onDown = (e: PointerEvent) => {
      m.pressed = true;
      m.clickT = performance.now() / 1000;
      m.shift = e.shiftKey;
      // Capture so the matching pointerup fires here even if the user releases
      // outside the canvas (lab cards on /lab are stacked under absolute overlays).
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        // ignore — some browsers throw if the pointer is already captured
      }
      if (reseedOnClick) reseed();
    };
    const onUp = () => {
      m.pressed = false;
    };
    const onCancel = () => {
      m.pressed = false;
      m.inside = false;
    };

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onCancel);
    // Fallback in case pointer capture failed and the release happened off-canvas.
    window.addEventListener("pointerup", onUp);
    window.addEventListener("resize", fit);

    fit();

    let raf = 0;
    let last = performance.now();
    const minDt = fpsCap ? 1000 / fpsCap : 0;
    const tickFrame = (now: number) => {
      raf = requestAnimationFrame(tickFrame);
      if (now - last < minDt) return;
      const dt = Math.min(0.06, (now - last) / 1000);
      last = now;
      const t = now / 1000;
      // Compute mouse velocity per-frame (not per pointermove event) so it
      // naturally decays to 0 when the cursor stops moving but stays inside
      // the canvas. Matches the pre-refactor ParticleField behaviour.
      m.vx = m.x - m.px;
      m.vy = m.y - m.py;
      m.px = m.x;
      m.py = m.y;
      if (reseedRequested) {
        reseedRequested = false;
        if (init) {
          init({ ctx, w: canvas.width, h: canvas.height, dpr, m, compact, store, reseed });
        }
      }
      tick({
        ctx,
        w: canvas.width,
        h: canvas.height,
        dpr,
        t,
        dt,
        m,
        compact,
        store,
        reseed,
      });
    };
    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tickFrame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              if (entry?.isIntersecting) start();
              else stop();
            },
            { rootMargin: "200px" }
          )
        : null;
    if (io) io.observe(canvas);
    else start();

    return () => {
      stop();
      io?.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onCancel);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", fit);
    };
  }, [init, tick, compact, fpsCap, reseedOnClick]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}

// ── 01 — Fluid Dynamics: vortex particles seeded by cursor velocity ─────────
const fluidInit: InitFn = ({ w, h, store, compact }) => {
  const N = compact ? 360 : 1400;
  const parts = new Float32Array(N * 4);
  for (let i = 0; i < N; i++) {
    parts[i * 4] = Math.random() * w;
    parts[i * 4 + 1] = Math.random() * h;
  }
  store.parts = parts;
  store.N = N;
};
const fluidTick: TickFn = ({ ctx, w, h, t, m, store, dpr }) => {
  const parts = store.parts as Float32Array;
  const N = store.N as number;
  ctx.fillStyle = "rgba(12,12,12,0.18)";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "rgba(227,191,180,0.78)";
  for (let i = 0; i < N; i++) {
    const ix = i * 4;
    let x = parts[ix];
    let y = parts[ix + 1];
    let vx = parts[ix + 2];
    let vy = parts[ix + 3];
    vx += Math.sin((y * 0.004 + t) * 1.2) * 0.05;
    vy += Math.cos((x * 0.004 - t) * 1.2) * 0.05;
    const dx = m.x - x;
    const dy = m.y - y;
    const d2 = dx * dx + dy * dy;
    const range = 220 * dpr;
    if (m.inside && d2 < range * range) {
      const f = (1 - Math.sqrt(d2) / range) * 0.18;
      vx += (-dy / 80) * f + m.vx * 0.04;
      vy += (dx / 80) * f + m.vy * 0.04;
    }
    vx *= 0.96;
    vy *= 0.96;
    x += vx;
    y += vy;
    if (x < 0) x += w;
    else if (x > w) x -= w;
    if (y < 0) y += h;
    else if (y > h) y -= h;
    parts[ix] = x;
    parts[ix + 1] = y;
    parts[ix + 2] = vx;
    parts[ix + 3] = vy;
    ctx.fillRect(x, y, 1.2 * dpr, 1.2 * dpr);
  }
};

// ── 02 — Volumetric Lighting: god rays from a moving sun ────────────────────
const volumetricTick: TickFn = ({ ctx, w, h, t, m, dpr }) => {
  ctx.fillStyle = "#06070a";
  ctx.fillRect(0, 0, w, h);
  // sun follows cursor smoothly when active, else orbits
  const sx = m.inside ? m.x : w * (0.5 + Math.cos(t * 0.3) * 0.32);
  const sy = m.inside ? m.y : h * (0.32 + Math.sin(t * 0.4) * 0.18);
  const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, w * 0.9);
  grd.addColorStop(0, "rgba(255,222,180,0.55)");
  grd.addColorStop(0.4, "rgba(227,191,180,0.18)");
  grd.addColorStop(1, "rgba(8,8,12,0)");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);

  const rays = 36;
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * Math.PI * 2 + t * 0.18;
    const len = w * 1.1;
    const wob = Math.sin(t * 1.3 + i) * 0.04;
    const ax = Math.cos(a + wob);
    const ay = Math.sin(a + wob);
    const x2 = sx + ax * len;
    const y2 = sy + ay * len;
    const lg = ctx.createLinearGradient(sx, sy, x2, y2);
    lg.addColorStop(0, "rgba(255,210,170,0.10)");
    lg.addColorStop(0.4, "rgba(227,191,180,0.04)");
    lg.addColorStop(1, "rgba(0,0,0,0)");
    ctx.strokeStyle = lg;
    ctx.lineWidth = 22 * dpr;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  ctx.globalCompositeOperation = "source-over";
  // dust motes
  ctx.fillStyle = "rgba(255,236,210,0.45)";
  for (let i = 0; i < 60; i++) {
    const x = ((i * 137 + t * 24) % w) | 0;
    const y = ((i * 89 + Math.sin(t + i) * 30 + h * 0.5) % h + h) % h;
    ctx.fillRect(x, y, 1.2 * dpr, 1.2 * dpr);
  }
};

// ── 03 — Particle Systems: attractor field + click bursts ───────────────────
const partSysInit: InitFn = ({ w, h, store, compact }) => {
  const N = compact ? 420 : 2200;
  const parts = new Float32Array(N * 4);
  for (let i = 0; i < N; i++) {
    parts[i * 4] = Math.random() * w;
    parts[i * 4 + 1] = Math.random() * h;
  }
  store.parts = parts;
  store.N = N;
  store.bursts = [];
};
const partSysTick: TickFn = ({ ctx, w, h, t, m, store, dpr }) => {
  const parts = store.parts as Float32Array;
  const N = store.N as number;
  const bursts = store.bursts as { x: number; y: number; r: number; life: number }[];
  if (m.pressed && (store.lastBurst === undefined || t - (store.lastBurst as number) > 0.18)) {
    bursts.push({ x: m.x, y: m.y, r: 30 * dpr, life: 1 });
    store.lastBurst = t;
  }
  for (let i = bursts.length - 1; i >= 0; i--) {
    const b = bursts[i];
    b.r += 8 * dpr;
    b.life -= 0.02;
    if (b.life <= 0) bursts.splice(i, 1);
  }
  ctx.fillStyle = "rgba(7,8,10,0.18)";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "rgba(205,250,0,0.7)";
  for (let i = 0; i < N; i++) {
    const ix = i * 4;
    let x = parts[ix];
    let y = parts[ix + 1];
    let vx = parts[ix + 2];
    let vy = parts[ix + 3];
    vx += Math.sin((y * 0.003 + t) * 1.4) * 0.04;
    vy += Math.cos((x * 0.003 - t) * 1.4) * 0.04;
    const dx = m.x - x;
    const dy = m.y - y;
    const d2 = dx * dx + dy * dy;
    const range = 260 * dpr;
    if (m.inside && d2 < range * range) {
      const f = (1 - Math.sqrt(d2) / range) * 0.18;
      vx += (dx / 60) * f;
      vy += (dy / 60) * f;
    }
    for (const b of bursts) {
      const bdx = x - b.x;
      const bdy = y - b.y;
      const bd = Math.sqrt(bdx * bdx + bdy * bdy);
      if (Math.abs(bd - b.r) < 18 * dpr) {
        const force = b.life * 0.9;
        vx += (bdx / (bd + 1)) * force;
        vy += (bdy / (bd + 1)) * force;
      }
    }
    vx *= 0.95;
    vy *= 0.95;
    x += vx;
    y += vy;
    if (x < 0) x += w;
    else if (x > w) x -= w;
    if (y < 0) y += h;
    else if (y > h) y -= h;
    parts[ix] = x;
    parts[ix + 1] = y;
    parts[ix + 2] = vx;
    parts[ix + 3] = vy;
    ctx.fillRect(x, y, 1.2 * dpr, 1.2 * dpr);
  }
  // ring overlays
  ctx.strokeStyle = "rgba(205,250,0,0.45)";
  for (const b of bursts) {
    ctx.globalAlpha = b.life * 0.5;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
};

// ── 05 — Magnetic Cursor: dot grid pulled toward cursor ─────────────────────
const magneticTick: TickFn = ({ ctx, w, h, t, m, dpr, compact }) => {
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, w, h);
  const STEP = (compact ? 22 : 36) * dpr;
  for (let y = STEP; y < h; y += STEP) {
    for (let x = STEP; x < w; x += STEP) {
      const dx = m.x - x;
      const dy = m.y - y;
      const d = Math.sqrt(dx * dx + dy * dy);
      const pull = m.inside ? Math.min(1, (280 * dpr) / (d + 1)) : 0.05;
      const ox = (dx / (d || 1)) * pull * 22 * dpr;
      const oy = (dy / (d || 1)) * pull * 22 * dpr;
      const wob = Math.sin(t + (x + y) * 0.002) * 1.4;
      const r = 1.2 + pull * 2;
      ctx.fillStyle = `rgba(227,191,180,${0.18 + pull * 0.7})`;
      ctx.beginPath();
      ctx.arc(x + ox + wob, y + oy + wob, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
};

// ── 06 — FFT Material: pseudo-audio bars (spectrum visualizer) ──────────────
const fftInit: InitFn = ({ store }) => {
  store.bars = new Float32Array(64);
  store.targets = new Float32Array(64);
};
const fftTick: TickFn = ({ ctx, w, h, t, dt, m, store, dpr }) => {
  const bars = store.bars as Float32Array;
  const targets = store.targets as Float32Array;
  ctx.fillStyle = "#070708";
  ctx.fillRect(0, 0, w, h);
  const N = bars.length;
  for (let i = 0; i < N; i++) {
    const ph = i * 0.42;
    const beat = Math.max(0, Math.sin(t * 2.4 + ph) * 0.5 + 0.5);
    const groove = Math.max(0, Math.sin(t * 0.6 + ph * 0.3) * 0.4);
    const cursor = m.inside ? Math.max(0, 1 - Math.abs(i / N - m.x / w) * 5) * 0.6 : 0;
    targets[i] = Math.min(1, beat * 0.5 + groove + cursor);
    // Frame-rate-independent decay so spectrum bars rise at identical
    // speed on 60 / 120 / 144 / 240Hz panels.
    bars[i] = damp(bars[i], targets[i], K.K_FAST, dt);
  }
  const bw = w / N;
  for (let i = 0; i < N; i++) {
    const v = bars[i];
    const bh = v * h * 0.8;
    const x = i * bw;
    const grd = ctx.createLinearGradient(0, h - bh, 0, h);
    grd.addColorStop(0, "rgba(205,250,0,0.95)");
    grd.addColorStop(0.7, "rgba(227,191,180,0.7)");
    grd.addColorStop(1, "rgba(227,191,180,0.05)");
    ctx.fillStyle = grd;
    ctx.fillRect(x + 1 * dpr, h - bh, bw - 2 * dpr, bh);
    // mirror reflection
    ctx.fillStyle = `rgba(255,255,255,${v * 0.05})`;
    ctx.fillRect(x + 1 * dpr, h - bh, bw - 2 * dpr, 2 * dpr);
  }
  // floor line
  ctx.fillStyle = "rgba(239,236,233,0.16)";
  ctx.fillRect(0, h - 1, w, 1);
};

// ── 07 — Shader Storm: stripes, RGB sweep, scanlines ────────────────────────
// `seed` is read from the store so the tick function itself stays stable across
// renders (a fresh `tick` reference would tear down the canvas runtime).
const shaderStormInitFactory = (seed: number): InitFn => ({ store }) => {
  store.seed = seed;
};
const shaderStormTick: TickFn = ({ ctx, w, h, t, dpr, m, store }) => {
  const seed = (store.seed as number) ?? 0;
  return shaderStormBody(ctx, w, h, t, dpr, m, seed);
};
function shaderStormBody(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  dpr: number,
  m: Mouse,
  seed: number
) {
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, w, h);
    const stripeH = 6 * dpr;
    const cursorGain = m.inside ? 1 + (m.x / w) * 1.2 : 1;
    for (let y = 0; y < h; y += stripeH) {
      const k = (y / h) * 6 + t + seed;
      const r = 120 + Math.sin(k) * 100 * cursorGain;
      const g = 200 + Math.cos(k * 1.3) * 50;
      const b = 80 + Math.sin(k * 0.7) * 60;
      const off = Math.sin(t * 2 + y * 0.01) * 14 * dpr * cursorGain;
      ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, 0.22)`;
      ctx.fillRect(off, y, w, stripeH * 0.55);
      ctx.fillStyle = `rgba(255, 255, 255, 0.04)`;
      ctx.fillRect(0, y + stripeH * 0.55, w, stripeH * 0.45);
    }
    const sweep = (((t * 0.4) % 2) - 1) * h;
    const grad = ctx.createLinearGradient(0, sweep - 80, 0, sweep + 80);
    grad.addColorStop(0, "rgba(205,250,0,0)");
    grad.addColorStop(0.5, "rgba(205,250,0,0.18)");
    grad.addColorStop(1, "rgba(205,250,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
}

// ── 09 — Latency Canvas: frame-pacing dot heatmap ───────────────────────────
const latencyInit: InitFn = ({ store }) => {
  store.samples = [] as { dt: number }[];
  store.lastFrame = performance.now();
};
const latencyTick: TickFn = ({ ctx, w, h, store, m, dpr }) => {
  const now = performance.now();
  const dtMs = now - (store.lastFrame as number);
  store.lastFrame = now;
  const samples = store.samples as { dt: number }[];
  // Skip the first frame after IntersectionObserver paused us — the gap is
  // the entire offscreen duration, not actual jank, and would pollute the buffer.
  if (dtMs < 200) samples.push({ dt: dtMs });
  const max = Math.floor(w / (10 * dpr));
  while (samples.length > max) samples.shift();

  ctx.fillStyle = "#070708";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "rgba(239,236,233,0.07)";
  for (let i = 1; i < 5; i++) {
    const y = h - (i * 16.6) / 60 * h * 0.9;
    ctx.fillRect(0, y, w, 1);
  }

  const target = 16.6;
  const baseY = h - 28 * dpr;
  for (let i = 0; i < samples.length; i++) {
    const s = samples[i];
    const norm = Math.min(2, s.dt / target);
    const y = baseY - Math.min(h - 40 * dpr, norm * 60 * dpr);
    const danger = Math.min(1, Math.max(0, (s.dt - 16.6) / 22));
    const r = 80 + danger * 175;
    const g = 230 - danger * 180;
    const b = 60;
    const radius = 1.6 * dpr + danger * 2;
    ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${0.55 + danger * 0.4})`;
    ctx.beginPath();
    ctx.arc(8 * dpr + i * 10 * dpr, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  // budget label crosshair near cursor
  if (m.inside) {
    ctx.strokeStyle = "rgba(239,236,233,0.18)";
    ctx.beginPath();
    ctx.moveTo(m.x, 0);
    ctx.lineTo(m.x, h);
    ctx.stroke();
  }
};

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
        if (x >= 0 && x < cols && y >= 0 && y < rows && dx * dx + dy * dy <= r * r) {
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
    let x = sites[i * 4] + sites[i * 4 + 2];
    let y = sites[i * 4 + 1] + sites[i * 4 + 3];
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

// ── 12 — Flow Field (curl-noise vectors) ────────────────────────────────────
const flowTick: TickFn = ({ ctx, w, h, t, m, dpr, compact }) => {
  ctx.fillStyle = "#070708";
  ctx.fillRect(0, 0, w, h);
  const STEP = (compact ? 26 : 18) * dpr;
  ctx.lineCap = "round";
  ctx.lineWidth = 1 * dpr;
  for (let y = STEP; y < h; y += STEP) {
    for (let x = STEP; x < w; x += STEP) {
      const nx = x * 0.005 + t * 0.18;
      const ny = y * 0.005 - t * 0.12;
      let a =
        Math.sin(nx) * 0.7 +
        Math.cos(ny * 1.4) * 0.6 +
        Math.sin(nx + ny) * 0.3;
      a *= Math.PI * 0.6;
      // cursor injects rotational bias
      if (m.inside) {
        const dx = x - m.x;
        const dy = y - m.y;
        const d = Math.sqrt(dx * dx + dy * dy) + 1;
        const swirl = Math.atan2(dy, dx) + Math.PI / 2;
        const w2 = Math.min(1, (200 * dpr) / d);
        a = a * (1 - w2) + swirl * w2;
      }
      const len = STEP * 0.45;
      const ax = Math.cos(a) * len;
      const ay = Math.sin(a) * len;
      const bright = 0.15 + Math.abs(Math.sin(t + (x + y) * 0.003)) * 0.55;
      ctx.strokeStyle = `rgba(227,191,180,${bright})`;
      ctx.beginPath();
      ctx.moveTo(x - ax * 0.5, y - ay * 0.5);
      ctx.lineTo(x + ax * 0.5, y + ay * 0.5);
      ctx.stroke();
      // arrowhead dot
      ctx.fillStyle = `rgba(205,250,0,${bright * 0.7})`;
      ctx.fillRect(x + ax * 0.5 - 1, y + ay * 0.5 - 1, 2 * dpr, 2 * dpr);
    }
  }
};

// ── 13 — Lissajous Orbits ───────────────────────────────────────────────────
const lissaInit: InitFn = ({ store }) => {
  const aHist = new Float32Array(2);
  aHist[0] = 3;
  aHist[1] = 2;
  store.aHist = aHist;
};
const lissaTick: TickFn = ({ ctx, w, h, t, dt, m, dpr, compact, store }) => {
  ctx.fillStyle = "rgba(7,7,8,0.18)";
  ctx.fillRect(0, 0, w, h);
  const cx = w / 2;
  const cy = h / 2;
  const rx = w * 0.35;
  const ry = h * 0.32;
  const aHist = store.aHist as Float32Array;
  const targetA = m.inside ? 2 + (m.x / w) * 5 : 3;
  const targetB = m.inside ? 2 + (m.y / h) * 5 : 2;
  // Frame-rate-independent decay so the curve morphs at identical speed
  // on 60 / 120 / 144 / 240Hz panels.
  aHist[0] = damp(aHist[0], targetA, K.K_SLOW, dt);
  aHist[1] = damp(aHist[1], targetB, K.K_SLOW, dt);
  const a = aHist[0];
  const b = aHist[1];
  const layers = compact ? 2 : 4;
  for (let l = 0; l < layers; l++) {
    const phase = t * 0.4 + l * 0.6;
    ctx.beginPath();
    const N = compact ? 220 : 600;
    for (let i = 0; i <= N; i++) {
      const u = (i / N) * Math.PI * 2;
      const x = cx + rx * Math.sin(a * u + phase);
      const y = cy + ry * Math.sin(b * u);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = l === 0 ? "rgba(205,250,0,0.65)" : `rgba(227,191,180,${0.5 - l * 0.1})`;
    ctx.lineWidth = (l === 0 ? 1.4 : 0.9) * dpr;
    ctx.stroke();
  }
  // ratio readout dot
  ctx.fillStyle = "rgba(239,236,233,0.85)";
  ctx.fillRect(cx - 1, cy - 1, 2 * dpr, 2 * dpr);
};

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
    ctx.strokeStyle = m.shift && m.inside ? "rgba(255,120,90,0.7)" : "rgba(227,191,180,0.7)";
    ctx.lineWidth = 1.2 * dpr;
    ctx.beginPath();
    ctx.moveTo(nx, ny);
    ctx.lineTo(nx - Math.cos(angle) * len, ny - Math.sin(angle) * len);
    ctx.stroke();
  }
};

// ── 15 — Wave Interference ─────────────────────────────────────────────────
type WaveSource = { x: number; y: number; t0: number; hue: number };
const waveInit: InitFn = ({ store, w, h }) => {
  store.sources = [
    { x: w * 0.32, y: h * 0.42, t0: 0, hue: 30 },
    { x: w * 0.7, y: h * 0.6, t0: 0, hue: 60 },
  ] as WaveSource[];
};
const waveTick: TickFn = ({ ctx, w, h, t, m, store, dpr, compact }) => {
  ctx.fillStyle = "rgba(7,7,8,0.16)";
  ctx.fillRect(0, 0, w, h);
  const sources = store.sources as WaveSource[];
  // Click drops a permanent emitter (de-bounced via clickT).
  if (m.pressed && m.clickT > 0 && t - m.clickT < 0.06) {
    sources.push({ x: m.x, y: m.y, t0: t, hue: 200 + ((sources.length * 24) % 160) });
    if (sources.length > 6) sources.shift();
    m.clickT = -1;
  }

  ctx.globalCompositeOperation = "lighter";
  const ringStep = (compact ? 32 : 22) * dpr;
  const k = 0.06 / dpr;
  const omega = 5;
  const drawSource = (sx: number, sy: number, t0: number, hue: number, gain: number) => {
    const age = Math.max(0, t - t0);
    const fade = Math.exp(-age * 0.04);
    if (fade < 0.04) return;
    const reach = Math.hypot(w, h) * 0.6;
    for (let r = ringStep; r < reach; r += ringStep) {
      const phase = Math.cos(r * k - age * omega);
      const intensity = Math.max(0, phase) * fade;
      if (intensity < 0.05) continue;
      ctx.strokeStyle = `hsla(${hue},65%,68%,${intensity * 0.34 * gain})`;
      ctx.lineWidth = 1.4 * dpr;
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  };
  for (const s of sources) drawSource(s.x, s.y, s.t0, s.hue, 1);
  if (m.inside) drawSource(m.x, m.y, t - 1.5, 198, 1.1);

  // bright source dots
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "rgba(239,236,233,0.92)";
  for (const s of sources) ctx.fillRect(s.x - 1, s.y - 1, 2 * dpr, 2 * dpr);
};

// ── 16 — Kaleidoscope Mirror ───────────────────────────────────────────────
type KaleidoPoint = { x: number; y: number; t: number };
const kaleidoInit: InitFn = ({ store, ctx, w, h }) => {
  store.trail = [] as KaleidoPoint[];
  ctx.fillStyle = "#070708";
  ctx.fillRect(0, 0, w, h);
};
const kaleidoTick: TickFn = ({ ctx, w, h, t, m, store, dpr, compact }) => {
  // gentle ghosting so trails fade smoothly
  ctx.fillStyle = "rgba(7,7,8,0.07)";
  ctx.fillRect(0, 0, w, h);
  const tr = store.trail as KaleidoPoint[];
  // record cursor position (centred on canvas centre) only when moving
  if (m.inside && (Math.abs(m.vx) + Math.abs(m.vy)) > 0.4) {
    tr.push({ x: m.x - w / 2, y: m.y - h / 2, t });
    if (tr.length > (compact ? 60 : 120)) tr.shift();
  }
  if (tr.length < 2) return;

  const segments = 6;
  ctx.globalCompositeOperation = "lighter";
  ctx.lineCap = "round";
  for (let s = 0; s < segments; s++) {
    const ang = (s / segments) * Math.PI * 2;
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.rotate(ang);
    if (s % 2 === 0) ctx.scale(1, -1);
    for (let i = 1; i < tr.length; i++) {
      const a = tr[i - 1];
      const b = tr[i];
      const age = t - b.t;
      const alpha = Math.max(0, 1 - age / 3.5);
      if (alpha < 0.04) continue;
      const hue = (b.t * 28) % 360;
      ctx.strokeStyle = `hsla(${hue},70%,68%,${alpha * 0.55})`;
      ctx.lineWidth = (1.4 + alpha * 3) * dpr;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    ctx.restore();
  }
  ctx.globalCompositeOperation = "source-over";
};

// ── 17 — Metaballs Field ───────────────────────────────────────────────────
type Metaball = { x: number; y: number; vx: number; vy: number; r: number };
const metaInit: InitFn = ({ store, w, h, compact }) => {
  const N = compact ? 5 : 8;
  const arr: Metaball[] = [];
  for (let i = 0; i < N; i++) {
    arr.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 80,
      vy: (Math.random() - 0.5) * 80,
      r: (compact ? 60 : 90) + Math.random() * (compact ? 60 : 100),
    });
  }
  store.balls = arr;
};
const metaTick: TickFn = ({ ctx, w, h, dt, m, store }) => {
  const balls = store.balls as Metaball[];
  for (const b of balls) {
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    if (b.x < b.r) {
      b.x = b.r;
      b.vx = Math.abs(b.vx);
    } else if (b.x > w - b.r) {
      b.x = w - b.r;
      b.vx = -Math.abs(b.vx);
    }
    if (b.y < b.r) {
      b.y = b.r;
      b.vy = Math.abs(b.vy);
    } else if (b.y > h - b.r) {
      b.y = h - b.r;
      b.vy = -Math.abs(b.vy);
    }
  }
  ctx.fillStyle = "#070708";
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = "lighter";
  for (const b of balls) {
    const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
    grad.addColorStop(0, "rgba(247,196,159,0.85)");
    grad.addColorStop(0.45, "rgba(192,222,255,0.32)");
    grad.addColorStop(1, "rgba(247,196,159,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
  }
  if (m.inside) {
    const cr = 160;
    const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, cr);
    grad.addColorStop(0, "rgba(255,255,255,0.55)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(m.x, m.y, cr, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalCompositeOperation = "source-over";
};

// ── DOM-based: Variable Font (variable-font-scroll) ─────────────────────────
function VariableFontDemo({ compact }: { compact?: boolean }) {
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
    let last = performance.now();
    const tick = () => {
      const now = performance.now();
      const dt = clampDt((now - last) / 1000);
      last = now;
      // Frame-rate-independent decay back to neutral when the pointer
      // stops moving — same feel on 60/120/240Hz panels.
      weight = damp(weight, 450, K.K_HERO, dt);
      slant = damp(slant, 0, K.K_GENTLE, dt);
      stretch = damp(stretch, 90, K.K_HERO, dt);
      text.style.fontWeight = String(Math.max(200, Math.min(900, weight)));
      text.style.fontStretch = `${Math.max(70, Math.min(140, stretch))}%`;
      text.style.fontStyle = slant < -2 ? "italic" : "normal";
      text.style.transform = `skewX(${slant * 0.4}deg)`;
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              if (entry?.isIntersecting) start();
              else stop();
            },
            { rootMargin: "200px" }
          )
        : null;
    if (io) io.observe(wrap);
    else start();
    return () => {
      stop();
      io?.disconnect();
      wrap.removeEventListener("pointermove", onMove);
    };
  }, []);
  return (
    <div ref={wrapRef} className="absolute inset-0 flex items-center justify-center bg-ink-950">
      <div
        ref={textRef}
        className={`font-serif leading-none tracking-tightest text-warmwhite/85 will-change-transform ${
          compact ? "text-[clamp(2.4rem,9vw,5rem)]" : "text-[clamp(6rem,18vw,18rem)]"
        }`}
        style={{ fontVariationSettings: "'wght' 600, 'slnt' 0" }}
      >
        MOTION
      </div>
      {!compact && (
        <div className="pointer-events-none absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-widest text-warmwhite/65">
          Drag the mouse — type reacts to velocity
        </div>
      )}
    </div>
  );
}

// ── DOM-based: SDF Glyph (signed-distance-letters) ──────────────────────────
function SdfGlyphDemo({ compact }: { compact?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      wrap.style.setProperty("--mx", `${x * 100}%`);
      wrap.style.setProperty("--my", `${y * 100}%`);
    };
    wrap.addEventListener("pointermove", onMove);
    return () => wrap.removeEventListener("pointermove", onMove);
  }, []);
  const word = "GLYPH";
  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-ink-950"
      style={
        {
          backgroundImage:
            "radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), rgba(205,250,0,0.18), transparent 60%)",
        } as React.CSSProperties
      }
    >
      <div className="relative">
        {/* dilated outline echoes */}
        <span
          aria-hidden
          className={`absolute inset-0 font-serif leading-none tracking-tightest text-transparent ${
            compact ? "text-[clamp(2.4rem,10vw,5.5rem)]" : "text-[clamp(6rem,18vw,18rem)]"
          }`}
          style={{ WebkitTextStroke: "1px rgba(227,191,180,0.45)" }}
        >
          {word}
        </span>
        <span
          aria-hidden
          className={`absolute inset-0 font-serif leading-none tracking-tightest text-transparent translate-x-[6px] translate-y-[3px] ${
            compact ? "text-[clamp(2.4rem,10vw,5.5rem)]" : "text-[clamp(6rem,18vw,18rem)]"
          }`}
          style={{ WebkitTextStroke: "1px rgba(205,250,0,0.35)" }}
        >
          {word}
        </span>
        <span
          className={`relative font-serif leading-none tracking-tightest text-warmwhite ${
            compact ? "text-[clamp(2.4rem,10vw,5.5rem)]" : "text-[clamp(6rem,18vw,18rem)]"
          }`}
        >
          {word}
        </span>
      </div>
      {!compact && (
        <div className="pointer-events-none absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-widest text-warmwhite/65">
          SDF · move cursor for halo
        </div>
      )}
    </div>
  );
}

// Memoize the shader-storm init so the seed prop doesn't tear down the
// canvas runtime on every parent render.
function ShaderStormDemo({ seed, compact }: { seed: number; compact: boolean }) {
  const init = useMemo(() => shaderStormInitFactory(seed), [seed]);
  return (
    <CanvasDemo
      init={init}
      tick={shaderStormTick}
      compact={compact}
      fpsCap={compact ? 30 : 60}
    />
  );
}

// ── Dispatcher ──────────────────────────────────────────────────────────────
export function LabDemo({
  slug,
  seed,
  compact = false,
}: {
  slug: string;
  seed: number;
  compact?: boolean;
}) {
  switch (slug) {
    case "fluid-dynamics":
      return <CanvasDemo init={fluidInit} tick={fluidTick} compact={compact} fpsCap={compact ? 30 : 60} />;
    case "volumetric-lighting":
      return <CanvasDemo tick={volumetricTick} compact={compact} fpsCap={compact ? 30 : 60} />;
    case "particle-systems":
      return <CanvasDemo init={partSysInit} tick={partSysTick} compact={compact} fpsCap={compact ? 30 : 60} />;
    case "magnetic-cursor":
      return <CanvasDemo tick={magneticTick} compact={compact} fpsCap={compact ? 30 : 60} />;
    case "fft-material":
      return <CanvasDemo init={fftInit} tick={fftTick} compact={compact} fpsCap={compact ? 30 : 60} />;
    case "shader-storm":
      return <ShaderStormDemo seed={seed} compact={compact} />;
    case "latency-canvas":
      return <CanvasDemo init={latencyInit} tick={latencyTick} compact={compact} />;
    case "reaction-diffusion":
      return <CanvasDemo init={rdInit} tick={rdTick} compact={compact} fpsCap={compact ? 24 : 50} reseedOnClick />;
    case "voronoi-cells":
      return <CanvasDemo init={voronoiInit} tick={voronoiTick} compact={compact} fpsCap={compact ? 24 : 45} reseedOnClick />;
    case "flow-field":
      return <CanvasDemo tick={flowTick} compact={compact} fpsCap={compact ? 30 : 60} />;
    case "lissajous-orbits":
      return <CanvasDemo init={lissaInit} tick={lissaTick} compact={compact} fpsCap={compact ? 30 : 60} />;
    case "boids-flock":
      return <CanvasDemo init={boidsInit} tick={boidsTick} compact={compact} fpsCap={compact ? 30 : 60} reseedOnClick />;
    case "wave-interference":
      return <CanvasDemo init={waveInit} tick={waveTick} compact={compact} fpsCap={compact ? 24 : 48} />;
    case "kaleidoscope":
      return <CanvasDemo init={kaleidoInit} tick={kaleidoTick} compact={compact} fpsCap={compact ? 30 : 60} />;
    case "metaballs":
      return <CanvasDemo init={metaInit} tick={metaTick} compact={compact} fpsCap={compact ? 30 : 60} />;
    case "variable-font-scroll":
      return <VariableFontDemo compact={compact} />;
    case "signed-distance-letters":
      return <SdfGlyphDemo compact={compact} />;
    default:
      return <NoiseField seed={seed} />;
  }
}
