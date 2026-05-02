import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "Now — The current season · The Compiled Thought";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const runtime = "edge";

export default async function OG() {
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
              "radial-gradient(circle at 82% 28%, rgba(154,166,194,0.22), transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "#9aa6c2",
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
          <span>§ 07 — /now</span>
          <span>{site.studio}</span>
        </div>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#9aa6c2",
              marginBottom: 24,
            }}
          >
            Spring 2026 · Joypurhat, BD
          </span>
          <h1
            style={{
              fontSize: 132,
              lineHeight: 0.92,
              fontWeight: 600,
              letterSpacing: -3,
              margin: 0,
              maxWidth: 1040,
            }}
          >
            Now. The current season.
          </h1>
          <p
            style={{
              fontSize: 28,
              marginTop: 28,
              maxWidth: 920,
              color: "rgba(244,241,236,0.7)",
              lineHeight: 1.3,
            }}
          >
            What I&apos;m building, reading, and obsessing over right now. Updated monthly.
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
          <span>{site.url.replace(/^https?:\/\//, "")}/now</span>
          <span>{site.name}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
