"use client";

// KonamiFlash — when the konami event fires (or the user enters the
// physical sequence) we briefly flash a giant `MMXXVII` overlay across
// the viewport. Lives alongside ShaderStorm so the moment of triumph
// gets a typographic crescendo, not just a particle storm.
//
// Auto-dismisses after 1.4s. No interactivity — the cursor passes
// through. Reduced-motion users get the static hold without the fade.

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export function KonamiFlash() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fire = () => {
      setActive(true);
      window.setTimeout(() => setActive(false), 1400);
    };
    window.addEventListener("delowar:shader-storm", fire);
    return () => window.removeEventListener("delowar:shader-storm", fire);
  }, []);

  if (!active) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[150] flex items-center justify-center motion-reduce:opacity-100"
      style={{
        animation: "konamiFade 1400ms ease-out forwards",
      }}
    >
      <span
        className="font-serif italic tracking-tighter text-warmwhite mix-blend-difference"
        style={{
          fontSize: "clamp(8rem, 24vw, 22rem)",
          lineHeight: 0.85,
          letterSpacing: "-0.04em",
          textShadow: "0 0 60px rgba(255, 196, 156, 0.45)",
        }}
      >
        {site.editionShort}
      </span>
      <style>{`
        @keyframes konamiFade {
          0% { opacity: 0; transform: scale(1.18); filter: blur(16px); }
          18% { opacity: 1; transform: scale(1); filter: blur(0); }
          78% { opacity: 1; transform: scale(1.02); }
          100% { opacity: 0; transform: scale(0.96); filter: blur(8px); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-konami-flash] { animation-duration: 0ms !important; }
        }
      `}</style>
    </div>
  );
}
