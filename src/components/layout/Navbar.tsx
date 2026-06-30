"use client";

import Link from "@/components/ui/PerformanceLink";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { SoundToggle } from "@/components/ui/SoundDesign";

const PRIMARY = ["Index", "Works", "Lab", "About", "Resume", "Journal", "Services", "Contact"];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open + dismiss on Escape so
  // the menu behaves like a proper modal sheet on phones.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const primaryNav = site.nav.filter((n) => PRIMARY.includes(n.label));

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Primary"
        className={`pointer-events-auto mx-auto flex w-full max-w-[1640px] items-center justify-between px-6 py-5 transition-[background,backdrop-filter,box-shadow] duration-500 md:px-10 ${
          scrolled
            ? "bg-ink-900/75 shadow-[0_1px_0_rgba(239,236,233,0.08)] backdrop-blur-xl"
            : ""
        }`}
      >
        {/* Wordmark with MMXXVII supermark */}
        <Link
          href="/"
          data-cursor="hover"
          data-cursor-label="HOME"
          aria-label={`${site.name} — home`}
          className="group inline-flex items-baseline gap-2 font-serif text-xl tracking-tight text-warmwhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
        >
          <span className="relative whitespace-nowrap">
            <span className="italic">D</span>elowar{" "}
            <span className="italic text-warmwhite/85">Hossain</span>
          </span>
          <span
            aria-hidden
            className="display-num hidden text-[9px] font-sans uppercase tracking-widest text-warmwhite/55 transition-colors duration-500 group-hover:text-peach md:inline"
          >
            ◊ {site.editionShort}
          </span>
        </Link>

        {/* Centered primary nav */}
        <ul className="hidden items-center gap-7 font-sans text-[11px] uppercase tracking-widest text-warmwhite/75 md:flex">
          {primaryNav.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-cursor="hover"
                  data-cursor-label={item.label}
                  aria-current={active ? "page" : undefined}
                  className={`group inline-flex flex-col items-start py-1 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach ${
                    active ? "text-warmwhite" : "hover:text-warmwhite"
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`h-px w-full origin-left bg-peach transition-transform duration-500 ease-out ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right cluster: sound toggle + ⌘K + CTA — status pills live in footer StatusStrip */}
        <div className="hidden items-center gap-3 font-sans text-[11px] uppercase tracking-widest md:flex">
          <SoundToggle />
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))
            }
            data-cursor="hover"
            data-cursor-label="⌘K"
            aria-label="Open command palette (Cmd+K)"
            className="rounded-full border border-warmwhite/25 px-3 py-1.5 text-[10px] text-warmwhite/80 transition-colors hover:border-warmwhite/70 hover:text-warmwhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
          >
            <span className="display-num">⌘K</span>
          </button>
          <Link
            href="/contact"
            data-cursor="hover"
            data-cursor-label="LET'S TALK"
            className="rounded-full bg-warmwhite px-4 py-2 text-[10px] uppercase tracking-widest text-ink-900 transition-colors hover:bg-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
          >
            Start a Project
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-sheet"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden rounded-full border border-warmwhite/35 px-4 py-2 font-sans text-[10px] uppercase tracking-widest text-warmwhite/85 transition-colors hover:border-warmwhite hover:text-warmwhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>
      <div
        id="mobile-nav-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!open}
        className={`pointer-events-auto fixed inset-0 z-40 origin-top overflow-y-auto bg-ink-950/95 backdrop-blur-xl transition-[transform,opacity] duration-500 ease-out md:hidden ${
          open
            ? "scale-y-100 opacity-100"
            : "pointer-events-none scale-y-0 opacity-0"
        }`}
      >
        <div className="flex min-h-full flex-col px-6 pb-10 pt-24">
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
            ◊ Index · {site.editionShort}
          </p>
          <ul className="mt-6 flex flex-1 flex-col justify-center gap-1 font-serif text-3xl leading-none sm:text-4xl">
            {site.nav.map((item, i) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex items-baseline gap-3 py-1.5 leading-none tracking-tighter transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach ${
                      active ? "text-peach" : "text-warmwhite hover:text-peach"
                    }`}
                  >
                    <span className="display-num font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{item.label}</span>
                    {active && (
                      <span aria-hidden className="ml-2 font-sans text-[10px] uppercase tracking-widest text-peach/70">
                        ◊ here
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-warmwhite/15 pt-6 font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
            <span>{site.location}</span>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="break-all underline-offset-2 hover:text-peach hover:underline"
            >
              {site.email}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
