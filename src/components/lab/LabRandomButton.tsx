"use client";

import { useRouter } from "next/navigation";
import { pushToast } from "@/components/ui/Toast";

export function LabRandomButton({ slugs }: { slugs: string[] }) {
  const router = useRouter();
  if (slugs.length === 0) return null;

  const onClick = () => {
    if (slugs.length === 1) {
      router.push(`/lab/${slugs[0]}`);
      return;
    }
    let next = slugs[Math.floor(Math.random() * slugs.length)];
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const last = path.split("/").pop();
      let safety = 6;
      while (next === last && safety-- > 0) {
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
  };

  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor="hover"
      data-cursor-label="LUCKY"
      className="group inline-flex items-center gap-2 rounded-full border border-warmwhite/20 bg-ink-900 px-4 py-2 font-sans text-[10px] uppercase tracking-widest text-warmwhite/70 transition-all hover:border-peach/60 hover:text-warmwhite"
    >
      <span
        aria-hidden
        className="inline-block h-2 w-2 rotate-45 bg-electric transition-transform group-hover:rotate-[225deg]"
      />
      Random experiment
      <span className="font-mono text-[9px] text-warmwhite/45">R</span>
    </button>
  );
}
