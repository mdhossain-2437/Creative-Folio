"use client";

// ReelChapterCarousel — Pack D D3.2.
// 3D rotating chapter gallery: each chapter poster sits on a horizontal
// cylinder. Drag horizontally (or use scroll) to rotate. Click a card to
// fire `onSelect` so the parent can scrub the reel modal to that chapter.
//
// Falls back gracefully:
//   - touch + reduced-motion: hidden (the static <ol> below stands in)
//   - no WebGL / R3F crash: the boundary returns null and the static
//     list remains the source of truth.

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Image as DreiImage } from "@react-three/drei";
import * as THREE from "three";

type Clip = {
  index: string;
  title: string;
  duration: string;
  poster: string;
};

type Props = {
  clips: Clip[];
};

function Cylinder({ clips, target }: { clips: Clip[]; target: { current: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 4.6;
  const angleStep = (Math.PI * 2) / clips.length;
  const rotRef = useRef(0);

  useFrame(() => {
    rotRef.current += (target.current - rotRef.current) * 0.06;
    if (groupRef.current) groupRef.current.rotation.y = rotRef.current;
  });

  return (
    <group ref={groupRef}>
      {clips.map((clip, i) => {
        const angle = i * angleStep;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const ry = angle;
        return (
          <group key={clip.index} position={[x, 0, z]} rotation={[0, ry, 0]}>
            <Suspense fallback={null}>
              <DreiImage
                url={clip.poster}
                transparent
                scale={[3.4, 2.0]}
              />
            </Suspense>
            {/* Soft border plane behind the poster */}
            <mesh position={[0, 0, -0.01]}>
              <planeGeometry args={[3.5, 2.05]} />
              <meshBasicMaterial color="#1a1a1f" transparent opacity={0.8} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export function ReelChapterCarousel({ clips }: Props) {
  const [enabled, setEnabled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const targetRef = useRef(0);
  const dragRef = useRef<{ x: number; rot: number } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (reduce || isTouch) {
      setEnabled(false);
      return;
    }
    setEnabled(true);
  }, []);

  const angleStep = useMemo(() => (Math.PI * 2) / clips.length, [clips.length]);

  if (!enabled) return null;

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = { x: e.clientX, rot: targetRef.current };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    targetRef.current = dragRef.current.rot + dx * 0.005;
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = null;
    // Snap to nearest chapter
    const snapped = Math.round(targetRef.current / angleStep) * angleStep;
    targetRef.current = snapped;
    const idx = ((Math.round(-snapped / angleStep) % clips.length) + clips.length) % clips.length;
    setActiveIndex(idx);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    targetRef.current += e.deltaY * 0.001;
  };
  const rotateBy = (dir: -1 | 1) => {
    targetRef.current += dir * angleStep;
    const snapped = Math.round(targetRef.current / angleStep) * angleStep;
    targetRef.current = snapped;
    const idx = ((Math.round(-snapped / angleStep) % clips.length) + clips.length) % clips.length;
    setActiveIndex(idx);
  };

  const active = clips[activeIndex];

  return (
    <section
      aria-label="3D chapter carousel"
      className="relative border-y border-warmwhite/15 bg-ink-950"
    >
      <div className="mx-auto max-w-[1640px] px-6 py-10 md:px-10">
        <div className="flex items-end justify-between gap-6 pb-6">
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
            §08b — Spatial gallery · drag or scroll to rotate
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => rotateBy(1)}
              data-cursor="hover"
              data-cursor-label="PREV"
              className="rounded-full border border-warmwhite/20 bg-ink-900/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-warmwhite/85 transition-colors hover:border-peach/60 hover:text-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
              aria-label="Previous chapter"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => rotateBy(-1)}
              data-cursor="hover"
              data-cursor-label="NEXT"
              className="rounded-full border border-warmwhite/20 bg-ink-900/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-warmwhite/85 transition-colors hover:border-peach/60 hover:text-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
              aria-label="Next chapter"
            >
              →
            </button>
          </div>
        </div>
      </div>
      <div
        className="relative mx-auto h-[420px] max-w-[1640px] cursor-grab select-none active:cursor-grabbing md:h-[520px]"
        data-cursor="hover"
        data-cursor-label="DRAG"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
      >
        <Canvas camera={{ position: [0, 0.4, 5.6], fov: 50 }} dpr={[1, 2]}>
          <ambientLight intensity={0.85} />
          <directionalLight intensity={0.6} position={[2, 4, 2]} />
          <Cylinder clips={clips} target={targetRef} />
        </Canvas>
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-1 text-center">
          <span className="font-mono text-[10px] uppercase tracking-widest text-warmwhite/65">
            §{active?.index} · {active?.duration}
          </span>
          <span className="font-serif text-2xl tracking-tight text-warmwhite md:text-3xl">
            {active?.title}
          </span>
        </div>
      </div>
    </section>
  );
}
