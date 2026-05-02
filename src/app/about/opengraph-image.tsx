import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `About — ${site.name}`;
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
          <span>§ About</span>
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
            {site.role}
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
            {site.name}.
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
            Bridging editorial design and high-performance creative development. Based in {site.location}.
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
          <span>{site.url.replace(/^https?:\/\//, "")}/about</span>
          <span>{site.email}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
