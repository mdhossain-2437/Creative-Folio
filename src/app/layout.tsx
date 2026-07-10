import type { Metadata, Viewport } from "next";
import { Newsreader, Inter, JetBrains_Mono, Sacramento } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { RumProbes } from "@/components/providers/RumProbes";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";
import { RouteCurtain } from "@/components/layout/RouteCurtain";
import { MaskFooter } from "@/components/ui/MaskFooter";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { ClientOverlays } from "@/components/layout/ClientOverlays";
import { SoundProvider } from "@/components/ui/SoundDesign";
import { LazyChrome } from "@/components/layout/LazyChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "optional",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Sacramento — a single-weight formal signature script used exclusively
// for the footer SignatureSVG. Loaded with display:swap so the fallback
// (cursive) shows immediately and the real face hot-swaps in once
// available without blocking layout.
const sacramento = Sacramento({
  subsets: ["latin"],
  variable: "--font-sacramento",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Branded-search title: leads with "Delowar Hossain" so the page titled
  // shows up first when someone searches that name on Google / Bing.
  // Subpages use the template "%s · Delowar Hossain" to keep the name
  // attached to every result.
  title: {
    default: `${site.name} — Creative Developer & UI/UX Designer in Bangladesh`,
    template: `%s · ${site.name}`,
  },
  // Description leads with the full name + role + location so the SERP
  // snippet reads as a person bio (best practice for Knowledge-Panel
  // worthy entities).
  description: `${site.name} is a creative developer and UI/UX designer based in ${site.location}. Building immersive, performance-focused web experiences with WebGL, Three.js, GSAP, Next.js and AI integration. ${site.editionShort} edition portfolio.`,
  keywords: [
    // Branded keywords (highest weight)
    "Delowar Hossain",
    "Md Delowar Hossain",
    "delowarhossain",
    "delowarhossain.dev",
    "2027.delowarhossain.dev",
    "Delowar",
    "The Compiled Thought",
    "The Compiled Thought studio",
    "Compiled Thought",
    // Role + location
    "creative developer",
    "creative developer Bangladesh",
    "creative developer Joypurhat",
    "ui ux designer Bangladesh",
    "website developer Bangladesh",
    "full-stack developer Bangladesh",
    "AI engineer Bangladesh",
    // Stack
    "WebGL",
    "Three.js",
    "GSAP",
    "Next.js",
    "React",
    "TypeScript",
    "GLSL shaders",
    "Lenis",
    // Disambiguation + recognition
    "awwwards",
    "css design awards",
    "FWA",
    // Edition
    "MMXXVII",
    "2027 portfolio",
    "future-stack portfolio",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.studio,
  applicationName: `${site.name} — ${site.editionShort}`,
  openGraph: {
    title: `${site.name} — Creative Developer & UI/UX Designer`,
    description: `Portfolio of ${site.name}, creative developer and UI/UX designer based in ${site.location}. WebGL · Three.js · GSAP · Next.js · AI integration. ${site.editionShort} edition.`,
    type: "profile",
    firstName: "Delowar",
    lastName: "Hossain",
    username: "mdhossain2437",
    siteName: site.name,
    url: site.url,
    locale: "en_US",
    // og:image is auto-populated by the `app/opengraph-image.tsx` file
    // convention — a 1200x630 edge-rendered card with the portrait + name.
  },
  twitter: {
    card: "summary_large_image",
    creator: "@mdhossain2437",
    site: "@mdhossain2437",
    title: `${site.name} — Creative Developer & UI/UX Designer`,
    description: `Portfolio of ${site.name}, creative developer based in ${site.location}.`,
    // twitter:image auto-populated by `app/twitter-image.tsx`.
  },
  alternates: {
    // NOTE: do NOT set `canonical` here. Next.js merges metadata parent→child,
    // so a canonical on the root layout propagates to EVERY page that doesn't
    // set its own — making /now, /journal, /lab, … all declare the homepage as
    // their canonical, which tells Google they're duplicates of `/` and drops
    // them from the index. Each page sets its own self-referencing canonical
    // (relative paths resolve against `metadataBase` above). The homepage's
    // canonical lives in `app/page.tsx`.
    types: {
      "application/atom+xml": [
        { url: "/journal/feed.xml", title: "Studio Journal — Atom Feed" },
      ],
      "application/feed+json": [
        {
          url: "/api/feed.json",
          title: "Studio Combined Feed — JSON Feed v1.1",
        },
      ],
    },
  },
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
  // Search-engine + AI-engine verification meta tags. Read from env so
  // they stay out of source. If unset Next omits the tag (no-op).
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION ?? "",
      "yandex-verification": process.env.NEXT_PUBLIC_YANDEX_VERIFICATION ?? "",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} ${mono.variable} ${sacramento.variable}`}
    >
      <head>
        <JsonLd />
        {/* rel="me" verification chain. The fediverse, IndieAuth, and a number
            of identity engines walk these links to confirm that the same
            person controls every linked profile. The browser shows them as
            normal <link> tags; verifiers fetch them programmatically. The
            actual outbound profile must point back to this domain in its
            "Website" field for the chain to validate (already configured on
            GitHub, LinkedIn, and X). */}
        {site.socials.map((s) => (
          <link key={s.href} rel="me" href={s.href} />
        ))}
        <link rel="me" href={`mailto:${site.email}`} />
        <link rel="author" href="/humans.txt" type="text/plain" />
        <link rel="alternate" hrefLang="en" href={site.url} />
        <link rel="alternate" hrefLang="x-default" href={site.url} />
        <meta name="geo.region" content="BD-E" />
        <meta name="geo.placename" content={site.location} />
        <meta name="ICBM" content="25.0953, 89.0227" />
      </head>
      <body className="bg-ink-900 text-warmwhite font-sans antialiased selection:bg-peach selection:text-ink-900">
        <SkipToContent />
        <SmoothScrollProvider>
          <Preloader />
          <LazyChrome />
          <SoundProvider />
          <ClientOverlays />
          <Navbar />
          <RouteCurtain>
            <main id="main-content">{children}</main>
          </RouteCurtain>
          <MaskFooter>
            <Footer
              commitSha={process.env.VERCEL_GIT_COMMIT_SHA}
              buildTime={
                process.env.VERCEL_DEPLOYMENT_ID
                  ? new Date().toISOString().slice(0, 10)
                  : undefined
              }
            />
          </MaskFooter>
        </SmoothScrollProvider>
        <RumProbes />
      </body>
    </html>
  );
}
