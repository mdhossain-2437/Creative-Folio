"use client";

// QuoteOfTheDay — a small rotating studio quote in the footer. The
// rotation is deterministic by UTC date (year + day-of-year) so every
// visitor sees the same line on the same day; this keeps the page
// stable across SSR / hydration and across reloads within the same day.
//
// Hovering the quote reveals its index (e.g. `048 / 365`) so the
// curious know it cycles. Clicking copies the line to the clipboard
// with a toast.
//
// QUOTES live in `@/lib/quotes` and cover a full year (365 entries)
// in the studio's "Compiled Thought" voice — one line per UTC day.

import { useEffect, useState } from "react";
import { pushToast } from "@/components/ui/Toast";
import { QUOTES } from "@/lib/quotes";


function pickIndex(): number {
  const now = new Date();
  // Day-of-year (UTC) so it doesn't flicker across the international date line.
  const start = Date.UTC(now.getUTCFullYear(), 0, 0);
  const diff = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - start;
  const day = Math.floor(diff / 86_400_000);
  return (now.getUTCFullYear() * 31 + day) % QUOTES.length;
}

export function QuoteOfTheDay() {
  const [idx, setIdx] = useState<number | null>(null);
  // Compute on the client to avoid SSR / client mismatch around midnight UTC.
  useEffect(() => {
    setIdx(pickIndex());
  }, []);

  if (idx === null) return null;
  const quote = QUOTES[idx];
  const onCopy = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(`"${quote}" — Delowar Hossain`).then(() => {
      pushToast({
        id: "qotd-copy",
        title: "Quote copied",
        description: `${idx + 1} / ${QUOTES.length}`,
        variant: "success",
        duration: 1800,
      });
    }).catch(() => {
      /* clipboard blocked, silent */
    });
  };
  return (
    <button
      type="button"
      onClick={onCopy}
      data-cursor="hover"
      data-cursor-label="COPY"
      className="group block w-full text-left font-serif text-base italic leading-snug text-warmwhite/75 transition-colors hover:text-warmwhite md:text-lg"
      aria-label="Quote of the day — click to copy"
    >
      <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55 group-hover:text-peach">
        ◊ Quote of the day · {String(idx + 1).padStart(3, "0")} / {QUOTES.length}
      </span>
      <span className="mt-2 block">&ldquo;{quote}&rdquo;</span>
    </button>
  );
}
