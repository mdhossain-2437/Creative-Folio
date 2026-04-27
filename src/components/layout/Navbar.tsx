"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LiveBadge } from "@/components/ui/LiveBadge";
import { site } from "@/lib/site";

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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const primaryNav = site.nav.filter((n) => PRIMARY.includes(n.label));

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <nav
        className={`pointer-events-auto mx-auto flex w-full max-w-[1640px] items-center justify-between px-6 py-5 transition-colors duration-500 md:px-10 ${
          scrolled ? "bg-ink-900/70 backdrop-blur" : ""
        }`}
      >
        <div className="flex items-center gap-4">
          <Link
            href="/"
            data-cursor="hover"
            data-cursor-label="HOME"
            className="font-serif text-xl tracking-tight text-warmwhite"
          >
            <span className="italic">D</span>elowar
            <span className="text-warmwhite/40">.dev</span>
          </Link>
          <LiveBadge />
        </div>
        <ul className="hidden items-center gap-7 font-sans text-[11px] uppercase tracking-widest text-warmwhite/70 md:flex">
          {primaryNav.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-cursor="hover"
                  data-cursor-label={item.label}
                  className={`group inline-flex flex-col items-start ${
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
        <div className="hidden items-center gap-3 font-sans text-[11px] uppercase tracking-widest text-warmwhite/60 md:flex">
          <button
            onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
            data-cursor="hover"
            data-cursor-label="⌘K"
            className="rounded-full border border-warmwhite/20 px-3 py-1.5 text-[10px] hover:border-warmwhite/60"
          >
            <span className="display-num">⌘K</span>
          </button>
          <span className="rounded-full border border-warmwhite/20 px-2 py-1 text-[9px]">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 -translate-y-px rounded-full bg-emerald-400" />
            {site.availability}
          </span>
          <Link
            href="/contact"
            data-cursor="hover"
            data-cursor-label="LET'S TALK"
            className="rounded-full bg-warmwhite px-4 py-2 text-[10px] uppercase tracking-widest text-ink-900 transition-colors hover:bg-peach"
          >
            Start a Project
          </Link>
        </div>
        <button
          aria-label="Open menu"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden rounded-full border border-warmwhite/30 px-4 py-2 text-[10px] uppercase tracking-widest"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>
      <div
        className={`pointer-events-auto fixed inset-0 z-40 origin-top bg-ink-950 transition-transform duration-700 ease-out md:hidden ${
          open ? "scale-y-100" : "scale-y-0"
        }`}
      >
        <div className="flex h-full flex-col px-6 pb-10 pt-24">
          <ul className="flex flex-1 flex-col justify-center gap-2 font-serif text-5xl">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-2 leading-none tracking-tighter"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between font-sans text-[10px] uppercase tracking-widest text-warmwhite/50">
            <span>{site.location}</span>
            <Link href="/contact">{site.email}</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
