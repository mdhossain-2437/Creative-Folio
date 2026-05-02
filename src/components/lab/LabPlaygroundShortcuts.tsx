"use client";

// Keyboard shortcuts for /lab/[slug] playground pages:
//   J / ]  → next experiment
//   K / [  → previous experiment
//   F      → toggle fullscreen on the playground canvas (selector: data-lab-stage)
//
// Standalone keys, ignored when typing in editable elements or when modifiers
// are held (so the existing G+key chord still works on these pages).

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { pushToast } from "@/components/ui/Toast";

function isEditable(): boolean {
  const tag = (document.activeElement?.tagName || "").toLowerCase();
  if (["input", "textarea", "select"].includes(tag)) return true;
  const editable = document.activeElement as HTMLElement | null;
  return Boolean(editable?.isContentEditable);
}

export function LabPlaygroundShortcuts({
  slug,
  allSlugs,
}: {
  slug: string;
  allSlugs: string[];
}) {
  const router = useRouter();

  useEffect(() => {
    const idx = allSlugs.indexOf(slug);
    if (idx < 0) return;
    const next = allSlugs[(idx + 1) % allSlugs.length];
    const prev = allSlugs[(idx - 1 + allSlugs.length) % allSlugs.length];

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isEditable()) return;
      const key = e.key;

      if (!e.shiftKey && (key === "j" || key === "]")) {
        e.preventDefault();
        router.push(`/lab/${next}`);
        pushToast({
          id: `lab-next:${next}`,
          title: "Next experiment",
          description: `→ /lab/${next}`,
          variant: "info",
          duration: 1500,
        });
      } else if (!e.shiftKey && (key === "k" || key === "[")) {
        e.preventDefault();
        router.push(`/lab/${prev}`);
        pushToast({
          id: `lab-prev:${prev}`,
          title: "Previous experiment",
          description: `← /lab/${prev}`,
          variant: "info",
          duration: 1500,
        });
      } else if (!e.shiftKey && (key === "f" || key === "F")) {
        const stage = document.querySelector<HTMLElement>("[data-lab-stage]");
        if (!stage) return;
        e.preventDefault();
        const fsEl = document.fullscreenElement;
        if (fsEl) {
          document.exitFullscreen?.();
        } else {
          stage.requestFullscreen?.().catch(() => {
            pushToast({
              id: "lab-fs-fail",
              title: "Fullscreen blocked",
              description: "Browser denied the request.",
              variant: "info",
              duration: 1800,
            });
          });
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slug, allSlugs, router]);

  return null;
}
