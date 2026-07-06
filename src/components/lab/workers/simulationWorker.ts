import type {
  WorkerCanvasInboundMessage,
  WorkerCanvasOutboundMessage,
  WorkerCanvasPointer,
} from "@/components/lab/runtime/workerProtocol";

type WorkerScope = {
  addEventListener: (
    type: "message",
    listener: (event: MessageEvent<WorkerCanvasInboundMessage>) => void,
  ) => void;
  postMessage: (message: WorkerCanvasOutboundMessage) => void;
  setTimeout: (handler: () => void, timeout?: number) => number;
  clearTimeout: (id: number) => void;
  close: () => void;
};

export type WorkerMouse = WorkerCanvasPointer & {
  px: number;
  py: number;
  vx: number;
  vy: number;
};

export type WorkerStore = Record<string, unknown>;

export type WorkerRenderState = {
  ctx: OffscreenCanvasRenderingContext2D;
  w: number;
  h: number;
  dpr: number;
  t: number;
  dt: number;
  m: WorkerMouse;
  compact: boolean;
  store: WorkerStore;
  reseed: () => void;
};

export type WorkerInitFn = (state: Omit<WorkerRenderState, "t" | "dt">) => void;
export type WorkerTickFn = (state: WorkerRenderState) => void;

type Runtime = {
  canvas: OffscreenCanvas;
  ctx: OffscreenCanvasRenderingContext2D;
  w: number;
  h: number;
  dpr: number;
  compact: boolean;
  store: WorkerStore;
  m: WorkerMouse;
};

const scope = self as unknown as WorkerScope;

function emptyMouse(): WorkerMouse {
  return {
    x: 0,
    y: 0,
    px: 0,
    py: 0,
    vx: 0,
    vy: 0,
    inside: false,
    pressed: false,
    clickT: -1,
    shift: false,
  };
}

function clampSize(value: number): number {
  return Math.max(1, Math.floor(value));
}

export function createCanvasSimulationWorker({
  init,
  tick,
}: {
  init: WorkerInitFn;
  tick: WorkerTickFn;
}) {
  let runtime: Runtime | null = null;
  let visible = false;
  let timeout = 0;
  let last = 0;
  let fpsCap = 0;
  let reseedRequested = false;

  const reseed = () => {
    reseedRequested = true;
  };

  const postError = (message: string) => {
    scope.postMessage({ type: "error", message });
  };

  const stop = () => {
    visible = false;
    if (timeout) {
      scope.clearTimeout(timeout);
      timeout = 0;
    }
  };

  const fit = (width: number, height: number, dpr: number) => {
    if (!runtime) return;
    runtime.w = clampSize(width);
    runtime.h = clampSize(height);
    runtime.dpr = dpr;
    runtime.canvas.width = runtime.w;
    runtime.canvas.height = runtime.h;
    init({
      ctx: runtime.ctx,
      w: runtime.w,
      h: runtime.h,
      dpr: runtime.dpr,
      m: runtime.m,
      compact: runtime.compact,
      store: runtime.store,
      reseed,
    });
  };

  const schedule = (delay = 0) => {
    if (!visible || timeout || !runtime) return;
    timeout = scope.setTimeout(loop, delay);
  };

  const loop = () => {
    timeout = 0;
    if (!visible || !runtime) return;

    const now = performance.now();
    const minDt = fpsCap > 0 ? 1000 / fpsCap : 0;
    if (minDt > 0 && now - last < minDt) {
      schedule(minDt - (now - last));
      return;
    }

    const dt = Math.min(0.06, (now - last) / 1000 || 0.016);
    last = now;
    const m = runtime.m;
    m.vx = m.x - m.px;
    m.vy = m.y - m.py;
    m.px = m.x;
    m.py = m.y;

    try {
      if (reseedRequested) {
        reseedRequested = false;
        init({
          ctx: runtime.ctx,
          w: runtime.w,
          h: runtime.h,
          dpr: runtime.dpr,
          m,
          compact: runtime.compact,
          store: runtime.store,
          reseed,
        });
      }
      tick({
        ctx: runtime.ctx,
        w: runtime.w,
        h: runtime.h,
        dpr: runtime.dpr,
        t: now / 1000,
        dt,
        m,
        compact: runtime.compact,
        store: runtime.store,
        reseed,
      });
    } catch (error) {
      stop();
      postError(error instanceof Error ? error.message : "Worker tick failed");
      return;
    }

    schedule(minDt > 0 ? minDt : 16);
  };

  const start = () => {
    if (!runtime) return;
    visible = true;
    last = performance.now();
    schedule();
  };

  scope.addEventListener("message", (event) => {
    const message = event.data;
    if (message.type === "init") {
      const ctx = message.canvas.getContext("2d", { alpha: false });
      if (!ctx) {
        postError("OffscreenCanvas 2D context unavailable");
        return;
      }
      fpsCap = message.fpsCap;
      runtime = {
        canvas: message.canvas,
        ctx,
        w: 1,
        h: 1,
        dpr: message.dpr,
        compact: message.compact,
        store: {},
        m: emptyMouse(),
      };
      fit(message.width, message.height, message.dpr);
      scope.postMessage({ type: "ready" });
      if (visible) start();
      return;
    }

    if (message.type === "resize") {
      fit(message.width, message.height, message.dpr);
      return;
    }

    if (message.type === "pointer" && runtime) {
      Object.assign(runtime.m, message.pointer);
      return;
    }

    if (message.type === "visibility") {
      if (message.visible) start();
      else stop();
      return;
    }

    if (message.type === "reseed") {
      reseed();
      return;
    }

    if (message.type === "destroy") {
      stop();
      scope.close();
    }
  });
}
