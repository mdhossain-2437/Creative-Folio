"use client";

import { useEffect, useState } from "react";

export type ToastVariant = "info" | "success" | "achievement";

export type ToastPayload = {
  id?: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
};

type Toast = Required<Omit<ToastPayload, "description" | "duration">> & {
  description?: string;
  duration: number;
};

// Global imperative API for places without React context (Console hook, custom
// events from non-component scripts, etc.). The component below also listens
// for `delowar:toast` CustomEvent.
declare global {
  interface Window {
    delowarToast?: (p: ToastPayload) => void;
  }
}

export function pushToast(p: ToastPayload) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<ToastPayload>("delowar:toast", { detail: p }));
}

const VARIANT_STYLES: Record<ToastVariant, string> = {
  info: "border-warmwhite/15 bg-ink-900/95 text-warmwhite",
  success: "border-electric/40 bg-ink-900/95 text-warmwhite",
  achievement:
    "border-peach/50 bg-gradient-to-br from-ink-900 via-ink-900 to-ink-800 text-warmwhite",
};

const VARIANT_LABEL: Record<ToastVariant, string> = {
  info: "◊ Note",
  success: "✓ Done",
  achievement: "★ Unlocked",
};

export function ToastHost() {
  const [items, setItems] = useState<Toast[]>([]);

  useEffect(() => {
    const onToast = (e: Event) => {
      const detail = (e as CustomEvent<ToastPayload>).detail;
      if (!detail || !detail.title) return;
      const id = detail.id ?? `t_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const variant: ToastVariant = detail.variant ?? "info";
      const duration = Math.max(1200, detail.duration ?? 3200);
      setItems((prev) => {
        // Dedupe by id (e.g. achievements with stable ids only fire once)
        if (prev.some((t) => t.id === id)) return prev;
        return [...prev, { id, title: detail.title, description: detail.description, variant, duration }];
      });
      window.setTimeout(() => {
        setItems((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    };
    window.addEventListener("delowar:toast", onToast as EventListener);
    window.delowarToast = (p) => onToast(new CustomEvent("delowar:toast", { detail: p }));
    return () => {
      window.removeEventListener("delowar:toast", onToast as EventListener);
      delete window.delowarToast;
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div
      aria-live="polite"
      role="status"
      className="pointer-events-none fixed bottom-6 right-6 z-[130] flex flex-col items-end gap-2"
    >
      {items.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto w-[min(320px,90vw)] overflow-hidden rounded-xl border px-4 py-3 shadow-2xl backdrop-blur transition-all duration-300 ${VARIANT_STYLES[t.variant]} animate-toast-in`}
        >
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
            {VARIANT_LABEL[t.variant]}
          </p>
          <p className="mt-1 font-serif text-base leading-tight text-warmwhite">
            {t.title}
          </p>
          {t.description && (
            <p className="mt-1 font-sans text-[11px] leading-relaxed text-warmwhite/60">
              {t.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
