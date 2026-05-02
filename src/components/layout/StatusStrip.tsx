"use client";

// StatusStrip — moved out of the Navbar (per MMXXVII redesign).
// Renders the live local time (Asia/Dhaka), weather pill, GitHub stat, and
// the studio booking line as a calm telemetry band that sits above the Footer.

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

export function StatusStrip() {
  const [time, setTime] = useState<string>("—— BD");
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const fmt = () => {
      try {
        const d = new Date();
        const t = d.toLocaleTimeString("en-GB", {
          timeZone: "Asia/Dhaka",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        setTime(`${t} BD`);
      } catch {
        setTime("—— BD");
      }
    };
    fmt();
    const id = setInterval(fmt, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const ctrl = new AbortController();
    fetch("https://api.github.com/users/mdhossain-2437", { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (cancelled || !j) return;
        const total = (j.public_repos ?? 0) + (j.followers ?? 0);
        setStars(total);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, []);

  return (
    <section
      aria-label="Studio status"
      className="border-y border-warmwhite/12 bg-ink-950/70"
    >
      <div className="mx-auto flex max-w-[1640px] flex-col items-start gap-4 px-6 py-4 font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 md:flex-row md:items-center md:justify-between md:gap-6 md:px-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="inline-flex items-center gap-1.5 text-warmwhite/85">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-soft"
            />
            <span className="display-num">{time}</span>
          </span>
          <span aria-hidden className="text-warmwhite/30">·</span>
          <span className="display-num">21°C</span>
          <span aria-hidden className="text-warmwhite/30">·</span>
          <span className="display-num text-peach">
            {stars !== null ? String(stars).padStart(3, "0") : "···"} GH
          </span>
          <span aria-hidden className="text-warmwhite/30">·</span>
          <span className="display-num text-warmwhite/65">{site.editionShort}</span>
        </div>

        <Link
          href="/contact"
          data-cursor="hover"
          data-cursor-label="BOOK"
          className="inline-flex items-center gap-2 rounded-full border border-warmwhite/25 px-3 py-1.5 text-warmwhite/85 transition-colors hover:border-peach/70 hover:text-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
        >
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-peach" />
          {site.availability}
          <span aria-hidden>↗</span>
        </Link>
      </div>
    </section>
  );
}
