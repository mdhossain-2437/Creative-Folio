"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollScrubTextProps {
  text: string;
  className?: string;
  as?: "div" | "span";
}

export function ScrollScrubText({
  text,
  className = "",
  as: Component = "div",
}: ScrollScrubTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const words = wordsRef.current;

    if (!container || words.length === 0) return;

    // GSAP animation with scroll scrubbing
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 75%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  // Split text into words and wrap each in a span
  const wordElements = text.split(" ").map((word, index) => (
    <span
      key={index}
      ref={(el) => {
        if (el) wordsRef.current[index] = el;
      }}
      className="inline-block"
    >
      {word}&nbsp;
    </span>
  ));

  const setContainerRef = (element: HTMLElement | null) => {
    containerRef.current = element;
  };

  if (Component === "span") {
    return (
      <span ref={setContainerRef} className={className}>
        {wordElements}
      </span>
    );
  }

  return (
    <div ref={setContainerRef} className={className}>
      {wordElements}
    </div>
  );
}
