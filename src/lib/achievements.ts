// Lightweight achievement system. Stores unlocked ids in localStorage and
// dispatches a toast on first unlock. Designed to be called from anywhere via
// `unlock(id)` — does nothing on the server (guards `window`).

import { pushToast } from "@/components/ui/Toast";

export type AchievementId =
  | "first-touch"
  | "shader-storm"
  | "lab-rat"
  | "power-user"
  | "scribe"
  | "cartographer"
  | "fast-traveler"
  | "console-cowboy"
  | "trickster"
  | "true-believer"
  | "tinkerer"
  | "snapshotter"
  | "curator"
  | "designer"
  | "archivist"
  | "capsule-keeper"
  | "atmosphere-shifter"
  | "polyglot"
  | "settled";

const STORAGE_KEY = "delowar:achievements:v1";

type AchievementMeta = {
  title: string;
  description: string;
};

export const ACHIEVEMENTS: Record<AchievementId, AchievementMeta> = {
  "first-touch": {
    title: "First touch",
    description: "Welcome. Move the cursor anywhere — the system listens.",
  },
  "shader-storm": {
    title: "Shader storm",
    description: "Konami code accepted. RGB shift engaged for six seconds.",
  },
  "lab-rat": {
    title: "Lab rat",
    description: "Visited every experiment. The whole instrument panel is warm.",
  },
  "power-user": {
    title: "Power user",
    description: "You found the cheat sheet. The whole site bends to a keystroke.",
  },
  scribe: {
    title: "Scribe",
    description: "Email copied. The studio inbox is ready when you are.",
  },
  cartographer: {
    title: "Cartographer",
    description: "Atlas opened. Every node is reachable from here.",
  },
  "fast-traveler": {
    title: "Fast traveler",
    description: "Five jumps via G+key. The keyboard is your map now.",
  },
  "console-cowboy": {
    title: "Console cowboy",
    description: "DevTools open and reading the welcome stanza. Respect.",
  },
  trickster: {
    title: "Trickster",
    description: "A triple-click on the wordmark. Some doors only open by knock.",
  },
  "true-believer": {
    title: "True believer",
    description: "You spelled the studio anywhere on the site. Welcome inside.",
  },
  tinkerer: {
    title: "Tinkerer",
    description: "Read the /uses page. You wanted to know what's on the desk.",
  },
  snapshotter: {
    title: "Snapshotter",
    description: "Saved a frame from a lab experiment. Print it. Tweet it. Frame it.",
  },
  curator: {
    title: "Curator",
    description: "Browsed the changelog. Now you know what shipped and when.",
  },
  designer: {
    title: "Designer",
    description: "Pulled a colour from the studio palette into your clipboard.",
  },
  archivist: {
    title: "Archivist",
    description: "Read every case study end to end. The archive is yours now.",
  },
  "capsule-keeper": {
    title: "Capsule keeper",
    description:
      "Saved a time capsule of the page. The studio remembers your visit.",
  },
  "atmosphere-shifter": {
    title: "Atmosphere shifter",
    description:
      "Cycled through every atmosphere. The studio breathes differently now.",
  },
  polyglot: {
    title: "Polyglot",
    description:
      "Whispered four secret words. The site knows several incantations.",
  },
  settled: {
    title: "Settled",
    description:
      "Spent three quiet minutes on a single page. The studio knows you're reading.",
  },
};

function readState(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed as Record<string, number>;
    return {};
  } catch {
    return {};
  }
}

function writeState(state: Record<string, number>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota or disabled — silent */
  }
}

export function isUnlocked(id: AchievementId): boolean {
  return Boolean(readState()[id]);
}

export function unlock(id: AchievementId, opts?: { silent?: boolean }) {
  if (typeof window === "undefined") return false;
  const state = readState();
  if (state[id]) return false;
  state[id] = Date.now();
  writeState(state);
  const meta = ACHIEVEMENTS[id];
  if (meta && !opts?.silent) {
    pushToast({
      id: `ach:${id}`,
      title: meta.title,
      description: meta.description,
      variant: "achievement",
      duration: 4200,
    });
  }
  window.dispatchEvent(new CustomEvent("delowar:achievement", { detail: { id } }));
  return true;
}

export function unlockedCount(): number {
  return Object.keys(readState()).length;
}

export function totalCount(): number {
  return Object.keys(ACHIEVEMENTS).length;
}

// Helpers used by lab pages to track per-slug visits.
const LAB_KEY = "delowar:lab-visited:v1";

export function markLabVisit(slug: string, allSlugs: string[]) {
  if (typeof window === "undefined") return;
  let visited: string[] = [];
  try {
    visited = JSON.parse(window.localStorage.getItem(LAB_KEY) || "[]");
  } catch {
    visited = [];
  }
  if (!visited.includes(slug)) {
    visited.push(slug);
    try {
      window.localStorage.setItem(LAB_KEY, JSON.stringify(visited));
    } catch {
      /* silent */
    }
  }
  if (allSlugs.every((s) => visited.includes(s))) {
    unlock("lab-rat");
  }
}

const WORKS_KEY = "delowar:works-visited:v1";

export function markWorkVisit(slug: string, allSlugs: string[]) {
  if (typeof window === "undefined") return;
  let visited: string[] = [];
  try {
    visited = JSON.parse(window.localStorage.getItem(WORKS_KEY) || "[]");
  } catch {
    visited = [];
  }
  if (!visited.includes(slug)) {
    visited.push(slug);
    try {
      window.localStorage.setItem(WORKS_KEY, JSON.stringify(visited));
    } catch {
      /* silent */
    }
  }
  if (allSlugs.every((s) => visited.includes(s))) {
    unlock("archivist");
  }
}

const NAV_JUMP_KEY = "delowar:nav-jumps:v1";

export function markNavJump() {
  if (typeof window === "undefined") return;
  let n = 0;
  try {
    n = parseInt(window.localStorage.getItem(NAV_JUMP_KEY) || "0", 10);
    if (!Number.isFinite(n) || n < 0) n = 0;
  } catch {
    n = 0;
  }
  n += 1;
  try {
    window.localStorage.setItem(NAV_JUMP_KEY, String(n));
  } catch {
    /* silent */
  }
  if (n >= 5) unlock("fast-traveler");
}
