"use client";

// SmartBackLink — context-aware floating "go back" pill on case-study
// pages. Reads `document.referrer` once on mount:
//   - Same-origin "/" → "← Back to feed"
//   - Same-origin "/works" or "/works/<other>" → "← Back to archive"
//   - Same-origin anywhere else → "← Back to <pretty path>"
//   - External or empty → fallback "← /works"
// Dismissable. Hidden on touch / when modal is open. Bottom-right corner.
//
// Rendered via createPortal into document.body so ancestor filter / transform
// effects on the case-study main column don't break `position: fixed`.

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "@/components/ui/PerformanceLink";

type LinkInfo = { href: string; label: string };

function resolveBack(): LinkInfo {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return { href: "/works", label: "Back to archive" };
  }
  const ref = document.referrer;
  if (!ref) return { href: "/works", label: "Back to archive" };
  let url: URL;
  try {
    url = new URL(ref);
  } catch {
    return { href: "/works", label: "Back to archive" };
  }
  if (url.origin !== window.location.origin) {
    return { href: "/works", label: "Back to archive" };
  }
  const path = url.pathname;
  if (path === "/" || path === "") {
    return { href: "/", label: "Back to feed" };
  }
  if (path === "/works" || path.startsWith("/works/")) {
    return { href: "/works", label: "Back to archive" };
  }
  if (path === "/journal" || path.startsWith("/journal/")) {
    return { href: "/journal", label: "Back to journal" };
  }
  if (path === "/lab" || path.startsWith("/lab/")) {
    return { href: "/lab", label: "Back to lab" };
  }
  if (path === "/showreel") {
    return { href: "/showreel", label: "Back to showreel" };
  }
  // Pretty-print other internal paths
  const pretty = path.replace(/^\//, "").replace(/[-/]/g, " ");
  return { href: path, label: `Back to ${pretty}` };
}

export function SmartBackLink() {
  const [info, setInfo] = useState<LinkInfo | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return; // mobile already has browser back
    setInfo(resolveBack());
    setMounted(true);
    if (reduce) return;
  }, []);

  if (!info || dismissed || !mounted) return null;

  const pill = (
    <div
      data-floating-overlay
      className="floating-overlay fixed bottom-6 right-[14rem] z-30 hidden md:flex items-center gap-1 rounded-full border border-warmwhite/20 bg-ink-950/85 backdrop-blur shadow-2xl"
    >
      <Link
        href={info.href}
        data-cursor="hover"
        data-cursor-label="BACK"
        className="inline-flex items-center gap-2 rounded-l-full pl-4 pr-3 py-2 font-sans text-[10px] uppercase tracking-widest text-warmwhite/85 transition-colors hover:text-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
      >
        <span aria-hidden>←</span>
        <span>{info.label}</span>
      </Link>
      <button
        type="button"
        aria-label="Dismiss back link"
        onClick={() => setDismissed(true)}
        data-cursor="hover"
        data-cursor-label="DISMISS"
        className="inline-flex h-full items-center pr-3 pl-1 py-2 text-warmwhite/70 transition-colors hover:text-warmwhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
      >
        <span aria-hidden className="text-[12px]">×</span>
      </button>
    </div>
  );

  return createPortal(pill, document.body);
}
