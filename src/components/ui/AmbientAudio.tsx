"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const KEY = "delowar:audio";

// Per-route base gain. Lab is dense and benefits from a fuller drone; legal/colophon
// pages drop almost to nothing. Multiplied by motion-toggle gate.
function gainForPath(path: string): number {
  if (path.startsWith("/lab")) return 0.07;
  if (path === "/" || path.startsWith("/showreel")) return 0.05;
  if (path.startsWith("/works")) return 0.045;
  if (path.startsWith("/journal")) return 0.04;
  if (path.startsWith("/legal") || path.startsWith("/colophon")) return 0.018;
  return 0.035;
}

type AudioRefs = {
  ctx: AudioContext;
  master: GainNode;
  filter: BiquadFilterNode;
  oscA: OscillatorNode;
  oscB: OscillatorNode;
  oscC: OscillatorNode;
  lfo: OscillatorNode;
  lfoGain: GainNode;
};

function buildGraph(): AudioRefs {
  const Ctor = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
  const ctx = new Ctor();
  const master = ctx.createGain();
  master.gain.value = 0;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 600;
  filter.Q.value = 0.6;

  const make = (freq: number, type: OscillatorType, level: number) => {
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.value = level;
    o.connect(g).connect(filter);
    o.start();
    return o;
  };

  const oscA = make(55,    "sine",     1.0);   // root A1
  const oscB = make(82.41, "triangle", 0.65);  // E2 (5th)
  const oscC = make(110,   "sine",     0.45);  // A2 (octave)

  // Slow LFO modulating filter cutoff for movement.
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.07;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 280;
  lfo.connect(lfoGain).connect(filter.frequency);
  lfo.start();

  filter.connect(master).connect(ctx.destination);
  return { ctx, master, filter, oscA, oscB, oscC, lfo, lfoGain };
}

export function AmbientAudio() {
  const refs = useRef<AudioRefs | null>(null);
  const path = usePathname() ?? "/";
  const [enabled, setEnabled] = useState(false);
  const [armed, setArmed] = useState(false);

  // Read persisted preference once.
  useEffect(() => {
    const stored = window.localStorage.getItem(KEY);
    setEnabled(stored === "on");
  }, []);

  // Build graph + arm on first user gesture (browsers block AudioContext otherwise).
  useEffect(() => {
    if (!enabled || armed) return;
    const arm = () => {
      if (refs.current) return;
      try {
        refs.current = buildGraph();
        setArmed(true);
      } catch { /* unsupported */ }
    };
    window.addEventListener("pointerdown", arm, { once: true });
    window.addEventListener("keydown", arm, { once: true });
    return () => {
      window.removeEventListener("pointerdown", arm);
      window.removeEventListener("keydown", arm);
    };
  }, [enabled, armed]);

  // Crossfade volume on path change + honour motion-toggle.
  useEffect(() => {
    const r = refs.current;
    if (!r) return;
    const motion = window.localStorage.getItem("delowar:motion");
    const target = motion === "off" || !enabled ? 0 : gainForPath(path);
    const now = r.ctx.currentTime;
    r.master.gain.cancelScheduledValues(now);
    r.master.gain.linearRampToValueAtTime(target, now + 0.9);
  }, [path, enabled, armed]);

  // Same-tab + cross-tab motion preference change → re-evaluate the drone gain.
  useEffect(() => {
    const apply = () => {
      const r = refs.current;
      if (!r) return;
      const motion = window.localStorage.getItem("delowar:motion");
      const target = motion === "off" || !enabled ? 0 : gainForPath(path);
      const now = r.ctx.currentTime;
      r.master.gain.cancelScheduledValues(now);
      r.master.gain.linearRampToValueAtTime(target, now + 0.6);
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === "delowar:motion") apply();
    };
    const onMotion = () => apply();
    window.addEventListener("storage", onStorage);
    window.addEventListener("delowar:motion-change", onMotion as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("delowar:motion-change", onMotion as EventListener);
    };
  }, [enabled, path]);

  // Cleanup on unmount.
  useEffect(() => () => {
    const r = refs.current;
    if (!r) return;
    try {
      r.oscA.stop();
      r.oscB.stop();
      r.oscC.stop();
      r.lfo.stop();
      r.ctx.close();
    } catch { /* noop */ }
    refs.current = null;
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    window.localStorage.setItem(KEY, next ? "on" : "off");
    if (!next && refs.current) {
      const now = refs.current.ctx.currentTime;
      refs.current.master.gain.cancelScheduledValues(now);
      refs.current.master.gain.linearRampToValueAtTime(0, now + 0.4);
    }
  };

  return (
    <button
      onClick={toggle}
      data-cursor="hover"
      data-cursor-label={enabled ? "MUTE" : "PLAY"}
      aria-pressed={enabled}
      aria-label="Toggle ambient drone"
      className="audio-toggle group inline-flex items-center gap-2 rounded-full border border-warmwhite/20 bg-ink-950/40 px-3 py-1.5 font-sans text-[10px] uppercase tracking-widest text-warmwhite/70 hover:border-warmwhite/60 hover:text-warmwhite"
    >
      <span className={`relative inline-flex h-3 w-6 items-center rounded-full ${enabled ? "bg-peach" : "bg-warmwhite/15"}`}>
        <span
          className={`absolute h-2.5 w-2.5 rounded-full bg-ink-950 transition-transform duration-300 ${enabled ? "translate-x-3" : "translate-x-0.5"}`}
        />
      </span>
      <span>Drone {enabled ? (armed ? "On" : "Arm") : "Off"}</span>
    </button>
  );
}
