// WebGL Context LRU Registry
// Prevents too many concurrent WebGL contexts by tracking live contexts
// and forcing context loss on the oldest off-screen ones when the limit is exceeded

type ContextEntry = {
  id: string;
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext | WebGL2RenderingContext;
  createdAt: number;
  lastAccessedAt: number;
  isVisible: boolean;
};

const MAX_CONCURRENT_CONTEXTS = 6; // Safe threshold for most browsers

class WebGLContextRegistry {
  private contexts: Map<string, ContextEntry> = new Map();
  private accessOrder: string[] = []; // LRU tracking

  register(
    id: string,
    canvas: HTMLCanvasElement,
    gl: WebGLRenderingContext | WebGL2RenderingContext
  ): void {
    const now = Date.now();
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

    // Check if we need to evict old contexts
    this.evictIfNeeded();
  }

  unregister(id: string): void {
    this.contexts.delete(id);
    this.accessOrder = this.accessOrder.filter((x) => x !== id);
  }

  markAccessed(id: string): void {
    const entry = this.contexts.get(id);
    if (entry) {
      entry.lastAccessedAt = Date.now();
      this.updateAccessOrder(id);
    }
  }

  markVisible(id: string, visible: boolean): void {
    const entry = this.contexts.get(id);
    if (entry) {
      entry.isVisible = visible;
    }
  }

  private updateAccessOrder(id: string): void {
    // Remove from current position
    this.accessOrder = this.accessOrder.filter((x) => x !== id);
    // Add to end (most recently used)
    this.accessOrder.push(id);
  }

  private evictIfNeeded(): void {
    while (this.contexts.size > MAX_CONCURRENT_CONTEXTS) {
      // Find the oldest invisible context to evict
      let oldestId: string | null = null;
      let oldestTime = Infinity;

      for (const id of this.accessOrder) {
        const entry = this.contexts.get(id);
        if (entry && !entry.isVisible && entry.lastAccessedAt < oldestTime) {
          oldestTime = entry.lastAccessedAt;
          oldestId = id;
        }
      }

      // If all contexts are visible, evict the oldest one anyway
      if (!oldestId && this.accessOrder.length > 0) {
        oldestId = this.accessOrder[0];
      }

      if (oldestId) {
        this.forceLoseContext(oldestId);
      } else {
        // Should not happen, but break to prevent infinite loop
        break;
      }
    }
  }

  private forceLoseContext(id: string): void {
    const entry = this.contexts.get(id);
    if (!entry) return;

    const gl = entry.gl;
    const ext = gl.getExtension("WEBGL_lose_context");

    if (ext) {
      ext.loseContext();
      console.log(
        `[WebGLContextRegistry] Forced context loss for ${id} to stay under ${MAX_CONCURRENT_CONTEXTS} concurrent contexts`
      );
    }

    // Remove from registry after forcing loss
    this.unregister(id);
  }

  getStats(): { total: number; visible: number; invisible: number } {
    let visible = 0;
    let invisible = 0;

    for (const entry of this.contexts.values()) {
      if (entry.isVisible) visible++;
      else invisible++;
    }

    return {
      total: this.contexts.size,
      visible,
      invisible,
    };
  }
}

// Singleton instance
export const glContextRegistry = new WebGLContextRegistry();
