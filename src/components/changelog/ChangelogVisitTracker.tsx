"use client";

import { useEffect } from "react";
import { unlock } from "@/lib/achievements";

export function ChangelogVisitTracker() {
  useEffect(() => {
    const t = window.setTimeout(() => unlock("curator"), 1200);
    return () => window.clearTimeout(t);
  }, []);
  return null;
}
