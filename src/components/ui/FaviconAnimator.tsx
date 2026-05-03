"use client";

// Favicon — accent-tinted glyph canvas. Used to cycle through brand
// colours; now switches in lock-step with the active atmosphere mode
// (5 modes: aura · storm · stillness · eink · terminal). Pauses when
// the tab is hidden. Falls back silently in browsers that don't
// support data-URI favicon swaps.

import { useEffect } from "react";

type AtmosphereKey = "aura" | "storm" | "stillness" | "eink" | "terminal";

const PALETTE: Record<AtmosphereKey, { bg: string; accent: string; glyph: string }> = {
  aura: { bg: "#0c0c0c", accent: "#e3bfb4", glyph: "#0c0c0c" },
  storm: { bg: "#07080c", accent: "#cdfa00", glyph: "#0c0c0c" },
  stillness: { bg: "#050507", accent: "#efece9", glyph: "#0c0c0c" },
  eink: { bg: "#efece9", accent: "#0c0c0c", glyph: "#efece9" },
  terminal: { bg: "#030604", accent: "#00dc5a", glyph: "#030604" },
};

function readMode(): AtmosphereKey {
  if (typeof document === "undefined") return "aura";
  const v = document.documentElement.dataset.atmosphere;
  if (v && v in PALETTE) return v as AtmosphereKey;
  return "aura";
}

function drawIcon(mode: AtmosphereKey, size = 64): string {
  const { bg, accent, glyph } = PALETTE[mode];
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  // Background
  ctx.fillStyle = bg;
  ctx.beginPath();
  const r = 12;
  ctx.moveTo(r, 0);
  ctx.lineTo(size - r, 0);
  ctx.quadraticCurveTo(size, 0, size, r);
  ctx.lineTo(size, size - r);
  ctx.quadraticCurveTo(size, size, size - r, size);
  ctx.lineTo(r, size);
  ctx.quadraticCurveTo(0, size, 0, size - r);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();
  ctx.fill();
  // Diamond accent
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.moveTo(size / 2, size * 0.2);
  ctx.lineTo(size * 0.8, size / 2);
  ctx.lineTo(size / 2, size * 0.8);
  ctx.lineTo(size * 0.2, size / 2);
  ctx.closePath();
  ctx.fill();
  // Glyph "D"
  ctx.fillStyle = glyph;
  ctx.font = "bold 28px 'Newsreader', Georgia, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("D", size / 2, size / 2 + 1);
  return canvas.toDataURL("image/png");
}

function setFavicon(href: string) {
  const head = document.head;
  if (!head) return;
  let link = head.querySelector<HTMLLinkElement>("link[data-favicon-anim]");
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "icon");
    link.setAttribute("type", "image/png");
    link.setAttribute("data-favicon-anim", "true");
    head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export function FaviconAnimator() {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    let last: AtmosphereKey | null = null;
    const apply = () => {
      try {
        if (document.hidden) return;
        const mode = readMode();
        if (mode === last) return;
        last = mode;
        const url = drawIcon(mode);
        if (url) setFavicon(url);
      } catch {
        /* silent */
      }
    };
    apply();
    const obs = new MutationObserver(apply);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-atmosphere"],
    });
    const onVis = () => {
      if (!document.hidden) apply();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      obs.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return null;
}
