"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

const labelFor = (pathname: string) => {
  const direct = site.nav.find((n) => n.href === pathname);
  if (direct) return direct.label;
  if (pathname === "/now") return "Now";
  if (pathname === "/showreel") return "Showreel";
  if (pathname === "/atlas") return "Atlas";
  if (pathname.startsWith("/works/")) return "Case Study";
  if (pathname.startsWith("/journal/")) return "Journal";
  if (pathname.startsWith("/lab/")) return "Lab Playground";
  if (pathname === "/awards") return "Recognition";
  if (pathname === "/archive") return "Archive";
  if (pathname === "/colophon") return "Colophon";
  if (pathname === "/legal/privacy") return "Privacy";
  if (pathname === "/legal/terms") return "Terms";
  return "Index";
};

export function RouteCurtain({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [target, setTarget] = useState<string | null>(null);
  const prev = useRef(pathname);

  useEffect(() => {
    if (prev.current !== pathname) {
      setTarget(pathname);
      const id = window.setTimeout(() => setTarget(null), 1200);
      prev.current = pathname;
      return () => window.clearTimeout(id);
    }
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={
            reduce ? false : { opacity: 0, y: 22, filter: "blur(8px)" }
          }
          animate={
            reduce
              ? { opacity: 1 }
              : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          exit={
            reduce ? undefined : { opacity: 0, y: -10, filter: "blur(6px)" }
          }
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
          }
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {target && !reduce && (
          <motion.div
            key={`curtain-${target}`}
            className="route-curtain"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="flex flex-col items-center gap-3 px-6 text-center">
              <span className="font-sans text-[10px] uppercase tracking-widest opacity-70">
                §{(site.nav.findIndex((n) => n.href === target) + 1 || 0).toString().padStart(2, "0")} · routing
              </span>
              <motion.span
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {labelFor(target)}
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
