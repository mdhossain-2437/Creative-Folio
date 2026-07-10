import { deviceProfile } from "@/lib/deviceTier";

type WebGpuAlphaMode = "opaque" | "premultiplied";
type WebGpuPowerPreference = "low-power" | "high-performance";

export type WebGpuFallbackStage =
  | "WebGPU"
  | "WebGL2"
  | "WebGL1"
  | "Canvas2D"
  | "Static";

export const GRAPHICS_FALLBACK_CHAIN = [
  "WebGPU",
  "WebGL2",
  "WebGL1",
  "Canvas2D",
  "Static",
] as const satisfies readonly WebGpuFallbackStage[];

type WebGpuAdapter = {
  requestDevice(): Promise<WebGpuDevice>;
};

export type WebGpuBuffer = object;
export type WebGpuRenderPipeline = object;
export type WebGpuComputePipeline = object;
export type WebGpuBindGroupLayout = object;
export type WebGpuPipelineLayout = object;
export type WebGpuBindGroup = object;
export type WebGpuShaderModule = object;
export type WebGpuTextureView = object;
export type WebGpuCommandBuffer = object;

export type WebGpuRenderPassEncoder = {
  setPipeline(pipeline: WebGpuRenderPipeline): void;
  setBindGroup(index: number, bindGroup: WebGpuBindGroup): void;
  setVertexBuffer(slot: number, buffer: WebGpuBuffer): void;
  draw(vertexCount: number, instanceCount?: number): void;
  end(): void;
};

export type WebGpuCommandEncoder = {
  beginRenderPass(descriptor: Record<string, unknown>): WebGpuRenderPassEncoder;
  beginComputePass(): WebGpuComputePassEncoder;
  finish(): WebGpuCommandBuffer;
};

export type WebGpuComputePassEncoder = {
  setPipeline(pipeline: WebGpuComputePipeline): void;
  setBindGroup(index: number, bindGroup: WebGpuBindGroup): void;
  dispatchWorkgroups(x: number, y?: number, z?: number): void;
  end(): void;
};

export type WebGpuCanvasContext = {
  configure(options: {
    device: WebGpuDevice;
    format: string;
    alphaMode: WebGpuAlphaMode;
  }): void;
  getCurrentTexture(): { createView(): WebGpuTextureView };
};

export type WebGpuDevice = {
  queue: {
    writeBuffer(
      buffer: WebGpuBuffer,
      bufferOffset: number,
      data: BufferSource,
    ): void;
    submit(commandBuffers: WebGpuCommandBuffer[]): void;
  };
  lost?: Promise<{ reason?: string; message?: string }>;
  destroy?: () => void;
  createShaderModule(descriptor: {
    label?: string;
    code: string;
  }): WebGpuShaderModule;
  createRenderPipeline(
    descriptor: Record<string, unknown>,
  ): WebGpuRenderPipeline;
  createComputePipeline(
    descriptor: Record<string, unknown>,
  ): WebGpuComputePipeline;
  createBuffer(descriptor: {
    label?: string;
    size: number;
    usage: number;
  }): WebGpuBuffer;
  createBindGroupLayout(
    descriptor: Record<string, unknown>,
  ): WebGpuBindGroupLayout;
  createPipelineLayout(descriptor: {
    bindGroupLayouts: WebGpuBindGroupLayout[];
  }): WebGpuPipelineLayout;
  createBindGroup(descriptor: Record<string, unknown>): WebGpuBindGroup;
  createCommandEncoder(): WebGpuCommandEncoder;
};

type WebGpuNavigator = {
  requestAdapter(options?: {
    powerPreference?: WebGpuPowerPreference;
  }): Promise<WebGpuAdapter | null>;
  getPreferredCanvasFormat(): string;
};

declare global {
  interface Navigator {
    gpu?: WebGpuNavigator;
  }
}

export type WebGpuInitResult =
  | {
      ok: true;
      adapter: WebGpuAdapter;
      device: WebGpuDevice;
      context: WebGpuCanvasContext;
      format: string;
    }
  | {
      ok: false;
      reason:
        | "unsupported"
        | "adapter-unavailable"
        | "device-unavailable"
        | "context-unavailable";
    };

export const WEBGPU_BUFFER_USAGE = {
  COPY_DST: 0x0008,
  VERTEX: 0x0020,
  UNIFORM: 0x0040,
  STORAGE: 0x0080,
} as const;

export const WEBGPU_SHADER_STAGE = {
  VERTEX: 0x1,
  FRAGMENT: 0x2,
  COMPUTE: 0x4,
} as const;

export function canUseWebGPU(): boolean {
  return typeof navigator !== "undefined" && Boolean(navigator.gpu);
}

export function shouldAttemptWebGPU({
  allowLowTier = false,
}: {
  allowLowTier?: boolean;
} = {}): boolean {
  if (!canUseWebGPU() || typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }

  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  const effectiveType = connection?.effectiveType ?? "";
  if (connection?.saveData || /(^|-)2g$/.test(effectiveType)) return false;

  const profile = deviceProfile();
  if (!allowLowTier && profile.tier === "low") return false;
  return (
    profile.gpu.rendererSignal !== "software" &&
    profile.gpu.rendererSignal !== "unavailable"
  );
}

export async function initWebGpuCanvas(
  canvas: HTMLCanvasElement,
  {
    alpha = false,
    powerPreference = "high-performance",
  }: {
    alpha?: boolean;
    powerPreference?: WebGpuPowerPreference;
  } = {},
): Promise<WebGpuInitResult> {
  if (!navigator.gpu) return { ok: false, reason: "unsupported" };

  const adapter = await navigator.gpu.requestAdapter({ powerPreference });
  if (!adapter) return { ok: false, reason: "adapter-unavailable" };

  let device: WebGpuDevice;
  try {
    device = await adapter.requestDevice();
  } catch {
    return { ok: false, reason: "device-unavailable" };
  }

  const context = canvas.getContext(
    "webgpu",
  ) as unknown as WebGpuCanvasContext | null;
  if (!context) {
    device.destroy?.();
    return { ok: false, reason: "context-unavailable" };
  }

  const format = navigator.gpu.getPreferredCanvasFormat();
  context.configure({
    device,
    format,
    alphaMode: alpha ? "premultiplied" : "opaque",
  });

  return { ok: true, adapter, device, context, format };
}

export function getWebGlFallbackContext(
  canvas: HTMLCanvasElement,
  options: WebGLContextAttributes = {
    antialias: false,
    alpha: false,
    powerPreference: "high-performance",
  },
): {
  stage: "WebGL2" | "WebGL1" | "Static";
  gl: WebGLRenderingContext | WebGL2RenderingContext | null;
} {
  const webgl2 = canvas.getContext("webgl2", options);
  if (webgl2) return { stage: "WebGL2", gl: webgl2 };

  const webgl1 = canvas.getContext("webgl", options);
  if (webgl1) return { stage: "WebGL1", gl: webgl1 };

  return { stage: "Static", gl: null };
}
