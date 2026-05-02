import { ImageResponse } from "next/og";
import { experiments } from "@/lib/data";
import { site } from "@/lib/site";

export const alt = "Lab — The Compiled Thought";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const runtime = "edge";

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exp = experiments.find((e) => e.slug === slug);
  const title = exp?.title ?? "Lab";
  const summary = exp?.summary ?? "Open studio experiments.";
  const category = exp?.category ?? "Experiment";
  const index = exp?.index ?? "—";

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
              "radial-gradient(circle at 70% 30%, rgba(192,222,255,0.08), transparent 60%)",
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
          <span>§ {index} · The Lab</span>
          <span>{site.studio}</span>
        </div>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(247,196,159,0.85)",
              marginBottom: 24,
            }}
          >
            {category}
          </span>
          <h1
            style={{
              fontSize: 116,
              lineHeight: 0.95,
              fontWeight: 600,
              letterSpacing: -3,
              margin: 0,
              maxWidth: 1040,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: 28,
              lineHeight: 1.3,
              color: "rgba(244,241,236,0.7)",
              marginTop: 32,
              maxWidth: 1040,
            }}
          >
            {summary.length > 220 ? summary.slice(0, 217) + "…" : summary}
          </p>
        </div>

        <div
          style={{
            marginTop: 48,
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
          <span>{site.url.replace(/^https?:\/\//, "")}/lab/{slug}</span>
          <span>{site.name}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
