"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  reconcileCanvasRuntimeBudget,
  registerCanvasRuntime,
} from "@/lib/canvasRuntimeBudget";
import { cappedDpr, DPR_CANVAS, DPR_COMPACT } from "@/lib/dpr";
import { onDeviceProfileChange } from "@/lib/deviceTier";
import type {
  WorkerCanvasDemoSlug,
  WorkerCanvasInboundMessage,
  WorkerCanvasOutboundMessage,
  WorkerCanvasPointer,
} from "@/components/lab/runtime/workerProtocol";

type WorkerMode = "pending" | "worker" | "fallback";

export function canUseWorkerCanvas(): boolean {
  if (typeof window === "undefined") return false;
  return (
    typeof Worker !== "undefined" &&
    "OffscreenCanvas" in window &&
    typeof HTMLCanvasElement !== "undefined" &&
    "transferControlToOffscreen" in HTMLCanvasElement.prototype
  );
}

function emptyPointer(): WorkerCanvasPointer {
  return {
    x: 0,
    y: 0,
    inside: false,
    pressed: false,
    clickT: -1,
    shift: false,
  };
}

export function WorkerCanvasDemo({
  workerFactory,
  fallback,
  runtimeLabel,
  compact = false,
  className = "absolute inset-0 h-full w-full bg-ink-950",
  fpsCap = 60,
  reseedOnClick = false,
}: {
  workerFactory: () => Worker;
  fallback: ReactNode;
  runtimeLabel: WorkerCanvasDemoSlug;
  compact?: boolean;
  className?: string;
  fpsCap?: number;
  reseedOnClick?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<WorkerMode>("pending");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setMode(canUseWorkerCanvas() ? "worker" : "fallback");
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (mode !== "worker") return;

    const canvas = canvasRef.current;
    if (!canvas || !canUseWorkerCanvas()) {
      const timeout = window.setTimeout(() => setMode("fallback"), 0);
      return () => window.clearTimeout(timeout);
    }

    let worker: Worker | null = null;
    let fallbackTimeout = 0;
    let dpr = compact ? cappedDpr(DPR_COMPACT) : cappedDpr(DPR_CANVAS);
    const pointer = emptyPointer();

    const fallbackToCanvasDemo = () => {
      if (fallbackTimeout) return;
      fallbackTimeout = window.setTimeout(() => setMode("fallback"), 0);
    };

    const post = (message: WorkerCanvasInboundMessage) => {
      try {
        worker?.postMessage(message);
      } catch {
        fallbackToCanvasDemo();
      }
    };

    const backingSize = () => {
      const cssWidth = canvas.clientWidth;
      const cssHeight = canvas.clientHeight;
      dpr = compact ? cappedDpr(DPR_COMPACT) : cappedDpr(DPR_CANVAS);
      return {
        width: Math.max(1, Math.floor(cssWidth * dpr)),
        height: Math.max(1, Math.floor(cssHeight * dpr)),
      };
    };

    const postResize = () => {
      const { width, height } = backingSize();
      post({ type: "resize", width, height, dpr });
      reconcileCanvasRuntimeBudget();
    };

    const updatePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const { width, height } = backingSize();
      pointer.x = rect.width > 0 ? (event.clientX - rect.left) * (width / rect.width) : width / 2;
      pointer.y = rect.height > 0 ? (event.clientY - rect.top) * (height / rect.height) : height / 2;
      pointer.inside = true;
      pointer.shift = event.shiftKey;
      post({ type: "pointer", pointer: { ...pointer } });
    };

    const onMove = (event: PointerEvent) => {
      updatePointer(event);
    };
    const onLeave = () => {
      pointer.inside = false;
      post({ type: "pointer", pointer: { ...pointer } });
    };
    const onDown = (event: PointerEvent) => {
      updatePointer(event);
      pointer.pressed = true;
      pointer.clickT = performance.now() / 1000;
      pointer.shift = event.shiftKey;
      post({ type: "pointer", pointer: { ...pointer } });
      try {
        canvas.setPointerCapture(event.pointerId);
      } catch {
        // Pointer capture can fail when the pointer is already captured.
      }
      if (reseedOnClick) post({ type: "reseed" });
    };
    const onUp = () => {
      pointer.pressed = false;
      post({ type: "pointer", pointer: { ...pointer } });
    };
    const onCancel = () => {
      pointer.pressed = false;
      pointer.inside = false;
      post({ type: "pointer", pointer: { ...pointer } });
    };

    const runtime = registerCanvasRuntime({
      startLoop: () => post({ type: "visibility", visible: true }),
      stopLoop: () => post({ type: "visibility", visible: false }),
    });

    const onWorkerMessage = (
      event: MessageEvent<WorkerCanvasOutboundMessage>,
    ) => {
      if (event.data.type === "error") fallbackToCanvasDemo();
    };
    const onWorkerError = () => fallbackToCanvasDemo();

    try {
      const { width, height } = backingSize();
      const offscreen = canvas.transferControlToOffscreen();
      worker = workerFactory();
      worker.addEventListener("message", onWorkerMessage);
      worker.addEventListener("error", onWorkerError);
      worker.postMessage(
        {
          type: "init",
          canvas: offscreen,
          compact,
          width,
          height,
          dpr,
          fpsCap,
        },
        [offscreen],
      );
    } catch {
      runtime.dispose();
      fallbackToCanvasDemo();
      return () => {
        if (fallbackTimeout) window.clearTimeout(fallbackTimeout);
      };
    }

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onCancel);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("resize", postResize);
    const unlistenProfileChange = onDeviceProfileChange(postResize);

    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => runtime.setVisible(Boolean(entry?.isIntersecting)),
            { rootMargin: "160px", threshold: 0.01 },
          )
        : null;
    if (io) io.observe(canvas);
    else runtime.setVisible(true);

    return () => {
      if (fallbackTimeout) window.clearTimeout(fallbackTimeout);
      runtime.dispose();
      io?.disconnect();
      unlistenProfileChange();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onCancel);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", postResize);
      worker?.removeEventListener("message", onWorkerMessage);
      worker?.removeEventListener("error", onWorkerError);
      post({ type: "destroy" });
      worker?.terminate();
    };
  }, [compact, fpsCap, mode, reseedOnClick, workerFactory]);

  if (mode === "fallback") return fallback;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      data-lab-worker-runtime={runtimeLabel}
      data-lab-worker-mode={mode}
      className={className}
    />
  );
}
