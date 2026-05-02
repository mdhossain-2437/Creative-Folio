"use client";

import { MouseEvent } from "react";
import { pushToast } from "@/components/ui/Toast";

export function LabCardCopyLink({ slug }: { slug: string }) {
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    // The button is rendered inside an anchor; prevent navigation.
    e.preventDefault();
    e.stopPropagation();
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}/lab/${slug}`;
    navigator.clipboard
      ?.writeText(url)
      .then(() =>
        pushToast({
          id: `copy:${slug}`,
          title: "Link copied",
          description: `/lab/${slug}`,
          variant: "success",
          duration: 1800,
        })
      )
      .catch(() =>
        pushToast({
          id: `copy:${slug}:fail`,
          title: "Couldn't copy link",
          description: "Browser blocked clipboard access.",
          variant: "info",
          duration: 1800,
        })
      );
  };

  return (
    <button
      type="button"
      onClick={onClick}
      onPointerDown={(e) => e.stopPropagation()}
      aria-label={`Copy link to ${slug}`}
      data-cursor="hover"
      data-cursor-label="COPY"
      className="absolute right-5 top-16 z-[5] inline-flex h-8 w-8 items-center justify-center rounded-full border border-warmwhite/15 bg-ink-900/65 font-mono text-[10px] text-warmwhite/70 opacity-0 backdrop-blur transition-all duration-300 hover:border-peach/60 hover:text-warmwhite group-hover:opacity-100"
    >
      ⎘
    </button>
  );
}
