import { ReactNode } from "react";
import { NoiseField } from "@/components/webgl/NoiseField";
import { SplitText } from "@/components/ui/SplitText";

export function PageHero({
  eyebrow,
  title,
  italic,
  description,
  meta,
  noise = true,
  children,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  description?: string;
  meta?: { label: string; value: string }[];
  noise?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-warmwhite/10">
      {noise && (
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
          <NoiseField />
        </div>
      )}
      <div className="vignette absolute inset-0 -z-10" />
      <div className="mx-auto flex max-w-[1640px] flex-col px-6 pb-16 pt-40 md:px-10 md:pb-24 md:pt-48">
        <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
          {eyebrow}
        </p>
        <h1 className="mt-8 font-serif text-[clamp(3rem,12vw,12rem)] leading-[0.9] tracking-tightest">
          <SplitText text={title} />
          {italic && (
            <span className="block italic text-warmwhite/65">
              <SplitText text={italic} delay={0.18} />
            </span>
          )}
        </h1>
        {(description || meta) && (
          <div className="mt-12 grid grid-cols-1 gap-8 border-t border-warmwhite/10 pt-8 md:grid-cols-12">
            {description && (
              <p className="md:col-span-6 max-w-2xl text-balance font-sans text-base leading-relaxed text-warmwhite/70 md:text-lg">
                {description}
              </p>
            )}
            {meta && (
              <ul className="grid grid-cols-2 gap-6 md:col-span-6 md:grid-cols-4">
                {meta.map((m) => (
                  <li key={m.label}>
                    <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/45">
                      {m.label}
                    </p>
                    <p className="mt-2 font-serif text-xl tracking-tighter text-warmwhite">
                      {m.value}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}
