import { deviceProfile, onDeviceProfileChange } from "@/lib/deviceTier";

// WebGL-only LRU registry. Canvas2D demos are governed separately by
// canvasRuntimeBudget.ts; this module tracks scarce browser GPU contexts.

type ContextEntry = {
  id: string;
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext | WebGL2RenderingContext;
  createdAt: number;
  lastAccessedAt: number;
  isVisible: boolean;
};

function nowMs(): number {
  return typeof performance !== "undefined" ? performance.now() : Date.now();
}

function maxConcurrentContexts(): number {
  const profile = deviceProfile();

  if (profile.reducedMotion) return profile.isTouch ? 2 : 3;
  if (profile.tier === "low") return profile.isTouch ? 2 : 3;
  if (profile.tier === "mid") return profile.isTouch ? 4 : 5;
  return profile.isTouch ? 5 : 8;
}

class WebGLContextRegistry {
  private contexts: Map<string, ContextEntry> = new Map();
  private accessOrder: string[] = [];
  private unlistenProfileChange: (() => void) | null = null;

  register(
    id: string,
    canvas: HTMLCanvasElement,
    gl: WebGLRenderingContext | WebGL2RenderingContext,
  ): void {
    this.ensureProfileListener();

    const now = nowMs();
    const entry: ContextEntry = {
      id,
      canvas,
      gl,
      createdAt: now,
      lastAccessedAt: now,
      isVisible: true,
    };

    this.contexts.set(id, entry);
    this.updateAccessOrder(id);
    this.evictIfNeeded();
  }

  unregister(id: string): void {
    this.contexts.delete(id);
    this.accessOrder = this.accessOrder.filter((x) => x !== id);
    if (this.contexts.size === 0 && this.unlistenProfileChange) {
      this.unlistenProfileChange();
      this.unlistenProfileChange = null;
    }
  }

  markAccessed(id: string): void {
    const entry = this.contexts.get(id);
    if (entry) {
      entry.lastAccessedAt = nowMs();
      this.updateAccessOrder(id);
    }
  }

  markVisible(id: string, visible: boolean): void {
    const entry = this.contexts.get(id);
    if (entry) {
      entry.isVisible = visible;
      if (visible) this.markAccessed(id);
      this.evictIfNeeded();
    }
  }

  private ensureProfileListener(): void {
    if (typeof window === "undefined" || this.unlistenProfileChange) return;
    this.unlistenProfileChange = onDeviceProfileChange(() => {
      this.evictIfNeeded();
    });
  }

  private updateAccessOrder(id: string): void {
    this.accessOrder = this.accessOrder.filter((x) => x !== id);
    this.accessOrder.push(id);
  }

  private evictIfNeeded(): void {
    const max = maxConcurrentContexts();
    const offscreenIds = this.accessOrder.filter((id) => {
      const entry = this.contexts.get(id);
      return entry && !entry.isVisible;
    });

    while (this.contexts.size > max && offscreenIds.length > 0) {
      const oldestId = offscreenIds.shift();
      if (!oldestId) break;
      this.forceLoseContext(oldestId);
    }
  }

  private forceLoseContext(id: string): boolean {
    const entry = this.contexts.get(id);
    if (!entry || entry.isVisible) return false;

    const gl = entry.gl;
    const ext = gl.getExtension("WEBGL_lose_context");
    if (!ext) return false;

    ext.loseContext();
    this.unregister(id);
    return true;
  }

  getStats(): {
    cap: number;
    total: number;
    visible: number;
    offscreen: number;
  } {
    let visible = 0;
    let offscreen = 0;

    for (const entry of this.contexts.values()) {
      if (entry.isVisible) visible++;
      else offscreen++;
    }

    return {
      cap: maxConcurrentContexts(),
      total: this.contexts.size,
      visible,
      offscreen,
    };
  }
}

export const glContextRegistry = new WebGLContextRegistry();
