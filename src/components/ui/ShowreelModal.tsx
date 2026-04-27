"use client";

import { useEffect, useState } from "react";
import { reelClips } from "@/lib/data";

export function ShowreelModal() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("delowar:open-showreel", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("delowar:open-showreel", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!open) return null;

  const clip = reelClips[active] ?? reelClips[0];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
      <button
        aria-label="Close showreel"
        onClick={() => setOpen(false)}
        className="absolute inset-0 cursor-default bg-ink-950/85 backdrop-blur"
      />
      <div className="relative z-10 grid h-[90vh] w-full max-w-[1180px] grid-rows-[auto,1fr,auto] overflow-hidden rounded-3xl border border-warmwhite/15 bg-ink-900 shadow-2xl">
        <header className="flex items-center justify-between border-b border-warmwhite/10 px-6 py-4 md:px-8">
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
            Reel · 02:17 · Selected works 2025–2026
          </p>
          <button
            onClick={() => setOpen(false)}
            data-cursor="hover"
            data-cursor-label="CLOSE"
            className="rounded-full border border-warmwhite/25 px-4 py-1.5 font-sans text-[10px] uppercase tracking-widest hover:border-warmwhite"
          >
            Close ✕
          </button>
        </header>
        <div className="relative isolate overflow-hidden bg-ink-950">
          <div
            className="absolute inset-0 bg-gradient-to-br from-peach/40 via-electric/10 to-ink-950"
            style={{
              filter: "saturate(1.1) blur(0.5px)",
            }}
          />
          <div className="absolute inset-0 grid-lines opacity-30" />
          <div className="relative z-10 grid h-full grid-cols-1 gap-6 px-6 py-8 md:grid-cols-12 md:px-10">
            <div className="md:col-span-7 flex flex-col justify-end">
              <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/60">
                §{clip.index} · {clip.topic.toUpperCase()} · {clip.duration}
              </p>
              <h3 className="mt-3 font-serif text-[clamp(2.5rem,6vw,5.4rem)] leading-[0.92] tracking-tightest text-warmwhite">
                {clip.title}
              </h3>
              <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-warmwhite/70">
                {clip.body}
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col justify-end gap-2">
              <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/45">
                Chapters
              </p>
              <ul className="space-y-2">
                {reelClips.map((c, i) => (
                  <li key={c.index}>
                    <button
                      onClick={() => setActive(i)}
                      data-cursor="hover"
                      data-cursor-label={c.duration}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left font-sans text-sm transition-colors ${
                        active === i
                          ? "border-peach/60 bg-peach/10 text-warmwhite"
                          : "border-warmwhite/10 text-warmwhite/65 hover:border-warmwhite/30"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="display-num text-[10px] uppercase tracking-widest text-warmwhite/40">
                          §{c.index}
                        </span>
                        <span>{c.title}</span>
                      </span>
                      <span className="display-num text-[10px] uppercase tracking-widest text-warmwhite/40">
                        {c.topic} · {c.duration}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-warmwhite/10 px-6 py-4 font-sans text-[10px] uppercase tracking-widest text-warmwhite/45 md:px-8">
          <span>The reel autoplays muted by default — click a chapter to scrub.</span>
          <span>Esc to close · Hold ⇧ to slow</span>
        </footer>
      </div>
    </div>
  );
}
