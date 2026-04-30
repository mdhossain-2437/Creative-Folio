"use client";

import Link from "next/link";
import { useScrollState } from "@/components/providers/SmoothScrollProvider";
import { reelClips } from "@/lib/data";

export function ShowreelTeaser() {
  const { velocity } = useScrollState();
  const skew = Math.max(-3, Math.min(3, velocity));
  return (
    <section className="relative overflow-hidden border-t border-warmwhite/10 bg-ink-950 py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 vignette" />
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/45">
              §03 — Reel · 02:17
            </p>
            <h2
              className="kinetic mt-6 font-serif text-[clamp(2.5rem,6vw,5.4rem)] leading-[0.96] tracking-tightest"
              style={{ ["--vy" as never]: skew.toFixed(3) }}
            >
              Six chapters,
              <span className="block italic text-warmwhite/60">one quiet reel.</span>
            </h2>
            <p className="mt-6 max-w-sm font-sans text-sm leading-relaxed text-warmwhite/65">
              A vertical reel of selected motion work, 2025–2026. Open it
              fullscreen with the play pill, or jump to any chapter.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("delowar:open-showreel"))}
                data-cursor="view"
                data-cursor-label="PLAY"
                className="inline-flex items-center gap-2 rounded-full bg-warmwhite px-6 py-3 font-sans text-[11px] uppercase tracking-widest text-ink-900 hover:bg-peach"
              >
                <span className="block h-0 w-0 border-y-[5px] border-l-[7px] border-y-transparent border-l-ink-900" />
                Play immersive reel
              </button>
              <Link
                href="/showreel"
                data-cursor="hover"
                data-cursor-label="INDEX"
                className="rounded-full border border-warmwhite/30 px-5 py-3 font-sans text-[11px] uppercase tracking-widest hover:border-warmwhite"
              >
                Chapter index ↗
              </Link>
            </div>
          </div>
          <div className="md:col-span-7">
            <ol className="overflow-hidden border-y border-warmwhite/10">
              {reelClips.map((c) => (
                <li
                  key={c.index}
                  className="grid grid-cols-12 items-center gap-4 border-b border-warmwhite/5 py-4 last:border-b-0"
                >
                  <span className="col-span-2 font-mono text-[10px] uppercase tracking-widest text-warmwhite/40 md:col-span-1">
                    §{c.index}
                  </span>
                  <span className="col-span-7 font-serif text-xl leading-tight tracking-tight text-warmwhite/85 md:text-2xl">
                    {c.title}
                  </span>
                  <span className="col-span-2 hidden font-mono text-[10px] uppercase tracking-widest text-warmwhite/40 md:col-span-3 md:block">
                    {c.topic}
                  </span>
                  <span className="col-span-3 text-right font-mono text-[10px] uppercase tracking-widest text-warmwhite/55 md:col-span-1">
                    {c.duration}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
