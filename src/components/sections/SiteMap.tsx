import Link from "next/link";

const groups = [
  {
    label: "Identity",
    items: [
      { title: "About / Story", href: "/about", note: "Background, philosophy, journey." },
      { title: "Resume", href: "/resume", note: "Experience, education, awards." },
      { title: "Colophon", href: "/colophon", note: "How this site was made." },
    ],
  },
  {
    label: "Practice",
    items: [
      { title: "Selected Works", href: "/works", note: "Case studies & process." },
      { title: "Archive", href: "/archive", note: "Every project, every year." },
      { title: "The Lab", href: "/lab", note: "Shaders, motion, experiments." },
    ],
  },
  {
    label: "Connect",
    items: [
      { title: "Services & Process", href: "/services", note: "Engagement scope, retainer or project." },
      { title: "Journal", href: "/journal", note: "Notes on craft, motion, AI." },
      { title: "Contact", href: "/contact", note: "Start a project or just say hi." },
    ],
  },
];

export function SiteMap() {
  return (
    <section className="relative border-t border-warmwhite/10 bg-ink-950 py-28 md:py-40">
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/50">
          §11 — Beyond Home
        </p>
        <h2 className="mt-4 font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest">
          Continue <span className="italic text-peach">exploring.</span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
          {groups.map((g) => (
            <div key={g.label}>
              <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/45">
                {g.label}
              </p>
              <ul className="mt-6 space-y-6 border-t border-warmwhite/10 pt-6">
                {g.items.map((it) => (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      data-cursor="hover"
                      data-cursor-label="OPEN"
                      className="group block"
                    >
                      <p className="flex items-baseline justify-between gap-3 font-serif text-2xl tracking-tighter text-warmwhite group-hover:text-peach">
                        <span>{it.title}</span>
                        <span aria-hidden className="text-warmwhite/40 group-hover:text-peach">
                          →
                        </span>
                      </p>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-warmwhite/55">
                        {it.note}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
