# Project: Creative-Folio Stack Modernization, Theme Restoration, Cursor Acceleration & Physics Optimization

## Architecture
- Framework: Next.js 16.3.6 (App Router), React 19.3.0, TypeScript 5.9, Tailwind CSS 3.4.19.
- Atmosphere Engine: Canonical dark palette default (`aura` on `#0c0c0c` / `#070708`) with 5 user-selectable atmosphere modes (`aura`, `storm`, `stillness`, `eink`, `terminal`). Voluntary `eink` retained without intrusive CSS class `!important` overrides.
- Fast-Track Desktop Cursor: Fine-pointer detection `(pointer: fine)` activates `Cursor` and `CursorSpotlight` immediately on client hydration / initial pointer movement, while deferred background chrome remains on the 7–12s idle quiet timer. Mobile/touch devices bypass cursor layers entirely.
- Motion, Physics & Graphics: Frame-rate-independent continuous exponential decay damping (`damp.ts`, `K_FAST`, `K_HERO`), strict `prefers-reduced-motion: reduce` fallbacks across GSAP (`ScrollScrubText`), WebGL shaders, Three.js canvases, CSS transforms, offscreen `IntersectionObserver` pause (`threshold: 0.01`), and tier-aware DPR capping (`dpr.ts`).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Revert Light-Mode Overrides in `globals.css` | Delete `@media (prefers-color-scheme: light)` block (lines 13–21) and high-contrast class overrides (lines 56–111) | M1 | Survey 1 (21e68efa) |
| 2 | Restore Canonical `themeColor` & Body in `layout.tsx` | Revert `viewport.themeColor` to `#0c0c0c` and `<body>` className to `bg-ink-900 text-warmwhite` | M1 | Survey 1 (21e68efa) |
| 3 | Restore `"aura"` Default in `AtmosphereMode.tsx` | Set initial mode to `"aura"`, delete system `prefers-color-scheme` listener and manual override ref | M1 | Survey 1 (21e68efa) |
| 4 | Decouple Cursor from 7-12s Idle Gate in `LazyChrome.tsx` | Implement Tier 1 fine-pointer fast-track for `Cursor` and `CursorSpotlight` with instant pointermove + 200ms hydration fallback; bypass on mobile | M1 | Survey 1 (21e68efa) |
| 5 | Clean `LazyChromeBundle.tsx` | Remove `Cursor` and `CursorSpotlight` from secondary idle-deferred bundle | M1 | Survey 1 (21e68efa) |
| 6 | Core Framework Upgrade (Next.js & React) | Bump Next.js & eslint-config-next to `^16.3.6`, React & React-DOM + types to `^19.3.0` | M1 | Survey 2 (7d35e047) |
| 7 | Graphics & Motion Upgrade (Three, Fiber, Drei, Lenis) | Bump Three.js to `^0.186.1` & types `^0.186.0`, Fiber `^9.8.1`, Drei `^10.7.8`, Lenis `^1.3.26`, Tailwind `^3.4.19` | M1 | Survey 2 (7d35e047) |
| 8 | Three.js Damping in `ReelChapterCarousel.tsx` | Replace linear lerp `* 0.06` with `damp(..., K.K_HERO, clampDt(delta))` in `useFrame` | M1 | Survey 3 (41535931) |
| 9 | Cursor Spotlight Damping & rafBus Priority | Subscribe to `subscribeRafPriority(..., 0)` and damp coordinates with `K.K_FAST` | M1 | Survey 3 (41535931) |
| 10 | Idle Sleep & Reduced Motion in `Magnetic.tsx` | Sleep rAF loop when element is at rest; bypass transform when `prefers-reduced-motion` is active | M1 | Survey 3 (41535931) |
| 11 | Throttle & Proximity rAF in `MagneticLetters.tsx` | Stop continuous rAF loop, cache letter bounding boxes, tick only when pointer enters bounding proximity | M1 | Survey 3 (41535931) |
| 12 | GSAP Strict Reduced Motion in `ScrollScrubText.tsx` | Under `prefers-reduced-motion: reduce`, set word spans to opacity 1 and do not instantiate GSAP / `ScrollTrigger` | M1 | Survey 3 (41535931) |
| 13 | WebGL/Shader Reduced Motion & IO 0.01 Threshold | Update IO threshold to `0.01` and cancel rAF immediately on exit in `HeroShader.tsx`, `HeroShaderGpu.tsx`, `NoiseField.tsx` | M1 | Survey 3 (41535931) |
| 14 | Canvas DPR Capping & 404 IO Pause | Use `cappedDpr(DPR_CANVAS)` in `AtlasConstellation.tsx`, `ParticleField404.tsx`, `CursorTrail.tsx`; add IO pause to `ParticleField404.tsx` | M1 | Survey 3 (41535931) |
| 15 | Remove Scroll Hot Path State in `SectionRail.tsx` | Replace React `setProgress` state with CSS `calc(var(--scroll-progress, 0) * 100%)` | M1 | Survey 3 (41535931) |
| 16 | Reduced Motion CSS Fallbacks in `globals.css` | Add `@media (prefers-reduced-motion: reduce)` rules for `.kinetic` and `.marquee-track` | M1 | Survey 3 (41535931) |
| 17 | Canvas Budget Manager Zero under Reduced Motion | Set `maxActiveRuntimes` to `0` when `profile.reducedMotion` is true in `canvasRuntimeBudget.ts` | M1 | Survey 3 (41535931) |
| 18 | Quality Gate Verification | Run `pnpm typecheck`, `pnpm lint`, and `pnpm build` with zero errors | M1 | Survey 2 & AGENTS.md |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Stack Upgrades, Theme Restoration, Cursor Acceleration & Physics Optimization | Features 1–18 (R1 through R5) | None | DONE |

## Interface Contracts

### Theme Contract
- Root default: `--bg: #0c0c0c; --fg: #efece9; --accent: #e3bfb4; color-scheme: dark;`
- Initial atmosphere: `"aura"` on `#0c0c0c` / `#070708`.
- Viewport themeColor: `#0c0c0c`.
- Body classes: `bg-ink-900 text-warmwhite font-sans antialiased selection:bg-peach selection:text-ink-900`.

### Desktop Cursor Fast-Track Contract (`LazyChrome.tsx`)
- Desktop condition: `window.matchMedia("(pointer: fine)").matches === true`.
- Hydration / pointer activation: `pointermove` and `mousemove` with `{ passive: true, once: true }` plus 200ms hydration fallback.
- Mobile/Touch: Completely bypassed; no imports, no listeners.

### Damping & Motion Contract
- Exponential decay damping: `damp(current, target, k, dt)` where $k = -60 \ln(1 - f)$.
- `clampDt(dt, maxMs = 50)` bounds step duration to avoid overshoot.
- Constants from `src/lib/damp.ts`: `K.K_FAST = 11.94`, `K.K_HERO = 3.71`, `K.K_GENTLE = 5.0`.
- Continuous drag: `exp(-k * dt)`.
- IntersectionObserver: `{ threshold: 0.01 }` with immediate `cancelAnimationFrame(raf)` on `!isIntersecting`.
- DPR cap: `cappedDpr(cap)` honoring `tierDprScale()`.

## Code Layout
- `src/app/globals.css` (R1 theme revert, R4 reduced-motion CSS)
- `src/app/layout.tsx` (R1 themeColor & body class)
- `src/components/ui/AtmosphereMode.tsx` (R1 canonical aura default)
- `src/components/layout/LazyChrome.tsx` (R2 Tier 1 fine pointer fast-track)
- `src/components/layout/LazyChromeBundle.tsx` (R2 Tier 2 deferred bundle)
- `package.json` (R3 core dependencies & devDependencies)
- `src/components/showreel/ReelChapterCarousel.tsx` (R4 Three.js damp)
- `src/components/ui/CursorSpotlight.tsx` (R4 rafBus priority 0 + damp K_FAST)
- `src/components/ui/Magnetic.tsx` (R4 idle sleep + reduced-motion check)
- `src/components/ui/MagneticLetters.tsx` (R4 hover proximity rAF + cached rects)
- `src/components/ui/ScrollScrubText.tsx` (R4 GSAP reduced-motion fallback)
- `src/components/webgl/HeroShader.tsx` (R4 IO threshold 0.01 + immediate cancel)
- `src/components/webgl/HeroShaderGpu.tsx` (R4 IO threshold 0.01 + immediate cancel)
- `src/components/webgl/NoiseField.tsx` (R4 IO threshold 0.01 + reduced-motion guard)
- `src/components/atlas/AtlasConstellation.tsx` (R4 cappedDpr + static frame under reduce)
- `src/components/ui/ParticleField404.tsx` (R4 cappedDpr + IO pause)
- `src/components/ui/CursorTrail.tsx` (R4 cappedDpr + reduced-motion check)
- `src/lib/canvasRuntimeBudget.ts` (R4 0 simulations under reduced-motion)
- `src/components/ui/SectionRail.tsx` (R4 remove scroll hot path React state)
