"use client";

import { useEffect, useState } from "react";

export function GridOverlay() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "g" && (e.metaKey || e.ctrlKey) && e.shiftKey) {
        e.preventDefault();
        setShow((s) => !s);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[60] transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mx-auto grid h-full max-w-[1640px] grid-cols-12 gap-x-6 px-6 md:px-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-full bg-peach/10 outline outline-1 outline-peach/15"
          />
        ))}
      </div>
    </div>
  );
}
