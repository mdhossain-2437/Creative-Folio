"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const SEEN_KEY = "delowar:preloader-seen";
// Hard ceiling — never longer than 1.4s, even on cold loads. Earlier the
// random-step RAF could drag past 4–5s on slow devices.
const MAX_DURATION_MS = 1400;

// Rotating editorial words — cycle through the four practitioner lenses
// while the page boots so the loader doesn't feel like dead space.
const KINETIC_WORDS = ["Typography.", "Motion.", "Shaders.", "Engineering."];

export function Preloader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const [active, setActive] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(SEEN_KEY) === "1") {
      setDone(true);
      return;
    }
    // Honour reduced motion — skip the loader entirely.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      window.sessionStorage.setItem(SEEN_KEY, "1");
      setDone(true);
      return;
    }
    setActive(true);

    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const elapsed = performance.now() - start;
      // Linear time-keyed progress so the bar moves predictably even when
      // the page is doing heavy boot work and RAF is being throttled.
      const linear = Math.min(100, (elapsed / MAX_DURATION_MS) * 100);
      const ready = document.readyState === "complete";
      const next = ready ? Math.max(linear, 96) : linear;
      setPct(Math.floor(next));
      if (next < 100 && elapsed < MAX_DURATION_MS) {
        raf = requestAnimationFrame(tick);
      } else {
        setPct(100);
        window.sessionStorage.setItem(SEEN_KEY, "1");
        setTimeout(() => setDone(true), 280);
      }
    };
    raf = requestAnimationFrame(tick);

    // Cycle the kinetic word every ~340ms (≈ four rotations across the
    // 1.4s ceiling). Cleared alongside the RAF.
    const wordTimer = window.setInterval(() => {
      setWordIdx((i) => (i + 1) % KINETIC_WORDS.length);
    }, 340);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(wordTimer);
    };
  }, []);

  if (!active && done) return null;

  return (
    <div
      aria-hidden={done}
      className={`pointer-events-none fixed inset-0 z-[90] flex flex-col justify-between bg-ink-950 px-6 pb-10 pt-10 transition-[transform,opacity] duration-1000 ease-out md:px-10 md:pb-12 md:pt-12 ${
        done ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      {/* Top row — edition + practitioner meta. Fills the previously
          empty upper half with quiet editorial info. */}
      <header className="flex items-start justify-between gap-6">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
            ◌ Folio {site.editionShort}
          </p>
          <p className="mt-1.5 font-sans text-[10px] uppercase tracking-widest text-warmwhite/35">
            Edition {site.edition}
          </p>
        </div>
        <div className="text-right">
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
            § Practitioner
          </p>
          <p className="mt-1.5 font-sans text-[10px] uppercase tracking-widest text-warmwhite/35">
            {site.location}
          </p>
        </div>
      </header>

      {/* Middle — kinetic rotating word fills the centre so the screen
          breathes during the boot. Pure visual rhythm; no semantics. */}
      <div
        aria-hidden
        className="my-auto flex flex-col items-center justify-center gap-3 py-12"
      >
        <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/45">
          ◊ Building the room
        </p>
        <p className="font-serif text-[clamp(2.5rem,8vw,6rem)] italic leading-none tracking-tightest text-warmwhite/85 transition-opacity duration-300">
          {KINETIC_WORDS[wordIdx]}
        </p>
      </div>

      {/* Bottom row — status (left) and big percentage + bar (right). */}
      <footer className="flex items-end justify-between gap-6">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
            ◌ Loading
          </p>
          <p className="mt-3 font-serif text-3xl italic text-warmwhite/80">
            Loading folio
          </p>
        </div>
        <div className="flex flex-col items-end">
          <p className="display-num font-serif text-[clamp(4rem,15vw,12rem)] leading-none tracking-tightest text-warmwhite">
            {pct.toString().padStart(3, "0")}
          </p>
          <div className="mt-3 h-px w-72 max-w-[60vw] overflow-hidden bg-warmwhite/15">
            <div
              className="h-full origin-left bg-peach transition-transform duration-300"
              style={{ transform: `scaleX(${pct / 100})` }}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
