import {
  createCanvasSimulationWorker,
  type WorkerInitFn,
  type WorkerTickFn,
} from "@/components/lab/workers/simulationWorker";

const reactionDiffusionInit: WorkerInitFn = ({ w, h, store, compact }) => {
  const cell = compact ? 6 : 4;
  const cols = Math.max(20, Math.floor(w / cell));
  const rows = Math.max(20, Math.floor(h / cell));
  const a = new Float32Array(cols * rows);
  const b = new Float32Array(cols * rows);
  const a2 = new Float32Array(cols * rows);
  const b2 = new Float32Array(cols * rows);

  for (let i = 0; i < cols * rows; i++) {
    a[i] = 1;
    a2[i] = 1;
    b[i] = 0;
  }

  for (let s = 0; s < 14; s++) {
    const cx = (Math.random() * cols) | 0;
    const cy = (Math.random() * rows) | 0;
    const radius = 4 + ((Math.random() * 3) | 0);
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const x = cx + dx;
        const y = cy + dy;
        if (
          x >= 0 &&
          x < cols &&
          y >= 0 &&
          y < rows &&
          dx * dx + dy * dy <= radius * radius
        ) {
          b[y * cols + x] = 1;
        }
      }
    }
  }

  store.cell = cell;
  store.cols = cols;
  store.rows = rows;
  store.a = a;
  store.b = b;
  store.a2 = a2;
  store.b2 = b2;
};

const reactionDiffusionTick: WorkerTickFn = ({
  ctx,
  w,
  h,
  m,
  store,
  compact,
}) => {
  const cell = store.cell as number;
  const cols = store.cols as number;
  const rows = store.rows as number;
  let a = store.a as Float32Array;
  let b = store.b as Float32Array;
  let a2 = store.a2 as Float32Array;
  let b2 = store.b2 as Float32Array;
  const dA = 1.0;
  const dB = 0.5;
  const feed = 0.055;
  const kill = 0.062;
  const steps = compact ? 4 : 8;

  if (m.inside) {
    const mx = ((m.x / w) * cols) | 0;
    const my = ((m.y / h) * rows) | 0;
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        const x = mx + dx;
        const y = my + dy;
        if (x > 0 && x < cols - 1 && y > 0 && y < rows - 1) {
          b[y * cols + x] = Math.min(1, b[y * cols + x] + 0.4);
        }
      }
    }
  }

  for (let s = 0; s < steps; s++) {
    for (let y = 1; y < rows - 1; y++) {
      for (let x = 1; x < cols - 1; x++) {
        const i = y * cols + x;
        const lapA =
          a[i - 1] * 0.2 +
          a[i + 1] * 0.2 +
          a[i - cols] * 0.2 +
          a[i + cols] * 0.2 +
          a[i - cols - 1] * 0.05 +
          a[i - cols + 1] * 0.05 +
          a[i + cols - 1] * 0.05 +
          a[i + cols + 1] * 0.05 -
          a[i];
        const lapB =
          b[i - 1] * 0.2 +
          b[i + 1] * 0.2 +
          b[i - cols] * 0.2 +
          b[i + cols] * 0.2 +
          b[i - cols - 1] * 0.05 +
          b[i - cols + 1] * 0.05 +
          b[i + cols - 1] * 0.05 +
          b[i + cols + 1] * 0.05 -
          b[i];
        const ab2 = a[i] * b[i] * b[i];
        const nextA = a[i] + (dA * lapA - ab2 + feed * (1 - a[i]));
        const nextB = b[i] + (dB * lapB + ab2 - (kill + feed) * b[i]);
        a2[i] = nextA < 0 ? 0 : nextA > 1 ? 1 : nextA;
        b2[i] = nextB < 0 ? 0 : nextB > 1 ? 1 : nextB;
      }
    }
    [a, a2] = [a2, a];
    [b, b2] = [b2, b];
  }

  store.a = a;
  store.b = b;
  store.a2 = a2;
  store.b2 = b2;

  ctx.fillStyle = "#070708";
  ctx.fillRect(0, 0, w, h);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const value = b[y * cols + x];
      if (value < 0.05) continue;
      const tone = Math.min(1, value * 2.4);
      const r = 60 + tone * 195;
      const g = 60 + tone * 132;
      const bl = 80 + tone * 100;
      ctx.fillStyle = `rgba(${r | 0},${g | 0},${bl | 0},${0.35 + tone * 0.6})`;
      ctx.fillRect(x * cell, y * cell, cell, cell);
    }
  }
};

createCanvasSimulationWorker({
  init: reactionDiffusionInit,
  tick: reactionDiffusionTick,
});
