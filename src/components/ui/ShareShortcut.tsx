"use client";

// Press `S` (no modifier, no editable focus) to copy the current page URL to
// the clipboard. Surfaces a toast on success and on failure.

import { useEffect } from "react";
import { pushToast } from "@/components/ui/Toast";

function isEditable(): boolean {
  const tag = (document.activeElement?.tagName || "").toLowerCase();
  if (["input", "textarea", "select"].includes(tag)) return true;
  const editable = document.activeElement as HTMLElement | null;
  return Boolean(editable?.isContentEditable);
}

export function ShareShortcut() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.shiftKey) return;
      if (isEditable()) return;
      if (e.key !== "s" && e.key !== "S") return;
      e.preventDefault();
      const url = window.location.href;
      if (!navigator.clipboard?.writeText) {
        pushToast({
          id: "share-fail",
          title: "Couldn't copy",
          description: "Clipboard API unavailable.",
          variant: "info",
          duration: 2200,
        });
        return;
      }
      navigator.clipboard
        .writeText(url)
        .then(() =>
          pushToast({
            id: "share-ok",
            title: "Page link copied",
            description: url.replace(/^https?:\/\//, ""),
            variant: "success",
            duration: 2200,
          })
        )
        .catch(() =>
          pushToast({
            id: "share-fail",
            title: "Couldn't copy",
            description: "Browser blocked the clipboard.",
            variant: "info",
            duration: 2200,
          })
        );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
