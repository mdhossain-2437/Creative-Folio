"use client";

// G+key navigation, GitHub-style. Press `g` then a single letter within ~1.2s
// to navigate. Also handles `M` (motion toggle), `R` on /lab (random
// experiment) and triggers the `fast-traveler` achievement after 5 jumps.

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { markNavJump, unlock } from "@/lib/achievements";
import { pushToast } from "@/components/ui/Toast";
import { applyMotion } from "@/components/ui/MotionToggle";
import { experiments } from "@/lib/data";

const ROUTE_MAP: Record<string, { href: string; label: string }> = {
  h: { href: "/", label: "Home" },
  i: { href: "/", label: "Index" },
  w: { href: "/works", label: "Works" },
  l: { href: "/lab", label: "Lab" },
  p: { href: "/process", label: "Process" },
  a: { href: "/about", label: "About" },
  r: { href: "/resume", label: "Resume" },
  j: { href: "/journal", label: "Journal" },
  s: { href: "/services", label: "Services" },
  c: { href: "/contact", label: "Contact" },
  n: { href: "/now", label: "Now" },
  t: { href: "/atlas", label: "Atlas" },
};

function isEditable(): boolean {
  const tag = (document.activeElement?.tagName || "").toLowerCase();
  if (["input", "textarea", "select"].includes(tag)) return true;
  const editable = document.activeElement as HTMLElement | null;
  return Boolean(editable?.isContentEditable);
}

export function NavShortcuts() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let armed = false;
    let armedTimeout: number | undefined;

    const disarm = () => {
      armed = false;
      if (armedTimeout !== undefined) {
        window.clearTimeout(armedTimeout);
        armedTimeout = undefined;
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isEditable()) return;
      const key = e.key.toLowerCase();

      if (armed) {
        const route = ROUTE_MAP[key];
        if (route) {
          e.preventDefault();
          disarm();
          if (window.location.pathname !== route.href) {
            router.push(route.href);
            markNavJump();
            pushToast({
              id: `nav:${route.href}`,
              title: `→ ${route.label}`,
              description: `g${key} · keyboard jump`,
              variant: "info",
              duration: 1600,
            });
          }
          return;
        }
        // Unknown follow-up key resets the chord
        disarm();
      }

      if (key === "g" && !e.shiftKey) {
        // Don't arm if focus is anywhere editable (already handled above).
        armed = true;
        armedTimeout = window.setTimeout(disarm, 1200);
        return;
      }

      // Standalone shortcuts (no chord required)
      if (e.shiftKey) return;
      if (key === "m") {
        e.preventDefault();
        const hasCalm = document.body.classList.contains("calm-motion");
        const next = hasCalm ? "on" : "off";
        applyMotion(next);
        try {
          window.localStorage.setItem("delowar:motion", next);
        } catch {
          /* silent */
        }
        pushToast({
          id: "motion-toggle",
          title: next === "off" ? "Calmer build" : "Full motion",
          description: next === "off" ? "Animations dialled down" : "Animations restored",
          variant: "info",
          duration: 1800,
        });
        return;
      }
      if (key === "r" && pathname === "/lab") {
        e.preventDefault();
        const slugs = experiments.map((x) => x.slug);
        if (slugs.length === 0) return;
        let next = slugs[Math.floor(Math.random() * slugs.length)];
        if (slugs.length > 1) {
          // avoid trivially picking the only one already on screen
          let safety = 4;
          while (next === slugs[0] && safety-- > 0) {
            next = slugs[Math.floor(Math.random() * slugs.length)];
          }
        }
        router.push(`/lab/${next}`);
        pushToast({
          id: `random:${next}`,
          title: "Random experiment",
          description: `→ /lab/${next}`,
          variant: "info",
          duration: 1800,
        });
        return;
      }
      if (key === "?" || (e.key === "/" && e.shiftKey)) {
        // Cheat sheet handles `?` itself; this is a no-op.
        return;
      }
    };
    window.addEventListener("keydown", onKey);

    // First-touch achievement on first pointer move (lightweight unlock).
    const onFirstMove = () => {
      unlock("first-touch", { silent: true });
      window.removeEventListener("pointermove", onFirstMove);
    };
    window.addEventListener("pointermove", onFirstMove, { once: true });

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointermove", onFirstMove);
      disarm();
    };
  }, [router, pathname]);

  return null;
}
