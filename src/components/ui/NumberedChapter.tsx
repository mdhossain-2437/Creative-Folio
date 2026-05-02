"use client";

import { ReactNode } from "react";

export function NumberedChapter({
  index,
  eyebrow,
  title,
  italic,
  children,
}: {
  index: string;
  eyebrow: string;
  title: string;
  italic?: string;
  children: ReactNode;
}) {
  return (
    <section className="relative border-t border-warmwhite/15 bg-ink-900 py-24 md:py-32">
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4 md:sticky md:top-28 md:self-start">
            <span className="block font-serif text-[clamp(7rem,18vw,16rem)] leading-none tracking-tightest text-warmwhite/85">
              {index}
            </span>
            <p className="mt-3 font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              {eyebrow}
            </p>
            <h2 className="mt-6 font-serif text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[0.96] tracking-tightest">
              {title}
              {italic && (
                <span className="block italic text-warmwhite/55"> {italic}</span>
              )}
            </h2>
          </div>
          <div className="md:col-span-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
