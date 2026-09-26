"use client";

import { useEffect, useRef, useState } from "react";
import { process as processPhases, type Phase } from "@/lib/data";

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const last = processPhases.length - 1;

  const go = (idx: number) => setActive(Math.max(0, Math.min(last, idx)));

  // Left / right arrow keys step the carousel while the section is in view.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const inView = r.top < window.innerHeight && r.bottom > 0;
      if (!inView) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActive((a) => Math.min(last, a + 1));
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [last]);

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-warmwhite/15 bg-ink-900 py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1640px] px-6 md:px-10">
        <header className="max-w-4xl">
          <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-tightest">
            Concept <span className="italic text-warmwhite/90">to</span> Shader.
          </h2>
        </header>

        {/* Jump-to-phase navigation */}
        <nav
          aria-label="Process workflows"
          className="mt-12 flex flex-wrap items-center gap-2"
        >
          {processPhases.map((p, i) => (
            <button
              key={p.phase}
              type="button"
              onClick={() => go(i)}
              data-cursor="hover"
              data-cursor-label={`STEP ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              className={`rounded-full border px-4 py-2 font-mono text-xs tracking-normal transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach ${
                i === active
                  ? "border-peach/70 bg-peach/15 font-medium text-warmwhite"
                  : "border-warmwhite/20 text-warmwhite/75 hover:border-warmwhite/45 hover:text-warmwhite"
              }`}
            >
              {p.phase} · {p.title}
            </button>
          ))}
        </nav>

        {/* Carousel viewport */}
        <div className="relative mt-10 overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {processPhases.map((p, i) => (
              <article
                key={p.phase}
                className="relative flex w-full shrink-0 flex-col gap-6 px-1"
                aria-current={i === active ? "true" : undefined}
                aria-hidden={i === active ? undefined : true}
              >
                <div className="relative z-10 w-full">
                  <PhasePanel phase={p} index={i} />
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Controls — prev / next arrows + progress rail + readout */}
        <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(active - 1)}
              disabled={active === 0}
              data-cursor="hover"
              aria-label="Previous workflow phase"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-warmwhite/20 font-sans text-sm text-warmwhite/85 transition-colors hover:border-warmwhite/45 hover:text-warmwhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach disabled:cursor-not-allowed disabled:opacity-30"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              disabled={active === last}
              data-cursor="hover"
              aria-label="Next workflow phase"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-warmwhite/20 font-sans text-sm text-warmwhite/85 transition-colors hover:border-warmwhite/45 hover:text-warmwhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach disabled:cursor-not-allowed disabled:opacity-30"
            >
              →
            </button>
          </div>

          <div className="flex-1">
            <div
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={processPhases.length}
              aria-valuenow={active + 1}
              aria-label="Workflow progress"
              className="flex items-center gap-2"
            >
              {processPhases.map((p, i) => (
                <div
                  key={p.phase}
                  className={`h-px flex-1 transition-colors duration-500 ${
                    i <= active ? "bg-peach" : "bg-warmwhite/20"
                  }`}
                />
              ))}
            </div>
            <p className="mt-3 font-mono text-xs tracking-normal text-warmwhite/85">
              {processPhases[active]?.phase} · {processPhases[active]?.title} ·{" "}
              {processPhases[active]?.duration} ·{" "}
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(processPhases.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhasePanel({
  phase,
  index,
}: {
  phase: Phase;
  index: number;
}) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Left Column: Workflow Details & Deliverables */}
      <div className="flex flex-col gap-6 lg:col-span-7">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-xs font-medium tracking-normal text-peach">
            {phase.phase}
          </span>
          <span className="font-mono text-xs tracking-normal text-warmwhite/85">
            {phase.duration}
          </span>
        </div>

        <h3 className="font-serif text-[clamp(2.2rem,4.5vw,4.2rem)] leading-[0.96] tracking-tightest text-warmwhite">
          {phase.title}
        </h3>

        <p className="font-sans text-base leading-relaxed text-warmwhite/90 md:text-lg">
          {phase.summary}
        </p>

        {/* Concrete Workflow Modules — No generic numbered 1-2-3 counters */}
        <div className="mt-2 flex flex-col gap-3">
          <p className="font-mono text-xs tracking-normal text-warmwhite/85">
            Workflow Implementation &amp; Deliverables
          </p>
          <div className="grid grid-cols-1 gap-2.5">
            {phase.steps.map((step) => {
              const [heading, ...rest] = step.split(" — ");
              const body = rest.join(" — ");
              return (
                <div
                  key={step}
                  className="flex items-start gap-3 rounded-lg border border-warmwhite/10 bg-ink-950/40 p-3.5"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-peach" />
                  <div className="flex flex-col gap-0.5">
                    {body ? (
                      <>
                        <span className="font-sans text-xs font-semibold text-warmwhite">
                          {heading}
                        </span>
                        <span className="font-sans text-xs leading-relaxed text-warmwhite/90">
                          {body}
                        </span>
                      </>
                    ) : (
                      <span className="font-sans text-xs leading-relaxed text-warmwhite/90">
                        {step}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Deliverables & Stack */}
        <div className="mt-2 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="font-mono text-xs tracking-normal text-warmwhite/85">
              Deliverables
            </p>
            <ul className="mt-2 space-y-1.5 font-sans text-xs text-warmwhite/90">
              {phase.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <span className="text-peach">✓</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs tracking-normal text-warmwhite/85">
              Tools &amp; Stack
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {phase.tools.map((t) => (
                <li
                  key={t}
                  className="inline-flex h-6 items-center rounded-full border border-warmwhite/15 bg-ink-950/50 px-2.5 font-mono text-[11px] tracking-normal text-warmwhite/85"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Right Column: Visual Artifact Preview Box */}
      <div className="lg:col-span-5">
        <VisualArtifactPanel type={phase.artifactType || "tokens"} index={index} />
      </div>

      <p className="sr-only">Phase {index + 1} of {processPhases.length}</p>
    </div>
  );
}

function VisualArtifactPanel({
  type,
  index,
}: {
  type: "tokens" | "shader" | "raf" | "audit";
  index: number;
}) {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-warmwhite/15 bg-ink-950/80 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-warmwhite/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-peach" />
          <span className="font-mono text-xs font-medium tracking-normal text-warmwhite/90">
            {type === "tokens" && "Artifact: Token & Contrast Matrix"}
            {type === "shader" && "Artifact: GLSL Fragment Pipeline"}
            {type === "raf" && "Artifact: rAF Synchronization Loop"}
            {type === "audit" && "Artifact: Production Verification Gate"}
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-normal text-warmwhite/80">
          SYS-{String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="my-6">
        {type === "tokens" && (
          <div className="space-y-4 font-mono text-xs">
            <div className="rounded-lg border border-warmwhite/10 bg-ink-900 p-3">
              <p className="text-[11px] text-warmwhite/80">{"// tailwind.config.ts tokens"}</p>
              <div className="mt-2 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-peach">bg-ink-950:</span>
                  <span className="text-warmwhite/90">#080808 (L=0.03)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-peach">text-warmwhite:</span>
                  <span className="text-warmwhite/90">#f5f4f0 (L=0.96)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-peach">accent-peach:</span>
                  <span className="text-warmwhite/90">#e3bfb4 (L=0.78)</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-warmwhite/10 bg-ink-900 p-3">
              <span className="text-warmwhite/85">Contrast Ratio</span>
              <span className="rounded bg-peach/20 px-2 py-0.5 font-bold text-peach">
                18.2:1 (Passes AAA)
              </span>
            </div>
          </div>
        )}

        {type === "shader" && (
          <div className="rounded-lg border border-warmwhite/10 bg-ink-900 p-3.5 font-mono text-xs">
            <p className="text-[11px] text-warmwhite/80">{"// HeroShader.frag"}</p>
            <pre className="mt-2 overflow-x-auto text-[11px] leading-relaxed text-warmwhite/90">
              <code>{`precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float n = fbm(uv * 3.0 + u_time * 0.05);
  gl_FragColor = vec4(vec3(n * 0.85), 1.0);
}`}</code>
            </pre>
            <div className="mt-3 flex flex-wrap gap-2 border-t border-warmwhite/10 pt-2.5 text-[10px]">
              <span className="rounded bg-warmwhite/10 px-1.5 py-0.5 text-warmwhite/85">DPR Cap: 1.75</span>
              <span className="rounded bg-warmwhite/10 px-1.5 py-0.5 text-warmwhite/85">IO Threshold: 0.01</span>
            </div>
          </div>
        )}

        {type === "raf" && (
          <div className="space-y-3 font-mono text-xs">
            <div className="rounded-lg border border-warmwhite/10 bg-ink-900 p-3">
              <p className="text-[11px] text-warmwhite/80">{"// Deterministic execution pipeline"}</p>
              <div className="mt-2 space-y-1 text-[11px]">
                <p className="text-warmwhite/90">1. Lenis.on(&apos;scroll&apos;) → write CSS vars</p>
                <p className="text-warmwhite/90">2. rafBus.tick(now, dt) → priority order</p>
                <p className="text-warmwhite/90">3. damp(cur, tgt, k=7.67, dt) → 120Hz</p>
                <p className="text-warmwhite/90">4. canvas.render() → 0-frame lag</p>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-warmwhite/10 bg-ink-900 p-3">
              <span className="text-warmwhite/85">Frame Budget</span>
              <span className="font-bold text-peach">8.33ms (120fps cap)</span>
            </div>
          </div>
        )}

        {type === "audit" && (
          <div className="space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between rounded-lg border border-warmwhite/10 bg-ink-900 p-3">
              <span className="text-warmwhite/85">Lighthouse Score</span>
              <span className="font-bold text-peach">100 / 100</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-warmwhite/10 bg-ink-900 p-3">
              <span className="text-warmwhite/85">Security Headers</span>
              <span className="font-bold text-peach">Grade A (Strict CSP)</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-warmwhite/10 bg-ink-900 p-3">
              <span className="text-warmwhite/85">Cumulative Layout Shift</span>
              <span className="font-bold text-peach">0.00 (Zero JANK)</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-warmwhite/10 bg-ink-900 p-3">
              <span className="text-warmwhite/85">Interaction to Next Paint</span>
              <span className="font-bold text-peach">&lt; 50ms (Optimal)</span>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-warmwhite/10 pt-3">
        <p className="font-mono text-[10px] text-warmwhite/80">
          Source: Verified from production engineering architecture
        </p>
      </div>
    </div>
  );
}
