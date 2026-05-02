"use client";

import { useEffect, useState } from "react";
import { unlock } from "@/lib/achievements";

const SHORTCUTS: { keys: string[]; label: string }[] = [
  { keys: ["⌘", "K"], label: "Open command palette" },
  { keys: ["⌘", "⇧", "G"], label: "Toggle grid overlay" },
  { keys: ["?"], label: "Open this shortcut sheet" },
  { keys: ["Esc"], label: "Close any modal / overlay" },
  { keys: ["/"], label: "Open command palette (search-style)" },
  { keys: ["G", "→", "Key"], label: "Jump anywhere — h, w, l, p, a, r, j, s, c, n, t" },
  { keys: ["M"], label: "Toggle calmer motion" },
  { keys: ["R"], label: "On /lab — open a random experiment" },
  { keys: ["J"], label: "On a playground — next experiment" },
  { keys: ["K"], label: "On a playground — previous experiment" },
  { keys: ["F"], label: "On a playground — fullscreen the canvas" },
  { keys: ["S"], label: "Copy the current page link" },
  { keys: ["↑", "↑", "↓", "↓", "←", "→", "←", "→", "B", "A"], label: "Konami — shader storm" },
  { keys: ["Tab"], label: "Walk focus through navigation" },
  { keys: ["Click", "Reel"], label: "Open the showreel" },
];

export function CheatSheet() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName || "").toLowerCase();
      const editable = ["input", "textarea", "select"].includes(tag);
      if (!editable && e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setOpen((p) => {
          const next = !p;
          if (next) unlock("power-user");
          return next;
        });
        return;
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-label="Keyboard shortcuts"
      className="fixed inset-0 z-[120] flex items-center justify-center bg-ink-950/80 px-6 backdrop-blur-md"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-warmwhite/15 bg-ink-900 p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-end justify-between">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/45">
              ◊ Shortcuts
            </p>
            <p className="mt-2 font-serif text-3xl tracking-tight text-warmwhite">
              Move at the speed of thought.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            data-cursor="hover"
            aria-label="Close shortcut sheet"
            className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55 hover:text-warmwhite"
          >
            Close · Esc
          </button>
        </div>
        <ul className="mt-8 divide-y divide-warmwhite/10 border-y border-warmwhite/10">
          {SHORTCUTS.map((s) => (
            <li key={s.label} className="flex items-center justify-between py-3">
              <span className="font-sans text-sm text-warmwhite/80">{s.label}</span>
              <span className="flex items-center gap-1.5">
                {s.keys.map((k, i) => (
                  <kbd
                    key={i}
                    className="rounded-md border border-warmwhite/15 bg-ink-950 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-warmwhite/75"
                  >
                    {k}
                  </kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 font-sans text-[10px] uppercase tracking-widest text-warmwhite/40">
          Press ? again to dismiss
        </p>
      </div>
    </div>
  );
}
