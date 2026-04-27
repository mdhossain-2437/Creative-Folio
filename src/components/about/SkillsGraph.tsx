"use client";

import { useEffect, useRef, useState } from "react";

// Hand-rolled force simulation on a <canvas>: cluster nodes attract their
// children, every node repels every other (Coulomb), plus a centring force.
// Drag any node to displace it; release and the springs settle. No d3 dep.

type Skill = { name: string; group: string };

const CLUSTERS = [
  { id: "design",   label: "DESIGN",          color: "#e3bfb4" },
  { id: "web",      label: "WEB DEV",         color: "#cdfa00" },
  { id: "webgl",    label: "CREATIVE DEV",    color: "#efece9" },
  { id: "brand",    label: "BRANDING",        color: "#e3bfb4" },
  { id: "tooling",  label: "TOOLING",         color: "#cdfa00" },
  { id: "direct",   label: "DIRECTION",       color: "#efece9" },
] as const;

type ClusterId = (typeof CLUSTERS)[number]["id"];

const SKILLS: Skill[] = [
  { name: "UI/UX Design",        group: "design" },
  { name: "Web Design",          group: "design" },
  { name: "Webflow",             group: "design" },
  { name: "Framer",              group: "design" },
  { name: "Next.js",             group: "web" },
  { name: "Nuxt.js",             group: "web" },
  { name: "React",               group: "web" },
  { name: "TypeScript",          group: "web" },
  { name: "Three.js",            group: "webgl" },
  { name: "GLSL Shaders",        group: "webgl" },
  { name: "WebGL",               group: "webgl" },
  { name: "GSAP",                group: "webgl" },
  { name: "Lenis",               group: "webgl" },
  { name: "Logo Design",         group: "brand" },
  { name: "Identity Systems",    group: "brand" },
  { name: "Type Direction",      group: "brand" },
  { name: "Figma",               group: "tooling" },
  { name: "Vite",                group: "tooling" },
  { name: "Cursor / VS Code",    group: "tooling" },
  { name: "Art Direction",       group: "direct" },
  { name: "AI Integration",      group: "direct" },
  { name: "Creative Strategy",   group: "direct" },
];

type Node = {
  id: string;
  kind: "cluster" | "skill";
  group: ClusterId;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

function colorFor(group: ClusterId): string {
  const c = CLUSTERS.find((c) => c.id === group);
  return c?.color ?? "#efece9";
}

export function SkillsGraph({ onFilter }: { onFilter?: (group: ClusterId | null) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [filter, setFilter] = useState<ClusterId | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const fit = () => {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    };
    fit();

    const W = () => canvas.width;
    const H = () => canvas.height;

    // Build nodes: 6 cluster anchors + each skill.
    const nodes: Node[] = [];
    CLUSTERS.forEach((c, i) => {
      const a = (i / CLUSTERS.length) * Math.PI * 2;
      const cx = W() / 2 + Math.cos(a) * Math.min(W(), H()) * 0.18;
      const cy = H() / 2 + Math.sin(a) * Math.min(W(), H()) * 0.18;
      nodes.push({
        id: `c:${c.id}`,
        kind: "cluster",
        group: c.id,
        label: c.label,
        x: cx,
        y: cy,
        vx: 0,
        vy: 0,
        r: 22 * dpr,
      });
    });
    SKILLS.forEach((s, i) => {
      const cl = nodes.find((n) => n.kind === "cluster" && n.group === s.group)!;
      const a = (i / SKILLS.length) * Math.PI * 2;
      nodes.push({
        id: `s:${s.name}`,
        kind: "skill",
        group: s.group as ClusterId,
        label: s.name,
        x: cl.x + Math.cos(a) * 60 * dpr,
        y: cl.y + Math.sin(a) * 60 * dpr,
        vx: 0,
        vy: 0,
        r: 6 * dpr,
      });
    });

    let dragId: string | null = null;
    let dragOffX = 0;
    let dragOffY = 0;
    let pointerX = -9999;
    let pointerY = -9999;
    let raf = 0;
    let activeFilter: ClusterId | null = null;

    const findHit = (px: number, py: number): Node | null => {
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        const r = (n.kind === "cluster" ? n.r + 4 * dpr : n.r + 8 * dpr);
        const dx = n.x - px;
        const dy = n.y - py;
        if (dx * dx + dy * dy < r * r) return n;
      }
      return null;
    };

    const onPointerMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointerX = (e.clientX - r.left) * dpr;
      pointerY = (e.clientY - r.top) * dpr;
      if (dragId) {
        const n = nodes.find((n) => n.id === dragId);
        if (n) {
          n.x = pointerX + dragOffX;
          n.y = pointerY + dragOffY;
          n.vx = 0;
          n.vy = 0;
        }
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const px = (e.clientX - r.left) * dpr;
      const py = (e.clientY - r.top) * dpr;
      const hit = findHit(px, py);
      if (hit) {
        dragId = hit.id;
        dragOffX = hit.x - px;
        dragOffY = hit.y - py;
        canvas.setPointerCapture(e.pointerId);
      }
    };
    const onPointerUp = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const px = (e.clientX - r.left) * dpr;
      const py = (e.clientY - r.top) * dpr;
      const hit = findHit(px, py);
      if (dragId === null && hit && hit.kind === "cluster") {
        activeFilter = activeFilter === hit.group ? null : hit.group;
        setFilter(activeFilter);
        onFilter?.(activeFilter);
      } else if (dragId === null && !hit) {
        activeFilter = null;
        setFilter(null);
        onFilter?.(null);
      }
      dragId = null;
      try { canvas.releasePointerCapture(e.pointerId); } catch { /* noop */ }
    };
    const onLeave = () => {
      pointerX = -9999;
      pointerY = -9999;
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", fit);

    let last = performance.now();
    const tick = () => {
      const now = performance.now();
      const dt = Math.min(40, now - last) / 16.6667;
      last = now;

      // ── repulsion between every pair (Coulomb-ish, soft)
      const N = nodes.length;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          let d2 = dx * dx + dy * dy;
          if (d2 < 1) d2 = 1;
          const dist = Math.sqrt(d2);
          const f = (1400 * dpr) / d2;
          const ux = dx / dist;
          const uy = dy / dist;
          a.vx -= ux * f;
          a.vy -= uy * f;
          b.vx += ux * f;
          b.vy += uy * f;
        }
      }

      // ── spring: skills toward their cluster
      for (const n of nodes) {
        if (n.kind === "skill") {
          const cl = nodes.find((c) => c.kind === "cluster" && c.group === n.group)!;
          const dx = cl.x - n.x;
          const dy = cl.y - n.y;
          const target = 80 * dpr;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const stretch = dist - target;
          n.vx += (dx / dist) * stretch * 0.02;
          n.vy += (dy / dist) * stretch * 0.02;
        }
        // gentle centring
        const cx = W() / 2;
        const cy = H() / 2;
        n.vx += (cx - n.x) * 0.0008;
        n.vy += (cy - n.y) * 0.0008;
      }

      // ── repel from cursor (only if hovering a node area, otherwise minor)
      for (const n of nodes) {
        const dx = n.x - pointerX;
        const dy = n.y - pointerY;
        const d2 = dx * dx + dy * dy;
        const range = (90 * dpr) * (90 * dpr);
        if (d2 < range && d2 > 1) {
          const f = (1 - d2 / range) * 1.5;
          const dist = Math.sqrt(d2);
          n.vx += (dx / dist) * f;
          n.vy += (dy / dist) * f;
        }
      }

      // ── integrate
      for (const n of nodes) {
        if (n.id === dragId) continue;
        n.vx *= 0.84;
        n.vy *= 0.84;
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        // soft walls
        const margin = 30 * dpr;
        if (n.x < margin) { n.x = margin; n.vx = Math.abs(n.vx) * 0.5; }
        if (n.x > W() - margin) { n.x = W() - margin; n.vx = -Math.abs(n.vx) * 0.5; }
        if (n.y < margin) { n.y = margin; n.vy = Math.abs(n.vy) * 0.5; }
        if (n.y > H() - margin) { n.y = H() - margin; n.vy = -Math.abs(n.vy) * 0.5; }
      }

      // ── draw
      ctx.clearRect(0, 0, W(), H());
      // links
      ctx.lineWidth = 1 * dpr;
      for (const n of nodes) {
        if (n.kind !== "skill") continue;
        const cl = nodes.find((c) => c.kind === "cluster" && c.group === n.group)!;
        const dim = activeFilter && activeFilter !== n.group;
        ctx.strokeStyle = dim ? "rgba(239,236,233,0.05)" : "rgba(239,236,233,0.18)";
        ctx.beginPath();
        ctx.moveTo(cl.x, cl.y);
        ctx.lineTo(n.x, n.y);
        ctx.stroke();
      }
      // nodes + labels
      ctx.font = `${10 * dpr}px JetBrains Mono, ui-monospace, monospace`;
      for (const n of nodes) {
        const dim = activeFilter && activeFilter !== n.group;
        ctx.globalAlpha = dim ? 0.28 : 1;
        if (n.kind === "cluster") {
          ctx.fillStyle = colorFor(n.group);
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#0c0c0c";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = `${9 * dpr}px JetBrains Mono, ui-monospace, monospace`;
          ctx.fillText(n.label, n.x, n.y);
        } else {
          ctx.fillStyle = colorFor(n.group);
          ctx.globalAlpha = (dim ? 0.28 : 1) * 0.9;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = dim ? 0.28 : 1;
          ctx.fillStyle = "rgba(239,236,233,0.85)";
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.font = `${10 * dpr}px JetBrains Mono, ui-monospace, monospace`;
          ctx.fillText(n.label, n.x + n.r + 4 * dpr, n.y);
        }
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", fit);
    };
  }, [onFilter]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="skills-canvas block h-[640px] w-full rounded-3xl border border-warmwhite/10 bg-ink-950"
        data-cursor="view"
        data-cursor-label="DRAG · TAP CLUSTER"
        aria-label="Force-directed skills graph"
      />
      <div className="pointer-events-none absolute bottom-4 left-6 font-mono text-[10px] uppercase tracking-widest text-warmwhite/40">
        ◊ drag any node · click a cluster to filter · click outside to reset
      </div>
      {filter ? (
        <div className="pointer-events-none absolute right-6 top-6 rounded-full bg-peach px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-900">
          filtering · {CLUSTERS.find((c) => c.id === filter)?.label}
        </div>
      ) : null}
    </div>
  );
}
