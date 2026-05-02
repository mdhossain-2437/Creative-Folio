"use client";

// TimeCapsule — MMXXVII micro-feature.
//
// Press `c` (no input focused) to capture a "time capsule" of the current
// page state: timestamp, scroll progress, atmosphere mode, and the current
// section. Stores the last 5 captures in localStorage and shows a small
// toast. Captures can be retrieved by the command palette or by visiting
// /capsule (URL hash deep-link). For now we just toast the snapshot.

import { useEffect } from "react";
import { pushToast } from "@/components/ui/Toast";
import { unlock } from "@/lib/achievements";

const STORAGE_KEY = "delowar:timecapsule";
const MAX = 5;

type Capsule = {
  ts: string;
  path: string;
  scrollPct: number;
  atmosphere: string;
};

function snapshot(): Capsule {
  const scrollH = Math.max(
    1,
    document.documentElement.scrollHeight - window.innerHeight
  );
  const pct = Math.round((window.scrollY / scrollH) * 100);
  return {
    ts: new Date().toISOString(),
    path: window.location.pathname,
    scrollPct: Math.min(100, Math.max(0, pct)),
    atmosphere: document.documentElement.dataset.atmosphere ?? "aura",
  };
}

function persist(c: Capsule) {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const prev: Capsule[] = raw ? (JSON.parse(raw) as Capsule[]) : [];
    const next = [c, ...prev].slice(0, MAX);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* silent */
  }
}

export function TimeCapsule() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      const tag = (document.activeElement?.tagName || "").toLowerCase();
      const editable =
        ["input", "textarea", "select"].includes(tag) ||
        Boolean((document.activeElement as HTMLElement | null)?.isContentEditable);
      if (editable) return;
      if (e.key !== "c" && e.key !== "C") return;
      e.preventDefault();
      const cap = snapshot();
      persist(cap);
      const niceTime = cap.ts.slice(11, 16);
      pushToast({
        id: `capsule-${cap.ts}`,
        title: "Time capsule saved",
        description: `${niceTime} · ${cap.path} · ${cap.scrollPct}% · ${cap.atmosphere}`,
        variant: "info",
      });
      unlock("capsule-keeper");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
