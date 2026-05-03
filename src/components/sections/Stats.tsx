import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { stats } from "@/lib/data";

function parseStat(value: string): { prefix: string; num: number; suffix: string } {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)([^\d]*)$/);
  if (!match) return { prefix: value, num: 0, suffix: "" };
  const [, leading, digits, trailing] = match;
  // Preserve a leading zero like "09" by treating the first 0 as a prefix.
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
    <section className="relative border-t border-warmwhite/15 bg-ink-950 py-28 md:py-40">
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <ul className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {stats.map((s, i) => {
            const parsed = parseStat(s.value);
            return (
              <Reveal key={s.label} delay={i * 0.06} className="border-l border-warmwhite/15 pl-6">
                <p className="display-num font-serif text-[clamp(3rem,7vw,6.5rem)] leading-none tracking-tightest text-warmwhite">
                  <CountUp
                    to={parsed.num}
                    prefix={parsed.prefix}
                    suffix={parsed.suffix}
                    duration={1500 + i * 120}
                  />
                </p>
                <p className="mt-3 font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                  {s.label}
                </p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
