"use client";

import { ReactNode, useRef } from "react";

export function SpotlightTile({
  accent,
  children,
}: {
  accent: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
    // gentle parallax for the inner image
    const cx = (e.clientX - r.left - r.width / 2) / r.width;
    const cy = (e.clientY - r.top - r.height / 2) / r.height;
    el.style.setProperty("--tx", `${cx * 16}px`);
    el.style.setProperty("--ty", `${cy * 16}px`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tx", "0px");
    el.style.setProperty("--ty", "0px");
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="spotlight-tile group relative aspect-[4/3] w-full overflow-hidden"
      style={
        {
          ["--mx" as string]: "50%",
          ["--my" as string]: "50%",
          ["--tx" as string]: "0px",
          ["--ty" as string]: "0px",
          ["--accent" as string]: accent,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
