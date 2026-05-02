export type WorkSection = {
  kind: "brief" | "approach" | "solution" | "outcome";
  heading: string;
  body: string;
};

export type WorkMetric = { label: string; value: string };

export type WorkGalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  aspect?: "wide" | "square" | "tall";
};

export type WorkTestimonial = {
  quote: string;
  attribution: string;
  role: string;
};

export type WorkCaseStudy = {
  sections: WorkSection[];
  metrics: WorkMetric[];
  deliverables: string[];
  gallery: WorkGalleryImage[];
  testimonial?: WorkTestimonial;
};

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
  client?: string;
  duration?: string;
  team?: string;
  liveUrl?: string;
  caseStudy?: WorkCaseStudy;
};

export const works: Work[] = [
  {
    slug: "aura-void",
    index: "01",
    title: "Aura Void",
    category: "WebGL · Creative Direction",
    year: "2027",
    summary:
      "An ambient WebGL world built around a single noise field — pressure, depth, and reflection driven entirely by GLSL. v2 introduces a tactile, physics-aware cursor that pulls the field into local minima.",
    role: ["Creative Direction", "Shaders", "Frontend Engineering"],
    stack: ["Three.js", "GLSL", "GSAP", "Lenis"],
    cover:
      "https://images.unsplash.com/photo-1638272181967-7d3772a91265?auto=format&fit=crop&w=1600&q=80",
    accent: "#e3bfb4",
    award: "Awwwards · Site of the Day",
    client: "Aura Studio (in-house)",
    duration: "14 weeks",
    team: "Solo + 1 sound designer",
    liveUrl: "https://aura.delowarhossain.dev",
    caseStudy: {
      sections: [
        {
          kind: "brief",
          heading: "Brief",
          body: "Aura asked for a website that would feel like a place rather than a page — somewhere a viewer could sit inside the brand for sixty seconds without scrolling and still feel like the visit was worthwhile. v1 was a static reel; v2 had to be physical.",
        },
        {
          kind: "approach",
          heading: "Approach",
          body: "Everything visual is one fragment shader sampling a 3D noise field. The cursor is treated as a soft body with mass and drag — it pulls the field into a local minimum, reflective metals re-light, and the camera reacts a beat behind. No image assets, no DOM overlays.",
        },
        {
          kind: "solution",
          heading: "Solution",
          body: "A single 1.4 kB GLSL program ships the entire experience. We added a 'serene mode' that decays cursor influence to zero after eight seconds, so the field is alive but never frantic. The hero loop is 12 seconds; nobody has noticed it loops.",
        },
        {
          kind: "outcome",
          heading: "Outcome",
          body: "Average dwell time on the landing scene rose from 11 s (v1) to 1 m 34 s (v2). The site won Awwwards SOTD in week one, then FWA the following month. Conversion to the contact route doubled.",
        },
      ],
      metrics: [
        { label: "Lighthouse", value: "98" },
        { label: "GLSL size", value: "1.4 kB" },
        { label: "Frame budget", value: "9.2 ms" },
        { label: "Avg. dwell", value: "1m 34s" },
      ],
      deliverables: [
        "Custom GLSL fragment shader (1.4 kB minified)",
        "Three.js orchestration layer + Lenis smooth scroll",
        "GSAP-driven cursor physics + camera follow",
        "Calmer-motion mode honouring prefers-reduced-motion",
        "Static export (Next.js 15) deployed to the edge",
        "8-page editorial set: Index, About, Process, Contact, 4 case studies",
      ],
      gallery: [
        {
          src: "https://images.unsplash.com/photo-1638272181967-7d3772a91265?auto=format&fit=crop&w=1800&q=80",
          alt: "Macro frame of the noise field with peach lighting",
          caption: "01 — Hero loop frame at t = 6s. The field rests; cursor influence decays.",
          aspect: "wide",
        },
        {
          src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1200&q=80",
          alt: "Detail of the metallic specular highlights",
          caption: "02 — Specular response sampled twice per pixel.",
          aspect: "tall",
        },
        {
          src: "https://images.unsplash.com/photo-1604079628040-94301bb21b91?auto=format&fit=crop&w=1200&q=80",
          alt: "Editorial section break with peach accent",
          caption: "03 — Editorial break at the case-study boundary.",
          aspect: "tall",
        },
        {
          src: "https://images.unsplash.com/photo-1614851099511-773084f6911d?auto=format&fit=crop&w=1800&q=80",
          alt: "Mobile portrait composition of the same scene",
          caption: "04 — On mobile the noise field is volume-mapped to a slower octave so the device stays cool.",
          aspect: "wide",
        },
      ],
      testimonial: {
        quote: "The site doesn't sell our brand — it is our brand. Watching people stop and play with it for two minutes before reading a word is exactly what we hoped for.",
        attribution: "Asha Mehrotra",
        role: "Creative Director, Aura Studio",
      },
    },
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
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    accent: "#c4c1bd",
    award: "FWA · Site of the Day",
    client: "Terminal State Labs",
    duration: "9 weeks",
    team: "2 designers + 1 engineer",
    liveUrl: "https://terminalstate.example",
    caseStudy: {
      sections: [
        {
          kind: "brief",
          heading: "Brief",
          body: "A young generative-AI lab needed a publication, not a marketing site — somewhere their researchers could ship a 4 000-word essay on Friday and a 90-second teaser on Monday without the design buckling. The constraint: zero stock imagery and a single typeface family.",
        },
        {
          kind: "approach",
          heading: "Approach",
          body: "We treated the home page as a magazine cover, not a landing page. Variable-font axes are wired to scroll velocity so display headlines feel like they're being printed in real time. The grid is strict — 12 columns at every breakpoint, no exceptions.",
        },
        {
          kind: "solution",
          heading: "Solution",
          body: "Three article templates (essay, interview, dispatch) share one body component. Editorial spreads use CSS subgrid so a long pull-quote spans both columns the moment it lands at viewport width ≥ 980. The system survived 64 articles before any team member needed to ask how to publish.",
        },
        {
          kind: "outcome",
          heading: "Outcome",
          body: "Time-to-publish dropped from 3 hours to 22 minutes. The site won FWA SOTD and was cited by Typewolf for the headline-velocity treatment. The lab's newsletter doubled in subscribers within the launch quarter.",
        },
      ],
      metrics: [
        { label: "CLS", value: "0.00" },
        { label: "LCP (mobile)", value: "1.1 s" },
        { label: "Articles shipped", value: "64" },
        { label: "Time to publish", value: "22 min" },
      ],
      deliverables: [
        "Editorial design system (12-col strict grid + subgrid spreads)",
        "Three article templates (essay / interview / dispatch)",
        "Variable-font headline runtime tied to scroll velocity",
        "MDX authoring pipeline with embedded React components",
        "Search index built at compile time (Pagefind)",
        "Brand guideline PDF + Notion handoff doc",
      ],
      gallery: [
        {
          src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1800&q=80",
          alt: "Editorial home spread with display typography",
          caption: "01 — Cover at the start of the launch week.",
          aspect: "wide",
        },
        {
          src: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80",
          alt: "Article reading spread",
          caption: "02 — Long-form essay template at 980 px and up.",
          aspect: "square",
        },
        {
          src: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1200&q=80",
          alt: "Mobile portrait of the same article",
          caption: "03 — Mobile collapses to 4-col but keeps the pull-quote rhythm.",
          aspect: "tall",
        },
        {
          src: "https://images.unsplash.com/photo-1518893063132-36e46dbe2428?auto=format&fit=crop&w=1800&q=80",
          alt: "Newsletter takeover at scroll end",
          caption: "04 — Newsletter takeover, set in display weight 720.",
          aspect: "wide",
        },
      ],
      testimonial: {
        quote: "We stopped arguing about layout and started arguing about ideas. That is the whole point.",
        attribution: "Iván Páez",
        role: "Editor, Terminal State",
      },
    },
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
    client: "Monolith Data",
    duration: "24 weeks (initial), ongoing",
    team: "Lead + 2 engineers + 2 designers",
    liveUrl: "https://monolith.example",
    caseStudy: {
      sections: [
        {
          kind: "brief",
          heading: "Brief",
          body: "Monolith's data platform served 30 000 power users across nine product surfaces; six different teams shipped UI without a shared vocabulary. We were brought in to land a single system covering tokens, primitives, patterns, and an RFC process — without slowing anyone down.",
        },
        {
          kind: "approach",
          heading: "Approach",
          body: "Tokens first, primitives second, patterns last. Tokens were built in Style Dictionary and emitted to CSS, JS, iOS, and Android. Primitives wrap Radix. Patterns are documented as recipes — copy-paste-able, not abstracted into yet-another-component-library.",
        },
        {
          kind: "solution",
          heading: "Solution",
          body: "40 primitives, 64 documented patterns, four density modes, and a contrast checker baked into the docs. The RFC process is a single MDX file with a deadline; comment threads happen in the PR. Six teams adopted the system within twelve weeks.",
        },
        {
          kind: "outcome",
          heading: "Outcome",
          body: "Time-to-feature dropped 38 % across the largest team. Accessibility regressions in the design-review queue dropped 92 %. Won CSS Design Awards UI of the Day in week two; cited by Brad Frost as a reference for token pipelines.",
        },
      ],
      metrics: [
        { label: "Primitives", value: "40" },
        { label: "Adopting teams", value: "6 / 6" },
        { label: "a11y regressions", value: "−92%" },
        { label: "Time to feature", value: "−38%" },
      ],
      deliverables: [
        "Token pipeline (Style Dictionary → CSS / TS / iOS / Android)",
        "40-primitive React library on top of Radix UI",
        "64 documented design patterns with copy-paste recipes",
        "Storybook deployment with contrast + density toggles",
        "RFC + ADR templates and review process",
        "Quarterly metrics dashboard tracking adoption + drift",
      ],
      gallery: [
        {
          src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1800&q=80",
          alt: "Component grid in the docs",
          caption: "01 — Component overview at default density.",
          aspect: "wide",
        },
        {
          src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
          alt: "Dashboard screen at compact density",
          caption: "02 — Compact density built for analysts running 12-hour days.",
          aspect: "square",
        },
        {
          src: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1200&q=80",
          alt: "Token reference page",
          caption: "03 — Token reference. Each colour shows its on-ink contrast.",
          aspect: "square",
        },
        {
          src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=80",
          alt: "Pattern detail page",
          caption: "04 — Pattern detail with a copy-paste recipe.",
          aspect: "wide",
        },
      ],
      testimonial: {
        quote: "It is the first design system I've used where the docs are the product. Everything else is downstream.",
        attribution: "Priya Anand",
        role: "Director of Engineering, Monolith Data",
      },
    },
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
    client: "Self-initiated",
    duration: "6 weeks",
    team: "Solo",
    liveUrl: "https://kinetica.delowarhossain.dev",
    caseStudy: {
      sections: [
        {
          kind: "brief",
          heading: "Brief",
          body: "A self-initiated experiment: what would a typography study look like if every variable font axis were genuinely interactive — not just decorative? The constraint was a single page, two typefaces, and no images.",
        },
        {
          kind: "approach",
          heading: "Approach",
          body: "Three input channels feed the type: scroll velocity drives weight, microphone amplitude drives width, cursor velocity drives slant. Each channel is smoothed with a one-pole low-pass so the text sways instead of jitters.",
        },
        {
          kind: "solution",
          heading: "Solution",
          body: "All animation runs on the compositor — `font-variation-settings` is updated once per rAF, never inside React state. The microphone channel asks for permission only when the user opts in via a small icon at the corner of the page; everything works without it.",
        },
        {
          kind: "outcome",
          heading: "Outcome",
          body: "Featured by Typewolf, Site Inspire, and the Variable Fonts community newsletter. The interaction model has been cited in three subsequent variable-font experiments by other studios.",
        },
      ],
      metrics: [
        { label: "Input channels", value: "3" },
        { label: "Frame budget", value: "4 ms" },
        { label: "JS bundle", value: "38 kB" },
        { label: "Time to interactive", value: "0.6 s" },
      ],
      deliverables: [
        "Variable-font runtime (3-channel input mixer)",
        "Scroll · cursor · microphone smoothing pipeline",
        "Calmer-motion fallback that reduces all axes to defaults",
        "Single-page editorial layout with display-weight controls",
        "Public-domain demo source on GitHub",
      ],
      gallery: [
        {
          src: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1800&q=80",
          alt: "Headline at maximum weight + width",
          caption: "01 — Headline at peak input — wght 900 / wdth 125.",
          aspect: "wide",
        },
        {
          src: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=1200&q=80",
          alt: "Slanted display passage at high cursor velocity",
          caption: "02 — Slant axis tied to cursor velocity at the editorial break.",
          aspect: "tall",
        },
        {
          src: "https://images.unsplash.com/photo-1499914485622-a88fac536970?auto=format&fit=crop&w=1200&q=80",
          alt: "Microphone-driven amplitude visualisation",
          caption: "03 — Microphone overlay (opt-in) showing amplitude against width.",
          aspect: "tall",
        },
        {
          src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1800&q=80",
          alt: "Calmer-motion variant",
          caption: "04 — Calmer-motion variant — all axes pinned to defaults.",
          aspect: "wide",
        },
      ],
    },
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
    client: "Lokal Sound (gallery commission)",
    duration: "11 weeks (installation), 4 weeks (web port)",
    team: "2 designers + 1 sound engineer",
    liveUrl: "https://void-engine.example",
    caseStudy: {
      sections: [
        {
          kind: "brief",
          heading: "Brief",
          body: "Lokal Sound commissioned a permanent gallery installation that would react to the live room — not pre-rendered video, not a pre-recorded loop. The web port had to feel like the same piece on any laptop, on any network.",
        },
        {
          kind: "approach",
          heading: "Approach",
          body: "A single raymarched scene fed by 64 FFT bins. Lower frequencies drive volume density, mids drive material absorption, highs spawn micro-sparks. The web version downsamples FFT to 32 bins and degrades raymarch step count gracefully on integrated GPUs.",
        },
        {
          kind: "solution",
          heading: "Solution",
          body: "On the gallery rig (RTX A2000), the piece runs at 1440p / 60fps. On a 2019 MacBook Air it runs at 720p / 45fps with the same visual language — the volumes are softer, the sparks are denser, but it still reads as the same room.",
        },
        {
          kind: "outcome",
          heading: "Outcome",
          body: "Installed at Lokal Sound's Berlin space for six months. Web port garnered 240 000 unique visitors in its first quarter. Used as a teaching reference at three universities for FFT-driven shader work.",
        },
      ],
      metrics: [
        { label: "FFT bins", value: "64" },
        { label: "Gallery uptime", value: "99.97%" },
        { label: "Web ports", value: "720p / 45fps" },
        { label: "Unique visitors", value: "240k" },
      ],
      deliverables: [
        "Custom raymarched fragment shader (volumes + sparks)",
        "Web Audio API → GLSL uniform pipeline",
        "Adaptive quality controller (raymarch steps × FPS targeting)",
        "Headless gallery build for Linux + auto-reload",
        "Web port deployed via Cloudflare with HLS audio fallback",
        "Sound design (12-minute generative loop, 8 stems)",
      ],
      gallery: [
        {
          src: "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=1800&q=80",
          alt: "Volume render at peak amplitude",
          caption: "01 — Volume render at peak amplitude, low-frequency dominant.",
          aspect: "wide",
        },
        {
          src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
          alt: "Quiet passage of the piece",
          caption: "02 — Quiet passage; volume density drops, sparks read.",
          aspect: "tall",
        },
        {
          src: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1200&q=80",
          alt: "Gallery installation photo",
          caption: "03 — Lokal Sound gallery, January 2024.",
          aspect: "tall",
        },
        {
          src: "https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?auto=format&fit=crop&w=1800&q=80",
          alt: "Web port at low quality tier",
          caption: "04 — Web port on integrated GPU — softer volumes, same piece.",
          aspect: "wide",
        },
      ],
      testimonial: {
        quote: "It listens. That is the only word. The room comes in and the room goes out and the piece is just patient.",
        attribution: "Anika Becker",
        role: "Curator, Lokal Sound",
      },
    },
  },
  {
    slug: "crackit",
    index: "06",
    title: "CrackIt",
    category: "Product · AI",
    year: "2027",
    summary:
      "Mobile exam-prep companion with a custom RAG pipeline, syllabus-aware quizzes, and a quiet, paper-like interface. 2027 update adds an offline mode and live tutor handoff.",
    role: ["Product Design", "RAG Systems", "Mobile"],
    stack: ["React Native", "LangChain", "Supabase"],
    cover:
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1600&q=80",
    accent: "#d6c2e3",
    award: "Product Hunt · #3 of the Day",
    client: "CrackIt (Bangladesh)",
    duration: "8 months (v1) + ongoing",
    team: "4 engineers + 1 designer",
    liveUrl: "https://crackit.app",
    caseStudy: {
      sections: [
        {
          kind: "brief",
          heading: "Brief",
          body: "University-entrance prep in South Asia is dominated by 4 000-page textbooks and last-minute coaching. CrackIt's premise: the same content, delivered as a quiet, paper-like companion that knows your syllabus and your weakest topics.",
        },
        {
          kind: "approach",
          heading: "Approach",
          body: "A custom RAG pipeline indexes the ten official textbooks per board and retrieves passage-level citations on every answer. Quizzes are generated from the same passages so users can always trace back to the page. The 2027 update adds an offline mode — the most-used 12 % of content fits in 80 MB on-device.",
        },
        {
          kind: "solution",
          heading: "Solution",
          body: "The interface is paper-like — single-column, generous leading, no notification badges. Streaks are present but small. The 'live tutor' button sends a snapshot of your last 30 minutes to a human reviewer if the model can't answer with confidence above 0.78.",
        },
        {
          kind: "outcome",
          heading: "Outcome",
          body: "180 000 monthly active users, 22 % paid conversion, +14 percentage-point average score lift on mock exams. Featured by Product Hunt (#3 of the day) and the Bangladesh ICT ministry's annual review.",
        },
      ],
      metrics: [
        { label: "Monthly active", value: "180k" },
        { label: "Paid conversion", value: "22%" },
        { label: "Avg. score lift", value: "+14 pp" },
        { label: "Offline corpus", value: "80 MB" },
      ],
      deliverables: [
        "React Native app (iOS + Android, single codebase)",
        "RAG pipeline (LangChain + pgvector + reranker)",
        "Syllabus-aware quiz generator with passage citations",
        "Offline-first sync engine (delta-synced 80 MB corpus)",
        "Live-tutor handoff workflow + reviewer dashboard",
        "Quiet design system: paper backgrounds, single-column reading",
      ],
      gallery: [
        {
          src: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1800&q=80",
          alt: "App reading view",
          caption: "01 — Reading view. Single column, generous leading, paper background.",
          aspect: "wide",
        },
        {
          src: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80",
          alt: "Quiz session in progress",
          caption: "02 — Quiz session — citations visible on every answer.",
          aspect: "tall",
        },
        {
          src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
          alt: "Live-tutor handoff screen",
          caption: "03 — Live-tutor handoff. Reviewer sees the last 30 minutes of context.",
          aspect: "tall",
        },
        {
          src: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&w=1800&q=80",
          alt: "Streaks panel showing weekly progress",
          caption: "04 — Streaks panel. Quiet by default, never red.",
          aspect: "wide",
        },
      ],
      testimonial: {
        quote: "My daughter prepares with this for two hours a day and never asks me to charge the phone. That's the highest review I have.",
        attribution: "Tariq Hossain",
        role: "Parent, Joypurhat",
      },
    },
  },
  {
    slug: "halcyon-os",
    index: "07",
    title: "Halcyon OS",
    category: "AI Workspace · Editorial",
    year: "2027",
    summary:
      "A serene AI-first workspace for writers. Predictive outlines fade in like ambient mist; commands surface contextually instead of through menus.",
    role: ["Product Design", "Front-end", "AI Prompts"],
    stack: ["Next.js", "OpenAI", "tRPC", "Drizzle"],
    cover:
      "https://images.unsplash.com/photo-1554189097-ffe88e998a2b?auto=format&fit=crop&w=1600&q=80",
    accent: "#cdfa00",
    client: "Halcyon (early-stage)",
    duration: "5 months (private beta)",
    team: "3 engineers + 1 designer",
    liveUrl: "https://halcyon.example",
    caseStudy: {
      sections: [
        {
          kind: "brief",
          heading: "Brief",
          body: "Most AI writing tools yell. Halcyon wanted to build the opposite — a workspace that quietly proposed an outline as you typed, surfaced commands when you needed them, and got out of the way the moment you started writing the next paragraph.",
        },
        {
          kind: "approach",
          heading: "Approach",
          body: "Predictive outlines fade in at 14 % opacity if the cursor pauses for over 800 ms; they vanish the moment you keystroke. Commands surface contextually — type 'tone:' anywhere and the AI tone palette opens; everything else is hidden until needed.",
        },
        {
          kind: "solution",
          heading: "Solution",
          body: "A single editor surface with a single keyboard shortcut (`/`) for everything else. Drafts auto-version every 60 seconds; the side panel is a timeline of versions you can scrub through with arrow keys. Sync is local-first via Y.js + tRPC mutations.",
        },
        {
          kind: "outcome",
          heading: "Outcome",
          body: "Private beta with 1 200 writers across publishing, journalism, and fiction. 71 % weekly retention at week 8 — well above the 30 % industry baseline for AI tools at this stage.",
        },
      ],
      metrics: [
        { label: "Beta writers", value: "1.2k" },
        { label: "W8 retention", value: "71%" },
        { label: "Predictive opacity", value: "14%" },
        { label: "Auto-version", value: "60 s" },
      ],
      deliverables: [
        "Local-first editor (Y.js CRDT + tRPC sync)",
        "Predictive-outline pipeline (debounced GPT-4 mini)",
        "Contextual command palette (`/` and `tone:`)",
        "Drafts timeline with keyboard scrubbing",
        "AI tone library — 12 calibrated voices",
        "Marketing site, docs, and pricing page",
      ],
      gallery: [
        {
          src: "https://images.unsplash.com/photo-1554189097-ffe88e998a2b?auto=format&fit=crop&w=1800&q=80",
          alt: "Editor with predictive outline visible",
          caption: "01 — Editor with predictive outline at 14 % opacity.",
          aspect: "wide",
        },
        {
          src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
          alt: "Tone palette open",
          caption: "02 — Tone palette opened by typing 'tone:'.",
          aspect: "square",
        },
        {
          src: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=1200&q=80",
          alt: "Drafts timeline panel",
          caption: "03 — Drafts timeline. Arrow keys scrub through 60 s snapshots.",
          aspect: "square",
        },
        {
          src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1800&q=80",
          alt: "Marketing landing page",
          caption: "04 — Landing page. The editor is the hero; nothing else.",
          aspect: "wide",
        },
      ],
      testimonial: {
        quote: "It is the first AI writing tool that lets me forget I'm using AI. The outlines just appear when I want them.",
        attribution: "Sara Voss",
        role: "Editor, beta cohort",
      },
    },
  },
  {
    slug: "echo-atlas",
    index: "08",
    title: "Echo Atlas",
    category: "Spatial Audio · WebXR",
    year: "2027",
    summary:
      "Walk through a sound-mapped city in your browser. WebXR-ready, but designed first for keyboard + mouse — binaural audio steered by your gaze.",
    role: ["Concept", "WebGL", "Audio"],
    stack: ["Three.js", "WebXR", "Web Audio API"],
    cover:
      "https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?auto=format&fit=crop&w=1600&q=80",
    accent: "#9be7ff",
    client: "Self-initiated",
    duration: "7 weeks",
    team: "Solo + 1 sound recordist",
    liveUrl: "https://echo-atlas.delowarhossain.dev",
    caseStudy: {
      sections: [
        {
          kind: "brief",
          heading: "Brief",
          body: "Sound mapping experiments tend to require headsets. Echo Atlas wanted the inverse — a binaural city you could walk through in a normal browser, in a normal afternoon, with normal headphones.",
        },
        {
          kind: "approach",
          heading: "Approach",
          body: "Field recordings from twelve street corners in Joypurhat were captured with a portable AT-3060. Each recording is anchored to a 3D point in a Three.js scene. The Web Audio API's PannerNode pans them using head-related transfer functions; gaze direction is steered by mouse, arrow keys, or WebXR head tracking.",
        },
        {
          kind: "solution",
          heading: "Solution",
          body: "The scene is intentionally sparse — a single empty street, lamps, and twelve invisible audio anchors. Visitors with WebXR-capable headsets get full 6DoF tracking; everyone else still gets binaural pan that responds to gaze. No login, no analytics, no autoplay.",
        },
        {
          kind: "outcome",
          heading: "Outcome",
          body: "Featured by The Creative Independent and the Web Audio newsletter. Used as reference material in two university courses on spatial sound design. 38 000 unique sessions in the first month, average session 4 m 12 s.",
        },
      ],
      metrics: [
        { label: "Sound anchors", value: "12" },
        { label: "Avg. session", value: "4m 12s" },
        { label: "Sessions / mo.", value: "38k" },
        { label: "WebXR optional", value: "yes" },
      ],
      deliverables: [
        "Three.js scene with WebXR optional path",
        "Web Audio binaural panning rig (12 anchors, HRTF-based)",
        "Field recordings (12 stems, 24-bit / 48 kHz)",
        "Keyboard + mouse navigation parity with headset path",
        "Companion essay published on /journal",
      ],
      gallery: [
        {
          src: "https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?auto=format&fit=crop&w=1800&q=80",
          alt: "Empty street scene with audio anchors",
          caption: "01 — Empty street scene. The anchors are invisible.",
          aspect: "wide",
        },
        {
          src: "https://images.unsplash.com/photo-1493514789931-586cb221d7a7?auto=format&fit=crop&w=1200&q=80",
          alt: "Field recording in progress",
          caption: "02 — Field recording session, June 2027.",
          aspect: "tall",
        },
        {
          src: "https://images.unsplash.com/photo-1531315396756-905d68d21b56?auto=format&fit=crop&w=1200&q=80",
          alt: "WebXR headset preview",
          caption: "03 — WebXR-capable headsets unlock 6DoF tracking.",
          aspect: "tall",
        },
        {
          src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=80",
          alt: "Map view of the recording locations",
          caption: "04 — All twelve recording locations within ~600 m of each other.",
          aspect: "wide",
        },
      ],
    },
  },
];

export const archive = [
  { year: "2027", title: "Halcyon OS", category: "AI Workspace", role: "Product Design" },
  { year: "2027", title: "Echo Atlas", category: "Spatial / WebXR", role: "Concept · WebGL" },
  { year: "2027", title: "Aura Void v2", category: "WebGL", role: "Creative Direction" },
  { year: "2027", title: "CrackIt 3.0", category: "Product / AI", role: "Product · Engineering" },
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
  | "latency-canvas"
  | "reaction-diffusion"
  | "voronoi-cells"
  | "flow-field"
  | "lissajous-orbits"
  | "boids-flock"
  | "wave-interference"
  | "kaleidoscope"
  | "metaballs";

export type ExperimentExtended = Experiment & { slug: ExperimentSlug };

export const experiments: ExperimentExtended[] = [
  {
    slug: "fluid-dynamics",
    index: "01",
    category: "WebGL",
    title: "Fluid Dynamics Shader",
    summary:
      "Custom GLSL fragment shader implementing a lightweight Navier–Stokes simulation for interactive background distortions.",
    meta: "GLSL · 2027",
  },
  {
    slug: "volumetric-lighting",
    index: "02",
    category: "Three.js",
    title: "Volumetric Lighting",
    summary:
      "Raymarching experiments focusing on soft shadows and atmospheric scattering through procedurally-generated fog volumes.",
    meta: "Three.js · 2027",
  },
  {
    slug: "particle-systems",
    index: "03",
    category: "Particles",
    title: "Particle Systems",
    summary:
      "GPGPU particle system with curl-noise advection, instanced rendering and 1.6M particles at 60fps.",
    meta: "GPGPU · 2027",
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
    meta: "Postprocessing · 2027",
  },
  {
    slug: "signed-distance-letters",
    index: "08",
    category: "Type",
    title: "Signed-Distance Letters",
    summary:
      "Glyphs rendered from a signed-distance field for crisp scaling, soft glow, and instant kerning experiments.",
    meta: "SDF · 2027",
  },
  {
    slug: "latency-canvas",
    index: "09",
    category: "Performance",
    title: "Latency Canvas",
    summary:
      "A frame-pacing visualizer drawing your real input → pixel latency. Every dot is one frame, colored by jank.",
    meta: "Performance · 2027",
  },
  {
    slug: "reaction-diffusion",
    index: "10",
    category: "Simulation",
    title: "Reaction Diffusion",
    summary:
      "A Gray–Scott reaction-diffusion field running on a single canvas pass. Hover seeds chemistry continuously; click reseeds the field.",
    meta: "Cellular · 2027",
  },
  {
    slug: "voronoi-cells",
    index: "11",
    category: "Geometry",
    title: "Voronoi Cells",
    summary:
      "A Voronoi tessellation of moving sites — the cursor adds a heavy site that warps the entire diagram in real time.",
    meta: "Computational Geom · 2027",
  },
  {
    slug: "flow-field",
    index: "12",
    category: "Vector",
    title: "Flow Field Vectors",
    summary:
      "A grid of arrows reading the curl of a procedural noise field. The cursor injects a local rotational bias into the flow.",
    meta: "Curl Noise · 2027",
  },
  {
    slug: "lissajous-orbits",
    index: "13",
    category: "Parametric",
    title: "Lissajous Orbits",
    summary:
      "Layered Lissajous curves whose ratios shift with cursor position. The body of the page becomes the parametric instrument.",
    meta: "Parametric · 2027",
  },
  {
    slug: "boids-flock",
    index: "14",
    category: "Behaviour",
    title: "Boids Flock",
    summary:
      "Reynolds-style flocking — separation, alignment, cohesion. The cursor attracts the flock; hold ⇧ while moving to flip it into a predator.",
    meta: "Agents · 2027",
  },
  {
    slug: "wave-interference",
    index: "15",
    category: "Optics",
    title: "Wave Interference",
    summary:
      "Concentric wavefronts emitted from multiple sources. The cursor is a live source; click to drop a permanent emitter and watch the interference fringe form.",
    meta: "Wave Optics · 2027",
  },
  {
    slug: "kaleidoscope",
    index: "16",
    category: "Symmetry",
    title: "Kaleidoscope Mirror",
    summary:
      "A six-fold mirrored brush. The cursor draws into one wedge and the geometry replicates around the centre with alternating chirality.",
    meta: "Reflection · 2027",
  },
  {
    slug: "metaballs",
    index: "17",
    category: "Implicit",
    title: "Metaballs Field",
    summary:
      "A field of additive radial gradients approximating an iso-surface. Spheres float and merge softly; the cursor adds a bright bump that pulls the field with it.",
    meta: "Implicit Surfaces · 2027",
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
    date: "2027.04.18",
    title: "Flexible page transitions: borrowing from Patrick Heng",
    category: "Motion",
    excerpt:
      "How to build a route-curtain system that morphs the destination title through the wipe — and how to keep your Lighthouse score above 95 while doing it.",
    readingTime: "11 min read",
  },
  {
    slug: "scroll-as-a-medium",
    date: "2027.02.02",
    title: "Scroll as a medium, not a mechanic",
    category: "Scroll",
    excerpt:
      "Reframing scroll: not a way to consume content faster, but a timeline you can choreograph. A taxonomy of scroll patterns we use at the studio in 2027.",
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
    date: "2027.03.04",
    title: "WebGL on low-end devices: graceful degradation playbook",
    category: "Performance",
    excerpt:
      "Detecting Swiftshader, throttled GPUs, and battery-saver mode — and falling back to a static gradient that still feels intentional.",
    readingTime: "10 min read",
  },
  {
    slug: "command-palettes-arent-just-for-devs",
    date: "2027.01.09",
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
    year: "2027",
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
  { tag: "BOOKING", line: "Q2 ’27 → Q4 ’27 — two slots open" },
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
  videoSrc: string;
  poster: string;
}[] = [
  {
    index: "01",
    title: "Aura Void · the noise field",
    duration: "00:24",
    topic: "Build",
    body: "Why one well-tuned fbm function carried an entire site — and how to fall back when the GPU can’t hang.",
    videoSrc:
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
    poster:
      "https://images.unsplash.com/photo-1638272181967-7d3772a91265?auto=format&fit=crop&w=1600&q=80",
  },
  {
    index: "02",
    title: "Halcyon OS · ambient AI surfaces",
    duration: "00:31",
    topic: "Concept",
    body: "Predictive outlines should fade in like mist, not interrupt. The motion system that makes that possible.",
    videoSrc:
      "https://test-videos.co.uk/vids/sintel/mp4/h264/720/Sintel_720_10s_1MB.mp4",
    poster:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
  },
  {
    index: "03",
    title: "Echo Atlas · binaural cities",
    duration: "00:42",
    topic: "Build",
    body: "WebXR-ready, but designed first for keyboard + mouse. Spatial audio steered by cursor + gaze.",
    videoSrc:
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_2MB.mp4",
    poster:
      "https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    index: "04",
    title: "On craft, in 2027",
    duration: "00:58",
    topic: "Reflection",
    body: "Why portfolios in 2027 should still be slow to load — if the seconds you spend feel earned.",
    videoSrc:
      "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_640x360.m4v",
    poster:
      "https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&w=1600&q=80",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Delowar turned a vague brief into a site that won us an Awwwards mention in its first week. His command of motion and editorial restraint is unmatched.",
    name: "Nora Vásquez",
    title: "Head of Brand",
    company: "Meridian Studio",
  },
  {
    quote:
      "Working with Delowar felt like pairing with someone who speaks design and engineering at native fluency. Our conversion rate jumped 34% after the redesign.",
    name: "Aiden Park",
    title: "Co-Founder & CEO",
    company: "Luminary AI",
  },
  {
    quote:
      "He shipped a WebGL hero, a full design system, and a CMS integration — in six weeks. The codebase was the cleanest handoff I've ever received.",
    name: "Priya Shankar",
    title: "Engineering Lead",
    company: "Sonder Health",
  },
  {
    quote:
      "Every detail — from scroll easing to kerning — was intentional. The result felt like a physical object, not a website.",
    name: "Marcus Lindqvist",
    title: "Creative Director",
    company: "Atelier Nord",
  },
];

export const githubFallback: { sha: string; repo: string; message: string; ago: string }[] = [
  { sha: "a1f4c2", repo: "creative-folio", message: "feat(layout): flexible route curtain with destination text", ago: "2h" },
  { sha: "3b9e02", repo: "creative-folio", message: "chore(content): refresh dates + projects for 2027", ago: "5h" },
  { sha: "7c1ab3", repo: "halcyon-os", message: "feat(editor): outline ambient fade + scrub timeline", ago: "1d" },
  { sha: "e520fd", repo: "echo-atlas", message: "experiment: binaural HRTF panning per city ward", ago: "2d" },
  { sha: "9d44ee", repo: "creative-folio", message: "feat(404): particle field with cursor flocking", ago: "3d" },
];
