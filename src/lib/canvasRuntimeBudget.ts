import { deviceProfile, onDeviceProfileChange } from "@/lib/deviceTier";

type RuntimeEntry = {
  id: number;
  visible: boolean;
  running: boolean;
  lastVisibleAt: number;
  startLoop: () => void;
  stopLoop: () => void;
};

type RuntimeRegistration = {
  setVisible: (visible: boolean) => void;
  dispose: () => void;
};

const entries = new Map<number, RuntimeEntry>();
let nextId = 1;
let unlistenProfileChange: (() => void) | null = null;

function maxActiveRuntimes(): number {
  const profile = deviceProfile();
  if (profile.reducedMotion) return 1;
  if (profile.tier === "low") return profile.isTouch ? 2 : 3;
  if (profile.tier === "mid") return profile.isTouch ? 4 : 5;
  return profile.isTouch ? 5 : 8;
}

function ensureProfileListener() {
  if (typeof window === "undefined" || unlistenProfileChange) return;
  unlistenProfileChange = onDeviceProfileChange(reconcileCanvasRuntimeBudget);
}

export function reconcileCanvasRuntimeBudget() {
  if (typeof window === "undefined") return;

  const max = maxActiveRuntimes();
  const visible = Array.from(entries.values())
    .filter((entry) => entry.visible)
    .sort((a, b) => b.lastVisibleAt - a.lastVisibleAt);
  const allowed = new Set(visible.slice(0, max).map((entry) => entry.id));

  entries.forEach((entry) => {
    const shouldRun = entry.visible && allowed.has(entry.id);
    if (shouldRun && !entry.running) {
      entry.running = true;
      entry.startLoop();
    } else if (!shouldRun && entry.running) {
      entry.stopLoop();
      entry.running = false;
    }
  });
}

export function registerCanvasRuntime({
  startLoop,
  stopLoop,
}: {
  startLoop: () => void;
  stopLoop: () => void;
}): RuntimeRegistration {
  ensureProfileListener();

  const id = nextId++;
  const entry: RuntimeEntry = {
    id,
    visible: false,
    running: false,
    lastVisibleAt: 0,
    startLoop,
    stopLoop,
  };
  entries.set(id, entry);

  return {
    setVisible(visible) {
      entry.visible = visible;
      if (visible) entry.lastVisibleAt = performance.now();
      reconcileCanvasRuntimeBudget();
    },
    dispose() {
      entry.visible = false;
      if (entry.running) {
        entry.stopLoop();
        entry.running = false;
      }
      entries.delete(id);
      reconcileCanvasRuntimeBudget();
    },
  };
}
