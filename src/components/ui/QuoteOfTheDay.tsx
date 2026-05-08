"use client";

// QuoteOfTheDay — a small rotating studio quote in the footer. The
// rotation is deterministic by UTC date (year + day-of-year) so every
// visitor sees the same line on the same day; this keeps the page
// stable across SSR / hydration and across reloads within the same day.
//
// Hovering the quote reveals its index (e.g. `48 / 64`) so the curious
// know it cycles. Clicking copies the line to the clipboard with a
// toast.

import { useEffect, useState } from "react";
import { pushToast } from "@/components/ui/Toast";

const QUOTES = [
  "Build like you're carving — every line either lifts or cuts.",
  "Slow scrolls reveal what fast ones can't.",
  "A grid is not a cage; a grid is a tide pool.",
  "Type breathes. Let it.",
  "If the cursor doesn't enjoy itself, no one will.",
  "Every shader is a love letter to a math you didn't write.",
  "Design for the curious. The hurried will get the same payoff.",
  "Motion has weight. Pretend it costs you something.",
  "A page is a room. Don't slam doors.",
  "An edge case is just a story you haven't told yet.",
  "Your portfolio is a museum of opinions.",
  "Make it boring. Then make one thing strange.",
  "If it works on the first try, you wrote it twice.",
  "Pixels round to integers. Decisions don't.",
  "WebGL is a darkroom; the developer is the chemist.",
  "An animation is a sentence. Punctuate it.",
  "Whitespace is a co-author.",
  "Reduce until the brand is wearing only its bones.",
  "An interface should be confidently quiet.",
  "Performance is a kindness.",
  "If it isn't keyboard-accessible, it isn't finished.",
  "A loading state is its own design problem.",
  "Easings are personality tests.",
  "The cursor is your most-used component. Treat it like one.",
  "First scroll, last impression.",
  "A bug is a brief from the system.",
  "Write commits as if they'll be read by an alien archaeologist.",
  "Add a delight; remove a friction. That's the trade.",
  "The web is the only medium where you can ship a fix mid-tour.",
  "Edge cases are the corners of a building. They define the shape.",
  "Make the empty state earn its keep.",
  "Microcopy is the team-mate that never goes home.",
  "Latency is grief. Reduce it where you can.",
  "If the hover is the moment, build a moment for the hover.",
  "Render once; remember always.",
  "Type at body weight. Heads at conviction.",
  "Atoms first. Then molecules. Then mood.",
  "Iterate at the speed of doubt, not the speed of confidence.",
  "A focused state is a portrait, not a hint.",
  "Audit your tooltips like you audit your tweets.",
  "A canvas without intent is a screensaver.",
  "Test every weight at every size.",
  "The hardest part of UI is naming.",
  "Trust the body copy. The headline is just bait.",
  "Build for the network you don't have.",
  "Keep your dev tools open. The site is talking.",
  "The right radius makes the wrong button feel right.",
  "Light is data. Use it like a prop, not a ghost.",
  "A grid bug is the project's astrology — it explains everything.",
  "Don't ship; finish.",
  "When you can't sleep, ship a fix; when you can, ship a feature.",
  "Cursor lag is a posture. Fix the posture.",
  "Every metric you don't measure measures you back.",
  "The future is mostly written in lowercase.",
  "Loading is a chance to make a friend.",
  "If a component has six props, it has two components.",
  "Bigger letters do not mean bigger ideas.",
  "Don't let the hero feel lonely.",
  "A great cursor knows when to disappear.",
  "MMXXVII is just a year. Make it count anyway.",
  "Beauty is fast.",
  "Defaults are forever.",
  "Care is the only feature that ages well.",
  "The studio is shipping.",
];

function pickIndex(): number {
  const now = new Date();
  // Day-of-year (UTC) so it doesn't flicker across the international date line.
  const start = Date.UTC(now.getUTCFullYear(), 0, 0);
  const diff = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - start;
  const day = Math.floor(diff / 86_400_000);
  return (now.getUTCFullYear() * 31 + day) % QUOTES.length;
}

export function QuoteOfTheDay() {
  const [idx, setIdx] = useState<number | null>(null);
  // Compute on the client to avoid SSR / client mismatch around midnight UTC.
  useEffect(() => {
    setIdx(pickIndex());
  }, []);

  if (idx === null) return null;
  const quote = QUOTES[idx];
  const onCopy = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(`"${quote}" — Delowar Hossain`).then(() => {
      pushToast({
        id: "qotd-copy",
        title: "Quote copied",
        description: `${idx + 1} / ${QUOTES.length}`,
        variant: "success",
        duration: 1800,
      });
    }).catch(() => {
      /* clipboard blocked, silent */
    });
  };
  return (
    <button
      type="button"
      onClick={onCopy}
      data-cursor="hover"
      data-cursor-label="COPY"
      className="group block w-full text-left font-serif text-base italic leading-snug text-warmwhite/75 transition-colors hover:text-warmwhite md:text-lg"
      aria-label="Quote of the day — click to copy"
    >
      <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55 group-hover:text-peach">
        ◊ Quote of the day · {String(idx + 1).padStart(2, "0")} / {QUOTES.length}
      </span>
      <span className="mt-2 block">&ldquo;{quote}&rdquo;</span>
    </button>
  );
}
