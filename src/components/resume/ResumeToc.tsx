"use client";

// ResumeToc — sticky sidebar table of contents for /resume.
// Tracks the active <Block> via IntersectionObserver (midline-anchored)
// so the visitor always knows which chapter of the document they're
// reading. Clicking a label smooth-scrolls to that block.

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

export function ResumeToc({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (items.length === 0) return;

    const els = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const ratios = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).id;
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
      {
        // Midline rootMargin — flip when the section crosses the
        // viewport centre, matching reading flow.
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: "-40% 0% -45% 0%",
      }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const jump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <nav
      aria-label="Resume sections"
      className="sticky top-24 space-y-3"
    >
      <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/75">
        ◊ Contents
      </p>
      <ul className="space-y-1.5">
        {items.map((it, i) => {
          const isActive = it.id === active;
          return (
            <li key={it.id} className="relative">
              <a
                href={`#${it.id}`}
                aria-current={isActive ? "true" : undefined}
                onClick={(e) => jump(e, it.id)}
                data-cursor="hover"
                data-cursor-label="JUMP"
                className={`group flex items-baseline gap-3 rounded-sm py-1 pl-3 font-sans text-[10px] uppercase tracking-widest transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peach ${
                  isActive
                    ? "border-l border-peach text-warmwhite"
                    : "border-l border-warmwhite/25 text-warmwhite/75 hover:border-warmwhite/40 hover:text-warmwhite"
                }`}
              >
                <span
                  className={`display-num font-mono text-[9px] ${
                    isActive ? "text-warmwhite" : "text-warmwhite/75"
                  }`}
                >
                  §{String(i + 1).padStart(2, "0")}
                </span>
                <span>{it.label}</span>
                {isActive && (
                  <span
                    aria-hidden
                    className="ml-auto inline-block h-px w-4 bg-peach"
                  />
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
