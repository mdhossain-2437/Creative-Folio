"use client";

// SectionRail — editorial "you are here" overlay pinned to the left edge
// of the homepage. Designed to match the rest of the site's editorial
// typography system (serif headlines, micro-uppercase labels, peach
// accent) rather than reading as generic tech-UI dots.
//
// Layout:
//   · A vertical column wrapped in a soft floating panel.
//   · At the top: a serif §0X / N display showing the active chapter.
//   · A column of section labels with subtle hairlines between, all
//     uppercase 10px tracked.
//   · A peach hairline "playhead" that grows down the rail in lockstep
//     with the active index, reinforcing scroll progress.
//   · On mobile (< md) the rail becomes a slim bottom-anchored pill with
//     just the active label + progress bar so it never crowds the page.
//
// Robust pinning:
//   The rail is portaled to <body> so the RouteCurtain's `filter: blur`
//   doesn't establish a containing block that would break the fixed pin.
//
// Sync:
//   IntersectionObserver tracks every [data-section-id] section on the
//   page. The most-visible section (by ratio, midline-anchored) becomes
//   active. A small scroll-fallback handles the edge case where the user
//   sits between sections (e.g. the bottom of the page).

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Item = { id: string; label: string };

export function SectionRail({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const [progress, setProgress] = useState(0); // 0..1 — total page scroll
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false); // mobile bottom-pill expanded

  // Defer the portal until after first paint — document.body needs to
  // exist and we want SSR markup to stay empty for clean hydration.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Active-section detection via IntersectionObserver. Midline-anchored
  // so the label flips at roughly the viewport centre — i.e. where the
  // reader's eye is most likely focused.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (items.length === 0) return;

    const els = items
      .map((it) => document.querySelector<HTMLElement>(`[data-section-id="${it.id}"]`))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const ratios = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.sectionId;
          if (!id) return;
          ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        let bestId: string | null = null;
        let bestRatio = -1;
        ratios.forEach((r, id) => {
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        });
        if (bestRatio > 0 && bestId) setActive(bestId);
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], rootMargin: "-40% 0% -40% 0%" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  // Total page scroll progress (0..1). Drives the peach playhead and the
  // mobile progress bar. Uses passive scroll + rAF throttle so it never
  // blocks the main thread.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setProgress(Math.max(0, Math.min(1, p)));
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (items.length === 0 || !mounted) return null;

  const activeIdx = Math.max(
    0,
    items.findIndex((i) => i.id === active)
  );

  const jump = (id: string) => {
    const el = document.querySelector<HTMLElement>(`[data-section-id="${id}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  // ─────────────────────────────────────────────────────────────────
  // Desktop rail — editorial vertical sidebar
  // ─────────────────────────────────────────────────────────────────
  const desktop = (
    <nav
      data-floating-overlay
      aria-label="Page sections"
      className="floating-overlay pointer-events-auto fixed left-4 top-1/2 z-[45] hidden -translate-y-1/2 lg:block"
    >
      <div className="relative flex flex-col gap-5 rounded-[28px] border border-warmwhite/12 bg-ink-950/70 px-5 py-6 shadow-[0_18px_50px_-22px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        {/* Header — section index + total */}
        <header className="flex items-baseline gap-2 border-b border-warmwhite/12 pb-4">
          <span className="display-num font-serif text-3xl leading-none tracking-tightest text-peach">
            §{String(activeIdx + 1).padStart(2, "0")}
          </span>
          <span className="display-num font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
            / {String(items.length).padStart(2, "0")}
          </span>
        </header>

        {/* Rail body — playhead + list */}
        <div className="relative pl-4">
          {/* Vertical rule */}
          <span
            aria-hidden
            className="absolute left-0 top-0 h-full w-px bg-warmwhite/15"
          />
          {/* Peach playhead — scales with active index for crisp progress */}
          <span
            aria-hidden
            className="absolute left-0 top-0 w-px origin-top bg-peach transition-transform duration-700 ease-out"
            style={{
              height: "100%",
              transform: `scaleY(${
                items.length > 1 ? (activeIdx + 0.5) / items.length : 1
              })`,
            }}
          />

          <ul className="flex flex-col gap-3">
            {items.map((it, i) => {
              const isActive = it.id === active;
              const isPast = i < activeIdx;
              return (
                <li key={it.id} className="relative">
                  <button
                    type="button"
                    onClick={() => jump(it.id)}
                    aria-label={`Jump to ${it.label}`}
                    aria-current={isActive ? "true" : undefined}
                    data-cursor="hover"
                    data-cursor-label="JUMP"
                    className={`group flex w-full items-center gap-3 rounded-md py-1 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach ${
                      isActive
                        ? "text-warmwhite"
                        : isPast
                          ? "text-warmwhite/40 hover:text-warmwhite/80"
                          : "text-warmwhite/55 hover:text-warmwhite/85"
                    }`}
                  >
                    {/* Index */}
                    <span
                      className={`display-num shrink-0 font-sans text-[9px] uppercase tracking-widest transition-colors ${
                        isActive ? "text-peach" : "text-warmwhite/35 group-hover:text-warmwhite/60"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* Label */}
                    <span
                      className={`font-sans text-[10px] uppercase leading-none tracking-[0.18em] transition-all duration-300 ${
                        isActive ? "translate-x-0" : "group-hover:translate-x-0.5"
                      }`}
                    >
                      {it.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Footer — overall page progress */}
        <footer className="flex items-center gap-2 border-t border-warmwhite/12 pt-3 font-sans text-[9px] uppercase tracking-widest text-warmwhite/45">
          <span aria-hidden className="block h-px flex-1 bg-warmwhite/15">
            <span
              className="block h-full bg-peach transition-[width] duration-300 ease-out"
              style={{ width: `${(progress * 100).toFixed(1)}%` }}
            />
          </span>
          <span className="display-num">{Math.round(progress * 100)}%</span>
        </footer>
      </div>
    </nav>
  );

  // ─────────────────────────────────────────────────────────────────
  // Mobile rail — bottom-pinned pill with active label + progress
  // ─────────────────────────────────────────────────────────────────
  const mobile = (
    <div
      data-floating-overlay
      className="floating-overlay pointer-events-auto fixed inset-x-3 bottom-3 z-[45] lg:hidden"
    >
      {/* Collapsed pill */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open section navigation"
          aria-expanded={open}
          className="group flex w-full items-center gap-3 rounded-full border border-warmwhite/15 bg-ink-950/85 px-4 py-2.5 text-left shadow-[0_18px_44px_-22px_rgba(0,0,0,0.7)] backdrop-blur-xl"
        >
          <span className="display-num font-sans text-[10px] uppercase tracking-widest text-peach">
            §{String(activeIdx + 1).padStart(2, "0")}
          </span>
          <span className="font-sans text-[11px] uppercase tracking-widest text-warmwhite">
            {items[activeIdx]?.label}
          </span>
          <span className="ml-auto flex items-center gap-2">
            <span aria-hidden className="block h-1 w-12 overflow-hidden rounded-full bg-warmwhite/15">
              <span
                className="block h-full bg-peach transition-[width] duration-300 ease-out"
                style={{ width: `${(progress * 100).toFixed(1)}%` }}
              />
            </span>
            <span className="display-num font-sans text-[10px] text-warmwhite/55">
              {Math.round(progress * 100)}%
            </span>
            <span aria-hidden className="font-sans text-[14px] leading-none text-warmwhite/55">
              ▴
            </span>
          </span>
        </button>
      )}

      {/* Expanded sheet */}
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Section navigation"
          className="rounded-2xl border border-warmwhite/15 bg-ink-950/95 p-4 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.7)] backdrop-blur-xl"
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
              ◊ Jump to section
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close section navigation"
              className="rounded-full border border-warmwhite/15 px-2 py-0.5 font-sans text-[10px] uppercase tracking-widest text-warmwhite/70 transition-colors hover:border-peach hover:text-peach"
            >
              Close
            </button>
          </div>
          <ul className="grid max-h-[55vh] grid-cols-2 gap-1 overflow-y-auto">
            {items.map((it, i) => {
              const isActive = it.id === active;
              return (
                <li key={it.id}>
                  <button
                    type="button"
                    onClick={() => jump(it.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex w-full items-baseline gap-2 rounded-md px-3 py-2 text-left transition-colors ${
                      isActive
                        ? "bg-peach/15 text-warmwhite"
                        : "text-warmwhite/75 hover:bg-warmwhite/5"
                    }`}
                  >
                    <span
                      className={`display-num shrink-0 font-sans text-[9px] uppercase tracking-widest ${
                        isActive ? "text-peach" : "text-warmwhite/40"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-sans text-[11px] uppercase tracking-widest">
                      {it.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );

  return createPortal(
    <>
      {desktop}
      {mobile}
    </>,
    document.body
  );
}
