"use client";

// Animated favicon — draws the wordmark glyph onto a canvas and shifts the
// accent through the brand palette every 4s. Pauses when the tab is hidden.
// Falls back silently in browsers that don't support data-URI favicon swaps.

import { useEffect } from "react";

const PALETTE = ["#cdfa00", "#e3bfb4", "#9aa6c2", "#efece9"];

function drawIcon(color: string, size = 64): string {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  // Background
  ctx.fillStyle = "#0c0c0c";
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
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(size / 2, size * 0.2);
  ctx.lineTo(size * 0.8, size / 2);
  ctx.lineTo(size / 2, size * 0.8);
  ctx.lineTo(size * 0.2, size / 2);
  ctx.closePath();
  ctx.fill();
  // Glyph "D"
  ctx.fillStyle = "#0c0c0c";
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
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    let timer: number | undefined;
    const cycle = () => {
      try {
        const url = drawIcon(PALETTE[i % PALETTE.length]);
        if (url) setFavicon(url);
        i += 1;
      } catch {
        /* silent */
      }
    };
    const start = () => {
      cycle();
      timer = window.setInterval(cycle, 4000);
    };
    const stop = () => {
      if (timer !== undefined) {
        window.clearInterval(timer);
        timer = undefined;
      }
    };
    const onVis = () => {
      if (document.hidden) stop();
      else if (timer === undefined) start();
    };
    start();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return null;
}
