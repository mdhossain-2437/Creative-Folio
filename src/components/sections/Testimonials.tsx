import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section className="relative border-t border-warmwhite/15 bg-ink-900 py-28 md:py-40">
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <header className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 md:col-span-3">
            §06 — Testimonials
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest md:col-span-9">
            Kind words, <span className="italic text-warmwhite/60">earned.</span>
          </h2>
        </header>

        <ul className="mt-16 grid grid-cols-1 gap-px bg-warmwhite/15 border border-warmwhite/15 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              as="li"
              delay={i * 0.08}
              className="flex h-full flex-col justify-between bg-ink-900 p-8 md:p-12"
            >
                <blockquote className="font-serif text-[clamp(1.1rem,1.8vw,1.5rem)] leading-[1.35] tracking-tight text-warmwhite/85 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-warmwhite/20 font-sans text-xs uppercase text-warmwhite/60">
                    {t.name.split(" ").map((w) => w[0]).join("")}
                  </div>
                  <div>
                    <p className="font-sans text-sm font-medium text-warmwhite">{t.name}</p>
                    <p className="font-sans text-[11px] text-warmwhite/65">
                      {t.title}, {t.company}
                    </p>
                  </div>
                </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
