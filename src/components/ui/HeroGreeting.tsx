"use client";

// Time-of-day greeting in Joypurhat (Asia/Dhaka). Updates the leading word of
// the hero eyebrow every minute and announces a tiny ambient line under it.

import { useEffect, useState } from "react";

type Slice = "dawn" | "morning" | "afternoon" | "evening" | "night";

const COPY: Record<Slice, { word: string; line: string }> = {
  dawn: { word: "Good early hours", line: "Studio is quiet. Light comes in slow." },
  morning: { word: "Good morning", line: "Studio is open — coffee is on." },
  afternoon: { word: "Good afternoon", line: "Studio is shipping. Stay awhile." },
  evening: { word: "Good evening", line: "Studio is calibrating shaders & type." },
  night: { word: "Working late", line: "Studio is awake. The grid is too." },
};

function sliceFor(hour: number): Slice {
  if (hour < 5) return "night";
  if (hour < 9) return "dawn";
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  if (hour < 21) return "evening";
  return "night";
}

export function HeroGreeting() {
  const [slice, setSlice] = useState<Slice>("evening");

  useEffect(() => {
    const compute = () => {
      try {
        const fmt = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Dhaka",
          hour: "2-digit",
          hour12: false,
        });
        const hourStr = fmt.format(new Date());
        const hour = parseInt(hourStr, 10);
        if (Number.isFinite(hour)) setSlice(sliceFor(hour));
      } catch {
        /* keep default */
      }
    };
    compute();
    const id = window.setInterval(compute, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const { word, line } = COPY[slice];

  return (
    <span className="block">
      <span className="text-warmwhite/85">{word}</span>
      <span className="ml-2 hidden text-warmwhite/35 md:inline">— {line}</span>
    </span>
  );
}
