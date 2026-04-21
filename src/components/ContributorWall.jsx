import { useContributors, formatRelativeTime } from "../hooks/useContributors";

/**
 * Track 4 — Contributor Wall (Wall of Fame).
 *
 * Renders GitHub contributors synced at build time by
 * .github/workflows/sync-contributors.yml. Hybrid visual system:
 *   - Theme: Event Center arcade/neon (solid colors only, no gradient text).
 *   - Layout: Contributor Wall Lab avatar grid (responsive 2→5 columns).
 */
export default function ContributorWall() {
  const { contributors, lastUpdated, totalCommits, topContributor, source } =
    useContributors();

  return (
    <section
      id="contributors"
      aria-labelledby="contributor-wall-heading"
      className="relative w-full bg-background-dark text-slate-100 py-20 px-4 md:px-10"
    >
      <div className="pointer-events-none absolute inset-0 arcade-grid opacity-80" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col gap-10">
        <header className="flex flex-col gap-4">
          <div className="inline-flex w-fit items-center gap-2 rounded-sm border border-neon-green/50 bg-black/40 px-3 py-1 shadow-[0_0_10px_rgba(0,255,0,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-neon-green">
              Wall of Fame
            </span>
          </div>

          <h2
            id="contributor-wall-heading"
            className="font-display text-4xl font-black leading-tight tracking-tight text-white md:text-5xl"
          >
            Built by <span className="text-neon-blue">Contributors</span>
          </h2>

          <p className="max-w-2xl border-l-2 border-neon-blue pl-4 font-mono text-sm text-slate-300 md:text-base">
            &gt; Every avatar below is a student who shipped code to wucsclub.com.
            <br />
            &gt; Synced from the Webster-CSC GitHub organization.
          </p>
        </header>

        <StatsStrip
          count={contributors.length}
          totalCommits={totalCommits}
          topLogin={topContributor?.login ?? "—"}
          lastUpdated={lastUpdated}
        />

        {contributors.length === 0 ? (
          <EmptyState source={source} />
        ) : (
          <ul
            role="list"
            className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          >
            {contributors.map((c) => (
              <li key={c.id} className="flex">
                <ContributorCard
                  contributor={c}
                  isTop={topContributor?.id === c.id}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function StatsStrip({ count, totalCommits, topLogin, lastUpdated }) {
  const tiles = [
    { label: "Contributors", value: String(count), accent: "text-neon-blue" },
    { label: "Total Commits", value: String(totalCommits), accent: "text-neon-pink" },
    { label: "Top Contributor", value: topLogin, accent: "text-neon-green" },
    {
      label: "Last Synced",
      value: formatRelativeTime(lastUpdated),
      accent: "text-slate-300",
    },
  ];

  return (
    <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {tiles.map((t) => (
        <div
          key={t.label}
          className="rounded-lg border border-white/10 bg-card-dark/80 p-4 backdrop-blur"
        >
          <dt className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {t.label}
          </dt>
          <dd
            className={`mt-1 truncate font-mono text-2xl font-bold ${t.accent}`}
            title={t.value}
          >
            {t.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function ContributorCard({ contributor, isTop }) {
  const { login, avatarUrl, htmlUrl, contributions } = contributor;
  const ringClass = isTop
    ? "ring-2 ring-neon-pink group-hover:shadow-neon-pink"
    : "ring-2 ring-neon-blue/60 group-hover:ring-neon-blue group-hover:shadow-neon-blue";

  return (
    <a
      href={htmlUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`GitHub profile for ${login}, ${contributions} commits`}
      className="contributor-card group relative flex w-full flex-col items-center focus:outline-none"
    >
      <div className="relative mb-4">
        <div
          className={`h-20 w-20 overflow-hidden rounded-full bg-slate-800 transition-all duration-300 group-hover:-translate-y-1 group-focus-visible:-translate-y-1 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background-dark ${ringClass}`}
        >
          <img
            src={avatarUrl}
            alt={`${login} avatar`}
            loading="lazy"
            width="80"
            height="80"
            className="h-full w-full object-cover"
          />
        </div>

        {isTop && (
          <span
            className="absolute -right-2 -top-2 rounded border-2 border-background-dark bg-neon-pink px-1.5 py-0.5 font-arcade text-[8px] uppercase tracking-wider text-black shadow-[0_0_10px_rgba(255,0,255,0.6)]"
            aria-label="Top contributor"
          >
            MVP
          </span>
        )}
      </div>

      <div className="w-full text-center">
        <h3 className="truncate px-2 text-sm font-bold text-slate-200 transition-colors group-hover:text-neon-blue group-focus-visible:text-neon-blue">
          @{login}
        </h3>
        <p className="mt-1 font-mono text-[10px] text-slate-500">
          {contributions} {contributions === 1 ? "commit" : "commits"}
        </p>
      </div>
    </a>
  );
}

const FALLBACK_REPO_URL =
  "https://github.com/CSC-Webster-University/csc-website";

function EmptyState({ source }) {
  // `source` is stored without a protocol in contributors.json, but:
  //   - guard against a future value that already includes one so we never
  //     produce a double-`https://` URL, and
  //   - guard against an empty / missing value so we never render a bare
  //     `https://` link that points nowhere.
  let href;
  if (!source) {
    href = FALLBACK_REPO_URL;
  } else if (/^https?:\/\//i.test(source)) {
    href = source;
  } else {
    href = `https://${source}`;
  }
  return (
    <div className="rounded-xl border border-white/10 bg-card-dark/60 p-10 text-center">
      <p className="font-display text-lg text-slate-200">Sync pending.</p>
      <p className="mt-2 font-mono text-sm text-slate-400">
        Contributors will appear here after the next scheduled build.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded border border-neon-blue/50 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-neon-blue transition-all hover:bg-neon-blue hover:text-black"
      >
        View repository on GitHub →
      </a>
    </div>
  );
}
