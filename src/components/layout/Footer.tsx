"use client";

import Link from "next/link";
import { useRef } from "react";
import { Marquee } from "@/components/ui/Marquee";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { StudioClock } from "@/components/ui/StudioClock";
import { StatusStrip } from "@/components/layout/StatusStrip";
import { site } from "@/lib/site";
import { pushToast } from "@/components/ui/Toast";
import { unlock } from "@/lib/achievements";

export type FooterProps = {
  commitSha?: string;
  buildTime?: string;
};

export function Footer({ commitSha, buildTime }: FooterProps = {}) {
  const tripleRef = useRef<{ count: number; last: number }>({ count: 0, last: 0 });
  const shortSha = commitSha ? commitSha.slice(0, 7) : "local";
  const commitUrl = commitSha ? `${site.repo}/commit/${commitSha}` : site.repo;

  const handleWordmarkClick = () => {
    const now = performance.now();
    const t = tripleRef.current;
    if (now - t.last > 600) t.count = 0;
    t.count += 1;
    t.last = now;
    if (t.count >= 3) {
      t.count = 0;
      unlock("trickster");
    }
  };

  const handleCopyEmail = () => {
    if (typeof navigator === "undefined") return;
    navigator.clipboard
      ?.writeText(site.email)
      .then(() => {
        pushToast({
          id: "copy-email",
          title: "Email copied",
          description: site.email,
          variant: "success",
        });
        unlock("scribe");
      })
      .catch(() =>
        pushToast({
          id: "copy-email-fail",
          title: "Couldn't copy",
          description: "Browser blocked clipboard access.",
          variant: "info",
        })
      );
  };

  return (
    <footer className="relative mt-24 border-t border-warmwhite/15 bg-ink-950 pb-10">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-warmwhite/35 to-transparent" />

      <StatusStrip />

      <div className="mx-auto max-w-[1640px] px-6 pt-24 md:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              ◊ {site.availability} · Selected projects
            </p>
            <h2 className="mt-6 break-words font-serif text-[clamp(2.5rem,7.5vw,7rem)] leading-[0.94] tracking-tightest">
              <span className="block italic text-warmwhite/60">Have an idea?</span>
              <span className="block">Let&apos;s build it.</span>
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                data-cursor="hover"
                data-cursor-label="WRITE"
                className="inline-flex items-center gap-3 rounded-full border border-warmwhite/30 px-6 py-3 font-sans text-[11px] uppercase tracking-widest text-warmwhite hover:border-warmwhite hover:bg-warmwhite hover:text-ink-900"
              >
                {site.email}
                <span aria-hidden>↗</span>
              </Link>
              <button
                type="button"
                onClick={handleCopyEmail}
                data-cursor="hover"
                data-cursor-label="COPY"
                aria-label="Copy email address"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-warmwhite/20 font-mono text-xs text-warmwhite/70 transition-colors hover:border-peach/60 hover:text-warmwhite"
              >
                ⎘
              </button>
            </div>
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
                { label: "Now", href: "/now" },
                { label: "Uses", href: "/uses" },
                { label: "Colors", href: "/colors" },
                { label: "Changelog", href: "/changelog" },
                { label: "Showreel", href: "/showreel" },
                { label: "Atlas", href: "/atlas" },
                { label: "Awards", href: "/awards" },
                { label: "Achievements", href: "/achievements" },
                { label: "Colophon", href: "/colophon" },
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
              site.availability.toUpperCase(),
              "JOYPURHAT, BANGLADESH",
              site.edition,
              "DELOWARHOSSAIN.DEV",
            ]}
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 md:grid-cols-12 md:items-center">
          <p className="md:col-span-4">
            © {site.year}{" "}
            <button
              type="button"
              onClick={handleWordmarkClick}
              className="cursor-default uppercase tracking-widest text-warmwhite/85 transition-colors hover:text-peach"
              aria-label="Studio mark"
            >
              {site.studio}
            </button>
            . All rights reserved · {site.editionShort}.
          </p>
          <p className="md:col-span-5 md:text-center display-num">
            Lat. 25.10° N · Long. 89.02° E · {site.location} ·{" "}
            <span className="text-warmwhite/85">
              <StudioClock />
            </span>{" "}
            BST
          </p>
          <div className="flex items-center gap-3 md:col-span-3 md:justify-end">
            <a
              href={commitUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              data-cursor-label="SOURCE"
              title={
                commitSha
                  ? `Built from ${shortSha}${buildTime ? ` · ${buildTime}` : ""}. View source on GitHub.`
                  : "View source on GitHub."
              }
              className="hidden font-mono text-warmwhite/65 transition-colors hover:text-peach md:inline"
            >
              ◇ {shortSha}
            </a>
            <MotionToggle />
            <span className="hidden md:inline text-warmwhite/85">v {site.edition}</span>
          </div>
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
      <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">{title}</p>
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
