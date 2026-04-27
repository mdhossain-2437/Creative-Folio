export type Work = {
  slug: string;
  index: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  role: string[];
  stack: string[];
  cover: string;
  accent: string;
  award?: string;
};

export const works: Work[] = [
  {
    slug: "aura-void",
    index: "01",
    title: "Aura Void",
    category: "WebGL · Creative Direction",
    year: "2026",
    summary:
      "An ambient WebGL world built around a single noise field — pressure, depth, and reflection driven entirely by GLSL. v2 introduces a tactile, physics-aware cursor that pulls the field into local minima.",
    role: ["Creative Direction", "Shaders", "Frontend Engineering"],
    stack: ["Three.js", "GLSL", "GSAP", "Lenis"],
    cover:
      "https://images.unsplash.com/photo-1635776063043-2cf8a32fa5be?auto=format&fit=crop&w=1600&q=80",
    accent: "#e3bfb4",
    award: "Awwwards · Site of the Day",
  },
  {
    slug: "terminal-state",
    index: "02",
    title: "Terminal State",
    category: "Creative Direction · Editorial",
    year: "2025",
    summary:
      "A typography-driven editorial system for a generative AI studio. Long-form narratives meet kinetic display type and a strict grid — fluid through phone, tablet, and ultrawide.",
    role: ["Art Direction", "Identity", "Frontend"],
    stack: ["Next.js", "GSAP", "Framer Motion"],
    cover:
      "https://images.unsplash.com/photo-1558959356-2f36b5fc02d3?auto=format&fit=crop&w=1600&q=80",
    accent: "#c4c1bd",
    award: "FWA · Site of the Day",
  },
  {
    slug: "monolith-ui",
    index: "03",
    title: "Monolith UI",
    category: "Design Systems · Engineering",
    year: "2025",
    summary:
      "A design system for an enterprise data platform. Density, contrast, and motion calibrated for power users handling 30K+ daily sessions — now with a token pipeline that ships through Style Dictionary.",
    role: ["Design Systems", "Engineering", "Documentation"],
    stack: ["React", "Radix", "TypeScript", "Storybook"],
    cover:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80",
    accent: "#bfd2cf",
    award: "CSS Design Awards · UI of the Day",
  },
  {
    slug: "kinetica",
    index: "04",
    title: "Kinetica",
    category: "Typography · Motion",
    year: "2025",
    summary:
      "A kinetic typography study turned product. Variable fonts mapped to scroll, audio amplitude, and reactive cursor velocity — the type behaves like a living organism.",
    role: ["Concept", "Motion Design", "Frontend"],
    stack: ["Variable Fonts", "GSAP", "WebGL"],
    cover:
      "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1600&q=80",
    accent: "#e7d6b8",
  },
  {
    slug: "void-engine",
    index: "05",
    title: "Void Engine",
    category: "Audio-Visual Experience",
    year: "2024",
    summary:
      "A real-time audio-reactive 3D scene rendered with custom raymarching. Audio FFT bins drive volumetric lighting and material color grading — originally an installation, now a web port.",
    role: ["WebGL", "Sound Design", "Performance"],
    stack: ["Three.js", "GLSL", "Web Audio API"],
    cover:
      "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=1600&q=80",
    accent: "#9aa6c2",
  },
  {
    slug: "crackit",
    index: "06",
    title: "CrackIt",
    category: "Product · AI",
    year: "2026",
    summary:
      "Mobile exam-prep companion with a custom RAG pipeline, syllabus-aware quizzes, and a quiet, paper-like interface. 2026 update adds an offline mode and live tutor handoff.",
    role: ["Product Design", "RAG Systems", "Mobile"],
    stack: ["React Native", "LangChain", "Supabase"],
    cover:
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1600&q=80",
    accent: "#d6c2e3",
    award: "Product Hunt · #3 of the Day",
  },
  {
    slug: "halcyon-os",
    index: "07",
    title: "Halcyon OS",
    category: "AI Workspace · Editorial",
    year: "2026",
    summary:
      "A serene AI-first workspace for writers. Predictive outlines fade in like ambient mist; commands surface contextually instead of through menus.",
    role: ["Product Design", "Front-end", "AI Prompts"],
    stack: ["Next.js", "OpenAI", "tRPC", "Drizzle"],
    cover:
      "https://images.unsplash.com/photo-1554189097-ffe88e998a2b?auto=format&fit=crop&w=1600&q=80",
    accent: "#cdfa00",
  },
  {
    slug: "echo-atlas",
    index: "08",
    title: "Echo Atlas",
    category: "Spatial Audio · WebXR",
    year: "2026",
    summary:
      "Walk through a sound-mapped city in your browser. WebXR-ready, but designed first for keyboard + mouse — binaural audio steered by your gaze.",
    role: ["Concept", "WebGL", "Audio"],
    stack: ["Three.js", "WebXR", "Web Audio API"],
    cover:
      "https://images.unsplash.com/photo-1505412932025-fa49aef0d92e?auto=format&fit=crop&w=1600&q=80",
    accent: "#9be7ff",
  },
];

export const archive = [
  { year: "2026", title: "Halcyon OS", category: "AI Workspace", role: "Product Design" },
  { year: "2026", title: "Echo Atlas", category: "Spatial / WebXR", role: "Concept · WebGL" },
  { year: "2026", title: "Aura Void v2", category: "WebGL", role: "Creative Direction" },
  { year: "2026", title: "CrackIt 3.0", category: "Product / AI", role: "Product · Engineering" },
  { year: "2025", title: "Terminal State", category: "Editorial", role: "Art Direction" },
  { year: "2025", title: "Monolith UI", category: "Design System", role: "Lead Engineer" },
  { year: "2025", title: "Kinetica", category: "Type / Motion", role: "Concept · Motion" },
  { year: "2024", title: "Void Engine", category: "WebGL · Audio", role: "WebGL Engineer" },
  { year: "2024", title: "DriveRent", category: "Product", role: "Engineering" },
  { year: "2022", title: "Folio v1", category: "Personal", role: "Solo" },
  { year: "2020", title: "The Compiled Thought", category: "Studio", role: "Founder" },
  { year: "2017", title: "First Logo Commission", category: "Branding", role: "Solo" },
];

export type Experiment = {
  index: string;
  category: string;
  title: string;
  summary: string;
  meta: string;
};

export type ExperimentSlug =
  | "fluid-dynamics"
  | "volumetric-lighting"
  | "particle-systems"
  | "variable-font-scroll"
  | "magnetic-cursor"
  | "fft-material"
  | "shader-storm"
  | "signed-distance-letters"
  | "latency-canvas";

export type ExperimentExtended = Experiment & { slug: ExperimentSlug };

export const experiments: ExperimentExtended[] = [
  {
    slug: "fluid-dynamics",
    index: "01",
    category: "WebGL",
    title: "Fluid Dynamics Shader",
    summary:
      "Custom GLSL fragment shader implementing a lightweight Navier–Stokes simulation for interactive background distortions.",
    meta: "GLSL · 2026",
  },
  {
    slug: "volumetric-lighting",
    index: "02",
    category: "Three.js",
    title: "Volumetric Lighting",
    summary:
      "Raymarching experiments focusing on soft shadows and atmospheric scattering through procedurally-generated fog volumes.",
    meta: "Three.js · 2026",
  },
  {
    slug: "particle-systems",
    index: "03",
    category: "Particles",
    title: "Particle Systems",
    summary:
      "GPGPU particle system with curl-noise advection, instanced rendering and 1.6M particles at 60fps.",
    meta: "GPGPU · 2026",
  },
  {
    slug: "variable-font-scroll",
    index: "04",
    category: "Type",
    title: "Variable Font Scroll",
    summary:
      "Scroll velocity → variable font axes (wght, wdth, slnt) for living, kinetic display headlines.",
    meta: "Variable Fonts · 2025",
  },
  {
    slug: "magnetic-cursor",
    index: "05",
    category: "Motion",
    title: "Magnetic Cursor Field",
    summary:
      "A vector field that warps cursor trails into local minima of an SDF — feels physical, not animated.",
    meta: "GSAP · 2025",
  },
  {
    slug: "fft-material",
    index: "06",
    category: "Audio",
    title: "FFT Reactive Material",
    summary:
      "Web Audio API → uniforms that drive material roughness, emissive color, and displacement.",
    meta: "Web Audio · 2025",
  },
  {
    slug: "shader-storm",
    index: "07",
    category: "Glitch",
    title: "Shader Storm",
    summary:
      "A composable post-processing chain triggered by the Konami code. RGB shift, scanlines, hue cycling — layered live.",
    meta: "Postprocessing · 2026",
  },
  {
    slug: "signed-distance-letters",
    index: "08",
    category: "Type",
    title: "Signed-Distance Letters",
    summary:
      "Glyphs rendered from a signed-distance field for crisp scaling, soft glow, and instant kerning experiments.",
    meta: "SDF · 2026",
  },
  {
    slug: "latency-canvas",
    index: "09",
    category: "Performance",
    title: "Latency Canvas",
    summary:
      "A frame-pacing visualizer drawing your real input → pixel latency. Every dot is one frame, colored by jank.",
    meta: "Performance · 2026",
  },
];

export const arsenal: { title: string; items: string[] }[] = [
  {
    title: "Core Frameworks",
    items: ["React / Next.js", "Vue / Nuxt", "SvelteKit", "TypeScript"],
  },
  {
    title: "Creative / WebGL",
    items: ["Three.js / R3F", "GLSL Shaders", "GSAP / Lenis", "Framer Motion"],
  },
  {
    title: "Styling & UI",
    items: ["Tailwind CSS", "Radix UI", "Variable Fonts", "Motion Systems"],
  },
  {
    title: "Backend & AI",
    items: ["Node.js / FastAPI", "LangChain · OpenAI", "PostgreSQL · Supabase", "Vercel · Cloudflare"],
  },
];

export const services: {
  index: string;
  title: string;
  summary: string;
  tags: string[];
}[] = [
  {
    index: "01",
    title: "Creative Development",
    summary:
      "Pushing the boundaries of the browser. Custom 3D environments, complex shader materials, and fluid particle systems that respond to interaction with microscopic precision.",
    tags: ["WebGL", "Three.js", "GLSL", "GSAP"],
  },
  {
    index: "02",
    title: "UI / UX Design",
    summary:
      "Crafting minimalist, intuitive interfaces that prioritise content and motion. Rigid grids and editorial whitespace to frame digital narratives effectively.",
    tags: ["UI / UX", "Design Systems", "Webflow", "Framer"],
  },
  {
    index: "03",
    title: "Art Direction",
    summary:
      "Defining the visual language. From typography selection to color grading and motion choreography, every pixel aligns with the core brand identity.",
    tags: ["Art Direction", "Logo & Branding", "Typography", "Motion"],
  },
  {
    index: "04",
    title: "Full-Stack Engineering",
    summary:
      "Production-grade systems with AI integration. Full-stack architecture, edge deployments, real-time pipelines, and pragmatic dev-ex.",
    tags: ["Next.js", "Node / Python", "AI / RAG", "DevOps"],
  },
];

export const serviceTiers: {
  index: string;
  name: string;
  pitch: string;
  duration: string;
  starts: string;
  deliverables: string[];
  best: string;
}[] = [
  {
    index: "§01",
    name: "Sprint",
    pitch:
      "A focused 2–3 week burst. We pick one painful surface and turn it into a high-fidelity, production-ready slice.",
    duration: "2–3 weeks",
    starts: "From $4,800",
    deliverables: [
      "1 hero / landing surface",
      "1 motion system + interaction spec",
      "Hand-off + Loom walkthrough",
    ],
    best: "Pre-seed teams who need a hero moment yesterday.",
  },
  {
    index: "§02",
    name: "Engagement",
    pitch:
      "A 6–9 week embedded build covering everything from art direction to shipped front-end.",
    duration: "6–9 weeks",
    starts: "From $14,400",
    deliverables: [
      "Full marketing site (8–12 routes)",
      "Custom WebGL hero / interaction layer",
      "Editorial typography + design tokens",
      "CMS-ready handover (MDX or Sanity)",
    ],
    best: "Series-A studios shipping a flagship site of the year contender.",
  },
  {
    index: "§03",
    name: "Retainer",
    pitch:
      "A monthly partnership: I’m the always-on creative partner for your most ambitious moments.",
    duration: "3–6 month minimums",
    starts: "$8,800/mo",
    deliverables: [
      "Weekly creative direction + paired build sessions",
      "Quarterly identity + motion refresh",
      "Award submissions + launch press kits",
      "Performance + accessibility quarterly review",
    ],
    best: "In-house creative teams that need a senior partner without a senior hire.",
  },
];

export const process: { phase: string; title: string; summary: string }[] = [
  {
    phase: "Phase I",
    title: "Discovery",
    summary:
      "Understand narrative constraints. Map the audience, the systems, and the technical envelope before a single pixel.",
  },
  {
    phase: "Phase II",
    title: "Design",
    summary:
      "Establish the visual grid, typography rules, and static art direction. Prototype the silence between elements.",
  },
  {
    phase: "Phase III",
    title: "Prototype",
    summary:
      "Draft core WebGL scenes, motion curves, and the choreography between page transitions and content systems.",
  },
  {
    phase: "Phase IV",
    title: "Production",
    summary:
      "Write custom GLSL shaders, build the engineering layer, ship with measurable performance and accessibility.",
  },
];

export const awards: {
  index: string;
  title: string;
  org: string;
  year: string;
  summary: string;
}[] = [
  {
    index: "01",
    title: "Site of the Day",
    org: "Awwwards",
    year: "2024",
    summary:
      "For Aura Void — a design language merging editorial restraint, technical depth, and interactive storytelling.",
  },
  {
    index: "02",
    title: "FWA of the Day",
    org: "The FWA",
    year: "2024",
    summary:
      "For Terminal State — combining editorial product structure with expressive frontend craft and performance discipline.",
  },
  {
    index: "03",
    title: "Best UI Design",
    org: "CSS Design Awards",
    year: "2024",
    summary:
      "Selected for interface precision, calm complexity, and a production-friendly AI workflow experience.",
  },
  {
    index: "04",
    title: "#3 Product of the Day",
    org: "Product Hunt",
    year: "2024",
    summary:
      "Ranked for turning a niche creative utility into a sharp, highly shareable product workflow.",
  },
];

export const journal: {
  slug: string;
  date: string;
  title: string;
  category: string;
  excerpt: string;
  readingTime: string;
}[] = [
  {
    slug: "flexible-page-transitions",
    date: "2026.04.18",
    title: "Flexible page transitions: borrowing from Patrick Heng",
    category: "Motion",
    excerpt:
      "How to build a route-curtain system that morphs the destination title through the wipe — and how to keep your Lighthouse score above 95 while doing it.",
    readingTime: "11 min read",
  },
  {
    slug: "scroll-as-a-medium",
    date: "2026.02.02",
    title: "Scroll as a medium, not a mechanic",
    category: "Scroll",
    excerpt:
      "Reframing scroll: not a way to consume content faster, but a timeline you can choreograph. A taxonomy of scroll patterns we use at the studio in 2026.",
    readingTime: "9 min read",
  },
  {
    slug: "shader-math-deep-dive",
    date: "2025.11.12",
    title: "Shader Math: from a single noise field to a world",
    category: "WebGL",
    excerpt:
      "How one well-tuned noise function — and a careful color ramp — can stand in for an entire scene. A practical tour of the math we use in production.",
    readingTime: "12 min read",
  },
  {
    slug: "the-quiet-grid",
    date: "2025.08.22",
    title: "The Quiet Grid: editorial restraint as a UX strategy",
    category: "Design",
    excerpt:
      "Why dropping density and trusting whitespace makes information-dense products feel calmer, smarter, and faster.",
    readingTime: "8 min read",
  },
  {
    slug: "rag-without-the-noise",
    date: "2025.06.11",
    title: "RAG Without the Noise: building accurate AI features",
    category: "AI",
    excerpt:
      "Notes from shipping retrieval-augmented features into production. Embeddings, chunking strategies, and a hard line on hallucinations.",
    readingTime: "14 min read",
  },
  {
    slug: "typography-as-product",
    date: "2025.02.18",
    title: "Typography is the product",
    category: "Type",
    excerpt:
      "On variable fonts, reading rhythm, and the case for hand-tuned type pairings instead of ‘safe’ system stacks.",
    readingTime: "7 min read",
  },
  {
    slug: "webgl-on-low-end-devices",
    date: "2026.03.04",
    title: "WebGL on low-end devices: graceful degradation playbook",
    category: "Performance",
    excerpt:
      "Detecting Swiftshader, throttled GPUs, and battery-saver mode — and falling back to a static gradient that still feels intentional.",
    readingTime: "10 min read",
  },
  {
    slug: "command-palettes-arent-just-for-devs",
    date: "2026.01.09",
    title: "Command palettes aren’t just for devs",
    category: "UI",
    excerpt:
      "Why ⌘K belongs on portfolios, agency sites, and even e-commerce — and how to design one that doesn’t feel like Notion.",
    readingTime: "6 min read",
  },
];

export const journey: { range: string; title: string; summary: string }[] = [
  {
    range: "2025 — Now",
    title: "Creative Developer · The Compiled Thought",
    summary:
      "Leading creative engineering on award-winning sites. Shipping immersive WebGL, AI-native interfaces, and editorial product systems for studios and Series-A startups.",
  },
  {
    range: "2023 — 2025",
    title: "Full-Stack & Frontend Engineer",
    summary:
      "Built scalable web platforms serving tens of thousands of users. React / Next.js / Node / cloud — with a strong design sensibility and a love of motion.",
  },
  {
    range: "2020 — 2023",
    title: "Self-Taught Engineer",
    summary:
      "Started the coding journey while finishing a B.A. in Political Science. Daily reps in the open-source ecosystem and the first GLSL deep-dive.",
  },
  {
    range: "2017 — 2020",
    title: "Independent Designer",
    summary:
      "Logo, branding, and editorial design for local businesses. Where the typographic obsession really started.",
  },
];

export const milestones: { year: string; title: string; body: string }[] = [
  {
    year: "2017",
    title: "First commission",
    body: "Hand-lettered a logo for a Joypurhat café. Got paid in chai. Decided design was the move.",
  },
  {
    year: "2020",
    title: "Founded The Compiled Thought",
    body: "A one-person studio for editorial-led digital work. First creative-development project shipped six months later.",
  },
  {
    year: "2023",
    title: "First Site of the Day",
    body: "Awwwards SOTD for a kinetic editorial site. Spent the next twelve months refusing every brief that wasn’t WebGL.",
  },
  {
    year: "2025",
    title: "Studio scales to four",
    body: "Brought on a motion designer, a 3D artist, and a producer. Shipped Terminal State and Monolith UI back-to-back.",
  },
  {
    year: "2026",
    title: "Halcyon OS + Echo Atlas",
    body: "Two ambitious products in active development. Aura Void v2 launches in Q3.",
  },
];

export const nowFeed: { tag: string; line: string }[] = [
  { tag: "BUILDING", line: "Aura Void v2 — cursor-attractive fluid sim shader" },
  { tag: "WRITING", line: "‘Flexible page transitions’ essay (April ’26)" },
  { tag: "READING", line: "‘Designing Sound’ — Andy Farnell" },
  { tag: "LISTENING", line: "Floating Points — Cascade" },
  { tag: "OBSESSING OVER", line: "the way Patrick Heng times his curtain wipes" },
  { tag: "BOOKING", line: "Q4 ’26 → Q2 ’27 — two slots open" },
];

export const expertise = [
  "UI/UX Design",
  "Web Design",
  "Logo & Branding",
  "Webflow Design",
  "Framer Design",
  "Creative Development",
  "Three.js · WebGL",
  "GLSL Shaders",
  "GSAP · Lenis",
  "Next.js · Nuxt.js",
  "Art Direction",
  "AI Integration",
];

export const stats = [
  { label: "Selected Works", value: "42" },
  { label: "Years Practicing", value: "09" },
  { label: "Awards & Mentions", value: "18" },
  { label: "Avg. Lighthouse", value: "98" },
];

export const reelClips: {
  index: string;
  title: string;
  duration: string;
  topic: "Build" | "Concept" | "Reflection";
  body: string;
}[] = [
  {
    index: "01",
    title: "Aura Void · the noise field",
    duration: "00:24",
    topic: "Build",
    body: "Why one well-tuned fbm function carried an entire site — and how to fall back when the GPU can’t hang.",
  },
  {
    index: "02",
    title: "Halcyon OS · ambient AI surfaces",
    duration: "00:31",
    topic: "Concept",
    body: "Predictive outlines should fade in like mist, not interrupt. The motion system that makes that possible.",
  },
  {
    index: "03",
    title: "Echo Atlas · binaural cities",
    duration: "00:42",
    topic: "Build",
    body: "WebXR-ready, but designed first for keyboard + mouse. Spatial audio steered by cursor + gaze.",
  },
  {
    index: "04",
    title: "On craft, in 2026",
    duration: "00:58",
    topic: "Reflection",
    body: "Why I think portfolios should still be slow to load — if the seconds you spend feel earned.",
  },
];

export const githubFallback: { sha: string; repo: string; message: string; ago: string }[] = [
  { sha: "a1f4c2", repo: "creative-folio", message: "feat(layout): flexible route curtain with destination text", ago: "2h" },
  { sha: "3b9e02", repo: "creative-folio", message: "chore(content): refresh dates + projects for 2026", ago: "5h" },
  { sha: "7c1ab3", repo: "halcyon-os", message: "feat(editor): outline ambient fade + scrub timeline", ago: "1d" },
  { sha: "e520fd", repo: "echo-atlas", message: "experiment: binaural HRTF panning per city ward", ago: "2d" },
  { sha: "9d44ee", repo: "creative-folio", message: "feat(404): particle field with cursor flocking", ago: "3d" },
];
