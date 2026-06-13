"use client";

// HeroFluidDisplacement — a lightweight WebGL2 layer that paints a
// curl-noise-driven fluid field over the hero region. Tracks the cursor
// and produces a subtle peach-tinted ripple that reads as a "fluid
// displacement" effect over the H1. Layered with mix-blend-mode:screen
// so it remains additive — the magnetic letters underneath stay sharp
// and unaffected.
//
// Pack D — D3.1. Falls back silently on no-WebGL2 / reduced-motion /
// touch. Only mounted inside the Hero container.

import { useEffect, useRef } from "react";
import { damp, clampDt, K } from "@/lib/damp";
import { cappedDpr, DPR_HERO } from "@/lib/dpr";
import { fbmOctaves, targetFps } from "@/lib/deviceTier";
import { makeFrameGate } from "@/lib/frameGate";

const VERT = `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

// FRAG is a template: OCTAVES is injected at init with the device fbm
// octave count. high/mid keep 4; low tier runs 3 (drops only the finest,
// sub-pixel octave), keeping the fluid ripple visually identical at lower
// per-pixel cost.
const FRAG = (octaves: number) => `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 outColor;

uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_active;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash2(i + vec2(0,0)), f - vec2(0,0)),
        dot(hash2(i + vec2(1,0)), f - vec2(1,0)), u.x),
    mix(dot(hash2(i + vec2(0,1)), f - vec2(0,1)),
        dot(hash2(i + vec2(1,1)), f - vec2(1,1)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < ${octaves}; i++) {
    v += a * noise(p);
    p *= 2.07;
    a *= 0.5;
  }
  return v;
}

vec2 curl(vec2 p, float t) {
  float e = 0.01;
  float n1 = fbm(vec2(p.x, p.y + e) + t);
  float n2 = fbm(vec2(p.x, p.y - e) + t);
  float n3 = fbm(vec2(p.x + e, p.y) + t);
  float n4 = fbm(vec2(p.x - e, p.y) + t);
  return vec2(n1 - n2, n4 - n3);
}

void main() {
  float aspect = u_res.x / max(u_res.y, 1.0);
  vec2 uv = v_uv;
  vec2 p = uv - 0.5;
  p.x *= aspect;
  vec2 m = (u_mouse / u_res) - 0.5;
  m.x *= aspect;

  // Distance from the cursor; ripple intensity falls off softly.
  float d = length(p - m);
  float ripple = exp(-d * 4.5) * smoothstep(0.0, 1.2, u_active);

  // Curl-noise displacement field.
  vec2 disp = curl(p * 1.6 + vec2(u_time * 0.06, -u_time * 0.04), u_time * 0.08);

  // Sample the field at displaced coords for an extra fluid ripple.
  float field = fbm(p * 2.4 + disp * 0.6 + u_time * 0.05);
  field = smoothstep(0.05, 0.55, field);

  // Peach tint with low alpha — sits as a subtle ripple over the H1.
  vec3 peach = vec3(0.89, 0.75, 0.71);
  float alpha = 0.05 + 0.18 * ripple + 0.04 * field;
  vec3 col = peach * (0.4 + 0.6 * field);

  // Soft chromatic shift — only near cursor, very subtle.
  float ca = ripple * 0.04;
  col.r += ca * 0.4;
  col.b -= ca * 0.3;

  outColor = vec4(col, alpha);
}
`;

export function HeroFluidDisplacement() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", {
      premultipliedAlpha: false,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const compile = (type: number, src: string): WebGLShader | null => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG(fbmOctaves(4)));
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uActive = gl.getUniformLocation(prog, "u_active");

    const dpr = cappedDpr(DPR_HERO);
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(r.width * dpr));
      const h = Math.max(1, Math.floor(r.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    let mx = 0;
    let my = 0;
    let active = isTouch ? 0.4 : 0;
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = (e.clientX - r.left) * dpr;
      my = (r.height - (e.clientY - r.top)) * dpr;
      active = 1;
    };
    const onLeave = () => {
      active = 0;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let raf = 0;
    let lastActive = 0;
    const start = performance.now();
    let last = start;
    // Mid/low tiers coalesce the repaint to a sustainable rate; the blend
    // below still advances every frame so the idle↔active transition stays
    // smooth. High tier is uncapped (unchanged).
    const gate = makeFrameGate(targetFps("hero"));
    const tick = () => {
      const now = performance.now();
      const t = (now - start) / 1000;
      const dt = clampDt((now - last) / 1000);
      last = now;
      // Frame-rate-independent exponential decay. Replaces a 60fps-tuned
      // linear lerp so the idle↔active fluid blend stays the same speed
      // on 60/120/240Hz panels.
      lastActive = damp(lastActive, active, K.K_SLOW, dt);
      if (gate(now)) {
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform2f(uMouse, mx, my);
        gl.uniform1f(uTime, t);
        gl.uniform1f(uActive, lastActive);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Pause the rAF loop when the hero scrolls off-screen — no point
    // burning GPU on a hidden canvas. Resumes when it scrolls back in.
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
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[6] mix-blend-screen"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
