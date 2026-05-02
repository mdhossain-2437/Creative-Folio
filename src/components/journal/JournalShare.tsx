"use client";

// Inline "copy link" button at the bottom of a journal post. Resolves the
// canonical URL from the slug + site origin so the copied string isn't a
// preview deployment URL.

import { useState } from "react";
import { pushToast } from "@/components/ui/Toast";
import { site } from "@/lib/site";

export function JournalShare({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const url = `${site.url}/journal/${slug}`;
    if (!navigator.clipboard?.writeText) return;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
        pushToast({
          id: `journal-share:${slug}`,
          title: "Post link copied",
          description: title,
          variant: "success",
          duration: 2400,
        });
        window.setTimeout(() => setCopied(false), 1600);
      })
      .catch(() =>
        pushToast({
          id: "journal-share-fail",
          title: "Couldn't copy",
          description: "Browser blocked the clipboard.",
          variant: "info",
          duration: 2200,
        })
      );
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      data-cursor="hover"
      data-cursor-label="COPY"
      aria-label={`Copy link to ${title}`}
      className="inline-flex items-center gap-2 rounded-full border border-warmwhite/20 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-warmwhite/80 transition-colors hover:border-peach hover:text-peach"
    >
      <span aria-hidden>{copied ? "✓" : "⎘"}</span>
      <span>{copied ? "Copied" : "Share post"}</span>
      <span aria-hidden className="text-warmwhite/35">·</span>
      <kbd className="rounded border border-warmwhite/15 bg-ink-950 px-1.5 py-0.5 text-warmwhite/70">
        S
      </kbd>
    </button>
  );
}
