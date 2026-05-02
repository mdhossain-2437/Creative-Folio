"use client";

// Type the studio's first name anywhere on the site (outside an editable
// element) to trigger a brand reveal moment + the "true-believer" achievement.
// Uses a sliding-window matcher so each correctly-typed letter advances the
// chord; mistyping resets it. Capitals are ignored.
//
// Sequence: D → E → L → O → W → A → R

import { useEffect, useState } from "react";
import { unlock } from "@/lib/achievements";

const SEQUENCE = "delowar";
const RESET_AFTER_MS = 1800;

function isEditable(): boolean {
  const tag = (document.activeElement?.tagName || "").toLowerCase();
  if (["input", "textarea", "select"].includes(tag)) return true;
  const editable = document.activeElement as HTMLElement | null;
  return Boolean(editable?.isContentEditable);
}

export function SecretWordWatcher() {
  const [showReveal, setShowReveal] = useState(false);

  useEffect(() => {
    let progress = 0;
    let lastT = 0;
    let resetTimer: number | undefined;

    const reset = () => {
      progress = 0;
      lastT = 0;
      if (resetTimer !== undefined) {
        window.clearTimeout(resetTimer);
        resetTimer = undefined;
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isEditable()) return;
      // Only ASCII letters — single-character keys
      if (e.key.length !== 1) return;
      const k = e.key.toLowerCase();

      const now = performance.now();
      if (lastT && now - lastT > RESET_AFTER_MS) reset();
      lastT = now;

      const expected = SEQUENCE[progress];
      if (k === expected) {
        progress += 1;
        if (resetTimer !== undefined) window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(reset, RESET_AFTER_MS);
        if (progress === SEQUENCE.length) {
          reset();
          unlock("true-believer");
          setShowReveal(true);
        }
      } else if (k === SEQUENCE[0]) {
        progress = 1;
      } else {
        progress = 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      reset();
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
        <p className="font-mono text-[10px] uppercase tracking-widest text-warmwhite/40">
          Esc to dismiss · auto in 4s
        </p>
      </div>
    </div>
  );
}
