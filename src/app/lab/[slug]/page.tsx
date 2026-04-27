import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { LabDemo } from "@/components/lab/LabDemo";
import { experiments } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return experiments.map((e) => ({ slug: e.slug }));
}

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exp = experiments.find((e) => e.slug === slug);
  if (!exp) return { title: "Lab — Playground" };
  return {
    title: `${exp.title} — Lab Playground`,
    description: exp.summary,
  };
}

const NOTES: Record<string, { brief: string; controls: { label: string; value: string }[]; readme: string[] }> = {
  "fluid-dynamics": {
    brief:
      "An advection-only Navier–Stokes pass running on a single fragment shader. The cursor seeds vortices into the velocity field; the field samples the same texture again to displace itself.",
    controls: [
      { label: "viscosity", value: "0.018" },
      { label: "advection step", value: "0.36" },
      { label: "vortex strength", value: "1.4" },
      { label: "decay", value: "0.985" },
    ],
    readme: [
      "Fluid sims are usually multi-pass. This one is single-pass — at 60fps that&apos;s a tradeoff worth taking on the web.",
      "Cursor velocity is integrated over 8 frames so single mouse jitters don&apos;t spawn ugly vortices.",
      "Falls back to a static gradient on Swiftshader (yes, the Devin VM).",
    ],
  },
  "volumetric-lighting": {
    brief:
      "Raymarching through a procedural fog volume. Light shafts come from a single moving sun; soft shadows are sampled along the ray.",
    controls: [
      { label: "step count", value: "48" },
      { label: "fog density", value: "0.62" },
      { label: "scattering", value: "0.4" },
      { label: "sun azimuth", value: "112°" },
    ],
    readme: [
      "Step count drops to 24 on lower-end devices via a perf budget detector.",
      "Use ←/→ to rotate the sun. Hold ⇧ to slow time.",
    ],
  },
  "particle-systems": {
    brief:
      "GPGPU particle field with curl-noise advection. Position + velocity stored in two float textures, ping-ponged each frame.",
    controls: [
      { label: "particles", value: "1,572,864" },
      { label: "curl scale", value: "1.85" },
      { label: "trail decay", value: "0.92" },
      { label: "size", value: "1.6 px" },
    ],
    readme: [
      "Click to release a burst of 32k particles at the cursor — they get added to the simulation, not duplicated.",
      "The motion field is curl noise sampled at three octaves; the cursor adds a temporary vortex.",
    ],
  },
  "variable-font-scroll": {
    brief:
      "Scroll velocity drives the wght / wdth / slnt axes of a variable display face. The body of the page becomes the type animator.",
    controls: [
      { label: "wght range", value: "300 → 800" },
      { label: "slnt range", value: "0 → -12°" },
      { label: "smoothing", value: "180ms" },
      { label: "axis lock", value: "auto" },
    ],
    readme: [
      "The CSS uses font-variation-settings on the html element, so all type inherits the change.",
      "Scrolling fast = bold + slanted. Stopping = back to a calm regular.",
    ],
  },
  "magnetic-cursor": {
    brief:
      "A vector field warps the cursor trail into local minima of an SDF. Magnetic, but expressive — the cursor still resists.",
    controls: [
      { label: "field strength", value: "0.62" },
      { label: "release", value: "240ms" },
      { label: "max attraction", value: "120px" },
      { label: "trail length", value: "8" },
    ],
    readme: [
      "Each magnetic surface declares its own SDF via a data-magnet attribute.",
      "The cursor doesn&apos;t snap — it&apos;s pulled with a spring whose tension scales with proximity.",
    ],
  },
  "fft-material": {
    brief:
      "FFT bins of a Web Audio source feed three uniforms: roughness, emissive color, and displacement. The material breathes with the music.",
    controls: [
      { label: "bin count", value: "256" },
      { label: "smoothing", value: "0.85" },
      { label: "displacement gain", value: "0.18" },
      { label: "color tilt", value: "+12°" },
    ],
    readme: [
      "Click play to start the demo audio. The material wakes up the moment audio is decoded.",
      "Used in the Void Engine project to drive volumetric lighting in real-time.",
    ],
  },
  "shader-storm": {
    brief:
      "A composable post-processing chain: RGB shift, scanlines, hue cycling, chromatic abberation. Each block is a single fragment pass with a uniform schedule.",
    controls: [
      { label: "chain length", value: "4 passes" },
      { label: "rgb offset", value: "0.6 px" },
      { label: "hue speed", value: "12°/s" },
      { label: "scanline gap", value: "3 px" },
    ],
    readme: [
      "Triggered by the Konami code site-wide. Auto-disengages after 6 seconds.",
      "Use this as a celebration moment, not a permanent state — too much and it stops being delightful.",
    ],
  },
  "signed-distance-letters": {
    brief:
      "Glyphs rendered from an SDF atlas — stays crisp at any size, lights up beautifully under postprocessing.",
    controls: [
      { label: "atlas size", value: "1024²" },
      { label: "glyph budget", value: "192" },
      { label: "smoothing", value: "0.06" },
      { label: "outline", value: "0.45" },
    ],
    readme: [
      "Type renders six times faster than canvas-based glyph caches at large sizes.",
      "The kerning UI is a hidden tool: click the title to summon it.",
    ],
  },
  "latency-canvas": {
    brief:
      "Each dot is one frame of input → pixel latency. Color encodes jank: green = good, red = a missed frame.",
    controls: [
      { label: "sample rate", value: "60Hz" },
      { label: "window", value: "12s" },
      { label: "target", value: "16.6ms" },
      { label: "threshold", value: "33ms" },
    ],
    readme: [
      "Useful for hunting down the source of jank in motion-heavy pages.",
      "Hold ⇧ to overlay GPU memory; hold ⌥ to overlay heap size (Chrome only).",
    ],
  },
};

export default async function LabSlug({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const exp = experiments.find((e) => e.slug === slug);
  if (!exp) return notFound();
  const note = NOTES[exp.slug];
  const idx = experiments.findIndex((e) => e.slug === exp.slug);

  return (
    <>
      <PageHero
        eyebrow={`§02.${exp.index} — Lab Playground`}
        title={exp.title.split(" ")[0]}
        italic={exp.title.split(" ").slice(1).join(" ") || "."}
        description={exp.summary}
        meta={[
          { label: "Tech", value: exp.meta },
          { label: "Status", value: "Live" },
          { label: "Renderer", value: "WebGL2 / fallback" },
          { label: "Updated", value: "MMXXVI" },
        ]}
      />

      <section className="bg-ink-950 py-12 md:py-20">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-warmwhite/10 bg-ink-900">
            <LabDemo slug={exp.slug} seed={(idx + 1) * 4.2} />
            <div className="pointer-events-none absolute inset-0 vignette" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 grid-lines opacity-25" />
            <div className="pointer-events-none absolute left-6 top-6 flex items-center gap-3 font-sans text-[10px] uppercase tracking-widest text-warmwhite/60">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-electric" />
              Live · move the cursor
            </div>
            <div className="absolute bottom-6 right-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-warmwhite/55">
              <span>{exp.meta}</span>
              <span aria-hidden>·</span>
              <span>60 fps target</span>
            </div>
          </div>
        </div>
      </section>

      {note && (
        <section className="bg-ink-900 py-24 md:py-32">
          <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
            <div className="md:col-span-5">
              <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/45">
                ◊ Brief
              </p>
              <p className="mt-6 font-serif text-[clamp(1.4rem,2.4vw,2.4rem)] leading-[1.18] tracking-tight text-warmwhite/90">
                {note.brief}
              </p>
              <ul className="mt-10 space-y-3 border-t border-warmwhite/10 pt-6">
                {note.controls.map((c) => (
                  <li
                    key={c.label}
                    className="flex items-center justify-between font-mono text-[12px] uppercase tracking-widest text-warmwhite/65"
                  >
                    <span>{c.label}</span>
                    <span className="text-peach">{c.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-7">
              <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/45">
                §README
              </p>
              <ol className="mt-6 space-y-6 border-t border-warmwhite/10 pt-6 font-serif text-lg leading-relaxed text-warmwhite/75 md:text-xl">
                {note.readme.map((line, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-warmwhite/40 pt-1">
                      §0{i + 1}
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: line }} />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-warmwhite/10 bg-ink-950 py-16 md:py-24">
        <div className="mx-auto flex max-w-[1640px] flex-wrap items-center justify-between gap-6 px-6 md:px-10">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/45">
              Next experiment
            </p>
            <p className="mt-3 font-serif text-3xl tracking-tight md:text-5xl">
              {experiments[(idx + 1) % experiments.length].title}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/lab/${experiments[(idx + 1) % experiments.length].slug}`}
              data-cursor="hover"
              data-cursor-label="NEXT"
              className="rounded-full bg-warmwhite px-6 py-3 font-sans text-[11px] uppercase tracking-widest text-ink-900 hover:bg-peach"
            >
              Next playground →
            </Link>
            <Link
              href="/lab"
              data-cursor="hover"
              data-cursor-label="ALL"
              className="rounded-full border border-warmwhite/30 px-6 py-3 font-sans text-[11px] uppercase tracking-widest hover:border-warmwhite"
            >
              All experiments
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
