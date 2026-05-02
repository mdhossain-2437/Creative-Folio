"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/lib/site";
import { applyMotion } from "@/components/ui/MotionToggle";
import { pushToast } from "@/components/ui/Toast";
import { unlock } from "@/lib/achievements";

type Item = {
  id: string;
  label: string;
  hint?: string;
  kind: "route" | "action";
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const items = useMemo<Item[]>(() => {
    const routes: Item[] = site.nav.map((n) => ({
      id: `route:${n.href}`,
      label: n.label,
      hint: n.href,
      kind: "route",
    }));
    const extras: Item[] = [
      { id: "route:/now", label: "Now", hint: "/now", kind: "route" },
      { id: "route:/showreel", label: "Showreel", hint: "/showreel", kind: "route" },
      { id: "route:/atlas", label: "Site Atlas", hint: "/atlas", kind: "route" },
      { id: "route:/awards", label: "Awards", hint: "/awards", kind: "route" },
      { id: "route:/archive", label: "Archive", hint: "/archive", kind: "route" },
      { id: "route:/colophon", label: "Colophon", hint: "/colophon", kind: "route" },
      { id: "route:/achievements", label: "Achievements", hint: "/achievements", kind: "route" },
    ];
    const actions: Item[] = site.commandActions.map((a) => ({
      id: `action:${a.id}`,
      label: a.label,
      hint: a.hint,
      kind: "action",
    }));
    return [...routes, ...extras, ...actions];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => it.label.toLowerCase().includes(q) || (it.hint ?? "").toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isK = e.key === "k" || e.key === "K";
      const tag = (document.activeElement?.tagName || "").toLowerCase();
      const editable =
        ["input", "textarea", "select"].includes(tag) ||
        Boolean((document.activeElement as HTMLElement | null)?.isContentEditable);
      if (isK && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (
        !open &&
        !editable &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        e.key === "/"
      ) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      } else if (open) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActive((a) => Math.min(filtered.length - 1, a + 1));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setActive((a) => Math.max(0, a - 1));
        } else if (e.key === "Enter") {
          e.preventDefault();
          const item = filtered[active];
          if (item) run(item);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, filtered, active]);

  useEffect(() => {
    if (open) {
      setActive(0);
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const run = (item: Item) => {
    setOpen(false);
    if (item.kind === "route" && item.hint) {
      router.push(item.hint);
      return;
    }
    const id = item.id.replace(/^action:/, "");
    if (id === "copy-email") {
      navigator.clipboard
        ?.writeText(site.email)
        .then(() => {
          pushToast({
            id: "copy-email",
            title: "Email copied",
            description: site.email,
            variant: "success",
          });
          unlock("scribe");
        })
        .catch(() =>
          pushToast({
            id: "copy-email-fail",
            title: "Couldn't copy",
            description: "Browser blocked clipboard. Try selecting manually.",
            variant: "info",
          })
        );
    } else if (id === "toggle-grid") {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "G", shiftKey: true, metaKey: true }));
    } else if (id === "toggle-motion") {
      const next = document.body.classList.contains("calm-motion") ? "on" : "off";
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
      });
    } else if (id === "open-showreel") {
      window.dispatchEvent(new CustomEvent("delowar:open-showreel"));
    } else if (id === "konami") {
      window.dispatchEvent(new CustomEvent("delowar:shader-storm"));
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center px-4 pt-24 md:pt-32">
      <button
        aria-label="Close command palette"
        onClick={() => setOpen(false)}
        className="cmdk-mask absolute inset-0 cursor-default"
      />
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-warmwhite/15 bg-ink-900/95 shadow-2xl backdrop-blur">
        <div className="flex items-center gap-3 border-b border-warmwhite/10 px-5 py-4">
          <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/40">⌘K · /</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Jump to a route, copy email, toggle grid…"
            className="flex-1 bg-transparent font-serif text-xl text-warmwhite outline-none placeholder:text-warmwhite/30"
          />
        </div>
        <ul className="max-h-[55vh] overflow-y-auto py-2">
          {filtered.length === 0 && (
            <li className="px-5 py-3 font-sans text-[12px] uppercase tracking-widest text-warmwhite/40">
              No matches.
            </li>
          )}
          {filtered.map((it, i) => (
            <li key={it.id}>
              <button
                onMouseEnter={() => setActive(i)}
                onClick={() => run(it)}
                className={`flex w-full items-center justify-between px-5 py-2.5 text-left font-sans text-sm ${
                  active === i ? "bg-warmwhite/10 text-warmwhite" : "text-warmwhite/75"
                }`}
              >
                <span>{it.label}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-warmwhite/40">
                  {it.kind === "route" ? "ROUTE" : "ACTION"} · {it.hint}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-warmwhite/10 px-5 py-3 font-sans text-[10px] uppercase tracking-widest text-warmwhite/40">
          <span>↑/↓ navigate · ↵ select · esc close</span>
          <span>Delowar.dev · MMXXVI</span>
        </div>
      </div>
    </div>
  );
}
