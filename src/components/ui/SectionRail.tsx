"use client";

// SectionRail — editorial "you are here" overlay pinned to the left edge
// of the homepage. Designed to match the rest of the site's editorial
// typography system (serif headlines, micro-uppercase labels, peach
// accent) rather than reading as generic tech-UI dots.
//
// Compact philosophy:
//   The rail is intentionally **slim and translucent** by default — it's
//   a quiet wayfinder, not a sidebar. Only the active chapter index +
//   tick marks are shown at rest. The full label list is revealed on
//   hover / focus / mobile-tap, so the underlying page text is never
//   permanently covered.
//
// Layout (desktop, lg+):
//   · Collapsed (default): ~36px wide pill — nothing but the vertical
//     column of tiny ticks (one per section). Active tick is a thicker
//     peach segment. No numbers, no labels — keeps the column slim and
//     out of the way of the underlying typography.
//   · Expanded (hover/focus-within): glides out to the right, revealing
//     the section index + full uppercase tracked labels. Background
//     opacity steps up.
//
// Hero gate:
//   The rail stays **fully hidden while the hero is in view** — the
//   landing screen is meant to feel immersive, not navigational.
//   It fades in once the user has scrolled at least ~70% of the
//   first viewport (i.e., they've committed to reading further) and
//   fades out again if they scroll back to the top.
//
// Layout (tablet, md–lg):
//   · Bottom-pinned compact center pill with active label + scroll %.
//   · Sits centered so it never collides with ShowreelPill (bottom-left)
//     or AtmosphereMode (bottom-right).
//
// Layout (< md / phone):
//   · Same bottom-pinned pill but spans the full width minus margin
//     (since corner pills aren't shown on phone).
//   · Tap anywhere expands into a 2-col jump sheet.
//
// Robust pinning:
//   The rail is portaled to <body> so the RouteCurtain's `filter: blur`
//   doesn't establish a containing block that would break the fixed pin.
//
// Sync:
//   IntersectionObserver tracks every [data-section-id] section on the
//   page. The most-visible section (by ratio, midline-anchored) becomes
//   active.

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Item = { id: string; label: string };

export function SectionRail({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const [progress, setProgress] = useState(0); // 0..1 — total page scroll
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false); // mobile bottom-pill expanded
  const [expanded, setExpanded] = useState(false); // desktop hover/focus
  const [pastHero, setPastHero] = useState(false); // gate: hide while hero in view

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

  // Total page scroll progress (0..1) + hero-gate. The pastHero flag
  // flips true once the user has scrolled ≥70% of the first viewport;
  // a small hysteresis (drops back to false only below 50%) prevents
  // jitter at the boundary. Uses passive scroll + rAF throttle so it
  // never blocks the main thread.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setProgress(Math.max(0, Math.min(1, p)));
      const y = window.scrollY;
      const vh = window.innerHeight;
      setPastHero((prev) => {
        if (!prev) return y > vh * 0.7;
        return y > vh * 0.5;
      });
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
    setExpanded(false);
  };

  // ─────────────────────────────────────────────────────────────────
  // Desktop rail — compact collapsed pill, expands on hover/focus
  // ─────────────────────────────────────────────────────────────────
  const desktop = (
    <nav
      data-floating-overlay
      aria-label="Page sections"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocusCapture={() => setExpanded(true)}
      onBlurCapture={(e) => {
        // Collapse only if focus leaves the rail entirely
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setExpanded(false);
        }
      }}
      aria-hidden={!pastHero}
      className={`floating-overlay fixed left-3 top-1/2 z-[45] hidden -translate-y-1/2 transition-[opacity,transform] duration-500 ease-out lg:block ${
        pastHero
          ? "pointer-events-auto opacity-100 -translate-x-0"
          : "pointer-events-none -translate-x-3 opacity-0"
      }`}
    >
      <div
        className={`relative flex flex-col gap-3 rounded-2xl border border-warmwhite/10 backdrop-blur-md transition-[background-color,border-color,padding,box-shadow] duration-300 ease-out ${
          expanded
            ? "border-warmwhite/15 bg-ink-950/80 px-4 py-4 shadow-[0_18px_50px_-22px_rgba(0,0,0,0.7)]"
            : "bg-ink-950/30 px-1.5 py-3 hover:bg-ink-950/55"
        }`}
      >
        {/* Header — only visible when expanded so the collapsed pill stays
            slim. Contains the active section index + the total. */}
        <header
          className={`flex items-baseline gap-1.5 overflow-hidden transition-[max-height,opacity,border-color,padding-bottom] duration-300 ${
            expanded
              ? "max-h-10 border-b border-warmwhite/12 pb-3 opacity-100"
              : "max-h-0 border-b border-transparent pb-0 opacity-0"
          }`}
        >
          <span className="display-num font-serif text-2xl leading-none tracking-tightest text-peach">
            §{String(activeIdx + 1).padStart(2, "0")}
          </span>
          <span className="display-num font-sans text-[9px] uppercase tracking-widest text-warmwhite/50">
            /{String(items.length).padStart(2, "0")}
          </span>
        </header>

        {/* Rail body — playhead + list */}
        <div className={`relative transition-[padding-left] duration-300 ${expanded ? "pl-3" : "pl-2"}`}>
          {/* Vertical rule */}
          <span
            aria-hidden
            className="absolute left-0 top-0 h-full w-px bg-warmwhite/12"
          />
          {/* Peach playhead — scales with active index */}
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

          <ul className={`flex flex-col ${expanded ? "gap-2.5" : "gap-1.5"} transition-[gap] duration-300`}>
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
                    className={`group flex w-full items-center gap-2.5 rounded-md py-0.5 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peach ${
                      isActive
                        ? "text-warmwhite"
                        : isPast
                          ? "text-warmwhite/35 hover:text-warmwhite/80"
                          : "text-warmwhite/55 hover:text-warmwhite/85"
                    }`}
                  >
                    {/* Tick (always visible) */}
                    <span
                      aria-hidden
                      className={`block h-px shrink-0 transition-all duration-300 ${
                        isActive
                          ? "w-3 bg-peach"
                          : isPast
                            ? "w-2 bg-warmwhite/35"
                            : "w-2 bg-warmwhite/20"
                      }`}
                    />
                    {/* Label (only when expanded) */}
                    <span
                      className={`overflow-hidden whitespace-nowrap font-sans uppercase leading-none tracking-[0.18em] transition-[max-width,opacity,padding-left] duration-300 ${
                        expanded
                          ? "max-w-[10rem] pl-0.5 text-[10px] opacity-100"
                          : "max-w-0 text-[10px] opacity-0"
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

        {/* Footer — overall page progress (only visible when expanded) */}
        <footer
          className={`flex items-center gap-2 border-t font-sans uppercase tracking-widest text-warmwhite/45 transition-[max-height,opacity,padding-top,border-color] duration-300 ${
            expanded
              ? "max-h-12 border-warmwhite/12 pt-3 text-[9px] opacity-100"
              : "max-h-0 overflow-hidden border-transparent pt-0 text-[9px] opacity-0"
          }`}
        >
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
      aria-hidden={!pastHero}
      className={`floating-overlay fixed bottom-3 z-[45] inset-x-4 transition-[opacity,transform] duration-500 ease-out md:inset-x-auto md:left-1/2 md:w-auto md:max-w-md md:-translate-x-1/2 lg:hidden ${
        pastHero
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      {/* Collapsed pill */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open section navigation"
          aria-expanded={open}
          className="group flex w-full items-center gap-2.5 rounded-full border border-warmwhite/12 bg-ink-950/65 px-3.5 py-2 text-left shadow-[0_14px_36px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md transition-colors hover:border-warmwhite/20 hover:bg-ink-950/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peach"
        >
          <span className="display-num font-sans text-[9px] uppercase tracking-widest text-peach">
            §{String(activeIdx + 1).padStart(2, "0")}
          </span>
          <span className="truncate font-sans text-[10px] uppercase tracking-widest text-warmwhite">
            {items[activeIdx]?.label}
          </span>
          <span className="ml-auto flex items-center gap-2">
            <span aria-hidden className="block h-1 w-10 overflow-hidden rounded-full bg-warmwhite/15">
              <span
                className="block h-full bg-peach transition-[width] duration-300 ease-out"
                style={{ width: `${(progress * 100).toFixed(1)}%` }}
              />
            </span>
            <span className="display-num font-sans text-[9px] text-warmwhite/55">
              {Math.round(progress * 100)}%
            </span>
            <span aria-hidden className="font-sans text-[11px] leading-none text-warmwhite/55">
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
          className="rounded-2xl border border-warmwhite/15 bg-ink-950/95 p-3 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.7)] backdrop-blur-xl"
        >
          <div className="mb-2 flex items-center justify-between">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
              ◊ Jump to section
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close section navigation"
              className="rounded-full border border-warmwhite/15 px-2 py-0.5 font-sans text-[10px] uppercase tracking-widest text-warmwhite/70 transition-colors hover:border-peach hover:text-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peach"
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
                    className={`flex w-full items-baseline gap-2 rounded-md px-3 py-2 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peach ${
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
                    <span className="font-sans text-[10px] uppercase tracking-widest">
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
