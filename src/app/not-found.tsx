import Link from "next/link";
import { ParticleField404 } from "@/components/ui/ParticleField404";

export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink-950">
      <div className="absolute inset-0">
        <ParticleField404 />
      </div>
      <div className="vignette absolute inset-0" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 grid-lines opacity-30" />

      <div className="relative z-10 mx-auto w-full max-w-[1640px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
              §404 — Lost in the void · move your cursor through it
            </p>
            <p className="mt-8 max-w-xl font-serif text-[clamp(1.5rem,3vw,2.6rem)] italic leading-[1.15] text-warmwhite/80">
              The page you&apos;re looking for has either been{" "}
              <span className="not-italic text-peach">deprecated</span>,{" "}
              <span className="not-italic text-electric">misplaced</span>, or
              escaped into the noise field. Take a different door — or just{" "}
              <span className="not-italic text-warmwhite">push the particles around</span>{" "}
              for a minute.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/"
                data-cursor="hover"
                data-cursor-label="HOME"
                className="rounded-full bg-warmwhite px-6 py-3 font-sans text-[11px] uppercase tracking-widest text-ink-900 hover:bg-peach"
              >
                ← Back home
              </Link>
              <Link
                href="/works"
                data-cursor="hover"
                data-cursor-label="WORKS"
                className="rounded-full border border-warmwhite/30 px-6 py-3 font-sans text-[11px] uppercase tracking-widest hover:border-warmwhite"
              >
                See selected works
              </Link>
              <Link
                href="/now"
                data-cursor="hover"
                data-cursor-label="NOW"
                className="rounded-full border border-warmwhite/30 px-6 py-3 font-sans text-[11px] uppercase tracking-widest hover:border-warmwhite"
              >
                What I&apos;m doing now
              </Link>
            </div>
            <p className="mt-12 font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              ⌘K opens the command palette · ↑↑↓↓←→←→ba unlocks shader storm
            </p>
          </div>
          <div className="md:col-span-5 md:self-end">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
              ◊ Status board
            </p>
            <ul className="mt-5 space-y-3 font-mono text-[11px] uppercase tracking-widest text-warmwhite/55">
              <li className="flex items-center justify-between border-b border-warmwhite/15 pb-3">
                <span>Server</span>
                <span className="text-emerald-300">200 ok</span>
              </li>
              <li className="flex items-center justify-between border-b border-warmwhite/15 pb-3">
                <span>Route</span>
                <span className="text-peach">404 missing</span>
              </li>
              <li className="flex items-center justify-between border-b border-warmwhite/15 pb-3">
                <span>Vibes</span>
                <span className="text-electric">unbothered</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Suggestion</span>
                <span>open ⌘K</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
