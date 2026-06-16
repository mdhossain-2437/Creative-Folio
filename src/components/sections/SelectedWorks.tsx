"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { works } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { WorkCoverDisplacement } from "@/components/works/WorkCoverDisplacement";

type Work = (typeof works)[number];

export function SelectedWorks() {
  return (
    <section id="works" className="relative bg-ink-900 py-28 md:py-40">
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <header className="flex items-end justify-between gap-6">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              <ScrambleText>§02 — Selected Works</ScrambleText>
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tightest">
              Selected
              <span className="italic text-peach"> &amp; </span>
              <br className="hidden md:block" />
              Awarded.
            </h2>
          </div>
          <Link
            href="/works"
            data-cursor="hover"
            data-cursor-label="ARCHIVE"
            className="hidden items-baseline gap-2 rounded-full border border-warmwhite/15 px-4 py-2 font-sans text-[10px] uppercase tracking-widest text-warmwhite/85 transition-colors hover:border-peach hover:text-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach md:inline-flex"
          >
            View All Archive <span aria-hidden>↗</span>
          </Link>
        </header>

        <ul className="mt-20 space-y-1">
          {works.slice(0, 5).map((w, i) => (
            <WorkRow key={w.slug} work={w} idx={i} />
          ))}
        </ul>

        <div className="mt-16 flex justify-center md:hidden">
          <Link
            href="/works"
            className="inline-flex items-center gap-2 rounded-full border border-warmwhite/30 px-6 py-3 font-sans text-[11px] uppercase tracking-widest text-warmwhite transition-colors hover:border-peach hover:text-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
          >
            View Archive <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function WorkRow({ work, idx }: { work: Work; idx: number }) {
  const rowRef = useRef<HTMLAnchorElement>(null);
  const peekRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [intensity, setIntensity] = useState(0);
  const [peekMouse, setPeekMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const row = rowRef.current;
    const peek = peekRef.current;
    if (!row || !peek) return;
    let visible = false;
    const onMove = (e: MouseEvent) => {
      if (!visible) return;
      const r = row.getBoundingClientRect();
      peek.style.transform = `translate3d(${e.clientX - r.left - peek.offsetWidth / 2}px, ${
        e.clientY - r.top - peek.offsetHeight / 2
      }px, 0)`;
      const pr = peek.getBoundingClientRect();
      setPeekMouse({
        x: Math.max(0, Math.min(1, (e.clientX - pr.left) / pr.width)),
        y: Math.max(0, Math.min(1, (e.clientY - pr.top) / pr.height)),
      });
    };
    const onEnter = () => {
      visible = true;
      peek.style.opacity = "1";
      peek.style.transform += " scale(1)";
      setIntensity(1);
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {
          /* autoplay blocked — fall back to static cover silently */
        });
      }
    };
    const onLeave = () => {
      visible = false;
      peek.style.opacity = "0";
      setIntensity(0);
      const video = videoRef.current;
      if (video) {
        video.pause();
      }
    };
    row.addEventListener("mousemove", onMove);
    row.addEventListener("mouseenter", onEnter);
    row.addEventListener("mouseleave", onLeave);
    return () => {
      row.removeEventListener("mousemove", onMove);
      row.removeEventListener("mouseenter", onEnter);
      row.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <li className="border-t border-warmwhite/15 last:border-b">
      <Reveal delay={idx * 0.05}>
        <Link
          ref={rowRef}
          href={`/works/${work.slug}`}
          data-cursor="view"
          data-cursor-label="OPEN"
          aria-label={`Open case study: ${work.title} — ${work.category}, ${work.year}`}
          className="group relative flex items-center justify-between overflow-hidden py-7 transition-colors hover:bg-warmwhite/[0.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-peach md:py-10"
        >
          <span className="flex items-center gap-6 md:gap-12">
            <span className="display-num font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              {work.index} · {work.year}
            </span>
            <span className="font-serif text-[clamp(1.6rem,4vw,3.6rem)] leading-none tracking-tightest transition-transform duration-700 ease-out group-hover:translate-x-3">
              {work.title}
            </span>
          </span>
          <span className="hidden text-right font-sans text-[10px] uppercase tracking-widest text-warmwhite/55 md:block">
            <span className="block">{work.category}</span>
            <span className="mt-1 block text-warmwhite/55">
              {work.stack.slice(0, 3).join(" · ")}
            </span>
          </span>
          {/* Cursor-following preview */}
          <div
            ref={peekRef}
            className="pointer-events-none absolute left-0 top-0 h-56 w-80 -translate-x-1/2 -translate-y-1/2 scale-95 overflow-hidden rounded-md opacity-0 transition-opacity duration-500"
          >
            <Image
              src={work.cover}
              alt={work.title}
              fill
              sizes="320px"
              className="object-cover"
            />
            <WorkCoverDisplacement
              src={work.cover}
              alt=""
              intensity={intensity}
              mouse={peekMouse}
              className="absolute inset-0 h-full w-full mix-blend-screen opacity-80"
            />
            {work.previewSrc && (
              <video
                ref={videoRef}
                src={work.previewSrc}
                muted
                loop
                playsInline
                preload="none"
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div
              className="absolute inset-0 mix-blend-multiply"
              style={{ background: work.accent + "55" }}
            />
          </div>
        </Link>
      </Reveal>
    </li>
  );
}
