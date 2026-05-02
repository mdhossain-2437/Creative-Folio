"use client";

import { useEffect } from "react";
import { unlock } from "@/lib/achievements";

// Soft unlock — visiting /colors is enough to surface awareness, but the loud
// "Designer" toast prefers the real interaction (a swatch click). Visit alone
// is silent so the page entry stays calm.
export function ColorsVisitTracker() {
  useEffect(() => {
    const t = window.setTimeout(() => unlock("designer", { silent: true }), 1500);
    return () => window.clearTimeout(t);
  }, []);
  return null;
}
