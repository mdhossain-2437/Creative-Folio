"use client";

import { useEffect, useRef } from "react";
import { cappedDpr, DPR_AMBIENT } from "@/lib/dpr";
import { bakeValueNoise } from "@/lib/bakeNoise";
import { targetFps } from "@/lib/deviceTier";
import { makeFrameGate } from "@/lib/frameGate";

// Lightweight ambient noise canvas used as a section background.
//
// Paper § "Generative Reveal Animation": the value-noise pattern is
// pre-baked into a tileable 256² texture once on the CPU side; the
// shader then performs a single `texture2D` lookup per octave instead
// of recomputing the 4-corner hash + smoothstep blend per pixel.
const FRAG = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_noise;
uniform float u_t;
uniform vec2 u_res;
uniform float u_seed;

// PERIOD_CELLS in the baked texture — one full period of the
// value-noise grid spans this many cells. Matches PERIOD_CELLS in
// src/lib/bakeNoise.ts.
const float PERIOD = 8.0;

// Fetch baked noise at grid coord g (1.0 = one cell). Wraps
// automatically because the texture is uploaded with gl.REPEAT.
float vnoise(vec2 g) {
  return texture2D(u_noise, g / PERIOD).r;
}

void main() {
  vec2 uv = v_uv;
  vec2 p = uv * 3.0 + u_seed;
  float n = vnoise(p + u_t * 0.05);
  n += 0.5 * vnoise(p * 2.1 - u_t * 0.04);
  n *= 0.55;
  vec3 base = vec3(0.07);
  vec3 warm = vec3(0.20, 0.18, 0.17);
  vec3 col = mix(base, warm, smoothstep(0.45, 0.95, n));
  // grain
  float g = fract(sin(dot(uv * u_res, vec2(53.,17.))) * 43758.5453);
  col += (g - 0.5) * 0.05;
  gl_FragColor = vec4(col, 1.0);
}
`;
const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() { v_uv = a_pos * 0.5 + 0.5; gl_Position = vec4(a_pos, 0., 1.); }
`;

export function NoiseField({
  className = "",
  seed = 0,
}: {
  className?: string;
  seed?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      // Passive ambient background — explicitly request the low-power
      // GPU on hybrid systems (paper § "Performance Budget").
      powerPreference: "low-power" as WebGLPowerPreference,
    });
    if (!gl) return;
    const prog = gl.createProgram()!;
    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, VERT);
    gl.compileShader(vs);
    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, FRAG);
    gl.compileShader(fs);
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    const uT = gl.getUniformLocation(prog, "u_t");
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uSeed = gl.getUniformLocation(prog, "u_seed");
    const uNoise = gl.getUniformLocation(prog, "u_noise");
    gl.uniform1f(uSeed, seed);

    // Pre-bake a tileable 256² value-noise texture once and upload.
    // gl.LINEAR + gl.REPEAT gives the same smooth, periodic look as
    // the previous in-shader hash+smoothstep, at one fetch per octave
    // instead of four hash ops + a smoothstep blend.
    const noise = bakeValueNoise();
    const tex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      noise.size,
      noise.size,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      noise.data,
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.uniform1i(uNoise, 0);

    const resize = () => {
      const dpr = cappedDpr(DPR_AMBIENT);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);
    let raf = 0;
    let visible = true;
    const start = performance.now();
    // Passive background — the cheapest class to coalesce. mid → ~45fps,
    // low → ~30fps, high → uncapped. The field drifts so slowly that the
    // capped rate is indistinguishable, but it frees real GPU headroom on
    // phones where this sits behind heavier foreground content.
    const gate = makeFrameGate(targetFps("ambient"));
    const tick = () => {
      if (!visible) return;
      const now = performance.now();
      if (gate(now)) {
        const t = (now - start) / 1000;
        gl.uniform1f(uT, t);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      gl.deleteTexture(tex);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [seed]);
  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`absolute inset-0 h-full w-full ${className}`}
    />
  );
}
