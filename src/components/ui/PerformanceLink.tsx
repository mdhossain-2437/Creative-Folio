import NextLink from "next/link";
import type { ComponentProps } from "react";

type PerformanceLinkProps = ComponentProps<typeof NextLink>;

export default function PerformanceLink({
  prefetch = false,
  ...props
}: PerformanceLinkProps) {
  return <NextLink prefetch={prefetch} {...props} />;
}
