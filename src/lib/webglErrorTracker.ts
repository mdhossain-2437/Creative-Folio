// WebGL Error Tracking
// Centralized error logging for WebGL context failures, shader compilation errors,
// and runtime WebGL errors. Provides a structured way to track and report issues.

export type WebGLErrorType =
  | "context_creation_failed"
  | "shader_compile_failed"
  | "program_link_failed"
  | "context_lost"
  | "runtime_error"
  | "extension_not_available";

export type WebGLError = {
  type: WebGLErrorType;
  component: string;
  message: string;
  timestamp: number;
  userAgent?: string;
  renderer?: string;
  tier?: string;
};

const MAX_ERROR_LOG = 50;
let errorLog: WebGLError[] = [];

function getRendererInfo(): string | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl", {
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return undefined;

    const debug = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = debug
      ? String(gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) ?? "")
      : String(gl.getParameter(gl.RENDERER) ?? "");

    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return renderer;
  } catch {
    return undefined;
  }
}

export function logWebGLError(
  type: WebGLErrorType,
  component: string,
  message: string,
): void {
  const error: WebGLError = {
    type,
    component,
    message,
    timestamp: Date.now(),
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
    renderer: getRendererInfo(),
  };

  // Add to log
  errorLog.push(error);

  // Keep log size bounded
  if (errorLog.length > MAX_ERROR_LOG) {
    errorLog = errorLog.slice(-MAX_ERROR_LOG);
  }

  // Log to console with structured format
  console.error(`[WebGL Error] ${type} in ${component}:`, message, error);

  // In production, this would send to an error tracking service like Sentry
  // For now, we just log to console and keep an in-memory buffer
}

export function getWebGLErrors(): WebGLError[] {
  return [...errorLog];
}

export function clearWebGLErrors(): void {
  errorLog = [];
}

export function getWebGLErrorStats(): {
  total: number;
  byType: Record<WebGLErrorType, number>;
  byComponent: Record<string, number>;
} {
  const byType: Record<WebGLErrorType, number> = {
    context_creation_failed: 0,
    shader_compile_failed: 0,
    program_link_failed: 0,
    context_lost: 0,
    runtime_error: 0,
    extension_not_available: 0,
  };
  const byComponent: Record<string, number> = {};

  for (const error of errorLog) {
    byType[error.type]++;
    byComponent[error.component] = (byComponent[error.component] || 0) + 1;
  }

  return {
    total: errorLog.length,
    byType,
    byComponent,
  };
}
