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
//
// Device-tier scaling: `cappedDpr` multiplies the cap by the current
// device's `dprScale` (1 on high, ~0.85 mid, ~0.7 low — see
// `deviceTier.ts`). This is the single lever that downscales EVERY WebGL
// surface on weak phones / laptops without touching any component: the
// shaders render fewer fragments, the visual is perceptually identical
// (the canvases are CSS-stretched back to full size with linear filtering),
// and the GPU does roughly half the work on low tier. No feature is
// removed — only the off-screen render resolution shrinks.

import { tierDprScale } from "@/lib/deviceTier";

export const DPR_HERO = 1.5;
export const DPR_CANVAS = 1.5;
export const DPR_AMBIENT = 1.25;
export const DPR_COMPACT = 1.0;

export function cappedDpr(cap: number): number {
  if (typeof window === "undefined") return 1;
  const scaled = cap * tierDprScale();
  // Never drop below 1.0 — sub-native resolution starts to read as blur
  // even on a phone, and the whole point is "no visible loss".
  const floor = Math.max(1, scaled);
  return Math.min(window.devicePixelRatio || 1, floor);
}
