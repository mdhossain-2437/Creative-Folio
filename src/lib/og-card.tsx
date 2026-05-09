import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Shared edge-rendered OG card factory for primary routes.
//
// Every route's opengraph-image.tsx becomes a 5-line wrapper around
// `renderOgCard` so we get one consistent visual identity across every
// social share (Slack, Discord, Twitter, LinkedIn, iMessage, …) without
// reflowing 100 lines of JSX per page.
//
// The card layout matches /about/opengraph-image.tsx (the original):
//  - 6px peach top border
//  - radial peach glow on the bottom
//  - section label top-left, studio top-right
//  - peach uppercase eyebrow
//  - giant headline (defaults to `site.name`)
//  - body subline
//  - URL bottom-left, email bottom-right
//
// All callers must declare these route-segment exports themselves
// (alt / size / contentType / runtime) — Next.js inlines those at
// build time and they can't come from a helper.

export const OG_SIZE = { width: 1200, height: 630 } as const;

export type OgCardConfig = {
  /** "§ About", "§ Resume", "§ Studio · Now", … */
  section: string;
  /** The peach uppercase eyebrow above the title. Falls back to site.role. */
  eyebrow?: string;
  /** Giant headline. Falls back to `site.name`. */
  title?: string;
  /** Optional `.` punctuation after the title. Default true. */
  titlePeriod?: boolean;
  /** One- or two-line description shown below the title. */
  subtitle: string;
  /** Path shown bottom-left, e.g. "/resume". Defaults to "/". */
  path?: string;
};

export function renderOgCard(cfg: OgCardConfig): ImageResponse {
  const {
    section,
    eyebrow = site.role,
    title = site.name,
    titlePeriod = true,
    subtitle,
    path = "/",
  } = cfg;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#070708",
          color: "#f4f1ec",
          padding: 80,
          position: "relative",
          fontFamily: '"Inter", "Helvetica Neue", system-ui',
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 110%, rgba(227,191,180,0.28), transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "#e3bfb4",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(244,241,236,0.55)",
          }}
        >
          <span>{section}</span>
          <span>{site.studio}</span>
        </div>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#e3bfb4",
              marginBottom: 24,
            }}
          >
            {eyebrow}
          </span>
          <h1
            style={{
              fontSize: 144,
              lineHeight: 0.9,
              fontWeight: 600,
              letterSpacing: -4,
              margin: 0,
              maxWidth: 1040,
            }}
          >
            {title}
            {titlePeriod ? "." : ""}
          </h1>
          <p
            style={{
              fontSize: 30,
              marginTop: 28,
              maxWidth: 980,
              color: "rgba(244,241,236,0.72)",
              lineHeight: 1.3,
            }}
          >
            {subtitle}
          </p>
        </div>

        <div
          style={{
            marginTop: 56,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(244,241,236,0.55)",
            paddingTop: 32,
            borderTop: "1px solid rgba(244,241,236,0.12)",
          }}
        >
          <span>
            {site.url.replace(/^https?:\/\//, "")}
            {path === "/" ? "" : path}
          </span>
          <span>{site.email}</span>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
