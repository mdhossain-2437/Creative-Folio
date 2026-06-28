"use client";

import { useEffect, useMemo, useRef } from "react";
import { NoiseField } from "@/components/webgl/NoiseField";
import { damp, clampDt, K } from "@/lib/damp";
import { cappedDpr, DPR_CANVAS, DPR_COMPACT } from "@/lib/dpr";

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

    const dpr = compact ? cappedDpr(DPR_COMPACT) : cappedDpr(DPR_CANVAS);
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
        init({
          ctx,
          w: canvas.width,
          h: canvas.height,
          dpr,
          m,
          compact,
          store,
          reseed,
        });
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

    // Lazy initial sizing: paper § "Performance Budget" — defer the
    // first `fit()` (which calls each demo's `init()` and allocates
    // typed-array stores) until the canvas actually scrolls into the
    // viewport. The /lab grid mounts ~17 cards at once; without this
    // we'd allocate ~17 store contexts upfront for cards the user may
    // never scroll to.
    let initialised = false;

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
          init({
            ctx,
            w: canvas.width,
            h: canvas.height,
            dpr,
            m,
            compact,
            store,
            reseed,
          });
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
      if (!initialised) {
        fit();
        initialised = true;
      }
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
            { rootMargin: "200px" },
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
    const y = (((i * 89 + Math.sin(t + i) * 30 + h * 0.5) % h) + h) % h;
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
  const bursts = store.bursts as {
    x: number;
    y: number;
    r: number;
    life: number;
  }[];
  if (
    m.pressed &&
    (store.lastBurst === undefined || t - (store.lastBurst as number) > 0.18)
  ) {
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
    const cursor = m.inside
      ? Math.max(0, 1 - Math.abs(i / N - m.x / w) * 5) * 0.6
      : 0;
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
const shaderStormInitFactory =
  (seed: number): InitFn =>
  ({ store }) => {
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
  seed: number,
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
    const y = h - ((i * 16.6) / 60) * h * 0.9;
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
    const x = sites[i * 4] + sites[i * 4 + 2];
    const y = sites[i * 4 + 1] + sites[i * 4 + 3];
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
        Math.sin(nx) * 0.7 + Math.cos(ny * 1.4) * 0.6 + Math.sin(nx + ny) * 0.3;
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
    ctx.strokeStyle =
      l === 0 ? "rgba(205,250,0,0.65)" : `rgba(227,191,180,${0.5 - l * 0.1})`;
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
    ctx.strokeStyle =
      m.shift && m.inside ? "rgba(255,120,90,0.7)" : "rgba(227,191,180,0.7)";
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
    sources.push({
      x: m.x,
      y: m.y,
      t0: t,
      hue: 200 + ((sources.length * 24) % 160),
    });
    if (sources.length > 6) sources.shift();
    m.clickT = -1;
  }

  ctx.globalCompositeOperation = "lighter";
  const ringStep = (compact ? 32 : 22) * dpr;
  const k = 0.06 / dpr;
  const omega = 5;
  const drawSource = (
    sx: number,
    sy: number,
    t0: number,
    hue: number,
    gain: number,
  ) => {
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
  if (m.inside && Math.abs(m.vx) + Math.abs(m.vy) > 0.4) {
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
            { rootMargin: "200px" },
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
    <div
      ref={wrapRef}
      className="absolute inset-0 flex items-center justify-center bg-ink-950"
    >
      <div
        ref={textRef}
        className={`font-serif leading-none tracking-tightest text-warmwhite/85 will-change-transform ${
          compact
            ? "text-[clamp(2.4rem,9vw,5rem)]"
            : "text-[clamp(6rem,18vw,18rem)]"
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
            compact
              ? "text-[clamp(2.4rem,10vw,5.5rem)]"
              : "text-[clamp(6rem,18vw,18rem)]"
          }`}
          style={{ WebkitTextStroke: "1px rgba(227,191,180,0.45)" }}
        >
          {word}
        </span>
        <span
          aria-hidden
          className={`absolute inset-0 font-serif leading-none tracking-tightest text-transparent translate-x-[6px] translate-y-[3px] ${
            compact
              ? "text-[clamp(2.4rem,10vw,5.5rem)]"
              : "text-[clamp(6rem,18vw,18rem)]"
          }`}
          style={{ WebkitTextStroke: "1px rgba(205,250,0,0.35)" }}
        >
          {word}
        </span>
        <span
          className={`relative font-serif leading-none tracking-tightest text-warmwhite ${
            compact
              ? "text-[clamp(2.4rem,10vw,5.5rem)]"
              : "text-[clamp(6rem,18vw,18rem)]"
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

// ────────────────────────────────────────────────────────────────────────────
// ── Additional experiments 18 – 30 ──────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────
// Each demo below is a self-contained Canvas2D study. They follow the same
// budget rules as the originals — pause via IntersectionObserver, react to
// the cursor, write only into the existing `store` slot, and keep allocation
// to the init phase so the per-frame `tick` stays GC-quiet.

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

// ── 19 — Perlin Terrain (line-by-line scrolling heightfield) ────────────────
const terrainInit: InitFn = ({ store }) => {
  store.offset = 0;
  store.dir = 1;
};
const terrainTick: TickFn = ({ ctx, w, h, t, m, store, dpr, compact }) => {
  ctx.fillStyle = "rgba(12,12,12,0.32)";
  ctx.fillRect(0, 0, w, h);
  const step = compact ? 14 : 8;
  const cols = Math.ceil(w / step);
  if (m.pressed) store.dir = -(store.dir as number);
  store.offset = (store.offset as number) + (store.dir as number) * 0.5;
  const off = store.offset as number;
  const hover = m.inside ? Math.max(0, 1 - Math.abs(m.x - w / 2) / (w / 2)) : 0;
  const layers = 18;
  for (let l = 0; l < layers; l++) {
    const yBase = h * 0.35 + (l / layers) * (h * 0.55);
    ctx.beginPath();
    for (let c = 0; c <= cols; c++) {
      const x = c * step;
      const noise =
        Math.sin((c + off + l * 12) * 0.07) * 18 +
        Math.sin((c + off * 0.6 + l * 4) * 0.21) * 10 +
        Math.cos((c + off * 0.3) * 0.05 + l) * 8;
      const lift = hover * 36 * Math.exp(-Math.pow((x - m.x) / (w * 0.18), 2));
      const y = yBase + noise - lift - (1 - l / layers) * 22;
      if (c === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    const alpha = 0.06 + l * 0.025;
    ctx.fillStyle = `rgba(227,191,180,${alpha})`;
    ctx.fill();
    ctx.strokeStyle = `rgba(255,225,210,${0.18 + l * 0.012})`;
    ctx.lineWidth = Math.max(1, 0.8 * dpr);
    ctx.stroke();
  }
  // horizon glow
  const sun = ctx.createRadialGradient(
    w / 2,
    h * 0.32,
    0,
    w / 2,
    h * 0.32,
    w * 0.4,
  );
  sun.addColorStop(0, "rgba(255,210,170,0.18)");
  sun.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = sun;
  ctx.fillRect(0, 0, w, h);
  void t;
};

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

// ── 21 — Starfield Warp ─────────────────────────────────────────────────────
const starInit: InitFn = ({ store, compact }) => {
  const N = compact ? 220 : 520;
  const arr = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    arr[i * 3] = Math.random() * 2 - 1;
    arr[i * 3 + 1] = Math.random() * 2 - 1;
    arr[i * 3 + 2] = Math.random();
  }
  store.stars = arr;
  store.N = N;
  store.warp = 1;
};
const starTick: TickFn = ({ ctx, w, h, dt, m, store, dpr }) => {
  const arr = store.stars as Float32Array;
  const N = store.N as number;
  ctx.fillStyle = "rgba(8,8,10,0.32)";
  ctx.fillRect(0, 0, w, h);
  const cx = m.inside ? m.x : w * 0.5;
  const cy = m.inside ? m.y : h * 0.5;
  const targetWarp = m.pressed ? 3.6 : 1.3;
  store.warp =
    (store.warp as number) + (targetWarp - (store.warp as number)) * dt * 3;
  const warp = store.warp as number;
  ctx.lineCap = "round";
  for (let i = 0; i < N; i++) {
    const ix = i * 3;
    let z = arr[ix + 2];
    z -= dt * 0.5 * warp;
    if (z <= 0.02) {
      arr[ix] = Math.random() * 2 - 1;
      arr[ix + 1] = Math.random() * 2 - 1;
      z = 1;
    }
    arr[ix + 2] = z;
    const px = arr[ix] / z;
    const py = arr[ix + 1] / z;
    const x = cx + px * w * 0.5;
    const y = cy + py * h * 0.5;
    const tail = warp * 12;
    const pz = Math.min(1, z + 0.03);
    const x2 = cx + (arr[ix] / pz) * w * 0.5;
    const y2 = cy + (arr[ix + 1] / pz) * h * 0.5;
    const a = (1 - z) * 0.9;
    ctx.strokeStyle = `rgba(255,236,222,${a})`;
    ctx.lineWidth = (1 + (1 - z) * 2.5) * dpr;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - (x - x2) * tail * 0.06, y - (y - y2) * tail * 0.06);
    ctx.stroke();
  }
};

// ── 22 — Vortex Spiral ──────────────────────────────────────────────────────
const vortexInit: InitFn = ({ store, compact }) => {
  const N = compact ? 280 : 720;
  const arr = new Float32Array(N * 3); // a, r, life
  for (let i = 0; i < N; i++) {
    arr[i * 3] = Math.random() * Math.PI * 2;
    arr[i * 3 + 1] = Math.random();
    arr[i * 3 + 2] = Math.random();
  }
  store.parts = arr;
  store.N = N;
};
const vortexTick: TickFn = ({ ctx, w, h, t, m, store, dpr }) => {
  const arr = store.parts as Float32Array;
  const N = store.N as number;
  ctx.fillStyle = "rgba(10,10,12,0.30)";
  ctx.fillRect(0, 0, w, h);
  const cx = m.inside ? m.x : w / 2;
  const cy = m.inside ? m.y : h / 2;
  const inward = m.pressed ? -0.4 : 0.18;
  const maxR = Math.min(w, h) * 0.48;
  ctx.fillStyle = "rgba(227,191,180,0.85)";
  for (let i = 0; i < N; i++) {
    const ix = i * 3;
    let a = arr[ix];
    let r = arr[ix + 1];
    a += 0.012 + (1 - r) * 0.04;
    r += inward * 0.004;
    if (r > 1) r = 0;
    if (r < 0) r = 1;
    arr[ix] = a;
    arr[ix + 1] = r;
    const rr = r * maxR * (1 + Math.sin(t + i * 0.7) * 0.02);
    const x = cx + Math.cos(a) * rr;
    const y = cy + Math.sin(a) * rr;
    const s = (1.2 + (1 - r) * 2.4) * dpr;
    ctx.fillRect(x - s / 2, y - s / 2, s, s);
  }
};

// ── 23 — Rope Physics (Verlet chain) ────────────────────────────────────────
const ropeInit: InitFn = ({ w, h, store, compact }) => {
  const N = compact ? 28 : 48;
  const seg = (h * 0.85) / N;
  const arr = new Float32Array(N * 4); // x, y, px, py
  for (let i = 0; i < N; i++) {
    arr[i * 4] = w * 0.5;
    arr[i * 4 + 1] = h * 0.08 + i * seg;
    arr[i * 4 + 2] = arr[i * 4];
    arr[i * 4 + 3] = arr[i * 4 + 1];
  }
  store.rope = arr;
  store.N = N;
  store.seg = seg;
};
const ropeTick: TickFn = ({ ctx, w, h, m, store, dpr }) => {
  const arr = store.rope as Float32Array;
  const N = store.N as number;
  const seg = store.seg as number;
  ctx.fillStyle = "rgba(10,10,12,0.40)";
  ctx.fillRect(0, 0, w, h);
  // verlet step
  const g = 0.6;
  const friction = 0.992;
  for (let i = 0; i < N; i++) {
    const ix = i * 4;
    const x = arr[ix];
    const y = arr[ix + 1];
    const vx = (x - arr[ix + 2]) * friction;
    const vy = (y - arr[ix + 3]) * friction;
    arr[ix + 2] = x;
    arr[ix + 3] = y;
    arr[ix] = x + vx;
    arr[ix + 1] = y + vy + g;
  }
  // pin top
  arr[0] = w * 0.5;
  arr[1] = h * 0.08;
  // pin tail to cursor when held
  if (m.inside && m.pressed) {
    const last = (N - 1) * 4;
    arr[last] = m.x;
    arr[last + 1] = m.y;
  }
  // constraint passes
  for (let pass = 0; pass < 4; pass++) {
    for (let i = 0; i < N - 1; i++) {
      const ax = i * 4;
      const bx = (i + 1) * 4;
      const dx = arr[bx] - arr[ax];
      const dy = arr[bx + 1] - arr[ax + 1];
      const d = Math.hypot(dx, dy) || 0.0001;
      const diff = (seg - d) / d;
      const ox = dx * 0.5 * diff;
      const oy = dy * 0.5 * diff;
      if (i !== 0) {
        arr[ax] -= ox;
        arr[ax + 1] -= oy;
      }
      arr[bx] += ox;
      arr[bx + 1] += oy;
    }
  }
  // draw
  ctx.strokeStyle = "rgba(227,191,180,0.85)";
  ctx.lineWidth = 3 * dpr;
  ctx.beginPath();
  ctx.moveTo(arr[0], arr[1]);
  for (let i = 1; i < N; i++) ctx.lineTo(arr[i * 4], arr[i * 4 + 1]);
  ctx.stroke();
  // weight at the tail
  const last = (N - 1) * 4;
  ctx.fillStyle = "rgba(255,225,210,0.95)";
  ctx.beginPath();
  ctx.arc(arr[last], arr[last + 1], 10 * dpr, 0, Math.PI * 2);
  ctx.fill();
};

// ── 24 — Plasma Classic ─────────────────────────────────────────────────────
const plasmaTick: TickFn = ({ ctx, w, h, t, m, dpr }) => {
  const step = Math.max(6, Math.floor(8 * dpr));
  const offsetX = m.inside ? (m.x / w - 0.5) * 4 : 0;
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const v =
        Math.sin(x * 0.012 + t) +
        Math.sin(y * 0.018 + t * 1.3) +
        Math.sin((x + y) * 0.01 + t * 0.7 + offsetX) +
        Math.sin(Math.sqrt((x - w / 2) ** 2 + (y - h / 2) ** 2) * 0.012 + t);
      const v01 = (v + 4) / 8;
      const hue = 18 + v01 * 35;
      const sat = 50 + v01 * 30;
      const lit = 35 + v01 * 30;
      ctx.fillStyle = `hsl(${hue} ${sat}% ${lit}%)`;
      ctx.fillRect(x, y, step, step);
    }
  }
};

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

// ── 26 — Rotation Blur (motion-blurred pinwheel) ────────────────────────────
const rotInit: InitFn = ({ store }) => {
  store.angle = 0;
  store.vel = 0.6;
};
const rotTick: TickFn = ({ ctx, w, h, dt, m, store, dpr }) => {
  // progressive blur — paint dark with low alpha so prior frames bleed.
  ctx.fillStyle = "rgba(10,10,12,0.18)";
  ctx.fillRect(0, 0, w, h);
  const targetVel = m.inside ? Math.hypot(m.vx, m.vy) * 0.02 + 0.2 : 0.4;
  store.vel =
    (store.vel as number) + (targetVel - (store.vel as number)) * dt * 4;
  store.angle = (store.angle as number) + (store.vel as number) * dt * 4;
  const cx = w * 0.5;
  const cy = h * 0.5;
  const radius = Math.min(w, h) * 0.4;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(store.angle as number);
  const spokes = 12;
  for (let i = 0; i < spokes; i++) {
    const a = (i / spokes) * Math.PI * 2;
    const x = Math.cos(a) * radius;
    const y = Math.sin(a) * radius;
    ctx.strokeStyle = `rgba(227,191,180,${0.4 + (i / spokes) * 0.5})`;
    ctx.lineWidth = 4 * dpr;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.fillStyle = "rgba(255,225,210,0.95)";
    ctx.beginPath();
    ctx.arc(x, y, 6 * dpr, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
};

// ── 27 — Constellation Net ──────────────────────────────────────────────────
const netInit: InitFn = ({ w, h, store, compact }) => {
  const N = compact ? 36 : 80;
  const arr = new Float32Array(N * 4); // x, y, vx, vy
  for (let i = 0; i < N; i++) {
    arr[i * 4] = Math.random() * w;
    arr[i * 4 + 1] = Math.random() * h;
    arr[i * 4 + 2] = (Math.random() - 0.5) * 0.4;
    arr[i * 4 + 3] = (Math.random() - 0.5) * 0.4;
  }
  store.nodes = arr;
  store.N = N;
};
const netTick: TickFn = ({ ctx, w, h, m, store, dpr }) => {
  const arr = store.nodes as Float32Array;
  const N = store.N as number;
  ctx.fillStyle = "rgba(8,8,10,0.40)";
  ctx.fillRect(0, 0, w, h);
  const linkR = Math.min(w, h) * 0.18;
  const linkR2 = linkR * linkR;
  // move
  for (let i = 0; i < N; i++) {
    const ix = i * 4;
    arr[ix] += arr[ix + 2];
    arr[ix + 1] += arr[ix + 3];
    if (arr[ix] < 0 || arr[ix] > w) arr[ix + 2] *= -1;
    if (arr[ix + 1] < 0 || arr[ix + 1] > h) arr[ix + 3] *= -1;
  }
  // links
  for (let i = 0; i < N; i++) {
    const ix = i * 4;
    for (let j = i + 1; j < N; j++) {
      const jx = j * 4;
      const dx = arr[ix] - arr[jx];
      const dy = arr[ix + 1] - arr[jx + 1];
      const d2 = dx * dx + dy * dy;
      if (d2 > linkR2) continue;
      const a = 1 - d2 / linkR2;
      ctx.strokeStyle = `rgba(227,191,180,${a * 0.6})`;
      ctx.lineWidth = Math.max(0.6, dpr * 0.6);
      ctx.beginPath();
      ctx.moveTo(arr[ix], arr[ix + 1]);
      ctx.lineTo(arr[jx], arr[jx + 1]);
      ctx.stroke();
    }
  }
  // cursor node
  if (m.inside) {
    for (let i = 0; i < N; i++) {
      const ix = i * 4;
      const dx = arr[ix] - m.x;
      const dy = arr[ix + 1] - m.y;
      const d2 = dx * dx + dy * dy;
      if (d2 > linkR2 * 2) continue;
      const a = 1 - d2 / (linkR2 * 2);
      ctx.strokeStyle = `rgba(255,225,210,${a})`;
      ctx.lineWidth = Math.max(1, dpr);
      ctx.beginPath();
      ctx.moveTo(arr[ix], arr[ix + 1]);
      ctx.lineTo(m.x, m.y);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(255,225,210,1)";
    ctx.beginPath();
    ctx.arc(m.x, m.y, 6 * dpr, 0, Math.PI * 2);
    ctx.fill();
  }
  // node dots
  ctx.fillStyle = "rgba(227,191,180,0.85)";
  for (let i = 0; i < N; i++) {
    const ix = i * 4;
    ctx.fillRect(arr[ix] - dpr, arr[ix + 1] - dpr, 2 * dpr, 2 * dpr);
  }
};

// ── 28 — Morphing Blob (super-formula) ──────────────────────────────────────
const blobInit: InitFn = ({ store }) => {
  store.frozen = false;
};
const blobTick: TickFn = ({ ctx, w, h, t, m, store, dpr }) => {
  if (m.pressed) store.frozen = !store.frozen;
  ctx.fillStyle = "rgba(10,10,12,0.36)";
  ctx.fillRect(0, 0, w, h);
  const cx = w * 0.5;
  const cy = h * 0.5;
  const r = Math.min(w, h) * 0.32;
  const time = store.frozen ? 0 : t;
  const samples = 220;
  ctx.strokeStyle = "rgba(227,191,180,0.95)";
  ctx.lineWidth = 2 * dpr;
  ctx.beginPath();
  for (let i = 0; i <= samples; i++) {
    const a = (i / samples) * Math.PI * 2;
    // super-formula radius
    const m1 = 6 + Math.sin(time * 0.4) * 2;
    const rad =
      r *
      (1 +
        Math.sin(a * m1 + time * 1.2) * 0.12 +
        Math.cos(a * (m1 + 2) - time) * 0.08);
    let x = cx + Math.cos(a) * rad;
    let y = cy + Math.sin(a) * rad;
    if (m.inside) {
      const dx = m.x - x;
      const dy = m.y - y;
      const d = Math.hypot(dx, dy);
      if (d < r) {
        const f = (1 - d / r) * 30;
        x += dx * 0.02 + f * Math.cos(a);
        y += dy * 0.02 + f * Math.sin(a);
      }
    }
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
  // inner glow
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  glow.addColorStop(0, "rgba(255,225,210,0.18)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);
};

// ── 29 — Chromatic Aberration (typographic) ─────────────────────────────────
const chromaInit: InitFn = ({ store }) => {
  store.shake = 0;
};
const chromaTick: TickFn = ({ ctx, w, h, dt, m, store, dpr }) => {
  const targetShake = m.inside ? Math.hypot(m.vx, m.vy) * 0.4 : 0.6;
  store.shake =
    (store.shake as number) + (targetShake - (store.shake as number)) * dt * 6;
  const shake = Math.min(40, store.shake as number);
  ctx.fillStyle = "rgba(10,10,12,0.42)";
  ctx.fillRect(0, 0, w, h);
  const text = "DELOWAR · HOSSAIN";
  const size = Math.min(w / 8, h / 3);
  ctx.font = `bold ${size}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const cx = w / 2;
  const cy = h / 2;
  ctx.globalCompositeOperation = "lighter";
  ctx.fillStyle = "rgba(255,72,72,0.85)";
  ctx.fillText(text, cx - shake * dpr, cy);
  ctx.fillStyle = "rgba(72,255,168,0.85)";
  ctx.fillText(text, cx, cy);
  ctx.fillStyle = "rgba(72,168,255,0.85)";
  ctx.fillText(text, cx + shake * dpr, cy);
  ctx.globalCompositeOperation = "source-over";
};

// ── 30 — Paper Folding ──────────────────────────────────────────────────────
const foldInit: InitFn = ({ store }) => {
  store.last = 0;
};
const foldTick: TickFn = ({ ctx, w, h, t, m, dpr, compact }) => {
  ctx.fillStyle = "#0a0a0c";
  ctx.fillRect(0, 0, w, h);
  const cell = compact ? 38 : 28;
  const cx = m.inside ? m.x : w / 2;
  const cy = m.inside ? m.y : h / 2;
  for (let y = -cell; y < h + cell; y += cell) {
    for (let x = -cell; x < w + cell; x += cell) {
      const dx = x + cell / 2 - cx;
      const dy = y + cell / 2 - cy;
      const d = Math.hypot(dx, dy);
      const noise =
        Math.sin(x * 0.02 + t * 0.6) + Math.cos(y * 0.025 + t * 0.5);
      const lift = Math.exp(-d / (w * 0.18)) * 0.6 + noise * 0.18;
      const shade = Math.max(0, Math.min(1, 0.4 + lift * 0.45));
      ctx.fillStyle = `rgba(227,191,180,${shade * 0.85})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + cell, y);
      ctx.lineTo(x, y + cell);
      ctx.closePath();
      ctx.fill();
      const shade2 = Math.max(0, Math.min(1, 0.5 - lift * 0.45));
      ctx.fillStyle = `rgba(255,225,210,${shade2 * 0.6})`;
      ctx.beginPath();
      ctx.moveTo(x + cell, y);
      ctx.lineTo(x + cell, y + cell);
      ctx.lineTo(x, y + cell);
      ctx.closePath();
      ctx.fill();
    }
  }
  // outline grid for crease feel
  ctx.strokeStyle = "rgba(8,8,10,0.45)";
  ctx.lineWidth = Math.max(0.6, dpr * 0.7);
  for (let x = 0; x < w; x += cell) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
};

// Memoize the shader-storm init so the seed prop doesn't tear down the
// canvas runtime on every parent render.
function ShaderStormDemo({
  seed,
  compact,
}: {
  seed: number;
  compact: boolean;
}) {
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
      return (
        <CanvasDemo
          init={fluidInit}
          tick={fluidTick}
          compact={compact}
          fpsCap={compact ? 30 : 60}
        />
      );
    case "volumetric-lighting":
      return (
        <CanvasDemo
          tick={volumetricTick}
          compact={compact}
          fpsCap={compact ? 30 : 60}
        />
      );
    case "particle-systems":
      return (
        <CanvasDemo
          init={partSysInit}
          tick={partSysTick}
          compact={compact}
          fpsCap={compact ? 30 : 60}
        />
      );
    case "magnetic-cursor":
      return (
        <CanvasDemo
          tick={magneticTick}
          compact={compact}
          fpsCap={compact ? 30 : 60}
        />
      );
    case "fft-material":
      return (
        <CanvasDemo
          init={fftInit}
          tick={fftTick}
          compact={compact}
          fpsCap={compact ? 30 : 60}
        />
      );
    case "shader-storm":
      return <ShaderStormDemo seed={seed} compact={compact} />;
    case "latency-canvas":
      return (
        <CanvasDemo init={latencyInit} tick={latencyTick} compact={compact} />
      );
    case "reaction-diffusion":
      return (
        <CanvasDemo
          init={rdInit}
          tick={rdTick}
          compact={compact}
          fpsCap={compact ? 24 : 50}
          reseedOnClick
        />
      );
    case "voronoi-cells":
      return (
        <CanvasDemo
          init={voronoiInit}
          tick={voronoiTick}
          compact={compact}
          fpsCap={compact ? 24 : 45}
          reseedOnClick
        />
      );
    case "flow-field":
      return (
        <CanvasDemo
          tick={flowTick}
          compact={compact}
          fpsCap={compact ? 30 : 60}
        />
      );
    case "lissajous-orbits":
      return (
        <CanvasDemo
          init={lissaInit}
          tick={lissaTick}
          compact={compact}
          fpsCap={compact ? 30 : 60}
        />
      );
    case "boids-flock":
      return (
        <CanvasDemo
          init={boidsInit}
          tick={boidsTick}
          compact={compact}
          fpsCap={compact ? 30 : 60}
          reseedOnClick
        />
      );
    case "wave-interference":
      return (
        <CanvasDemo
          init={waveInit}
          tick={waveTick}
          compact={compact}
          fpsCap={compact ? 24 : 48}
        />
      );
    case "kaleidoscope":
      return (
        <CanvasDemo
          init={kaleidoInit}
          tick={kaleidoTick}
          compact={compact}
          fpsCap={compact ? 30 : 60}
        />
      );
    case "metaballs":
      return (
        <CanvasDemo
          init={metaInit}
          tick={metaTick}
          compact={compact}
          fpsCap={compact ? 30 : 60}
        />
      );
    case "variable-font-scroll":
      return <VariableFontDemo compact={compact} />;
    case "signed-distance-letters":
      return <SdfGlyphDemo compact={compact} />;
    case "truchet-tiles":
      return (
        <CanvasDemo
          init={truchetInit}
          tick={truchetTick}
          compact={compact}
          fpsCap={compact ? 24 : 40}
        />
      );
    case "perlin-terrain":
      return (
        <CanvasDemo
          init={terrainInit}
          tick={terrainTick}
          compact={compact}
          fpsCap={compact ? 24 : 48}
        />
      );
    case "dvd-bouncer":
      return (
        <CanvasDemo
          init={dvdInit}
          tick={dvdTick}
          compact={compact}
          fpsCap={compact ? 30 : 60}
        />
      );
    case "starfield-warp":
      return (
        <CanvasDemo
          init={starInit}
          tick={starTick}
          compact={compact}
          fpsCap={compact ? 30 : 60}
        />
      );
    case "vortex-spiral":
      return (
        <CanvasDemo
          init={vortexInit}
          tick={vortexTick}
          compact={compact}
          fpsCap={compact ? 30 : 60}
        />
      );
    case "rope-physics":
      return (
        <CanvasDemo
          init={ropeInit}
          tick={ropeTick}
          compact={compact}
          fpsCap={compact ? 30 : 60}
        />
      );
    case "plasma-classic":
      return (
        <CanvasDemo
          tick={plasmaTick}
          compact={compact}
          fpsCap={compact ? 22 : 36}
        />
      );
    case "sand-piles":
      return (
        <CanvasDemo
          init={sandInit}
          tick={sandTick}
          compact={compact}
          fpsCap={compact ? 24 : 45}
        />
      );
    case "rotation-blur":
      return (
        <CanvasDemo
          init={rotInit}
          tick={rotTick}
          compact={compact}
          fpsCap={compact ? 30 : 60}
        />
      );
    case "constellation-net":
      return (
        <CanvasDemo
          init={netInit}
          tick={netTick}
          compact={compact}
          fpsCap={compact ? 24 : 50}
        />
      );
    case "morphing-blob":
      return (
        <CanvasDemo
          init={blobInit}
          tick={blobTick}
          compact={compact}
          fpsCap={compact ? 30 : 60}
        />
      );
    case "chromatic-aberration":
      return (
        <CanvasDemo
          init={chromaInit}
          tick={chromaTick}
          compact={compact}
          fpsCap={compact ? 30 : 60}
        />
      );
    case "paper-folding":
      return (
        <CanvasDemo
          init={foldInit}
          tick={foldTick}
          compact={compact}
          fpsCap={compact ? 20 : 36}
        />
      );
    default:
      return <NoiseField seed={seed} />;
  }
}
