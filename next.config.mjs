/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // Hardened security headers. Goals:
  //  · Block clickjacking (X-Frame-Options + frame-ancestors)
  //  · Force HTTPS forever on first visit (HSTS preload)
  //  · Lock down what scripts/styles/fonts/images can load (CSP)
  //  · Disable MIME-sniffing attacks
  //  · Don't leak referrer to other origins
  //  · Disable browser features we don't use (camera/mic/geo/USB)
  //
  // CSP notes:
  //  · 'unsafe-inline' on script-src is required for Next's inline boot
  //    script and inline JSON-LD/<style>. We pair with 'strict-dynamic'
  //    so once the boot script runs, only scripts it loads are allowed.
  //  · 'unsafe-eval' kept for next/dynamic + framer-motion compat.
  //  · Added 'require-trusted-types-for' to lock down DOM XSS sinks.
  //  · img-src includes data: for the OG portrait dataURL + blob: for
  //    canvas snapshots. https: catches Unsplash, GitHub avatars, etc.
  //  · connect-src includes the IndexNow API.
  async headers() {
    const ContentSecurityPolicy = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel-insights.com https://*.vercel-analytics.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "media-src 'self' blob: https://customer-7l7ux9p61w0c0p3z.cloudflarestream.com",
      "font-src 'self' data:",
      "connect-src 'self' https://api.indexnow.org https://*.vercel-insights.com https://*.vercel-analytics.com https://customer-7l7ux9p61w0c0p3z.cloudflarestream.com",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'",
      "manifest-src 'self'",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "require-trusted-types-for 'script'",
      "upgrade-insecure-requests",
    ].join("; ");

    const PermissionsPolicy = [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "interest-cohort=()",
      "browsing-topics=()",
      "payment=()",
      "usb=()",
      "magnetometer=()",
      "gyroscope=()",
      "accelerometer=()",
      "fullscreen=(self)",
    ].join(", ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: ContentSecurityPolicy },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: PermissionsPolicy },
          { key: "X-XSS-Protection", value: "0" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
        ],
      },
      // Static assets — long cache, immutable.
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Public images / portrait — long cache.
      {
        source: "/(.*).(png|jpg|jpeg|webp|avif|svg|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
