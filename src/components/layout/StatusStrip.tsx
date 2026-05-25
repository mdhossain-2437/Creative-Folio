"use client";

// StatusStrip — moved out of the Navbar (per MMXXVII redesign).
// Renders the live local time (Asia/Dhaka), weather pill, GitHub stat, and
// the studio booking line as a calm telemetry band that sits above the Footer.

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

function formatCountdown(targetMs: number): string {
  const diff = targetMs - Date.now();
  if (diff <= 0) return "00d 00h 00m";
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  return `${String(d).padStart(3, "0")}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m`;
}

export function StatusStrip() {
  const [time, setTime] = useState<string>("—— BD");
  const [stars, setStars] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<string>("———d ——h ——m");

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
    // MMXXVII = January 1 2027, 00:00 Asia/Dhaka (UTC+6).
    const target = Date.UTC(2026, 11, 31, 18, 0, 0); // 2027-01-01T00:00+06:00
    const tick = () => setCountdown(formatCountdown(target));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const ctrl = new AbortController();
    // Edge route consolidates rate-limited calls + caches at 30 min.
    // Falls back gracefully when GitHub is down — see /api/github route.
    fetch("/api/github", { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (cancelled || !j?.user) return;
        const total = (j.user.publicRepos ?? 0) + (j.user.followers ?? 0);
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
          <span className="display-num text-warmwhite/65">Joypurhat · BD</span>
          <span aria-hidden className="text-warmwhite/30">·</span>
          <span className="display-num text-peach">
            {stars !== null ? String(stars).padStart(3, "0") : "···"} GH
          </span>
          <span aria-hidden className="text-warmwhite/30">·</span>
          <span className="display-num text-warmwhite/65">{site.editionShort}</span>
          <span aria-hidden className="text-warmwhite/30">·</span>
          <a
            href="https://www.uopeople.edu/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="University of the People — B.Sc. Computer Science (in progress)"
            data-cursor="hover"
            data-cursor-label="UoPeople"
            className="display-num text-warmwhite/65 underline-offset-4 transition-colors hover:text-peach hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
          >
            B.Sc. CS · UoPeople
          </a>
          <span aria-hidden className="text-warmwhite/30">·</span>
          <span
            className="display-num text-warmwhite/85"
            title="Time until MMXXVII (2027-01-01, Asia/Dhaka)"
          >
            <span className="text-warmwhite/55">→ </span>
            {countdown}
            <span className="text-warmwhite/55"> {site.editionShort}</span>
          </span>
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
