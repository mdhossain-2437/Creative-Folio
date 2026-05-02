"use client";

import { useEffect } from "react";
import { markWorkVisit } from "@/lib/achievements";
import { works } from "@/lib/data";

export function WorkVisitTracker({ slug }: { slug: string }) {
  useEffect(() => {
    // Track only when the visitor scrolls near the bottom of the case study —
    // the achievement is for *reading*, not for landing on the URL.
    const sentinel = document.querySelector("[data-work-end]");
    if (!sentinel) return;
    const allSlugs = works.map((w) => w.slug);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          markWorkVisit(slug, allSlugs);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, [slug]);
  return null;
}
