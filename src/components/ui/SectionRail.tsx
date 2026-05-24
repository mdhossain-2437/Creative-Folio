"use client";

// SectionRail — vertical "you are here" progress overlay pinned to the
// left edge of the homepage.
//
// Robust pinning:
//   The rail is rendered via `createPortal` directly to <body> so it
//   escapes the RouteCurtain's `filter: blur(0px)` ancestor (a non-`none`
//   filter on an ancestor establishes a containing block for `fixed`
//   descendants and breaks viewport-pinning). It also uses
//   `position: fixed` + `top-1/2 -translate-y-1/2` so it sits centred on
//   the viewport regardless of scroll position.
//
// Visual:
//   A compact rounded-pill container with a subtle backdrop blur + thin
//   border, so the rail is clearly a "navbar-like overlay" rather than
//   stranded glyphs on the gradient. Each section gets a dot; the active
//   one fills, expands, and reveals the label. Hover any dot to preview.
//   Clicking jumps to that section with smooth scroll.
//
// Behaviour:
//   `data-section-id` on top-level sections is used as the scroll target.
//   An IntersectionObserver picks the section whose midline is closest
//   to the viewport's midline. Items array drives both the order and
//   labels.

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Item = { id: string; label: string };

export function SectionRail({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  // Render nothing on the server / before first effect so the portal
  // target (document.body) is available.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (items.length === 0) return;
    const els = items
      .map((it) => document.querySelector<HTMLElement>(`[data-section-id="${it.id}"]`))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    // Track the latest visible ratio per section id so we can pick the
    // most-prominent one even when several are partially in view.
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
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], rootMargin: "-30% 0% -30% 0%" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  if (items.length === 0) return null;
  if (!mounted) return null;

  const jump = (id: string) => {
    const el = document.querySelector<HTMLElement>(`[data-section-id="${id}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeIdx = Math.max(
    0,
    items.findIndex((i) => i.id === active)
  );

  const rail = (
    <nav
      data-floating-overlay
      aria-label="Section progress"
      className="floating-overlay pointer-events-auto fixed left-3 top-1/2 z-[45] hidden -translate-y-1/2 md:left-4 md:block"
    >
      <div className="flex items-center gap-3 rounded-full border border-warmwhite/12 bg-ink-950/65 px-2 py-3 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        <ul className="flex flex-col gap-3">
          {items.map((it) => {
            const isActive = it.id === active;
            return (
              <li key={it.id} className="group relative">
                <button
                  type="button"
                  onClick={() => jump(it.id)}
                  aria-label={`Jump to ${it.label}`}
                  aria-current={isActive ? "true" : undefined}
                  data-cursor="hover"
                  data-cursor-label="JUMP"
                  className="flex items-center gap-3 rounded-full p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-500 ${
                      isActive
                        ? "w-6 bg-peach"
                        : "w-1.5 bg-warmwhite/35 group-hover:bg-warmwhite/70"
                    }`}
                  />
                  <span
                    className={`pointer-events-none absolute left-7 whitespace-nowrap rounded-md bg-ink-950/85 px-2 py-1 font-sans text-[9px] uppercase tracking-widest text-warmwhite/85 transition-opacity duration-300 ${
                      isActive
                        ? "opacity-0 group-hover:opacity-100"
                        : "opacity-0 group-hover:opacity-100"
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
      {/* Persistent label for the active section, sits outside the pill */}
      <p
        aria-hidden
        className="mt-3 max-w-[6rem] text-left font-sans text-[9px] uppercase leading-tight tracking-widest text-warmwhite/65"
      >
        <span className="display-num text-peach">
          §{String(activeIdx + 1).padStart(2, "0")}
        </span>
        <span className="mx-1 text-warmwhite/30">·</span>
        <span>{items[activeIdx]?.label}</span>
      </p>
    </nav>
  );

  return createPortal(rail, document.body);
}
