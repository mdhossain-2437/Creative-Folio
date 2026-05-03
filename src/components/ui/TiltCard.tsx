"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Max tilt angle in degrees. Default 6. */
  max?: number;
  /** Optional className applied to the wrapper. */
  className?: string;
  /** Render as a different element (default 'div'). */
  as?: "div" | "li" | "article" | "section";
  /** Disable scaling on hover (keeps just the tilt). */
  noScale?: boolean;
};

/**
 * TiltCard — perspective transform that tilts toward the cursor while
 * hovered. Uses CSS variables so the spring is GPU-friendly and the
 * children can opt-in to highlight effects via `--tilt-mx` / `--tilt-my`.
 *
 * Disabled on touch + reduced-motion. Always renders the children.
 */
export function TiltCard({
  children,
  max = 6,
  className,
  as: Tag = "div",
  noScale = false,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const node = ref.current;
    if (!node) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !fine) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const apply = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      const rx = (cy * max).toFixed(2);
      const ry = (-cx * max).toFixed(2);
      const scale = noScale ? 1 : 1.012;
      node.style.setProperty("--tilt-mx", `${(tx + 1) * 50}%`);
      node.style.setProperty("--tilt-my", `${(ty + 1) * 50}%`);
      node.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
      raf = requestAnimationFrame(apply);
    };

    const onMove = (e: MouseEvent) => {
      const r = node.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    };

    const onEnter = () => {
      raf = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      cancelAnimationFrame(raf);
      tx = 0;
      ty = 0;
      cx = 0;
      cy = 0;
      node.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
      node.style.setProperty("--tilt-mx", `50%`);
      node.style.setProperty("--tilt-my", `50%`);
    };

    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseenter", onEnter);
    node.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseenter", onEnter);
      node.removeEventListener("mouseleave", onLeave);
    };
  }, [max, noScale]);

  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref as never}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        transition:
          "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform",
      }}
    >
      {children}
    </Comp>
  );
}
