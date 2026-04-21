import data from "../data/contributors.json";

/**
 * Thin wrapper around the build-time-synced contributors.json.
 * The JSON is bundled at build time — no runtime fetch, no loading state.
 *
 * @returns {{
 *   contributors: Array<{
 *     login: string,
 *     id: number,
 *     avatarUrl: string,
 *     htmlUrl: string,
 *     contributions: number
 *   }>,
 *   lastUpdated: string | null,
 *   source: string,
 *   totalCommits: number,
 *   topContributor: {
 *     login: string,
 *     id: number,
 *     avatarUrl: string,
 *     htmlUrl: string,
 *     contributions: number
 *   } | null
 * }}
 */
export function useContributors() {
  const contributors = Array.isArray(data?.contributors) ? data.contributors : [];
  const totalCommits = contributors.reduce(
    (sum, c) => sum + (Number(c.contributions) || 0),
    0
  );
  const topContributor = contributors.length
    ? contributors.reduce((a, b) => (b.contributions > a.contributions ? b : a))
    : null;

  return {
    contributors,
    lastUpdated: data?.lastUpdated ?? null,
    source: data?.source ?? "github.com/CSC-Webster-University/csc-website",
    totalCommits,
    topContributor,
  };
}

/**
 * Human-readable "X ago" from an ISO 8601 timestamp.
 * Returns "never" when no timestamp is set (pre-first-sync).
 */
export function formatRelativeTime(iso) {
  if (!iso) return "never";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "never";
  const diffMs = Date.now() - then;
  // Clock skew or a future-dated timestamp would otherwise produce
  // nonsense like "-1y ago". Treat any non-past timestamp as current.
  if (diffMs < 0) return "just now";
  // Floor (not round) at every boundary: you need a full unit to tick over,
  // matching Intl.RelativeTimeFormat / "X ago" conventions.
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(months / 12);
  return `${years}y ago`;
}
