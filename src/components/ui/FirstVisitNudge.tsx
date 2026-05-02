"use client";

// Once-per-browser nudge that surfaces the keyboard-first navigation. Only
// shows after the user has been on the site long enough to settle (3 s) and
// only if they haven't dismissed it before. Auto-dismisses after 8 s if
// ignored. Stored under `delowar:nudge:v1`.

import { useEffect, useState } from "react";

const KEY = "delowar:nudge:v1";

export function FirstVisitNudge() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.localStorage.getItem(KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) return;
    const t = window.setTimeout(() => setShow(true), 3000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!show) return;
    const t = window.setTimeout(() => dismiss(), 8000);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const dismiss = () => {
    setShow(false);
    try {
      window.localStorage.setItem(KEY, "1");
    } catch {
      /* silent */
    }
  };

  if (!show) return null;
  return (
    <div className="fixed right-6 top-6 z-[60] flex max-w-sm items-start gap-3 rounded-2xl border border-warmwhite/15 bg-ink-900/95 px-4 py-3 shadow-2xl backdrop-blur animate-toast-in">
      <span aria-hidden className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-peach/20 font-mono text-[10px] uppercase tracking-widest text-peach">
        ◊
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
          New here?
        </p>
        <p className="mt-1 font-serif text-base leading-snug text-warmwhite/95">
          Press{" "}
          <kbd className="rounded border border-warmwhite/15 bg-ink-950 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-warmwhite/85">
            /
          </kbd>{" "}
          or{" "}
          <kbd className="rounded border border-warmwhite/15 bg-ink-950 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-warmwhite/85">
            ⌘K
          </kbd>{" "}
          to fly. Try{" "}
          <kbd className="rounded border border-warmwhite/15 bg-ink-950 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-warmwhite/85">
            ?
          </kbd>{" "}
          for the full keyboard map.
        </p>
      </div>
      <button
        type="button"
        onClick={dismiss}
        data-cursor="hover"
        aria-label="Dismiss nudge"
        className="font-mono text-[12px] leading-none text-warmwhite/65 hover:text-warmwhite"
      >
        ×
      </button>
    </div>
  );
}
