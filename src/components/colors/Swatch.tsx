"use client";

import { useState } from "react";
import { pushToast } from "@/components/ui/Toast";
import { unlock } from "@/lib/achievements";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = /^#?([\da-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return { r: (n >> 16) & 0xff, g: (n >> 8) & 0xff, b: n & 0xff };
}

// WCAG 2.x relative luminance.
function luminance({ r, g, b }: { r: number; g: number; b: number }): number {
  const toLin = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
}

function contrast(a: string, b: string): number {
  const ra = hexToRgb(a);
  const rb = hexToRgb(b);
  if (!ra || !rb) return 1;
  const la = luminance(ra) + 0.05;
  const lb = luminance(rb) + 0.05;
  return la > lb ? la / lb : lb / la;
}

export function Swatch({
  name,
  hex,
  token,
  bg = "#070708",
}: {
  name: string;
  hex: string;
  token: string;
  bg?: string;
}) {
  const [copied, setCopied] = useState(false);

  const ratio = contrast(hex, bg);
  const wcag = ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA·LG" : "—";
  const rgb = hexToRgb(hex);
  const rgbLabel = rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : "—";

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1100);
      pushToast({
        id: `swatch:${hex}`,
        title: `Copied ${hex.toUpperCase()}`,
        description: `${name} · ${token}`,
        variant: "success",
        duration: 1600,
      });
      unlock("designer");
    } catch {
      pushToast({
        id: `swatch-fail:${hex}`,
        title: "Clipboard blocked",
        description: "Browser denied write-access.",
        variant: "info",
        duration: 1600,
      });
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      data-cursor="hover"
      data-cursor-label="COPY"
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-warmwhite/10 text-left transition-colors hover:border-warmwhite/35"
      aria-label={`Copy ${name} (${hex})`}
    >
      <div
        className="relative h-44 w-full"
        style={{ background: hex }}
      >
        <span
          aria-hidden
          className={`absolute right-3 top-3 rounded-full bg-ink-950/45 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-warmwhite/85 backdrop-blur-sm transition-opacity ${
            copied ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          {copied ? "Copied ✓" : "Click to copy"}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 bg-ink-900 px-4 py-4">
        <div className="flex items-center justify-between">
          <span className="font-serif text-lg tracking-tight text-warmwhite">
            {name}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-warmwhite/55">
            {hex.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-warmwhite/45">
          <span>{token}</span>
          <span>rgb({rgbLabel})</span>
        </div>
        <div className="mt-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
          <span className="text-warmwhite/45">on ink-950</span>
          <span
            className={
              wcag === "AAA"
                ? "text-emerald-300"
                : wcag === "AA"
                ? "text-electric"
                : wcag === "AA·LG"
                ? "text-peach"
                : "text-warmwhite/40"
            }
          >
            {ratio.toFixed(2)}× · {wcag}
          </span>
        </div>
      </div>
    </button>
  );
}
