import {
  createCanvasSimulationWorker,
  type WorkerInitFn,
  type WorkerTickFn,
} from "@/components/lab/workers/simulationWorker";

const boidsInit: WorkerInitFn = ({ w, h, store, compact }) => {
  const count = compact ? 110 : 320;
  const boids = new Float32Array(count * 4);

  for (let i = 0; i < count; i++) {
    boids[i * 4] = Math.random() * w;
    boids[i * 4 + 1] = Math.random() * h;
    const angle = Math.random() * Math.PI * 2;
    boids[i * 4 + 2] = Math.cos(angle) * 1.6;
    boids[i * 4 + 3] = Math.sin(angle) * 1.6;
  }

  store.arr = boids;
  store.N = count;
};

const boidsTick: WorkerTickFn = ({ ctx, w, h, m, store, dpr }) => {
  const arr = store.arr as Float32Array;
  const count = store.N as number;
  const perception = 60 * dpr;
  const perceptionSq = perception * perception;

  ctx.fillStyle = "rgba(8,8,10,0.18)";
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < count; i++) {
    const ix = i * 4;
    const x = arr[ix];
    const y = arr[ix + 1];
    let vx = arr[ix + 2];
    let vy = arr[ix + 3];
    let sx = 0;
    let sy = 0;
    let ax = 0;
    let ay = 0;
    let cx = 0;
    let cy = 0;
    let neighbors = 0;

    for (let j = 0; j < count; j += 4) {
      if (j === i) continue;
      const jx = j * 4;
      const dx = arr[jx] - x;
      const dy = arr[jx + 1] - y;
      const distanceSq = dx * dx + dy * dy;
      if (distanceSq < perceptionSq) {
        neighbors++;
        ax += arr[jx + 2];
        ay += arr[jx + 3];
        cx += arr[jx];
        cy += arr[jx + 1];
        if (distanceSq < 400) {
          sx -= dx;
          sy -= dy;
        }
      }
    }

    if (neighbors > 0) {
      ax /= neighbors;
      ay /= neighbors;
      cx = cx / neighbors - x;
      cy = cy / neighbors - y;
    }

    vx += sx * 0.02 + ax * 0.04 + cx * 0.0009;
    vy += sy * 0.02 + ay * 0.04 + cy * 0.0009;

    if (m.inside) {
      const dx = m.x - x;
      const dy = m.y - y;
      const sign = m.shift ? -1 : 1;
      vx += dx * 0.0006 * sign;
      vy += dy * 0.0006 * sign;
    }

    const speed = Math.sqrt(vx * vx + vy * vy);
    const limit = 2.6;
    if (speed > limit) {
      vx = (vx / speed) * limit;
      vy = (vy / speed) * limit;
    }

    let nx = x + vx;
    let ny = y + vy;
    if (nx < 0) nx += w;
    else if (nx > w) nx -= w;
    if (ny < 0) ny += h;
    else if (ny > h) ny -= h;

    arr[ix] = nx;
    arr[ix + 1] = ny;
    arr[ix + 2] = vx;
    arr[ix + 3] = vy;

    const angle = Math.atan2(vy, vx);
    const len = 5 * dpr;
    ctx.strokeStyle =
      m.shift && m.inside ? "rgba(255,120,90,0.7)" : "rgba(227,191,180,0.7)";
    ctx.lineWidth = 1.2 * dpr;
    ctx.beginPath();
    ctx.moveTo(nx, ny);
    ctx.lineTo(nx - Math.cos(angle) * len, ny - Math.sin(angle) * len);
    ctx.stroke();
  }
};

createCanvasSimulationWorker({
  init: boidsInit,
  tick: boidsTick,
});
