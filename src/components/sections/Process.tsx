import { process } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function ProcessSection() {
  return (
    <section className="relative border-t border-warmwhite/15 bg-ink-900 py-28 md:py-40">
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <header className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 md:col-span-3">
            §09 — Process
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest md:col-span-9">
            Concept <span className="italic text-warmwhite/60">to</span> Shader.
          </h2>
        </header>

        <ol className="mt-16 grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/15 md:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={p.phase} delay={i * 0.06}>
              <li className="flex h-full flex-col gap-6 bg-ink-900 p-8 md:p-10">
                <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                  {p.phase}
                </span>
                <h3 className="font-serif text-3xl leading-none tracking-tightest md:text-4xl">
                  {p.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-warmwhite/65">{p.summary}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
