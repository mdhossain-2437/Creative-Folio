// Device-pixel-ratio caps for WebGL / canvas surfaces.
//
// Paper § "Asset Pipeline" recommends capping DPR for offscreen canvases
// because a retina iPhone with `devicePixelRatio = 3` would render 9× as
// many pixels as a regular display — easily melting a low-end GPU on a
// passive ambient shader.
//
// Tiers:
//  • HERO: 1.5 — the hero canvas is the page's headline; high-DPR is
//    visible. Capped so 3× retina iPhones don't render 9× pixels.
//  • CANVAS: 1.5 — generic interactive WebGL surfaces (work covers,
//    constellation). Same cap as hero; can drop to 1.25 if profiling
//    shows GPU pressure.
//  • AMBIENT: 1.25 — passive backgrounds (NoiseField). Visual cost of
//    going below 1.5 is invisible; perf saving is meaningful.
//  • COMPACT: 1.0 — lab grid previews. Per-card cost matters more than
//    per-card fidelity when 10+ demos render simultaneously.
//
// Always read once per resize, not per frame — `devicePixelRatio` can
// change when the browser zooms.

export const DPR_HERO = 1.5;
export const DPR_CANVAS = 1.5;
export const DPR_AMBIENT = 1.25;
export const DPR_COMPACT = 1.0;

export function cappedDpr(cap: number): number {
  if (typeof window === "undefined") return 1;
  return Math.min(window.devicePixelRatio || 1, cap);
}
