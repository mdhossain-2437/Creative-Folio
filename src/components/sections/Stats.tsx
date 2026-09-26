"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { stats } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

function parseStat(value: string): { prefix: string; num: number; suffix: string } {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)([^\d]*)$/);
  if (!match) return { prefix: value, num: 0, suffix: "" };
  const [, leading, digits, trailing] = match;
  let prefix = leading || "";
  let body = digits;
  if (body.length > 1 && body.startsWith("0") && !body.includes(".")) {
    prefix += "0";
    body = body.slice(1);
  }
  return { prefix, num: Number(body), suffix: trailing || "" };
}

export function Stats() {
  return (
    <section className="relative border-t border-warmwhite/15 bg-ink-950 py-24 md:py-36">
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs tracking-normal text-warmwhite/85">
              Verified Metrics &amp; Footprint
            </p>
            <h2 className="mt-2 font-serif text-3xl tracking-tight text-warmwhite md:text-5xl">
              Grounded Evidence.
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm leading-relaxed text-warmwhite/90">
            Every metric below is anchored to a public audit, live production surface, or GitHub footprint. Click any metric to inspect its verification source.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => {
            const parsed = parseStat(s.value);
            const isExternal = s.external ?? s.href.startsWith("http");

            const cardInner = (
              <>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-peach">
                      <span>{s.source}</span>
                      <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                    <span className="font-mono text-[10px] text-warmwhite/85">
                      Evidence #{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="display-num mt-4 font-serif text-[clamp(2.75rem,5.5vw,5rem)] leading-none tracking-tightest text-warmwhite transition-colors duration-300 group-hover:text-warmwhite">
                    <CountUp
                      to={parsed.num}
                      prefix={parsed.prefix}
                      suffix={parsed.suffix}
                      duration={1400 + i * 120}
                    />
                  </p>

                  <h3 className="mt-3 font-sans text-sm font-medium tracking-normal text-warmwhite/90">
                    {s.label}
                  </h3>
                </div>

                <p className="mt-6 border-t border-warmwhite/10 pt-4 font-sans text-xs leading-relaxed text-warmwhite/90">
                  {s.proof}
                </p>
              </>
            );

            return (
              <Reveal
                key={s.label}
                as="li"
                delay={i * 0.06}
                className="group relative flex flex-col justify-between rounded-xl border border-warmwhite/15 bg-ink-900/60 p-6 transition-all duration-300 hover:border-peach/50 hover:bg-ink-900"
              >
                {isExternal ? (
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full flex-col justify-between focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
                    aria-label={`${s.label}: ${s.value}. Verify on ${s.source}`}
                  >
                    {cardInner}
                  </a>
                ) : (
                  <Link
                    href={s.href}
                    className="flex h-full flex-col justify-between focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
                    aria-label={`${s.label}: ${s.value}. Verify on ${s.source}`}
                  >
                    {cardInner}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
