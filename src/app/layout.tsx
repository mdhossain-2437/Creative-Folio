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
import { PageTransition } from "@/components/layout/PageTransition";
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
    default: `${site.name} — Creative Developer`,
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
    "portfolio",
  ],
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    title: `${site.name} — Creative Developer`,
    description: site.tagline,
    type: "website",
    siteName: site.name,
    url: site.url,
  },
  twitter: { card: "summary_large_image", creator: "@mdhossain2437" },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${inter.variable} ${mono.variable}`}>
      <body className="bg-ink-900 text-warmwhite font-sans antialiased selection:bg-peach selection:text-ink-900">
        <SmoothScrollProvider>
          <Preloader />
          <Cursor />
          <GridOverlay />
          <ScrollMeter />
          <Navbar />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
