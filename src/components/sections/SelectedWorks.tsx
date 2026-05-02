"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { works } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function SelectedWorks() {
  return (
    <section id="works" className="relative bg-ink-900 py-28 md:py-40">
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <header className="flex items-end justify-between gap-6">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              ◊ Selected Works
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
            className="hidden font-sans text-[11px] uppercase tracking-widest text-warmwhite/70 hover:text-warmwhite md:inline-flex"
          >
            View All Archive →
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
            className="rounded-full border border-warmwhite/30 px-6 py-3 font-sans text-[11px] uppercase tracking-widest"
          >
            View Archive →
          </Link>
        </div>
      </div>
    </section>
  );
}

function WorkRow({ work, idx }: { work: ReturnType<typeof getWorkType>; idx: number }) {
  const rowRef = useRef<HTMLAnchorElement>(null);
  const peekRef = useRef<HTMLDivElement>(null);

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
    };
    const onEnter = () => {
      visible = true;
      peek.style.opacity = "1";
      peek.style.transform += " scale(1)";
    };
    const onLeave = () => {
      visible = false;
      peek.style.opacity = "0";
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
          className="group relative flex items-center justify-between overflow-hidden py-7 md:py-10"
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
            <span className="mt-1 block text-warmwhite/30">
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

function getWorkType() {
  return works[0];
}
