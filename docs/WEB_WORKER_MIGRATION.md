# Web Worker Lab Runtime

## Current State

The heaviest Canvas2D lab simulations now use OffscreenCanvas workers on full
slug pages:

- `reaction-diffusion`
- `boids-flock`
- `sand-piles`

Compact `/lab` grid previews intentionally stay on the main-thread
`CanvasDemo` runtime. That avoids creating many workers for small preview cards
and keeps the grid chunking predictable.

## Runtime Boundary

- Main thread: React lifecycle, canvas transfer, IntersectionObserver
  visibility, pointer events, resize events, DPR/tier changes, and the shared
  canvas runtime budget.
- Worker thread: simulation state, frame loop, FPS throttling, reseed handling,
  and OffscreenCanvas 2D drawing.
- Fallback: if `Worker`, `OffscreenCanvas`, or
  `HTMLCanvasElement.transferControlToOffscreen` is unavailable, the same demo
  renders through the original `CanvasDemo` path.

The bridge lives in `src/components/lab/runtime/WorkerCanvasDemo.tsx`. The
message contract lives in `src/components/lab/runtime/workerProtocol.ts`.

## Worker Modules

Each worker imports the shared loop from
`src/components/lab/workers/simulationWorker.ts` and provides only `init` and
`tick` functions:

- `src/components/lab/workers/reactionDiffusion.worker.ts`
- `src/components/lab/workers/boidsFlock.worker.ts`
- `src/components/lab/workers/sandPiles.worker.ts`

`boids-flock` also has a small WASM pilot for the CPU-bound neighborhood
aggregation pass. The source lives at
`src/components/lab/wasm/boids-neighborhood.wat`, the committed browser asset
is `public/lab/wasm/boids-neighborhood.wasm`, and it can be rebuilt with:

```bash
pnpm wasm:build
```

The WASM path owns only neighbor aggregation; steering, pointer interaction,
wrapping, and drawing stay in TypeScript so the existing worker fallback remains
complete and readable.

The worker loop mirrors the main runtime rules:

1. Pause when the owning canvas is off-screen.
2. Respect the same DPR caps from `src/lib/dpr.ts`.
3. Reinitialize on resize and device-profile changes.
4. Throttle to the demo's existing FPS cap.
5. Terminate the worker on unmount.

## Browser Support

Workers are progressive enhancement only. Unsupported browsers, strict privacy
modes, or browsers that throw during canvas transfer use the main-thread
fallback without changing the public UI.

Acceptance checks:

- Full routes for `reaction-diffusion`, `boids-flock`, and `sand-piles` should
  show `data-lab-worker-runtime` when transfer support exists.
- The same routes should still render a canvas and produce no console errors
  when transfer support is removed.
- `/lab/boids-flock` should report `data-lab-wasm-mode="active"` on capable
  Chromium and `fallback` when the WASM asset cannot be loaded.
- Compact lab cards must not mount worker canvases.

## Verification

Automated coverage lives in `e2e/smoke.spec.ts`:

- Worker-backed routes load and expose worker runtime markers on capable
  Chromium.
- Fallback mode is forced by disabling `transferControlToOffscreen` before page
  load, then checking the route remains navigable and error-free.

Manual low-end verification still belongs in
`docs/LOW_END_DEVICE_VERIFICATION.md` after deploy.
