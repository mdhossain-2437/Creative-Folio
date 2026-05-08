"use client";

// SectionProgressDots — right-edge column of dots that mirror the page's
// in-view section. Pages mark sections with `<section id="..."` (or any
// `[id][data-section-label]`); the dots auto-discover them at mount.
//
// Hover a dot → tooltip with the section title.
// Click a dot → smoothly scroll to that section.
// Keyboard: ↓/↑ within the dot column moves focus + scrolls.
//
// Hidden until 3+ sections are detected so it doesn't appear on light
// pages like /not-found or /robots.txt. Auto-recomputes on route change
// via pathname dependency.

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Section = { id: string; label: string };

export function SectionProgressDots() {
  const pathname = usePathname();
  const [sections, setSections] = useState<Section[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Discover sections after the route mounts. We re-run on pathname change.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;
    const collect = () => {
      if (cancelled) return;
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>("section[id], main [id][data-section]"),
      ).filter((el) => {
        const id = el.id;
        if (!id) return false;
        // Only sections that have visible content
        const rect = el.getBoundingClientRect();
        return rect.height > 100;
      });
      const found: Section[] = nodes.map((el) => ({
        id: el.id,
        label:
          el.dataset.sectionLabel?.trim() ||
          el.querySelector<HTMLElement>("h1, h2, h3")?.innerText?.trim().slice(0, 32) ||
          el.id,
      }));
      // Dedupe by id (case studies have nested sections that share text).
      const seen = new Set<string>();
      const unique = found.filter((s) => {
        if (seen.has(s.id)) return false;
        seen.add(s.id);
        return true;
      });
      setSections(unique);
    };
    // Wait one frame so the route's content is mounted.
    const raf = window.requestAnimationFrame(collect);
    // Also retry once after 600ms in case images / canvas reflow.
    const retry = window.setTimeout(collect, 600);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      window.clearTimeout(retry);
    };
  }, [pathname]);

  // Track which section is closest to the top of the viewport.
  useEffect(() => {
    if (sections.length === 0) return;
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((e): e is HTMLElement => Boolean(e));
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  if (sections.length < 3) return null;

  return (
    <nav
      aria-label="Section progress"
      className="floating-overlay pointer-events-none fixed right-3 top-1/2 z-30 hidden -translate-y-1/2 md:flex"
    >
      <ul className="pointer-events-auto flex flex-col items-end gap-2 rounded-full border border-warmwhite/10 bg-ink-950/40 px-2 py-3 backdrop-blur-md">
        {sections.map((s) => {
          const active = s.id === activeId;
          return (
            <li key={s.id} className="group relative flex items-center justify-end">
              <span
                aria-hidden
                className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md border border-warmwhite/15 bg-ink-950/90 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-warmwhite/80 opacity-0 transition-opacity group-hover:opacity-100"
              >
                {s.label}
              </span>
              <a
                href={`#${s.id}`}
                aria-label={`Jump to ${s.label}`}
                aria-current={active ? "true" : undefined}
                data-cursor="hover"
                className={`block h-1.5 w-4 rounded-full transition-all ${
                  active
                    ? "w-6 bg-peach"
                    : "bg-warmwhite/30 hover:w-5 hover:bg-warmwhite/70"
                }`}
                onClick={(e) => {
                  // Lenis is mounted globally so the default anchor jump is
                  // already smooth. We just nudge focus for a11y + dismiss
                  // any default that browsers might do twice.
                  const target = document.getElementById(s.id);
                  if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                    history.replaceState(null, "", `#${s.id}`);
                  }
                }}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
