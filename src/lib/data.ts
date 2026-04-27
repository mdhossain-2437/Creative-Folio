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
    year: "2024",
    summary:
      "An ambient WebGL world built around a single noise field — pressure, depth and reflection driven entirely by GLSL. Site of the Day at Awwwards.",
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
    year: "2024",
    summary:
      "A typography-driven editorial system for a generative AI studio. Long-form narratives meet kinetic display type and a strict grid.",
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
    year: "2023",
    summary:
      "A design system for an enterprise data platform. Density, contrast, and motion calibrated for power users handling 15K+ daily sessions.",
    role: ["Design Systems", "Engineering", "Documentation"],
    stack: ["React", "Radix", "TypeScript", "Storybook"],
    cover:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80",
    accent: "#bfd2cf",
  },
  {
    slug: "kinetica",
    index: "04",
    title: "Kinetica",
    category: "Typography · Motion",
    year: "2023",
    summary:
      "A kinetic typography study turned product. Variable fonts mapped to scroll, audio amplitude, and reactive cursor velocity.",
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
    year: "2022",
    summary:
      "A real-time audio-reactive 3D scene rendered with custom raymarching. Audio FFT bins drive volumetric lighting and material color grading.",
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
    year: "2024",
    summary:
      "Mobile exam-prep companion with a custom RAG pipeline, syllabus-aware quizzes, and a quiet, paper-like interface.",
    role: ["Product Design", "RAG Systems", "Mobile"],
    stack: ["React Native", "LangChain", "Supabase"],
    cover:
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1600&q=80",
    accent: "#d6c2e3",
  },
];

export const archive = [
  { year: "2024", title: "Aura Void", category: "WebGL", role: "Creative Direction" },
  { year: "2024", title: "Terminal State", category: "Editorial", role: "Art Direction" },
  { year: "2024", title: "CrackIt", category: "Product / AI", role: "Product · Engineering" },
  { year: "2023", title: "Monolith UI", category: "Design System", role: "Lead Engineer" },
  { year: "2023", title: "Kinetica", category: "Type / Motion", role: "Concept · Motion" },
  { year: "2022", title: "Void Engine", category: "WebGL · Audio", role: "WebGL Engineer" },
  { year: "2022", title: "DriveRent", category: "Product", role: "Engineering" },
  { year: "2021", title: "Folio v1", category: "Personal", role: "Solo" },
  { year: "2020", title: "The Compiled Thought", category: "Studio", role: "Founder" },
];

export type Experiment = {
  index: string;
  category: string;
  title: string;
  summary: string;
  meta: string;
};

export const experiments: Experiment[] = [
  {
    index: "01",
    category: "WebGL",
    title: "Fluid Dynamics Shader",
    summary:
      "Custom GLSL fragment shader implementing a lightweight Navier–Stokes simulation for interactive background distortions.",
    meta: "GLSL · 2024",
  },
  {
    index: "02",
    category: "Three.js",
    title: "Volumetric Lighting",
    summary:
      "Raymarching experiments focusing on soft shadows and atmospheric scattering through procedurally-generated fog volumes.",
    meta: "Three.js · 2024",
  },
  {
    index: "03",
    category: "Particles",
    title: "Particle Systems",
    summary:
      "GPGPU particle system with curl-noise advection, instanced rendering and 1.2M particles at 60fps.",
    meta: "GPGPU · 2024",
  },
  {
    index: "04",
    category: "Type",
    title: "Variable Font Scroll",
    summary:
      "Scroll velocity → variable font axes (wght, wdth, slnt) for living, kinetic display headlines.",
    meta: "Variable Fonts · 2023",
  },
  {
    index: "05",
    category: "Motion",
    title: "Magnetic Cursor Field",
    summary:
      "A vector field that warps cursor trails into local minima of an SDF — feels physical, not animated.",
    meta: "GSAP · 2023",
  },
  {
    index: "06",
    category: "Audio",
    title: "FFT Reactive Material",
    summary:
      "Web Audio API → uniforms that drive material roughness, emissive color, and displacement.",
    meta: "Web Audio · 2023",
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
    slug: "shader-math-deep-dive",
    date: "2024.10.04",
    title: "Shader Math: from a single noise field to a world",
    category: "WebGL",
    excerpt:
      "How one well-tuned noise function — and a careful color ramp — can stand in for an entire scene. A practical tour of the math we use in production.",
    readingTime: "12 min read",
  },
  {
    slug: "the-quiet-grid",
    date: "2024.08.22",
    title: "The Quiet Grid: editorial restraint as a UX strategy",
    category: "Design",
    excerpt:
      "Why dropping density and trusting whitespace makes information-dense products feel calmer, smarter, and faster.",
    readingTime: "8 min read",
  },
  {
    slug: "rag-without-the-noise",
    date: "2024.06.11",
    title: "RAG Without the Noise: building accurate AI features",
    category: "AI",
    excerpt:
      "Notes from shipping retrieval-augmented features into production. Embeddings, chunking strategies, and a hard line on hallucinations.",
    readingTime: "14 min read",
  },
  {
    slug: "scroll-as-a-medium",
    date: "2024.04.02",
    title: "Scroll as a medium, not a mechanic",
    category: "Motion",
    excerpt:
      "Reframing scroll: not a way to consume content faster, but a timeline you can choreograph. A taxonomy of scroll patterns we use at the studio.",
    readingTime: "9 min read",
  },
  {
    slug: "typography-as-product",
    date: "2024.02.18",
    title: "Typography is the product",
    category: "Type",
    excerpt:
      "On variable fonts, reading rhythm, and the case for hand-tuned type pairings instead of ‘safe’ system stacks.",
    readingTime: "7 min read",
  },
];

export const journey: { range: string; title: string; summary: string }[] = [
  {
    range: "2024 — Now",
    title: "Creative Developer · The Compiled Thought",
    summary:
      "Leading creative engineering on award-winning sites. Shipping immersive WebGL, AI-native interfaces, and editorial product systems.",
  },
  {
    range: "2022 — 2024",
    title: "Full-Stack & Frontend Engineer",
    summary:
      "Built scalable web platforms serving thousands of users. React / Next.js / Node / cloud — with a strong design sensibility.",
  },
  {
    range: "2020 — 2022",
    title: "Self-Taught Engineer",
    summary:
      "Started the coding journey while finishing a B.A. in Political Science. Daily reps in the open source ecosystem.",
  },
  {
    range: "2017 — 2020",
    title: "Independent Designer",
    summary:
      "Logo, branding, and editorial design for local businesses. Where the typographic obsession really started.",
  },
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
  { label: "Selected Works", value: "32" },
  { label: "Years Practicing", value: "06" },
  { label: "Awards & Mentions", value: "12" },
  { label: "Avg. Lighthouse", value: "98" },
];
