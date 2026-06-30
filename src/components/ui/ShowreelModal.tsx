"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { reelClips } from "@/lib/data";

type OverlayReplayWindow = Window & {
  __delowarPendingOverlayReplay?: string;
};

function fmtTime(t: number): string {
  if (!Number.isFinite(t) || t < 0) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function ShowreelModal() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Open / Esc handling — also lock body scroll while modal is open.
  useEffect(() => {
    const onOpen = () => setOpen(true);
    const replayWindow = window as OverlayReplayWindow;
    if (replayWindow.__delowarPendingOverlayReplay === "delowar:open-showreel") {
      delete replayWindow.__delowarPendingOverlayReplay;
      onOpen();
    }
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === " ") {
        e.preventDefault();
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) v.play().catch(() => {});
        else v.pause();
      }
      if (e.key === "ArrowRight") {
        const v = videoRef.current;
        if (v) v.currentTime = Math.min((v.duration || 0) - 0.1, v.currentTime + 5);
      }
      if (e.key === "ArrowLeft") {
        const v = videoRef.current;
        if (v) v.currentTime = Math.max(0, v.currentTime - 5);
      }
      if (e.key === "m" || e.key === "M") {
        setMuted((m) => !m);
      }
    };
    const onSlowDown = (e: KeyboardEvent) => {
      const v = videoRef.current;
      if (!v) return;
      if (e.shiftKey) v.playbackRate = 0.5;
    };
    const onSlowUp = (e: KeyboardEvent) => {
      const v = videoRef.current;
      if (!v) return;
      if (!e.shiftKey) v.playbackRate = 1;
    };
    window.addEventListener("delowar:open-showreel", onOpen);
    window.addEventListener("keydown", onKey);
    window.addEventListener("keydown", onSlowDown);
    window.addEventListener("keyup", onSlowUp);
    return () => {
      window.removeEventListener("delowar:open-showreel", onOpen);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keydown", onSlowDown);
      window.removeEventListener("keyup", onSlowUp);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Mark <html> with the open modal so a global CSS rule can hide
    // floating overlays (ShowreelPill, AtmosphereMode, ScrollToTop)
    // while the modal is up. Cursor stays visible (it's at z-[200]).
    const set = (document.documentElement.dataset.modalOpen ?? "")
      .split(/\s+/)
      .filter(Boolean);
    set.push("showreel");
    document.documentElement.dataset.modalOpen = set.join(" ");
    return () => {
      document.body.style.overflow = prev;
      const left = (document.documentElement.dataset.modalOpen ?? "")
        .split(/\s+/)
        .filter(Boolean)
        .filter((m) => m !== "showreel");
      if (left.length === 0) delete document.documentElement.dataset.modalOpen;
      else document.documentElement.dataset.modalOpen = left.join(" ");
    };
  }, [open]);

  // When the active chapter changes, reload + autoplay the new src.
  useEffect(() => {
    if (!open) return;
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => setPlaying(false));
  }, [active, open]);

  // Auto-advance to the next chapter when the current one ends.
  const onEnded = () => {
    setActive((i) => (i + 1) % reelClips.length);
  };

  if (!open) return null;

  const clip = reelClips[active] ?? reelClips[0];
  const progress = duration > 0 ? Math.min(1, time / duration) : 0;

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const pct = parseFloat(e.target.value);
    v.currentTime = pct * duration;
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="showreel-title"
    >
      <button
        aria-label="Close showreel"
        onClick={() => setOpen(false)}
        className="absolute inset-0 cursor-default bg-ink-950/85 backdrop-blur"
      />
      <div className="relative z-10 grid h-[92vh] w-full max-w-[1280px] grid-rows-[auto,1fr,auto] overflow-hidden rounded-3xl border border-warmwhite/15 bg-ink-900 shadow-2xl">
        <header className="flex items-center justify-between gap-4 border-b border-warmwhite/12 px-6 py-4 md:px-8">
          <p
            id="showreel-title"
            className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/75"
          >
            Reel · 02:17 · Selected works 2026–2027 · MMXXVII
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              data-cursor="hover"
              data-cursor-label={muted ? "UNMUTE" : "MUTE"}
              aria-label={muted ? "Unmute showreel" : "Mute showreel"}
              className="rounded-full border border-warmwhite/25 px-3 py-1.5 font-sans text-[10px] uppercase tracking-widest text-warmwhite/85 hover:border-warmwhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
            >
              {muted ? "Muted" : "Sound"}
            </button>
            <button
              onClick={() => setOpen(false)}
              data-cursor="hover"
              data-cursor-label="CLOSE"
              className="rounded-full border border-warmwhite/30 px-4 py-1.5 font-sans text-[10px] uppercase tracking-widest text-warmwhite hover:border-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
            >
              Close ✕
            </button>
          </div>
        </header>

        {/* Body: real video on the left, chapter selector on the right. */}
        <div className="relative grid min-h-0 grid-cols-1 gap-0 md:grid-cols-12">
          <div className="relative col-span-12 overflow-hidden bg-ink-950 md:col-span-8">
            {/* Poster fallback below the video */}
            <Image
              src={clip.poster}
              alt={`${clip.title} poster frame`}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover opacity-40"
              priority={false}
            />
            <video
              ref={videoRef}
              key={clip.videoSrc}
              src={clip.videoSrc}
              poster={clip.poster}
              autoPlay
              muted={muted}
              playsInline
              loop={false}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
              onEnded={onEnded}
              className="absolute inset-0 h-full w-full bg-black object-cover"
            />
            {/* Subtle scanline overlay for that editorial reel feel */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "repeating-linear-gradient(180deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 3px)",
              }}
            />
            {/* Big centered play / pause button */}
            <button
              type="button"
              onClick={togglePlay}
              data-cursor="view"
              data-cursor-label={playing ? "PAUSE" : "PLAY"}
              aria-label={playing ? "Pause" : "Play"}
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                playing ? "opacity-0 hover:opacity-100" : "opacity-100"
              }`}
            >
              <span className="grid h-20 w-20 place-items-center rounded-full bg-warmwhite text-ink-900 shadow-2xl">
                {playing ? (
                  <span className="flex gap-1.5">
                    <span className="block h-5 w-1.5 rounded-sm bg-ink-900" />
                    <span className="block h-5 w-1.5 rounded-sm bg-ink-900" />
                  </span>
                ) : (
                  <span className="block h-0 w-0 border-y-[10px] border-l-[14px] border-y-transparent border-l-ink-900" />
                )}
              </span>
            </button>
            {/* HUD: chapter index + topic */}
            <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-ink-950/65 px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-warmwhite/85 backdrop-blur">
              <span className="display-num text-peach">§{clip.index}</span>
              <span aria-hidden className="text-warmwhite/35">·</span>
              <span>{clip.topic}</span>
              <span aria-hidden className="text-warmwhite/35">·</span>
              <span className="display-num">{clip.duration}</span>
            </div>
            {/* Time HUD */}
            <div className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-ink-950/65 px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-warmwhite/85 backdrop-blur">
              <span className="display-num">{fmtTime(time)}</span>
              <span aria-hidden className="text-warmwhite/35">/</span>
              <span className="display-num text-warmwhite/65">{fmtTime(duration)}</span>
            </div>
            {/* Bottom progress bar */}
            <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-4">
              <input
                aria-label="Scrub showreel timeline"
                type="range"
                min={0}
                max={1}
                step={0.001}
                value={progress}
                onChange={onSeek}
                className="reel-scrub h-1.5 w-full cursor-pointer appearance-none rounded-full"
                style={{
                  background: `linear-gradient(to right, #e3bfb4 0%, #e3bfb4 ${
                    progress * 100
                  }%, rgba(239,236,233,0.18) ${progress * 100}%, rgba(239,236,233,0.18) 100%)`,
                }}
              />
            </div>
          </div>

          <div className="col-span-12 overflow-y-auto border-t border-warmwhite/15 bg-ink-900 p-6 md:col-span-4 md:border-l md:border-t-0">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/60">
              Now playing
            </p>
            <h3
              className="mt-3 font-serif text-[clamp(1.6rem,2.2vw,2.4rem)] leading-[0.96] tracking-tightest text-warmwhite"
            >
              {clip.title}
            </h3>
            <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-warmwhite/80">
              {clip.body}
            </p>

            <p className="mt-7 font-sans text-[10px] uppercase tracking-widest text-warmwhite/60">
              Chapters
            </p>
            <ul className="mt-3 space-y-2">
              {reelClips.map((c, i) => (
                <li key={c.index}>
                  <button
                    onClick={() => setActive(i)}
                    data-cursor="hover"
                    data-cursor-label={c.duration}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left font-sans text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach ${
                      active === i
                        ? "border-peach/70 bg-peach/15 text-warmwhite"
                        : "border-warmwhite/15 text-warmwhite/85 hover:border-warmwhite/40"
                    }`}
                    aria-current={active === i ? "true" : undefined}
                  >
                    <span className="flex items-center gap-3">
                      <span className="display-num text-[10px] uppercase tracking-widest text-warmwhite/55">
                        §{c.index}
                      </span>
                      <span className="line-clamp-2">{c.title}</span>
                    </span>
                    <span className="display-num text-[10px] uppercase tracking-widest text-warmwhite/65">
                      {c.topic} · {c.duration}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-warmwhite/12 px-6 py-4 font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 md:px-8">
          <span>Autoplays muted · click a chapter to scrub · {site_label()}</span>
          <span>
            <kbd className="rounded border border-warmwhite/25 bg-ink-950/60 px-1.5 py-0.5">Space</kbd>{" "}
            play/pause ·{" "}
            <kbd className="rounded border border-warmwhite/25 bg-ink-950/60 px-1.5 py-0.5">←/→</kbd>{" "}
            5s ·{" "}
            <kbd className="rounded border border-warmwhite/25 bg-ink-950/60 px-1.5 py-0.5">M</kbd>{" "}
            mute ·{" "}
            <kbd className="rounded border border-warmwhite/25 bg-ink-950/60 px-1.5 py-0.5">Shift</kbd>{" "}
            slow ·{" "}
            <kbd className="rounded border border-warmwhite/25 bg-ink-950/60 px-1.5 py-0.5">Esc</kbd>{" "}
            close
          </span>
        </footer>
      </div>
    </div>
  );
}

function site_label() {
  return "2027.delowarhossain.dev · MMXXVII";
}
