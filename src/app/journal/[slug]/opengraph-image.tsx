import { ImageResponse } from "next/og";
import { journal } from "@/lib/data";
import { site } from "@/lib/site";

export const alt = "Journal — The Compiled Thought";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const runtime = "edge";

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = journal.find((j) => j.slug === slug);
  const title = post?.title ?? "Journal";
  const category = post?.category ?? "Notes";
  const date = post?.date ?? "";
  const readingTime = post?.readingTime ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0c0c10",
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
              "radial-gradient(circle at 18% 80%, rgba(247,196,159,0.18), transparent 55%)",
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
            color: "rgba(244,241,236,0.6)",
          }}
        >
          <span>§ Journal · {category}</span>
          <span>{site.studio}</span>
        </div>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(244,241,236,0.55)",
              marginBottom: 24,
            }}
          >
            {date} {readingTime ? `· ${readingTime}` : ""}
          </span>
          <h1
            style={{
              fontSize: 96,
              lineHeight: 1.02,
              fontWeight: 500,
              letterSpacing: -2,
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
          <span>{site.url.replace(/^https?:\/\//, "")}/journal/{slug}</span>
          <span>{site.name}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
