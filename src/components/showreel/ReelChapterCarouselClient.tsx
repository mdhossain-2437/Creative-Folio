"use client";

// Client wrapper for the WebGL carousel. Server pages can't pass
// `ssr: false` to next/dynamic — so this thin client component does the
// dynamic import on its behalf.

import dynamic from "next/dynamic";

const ReelChapterCarousel = dynamic(
  () => import("./ReelChapterCarousel").then((m) => m.ReelChapterCarousel),
  { ssr: false }
);

type Clip = {
  index: string;
  title: string;
  duration: string;
  poster: string;
};

export function ReelChapterCarouselClient({ clips }: { clips: Clip[] }) {
  return <ReelChapterCarousel clips={clips} />;
}
