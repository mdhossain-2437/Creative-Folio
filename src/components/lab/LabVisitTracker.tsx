"use client";

import { useEffect } from "react";
import { markLabVisit } from "@/lib/achievements";

export function LabVisitTracker({ slug, allSlugs }: { slug: string; allSlugs: string[] }) {
  useEffect(() => {
    markLabVisit(slug, allSlugs);
  }, [slug, allSlugs]);
  return null;
}
