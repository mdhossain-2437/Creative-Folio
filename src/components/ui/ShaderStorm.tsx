"use client";

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

export function ShaderStorm() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let buf: string[] = [];
    const trigger = () => {
      setActive(true);
      window.setTimeout(() => setActive(false), 6000);
    };
    const onKey = (e: KeyboardEvent) => {
      buf = [...buf, e.key].slice(-KONAMI.length);
      if (
        buf.length === KONAMI.length &&
        buf.every((k, i) => k.toLowerCase() === KONAMI[i].toLowerCase())
      ) {
        buf = [];
        trigger();
      }
    };
    const onCustom = () => trigger();
    window.addEventListener("keydown", onKey);
    window.addEventListener("delowar:shader-storm", onCustom);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("delowar:shader-storm", onCustom);
    };
  }, []);

  if (!active) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[88] mix-blend-difference">
      <div className="absolute inset-0 animate-pulse-soft bg-[conic-gradient(from_0deg_at_50%_50%,#cdfa00,#e3bfb4,#9aa6c2,#cdfa00)] opacity-50 mix-blend-color-dodge" />
      <div className="absolute inset-0 grid-lines opacity-40" />
      <p className="absolute left-6 top-24 font-mono text-[10px] uppercase tracking-widest text-electric">
        ◊ shader storm engaged · konami · 06s
      </p>
    </div>
  );
}
