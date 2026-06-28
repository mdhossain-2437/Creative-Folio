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

function compute(): DeviceProfile {
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

  let tier: DeviceTier;
  if (score <= -2) tier = "low";
  else if (score <= 0) tier = "mid";
  else tier = "high";

  // Reduced-motion users have already asked for a calmer experience; we
  // keep every effect but never push them above the mid frame budget.
  if (reducedMotion && tier === "high") tier = "mid";

  const dprScale = tier === "low" ? 0.7 : tier === "mid" ? 0.85 : 1;

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
      };
      window.addEventListener("resize", invalidate, { passive: true });
      window.addEventListener("orientationchange", invalidate, {
        passive: true,
      });
    }
  }
  return cached;
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
