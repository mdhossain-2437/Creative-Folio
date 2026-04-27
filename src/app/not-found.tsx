import Link from "next/link";
import { NoiseField } from "@/components/webgl/NoiseField";

export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-70">
        <NoiseField />
      </div>
      <div className="vignette absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-[1640px] px-6 md:px-10">
        <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
          §404 — Lost in the Void
        </p>
        <h1 className="mt-8 font-serif text-[clamp(5rem,18vw,18rem)] leading-[0.85] tracking-tightest">
          404.
        </h1>
        <p className="mt-6 max-w-xl font-serif text-2xl italic text-warmwhite/70">
          The page you are looking for has either been deprecated, misplaced, or
          escaped into the noise field. Take a different door.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-warmwhite px-6 py-3 font-sans text-[11px] uppercase tracking-widest text-ink-900 hover:bg-peach"
          >
            ← Back home
          </Link>
          <Link
            href="/works"
            className="rounded-full border border-warmwhite/30 px-6 py-3 font-sans text-[11px] uppercase tracking-widest hover:border-warmwhite"
          >
            See selected works
          </Link>
        </div>
      </div>
    </div>
  );
}
