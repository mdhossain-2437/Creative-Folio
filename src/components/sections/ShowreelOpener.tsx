"use client";

export function ShowreelOpener({ label = "Play immersive showreel" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("delowar:open-showreel"))}
      data-cursor="view"
      data-cursor-label="PLAY"
      className="inline-flex items-center gap-3 rounded-full bg-warmwhite px-7 py-4 font-sans text-[11px] uppercase tracking-widest text-ink-900 hover:bg-peach"
    >
      <span className="inline-flex h-3 w-3 items-center justify-center">
        <span className="block h-0 w-0 border-y-[5px] border-l-[7px] border-y-transparent border-l-ink-900" />
      </span>
      {label}
    </button>
  );
}
