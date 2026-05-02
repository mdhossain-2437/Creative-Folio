import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/lib/data";

export function Stats() {
  return (
    <section className="relative border-t border-warmwhite/15 bg-ink-950 py-20 md:py-28">
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <ul className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="border-l border-warmwhite/15 pl-6">
              <p className="display-num font-serif text-[clamp(3rem,7vw,6.5rem)] leading-none tracking-tightest text-warmwhite">
                {s.value}
              </p>
              <p className="mt-3 font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                {s.label}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
