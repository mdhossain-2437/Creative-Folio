"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { unlock } from "@/lib/achievements";
import { clampDt } from "@/lib/damp";

export type ConstellationStar = {
  label: string;
  href: string;
  group: "core" | "studio" | "works" | "lab" | "journal" | "legal";
  size: "sm" | "md" | "lg";
};

// Match GROUP_COLOR on /atlas — keep parity with the static section above.
const GROUP_RGBA: Record<ConstellationStar["group"], string> = {
  core: "rgba(239, 236, 233, 1)",
  studio: "rgba(227, 191, 180, 1)",
  works: "rgba(205, 250, 0, 1)",
  lab: "rgba(239, 236, 233, 0.78)",
  journal: "rgba(239, 236, 233, 0.66)",
  legal: "rgba(239, 236, 233, 0.42)",
};

const SIZE_PX: Record<ConstellationStar["size"], number> = { sm: 4, md: 6, lg: 9 };

type Placed = ConstellationStar & { x: number; y: number; r: number; vx: number; vy: number };

function hashedPos(seed: number) {
  const a = Math.sin(seed * 12.9898) * 43758.5453;
  const b = Math.sin(seed * 78.233) * 43758.5453;
  return { x: a - Math.floor(a), y: b - Math.floor(b) };
}

export function AtlasConstellation({ stars }: { stars: ConstellationStar[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const [hovered, setHovered] = useState<{ s: ConstellationStar; x: number; y: number } | null>(null);

  useEffect(() => {
    unlock("cartographer");
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const placed: Placed[] = stars.map((s, i) => {
      const { x, y } = hashedPos(i + 7);
      return {
        ...s,
        x: 0.06 + x * 0.88,
        y: 0.06 + y * 0.88,
        r: SIZE_PX[s.size],
        vx: (Math.random() - 0.5) * 0.00012,
        vy: (Math.random() - 0.5) * 0.00012,
      };
    });

    let cw = 0;
    let ch = 0;
    const fit = () => {
      cw = canvas.clientWidth * dpr;
      ch = canvas.clientHeight * dpr;
      canvas.width = cw;
      canvas.height = ch;
    };
    fit();

    let pointerX = -1000;
    let pointerY = -1000;
    let pressX: number | null = null;
    let pressY: number | null = null;
    let dragging = false;
    let panX = 0;
    let panY = 0;
    let scale = 1;
    let raf = 0;

    const setHoverFor = (sx: number, sy: number) => {
      // sx/sy in client coords (CSS px)
      let best: Placed | null = null;
      let bestD = Number.POSITIVE_INFINITY;
      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;
      for (const p of placed) {
        const px = (p.x * cssW * scale + panX);
        const py = (p.y * cssH * scale + panY);
        const dx = sx - px;
        const dy = sy - py;
        const d2 = dx * dx + dy * dy;
        const hitR = (p.r + 12);
        if (d2 < hitR * hitR && d2 < bestD) {
          best = p;
          bestD = d2;
        }
      }
      if (best) setHovered({ s: best, x: sx, y: sy });
      else setHovered(null);
    };

    const onPointerMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointerX = e.clientX - r.left;
      pointerY = e.clientY - r.top;
      if (dragging && pressX !== null && pressY !== null) {
        panX += pointerX - pressX;
        panY += pointerY - pressY;
        pressX = pointerX;
        pressY = pointerY;
      }
      setHoverFor(pointerX, pointerY);
    };
    const onPointerDown = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pressX = e.clientX - r.left;
      pressY = e.clientY - r.top;
      dragging = false;
      canvas.setPointerCapture(e.pointerId);
    };
    const onPointerMoveDrag = (e: PointerEvent) => {
      if (pressX !== null && pressY !== null) {
        const r = canvas.getBoundingClientRect();
        const cx = e.clientX - r.left;
        const cy = e.clientY - r.top;
        if (Math.abs(cx - pressX) + Math.abs(cy - pressY) > 6) dragging = true;
      }
    };
    const onPointerUp = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const ux = e.clientX - r.left;
      const uy = e.clientY - r.top;
      if (!dragging) {
        // tap → navigate to nearest star
        let best: Placed | null = null;
        let bestD = Number.POSITIVE_INFINITY;
        for (const p of placed) {
          const px = p.x * canvas.clientWidth * scale + panX;
          const py = p.y * canvas.clientHeight * scale + panY;
          const dx = ux - px;
          const dy = uy - py;
          const d2 = dx * dx + dy * dy;
          const hitR = p.r + 14;
          if (d2 < hitR * hitR && d2 < bestD) {
            best = p;
            bestD = d2;
          }
        }
        if (best) router.push(best.href);
      }
      dragging = false;
      pressX = null;
      pressY = null;
      try { canvas.releasePointerCapture(e.pointerId); } catch { /* noop */ }
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const r = canvas.getBoundingClientRect();
      const cx = e.clientX - r.left;
      const cy = e.clientY - r.top;
      const f = e.deltaY < 0 ? 1.08 : 1 / 1.08;
      const newScale = Math.max(0.5, Math.min(3, scale * f));
      const k = newScale / scale;
      panX = cx - k * (cx - panX);
      panY = cy - k * (cy - panY);
      scale = newScale;
    };
    const onLeave = () => setHovered(null);

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointermove", onPointerMoveDrag);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", fit);

    let lastFrame = performance.now();
    const tick = () => {
      const now = performance.now();
      const dt = clampDt((now - lastFrame) / 1000);
      lastFrame = now;
      // Normalize the original 60fps-tuned velocity (0.00012 per frame)
      // to seconds, so star drift looks identical at 60 / 90 / 120 / 144Hz
      // (paper § "Mathematical Precision in Interaction Design").
      const dtScale = dt * 60;
      ctx.clearRect(0, 0, cw, ch);

      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;

      // ── connection lines (proximity)
      ctx.strokeStyle = "rgba(239, 236, 233, 0.07)";
      ctx.lineWidth = 1 * dpr;
      const screen = placed.map((p) => ({
        sx: (p.x * cssW * scale + panX) * dpr,
        sy: (p.y * cssH * scale + panY) * dpr,
        p,
      }));
      const N = screen.length;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = screen[i];
          const b = screen[j];
          const dx = a.sx - b.sx;
          const dy = a.sy - b.sy;
          const d2 = dx * dx + dy * dy;
          const link = (140 * dpr * scale);
          if (d2 < link * link) {
            const t = 1 - Math.sqrt(d2) / link;
            ctx.globalAlpha = 0.05 + t * 0.18;
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // ── ambient drift (frame-rate independent)
      for (const p of placed) {
        p.x += p.vx * dtScale;
        p.y += p.vy * dtScale;
        if (p.x < 0.02 || p.x > 0.98) p.vx *= -1;
        if (p.y < 0.02 || p.y > 0.98) p.vy *= -1;
      }

      // ── stars
      for (const sp of screen) {
        const { p, sx, sy } = sp;
        const dx = pointerX * dpr - sx;
        const dy = pointerY * dpr - sy;
        const d = Math.sqrt(dx * dx + dy * dy);
        const near = Math.max(0, 1 - d / (90 * dpr));
        const r = (p.r + near * 6) * dpr * (0.85 + scale * 0.15);
        ctx.fillStyle = GROUP_RGBA[p.group];
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
        if (near > 0.05) {
          ctx.beginPath();
          ctx.arc(sx, sy, r + 8 * dpr * near, 0, Math.PI * 2);
          ctx.fillStyle = GROUP_RGBA[p.group].replace(", 1)", `, ${near * 0.18})`).replace(/,\s*[\d.]+\)$/, `, ${near * 0.18})`);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Pause atlas rendering when scrolled off-screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !raf) {
          raf = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0.01 },
    );
    io.observe(canvas);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointermove", onPointerMoveDrag);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", fit);
    };
  }, [stars, router]);

  return (
    <div className="relative h-[68vh] min-h-[520px] overflow-hidden rounded-3xl border border-warmwhite/15 bg-ink-900">
      <canvas
        ref={canvasRef}
        aria-label="Interactive site map"
        data-cursor="view"
        data-cursor-label="DRAG · ZOOM · TAP"
        className="atlas-canvas absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing"
      />
      {hovered ? (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[140%] rounded-full bg-warmwhite px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-950 shadow-md"
          style={{ left: hovered.x, top: hovered.y }}
        >
          {hovered.s.label} · <span className="text-ink-950/55">{hovered.s.href}</span>
        </div>
      ) : null}
      <div className="pointer-events-none absolute bottom-4 left-6 font-mono text-[10px] uppercase tracking-widest text-warmwhite/65">
        ◊ drag to pan · scroll to zoom · click any star
      </div>
    </div>
  );
}
