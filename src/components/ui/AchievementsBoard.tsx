"use client";

// Live-updating board of every achievement. Reads state from localStorage on
// mount and re-reads on every `delowar:achievement` event so unlocking from
// any tab/page reflects here without a refresh.

import { useEffect, useState } from "react";
import { ACHIEVEMENTS, type AchievementId, totalCount } from "@/lib/achievements";

const HINTS: Record<AchievementId, string> = {
  "first-touch": "Move the cursor anywhere on a page.",
  "shader-storm": "There is a famous ten-key sequence from 1986.",
  "lab-rat": "Open every experiment under §02.",
  "power-user": "Find the shortcut sheet.",
  scribe: "Copy the studio email.",
  cartographer: "Open the Atlas.",
  "fast-traveler": "Make five jumps via the keyboard chord.",
  "console-cowboy": "Open the developer tools.",
  trickster: "The wordmark in the footer responds to a knock.",
};

const RARITY: Record<AchievementId, "common" | "rare" | "legendary"> = {
  "first-touch": "common",
  scribe: "common",
  "power-user": "common",
  cartographer: "common",
  "fast-traveler": "rare",
  "console-cowboy": "rare",
  trickster: "rare",
  "lab-rat": "legendary",
  "shader-storm": "legendary",
};

const STORAGE_KEY = "delowar:achievements:v1";

function readState(): Record<string, number> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Record<string, number>) : {};
  } catch {
    return {};
  }
}

function fmtDate(ts: number): string {
  try {
    return new Date(ts).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
}

const RARITY_TINT: Record<"common" | "rare" | "legendary", string> = {
  common: "text-warmwhite/55",
  rare: "text-bone/85",
  legendary: "text-peach",
};

export function AchievementsBoard() {
  const [state, setState] = useState<Record<string, number>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(readState());
    setHydrated(true);
    const refresh = () => setState(readState());
    window.addEventListener("delowar:achievement", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("delowar:achievement", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const ids = Object.keys(ACHIEVEMENTS) as AchievementId[];
  const unlocked = ids.filter((id) => Boolean(state[id])).length;
  const pct = Math.round((unlocked / totalCount()) * 100);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-warmwhite/10 pb-8">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/45">
            ◊ Compendium
          </p>
          <p className="mt-3 font-serif text-3xl tracking-tight text-warmwhite md:text-5xl">
            {hydrated ? `${unlocked} / ${totalCount()}` : `— / ${totalCount()}`}{" "}
            <span className="italic text-warmwhite/55">unlocked.</span>
          </p>
        </div>
        <div className="w-full max-w-md">
          <div className="h-1 w-full overflow-hidden rounded-full bg-warmwhite/10">
            <div
              className="h-full bg-peach transition-[width] duration-700"
              style={{ width: `${hydrated ? pct : 0}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-warmwhite/45">
            <span>{hydrated ? `${pct}%` : "—%"}</span>
            <span>localStorage · this browser</span>
          </div>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/10 md:grid-cols-2 lg:grid-cols-3 mt-px">
        {ids.map((id) => {
          const ach = ACHIEVEMENTS[id];
          const ts = state[id];
          const isUnlocked = Boolean(ts);
          const rarity = RARITY[id];
          return (
            <li
              key={id}
              className={`relative bg-ink-900 p-7 transition-colors ${
                isUnlocked ? "" : "bg-ink-900/60"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`font-mono text-[10px] uppercase tracking-widest ${RARITY_TINT[rarity]}`}
                >
                  {rarity}
                </span>
                <span
                  aria-hidden
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full border ${
                    isUnlocked
                      ? "border-peach/60 bg-peach/15 text-peach"
                      : "border-warmwhite/15 bg-warmwhite/5 text-warmwhite/30"
                  }`}
                >
                  {isUnlocked ? "★" : "·"}
                </span>
              </div>
              <p
                className={`mt-6 font-serif text-2xl leading-tight tracking-tight md:text-[1.7rem] ${
                  isUnlocked ? "text-warmwhite" : "text-warmwhite/40"
                }`}
              >
                {isUnlocked ? ach.title : "Locked"}
              </p>
              <p
                className={`mt-3 font-sans text-sm leading-relaxed ${
                  isUnlocked ? "text-warmwhite/70" : "text-warmwhite/45"
                }`}
              >
                {isUnlocked ? ach.description : HINTS[id]}
              </p>
              <div className="mt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-warmwhite/40">
                <span>§{String(ids.indexOf(id) + 1).padStart(2, "0")}</span>
                <span>{isUnlocked ? fmtDate(ts) : "—"}</span>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 max-w-2xl font-sans text-sm leading-relaxed text-warmwhite/55">
        State is per-browser. Clearing site data resets the board. Hints are
        deliberately vague — half the fun is the search.
      </p>
    </div>
  );
}
