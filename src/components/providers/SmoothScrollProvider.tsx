"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import { subscribeRafPriority } from "@/lib/rafBus";

// Smooth-scroll provider. Re-architected for performance.
//
// Why no React state:
//   The previous version called `setState({ velocity, scroll, progress })`
//   on every Lenis tick — i.e. every frame the user scrolls. Any consumer
//   of `useScrollState()` re-rendered at 60–120 fps, blowing the React
//   reconciler's budget on a hot path. On low-end devices this surfaced
//   as visible scroll-jank.
//
// New architecture:
//   The Lenis tick writes velocity + progress to CSS custom properties
//   on the document root (`--scroll-vy`, `--scroll-progress`). Components
//   that want to react to scroll read these via plain CSS — no React,
//   no re-renders, GPU-accelerated.
//
//   For components that need the JS value (e.g. WebGL uniforms), expose
//   `useScrollVelocityRef()` which returns a stable ref updated every
//   tick without triggering re-renders.

type Refs = {
  velocity: number;
  scroll: number;
  progress: number;
};

const refs: Refs = { velocity: 0, scroll: 0, progress: 0 };

export function getScrollState(): Readonly<Refs> {
  return refs;
}

/**
 * Stable ref-based access to scroll metrics. Use this from rAF loops or
 * imperative code that needs the latest value without triggering React
 * re-renders.
 */
export function useScrollVelocityRef() {
  const ref = useRef(refs);
  // Always points at the singleton — never stale.
  ref.current = refs;
  return ref;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      // Reduced motion → native scroll, but still update CSS vars so
      // velocity-coupled animations keep working at a sane intensity.
      const onScroll = () => {
        const max = (document.documentElement.scrollHeight - window.innerHeight) || 1;
        refs.scroll = window.scrollY;
        refs.progress = window.scrollY / max;
        document.documentElement.style.setProperty("--scroll-progress", refs.progress.toFixed(4));
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    // Tuned for "feels native, never floaty". Reference: immersive-g.com
    // and Awwwards Site of the Day winners both sit around lerp 0.08.
    const lenis = new Lenis({
      duration: 0.95,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      gestureOrientation: "vertical",
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
      // Lenis 1.x option — increases lerp amount on big inputs to feel
      // more responsive while keeping micro-scrolls buttery.
      syncTouch: true,
    });

    let lastVelocityWrite = 0;
    lenis.on(
      "scroll",
      ({
        velocity,
        scroll,
        limit,
      }: {
        velocity: number;
        scroll: number;
        limit: number;
      }) => {
        // Damped, clamped velocity for visual coupling. Mutate the
        // singleton — no React state writes.
        const v = Math.max(-6, Math.min(6, velocity / 28));
        refs.velocity = refs.velocity * 0.7 + v * 0.3;
        refs.scroll = scroll;
        refs.progress = limit > 0 ? scroll / limit : 0;
        // Throttle CSS-var writes to ≤ 1 per frame so we don't thrash
        // style recalc when Lenis fires faster than rAF.
        const now = performance.now();
        if (now - lastVelocityWrite > 14) {
          document.documentElement.style.setProperty(
            "--scroll-vy",
            refs.velocity.toFixed(3),
          );
          document.documentElement.style.setProperty(
            "--scroll-progress",
            refs.progress.toFixed(4),
          );
          lastVelocityWrite = now;
        }
      },
    );

    // Subscribe to the shared `rafBus` with negative priority so Lenis
    // ticks BEFORE any canvas / cursor subscriber. This guarantees the
    // updated scroll position + `--scroll-vy` CSS-var are available
    // when the canvases render in the same frame
    // (paper § "Scroll Management").
    const off = subscribeRafPriority((time: number) => {
      lenis.raf(time);
    }, -10);

    return () => {
      off();
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

/**
 * Backwards-compat hook. Returns a *snapshot* read from refs at render
 * time. Does NOT update on scroll. Use `useScrollVelocityRef()` if you
 * need a live value inside an imperative loop.
 *
 * Most components should switch to CSS `var(--scroll-vy)` instead.
 */
export function useScrollState() {
  return {
    velocity: refs.velocity,
    scroll: refs.scroll,
    progress: refs.progress,
  };
}
