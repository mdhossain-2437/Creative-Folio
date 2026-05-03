// Edge function — single source of truth for GitHub stats consumed by
// StatusStrip (the GH pill), ContributionHeatmap (/now), and the recent
// commits list (/now).
//
// Auth (optional): set GITHUB_PAT in Vercel env vars to lift the rate limit
// from 60 → 5000 req/hr per IP and unlock the GraphQL contributions
// calendar. Without a token, REST works for user/events; contributions
// falls back to a community public proxy, then to a baked snapshot.

import { fetchGitHubData } from "@/lib/github-fetch";

export const runtime = "nodejs";
export const revalidate = 1800; // 30 minutes

export async function GET(): Promise<Response> {
  const payload = await fetchGitHubData();
  return new Response(JSON.stringify(payload), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control":
        "public, max-age=300, s-maxage=1800, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
