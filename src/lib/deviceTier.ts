// Central device-capability tiering.
//
// Why this exists:
//   Before this module, every WebGL / canvas / animation component made
//   its own ad-hoc capability guess — some checked `(pointer: coarse)`,
//   some checked `prefers-reduced-motion`, none checked the actual GPU /
//   CPU budget. The result on phones and low-end laptops: 7+ WebGL
//   contexts all rendering full-resolution full-rate fragment shaders,
//   plus Lenis hijacking touch scroll, which together stalled the main
//   thread and made scrolling buffer.
//
// The fix is NOT to remove features. Every shader, cursor, displacement
// and immersive effect stays mounted and visible on every device. What
// changes is the *internal* cost — render resolution (DPR) and per-canvas
// frame-rate — scaled to what the device can actually sustain. This is the
// same technique large immersive studios (Immersive Garden et al.) use to
// ship heavy WebGL that still feels like a raw HTML/CSS page: identical
// perception, fraction of the GPU work.
//
// Tiers:
//   • "high" — desktop / capable GPUs. Full DPR, full frame-rate. No change
//     from the original behaviour.
//   • "mid"  — capable phones, mid laptops, integrated GPUs. Slightly lower
//     DPR ceiling, heavy ambient canvases target ~45fps. Imperceptible.
//   • "low"  — weak phones / old laptops / memory-constrained. DPR pulled
//     toward 1.0 on ambient surfaces, heavy canvases target ~30fps, the
//     most expensive shaders drop an octave (still visually the same field).
//
// SSR-safe: on the server `deviceTier()` returns "high" so the markup is
// never gated server-side; the real tier resolves on the client after
// mount. Everything here is read-once and memoised — `devicePixelRatio`
// and the media queries are re-read only when the viewport changes.

export type DeviceTier = "low" | "mid" | "high";

export type DeviceProfile = {
  /** Resolved capability tier. */
  tier: DeviceTier;
  /** Coarse pointer / no-hover → treat as touch. */
  isTouch: boolean;
  /** OS-level reduced-motion request. */
  reducedMotion: boolean;
  /**
   * Multiplier applied on top of every DPR cap in `dpr.ts`. 1 on high,
   * ~0.85 on mid, ~0.7 on low. Keeps text-crisp surfaces sharp while
   * shaving fragment-shader pixel count where it isn't perceptible.
   */
  dprScale: number;
};

let cached: DeviceProfile | null = null;
let listenerBound = false;
let rendererAdjustment: number | null = null;
let runtimeGpuAdjustment = 0;
let timingProbeScheduled = false;

export const DEVICE_PROFILE_CHANGE_EVENT =
  "creative-folio:device-profile-change";

const SERVER_PROFILE: DeviceProfile = {
  tier: "high",
  isTouch: false,
  reducedMotion: false,
  dprScale: 1,
};

function mq(query: string): boolean {
  try {
    return window.matchMedia(query).matches;
  } catch {
    return false;
  }
}

function emitProfileChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(DEVICE_PROFILE_CHANGE_EVENT));
}

function rendererScoreAdjustment(): number {
  if (typeof window === "undefined") return 0;
  if (rendererAdjustment !== null) return rendererAdjustment;

  rendererAdjustment = 0;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl", {
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      rendererAdjustment = -2;
      return rendererAdjustment;
    }

    const debug = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = debug
      ? String(gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) ?? "")
      : String(gl.getParameter(gl.RENDERER) ?? "");
    const r = renderer.toLowerCase();

    if (
      /swiftshader|llvmpipe|software|microsoft basic render|mesa offscreen|warp/.test(
        r,
      )
    ) {
      rendererAdjustment = -3;
    } else if (
      /mali-[234]|mali-t|adreno \(tm\) [34]|powervr sgx|vivante|tegra/.test(
        r,
      )
    ) {
      rendererAdjustment = -1;
    } else if (
      /rtx|geforce|radeon rx|apple m\d|apple gpu|arc|iris xe|adreno \(tm\) [678]|mali-g7|mali-g8/.test(
        r,
      )
    ) {
      rendererAdjustment = 1;
    }

    gl.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    rendererAdjustment = 0;
  }

  return rendererAdjustment;
}

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function measureGpuTimingAdjustment(): number {
  if (typeof window === "undefined") return 0;

  const canvas = document.createElement("canvas");
  canvas.width = 160;
  canvas.height = 160;
  const gl = canvas.getContext("webgl", {
    antialias: false,
    powerPreference: "low-power",
  });
  if (!gl) return -2;

  const vertex = compileShader(
    gl,
    gl.VERTEX_SHADER,
    "attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}",
  );
  const fragment = compileShader(
    gl,
    gl.FRAGMENT_SHADER,
    "precision mediump float;void main(){vec2 uv=gl_FragCoord.xy/160.0;float v=0.0;for(int i=0;i<24;i++){v+=sin(uv.x*12.0+float(i))*cos(uv.y*10.0);}gl_FragColor=vec4(vec3(v*0.02+0.5),1.0);}",
  );
  const program = gl.createProgram();
  const buffer = gl.createBuffer();

  if (!vertex || !fragment || !program || !buffer) {
    if (vertex) gl.deleteShader(vertex);
    if (fragment) gl.deleteShader(fragment);
    if (program) gl.deleteProgram(program);
    if (buffer) gl.deleteBuffer(buffer);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return 0;
  }

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    gl.deleteProgram(program);
    gl.deleteBuffer(buffer);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return 0;
  }

  const position = gl.getAttribLocation(program, "p");
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.useProgram(program);
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const start = performance.now();
  for (let i = 0; i < 3; i++) gl.drawArrays(gl.TRIANGLES, 0, 3);
  gl.finish();
  const elapsed = performance.now() - start;

  gl.deleteBuffer(buffer);
  gl.deleteProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  gl.getExtension("WEBGL_lose_context")?.loseContext();

  if (elapsed > 24) return -2;
  if (elapsed > 16) return -1;
  return 0;
}

function scheduleGpuTimingProbe() {
  if (typeof window === "undefined" || timingProbeScheduled) return;
  timingProbeScheduled = true;
  window.requestAnimationFrame(() => {
    const adjustment = measureGpuTimingAdjustment();
    if (adjustment >= runtimeGpuAdjustment) return;

    const previousTier = cached?.tier;
    runtimeGpuAdjustment = adjustment;
    cached = compute(false);
    if (cached.tier !== previousTier) emitProfileChange();
  });
}

function compute(runTimingProbe = true): DeviceProfile {
  if (typeof window === "undefined") return SERVER_PROFILE;

  const isTouch = mq("(hover: none), (pointer: coarse)");
  const reducedMotion = mq("(prefers-reduced-motion: reduce)");

  // Capability signals. All are best-effort — absent values are treated
  // as "unknown, assume capable" so we never over-penalise a device we
  // can't measure (e.g. Safari hides deviceMemory).
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    hardwareConcurrency?: number;
  };
  const mem = typeof nav.deviceMemory === "number" ? nav.deviceMemory : null;
  const cores =
    typeof nav.hardwareConcurrency === "number"
      ? nav.hardwareConcurrency
      : null;
  const dpr = window.devicePixelRatio || 1;
  // Shortest viewport edge in CSS px — a stable proxy for phone vs laptop
  // that, unlike width alone, isn't fooled by landscape phones.
  const minEdge = Math.min(window.innerWidth, window.innerHeight);

  // Score: start neutral, subtract for weak signals, add for strong ones.
  let score = 0;

  if (mem !== null) {
    if (mem <= 2) score -= 2;
    else if (mem <= 4) score -= 1;
    else if (mem >= 8) score += 1;
  }
  if (cores !== null) {
    if (cores <= 4) score -= 1;
    else if (cores >= 8) score += 1;
  }
  // A small touch viewport with a high DPR is the classic "render 9× the
  // pixels on a weak mobile GPU" trap — weight it down.
  if (isTouch) {
    score -= 1;
    if (minEdge <= 400) score -= 1;
    if (dpr >= 3) score -= 1;
  } else {
    // Desktops/laptops start with headroom unless other signals object.
    score += 1;
  }
  score += rendererScoreAdjustment() + runtimeGpuAdjustment;

  let tier: DeviceTier;
  if (score <= -2) tier = "low";
  else if (score <= 0) tier = "mid";
  else tier = "high";

  // Reduced-motion users have already asked for a calmer experience; we
  // keep every effect but never push them above the mid frame budget.
  if (reducedMotion && tier === "high") tier = "mid";

  const dprScale = tier === "low" ? 0.7 : tier === "mid" ? 0.85 : 1;

  if (runTimingProbe) scheduleGpuTimingProbe();

  return { tier, isTouch, reducedMotion, dprScale };
}

/**
 * Resolve (and memoise) the device profile. First call on the client
 * computes from live signals; subsequent calls return the cached value
 * until the viewport changes (orientation flip, browser-zoom, window
 * resize), which invalidates the cache so DPR/tier can be re-derived.
 */
export function deviceProfile(): DeviceProfile {
  if (typeof window === "undefined") return SERVER_PROFILE;
  if (!cached) {
    cached = compute();
    if (!listenerBound) {
      listenerBound = true;
      const invalidate = () => {
        cached = null;
        emitProfileChange();
      };
      window.addEventListener("resize", invalidate, { passive: true });
      window.addEventListener("orientationchange", invalidate, {
        passive: true,
      });
    }
  }
  return cached;
}

export function onDeviceProfileChange(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(DEVICE_PROFILE_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener(DEVICE_PROFILE_CHANGE_EVENT, callback);
  };
}

/** Shorthand: just the tier. */
export function deviceTier(): DeviceTier {
  return deviceProfile().tier;
}

/** Shorthand: DPR multiplier for the current tier. */
export function tierDprScale(): number {
  return deviceProfile().dprScale;
}

/**
 * Target frame-rate for a canvas of a given cost class on this device.
 *
 *   • "ambient"  — passive backgrounds (NoiseField). Cheapest to drop.
 *   • "hero"     — the headline hero shaders. Kept high; they're the
 *                  page's signature and run only while the hero is in view.
 *   • "interactive" — hover/cursor-driven surfaces (work covers). Need to
 *                  feel responsive while active.
 *
 * Returns 0 for "uncapped" (render every animation frame). Heavy classes
 * get a real cap only on mid/low tiers; high tier is always uncapped so
 * desktop behaviour is byte-for-byte unchanged.
 */
export function targetFps(cost: "ambient" | "hero" | "interactive"): number {
  const { tier } = deviceProfile();
  if (tier === "high") return 0; // uncapped — original behaviour
  if (cost === "ambient") return tier === "low" ? 30 : 45;
  if (cost === "hero") return tier === "low" ? 40 : 50;
  // interactive
  return tier === "low" ? 40 : 0;
}

/**
 * Number of fbm octaves to run for a given surface on this device. The
 * field's large-scale shape is carried by the first octaves; dropping the
 * smallest octave on low-tier removes only sub-pixel detail that a phone
 * screen can't resolve anyway. mid/high keep the original count.
 */
export function fbmOctaves(full: number): number {
  return deviceTier() === "low" ? Math.max(2, full - 1) : full;
}
