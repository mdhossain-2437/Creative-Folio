"use client";

// Client wrapper for the WebGL carousel. Server pages can't pass
// `ssr: false` to next/dynamic — so this thin client component does the
// dynamic import on its behalf.
//
// The carousel is touch / reduced-motion / WebGL gated. We gate the
// dynamic import itself (not just the rendered output) so the heavy
// R3F + drei + three chunk never loads on devices that won't use it
// or where the chunk's React-internals access fails. If the import or
// mount throws, we fall back silently to null — the static `<ol>`
// chapter list below remains the source of truth.

import { useEffect, useState } from "react";

type Clip = {
  index: string;
  title: string;
  duration: string;
  poster: string;
};

type Props = { clips: Clip[] };

type CarouselComp = (props: Props) => React.ReactElement | null;

export function ReelChapterCarouselClient({ clips }: Props) {
  const [Comp, setComp] = useState<CarouselComp | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (reduce || isTouch) return;
    // Probe WebGL2 — skip the import if unsupported (heavy chunk has no value).
    try {
      const probe = document.createElement("canvas");
      if (!probe.getContext("webgl2")) return;
    } catch {
      return;
    }

    let mounted = true;
    import("./ReelChapterCarousel")
      .then((m) => {
        if (!mounted) return;
        setComp(() => m.ReelChapterCarousel as CarouselComp);
      })
      .catch(() => {
        // Silent fail — static chapter list takes over.
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (!Comp) return null;
  return <Comp clips={clips} />;
}
