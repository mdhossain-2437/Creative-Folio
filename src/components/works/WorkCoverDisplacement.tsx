"use client";

// WorkCoverDisplacement — renders a work's cover image through a WebGL
// fragment shader that adds a soft fluid displacement + light chromatic
// aberration. The shader becomes louder when `intensity` is high (driven by
// hover state from the parent). Falls back to a plain <img> on
// reduced-motion or when WebGL is unavailable.

import { useEffect, useRef, useState } from "react";
import { damp, clampDt, K } from "@/lib/damp";
import { cappedDpr, DPR_CANVAS } from "@/lib/dpr";
import { deviceProfile, targetFps } from "@/lib/deviceTier";
import { makeFrameGate } from "@/lib/frameGate";

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = (a_pos + 1.0) * 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform sampler2D u_tex;
uniform float u_time;
uniform float u_intensity;
uniform vec2 u_mouse;

float noise(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  vec2 uv = v_uv;
  // texture coords (image needs y-flip; loaded with UNPACK_FLIP_Y)
  vec2 m = u_mouse;
  float d = distance(uv, m);
  float ripple = sin(d * 18.0 - u_time * 2.4) * exp(-d * 5.0);
  vec2 disp = vec2(
    sin(uv.y * 7.0 + u_time * 0.6),
    cos(uv.x * 7.0 + u_time * 0.4)
  ) * 0.012 * u_intensity;
  disp += ripple * 0.018 * u_intensity;
  vec2 ruv = uv + disp;
  // chromatic split
  float ca = 0.004 * u_intensity;
  float r = texture2D(u_tex, ruv + vec2(ca, 0.0)).r;
  float g = texture2D(u_tex, ruv).g;
  float b = texture2D(u_tex, ruv - vec2(ca, 0.0)).b;
  gl_FragColor = vec4(r, g, b, 1.0);
}
`;

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** 0 = idle, 1 = peak. Smoothed inside. */
  intensity: number;
  /** Normalised 0..1 mouse coordinate inside the canvas. */
  mouse: { x: number; y: number };
};

export function WorkCoverDisplacement({
  src,
  alt,
  className,
  intensity,
  mouse,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [supported, setSupported] = useState<boolean | null>(null);
  // Touch devices skip this layer entirely (see effect). Tracked separately
  // from `supported` so the reduced-motion desktop fallback still paints a
  // static cover, while touch renders nothing — the identical <Image> cover
  // already sits behind it and the peek is never revealed without a cursor.
  const [skip, setSkip] = useState(false);
  const stateRef = useRef({
    intensity: 0,
    mouseX: 0.5,
    mouseY: 0.5,
  });

  // Update target values; animation loop interpolates.
  stateRef.current.intensity = intensity;
  stateRef.current.mouseX = mouse.x;
  stateRef.current.mouseY = mouse.y;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const { isTouch, reducedMotion } = deviceProfile();
    // On reduced-motion → static cover. On touch → also static: this canvas
    // only ever lives inside the cursor-following hover preview, which has
    // no cursor to reveal it on a phone. Skipping the WebGL context here is
    // the single biggest mobile win — the homepage was otherwise spinning
    // up 5 (and /works up to 16) GL contexts that no touch user can ever
    // see, blowing past the per-page context budget mobile browsers enforce
    // and triggering context-loss stalls. Nothing visible is lost: the
    // identical <Image> cover sits directly behind this layer.
    if (isTouch) {
      setSkip(true);
      return;
    }
    if (reducedMotion) {
      setSupported(false);
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      premultipliedAlpha: false,
      powerPreference: "high-performance" as WebGLPowerPreference,
    });
    if (!gl) {
      setSupported(false);
      return;
    }
    setSupported(true);

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
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      setSupported(false);
      return;
    }
    const prog = gl.createProgram();
    if (!prog) {
      setSupported(false);
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setSupported(false);
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTex = gl.getUniformLocation(prog, "u_tex");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uInt = gl.getUniformLocation(prog, "u_intensity");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    // Texture
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    // 1-pixel placeholder until image loads
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([12, 12, 12, 255]),
    );
    gl.uniform1i(uTex, 0);

    let texReady = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      texReady = true;
    };
    img.src = src;

    let raf = 0;
    const start = performance.now();
    let last = start;
    let smoothInt = 0;
    let smoothX = 0.5;
    let smoothY = 0.5;
    const resize = () => {
      const w = canvas.clientWidth || 1;
      const h = canvas.clientHeight || 1;
      const dpr = cappedDpr(DPR_CANVAS);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Low-tier desktops (old laptops / integrated GPUs) cap this hover
    // surface; the damping still advances every frame so the ripple stays
    // smooth while in view. mid/high stay uncapped — touch never reaches
    // here at all (it returns early above).
    const gate = makeFrameGate(targetFps("interactive"));
    const tick = () => {
      const now = performance.now();
      const t = (now - start) / 1000;
      const dt = clampDt((now - last) / 1000);
      last = now;
      // Frame-rate-independent exponential decay so cover hover
      // intensity + mouse-tracked displacement stay identical across
      // 60/120/240Hz refresh rates.
      smoothInt = damp(smoothInt, stateRef.current.intensity, K.K_MID, dt);
      smoothX = damp(smoothX, stateRef.current.mouseX, K.K_FAST, dt);
      smoothY = damp(smoothY, stateRef.current.mouseY, K.K_FAST, dt);
      if (gate(now) && texReady) {
        gl.uniform1f(uTime, t);
        gl.uniform1f(uInt, smoothInt);
        gl.uniform2f(uMouse, smoothX, 1 - smoothY);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Pause when off-screen — works grid covers can stack four high; we
    // don't want all of them burning GPU when the user is on a different
    // section.
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
      ro.disconnect();
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [src]);

  if (skip) {
    // Touch: this displacement layer lives inside a cursor-following peek
    // that never opens without a pointer, so it would only ever burn a
    // WebGL context and a duplicate image fetch off-screen. The identical
    // <Image> cover already renders behind it — render nothing here.
    return null;
  }

  if (supported === false) {
    // SSR-safe fallback. Same `fill` semantic via absolute positioning so
    // the parent peek frame keeps its shape.
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        className={className ?? "absolute inset-0 h-full w-full object-cover"}
      />
    );
  }

  const isDecorative = alt.trim().length === 0;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden={isDecorative ? true : undefined}
      aria-label={isDecorative ? undefined : alt}
      role={isDecorative ? undefined : "img"}
      className={className ?? "absolute inset-0 h-full w-full"}
    />
  );
}
