"use client";

import { useEffect, useRef } from "react";
import { damp, clampDt, K } from "@/lib/damp";
import { cappedDpr, DPR_HERO } from "@/lib/dpr";
import { makeFrameGate } from "@/lib/frameGate";
import {
  initWebGpuCanvas,
  WEBGPU_BUFFER_USAGE,
  WEBGPU_SHADER_STAGE,
  type WebGpuBindGroup,
  type WebGpuBuffer,
  type WebGpuDevice,
  type WebGpuRenderPipeline,
} from "@/lib/webgpuHelper";
import { targetFps } from "@/lib/deviceTier";
import { logWebGLError } from "@/lib/webglErrorTracker";

const HERO_GPU_SHADER = `
struct Uniforms {
  res: vec2f,
  mouse: vec2f,
  time: f32,
  pad0: f32,
  pad1: f32,
  pad2: f32,
};

@group(0) @binding(0) var<uniform> u: Uniforms;

struct VertexOut {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
};

@vertex
fn vs(@builtin(vertex_index) vertexIndex: u32) -> VertexOut {
  var positions = array<vec2f, 3>(
    vec2f(-1.0, -1.0),
    vec2f(3.0, -1.0),
    vec2f(-1.0, 3.0)
  );
  let p = positions[vertexIndex];
  var out: VertexOut;
  out.pos = vec4f(p, 0.0, 1.0);
  out.uv = p * 0.5 + vec2f(0.5);
  return out;
}

fn hash3(p: vec3f) -> vec3f {
  let q = vec3f(
    dot(p, vec3f(127.1, 311.7, 74.7)),
    dot(p, vec3f(269.5, 183.3, 246.1)),
    dot(p, vec3f(113.5, 271.9, 124.6))
  );
  return -1.0 + 2.0 * fract(sin(q) * 43758.5453);
}

fn noise3(p: vec3f) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let v = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(
      mix(dot(hash3(i + vec3f(0.0, 0.0, 0.0)), f - vec3f(0.0, 0.0, 0.0)),
          dot(hash3(i + vec3f(1.0, 0.0, 0.0)), f - vec3f(1.0, 0.0, 0.0)), v.x),
      mix(dot(hash3(i + vec3f(0.0, 1.0, 0.0)), f - vec3f(0.0, 1.0, 0.0)),
          dot(hash3(i + vec3f(1.0, 1.0, 0.0)), f - vec3f(1.0, 1.0, 0.0)), v.x),
      v.y
    ),
    mix(
      mix(dot(hash3(i + vec3f(0.0, 0.0, 1.0)), f - vec3f(0.0, 0.0, 1.0)),
          dot(hash3(i + vec3f(1.0, 0.0, 1.0)), f - vec3f(1.0, 0.0, 1.0)), v.x),
      mix(dot(hash3(i + vec3f(0.0, 1.0, 1.0)), f - vec3f(0.0, 1.0, 1.0)),
          dot(hash3(i + vec3f(1.0, 1.0, 1.0)), f - vec3f(1.0, 1.0, 1.0)), v.x),
      v.y
    ),
    v.z
  );
}

fn fbm(p0: vec3f) -> f32 {
  var p = p0;
  var value = 0.0;
  var amp = 0.5;
  for (var i = 0; i < 4; i = i + 1) {
    value = value + amp * noise3(p);
    p = p * 2.04;
    amp = amp * 0.5;
  }
  return value;
}

@fragment
fn fs(in: VertexOut) -> @location(0) vec4f {
  let aspect = max(0.0001, u.res.x / u.res.y);
  var p = in.uv - vec2f(0.5);
  p.x = p.x * aspect;

  var m = u.mouse / u.res - vec2f(0.5);
  m.x = m.x * aspect;

  var q = vec3f(p * 1.4, u.time * 0.06);
  q.xy = q.xy + 0.55 * vec2f(fbm(q + vec3f(1.7)), fbm(q + vec3f(4.3)));
  q.xy = q.xy + 0.35 * (m - p) * exp(-3.0 * length(p - m));

  let n = fbm(q);
  let aurora = smoothstep(-0.15, 0.85, n);
  let deep = vec3f(0.035, 0.035, 0.045);
  let mid = vec3f(0.07, 0.07, 0.10);
  let warm = vec3f(0.89, 0.75, 0.71);
  let cool = vec3f(0.42, 0.49, 0.62);

  var col = mix(deep, mid, aurora);
  col = mix(col, cool * 0.6, smoothstep(0.45, 0.78, aurora));
  col = mix(col, warm, smoothstep(0.78, 0.96, aurora));

  let halo = 0.32 / (1.0 + 12.0 * length(p - m));
  col = col + vec3f(0.55, 0.46, 0.40) * halo;

  let grain = fract(sin(dot(in.uv * u.res, vec2f(12.9898, 78.233))) * 43758.5453);
  col = col + (grain - 0.5) * 0.04;

  let vig = smoothstep(0.0, 0.7, 1.0 - abs(p.y) * 1.6);
  col = col * mix(0.55, 1.0, vig);
  return vec4f(col, 1.0);
}
`;

function createHeroPipeline(
  device: WebGpuDevice,
  format: string,
): {
  pipeline: WebGpuRenderPipeline;
  uniformBuffer: WebGpuBuffer;
  bindGroup: WebGpuBindGroup;
} {
  const shaderModule = device.createShaderModule({
    label: "HeroShaderGpu WGSL",
    code: HERO_GPU_SHADER,
  });
  const uniformBuffer = device.createBuffer({
    label: "HeroShaderGpu uniforms",
    size: 32,
    usage: WEBGPU_BUFFER_USAGE.UNIFORM | WEBGPU_BUFFER_USAGE.COPY_DST,
  });
  const bindGroupLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: WEBGPU_SHADER_STAGE.VERTEX | WEBGPU_SHADER_STAGE.FRAGMENT,
        buffer: { type: "uniform" },
      },
    ],
  });
  const pipeline = device.createRenderPipeline({
    label: "HeroShaderGpu pipeline",
    layout: device.createPipelineLayout({ bindGroupLayouts: [bindGroupLayout] }),
    vertex: { module: shaderModule, entryPoint: "vs" },
    fragment: { module: shaderModule, entryPoint: "fs", targets: [{ format }] },
    primitive: { topology: "triangle-list" },
  });
  const bindGroup = device.createBindGroup({
    label: "HeroShaderGpu bind group",
    layout: bindGroupLayout,
    entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
  });

  return { pipeline, uniformBuffer, bindGroup };
}

export function HeroShaderGpu({
  className = "",
  onFallback,
}: {
  className?: string;
  onFallback?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let raf = 0;
    let visible = true;
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const uniforms = new Float32Array(8);
    const start = performance.now();
    let last = start;
    const gate = makeFrameGate(targetFps("hero"));

    const failover = (message: string, report = false) => {
      if (cancelled) return;
      if (report) logWebGLError("runtime_error", "HeroShaderGpu", message);
      onFallback?.();
    };

    const run = async () => {
      const init = await initWebGpuCanvas(canvas, { alpha: false });
      if (cancelled) return;
      if (!init.ok) {
        failover(`WebGPU unavailable: ${init.reason}`);
        return;
      }

      const { device, context, format } = init;
      const { pipeline, uniformBuffer, bindGroup } = createHeroPipeline(
        device,
        format,
      );

      const resize = () => {
        const dpr = cappedDpr(DPR_HERO);
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w === 0 || h === 0) return;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        target.x = canvas.width * 0.5;
        target.y = canvas.height * 0.5;
        mouse.x = target.x;
        mouse.y = target.y;
      };

      const onMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const dpr = cappedDpr(DPR_HERO);
        target.x = (event.clientX - rect.left) * dpr;
        target.y = (rect.height - (event.clientY - rect.top)) * dpr;
      };

      const render = (now: number) => {
        if (!visible || cancelled) return;
        const dt = clampDt((now - last) / 1000);
        last = now;
        mouse.x = damp(mouse.x, target.x, K.K_HERO, dt);
        mouse.y = damp(mouse.y, target.y, K.K_HERO, dt);

        if (gate(now)) {
          uniforms[0] = canvas.width;
          uniforms[1] = canvas.height;
          uniforms[2] = mouse.x;
          uniforms[3] = mouse.y;
          uniforms[4] = (now - start) / 1000;
          device.queue.writeBuffer(uniformBuffer, 0, uniforms);

          const encoder = device.createCommandEncoder();
          const pass = encoder.beginRenderPass({
            colorAttachments: [
              {
                view: context.getCurrentTexture().createView(),
                clearValue: { r: 0.035, g: 0.035, b: 0.045, a: 1 },
                loadOp: "clear",
                storeOp: "store",
              },
            ],
          });
          pass.setPipeline(pipeline);
          pass.setBindGroup(0, bindGroup);
          pass.draw(3);
          pass.end();
          device.queue.submit([encoder.finish()]);
        }

        raf = requestAnimationFrame(render);
      };

      resize();
      window.addEventListener("resize", resize);
      window.addEventListener("mousemove", onMove);

      const io = new IntersectionObserver(
        ([entry]) => {
          visible = Boolean(entry?.isIntersecting);
          if (visible) {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(render);
          }
        },
        { threshold: 0 },
      );
      io.observe(canvas);
      raf = requestAnimationFrame(render);

      device.lost?.then((info) => {
        failover(`WebGPU device lost: ${info.reason ?? "unknown"}`, true);
      });

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener("resize", resize);
        window.removeEventListener("mousemove", onMove);
        device.destroy?.();
      };
    };

    let cleanup = () => {};
    run().catch((error: unknown) => {
      failover(
        error instanceof Error ? error.message : "WebGPU startup failed",
        true,
      );
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [onFallback]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      data-graphics-backend="WebGPU"
      className={`absolute inset-0 h-full w-full ${className}`}
    />
  );
}
