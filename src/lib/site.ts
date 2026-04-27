export const site = {
  name: "Delowar Hossain",
  shortName: "Delowar.dev",
  role: "Creative Developer & UI/UX Designer",
  location: "Joypurhat, Bangladesh",
  base: "Panchbibi, Joypurhat, Bangladesh",
  email: "hello@delowarhossain.dev",
  url: "https://delowarhossain.dev",
  studio: "The Compiled Thought",
  yearStarted: 2017,
  edition: "MMXXVI / 02.06",
  tagline:
    "Bridging editorial design and high-performance creative development. I build immersive digital products where typography, motion, and engineering converge.",
  availability: "Now booking Q4 ’26 → Q2 ’27",
  showreel: {
    src: "https://customer-7l7ux9p61w0c0p3z.cloudflarestream.com/c2da8a45e3e02fcd8d80e5e0b69ad214/manifest/video.m3u8",
    poster: "/og.svg",
    label: "Reel · 02:17",
  },
  socials: [
    { label: "GITHUB", href: "https://github.com/mdhossain-2437" },
    { label: "TWITTER", href: "https://twitter.com/mdhossain2437" },
    { label: "LINKEDIN", href: "https://www.linkedin.com/in/mdhossain-2437" },
    { label: "READ.CV", href: "https://read.cv/delowar" },
  ],
  nav: [
    { label: "Index", href: "/" },
    { label: "Works", href: "/works" },
    { label: "Lab", href: "/lab" },
    { label: "Process", href: "/process" },
    { label: "About", href: "/about" },
    { label: "Resume", href: "/resume" },
    { label: "Journal", href: "/journal" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  commandActions: [
    { id: "copy-email", label: "Copy email", hint: "hello@delowarhossain.dev" },
    { id: "toggle-grid", label: "Toggle layout grid", hint: "⌘+Shift+G" },
    { id: "toggle-motion", label: "Toggle motion (Off/On)", hint: "calmer build" },
    { id: "open-showreel", label: "Play showreel", hint: "02:17" },
    { id: "konami", label: "Trigger shader storm", hint: "Konami code" },
  ],
};

export type Site = typeof site;
