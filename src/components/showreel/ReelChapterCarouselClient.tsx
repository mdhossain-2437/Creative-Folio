"use client";

// Thin enhanced-only loader for the R3F carousel. The static chapter list in
// `/showreel` is the canonical public UI; this file only imports the heavy
// Three/R3F/drei chunk after the runtime profile proves it is worth loading.

import {
  Component,
  useEffect,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

import {
  resolveRuntimeGraphicsMode,
  scheduleIdleWork,
} from "@/lib/clientPerformance";

type Clip = {
  index: string;
  title: string;
  duration: string;
  poster: string;
};

type Props = { clips: Clip[] };

type CarouselComp = (props: Props) => ReactElement | null;

class CarouselBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

function supportsWebGl2(): boolean {
  try {
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2", {
      antialias: false,
      depth: false,
      powerPreference: "low-power",
      stencil: false,
    });
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

function canLoadEnhancedCarousel(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }
  if (document.visibilityState !== "visible") return false;
  if (resolveRuntimeGraphicsMode() !== "enhanced") return false;
  return supportsWebGl2();
}

export function ReelChapterCarouselClient({ clips }: Props) {
  const [Comp, setComp] = useState<CarouselComp | null>(null);

  useEffect(() => {
    let mounted = true;
    let cancelIdle = () => {};
    let removeVisibilityListener = () => {};

    const load = () => {
      if (!mounted || !canLoadEnhancedCarousel()) return;

      cancelIdle = scheduleIdleWork(() => {
        if (!mounted) return;
        import("./ReelChapterCarousel")
          .then((m) => {
            if (!mounted) return;
            setComp(() => m.ReelChapterCarousel as CarouselComp);
          })
          .catch(() => {
            // Silent fail: the static chapter list remains complete.
          });
      }, 1800);
    };

    if (document.visibilityState === "visible") {
      load();
    } else {
      const onVisible = () => {
        if (document.visibilityState !== "visible") return;
        document.removeEventListener("visibilitychange", onVisible);
        removeVisibilityListener = () => {};
        load();
      };

      document.addEventListener("visibilitychange", onVisible);
      removeVisibilityListener = () => {
        document.removeEventListener("visibilitychange", onVisible);
      };
    }

    return () => {
      mounted = false;
      cancelIdle();
      removeVisibilityListener();
    };
  }, []);

  if (!Comp) return null;
  return (
    <CarouselBoundary>
      <Comp clips={clips} />
    </CarouselBoundary>
  );
}
