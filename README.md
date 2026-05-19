# Creative-Folio

A creative-developer portfolio for **Delowar Hossain** — Awwwards-inspired,
typography-first, immersive, and built with the modern web stack.

> "The interface should disappear, leaving only the canvas and the content."

## Stack

- **Framework:** Next.js 16 (App Router, RSC, Turbopack stable)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS + custom design tokens
- **Type:** Newsreader (display serif), Inter (UI), JetBrains Mono (code)
- **Motion:** GSAP + Lenis (smooth scroll), Framer Motion (page transitions)
- **WebGL:** Custom GLSL shaders (hero + lab) using raw WebGL — small bundle, large effect
- **Three.js / R3F:** wired in for further lab experiments
- **Icons:** Lucide

## Pages

- `/` — Home (immersive shader hero, manifesto, selected works, awards, capabilities, process, journal, sitemap)
- `/works` — Selected works grid + archive preview
- `/works/[slug]` — Case study template
- `/lab` — Experiments (shader cards, arsenal)
- `/about` — Story, philosophy, journey
- `/resume` — Long-form CV
- `/journal` + `/journal/[slug]` — Index + post template
- `/services` — Engagements & process
- `/contact` — Inquiry form (services, budget, message)
- `/archive` — Full archive
- `/awards` — Trophy room
- `/colophon` — Credits & build notes
- `/legal/privacy` + `/legal/terms` — Plain-language legal
- `/not-found` — 404 (lost in the void)

## Highlights

- **Custom hero shader** (`src/components/webgl/HeroShader.tsx`): cursor-attracted
  fbm noise field with warm/cool color ramp, vignette, film grain.
- **Ambient noise field** (`src/components/webgl/NoiseField.tsx`): used as a
  background texture on every `PageHero` and inside `Lab` cards.
- **Custom cursor** with `data-cursor` and `data-cursor-label` attributes for
  variant + label hints (hover, view, drag).
- **Scroll meter, grid overlay (Cmd/Ctrl+Shift+G), preloader, page transitions,
  marquee bands, magnetic buttons**, split-text reveals, and an animated contact form.

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build && pnpm start
pnpm lint
pnpm typecheck
```

## Notes

- Imagery uses Unsplash placeholders. Drop final imagery into `/public` and
  swap `cover` paths in `src/lib/data.ts`.
- The hero/noise shaders gracefully degrade on machines without WebGL.
- Real `data-cursor` attributes are wired across CTAs and links — toggle them
  off by removing them or by removing `<Cursor />` from the layout.
