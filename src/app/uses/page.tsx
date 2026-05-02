import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { UsesVisitTracker } from "@/components/uses/UsesVisitTracker";

export const metadata: Metadata = {
  title: "Uses — Setup & Tooling",
  description:
    "What I actually use day-to-day to build the studio — editor, OS, hardware, fonts, and a short list of dev tools that pull their weight.",
};

type Item = { name: string; note?: string; href?: string };
type Group = { title: string; eyebrow: string; items: Item[] };

const groups: Group[] = [
  {
    title: "Editor & shell",
    eyebrow: "01 — Where I write code",
    items: [
      { name: "Cursor", note: "Daily driver. Composer + agent for refactors." },
      { name: "VS Code", note: "Backup, especially for live-share sessions." },
      { name: "Vim keybindings", note: "Habit from 2018. Hard to give up." },
      { name: "Warp", note: "Terminal. AI command suggestions stay on by default." },
      { name: "fish + starship", note: "Minimal prompt with git status & duration." },
      { name: "tmux", note: "Two windows, four panes — server, logs, scratch, editor." },
    ],
  },
  {
    title: "Browser & dev tools",
    eyebrow: "02 — Where I debug",
    items: [
      { name: "Chrome Canary", note: "Lighthouse, Performance panel, GPU layer overlay." },
      { name: "Firefox Developer Edition", note: "Spider-mode for shader fallbacks." },
      { name: "Safari Tech Preview", note: "Catches subtle WebGL2 bugs Chrome hides." },
      { name: "Spector.js", note: "WebGL frame inspector — captures every GL call per frame." },
      { name: "Polypane", note: "Multi-viewport simultaneous rendering for responsive QA." },
    ],
  },
  {
    title: "Design",
    eyebrow: "03 — Where I move pixels",
    items: [
      { name: "Figma", note: "Source of truth for systems, components and editorial layouts." },
      { name: "Affinity Designer", note: "Vector + print exports the studio actually ships." },
      { name: "Procreate", note: "Sketches before any pixel work begins." },
      { name: "Tldraw", note: "Whiteboarding architecture diagrams." },
    ],
  },
  {
    title: "Type",
    eyebrow: "04 — What this site is set in",
    items: [
      { name: "Newsreader", note: "Hero serif. Variable display weight." },
      { name: "Inter", note: "UI sans across the system." },
      { name: "JetBrains Mono", note: "Code, eyebrows, the studio clock." },
      { name: "Söhne", note: "Used in editorial work. Licensed via Klim." },
      { name: "Fraunces", note: "Variable serif for moody experiments." },
    ],
  },
  {
    title: "Hardware",
    eyebrow: "05 — On the desk",
    items: [
      { name: "MacBook Pro 14” M3 Pro", note: "Primary machine. 36 GB · 1 TB." },
      { name: "LG UltraFine 4K", note: "Single 27” monitor. P3 calibrated." },
      { name: "Keychron Q1 Pro", note: "Wireless, hot-swap, browns. Silenced." },
      { name: "Logitech MX Master 3S", note: "Mouse. Quiet click is non-negotiable." },
      { name: "Audio-Technica ATH-M50x", note: "Mixing & focus. Wired." },
      { name: "Anker eraser-grey desk mat", note: "Quiet under the keyboard." },
    ],
  },
  {
    title: "Stack & deploy",
    eyebrow: "06 — Production",
    items: [
      { name: "Next.js 15", note: "App Router, edge runtime where it pays off." },
      { name: "TypeScript strict", note: "No `any`. No `getattr`-style escapes." },
      { name: "Tailwind CSS", note: "Plus a small set of hand-tuned tokens." },
      { name: "Three.js + GLSL", note: "All shaders authored, not lifted." },
      { name: "GSAP + Lenis", note: "Scroll choreography across the site." },
      { name: "Vercel", note: "Hosting. Preview deploy per PR." },
      { name: "Cloudflare Stream", note: "Showreel. HLS." },
    ],
  },
  {
    title: "Apps that pull weight",
    eyebrow: "07 — Daily",
    items: [
      { name: "Linear", note: "Project tracking. Cycle-based." },
      { name: "Raycast", note: "Launcher + clipboard history + window manager." },
      { name: "1Password", note: "Passwords + SSH keys + dev secrets." },
      { name: "Obsidian", note: "Studio notebook. Backed up to a private repo." },
      { name: "Arc", note: "Personal browsing. Spaces per project." },
    ],
  },
];

export default function UsesPage() {
  return (
    <>
      <UsesVisitTracker />
      <PageHero
        eyebrow="§ 03 — Uses"
        title="What I"
        italic="actually use."
        description="The opinionated answer to ‘what's your setup?’ — the editor, hardware, fonts, and dev tools that pull their weight in 2026. Refreshed each year."
        meta={[
          { label: "Edition", value: "MMXXVII" },
          { label: "Refreshed", value: "Q2" },
          { label: "Replaces", value: "uses-2025.md" },
          { label: "Inspired by", value: "uses.tech" },
        ]}
      />

      <section className="bg-ink-900 py-24 md:py-32">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <div className="space-y-20">
            {groups.map((group) => (
              <div
                key={group.title}
                className="grid grid-cols-1 gap-10 border-t border-warmwhite/15 pt-10 md:grid-cols-12"
              >
                <div className="md:col-span-3">
                  <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                    {group.eyebrow}
                  </p>
                  <h2 className="mt-3 break-words font-serif text-3xl tracking-tighter md:text-4xl">
                    {group.title}
                  </h2>
                </div>
                <ul className="md:col-span-9 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
                  {group.items.map((item) => (
                    <li
                      key={`${group.title}-${item.name}`}
                      className="border-t border-warmwhite/15 pt-4"
                    >
                      <p className="font-serif text-xl tracking-tight text-warmwhite md:text-2xl">
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="hover"
                            data-cursor-label="OPEN"
                            className="hover:text-peach"
                          >
                            {item.name}
                          </a>
                        ) : (
                          item.name
                        )}
                      </p>
                      {item.note && (
                        <p className="mt-2 font-sans text-sm leading-relaxed text-warmwhite/65">
                          {item.note}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-warmwhite/15 bg-ink-950 py-20 md:py-28">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
            ◊ Caveat
          </p>
          <h3 className="mt-4 max-w-3xl font-serif text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.18] tracking-tight">
            None of this is a recommendation — it&apos;s the setup that survived contact with my own work in 2026. Yours should be different.
          </h3>
        </div>
      </section>
    </>
  );
}
