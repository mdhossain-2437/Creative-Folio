import { ReactNode } from "react";

// Kinetic headline — skews with scroll velocity. Pure CSS now: the
// `.kinetic` class reads `--scroll-vy` (written by SmoothScrollProvider
// every tick) directly. No React state, no re-renders. The optional
// `intensity` prop is preserved as a per-element multiplier so existing
// callers keep working.
export function KineticHeadline({
  children,
  className,
  intensity = 1,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  return (
    <span
      className={`kinetic ${className ?? ""}`}
      style={
        intensity !== 1
          ? ({ ["--vy" as never]: `calc(var(--scroll-vy, 0) * ${intensity})` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </span>
  );
}
