# Web Worker Migration Strategy

## Current State

Lab simulations currently run on the main thread through the shared
`src/components/lab/runtime/CanvasDemo.tsx` runtime. Each experiment now lives
in its own lazy module under `src/components/lab/demos/`, so worker migration
can target only the heavy slugs instead of touching every lab renderer at once.

The runtime uses:
- Canvas 2D rendering
- IntersectionObserver for pause/resume
- Device tier-based performance scaling
- Runtime budget management

## Migration Challenges

Moving lab simulations to Web Workers presents several challenges:

### 1. Canvas Rendering
- **OffscreenCanvas**: Required for canvas rendering in workers
- **Browser Support**: OffscreenCanvas has good but not universal support
- **Fallback Needed**: Must maintain main thread rendering for unsupported browsers

### 2. Component Architecture
- **React Integration**: Web Workers don't integrate directly with React
- **State Management**: Need to sync worker state with React state
- **Event Handling**: Mouse/keyboard events need to be forwarded to workers

### 3. Code Structure
- **Shared Code**: Simulation logic needs to be extractable from React components
- **Worker Communication**: PostMessage API for all data transfer
- **Serialization**: Complex objects need to be serializable for transfer

### 4. Performance Considerations
- **Overhead**: Worker creation and message passing has overhead
- **Memory**: Workers have separate memory spaces
- **Complexity**: May not benefit all simulations (some are already lightweight)

## Recommended Approach

### Phase 1: Infrastructure
1. Create worker utility library for worker management
2. Implement OffscreenCanvas detection and fallback
3. Create message protocol for worker communication

### Phase 2: Extract Simulation Logic
1. Start with `ReactionDiffusionDemo.tsx`, `BoidsFlockDemo.tsx`, and
   `SandPilesDemo.tsx`
2. Create pure simulation functions
3. Test simulations independently

### Phase 3: Worker Implementation
1. Create worker files for heavy simulations only
2. Implement worker message handlers
3. Add fallback to main thread rendering

### Phase 4: Integration
1. Update only the targeted per-slug demo modules to use workers when available
2. Add worker lifecycle management
3. Test across browsers

## Priority Assessment

Given the current performance optimizations:
- Device tier scaling already reduces load on low-end devices
- IntersectionObserver pauses off-screen simulations
- Runtime budget management prevents resource exhaustion
- Per-slug dynamic modules prevent unseen grid cards from parsing every demo

The Web Worker migration should therefore stay targeted. The strongest
candidate slugs are:
- `reaction-diffusion`
- `boids-flock`
- `sand-piles`

## Recommendation

Adopt workers as progressive enhancement only:
1. Feature-detect `OffscreenCanvas` and worker transfer support
2. Keep the existing main-thread Canvas2D renderer as the fallback
3. Move only the CPU-bound simulation step off-thread; do not rewrite
   shader-bound or already-lightweight demos
4. Verify low-end Android Chrome with the real-device checklist after deploy
