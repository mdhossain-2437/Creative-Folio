"use client";

// SecretWordWatcher — type one of a small dictionary of "secret words"
// anywhere on the site (outside an editable element) to trigger a
// reaction. Each word is matched with an independent sliding-window
// progress counter; mistyping resets only that word.
//
// Words & reactions:
//   delowar  — full-screen brand reveal + "true-believer" achievement
//   peach    — atmosphere → aura
//   storm    — atmosphere → storm
//   quiet    — atmosphere → stillness
//   print    — atmosphere → eink
//   reel     — open the showreel modal (dispatches a CustomEvent)
//   menu     — opens the command palette (Cmd/Ctrl+K)

import { useEffect, useState } from "react";
import { unlock } from "@/lib/achievements";
import { pushToast } from "@/components/ui/Toast";

type Reaction =
  | { kind: "reveal" }
  | { kind: "atmosphere"; mode: "aura" | "storm" | "stillness" | "eink" }
  | { kind: "showreel" }
  | { kind: "command-palette" };

const WORDS: { word: string; reaction: Reaction; toast?: string }[] = [
  { word: "delowar", reaction: { kind: "reveal" } },
  { word: "peach", reaction: { kind: "atmosphere", mode: "aura" }, toast: "Atmosphere · Aura" },
  { word: "storm", reaction: { kind: "atmosphere", mode: "storm" }, toast: "Atmosphere · Storm" },
  { word: "quiet", reaction: { kind: "atmosphere", mode: "stillness" }, toast: "Atmosphere · Stillness" },
  { word: "print", reaction: { kind: "atmosphere", mode: "eink" }, toast: "Atmosphere · E-ink" },
  { word: "reel", reaction: { kind: "showreel" }, toast: "Reel · open" },
  { word: "menu", reaction: { kind: "command-palette" }, toast: "Command palette · open" },
];

const RESET_AFTER_MS = 1800;

function isEditable(): boolean {
  const tag = (document.activeElement?.tagName || "").toLowerCase();
  if (["input", "textarea", "select"].includes(tag)) return true;
  const editable = document.activeElement as HTMLElement | null;
  return Boolean(editable?.isContentEditable);
}

function trigger(reaction: Reaction) {
  switch (reaction.kind) {
    case "atmosphere":
      document.dispatchEvent(
        new CustomEvent("folio-atmosphere-set", { detail: { mode: reaction.mode } })
      );
      break;
    case "showreel":
      window.dispatchEvent(new CustomEvent("delowar:open-showreel"));
      break;
    case "command-palette":
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
      break;
    case "reveal":
      // Handled inline in the watcher (sets local state).
      break;
  }
}

export function SecretWordWatcher() {
  const [showReveal, setShowReveal] = useState(false);

  useEffect(() => {
    // One progress counter per word. Each receives the same keystroke;
    // each independently advances or resets based on its own match.
    const progress = WORDS.map(() => 0);
    let lastT = 0;
    let resetTimer: number | undefined;
    let unlockedSecrets = 0;

    const resetAll = () => {
      for (let i = 0; i < progress.length; i += 1) progress[i] = 0;
      lastT = 0;
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isEditable()) return;
      if (e.key.length !== 1) return;
      const k = e.key.toLowerCase();

      const now = performance.now();
      if (lastT && now - lastT > RESET_AFTER_MS) resetAll();
      lastT = now;

      WORDS.forEach((entry, idx) => {
        const expected = entry.word[progress[idx]];
        if (k === expected) {
          progress[idx] += 1;
          if (progress[idx] === entry.word.length) {
            progress[idx] = 0;
            if (entry.reaction.kind === "reveal") {
              unlock("true-believer");
              setShowReveal(true);
            } else {
              trigger(entry.reaction);
              if (entry.toast) {
                pushToast({
                  id: `secret-${entry.word}`,
                  title: "Secret word",
                  description: entry.toast,
                  variant: "info",
                });
              }
              unlockedSecrets += 1;
              if (unlockedSecrets >= 4) unlock("polyglot");
            }
          }
        } else if (k === entry.word[0]) {
          progress[idx] = 1;
        } else {
          progress[idx] = 0;
        }
      });

      if (resetTimer !== undefined) window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(resetAll, RESET_AFTER_MS);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      resetAll();
      if (resetTimer !== undefined) window.clearTimeout(resetTimer);
    };
  }, []);

  useEffect(() => {
    if (!showReveal) return;
    const t = window.setTimeout(() => setShowReveal(false), 4200);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowReveal(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [showReveal]);

  if (!showReveal) return null;
  return (
    <div
      role="dialog"
      aria-label="Secret word reveal"
      className="pointer-events-none fixed inset-0 z-[140] flex items-center justify-center px-6"
    >
      <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-md transition-opacity duration-500" />
      <div className="relative flex flex-col items-center gap-6 text-center">
        <p className="font-sans text-[10px] uppercase tracking-widest text-peach">
          ◊ Studio · 02.06
        </p>
        <p className="font-serif text-[clamp(3.6rem,12vw,9rem)] leading-[0.92] tracking-tightest text-warmwhite">
          Delowar.
        </p>
        <p className="max-w-md font-serif italic text-warmwhite/65 md:text-lg">
          You spelled the studio. Some doors open by knock.
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-warmwhite/65">
          Esc to dismiss · auto in 4s · try: peach, storm, quiet, print, reel, menu
        </p>
      </div>
    </div>
  );
}
