"use client";

// Small live clock showing the studio's local time (Asia/Dhaka). Updates once
// per second. Renders as a single inline span — caller controls the wrapper.
// Uses `Intl.DateTimeFormat` so we avoid a second `Date` allocation.

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Dhaka",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export function StudioClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span aria-label="Studio local time, Asia/Dhaka" className="tabular-nums">
      {time || "--:--:--"}
    </span>
  );
}
