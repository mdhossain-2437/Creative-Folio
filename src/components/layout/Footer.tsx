"use client";

import Link from "next/link";
import { Marquee } from "@/components/ui/Marquee";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-warmwhite/10 bg-ink-950 pb-10 pt-24">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-warmwhite/30 to-transparent" />

      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/40">
              ◊ Now booking · Selected projects
            </p>
            <h2 className="mt-6 font-serif text-[clamp(3rem,9vw,9rem)] leading-[0.92] tracking-tightest">
              <span className="block italic text-warmwhite/60">Have an idea?</span>
              <span className="block">Let&apos;s build it.</span>
            </h2>
            <Link
              href="/contact"
              data-cursor="hover"
              data-cursor-label="WRITE"
              className="mt-10 inline-flex items-center gap-3 rounded-full border border-warmwhite/30 px-6 py-3 font-sans text-[11px] uppercase tracking-widest text-warmwhite hover:border-warmwhite hover:bg-warmwhite hover:text-ink-900"
            >
              {site.email}
              <span aria-hidden>↗</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-5 lg:grid-cols-3">
            <FooterCol title="Pages" items={site.nav} />
            <FooterCol
              title="Connect"
              items={site.socials.map((s) => ({ label: s.label, href: s.href }))}
            />
            <FooterCol
              title="Studio"
              items={[
                { label: "Colophon", href: "/colophon" },
                { label: "Awards", href: "/awards" },
                { label: "Resume", href: "/resume" },
                { label: "Privacy", href: "/legal/privacy" },
                { label: "Terms", href: "/legal/terms" },
              ]}
            />
          </div>
        </div>

        <div className="mt-20">
          <Marquee
            speed={50}
            items={[
              "DELOWAR HOSSAIN",
              "CREATIVE DEVELOPER",
              "UI / UX DESIGNER",
              "WEBGL · THREE.JS · GLSL",
              "AVAILABLE Q3 2026",
              "JOYPURHAT, BANGLADESH",
            ]}
          />
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 font-sans text-[10px] uppercase tracking-widest text-warmwhite/40 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {site.studio}. All rights reserved.</p>
          <p className="display-num">
            Lat. 25.10° N · Long. 89.02° E · {site.location}
          </p>
          <p>v 02.04 · Built with intent.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/40">{title}</p>
      <ul className="mt-5 space-y-2 font-serif text-lg leading-tight">
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              data-cursor="hover"
              data-cursor-label="VIEW"
              className="text-warmwhite/85 hover:text-peach"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
