"use client";

// SoundDesign — opt-in tactile audio layer.
// Muted by default. Toggle via the nav button (`SoundToggle`) or `S` key.
//
// Sounds are synthesised live (Web Audio oscillators) — no audio assets,
// no licensing, ~0 KB delivered. Tuned to sit *under* the experience:
// short, low-volume, low-frequency. Disabled under prefers-reduced-motion
// and when the user hasn't explicitly turned it on.

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "folio-sound-on";

type Sfx = "hover" | "click" | "open" | "close";

let ctxRef: AudioContext | null = null;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (ctxRef) return ctxRef;
  const Ctor =
    (window.AudioContext as typeof AudioContext | undefined) ||
    ((window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext as typeof AudioContext | undefined);
  if (!Ctor) return null;
  ctxRef = new Ctor();
  return ctxRef;
}

function play(kind: Sfx) {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(() => undefined);
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  if (kind === "hover") {
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, now);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
    osc.start(now);
    osc.stop(now + 0.07);
  } else if (kind === "click") {
    osc.type = "triangle";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.08);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
    osc.start(now);
    osc.stop(now + 0.13);
  } else if (kind === "open") {
    osc.type = "sine";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.18);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
    osc.start(now);
    osc.stop(now + 0.25);
  } else {
    // close
    osc.type = "sine";
    osc.frequency.setValueAtTime(660, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.18);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    osc.start(now);
    osc.stop(now + 0.23);
  }
}

function readEnabled() {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function writeEnabled(v: boolean) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, v ? "1" : "0");
  } catch {
    /* sessionStorage unavailable — fail silent */
  }
  document.documentElement.dataset.sound = v ? "on" : "off";
}

export function SoundProvider() {
  const enabledRef = useRef(false);
  const lastHoverRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const initial = readEnabled();
    enabledRef.current = initial;
    document.documentElement.dataset.sound = initial ? "on" : "off";

    const onSetting = (e: Event) => {
      const detail = (e as CustomEvent<{ on: boolean }>).detail;
      enabledRef.current = !!detail?.on;
    };

    const onOver = (e: MouseEvent) => {
      if (!enabledRef.current) return;
      const target = (e.target as HTMLElement | null)?.closest("[data-cursor]");
      if (!target) return;
      const now = performance.now();
      // Throttle to avoid click-stuttering on rapid moves.
      if (now - lastHoverRef.current < 80) return;
      lastHoverRef.current = now;
      play("hover");
    };

    const onClick = (e: MouseEvent) => {
      if (!enabledRef.current) return;
      const target = (e.target as HTMLElement | null)?.closest(
        "a, button, [role='button'], [data-cursor]"
      );
      if (!target) return;
      play("click");
    };

    document.addEventListener("mouseover", onOver);
    document.addEventListener("click", onClick);
    document.addEventListener("folio-sound-toggle", onSetting as EventListener);
    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("click", onClick);
      document.removeEventListener("folio-sound-toggle", onSetting as EventListener);
    };
  }, []);

  return null;
}

export function SoundToggle({ className }: { className?: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    setOn(readEnabled());
  }, []);

  const toggle = () => {
    const next = !on;
    setOn(next);
    writeEnabled(next);
    document.dispatchEvent(
      new CustomEvent("folio-sound-toggle", { detail: { on: next } })
    );
    if (next) {
      // Resume a suspended context with a user gesture.
      const ctx = getCtx();
      if (ctx?.state === "suspended") ctx.resume().catch(() => undefined);
      play("open");
    } else {
      play("close");
    }
  };

  // Listen for `S` shortcut.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (document.activeElement?.tagName || "").toLowerCase();
      const editable =
        ["input", "textarea", "select"].includes(tag) ||
        Boolean((document.activeElement as HTMLElement | null)?.isContentEditable);
      if (editable) return;
      if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [on]);

  return (
    <button
      type="button"
      onClick={toggle}
      data-cursor="hover"
      data-cursor-label="SOUND"
      aria-pressed={on}
      aria-label={`Sound effects ${on ? "on" : "off"} — press S to toggle`}
      title={`Sound: ${on ? "on" : "off"} · S`}
      className={`group inline-flex items-center gap-1.5 rounded-full border border-warmwhite/15 bg-ink-900/40 px-3 py-1.5 font-sans text-[10px] uppercase tracking-widest transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach ${
        on
          ? "border-peach/60 text-peach"
          : "text-warmwhite/65 hover:border-warmwhite/35 hover:text-warmwhite"
      } ${className ?? ""}`}
    >
      <span aria-hidden className="display-num">
        {on ? "♪" : "·"}
      </span>
      <span>{on ? "Sound" : "Mute"}</span>
    </button>
  );
}
