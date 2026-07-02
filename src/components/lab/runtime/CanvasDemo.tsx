"use client";

import { useEffect, useRef } from "react";
import {
  reconcileCanvasRuntimeBudget,
  registerCanvasRuntime,
} from "@/lib/canvasRuntimeBudget";
import { cappedDpr, DPR_CANVAS, DPR_COMPACT } from "@/lib/dpr";
import { onDeviceProfileChange } from "@/lib/deviceTier";

export type LabDemoModuleProps = {
  seed: number;
  compact: boolean;
};

export type Mouse = {
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

export type Store = Record<string, unknown>;

export type RenderState = {
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

export type TickFn = (s: RenderState) => void;
export type InitFn = (s: Omit<RenderState, "t" | "dt">) => void;

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
export function CanvasDemo({
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

    let dpr = compact ? cappedDpr(DPR_COMPACT) : cappedDpr(DPR_CANVAS);
    const m = emptyMouse();
    const store: Store = {};
    let reseedRequested = false;

    const fit = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;
      dpr = compact ? cappedDpr(DPR_COMPACT) : cappedDpr(DPR_CANVAS);
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
    const startLoop = () => {
      if (raf) return;
      if (!initialised) {
        fit();
        initialised = true;
      }
      last = performance.now();
      raf = requestAnimationFrame(tickFrame);
    };
    const stopLoop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const runtime = registerCanvasRuntime({ startLoop, stopLoop });
    const onResize = () => {
      if (initialised) fit();
      reconcileCanvasRuntimeBudget();
    };
    const unlistenProfileChange = onDeviceProfileChange(onResize);

    window.addEventListener("resize", onResize);

    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              runtime.setVisible(Boolean(entry?.isIntersecting));
            },
            { rootMargin: "160px", threshold: 0.01 },
          )
        : null;
    if (io) io.observe(canvas);
    else runtime.setVisible(true);

    return () => {
      runtime.dispose();
      io?.disconnect();
      unlistenProfileChange();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onCancel);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", onResize);
    };
  }, [init, tick, compact, fpsCap, reseedOnClick]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}


