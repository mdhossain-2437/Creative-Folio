import { ImageResponse } from "next/og";
import { works } from "@/lib/data";
import { site } from "@/lib/site";

export const alt = "Project — The Compiled Thought";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const runtime = "edge";

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  const title = work?.title ?? site.studio;
  const category = work?.category ?? "Selected Works";
  const year = work?.year ?? "—";
  const accent = work?.accent ?? "#e3bfb4";

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
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: accent,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08), transparent 55%)",
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
          <span>§ Selected Works</span>
          <span>{site.studio}</span>
        </div>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: accent,
              marginBottom: 24,
            }}
          >
            {category} · {year}
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
            {title}
          </h1>
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
          <span>{site.url.replace(/^https?:\/\//, "")}/works/{slug}</span>
          <span>{site.name}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
