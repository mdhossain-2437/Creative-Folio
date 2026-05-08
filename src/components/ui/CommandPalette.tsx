"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/lib/site";
import { applyMotion } from "@/components/ui/MotionToggle";
import { pushToast } from "@/components/ui/Toast";
import { unlock } from "@/lib/achievements";
import { journal, experiments } from "@/lib/data";

type Item = {
  id: string;
  label: string;
  hint?: string;
  kind: "route" | "action" | "journal" | "lab";
  haystack?: string;
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
      { id: "route:/uses", label: "Uses", hint: "/uses", kind: "route" },
      { id: "route:/changelog", label: "Changelog", hint: "/changelog", kind: "route" },
      { id: "route:/colors", label: "Colors", hint: "/colors", kind: "route" },
    ];
    const actions: Item[] = site.commandActions.map((a) => ({
      id: `action:${a.id}`,
      label: a.label,
      hint: a.hint,
      kind: "action",
    }));
    const posts: Item[] = journal.map((p) => ({
      id: `journal:${p.slug}`,
      label: p.title,
      hint: `/journal/${p.slug}`,
      kind: "journal",
      haystack: `${p.title} ${p.category} ${p.excerpt}`.toLowerCase(),
    }));
    const labs: Item[] = experiments.map((e) => ({
      id: `lab:${e.slug}`,
      label: e.title,
      hint: `/lab/${e.slug}`,
      kind: "lab",
      haystack: `${e.title} ${e.category} ${e.summary}`.toLowerCase(),
    }));
    return [...routes, ...extras, ...actions, ...posts, ...labs];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.filter((it) => it.kind === "route" || it.kind === "action");
    return items.filter(
      (it) =>
        it.label.toLowerCase().includes(q) ||
        (it.hint ?? "").toLowerCase().includes(q) ||
        (it.haystack ?? "").includes(q)
    );
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

  // Mark <html> with the open palette so a global CSS rule can hide
  // floating overlays underneath the cmdk mask while the palette is up.
  useEffect(() => {
    if (!open) return;
    const set = (document.documentElement.dataset.modalOpen ?? "")
      .split(/\s+/)
      .filter(Boolean);
    set.push("cmdk");
    document.documentElement.dataset.modalOpen = set.join(" ");
    return () => {
      const left = (document.documentElement.dataset.modalOpen ?? "")
        .split(/\s+/)
        .filter(Boolean)
        .filter((m) => m !== "cmdk");
      if (left.length === 0) delete document.documentElement.dataset.modalOpen;
      else document.documentElement.dataset.modalOpen = left.join(" ");
    };
  }, [open]);

  const run = (item: Item) => {
    setOpen(false);
    if ((item.kind === "route" || item.kind === "journal" || item.kind === "lab") && item.hint) {
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
    } else if (id === "download-resume") {
      const a = document.createElement("a");
      a.href = "/resume.pdf";
      a.download = "Md-Delowar-Hossain-Resume.pdf";
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
      pushToast({
        id: "resume-download",
        title: "Resume queued",
        description: "Md-Delowar-Hossain-Resume.pdf",
        variant: "success",
      });
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
        <div className="flex items-center gap-3 border-b border-warmwhite/15 px-5 py-4">
          <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">⌘K · /</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Jump anywhere, search posts &amp; experiments, copy email…"
            className="flex-1 bg-transparent font-serif text-xl text-warmwhite outline-none placeholder:text-warmwhite/30"
          />
        </div>
        <ul className="max-h-[55vh] overflow-y-auto py-2">
          {filtered.length === 0 && (
            <li className="px-5 py-3 font-sans text-[12px] uppercase tracking-widest text-warmwhite/65">
              No matches.
            </li>
          )}
          {filtered.map((it, i) => (
            <li key={it.id}>
              <button
                onMouseEnter={() => setActive(i)}
                onClick={() => run(it)}
                className={`flex w-full items-center justify-between px-5 py-2.5 text-left font-sans text-sm ${
                  active === i ? "bg-warmwhite/15 text-warmwhite" : "text-warmwhite/75"
                }`}
              >
                <span>{it.label}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-warmwhite/65">
                  {it.kind.toUpperCase()} · {it.hint}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-warmwhite/15 px-5 py-3 font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
          <span>↑/↓ navigate · ↵ select · esc close</span>
          <span>delowarhossain.dev · MMXXVII</span>
        </div>
      </div>
    </div>
  );
}
