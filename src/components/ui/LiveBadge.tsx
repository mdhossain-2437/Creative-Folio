"use client";

import { useEffect, useState } from "react";

export function LiveBadge() {
  const [time, setTime] = useState<string>("");
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
        setTime("");
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
    <div className="hidden items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-warmwhite/55 lg:flex">
      <span className="display-num text-warmwhite/80">{time || "—— BD"}</span>
      <span aria-hidden className="text-warmwhite/25">·</span>
      <span className="display-num">21°C</span>
      <span aria-hidden className="text-warmwhite/25">·</span>
      <span className="display-num text-peach">
        {stars !== null ? String(stars).padStart(3, "0") : "···"} GH
      </span>
    </div>
  );
}
