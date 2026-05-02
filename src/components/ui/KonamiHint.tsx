"use client";

// Tiny live indicator showing partial Konami progress so the easter egg is
// discoverable for keyboard tinkerers. Renders nothing until the user has
// matched the first 3 keys of the sequence; quietly disappears on miss.

import { useEffect, useState } from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const GLYPH: Record<string, string> = {
  ArrowUp: "↑",
  ArrowDown: "↓",
  ArrowLeft: "←",
  ArrowRight: "→",
  b: "B",
  a: "A",
};

export function KonamiHint() {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let buf: string[] = [];
    let dismissTimer: number | undefined;

    const onKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName || "").toLowerCase();
      if (["input", "textarea", "select"].includes(tag)) return;
      buf = [...buf, e.key].slice(-KONAMI.length);
      let p = 0;
      for (let i = 0; i < buf.length; i++) {
        if (buf[i].toLowerCase() === KONAMI[i].toLowerCase()) p = i + 1;
        else {
          p = 0;
          // try realigning: longest suffix that matches prefix
          for (let start = 1; start < buf.length; start++) {
            const suffix = buf.slice(start);
            const ok = suffix.every(
              (k, idx) => k.toLowerCase() === KONAMI[idx].toLowerCase()
            );
            if (ok) {
              p = suffix.length;
              break;
            }
          }
          break;
        }
      }
      setProgress(p);

      if (dismissTimer !== undefined) window.clearTimeout(dismissTimer);
      if (p > 0 && p < KONAMI.length) {
        dismissTimer = window.setTimeout(() => setProgress(0), 2500);
      } else if (p >= KONAMI.length) {
        setProgress(0);
        buf = [];
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (dismissTimer !== undefined) window.clearTimeout(dismissTimer);
    };
  }, []);

  if (progress < 3) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-6 left-6 z-[125] flex items-center gap-2 rounded-full border border-warmwhite/15 bg-ink-900/85 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-warmwhite/70 shadow-2xl backdrop-blur"
    >
      <span className="text-warmwhite/65">◊ konami</span>
      <span className="flex items-center gap-1">
        {KONAMI.map((k, i) => (
          <span
            key={i}
            className={`flex h-5 w-5 items-center justify-center rounded border text-[11px] transition-colors ${
              i < progress
                ? "border-electric/60 bg-electric/15 text-electric"
                : "border-warmwhite/15 text-warmwhite/30"
            }`}
          >
            {GLYPH[k] ?? k.toUpperCase()}
          </span>
        ))}
      </span>
    </div>
  );
}
