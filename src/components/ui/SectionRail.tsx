"use client";

// SectionRail — vertical "you are here" progress on the left edge of
// the homepage. Shows a dot per major section; the active dot fills
// and shows the section name on hover. Click jumps to that section.
//
// Auto-detects sections by reading `data-section-id` on top-level
// `<section>` elements. If none are found, the rail stays hidden.
//
// IMPORTANT — the rail is portaled to <body> so it escapes the
// RouteCurtain's `filter: blur(0px)` ancestor. A non-`none` `filter`
// on an ancestor establishes a containing block for `position: fixed`
// descendants, which broke the rail's viewport-pinning (it appeared to
// only show up while the user was scrolled into the middle of the page,
// because that's where the curtain's box happened to overlap the
// viewport). Rendering through a portal sidesteps the containing-block
// rule entirely.

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

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const id = (visible[0].target as HTMLElement).dataset.sectionId;
          if (id) setActive(id);
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-25% 0% -25% 0%" }
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

  const rail = (
    <nav
      data-floating-overlay
      aria-label="Section progress"
      className="floating-overlay pointer-events-auto fixed left-3 top-1/2 z-20 hidden -translate-y-1/2 md:left-4 md:block"
    >
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
                className="flex items-center gap-3 rounded-full p-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-500 ${
                    isActive
                      ? "w-6 bg-peach"
                      : "w-1.5 bg-warmwhite/30 group-hover:bg-warmwhite/65"
                  }`}
                />
                <span
                  className={`pointer-events-none whitespace-nowrap font-sans text-[9px] uppercase tracking-widest transition-opacity duration-300 ${
                    isActive
                      ? "text-warmwhite opacity-100"
                      : "text-warmwhite/65 opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {it.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return createPortal(rail, document.body);
}
