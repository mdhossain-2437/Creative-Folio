# CSS Scroll-Driven Animations

## Current State

The site now uses native CSS scroll-driven animations for simple, safe cases
while keeping JavaScript fallbacks for browsers without support.

Native paths:

- Page progress hairlines use `animation-timeline: scroll()`.
- Generic `Reveal` blocks use `animation-timeline: view()`.

Fallback paths:

- Progress bars use passive scroll listeners plus direct DOM `transform`
  updates.
- `Reveal` uses the existing `IntersectionObserver` class toggle.
- GSAP, Lenis, Framer Motion, and complex timeline work stay unchanged.

## Files

- `src/lib/nativeScrollAnimation.ts` feature-detects support.
- `src/app/globals.css` owns the `@supports` timeline rules.
- `src/components/ui/ScrollProgress.tsx` and
  `src/components/ui/ScrollMeter.tsx` use native `scroll()` where available.
- `src/components/ui/Reveal.tsx` marks elements for native `view()` timelines
  and skips its observer on capable browsers.

## Policy

Use native scroll-driven CSS only for animations that are:

1. Pure opacity/transform/filter.
2. Decorative or already visible through a fallback.
3. Independent of React state.
4. Safe under Lenis and native touch scrolling.

Do not migrate:

- GSAP timelines.
- Pinned/sticky editorial choreography.
- Canvas/WebGL/rAF loops.
- Anything that needs route state, measurements, or user input.

## Reduced Motion

`prefers-reduced-motion: reduce` still disables reveal motion and leaves
progress indicators static/fallback-driven as before. Do not add native scroll
animations outside the existing reduced-motion media guards.

## Verification

Automated smoke coverage checks that capable Chromium exposes a native
`animation-timeline` on the progress bar. Unsupported browsers are covered by
the same smoke routes because the fallback DOM remains unchanged.

Manual verification:

```js
CSS.supports("animation-timeline: scroll()");
getComputedStyle(document.querySelector("[data-scroll-progress-native]"))
  .animationTimeline;
```

If support is true, the timeline should not be `auto`.
