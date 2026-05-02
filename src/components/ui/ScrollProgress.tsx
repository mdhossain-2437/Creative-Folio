"use client";

// A 1px page-wide scroll-progress indicator pinned to the very top of the
// viewport. Stays out of the way on long journal posts (which already render
// their own ReadingProgress at the same position) by checking for `#post-body`
// on mount and unmount-rerunning whenever the route changes.

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Defer to ReadingProgress on journal posts.
    const journalPost = Boolean(document.getElementById("post-body"));
    if (journalPost) {
      setShow(false);
      return;
    }
    setShow(true);
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const total = Math.max(1, doc.scrollHeight - window.innerHeight);
      const passed = Math.max(0, window.scrollY);
      const p = Math.max(0, Math.min(1, passed / total));
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  if (!show) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-[1px] bg-warmwhite/0"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-peach/70"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
