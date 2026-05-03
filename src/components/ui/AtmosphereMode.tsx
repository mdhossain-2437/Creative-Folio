"use client";

// AtmosphereMode — MMXXVII feature.
//
// A four-stop atmosphere cycle that re-tones the studio:
//   aura      — default warm peach gradient
//   storm     — cooler, higher-contrast electric overlay
//   stillness — deeper black, no grain
//   eink      — high-contrast greyscale (printable)
//
// Cycled with the `t` key (case-insensitive) or via the floating button.
// **Resets to `aura` on every fresh visit** (in-session only — no
// localStorage persist) so returning visitors land in the canonical look
// instead of whatever they last clicked. Respects prefers-reduced-motion.

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

const ACCENT: Record<Mode, string> = {
  aura: "rgba(227, 191, 180, 0.45)",
  storm: "rgba(205, 250, 0, 0.42)",
  stillness: "rgba(7, 7, 8, 0.55)",
  eink: "rgba(239, 236, 233, 0.55)",
};

function applyMode(mode: Mode) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.atmosphere = mode;
}

function emitShockwave(mode: Mode, originX: number, originY: number) {
  if (typeof document === "undefined") return;
  const reduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (reduced) return;
  const wave = document.createElement("div");
  wave.setAttribute("aria-hidden", "true");
  wave.style.cssText = [
    "position:fixed",
    "left:0",
    "top:0",
    "width:100vw",
    "height:100vh",
    "pointer-events:none",
    "z-index:120",
    `background:radial-gradient(circle at ${originX}px ${originY}px, ${ACCENT[mode]} 0%, transparent 55%)`,
    `clip-path:circle(0% at ${originX}px ${originY}px)`,
    "transition:clip-path 720ms cubic-bezier(0.22, 1, 0.36, 1), opacity 480ms ease-out 320ms",
    "opacity:1",
    "mix-blend-mode:screen",
  ].join(";");
  document.body.appendChild(wave);
  // Trigger transition next frame
  requestAnimationFrame(() => {
    wave.style.clipPath = `circle(150% at ${originX}px ${originY}px)`;
    wave.style.opacity = "0";
  });
  window.setTimeout(() => {
    wave.remove();
  }, 1100);
}

export function AtmosphereMode() {
  const [mode, setMode] = useState<Mode>("aura");
  const [open, setOpen] = useState(false);
  const visitedRef = useRef<Set<Mode>>(new Set(["aura"]));

  useEffect(() => {
    // Always start fresh in `aura`. Atmosphere choice is in-session only;
    // we deliberately don't persist across page loads — return visitors
    // were landing in STORM with no context which felt jarring.
    applyMode("aura");
  }, []);

  const cycle = useCallback((origin?: { x: number; y: number }) => {
    setMode((curr) => {
      const next = MODES[(MODES.indexOf(curr) + 1) % MODES.length];
      applyMode(next);
      const x =
        origin?.x ??
        (typeof window !== "undefined" ? window.innerWidth - 56 : 0);
      const y =
        origin?.y ??
        (typeof window !== "undefined" ? window.innerHeight - 56 : 0);
      emitShockwave(next, x, y);
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

  const setExact = useCallback((next: Mode, origin?: { x: number; y: number }) => {
    setMode(() => {
      applyMode(next);
      const x =
        origin?.x ??
        (typeof window !== "undefined" ? window.innerWidth / 2 : 0);
      const y =
        origin?.y ??
        (typeof window !== "undefined" ? window.innerHeight / 2 : 0);
      emitShockwave(next, x, y);
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
    const onAtmosphereSet = (e: Event) => {
      const detail = (e as CustomEvent<{ mode: Mode }>).detail;
      if (!detail?.mode) return;
      if (!MODES.includes(detail.mode)) return;
      setExact(detail.mode);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("folio-atmosphere-set", onAtmosphereSet as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener(
        "folio-atmosphere-set",
        onAtmosphereSet as EventListener
      );
    };
  }, [cycle, setExact]);

  return (
    <div
      data-floating-overlay
      className="floating-overlay fixed bottom-6 right-6 z-30 hidden md:block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={(e) => cycle({ x: e.clientX, y: e.clientY })}
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
