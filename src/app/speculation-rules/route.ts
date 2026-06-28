import { NextResponse } from "next/server";

// Speculation Rules API
// Provides browser hints for prefetching/prerendering resources
// https://web.dev/speculation-rules/

export const runtime = "edge";

export function GET() {
  const rules = [
    {
      prefetch: [
        {
          source: "list",
          urls: ["/works", "/lab", "/journal", "/about", "/ai"],
        },
      ],
      prerender: [
        {
          source: "list",
          urls: ["/works", "/lab"],
          eagerness: "moderate",
        },
      ],
    },
  ];

  return NextResponse.json(rules, {
    headers: {
      "Content-Type": "application/speculationrules+json",
      "Cache-Control": "public, max-age=86400", // Cache for 24 hours
    },
  });
}
