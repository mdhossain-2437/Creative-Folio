"use client";

import { ReactNode } from "react";
import { useScrollState } from "@/components/providers/SmoothScrollProvider";

export function KineticHeadline({
  children,
  className,
  intensity = 1,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const { velocity } = useScrollState();
  const skew = Math.max(-4, Math.min(4, velocity * intensity));
  return (
    <span
      className={`kinetic ${className ?? ""}`}
      style={{ ["--vy" as never]: skew.toFixed(3) }}
    >
      {children}
    </span>
  );
}
