// Server-only GitHub data fetcher. Consumed by:
//   - /api/github route (returns serialized payload over the wire)
//   - /now page (calls directly, no HTTP roundtrip)
//
// Auth (optional): set GITHUB_PAT in env to lift rate limit 60 → 5000 req/hr
// and unlock the GraphQL contributions calendar. Without a token, REST works
// for user/events; contributions falls back to a baked snapshot.
//
// Fallback contract: never throws. If GitHub is unreachable / rate-limited /
// timed out, returns the hardcoded snapshot with `stale: true`.
//
// IMPORTANT: server-only — only import from server components, route
// handlers, or other server-only modules. Reads process.env.GITHUB_PAT
// which must never reach the client bundle.

import { githubFallback } from "@/lib/data";
import type { GitHubDay, GitHubEvent, GitHubPayload } from "@/lib/github";

const USER = "mdhossain-2437";
const FETCH_TIMEOUT_MS = 4000;
const REVALIDATE_S = 1800; // 30 min

const FALLBACK_USER = {
  publicRepos: 42,
  followers: 67,
  following: 33,
  totalStars: 128,
};

function authHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "creative-folio-edge",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_PAT;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function safeFetch(url: string, init?: RequestInit): Promise<Response | null> {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, {
      ...init,
      signal: ctrl.signal,
      next: { revalidate: REVALIDATE_S },
    });
  } catch {
    return null;
  } finally {
    clearTimeout(id);
  }
}

function ago(ts: string): string {
  const diff = Math.max(0, Date.now() - new Date(ts).getTime());
  const m = Math.floor(diff / 60_000);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}

type GhUser = { public_repos?: number; followers?: number; following?: number };
type GhRepo = { stargazers_count?: number; fork?: boolean };
type GhPushPayload = { commits?: { sha: string; message: string }[] };
type GhEvent = {
  type: string;
  repo?: { name?: string };
  payload?: GhPushPayload;
  created_at: string;
};

async function fetchUser(): Promise<{
  user: GitHubPayload["user"];
  ok: boolean;
}> {
  const headers = authHeaders();
  const [userRes, reposRes] = await Promise.all([
    safeFetch(`https://api.github.com/users/${USER}`, { headers }),
    safeFetch(
      `https://api.github.com/users/${USER}/repos?per_page=100&type=owner&sort=updated`,
      { headers }
    ),
  ]);

  let publicRepos = FALLBACK_USER.publicRepos;
  let followers = FALLBACK_USER.followers;
  let following = FALLBACK_USER.following;
  let totalStars = FALLBACK_USER.totalStars;
  let ok = true;

  if (userRes && userRes.ok) {
    const j = (await userRes.json()) as GhUser;
    publicRepos = j.public_repos ?? publicRepos;
    followers = j.followers ?? followers;
    following = j.following ?? following;
  } else {
    ok = false;
  }

  if (reposRes && reposRes.ok) {
    const repos = (await reposRes.json()) as GhRepo[];
    totalStars = repos
      .filter((r) => !r.fork)
      .reduce((acc, r) => acc + (r.stargazers_count ?? 0), 0);
  } else {
    ok = false;
  }

  return { user: { publicRepos, followers, following, totalStars }, ok };
}

async function fetchEvents(): Promise<{ events: GitHubEvent[]; ok: boolean }> {
  const headers = authHeaders();
  const res = await safeFetch(
    `https://api.github.com/users/${USER}/events/public?per_page=20`,
    { headers }
  );
  if (!res || !res.ok) return { events: githubFallback, ok: false };
  const events = (await res.json()) as GhEvent[];
  const out: GitHubEvent[] = [];
  for (const ev of events) {
    if (ev.type !== "PushEvent") continue;
    const repo = ev.repo?.name?.split("/")[1] ?? "—";
    const commits = ev.payload?.commits ?? [];
    if (!commits.length) continue;
    const top = commits[commits.length - 1];
    out.push({
      sha: top.sha.slice(0, 6),
      repo,
      message: top.message.split("\n")[0],
      ago: ago(ev.created_at),
    });
    if (out.length >= 5) break;
  }
  return { events: out.length ? out : githubFallback, ok: out.length > 0 };
}

type GraphQLContribResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
              contributionLevel:
                | "NONE"
                | "FIRST_QUARTILE"
                | "SECOND_QUARTILE"
                | "THIRD_QUARTILE"
                | "FOURTH_QUARTILE";
            }[];
          }[];
        };
      };
    };
  };
};

const LEVEL_MAP: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

async function fetchContributionsGraphQL(): Promise<{
  contributions: GitHubPayload["contributions"];
  ok: boolean;
}> {
  const token = process.env.GITHUB_PAT;
  if (!token) return { contributions: { total: 0, days: [] }, ok: false };

  const query = `query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }`;

  const res = await safeFetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login: USER } }),
  });

  if (!res || !res.ok) return { contributions: { total: 0, days: [] }, ok: false };
  const j = (await res.json()) as GraphQLContribResponse;
  const cal = j.data?.user?.contributionsCollection?.contributionCalendar;
  if (!cal) return { contributions: { total: 0, days: [] }, ok: false };

  const days: GitHubDay[] = [];
  for (const week of cal.weeks) {
    for (const d of week.contributionDays) {
      days.push({
        date: d.date,
        count: d.contributionCount,
        level: LEVEL_MAP[d.contributionLevel] ?? 0,
      });
    }
  }
  return {
    contributions: { total: cal.totalContributions, days },
    ok: true,
  };
}

// Public REST fallback when no token is configured. Hits a community
// reverse proxy that scrapes the public contributions HTML.
async function fetchContributionsPublic(): Promise<{
  contributions: GitHubPayload["contributions"];
  ok: boolean;
}> {
  type ApiResponse = {
    total: { [year: string]: number };
    contributions: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[];
  };
  const res = await safeFetch(
    `https://github-contributions-api.jogruber.de/v4/${USER}?y=last`
  );
  if (!res || !res.ok) return { contributions: { total: 0, days: [] }, ok: false };
  const j = (await res.json()) as ApiResponse;
  const days: GitHubDay[] = j.contributions.map((d) => ({
    date: d.date,
    count: d.count,
    level: d.level,
  }));
  const total = days.reduce((acc, d) => acc + d.count, 0);
  return { contributions: { total, days }, ok: true };
}

export async function fetchGitHubData(): Promise<GitHubPayload> {
  const [u, e, cAuthed] = await Promise.all([
    fetchUser(),
    fetchEvents(),
    fetchContributionsGraphQL(),
  ]);

  // If GraphQL didn't return (no token / error), try the public proxy.
  const c = cAuthed.ok ? cAuthed : await fetchContributionsPublic();

  const allOk = u.ok && e.ok && c.ok;
  const allFailed = !u.ok && !e.ok && !c.ok;

  return {
    user: u.user,
    events: e.events,
    contributions: c.contributions,
    stale: allFailed,
    source: allOk ? "live" : allFailed ? "cache" : "partial",
    generatedAt: new Date().toISOString(),
  };
}
