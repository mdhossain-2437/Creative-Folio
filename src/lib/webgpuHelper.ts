// WebGPU Helper Module
// Provides WebGPU detection and initialization with WebGL fallback
//
// NOTE: WebGPU integration is prepared but not fully implemented in this codebase.
// The current WebGL implementation uses GLSL shaders which would need to be
// rewritten in WGSL (WebGPU Shading Language) for WebGPU compatibility.
// This helper provides the foundation for future WebGPU adoption when browser
// support is more mature and the migration effort can be justified.
//
// Current status:
// - WebGPU detection: Implemented
// - Context initialization: Implemented with fallback
// - Shader migration: Not implemented (requires GLSL → WGSL conversion)
// - Rendering pipeline: WebGL-only for now

type WebGpuAlphaMode = "opaque" | "premultiplied";

type WebGpuDevice = {
  limits: {
    maxTextureDimension2D?: number;
  };
};

type WebGpuAdapter = {
  requestDevice(): Promise<WebGpuDevice>;
};

type WebGpuCanvasContext = {
  configure(options: {
    device: WebGpuDevice;
    format: string;
    alphaMode: WebGpuAlphaMode;
  }): void;
};

type WebGpuNavigator = {
  requestAdapter(): Promise<WebGpuAdapter | null>;
  getPreferredCanvasFormat(): string;
};

// Type declarations for WebGPU (not yet in this project's TypeScript lib).
declare global {
  interface Navigator {
    gpu?: WebGpuNavigator;
  }
}

export type GraphicsBackend = "webgpu" | "webgl" | "none";

export interface GraphicsContext {
  backend: GraphicsBackend;
  device?: WebGpuDevice;
  context?: WebGpuCanvasContext;
  gl?: WebGLRenderingContext | WebGL2RenderingContext;
  canvas: HTMLCanvasElement;
}

/**
 * Check if WebGPU is available in the current browser
 */
export function isWebGPUSupported(): boolean {
  if (typeof window === "undefined") return false;

  // Check for navigator.gpu
  if (!navigator.gpu) return false;

  return true;
}

/**
 * Initialize WebGPU context with WebGL fallback
 * Attempts WebGPU first, falls back to WebGL if unavailable or fails
 */
export async function initGraphicsContext(
  canvas: HTMLCanvasElement,
  options?: {
    powerPreference?: WebGLPowerPreference;
    antialias?: boolean;
    alpha?: boolean;
  },
): Promise<GraphicsContext> {
  // Try WebGPU first
  if (isWebGPUSupported()) {
    try {
      const adapter = await navigator.gpu!.requestAdapter();
      if (!adapter) {
        console.warn("WebGPU adapter request failed, falling back to WebGL");
        return initWebGLContext(canvas, options);
      }

      const device = await adapter.requestDevice();
      const context = canvas.getContext(
        "webgpu",
      ) as unknown as WebGpuCanvasContext | null;

      if (!context) {
        console.warn("WebGPU context creation failed, falling back to WebGL");
        return initWebGLContext(canvas, options);
      }

      // Configure the swap chain
      const format = navigator.gpu!.getPreferredCanvasFormat();
      context.configure({
        device,
        format,
        alphaMode: options?.alpha ? "premultiplied" : "opaque",
      });

      return {
        backend: "webgpu",
        device,
        context,
        canvas,
      };
    } catch (error) {
      console.warn("WebGPU initialization failed:", error);
      return initWebGLContext(canvas, options);
    }
  }

  // Fallback to WebGL
  return initWebGLContext(canvas, options);
}

/**
 * Initialize WebGL context (fallback)
 */
function initWebGLContext(
  canvas: HTMLCanvasElement,
  options?: {
    powerPreference?: WebGLPowerPreference;
    antialias?: boolean;
    alpha?: boolean;
  },
): GraphicsContext {
  const gl = canvas.getContext("webgl", {
    antialias: options?.antialias ?? false,
    alpha: options?.alpha ?? false,
    powerPreference: options?.powerPreference ?? "high-performance",
  });

  if (!gl) {
    console.error("WebGL context creation failed");
    return {
      backend: "none",
      canvas,
    };
  }

  return {
    backend: "webgl",
    gl,
    canvas,
  };
}

/**
 * Get the preferred graphics backend
 * Returns "webgpu" if supported, "webgl" otherwise
 */
export function getPreferredBackend(): GraphicsBackend {
  return isWebGPUSupported() ? "webgpu" : "webgl";
}

/**
 * Get renderer information for debugging
 */
export function getRendererInfo(context: GraphicsContext): string {
  if (context.backend === "webgpu" && context.device) {
    const adapterInfo = context.device.limits;
    return `WebGPU - maxTextureDimension2D: ${adapterInfo.maxTextureDimension2D}`;
  }

  if (context.backend === "webgl" && context.gl) {
    const debug = context.gl.getExtension("WEBGL_debug_renderer_info");
    if (debug) {
      const renderer = context.gl.getParameter(debug.UNMASKED_RENDERER_WEBGL);
      const vendor = context.gl.getParameter(debug.UNMASKED_VENDOR_WEBGL);
      return `WebGL - ${vendor} ${renderer}`;
    }
    return "WebGL - debug info unavailable";
  }

  return "No graphics context";
}
