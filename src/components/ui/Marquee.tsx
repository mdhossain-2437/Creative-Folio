"use client";

import { ReactNode } from "react";

export function Marquee({
  items,
  speed = 40,
  reverse = false,
  size = "md",
  separator = "•",
}: {
  items: (string | ReactNode)[];
  speed?: number;
  reverse?: boolean;
  size?: "sm" | "md" | "lg";
  separator?: string;
}) {
  const sizeClass =
    size === "lg"
      ? "text-[clamp(3.5rem,11vw,9rem)]"
      : size === "sm"
      ? "text-base md:text-xl"
      : "text-[clamp(2rem,5vw,4.5rem)]";

  const seq = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className={`marquee-track gap-10 font-serif tracking-tightest ${sizeClass}`}
        style={{
          animation: `${reverse ? "marqueeReverse" : "marquee"} ${speed}s linear infinite`,
        }}
      >
        {seq.map((it, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="whitespace-nowrap">{it}</span>
            <span aria-hidden className="text-peach/80">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
