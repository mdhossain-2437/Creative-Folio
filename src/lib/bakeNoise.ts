// Pre-baked, tileable 2-D value noise.
//
// Paper § "The Generative Reveal Animation":
//   "To avoid the high cost of calculating noise values in real-time
//    for every pixel, the noise patterns are 'baked' into textures in
//    advance. The shader then samples these pre-calculated textures
//    and offsets them using a simple time variable, creating the
//    illusion of complex generative art with the performance cost of
//    a simple texture lookup."
//
// We bake one period of value noise into an RGBA texture (we only
// write to .R; channels G/B/A are unused). Sampling the texture with
// `gl.REPEAT` wrap + `gl.LINEAR` filtering yields the same smooth
// curve the GLSL shader was computing per-pixel, but at the cost of
// a single texture fetch.
//
// Tiling correctness: the random grid is wrapped on both axes (the
// last column equals the first column, the last row equals the first
// row) so the texture seamlessly repeats.

const TEX_SIZE = 256;       // 256×256 baked at one period
const PERIOD_CELLS = 8;     // grid cells per period — matches GLSL `vnoise`
const TEXELS_PER_CELL = TEX_SIZE / PERIOD_CELLS;

let cached: Uint8Array | null = null;

// Same hash as the previous GLSL: deterministic so the texture is
// stable across runs.
function hash(x: number, y: number): number {
  const v = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return v - Math.floor(v);
}

// Smoothstep matches the GLSL `f*f*(3.-2.*f)`.
function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

// Single-octave value noise at fractional grid coords `(gx, gy)`.
// Wraps modulo `PERIOD_CELLS` so the result is periodic.
function vnoise(gx: number, gy: number): number {
  const ix = Math.floor(gx);
  const iy = Math.floor(gy);
  const fx = gx - ix;
  const fy = gy - iy;
  const m = PERIOD_CELLS;
  const wrap = (k: number) => ((k % m) + m) % m;
  const a = hash(wrap(ix), wrap(iy));
  const b = hash(wrap(ix + 1), wrap(iy));
  const c = hash(wrap(ix), wrap(iy + 1));
  const d = hash(wrap(ix + 1), wrap(iy + 1));
  const ux = smoothstep(fx);
  const uy = smoothstep(fy);
  const ab = a * (1 - ux) + b * ux;
  const cd = c * (1 - ux) + d * ux;
  return ab * (1 - uy) + cd * uy;
}

/**
 * Generate (or return cached) baked-noise pixel data, ready to upload
 * with `gl.RGBA`/`gl.UNSIGNED_BYTE`. The returned buffer is shared —
 * never mutate it.
 */
export function bakeValueNoise(): {
  data: Uint8Array;
  size: number;
  periodCells: number;
} {
  if (cached) {
    return { data: cached, size: TEX_SIZE, periodCells: PERIOD_CELLS };
  }
  const data = new Uint8Array(TEX_SIZE * TEX_SIZE * 4);
  for (let py = 0; py < TEX_SIZE; py++) {
    for (let px = 0; px < TEX_SIZE; px++) {
      const gx = px / TEXELS_PER_CELL;
      const gy = py / TEXELS_PER_CELL;
      const n = vnoise(gx, gy);
      const v = Math.round(Math.max(0, Math.min(1, n)) * 255);
      const idx = (py * TEX_SIZE + px) * 4;
      data[idx] = v;
      data[idx + 1] = v;
      data[idx + 2] = v;
      data[idx + 3] = 255;
    }
  }
  cached = data;
  return { data, size: TEX_SIZE, periodCells: PERIOD_CELLS };
}
