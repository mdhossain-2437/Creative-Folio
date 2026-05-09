export const site = {
  name: "Delowar Hossain",
  shortName: "Delowar.dev",
  role: "Creative Developer & UI/UX Designer",
  location: "Joypurhat, Bangladesh",
  base: "Panchbibi, Joypurhat, Bangladesh",
  email: "hello@delowarhossain.dev",
  // Canonical production domain. The MMXXVII edition is published directly
  // at the apex domain.
  url: "https://delowarhossain.dev",
  domain: "delowarhossain.dev",
  studio: "The Compiled Thought",
  repo: "https://github.com/mdhossain-2437/Creative-Folio",
  yearStarted: 2017,
  edition: "MMXXVII / 03.27",
  editionShort: "MMXXVII",
  year: 2027,
  tagline:
    "Bridging editorial design and high-performance creative development. I build immersive digital products where typography, motion, and engineering converge.",
  availability: "Now booking Q2 ’27 → Q4 ’27",
  showreel: {
    src: "https://customer-7l7ux9p61w0c0p3z.cloudflarestream.com/c2da8a45e3e02fcd8d80e5e0b69ad214/manifest/video.m3u8",
    poster: "/og.svg",
    label: "Reel · 02:17",
  },
  // Identity assets — committed binaries in /public.
  // Resume: 2026 print-ready PDF (also mirrored on Google Drive, see resumeMirror).
  // Portrait: hero portrait used for /about, JSON-LD Person.image, OG fallbacks.
  resume: "/resume.pdf",
  resumeMirror: "https://drive.google.com/file/d/1u7AbFJlZBbZUuDZdmEfxRPb4viRdxZwu/view?usp=sharing",
  resumeMirrorAlt: "https://drive.google.com/file/d/1i8TW22F1tu1afbcYzQg1CSBUg9-_ZX5s/view?usp=sharing",
  portrait: "/profile.png",
  socials: [
    { label: "GITHUB", href: "https://github.com/mdhossain-2437" },
    { label: "TWITTER", href: "https://twitter.com/mdhossain2437" },
    { label: "LINKEDIN", href: "https://www.linkedin.com/in/mdhossain2437" },
    { label: "READ.CV", href: "https://read.cv/delowar" },
  ],
  // Educational background — surfaces in JSON-LD Person.alumniOf and on
  // the /about page. Order = most-recent-first.
  education: [
    {
      institution: "University of the People",
      degree: "B.Sc. Computer Science (in progress)",
      role: "Aspiring Software Engineer",
      url: "https://www.uopeople.edu/",
    },
    {
      institution: "B.A. Political Science",
      degree: "Bachelor of Arts",
      role: "Scholarly Modernity",
    },
  ],
  // GitHub identity (canonical handle, profile URL, public-repo highlights).
  // Used by the /about open-source block and JSON-LD sameAs.
  github: {
    handle: "mdhossain-2437",
    url: "https://github.com/mdhossain-2437",
    bio: "A passionate self-taught developer from Bangladesh.",
    repos: 127,
    highlights: [
      { name: "open-multi-agent", note: "Production-grade multi-agent orchestration framework." },
      { name: "Creative-Folio", note: "This portfolio (MMXXVII edition)." },
      { name: "streamflix", note: "Streaming UI experiment, Next.js + TypeScript." },
      { name: "nexify-engine", note: "Creative engine playground." },
      { name: "open-source-the-compiled-thought-themes", note: "Dark themes, developer fonts, animations." },
    ],
  },
  nav: [
    { label: "Index", href: "/" },
    { label: "Works", href: "/works" },
    { label: "Lab", href: "/lab" },
    { label: "Process", href: "/process" },
    { label: "About", href: "/about" },
    { label: "Resume", href: "/resume" },
    { label: "Journal", href: "/journal" },
    { label: "Services", href: "/services" },
    { label: "Uses", href: "/uses" },
    { label: "Contact", href: "/contact" },
    { label: "AI Summary", href: "/ai" },
  ],
  commandActions: [
    { id: "copy-email", label: "Copy email", hint: "hello@delowarhossain.dev" },
    { id: "download-resume", label: "Download resume (PDF)", hint: "press D anywhere" },
    { id: "toggle-grid", label: "Toggle layout grid", hint: "⌘+Shift+G" },
    { id: "toggle-motion", label: "Toggle motion (Off/On)", hint: "calmer build" },
    { id: "open-showreel", label: "Play showreel", hint: "02:17" },
    { id: "konami", label: "Trigger shader storm", hint: "Konami code" },
  ],
};

export type Site = typeof site;
