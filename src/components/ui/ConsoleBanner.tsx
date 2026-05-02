"use client";

// Prints a styled welcome banner to the DevTools console. Also fires the
// "console-cowboy" achievement when the user opens DevTools (heuristic: large
// gap between window.outerWidth and window.innerWidth, or DevTools' debugger
// feature timing trick).

import { useEffect } from "react";
import { unlock } from "@/lib/achievements";

export function ConsoleBanner() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage?.getItem("delowar:console-banner") === "1") return;

    const css = [
      "padding: 14px 18px",
      "background: linear-gradient(135deg,#0c0c0c,#1f201f)",
      "color:#efece9",
      "font: 13px/1.5 'JetBrains Mono', ui-monospace, monospace",
      "border-radius: 10px",
      "border: 1px solid rgba(227,191,180,0.35)",
    ].join(";");

    const accent =
      "color:#cdfa00; font: 11px 'JetBrains Mono', monospace; letter-spacing: 0.18em; text-transform: uppercase;";

    /* eslint-disable no-console */
    console.log("%c  ◊ delowar.dev — folio MMXXVI  ", css);
    console.log(
      "%cdelowar%c crafts editorial systems, motion engines, and shader-driven UI. " +
        "If you found this, you're already part of the studio.",
      "color:#e3bfb4; font:bold 12px/1.5 sans-serif;",
      "color:#efece9; font:12px/1.6 sans-serif;"
    );
    console.log("%cTry the konami code · ⌘K · ?·  G then any nav key.", accent);
    console.log(
      "%cMail %chello@delowarhossain.dev",
      "color:#717179; font:11px/1.4 sans-serif;",
      "color:#cdfa00; font:11px/1.4 sans-serif;"
    );
    /* eslint-enable no-console */

    try {
      window.sessionStorage.setItem("delowar:console-banner", "1");
    } catch {
      /* silent */
    }

    // DevTools-open detection: width delta heuristic. Avoids running
    // continuously — sample a few times then stop.
    let samples = 0;
    const check = () => {
      samples += 1;
      const widthGap = Math.abs((window.outerWidth || 0) - window.innerWidth) > 160;
      const heightGap = Math.abs((window.outerHeight || 0) - window.innerHeight) > 200;
      if (widthGap || heightGap) {
        unlock("console-cowboy");
        return;
      }
      if (samples < 8) {
        window.setTimeout(check, 1500);
      }
    };
    window.setTimeout(check, 800);
  }, []);

  return null;
}
