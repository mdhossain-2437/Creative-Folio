"use client";

import { useEffect } from "react";
import { unlock } from "@/lib/achievements";

export function UsesVisitTracker() {
  useEffect(() => {
    // Defer slightly so the achievement toast doesn't collide with the
    // first-visit nudge or the route-curtain entry animation.
    const t = window.setTimeout(() => unlock("tinkerer"), 1200);
    return () => window.clearTimeout(t);
  }, []);
  return null;
}
