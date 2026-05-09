import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { site } from "@/lib/site";

// Homepage OG image — the social-share artwork that platforms (Twitter/X,
// LinkedIn, Discord, iMessage, Slack, Telegram, Facebook, WhatsApp) use
// when someone pastes a `delowarhossain.dev` link.
//
// Why this matters for branded-search SEO:
//   1. The portrait + name appear together in every social preview, which
//      reinforces the photo↔name association for Google's image index.
//   2. LinkedIn shows og:type=profile cards as Person entities — this is
//      the artwork that surfaces in those.
//   3. Knowledge-Panel image carousels prefer images that are explicitly
//      declared as `representativeOfPage` and that appear in OG tags.

export const alt = `${site.name} — Creative Developer & UI/UX Designer in ${site.location}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Node runtime so we can read the bundled portrait from disk at module
// init time. ImageResponse works on either runtime; node is safer here
// because edge tries to prerender at build time and fails when the
// production URL isn't reachable yet.
export const runtime = "nodejs";

// Inline the portrait as a data URL at module load. The 512x512 PNG
// (~256 KB → ~340 KB base64) is bundled once and reused for every
// request, so we don't depend on the CDN being reachable from the OG
// generator.
const portraitBuffer = readFileSync(
  join(process.cwd(), "public", "profile-og.png"),
);
const portraitDataUrl = `data:image/png;base64,${portraitBuffer.toString("base64")}`;

const ACCENT = "#e3bfb4";
const INK = "#070708";
const TEXT = "#f4f1ec";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: INK,
          color: TEXT,
          position: "relative",
          fontFamily: '"Inter", "Helvetica Neue", system-ui',
        }}
      >
        {/* Accent hairline */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: ACCENT,
          }}
        />
        {/* Soft radial glow upper-right */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 78% 22%, rgba(227,191,180,0.18), transparent 55%)",
          }}
        />

        {/* Left column — portrait */}
        <div
          style={{
            display: "flex",
            width: 470,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            padding: 56,
            position: "relative",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={portraitDataUrl}
            alt=""
            width={358}
            height={358}
            style={{
              width: 358,
              height: 358,
              objectFit: "cover",
              borderRadius: "50%",
              border: `2px solid ${ACCENT}`,
              boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
            }}
          />
        </div>

        {/* Right column — type lockup */}
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px 80px 80px 0",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: 28,
            }}
          >
            {`§ ${site.editionShort} · Portfolio`}
          </div>

          {/* Name */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 102,
              lineHeight: 0.92,
              fontWeight: 600,
              letterSpacing: -3,
              marginBottom: 28,
            }}
          >
            <span style={{ display: "flex" }}>Delowar</span>
            <span style={{ display: "flex", fontStyle: "italic", color: ACCENT }}>
              Hossain.
            </span>
          </div>

          {/* Role */}
          <div
            style={{
              display: "flex",
              fontSize: 26,
              lineHeight: 1.3,
              color: "rgba(244,241,236,0.75)",
              maxWidth: 560,
              marginBottom: 36,
            }}
          >
            Creative Developer & UI/UX Designer · WebGL · Three.js · GSAP · Next.js · AI integration.
          </div>

          {/* Footer row */}
          <div
            style={{
              display: "flex",
              marginTop: "auto",
              justifyContent: "space-between",
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(244,241,236,0.55)",
              paddingTop: 28,
              borderTop: "1px solid rgba(244,241,236,0.14)",
            }}
          >
            <span style={{ display: "flex" }}>{site.domain}</span>
            <span style={{ display: "flex" }}>{site.location}</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
