// Single shared `requestAnimationFrame` loop.
//
// Paper § "Scroll Management": "Lenis allows the developers to
// synchronize the scroll position with the WebGL rendering loop,
// ensuring that every pixel of motion on the screen corresponds exactly
// to the user's input."
//
// Without a shared loop every cursor / spotlight / Lenis tick allocates
// its own rAF callback. The browser still vsyncs them all, but the order
// is non-deterministic and each callback pays its own callback-stack
// overhead. Worse, Lenis can update scroll AFTER a canvas has already
// drawn this frame — so the canvas paints with last-frame's scroll
// position and the user sees a 1-frame lag.
//
// `rafBus` solves both:
//   1. ONE `requestAnimationFrame` for the whole app.
//   2. Subscribers run in insertion order. Lenis subscribes first
//      (in `SmoothScrollProvider`), then the canvases. Lenis writes
//      `--scroll-vy` and `refs.scroll`, then the canvases read those
//      values in the same frame.
//
// Subscribers receive the rAF timestamp (`now`, in ms) and the elapsed
// time since the last tick (`dt`, in seconds). They MUST NOT throw —
// the bus catches errors per-subscriber so a crashing canvas can't take
// the rest of the page down.
//
// Usage:
//   useEffect(() => {
//     const off = subscribeRaf((now, dt) => { … });
//     return off;
//   }, []);

type RafCallback = (now: number, dt: number) => void;

const subscribers: RafCallback[] = [];
let raf = 0;
let last = 0;

function tick(now: number) {
  const dt = last ? (now - last) / 1000 : 0;
  last = now;
  // Iterate over a snapshot so a subscriber that unsubscribes itself
  // mid-tick doesn't shift the array under the loop.
  const snap = subscribers.slice();
  for (let i = 0; i < snap.length; i++) {
    try {
      snap[i](now, dt);
    } catch (err) {
      // Surface in dev; don't take down the loop in prod.
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error("[rafBus] subscriber threw", err);
      }
    }
  }
  raf = requestAnimationFrame(tick);
}

function start() {
  if (raf) return;
  last = 0;
  raf = requestAnimationFrame(tick);
}

function stop() {
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
  last = 0;
}

export function subscribeRaf(cb: RafCallback): () => void {
  subscribers.push(cb);
  if (subscribers.length === 1) start();
  return () => {
    const idx = subscribers.indexOf(cb);
    if (idx >= 0) subscribers.splice(idx, 1);
    if (subscribers.length === 0) stop();
  };
}

/**
 * Subscribe with priority. `priority < 0` runs before normal subscribers
 * (use this for Lenis so scroll position is updated before any canvas
 * reads it). `priority >= 0` runs after.
 *
 * Within a priority bucket, insertion order is preserved.
 */
export function subscribeRafPriority(
  cb: RafCallback,
  priority: number,
): () => void {
  // Tag the callback so the bus knows where to insert it. Priorities are
  // integers; the bus keeps subscribers grouped.
  type Tagged = RafCallback & { _prio?: number };
  (cb as Tagged)._prio = priority;
  let inserted = false;
  for (let i = 0; i < subscribers.length; i++) {
    const p = ((subscribers[i] as Tagged)._prio ?? 0);
    if (priority < p) {
      subscribers.splice(i, 0, cb);
      inserted = true;
      break;
    }
  }
  if (!inserted) subscribers.push(cb);
  if (subscribers.length === 1) start();
  return () => {
    const idx = subscribers.indexOf(cb);
    if (idx >= 0) subscribers.splice(idx, 1);
    if (subscribers.length === 0) stop();
  };
}
