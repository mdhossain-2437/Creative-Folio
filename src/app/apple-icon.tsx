import { ImageResponse } from "next/og";

// Apple touch icon — the home-screen mark for iOS/iPadOS when someone
// "Add to Home Screen"s the site. Next serves this from /apple-icon
// automatically via the file convention. The peach diamond + ink "D"
// mirrors src/app/icon.svg so the favicon and the touch icon read as
// one mark.

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const runtime = "edge";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#070708",
          position: "relative",
        }}
      >
        {/* soft peach glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 38%, rgba(227,191,180,0.22), transparent 62%)",
          }}
        />
        {/* the 45° peach diamond */}
        <div
          style={{
            position: "absolute",
            width: 118,
            height: 118,
            background: "#e3bfb4",
            transform: "rotate(45deg)",
            display: "flex",
          }}
        />
        {/* knockout monogram */}
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 600,
            lineHeight: 1,
            color: "#070708",
            fontFamily: 'Georgia, "Times New Roman", serif',
            marginTop: -4,
          }}
        >
          D
        </div>
      </div>
    ),
    { ...size },
  );
}
