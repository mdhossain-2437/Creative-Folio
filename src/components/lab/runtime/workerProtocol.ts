export type WorkerCanvasDemoSlug =
  | "reaction-diffusion"
  | "boids-flock"
  | "sand-piles";

export type WorkerCanvasPointer = {
  x: number;
  y: number;
  inside: boolean;
  pressed: boolean;
  clickT: number;
  shift: boolean;
};

export type WorkerCanvasInitMessage = {
  type: "init";
  canvas: OffscreenCanvas;
  compact: boolean;
  width: number;
  height: number;
  dpr: number;
  fpsCap: number;
};

export type WorkerCanvasInboundMessage =
  | WorkerCanvasInitMessage
  | {
      type: "resize";
      width: number;
      height: number;
      dpr: number;
    }
  | {
      type: "pointer";
      pointer: WorkerCanvasPointer;
    }
  | {
      type: "visibility";
      visible: boolean;
    }
  | {
      type: "reseed";
    }
  | {
      type: "destroy";
    };

export type WorkerCanvasOutboundMessage =
  | {
      type: "ready";
    }
  | {
      type: "error";
      message: string;
    };
