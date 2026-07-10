import {
  createCanvasSimulationWorker,
  type WorkerInitFn,
  type WorkerTickFn,
} from "@/components/lab/workers/simulationWorker";
import type { WorkerCanvasOutboundMessage } from "@/components/lab/runtime/workerProtocol";

const WASM_PATH = "/lab/wasm/boids-neighborhood.wasm";
const WASM_OUTPUT_STRIDE = 7;
const SAMPLE_STEP = 4;

type BoidsWasmExports = {
  memory: WebAssembly.Memory;
  aggregate: (
    count: number,
    sampleStep: number,
    perceptionSq: number,
    outPtr: number,
  ) => void;
};

type BoidsWasmRuntime = {
  boids: Float32Array;
  output: Float32Array;
  outputOffset: number;
};

type BoidsStore = {
  arr?: Float32Array;
  N?: number;
  wasmMode?: "active" | "fallback" | "pending";
};

const workerScope = self as unknown as {
  postMessage: (message: WorkerCanvasOutboundMessage) => void;
};

let boidsWasmExports: BoidsWasmExports | null = null;
let boidsWasmStatus: "active" | "fallback" | "pending" = "pending";

function postWasmMode(store: BoidsStore, value: BoidsStore["wasmMode"]) {
  if (!value || store.wasmMode === value) return;
  store.wasmMode = value;
  workerScope.postMessage({ type: "feature", key: "wasm", value });
}

async function loadBoidsWasm(): Promise<BoidsWasmExports | null> {
  if (typeof WebAssembly === "undefined" || typeof fetch === "undefined") {
    return null;
  }

  const response = await fetch(WASM_PATH);
  if (!response.ok) return null;

  const bytes = await response.arrayBuffer();
  const result = await WebAssembly.instantiate(bytes, {});
  const exports = result.instance.exports;

  if (
    !(exports.memory instanceof WebAssembly.Memory) ||
    typeof exports.aggregate !== "function"
  ) {
    return null;
  }

  return {
    memory: exports.memory,
    aggregate: exports.aggregate as BoidsWasmExports["aggregate"],
  };
}

void loadBoidsWasm()
  .then((wasmExports) => {
    boidsWasmExports = wasmExports;
    boidsWasmStatus = wasmExports ? "active" : "fallback";
  })
  .catch(() => {
    boidsWasmStatus = "fallback";
  });

function ensureWasmRuntime(
  store: BoidsStore,
  count: number,
  currentArr: Float32Array,
): BoidsWasmRuntime | null {
  if (!boidsWasmExports) {
    postWasmMode(store, boidsWasmStatus);
    return null;
  }

  const boidFloatCount = count * 4;
  const outputFloatCount = count * WASM_OUTPUT_STRIDE;
  const requiredBytes = (boidFloatCount + outputFloatCount) * 4;
  const memory = boidsWasmExports.memory;
  const currentPages = memory.buffer.byteLength / 65_536;
  const requiredPages = Math.ceil(requiredBytes / 65_536);

  if (requiredPages > currentPages) {
    memory.grow(requiredPages - currentPages);
  }

  const boids = new Float32Array(memory.buffer, 0, boidFloatCount);
  if (currentArr.buffer !== memory.buffer) {
    boids.set(currentArr.subarray(0, boidFloatCount));
  }

  const outputOffset = boidFloatCount * 4;
  const output = new Float32Array(
    memory.buffer,
    outputOffset,
    outputFloatCount,
  );

  store.arr = boids;
  postWasmMode(store, "active");

  return {
    boids,
    output,
    outputOffset,
  };
}

const boidsInit: WorkerInitFn = ({ w, h, store, compact }) => {
  const boidsStore = store as BoidsStore;
  const count = compact ? 110 : 320;
  const previous = boidsStore.arr;
  const runtime = previous
    ? ensureWasmRuntime(boidsStore, count, previous)
    : null;
  const boids = runtime?.boids ?? new Float32Array(count * 4);

  for (let i = 0; i < count; i++) {
    boids[i * 4] = Math.random() * w;
    boids[i * 4 + 1] = Math.random() * h;
    const angle = Math.random() * Math.PI * 2;
    boids[i * 4 + 2] = Math.cos(angle) * 1.6;
    boids[i * 4 + 3] = Math.sin(angle) * 1.6;
  }

  boidsStore.arr = boids;
  boidsStore.N = count;
};

const boidsTick: WorkerTickFn = ({ ctx, w, h, m, store, dpr }) => {
  const boidsStore = store as BoidsStore;
  const currentArr = boidsStore.arr as Float32Array;
  const count = boidsStore.N as number;
  const perception = 60 * dpr;
  const perceptionSq = perception * perception;
  const wasmRuntime = ensureWasmRuntime(boidsStore, count, currentArr);
  const arr = wasmRuntime?.boids ?? currentArr;

  ctx.fillStyle = "rgba(8,8,10,0.18)";
  ctx.fillRect(0, 0, w, h);

  if (wasmRuntime) {
    boidsWasmExports?.aggregate(
      count,
      SAMPLE_STEP,
      perceptionSq,
      wasmRuntime.outputOffset,
    );
  }

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

    if (wasmRuntime) {
      const out = i * WASM_OUTPUT_STRIDE;
      sx = wasmRuntime.output[out];
      sy = wasmRuntime.output[out + 1];
      ax = wasmRuntime.output[out + 2];
      ay = wasmRuntime.output[out + 3];
      cx = wasmRuntime.output[out + 4];
      cy = wasmRuntime.output[out + 5];
      neighbors = wasmRuntime.output[out + 6];
    } else {
      for (let j = 0; j < count; j += SAMPLE_STEP) {
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
