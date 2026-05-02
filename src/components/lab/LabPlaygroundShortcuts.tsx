"use client";

// Keyboard shortcuts for /lab/[slug] playground pages:
//   J / ]  → next experiment
//   K / [  → previous experiment
//   F      → toggle fullscreen on the playground canvas (selector: data-lab-stage)
//   D      → download the current canvas frame as a PNG snapshot
//
// Standalone keys, ignored when typing in editable elements or when modifiers
// are held (so the existing G+key chord still works on these pages).

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { pushToast } from "@/components/ui/Toast";
import { unlock } from "@/lib/achievements";

export function snapshotLabStage(slug: string): boolean {
  const stage = document.querySelector<HTMLElement>("[data-lab-stage]");
  const canvas = stage?.querySelector<HTMLCanvasElement>("canvas");
  if (!canvas) {
    pushToast({
      id: "lab-snap-miss",
      title: "Nothing to snapshot",
      description: "This experiment isn't a canvas.",
      variant: "info",
      duration: 1800,
    });
    return false;
  }
  try {
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    a.download = `delowar-lab-${slug}-${stamp}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    pushToast({
      id: `lab-snap:${slug}`,
      title: "Snapshot saved",
      description: a.download,
      variant: "success",
      duration: 2200,
    });
    unlock("snapshotter");
    return true;
  } catch {
    pushToast({
      id: "lab-snap-fail",
      title: "Snapshot failed",
      description: "Browser blocked the canvas export.",
      variant: "info",
      duration: 1800,
    });
    return false;
  }
}

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
      } else if (!e.shiftKey && (key === "d" || key === "D")) {
        e.preventDefault();
        snapshotLabStage(slug);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slug, allSlugs, router]);

  return null;
}
