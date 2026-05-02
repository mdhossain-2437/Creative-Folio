"use client";

// AtmosphereMode — MMXXVII feature.
//
// A four-stop atmosphere cycle that re-tones the studio:
//   aura      — default warm peach gradient
//   storm     — cooler, higher-contrast electric overlay
//   stillness — deeper black, no grain
//   eink      — high-contrast greyscale (printable)
//
// Cycled with the `t` key (case-sensitive false) or via the floating button.
// Persists in localStorage. Respects prefers-reduced-motion (skips transition).

import { useCallback, useEffect, useRef, useState } from "react";
import { pushToast } from "@/components/ui/Toast";
import { unlock } from "@/lib/achievements";

type Mode = "aura" | "storm" | "stillness" | "eink";

const MODES: Mode[] = ["aura", "storm", "stillness", "eink"];

const LABEL: Record<Mode, string> = {
  aura: "Aura · warm peach",
  storm: "Storm · electric edge",
  stillness: "Stillness · pure ink",
  eink: "E-ink · printable",
};

const STORAGE_KEY = "delowar:atmosphere";

function applyMode(mode: Mode) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.atmosphere = mode;
}

export function AtmosphereMode() {
  const [mode, setMode] = useState<Mode>("aura");
  const [open, setOpen] = useState(false);
  const visitedRef = useRef<Set<Mode>>(new Set(["aura"]));

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Mode | null;
      if (saved && MODES.includes(saved)) {
        setMode(saved);
        applyMode(saved);
      } else {
        applyMode("aura");
      }
    } catch {
      applyMode("aura");
    }
  }, []);

  const cycle = useCallback(() => {
    setMode((curr) => {
      const next = MODES[(MODES.indexOf(curr) + 1) % MODES.length];
      applyMode(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* silent */
      }
      pushToast({
        id: `atmosphere-${next}`,
        title: "Atmosphere changed",
        description: LABEL[next],
        variant: "info",
      });
      visitedRef.current.add(next);
      if (visitedRef.current.size >= MODES.length) {
        unlock("atmosphere-shifter");
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (document.activeElement?.tagName || "").toLowerCase();
      const editable =
        ["input", "textarea", "select"].includes(tag) ||
        Boolean((document.activeElement as HTMLElement | null)?.isContentEditable);
      if (editable) return;
      if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        cycle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cycle]);

  return (
    <div
      className="fixed bottom-6 right-6 z-30 hidden md:block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={cycle}
        data-cursor="hover"
        data-cursor-label="ATMOSPHERE"
        aria-label={`Atmosphere: ${LABEL[mode]} · press T to cycle`}
        title={`Atmosphere: ${LABEL[mode]} · press T to cycle`}
        className="group inline-flex items-center gap-2 rounded-full border border-warmwhite/20 bg-ink-950/70 px-4 py-2 font-sans text-[10px] uppercase tracking-widest text-warmwhite/85 shadow-2xl backdrop-blur transition-colors hover:border-peach/60 hover:text-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
      >
        <span aria-hidden className="relative inline-flex h-2 w-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-peach/40" />
          <span className="relative inline-block h-2 w-2 rounded-full bg-peach" />
        </span>
        <span className="display-num">{mode.toUpperCase()}</span>
      </button>
      {open && (
        <div className="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-md border border-warmwhite/20 bg-ink-950/95 px-3 py-2 font-sans text-[10px] uppercase tracking-widest text-warmwhite/85 shadow-xl">
          T · cycle atmosphere
        </div>
      )}
    </div>
  );
}
