"use client";

import { useEffect, useState } from "react";

const KEY = "delowar:motion";

export function applyMotion(state: "on" | "off") {
  if (typeof document === "undefined") return;
  document.body.classList.toggle("calm-motion", state === "off");
  if (state === "on") document.body.classList.add("grain-on");
  else document.body.classList.remove("grain-on");
}

export function MotionToggle() {
  const [state, setState] = useState<"on" | "off">("on");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stored = window.localStorage.getItem(KEY) as "on" | "off" | null;
    const initial: "on" | "off" = stored ?? (reduce ? "off" : "on");
    setState(initial);
    applyMotion(initial);
  }, []);

  const toggle = () => {
    const next = state === "on" ? "off" : "on";
    setState(next);
    applyMotion(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(KEY, next);
      // StorageEvent only fires in *other* tabs, so dispatch a same-tab signal
      // for any in-page consumer (CursorTrail, AmbientAudio, etc.) that needs
      // to react immediately when motion is toggled here.
      window.dispatchEvent(new CustomEvent("delowar:motion-change", { detail: next }));
    }
  };

  return (
    <button
      onClick={toggle}
      data-cursor="hover"
      data-cursor-label={state === "on" ? "CALM" : "PLAY"}
      aria-label="Toggle motion"
      className="group inline-flex items-center gap-2 rounded-full border border-warmwhite/20 bg-ink-950/40 px-3 py-1.5 font-sans text-[10px] uppercase tracking-widest text-warmwhite/70 hover:border-warmwhite/60 hover:text-warmwhite"
    >
      <span className={`relative inline-flex h-3 w-6 items-center rounded-full ${state === "on" ? "bg-peach" : "bg-warmwhite/15"}`}>
        <span
          className={`absolute h-2.5 w-2.5 rounded-full bg-ink-950 transition-transform duration-300 ${state === "on" ? "translate-x-3" : "translate-x-0.5"}`}
        />
      </span>
      <span>Motion {state === "on" ? "On" : "Off"}</span>
    </button>
  );
}
