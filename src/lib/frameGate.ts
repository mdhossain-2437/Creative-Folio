// Frame-rate gate for canvas render loops.
//
// A canvas that draws a passive ambient field has no reason to repaint at
// 120fps on a phone — the field barely moves between frames, yet every
// repaint costs the same full-screen fragment pass. `frameGate` lets a
// render loop *advance every animation frame* (so time-based motion stays
// perfectly smooth) but *only redraw* when enough wall-clock has elapsed
// to hit a target frame-rate.
//
// Crucially this changes nothing on high-tier devices: `targetFps` returns
// 0 there, which `makeFrameGate` maps to "always draw". So desktop renders
// every frame exactly as before; only mid/low tiers coalesce draws.
//
// Usage inside an existing rAF loop:
//
//   const gate = makeFrameGate(targetFps("ambient"));
//   const tick = (now) => {
//     // ...advance simulation with dt every frame...
//     if (gate(now)) {
//       // ...issue gl.draw* only when the gate opens...
//     }
//     raf = requestAnimationFrame(tick);
//   };
//
// The gate is intentionally a tiny closure with no allocation per call.

export type FrameGate = (nowMs: number) => boolean;

/**
 * Build a frame gate for the given target FPS.
 *
 *   • `fps <= 0` → gate is always open (draw every frame). This is the
 *     high-tier / uncapped path and adds a single branch, nothing more.
 *   • `fps > 0`  → gate opens at most once per `1000/fps` ms. The first
 *     call always opens so the surface paints immediately on mount.
 *
 * A small slack (half a frame at 60Hz) absorbs rAF jitter so a 30fps gate
 * doesn't accidentally skip to ~20fps when frames land a hair early.
 */
export function makeFrameGate(fps: number): FrameGate {
  if (!fps || fps <= 0) {
    // Uncapped — branch-only, zero state.
    return () => true;
  }
  const interval = 1000 / fps;
  const slack = 8; // ms; ~half a 60Hz frame
  let lastDraw = -Infinity;
  return (nowMs: number): boolean => {
    if (nowMs - lastDraw >= interval - slack) {
      lastDraw = nowMs;
      return true;
    }
    return false;
  };
}
