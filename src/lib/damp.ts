// Frame-rate-independent exponential decay damping.
//
// Replaces the common `current += (target - current) * factor` pattern
// (which is frame-rate dependent — a 144Hz monitor moves 2.4x faster than
// a 60Hz monitor) with the analytically correct continuous form:
//
//     current = current + (target - current) * (1 - exp(-k * dt))
//
// This is the formula Immersive Garden, Robot Studio, Active Theory,
// and others cite as the basis for their "buttery" camera and cursor
// follow. See e.g. their David Whyte case study and Patrick Heng's
// posts on frame-rate-independent damping.
//
// Usage:
//   const x = damp(currentX, targetX, K_CURSOR, dt);
//
// Choose `k` to match an empirically tuned 60fps factor `f`:
//   k = -60 * Math.log(1 - f)
//
// e.g. f=0.18 -> k≈11.94, f=0.12 -> k≈7.67, f=0.06 -> k≈3.71.

export function damp(
  current: number,
  target: number,
  smoothing: number,
  dt: number,
): number {
  return current + (target - current) * (1 - Math.exp(-smoothing * dt));
}

// Pre-computed `k` constants for the most common smoothing factors used
// across the codebase. Naming is the original 60fps lerp factor so a
// `grep` for the old `0.18` finds the replacement.
export const K = {
  /** equivalent to `* 0.05` at 60fps — slow follow */
  K_SLOW: 3.08,
  /** equivalent to `* 0.06` at 60fps — hero shader cursor */
  K_HERO: 3.71,
  /** equivalent to `* 0.08` at 60fps */
  K_GENTLE: 5.0,
  /** equivalent to `* 0.12` at 60fps — work cover intensity */
  K_MID: 7.67,
  /** equivalent to `* 0.18` at 60fps — cursor ring, spotlight */
  K_FAST: 11.94,
  /** equivalent to `* 0.25` at 60fps — very fast snap */
  K_SNAP: 17.26,
} as const;

// Cap dt to avoid huge jumps after a tab switch (rAF pause + Page
// Visibility quirks can give a single frame with dt=2s).
export function clampDt(dt: number, maxMs = 50): number {
  return Math.min(Math.max(dt, 0), maxMs / 1000);
}
