// Shared types for the /api/github edge function payload.

export type GitHubDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type GitHubEvent = {
  sha: string;
  repo: string;
  message: string;
  ago: string;
};

export type GitHubPayload = {
  user: {
    publicRepos: number;
    followers: number;
    following: number;
    totalStars: number;
  };
  events: GitHubEvent[];
  contributions: {
    total: number;
    days: GitHubDay[];
  };
  stale: boolean;
  source: "live" | "partial" | "cache";
  generatedAt: string;
};
