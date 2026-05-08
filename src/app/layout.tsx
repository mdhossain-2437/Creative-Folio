import type { Metadata, Viewport } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Cursor } from "@/components/ui/Cursor";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";
import { GridOverlay } from "@/components/ui/GridOverlay";
import { ScrollMeter } from "@/components/ui/ScrollMeter";
import { RouteCurtain } from "@/components/layout/RouteCurtain";
import { ShowreelPill } from "@/components/ui/ShowreelPill";
import { MaskFooter } from "@/components/ui/MaskFooter";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { ClientOverlays } from "@/components/layout/ClientOverlays";
import { SoundProvider } from "@/components/ui/SoundDesign";
import { CursorSpotlight } from "@/components/ui/CursorSpotlight";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Creative Developer · ${site.editionShort}`,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
  keywords: [
    "creative developer",
    "ui ux designer",
    "WebGL",
    "Three.js",
    "GSAP",
    "Next.js",
    "shaders",
    "Bangladesh",
    "Delowar Hossain",
    "delowarhossain.dev",
    "portfolio",
    "2027",
    "MMXXVII",
    "awwwards",
    "creative developer 2027",
    "future-stack portfolio",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.studio,
  applicationName: `${site.name} — ${site.editionShort}`,
  openGraph: {
    title: `${site.name} — Creative Developer · ${site.editionShort}`,
    description: site.tagline,
    type: "website",
    siteName: site.name,
    url: site.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@mdhossain2437",
    site: "@mdhossain2437",
    title: `${site.name} — Creative Developer · ${site.editionShort}`,
    description: site.tagline,
  },
  alternates: {
    canonical: site.url,
    types: {
      "application/atom+xml": [{ url: "/journal/feed.xml", title: "Studio Journal — Atom Feed" }],
      "application/feed+json": [{ url: "/api/feed.json", title: "Studio Combined Feed — JSON Feed v1.1" }],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body className="bg-ink-900 text-warmwhite font-sans antialiased selection:bg-peach selection:text-ink-900">
        <SkipToContent />
        <SmoothScrollProvider>
          <Preloader />
          <CursorSpotlight />
          <Cursor />
          <SoundProvider />
          <ClientOverlays />
          <GridOverlay />
          <ScrollMeter />
          <Navbar />
          <RouteCurtain>
            <main id="main-content">{children}</main>
          </RouteCurtain>
          <MaskFooter>
            <Footer
              commitSha={process.env.VERCEL_GIT_COMMIT_SHA}
              buildTime={process.env.VERCEL_DEPLOYMENT_ID ? new Date().toISOString().slice(0, 10) : undefined}
            />
          </MaskFooter>
          <ShowreelPill />
          <ScrollToTop />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
