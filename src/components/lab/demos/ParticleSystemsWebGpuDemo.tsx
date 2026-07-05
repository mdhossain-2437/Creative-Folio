"use client";

import { useEffect, useRef } from "react";
import { cappedDpr, DPR_CANVAS, DPR_COMPACT } from "@/lib/dpr";
import {
  deviceProfile,
  onDeviceProfileChange,
} from "@/lib/deviceTier";
import { particleSystemRuntimeProfile } from "@/lib/labRuntime";
import {
  initWebGpuCanvas,
  WEBGPU_BUFFER_USAGE,
  WEBGPU_SHADER_STAGE,
  type WebGpuBindGroup,
  type WebGpuBuffer,
  type WebGpuDevice,
  type WebGpuRenderPipeline,
} from "@/lib/webgpuHelper";
import { logWebGLError } from "@/lib/webglErrorTracker";

const RING_SEGMENTS = 72;
const RING_VERTEX_COUNT = RING_SEGMENTS + 1;

const PARTICLE_GPU_SHADER = `
struct Uniforms {
  res: vec2f,
  alpha: f32,
  pad0: f32,
};

@group(0) @binding(0) var<uniform> u: Uniforms;

struct VertexOut {
  @builtin(position) pos: vec4f,
};

@vertex
fn vs(@location(0) pos: vec2f) -> VertexOut {
  var out: VertexOut;
  let clip = vec2f((pos.x / u.res.x) * 2.0 - 1.0, 1.0 - (pos.y / u.res.y) * 2.0);
  out.pos = vec4f(clip, 0.0, 1.0);
  return out;
}

@fragment
fn fs() -> @location(0) vec4f {
  return vec4f(0.80, 0.98, 0.0, u.alpha);
}
`;

type PipelineSet = {
  pointPipeline: WebGpuRenderPipeline;
  linePipeline: WebGpuRenderPipeline;
  uniformBuffer: WebGpuBuffer;
  bindGroup: WebGpuBindGroup;
  particleBuffer: WebGpuBuffer;
  ringBuffer: WebGpuBuffer;
};

type Burst = {
  x: number;
  y: number;
  r: number;
  life: number;
};

function createPipeline(
  device: WebGpuDevice,
  format: string,
  topology: "point-list" | "line-strip",
  bindGroupLayout: object,
): WebGpuRenderPipeline {
  const shaderModule = device.createShaderModule({
    label: `ParticleSystemsWebGpu ${topology}`,
    code: PARTICLE_GPU_SHADER,
  });

  return device.createRenderPipeline({
    label: `ParticleSystemsWebGpu ${topology} pipeline`,
    layout: device.createPipelineLayout({
      bindGroupLayouts: [bindGroupLayout],
    }),
    vertex: {
      module: shaderModule,
      entryPoint: "vs",
      buffers: [
        {
          arrayStride: 8,
          attributes: [{ shaderLocation: 0, offset: 0, format: "float32x2" }],
        },
      ],
    },
    fragment: {
      module: shaderModule,
      entryPoint: "fs",
      targets: [
        {
          format,
          blend: {
            color: {
              srcFactor: "src-alpha",
              dstFactor: "one",
              operation: "add",
            },
            alpha: {
              srcFactor: "one",
              dstFactor: "one-minus-src-alpha",
              operation: "add",
            },
          },
        },
      ],
    },
    primitive: { topology },
  });
}

function createPipelines({
  device,
  format,
  maxParticleCount,
}: {
  device: WebGpuDevice;
  format: string;
  maxParticleCount: number;
}): PipelineSet {
  const uniformBuffer = device.createBuffer({
    label: "ParticleSystemsWebGpu uniforms",
    size: 16,
    usage: WEBGPU_BUFFER_USAGE.UNIFORM | WEBGPU_BUFFER_USAGE.COPY_DST,
  });
  const particleBuffer = device.createBuffer({
    label: "ParticleSystemsWebGpu particle positions",
    size: Math.max(8, maxParticleCount * 2 * 4),
    usage: WEBGPU_BUFFER_USAGE.VERTEX | WEBGPU_BUFFER_USAGE.COPY_DST,
  });
  const ringBuffer = device.createBuffer({
    label: "ParticleSystemsWebGpu ring positions",
    size: RING_VERTEX_COUNT * 2 * 4,
    usage: WEBGPU_BUFFER_USAGE.VERTEX | WEBGPU_BUFFER_USAGE.COPY_DST,
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
  const bindGroup = device.createBindGroup({
    label: "ParticleSystemsWebGpu bind group",
    layout: bindGroupLayout,
    entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
  });

  return {
    pointPipeline: createPipeline(device, format, "point-list", bindGroupLayout),
    linePipeline: createPipeline(device, format, "line-strip", bindGroupLayout),
    uniformBuffer,
    bindGroup,
    particleBuffer,
    ringBuffer,
  };
}

function maxParticleCount(compact: boolean): number {
  return particleSystemRuntimeProfile("high", compact).count;
}

function initParticles(parts: Float32Array, count: number, w: number, h: number) {
  for (let i = 0; i < count; i++) {
    const ix = i * 4;
    parts[ix] = Math.random() * w;
    parts[ix + 1] = Math.random() * h;
    parts[ix + 2] = 0;
    parts[ix + 3] = 0;
  }
}

export function ParticleSystemsWebGpuDemo({
  compact,
  onFallback,
  onReady,
}: {
  compact: boolean;
  onFallback: () => void;
  onReady: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let cleanup = () => {};

    const failover = (message: string, report = false) => {
      if (cancelled) return;
      if (report) {
        logWebGLError("runtime_error", "ParticleSystemsWebGpuDemo", message);
      }
      onFallback();
    };

    const run = async () => {
      const init = await initWebGpuCanvas(canvas, { alpha: false });
      if (cancelled) return;
      if (!init.ok) {
        failover(`WebGPU unavailable: ${init.reason}`);
        return;
      }

      const { device, context, format } = init;
      const maxCount = maxParticleCount(compact);
      const pipelines = createPipelines({
        device,
        format,
        maxParticleCount: maxCount,
      });
      const parts = new Float32Array(maxCount * 4);
      const positions = new Float32Array(maxCount * 2);
      const ringPositions = new Float32Array(RING_VERTEX_COUNT * 2);
      const uniforms = new Float32Array(4);
      const bursts: Burst[] = [];
      const mouse = {
        x: 0,
        y: 0,
        inside: false,
        pressed: false,
      };
      let activeCount = 0;
      let dpr = compact ? cappedDpr(DPR_COMPACT) : cappedDpr(DPR_CANVAS);
      let raf = 0;
      let visible = true;
      let last = performance.now();
      let lastBurst = 0;
      const minDt = 1000 / (compact ? 30 : 60);

      const fit = () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w === 0 || h === 0) return;
        dpr = compact ? cappedDpr(DPR_COMPACT) : cappedDpr(DPR_CANVAS);
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        mouse.x = canvas.width / 2;
        mouse.y = canvas.height / 2;
        activeCount = Math.min(
          maxCount,
          particleSystemRuntimeProfile(deviceProfile().tier, compact).count,
        );
        initParticles(parts, activeCount, canvas.width, canvas.height);
        uniforms[0] = canvas.width;
        uniforms[1] = canvas.height;
        uniforms[2] = 0.74;
        device.queue.writeBuffer(pipelines.uniformBuffer, 0, uniforms);
      };

      const onMove = (event: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = (event.clientX - rect.left) * (canvas.width / rect.width);
        mouse.y = (event.clientY - rect.top) * (canvas.height / rect.height);
        mouse.inside = true;
      };
      const onLeave = () => {
        mouse.inside = false;
      };
      const onDown = (event: PointerEvent) => {
        mouse.pressed = true;
        try {
          canvas.setPointerCapture(event.pointerId);
        } catch {
          // Pointer capture can fail after a cancelled gesture.
        }
      };
      const onUp = () => {
        mouse.pressed = false;
      };

      const render = (now: number) => {
        raf = requestAnimationFrame(render);
        if (!visible || now - last < minDt) return;
        const t = now / 1000;
        last = now;

        if (mouse.pressed && t - lastBurst > 0.18) {
          bursts.push({ x: mouse.x, y: mouse.y, r: 30 * dpr, life: 1 });
          if (bursts.length > 8) bursts.shift();
          lastBurst = t;
        }

        for (let i = bursts.length - 1; i >= 0; i--) {
          const burst = bursts[i];
          burst.r += 8 * dpr;
          burst.life -= 0.02;
          if (burst.life <= 0) bursts.splice(i, 1);
        }

        for (let i = 0; i < activeCount; i++) {
          const ix = i * 4;
          const ox = i * 2;
          let x = parts[ix];
          let y = parts[ix + 1];
          let vx = parts[ix + 2];
          let vy = parts[ix + 3];

          vx += Math.sin((y * 0.003 + t) * 1.4) * 0.04;
          vy += Math.cos((x * 0.003 - t) * 1.4) * 0.04;

          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const range = 260 * dpr;
          const d2 = dx * dx + dy * dy;
          if (mouse.inside && d2 < range * range) {
            const f = (1 - Math.sqrt(d2) / range) * 0.18;
            vx += (dx / 60) * f;
            vy += (dy / 60) * f;
          }

          for (const burst of bursts) {
            const bdx = x - burst.x;
            const bdy = y - burst.y;
            const bd = Math.sqrt(bdx * bdx + bdy * bdy);
            if (Math.abs(bd - burst.r) < 18 * dpr) {
              const force = burst.life * 0.9;
              vx += (bdx / (bd + 1)) * force;
              vy += (bdy / (bd + 1)) * force;
            }
          }

          vx *= 0.95;
          vy *= 0.95;
          x += vx;
          y += vy;
          if (x < 0) x += canvas.width;
          else if (x > canvas.width) x -= canvas.width;
          if (y < 0) y += canvas.height;
          else if (y > canvas.height) y -= canvas.height;

          parts[ix] = x;
          parts[ix + 1] = y;
          parts[ix + 2] = vx;
          parts[ix + 3] = vy;
          positions[ox] = x;
          positions[ox + 1] = y;
        }

        device.queue.writeBuffer(pipelines.particleBuffer, 0, positions);

        const encoder = device.createCommandEncoder();
        const pass = encoder.beginRenderPass({
          colorAttachments: [
            {
              view: context.getCurrentTexture().createView(),
              clearValue: { r: 0.027, g: 0.031, b: 0.039, a: 1 },
              loadOp: "clear",
              storeOp: "store",
            },
          ],
        });
        pass.setBindGroup(0, pipelines.bindGroup);
        pass.setPipeline(pipelines.pointPipeline);
        pass.setVertexBuffer(0, pipelines.particleBuffer);
        pass.draw(activeCount);

        pass.setPipeline(pipelines.linePipeline);
        pass.setVertexBuffer(0, pipelines.ringBuffer);
        for (const burst of bursts) {
          for (let i = 0; i < RING_VERTEX_COUNT; i++) {
            const a = (i / RING_SEGMENTS) * Math.PI * 2;
            const ix = i * 2;
            ringPositions[ix] = burst.x + Math.cos(a) * burst.r;
            ringPositions[ix + 1] = burst.y + Math.sin(a) * burst.r;
          }
          device.queue.writeBuffer(pipelines.ringBuffer, 0, ringPositions);
          pass.draw(RING_VERTEX_COUNT);
        }

        pass.end();
        device.queue.submit([encoder.finish()]);
      };

      fit();
      onReady();
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerleave", onLeave);
      canvas.addEventListener("pointerdown", onDown);
      canvas.addEventListener("pointerup", onUp);
      canvas.addEventListener("pointercancel", onUp);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("resize", fit);
      const unlistenProfileChange = onDeviceProfileChange(fit);
      const io = new IntersectionObserver(
        ([entry]) => {
          visible = Boolean(entry?.isIntersecting);
        },
        { rootMargin: "160px", threshold: 0.01 },
      );
      io.observe(canvas);
      raf = requestAnimationFrame(render);
      device.lost?.then((info) => {
        failover(`WebGPU device lost: ${info.reason ?? "unknown"}`, true);
      });

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        unlistenProfileChange();
        canvas.removeEventListener("pointermove", onMove);
        canvas.removeEventListener("pointerleave", onLeave);
        canvas.removeEventListener("pointerdown", onDown);
        canvas.removeEventListener("pointerup", onUp);
        canvas.removeEventListener("pointercancel", onUp);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("resize", fit);
        device.destroy?.();
      };
    };

    run().catch((error: unknown) => {
      failover(
        error instanceof Error ? error.message : "WebGPU particle startup failed",
        true,
      );
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [compact, onFallback, onReady]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      data-lab-particle-renderer="WebGPU"
      className="absolute inset-0 h-full w-full bg-ink-950"
    />
  );
}
