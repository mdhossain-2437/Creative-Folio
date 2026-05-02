"use client";

import { snapshotLabStage } from "./LabPlaygroundShortcuts";

export function LabSnapshotButton({ slug }: { slug: string }) {
  return (
    <button
      type="button"
      onClick={() => snapshotLabStage(slug)}
      data-cursor="hover"
      data-cursor-label="SAVE"
      className="group inline-flex items-center gap-2 rounded-full border border-warmwhite/25 bg-ink-950/55 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-warmwhite/70 backdrop-blur-sm transition-colors hover:border-warmwhite/70 hover:text-warmwhite"
      aria-label="Download the current canvas as a PNG"
    >
      <span aria-hidden className="-mt-px text-[12px] leading-none">⤓</span>
      <span>Save PNG</span>
      <span aria-hidden className="ml-1 rounded bg-warmwhite/10 px-1.5 py-0.5 text-[9px] tracking-widest text-warmwhite/55 group-hover:bg-warmwhite/15">
        D
      </span>
    </button>
  );
}
