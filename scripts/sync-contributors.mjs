// Fetches contributors for CSC-Webster-University/csc-website and writes them to
// src/data/contributors.json. Run nightly by .github/workflows/sync-contributors.yml.
//
// Resilience rules (match Infra Guide §5 / events.json convention):
//   - Per-request timeout so a hung API can't stall the job.
//   - Bounded retries with exponential backoff on 5xx / 429 / network errors.
//   - Honors Retry-After and X-RateLimit-Reset when present.
//   - Per-contributor schema validation (catches GitHub API drift).
//   - Refuses to overwrite a populated list with an empty one (set
//     ALLOW_EMPTY_SYNC=1|true|yes to override — e.g. when the repo truly
//     has no contributors yet).
//   - Refuses to overwrite a corrupt/unreadable existing file at all; the
//     missing-file case (ENOENT) is the only "no prior data" signal.
//   - Atomic write (tmp file + rename) so readers never see a half-written JSON.
//   - On any failure, exit non-zero WITHOUT touching the existing JSON file.
//   - Commit-step elsewhere (git diff --quiet) only commits when content changes.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OWNER = "CSC-Webster-University";
const REPO = "csc-website";

// Resolve the output path relative to this script file, not the current
// working directory. Keeps the script correct regardless of where it's
// invoked from (CI, repo root, or scripts/ itself).
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "..", "src", "data", "contributors.json");

const REQUEST_TIMEOUT_MS = 15_000;
const MAX_ATTEMPTS = 4;          // initial attempt + 3 retries
const BASE_BACKOFF_MS = 1_000;   // 1s → 2s → 4s → 8s, capped at MAX_BACKOFF_MS
const MAX_BACKOFF_MS = 30_000;

function authHeaders() {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": `${OWNER}-${REPO}-contributor-sync`,
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

function parseNext(linkHeader) {
  if (!linkHeader) return null;
  const next = linkHeader
    .split(",")
    .map((s) => s.trim())
    .find((s) => s.endsWith('rel="next"'));
  if (!next) return null;
  const match = next.match(/<([^>]+)>/);
  return match ? match[1] : null;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function isRetriableStatus(status) {
  // 408 Request Timeout, 429 Too Many Requests, and all 5xx are retriable.
  return status === 408 || status === 429 || (status >= 500 && status <= 599);
}

function isRetriableError(err) {
  // AbortError / TimeoutError = our own timeout fired.
  // TypeError is how undici (Node's fetch) surfaces network-level failures.
  // Inspect err.cause for the underlying OS code.
  const code = err?.code ?? err?.cause?.code;
  const transientCodes = new Set([
    "ECONNRESET",
    "ECONNREFUSED",
    "ENOTFOUND",
    "EAI_AGAIN",
    "ETIMEDOUT",
    "UND_ERR_SOCKET",
    "UND_ERR_CONNECT_TIMEOUT",
  ]);
  return (
    err?.name === "AbortError" ||
    err?.name === "TimeoutError" ||
    err instanceof TypeError ||
    transientCodes.has(code)
  );
}

/**
 * Compute ms to wait before the next attempt. Prefers server-provided hints
 * (Retry-After, X-RateLimit-Reset), falls back to exponential backoff + jitter.
 */
function computeBackoff(attempt, response) {
  if (response) {
    const retryAfter = response.headers.get("retry-after");
    if (retryAfter) {
      const asSeconds = Number(retryAfter);
      if (Number.isFinite(asSeconds)) {
        return Math.min(asSeconds * 1000, MAX_BACKOFF_MS);
      }
      const asDate = Date.parse(retryAfter);
      if (!Number.isNaN(asDate)) {
        return Math.max(0, Math.min(asDate - Date.now(), MAX_BACKOFF_MS));
      }
    }
    const remaining = response.headers.get("x-ratelimit-remaining");
    const reset = response.headers.get("x-ratelimit-reset");
    if (remaining === "0" && reset) {
      const resetMs = Number(reset) * 1000 - Date.now();
      if (Number.isFinite(resetMs) && resetMs > 0) {
        return Math.min(resetMs, MAX_BACKOFF_MS);
      }
    }
  }
  const base = Math.min(BASE_BACKOFF_MS * 2 ** attempt, MAX_BACKOFF_MS);
  const jitter = Math.floor(Math.random() * 250);
  return base + jitter;
}

/**
 * fetch() with per-request timeout and bounded retries on transient failures.
 * Throws a descriptive error after the final attempt.
 */
async function fetchWithRetry(url, headers) {
  let lastError;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const signal = AbortSignal.timeout(REQUEST_TIMEOUT_MS);
    try {
      const res = await fetch(url, { headers, signal });
      if (res.ok) return res;

      // Primary rate limit: 403 with X-RateLimit-Remaining: 0.
      if (res.status === 403) {
        const remaining = res.headers.get("x-ratelimit-remaining");
        if (remaining === "0") {
          const reset = res.headers.get("x-ratelimit-reset");
          const resetIso = reset
            ? new Date(Number(reset) * 1000).toISOString()
            : "unknown";
          console.error(
            `[sync-contributors] rate limit exhausted; resets at ${resetIso}`
          );
          if (attempt < MAX_ATTEMPTS - 1) {
            const wait = computeBackoff(attempt, res);
            console.error(`[sync-contributors] waiting ${wait}ms before retry...`);
            await sleep(wait);
            continue;
          }
        }
      }

      if (isRetriableStatus(res.status) && attempt < MAX_ATTEMPTS - 1) {
        const wait = computeBackoff(attempt, res);
        console.error(
          `[sync-contributors] ${res.status} ${res.statusText} on ${url}; retrying in ${wait}ms (attempt ${attempt + 1}/${MAX_ATTEMPTS})`
        );
        await sleep(wait);
        continue;
      }

      const body = await res.text().catch(() => "");
      throw new Error(
        `GitHub API ${res.status} ${res.statusText} on ${url} — ${body.slice(0, 200)}`
      );
    } catch (err) {
      lastError = err;
      if (isRetriableError(err) && attempt < MAX_ATTEMPTS - 1) {
        const wait = computeBackoff(attempt);
        console.error(
          `[sync-contributors] transient error "${err.message}"; retrying in ${wait}ms (attempt ${attempt + 1}/${MAX_ATTEMPTS})`
        );
        await sleep(wait);
        continue;
      }
      throw err;
    }
  }
  throw lastError ?? new Error("fetchWithRetry: exhausted attempts");
}

/**
 * Ensure every field the UI reads is present and correctly typed. Throws if
 * GitHub's response schema drifts, rather than writing `undefined` into the
 * JSON and silently breaking the Contributor Wall.
 */
function validateContributor(c) {
  const errors = [];
  if (typeof c.login !== "string" || !c.login) errors.push("login");
  if (typeof c.id !== "number") errors.push("id");
  if (typeof c.avatar_url !== "string" || !c.avatar_url) errors.push("avatar_url");
  if (typeof c.html_url !== "string" || !c.html_url) errors.push("html_url");
  if (typeof c.contributions !== "number") errors.push("contributions");
  if (errors.length) {
    throw new Error(
      `Contributor missing/invalid fields (${errors.join(", ")}): ${JSON.stringify(c).slice(0, 200)}`
    );
  }
  return {
    login: c.login,
    id: c.id,
    avatarUrl: c.avatar_url,
    htmlUrl: c.html_url,
    contributions: c.contributions,
  };
}

async function fetchAllContributors() {
  const headers = authHeaders();
  const results = [];
  let url = `https://api.github.com/repos/${OWNER}/${REPO}/contributors?per_page=100`;
  let pages = 0;

  while (url) {
    const res = await fetchWithRetry(url, headers);
    let batch;
    try {
      batch = await res.json();
    } catch (err) {
      throw new Error(`Malformed JSON from ${url}: ${err.message}`);
    }
    if (!Array.isArray(batch)) {
      throw new Error(`Unexpected response shape from ${url}`);
    }
    results.push(...batch);
    url = parseNext(res.headers.get("link"));
    pages += 1;
    if (pages > 50) {
      throw new Error("Pagination safety cap reached (>50 pages)");
    }
  }

  return results
    .filter((c) => c && c.type === "User")
    .map(validateContributor)
    .sort((a, b) => b.contributions - a.contributions);
}

/**
 * Returns the number of contributors in the existing JSON file.
 *   - ENOENT (no file yet) => 0, so first-ever runs aren't blocked.
 *   - Any other read/parse error => rethrow. Corrupt existing data must
 *     never silently map to 0; doing so would let a bad API-empty response
 *     overwrite real-but-unreadable data.
 */
async function readExistingContributorCount() {
  let raw;
  try {
    raw = await fs.readFile(OUT, "utf8");
  } catch (err) {
    if (err?.code === "ENOENT") return 0;
    throw new Error(
      `Unable to read existing ${OUT} (${err?.code ?? err?.name}): ${err?.message}`
    );
  }
  const parsed = JSON.parse(raw); // let SyntaxError bubble up
  return Array.isArray(parsed?.contributors) ? parsed.contributors.length : 0;
}

function isAllowEmptySyncEnabled() {
  const v = String(process.env.ALLOW_EMPTY_SYNC ?? "").trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}

/**
 * Atomic write: write to a sibling tmp file, then rename into place.
 * rename() is atomic on the same filesystem, so a reader will see either the
 * old file or the new file — never a half-written one. Cleans up the tmp
 * file on failure so we don't leak partial artifacts.
 */
async function writeAtomic(target, contents) {
  const tmp = `${target}.tmp-${process.pid}-${Date.now()}`;
  try {
    await fs.writeFile(tmp, contents, "utf8");
    await fs.rename(tmp, target);
  } catch (err) {
    await fs.rm(tmp, { force: true }).catch(() => {});
    throw err;
  }
}

async function main() {
  const contributors = await fetchAllContributors();

  // Refuse-to-write-empty guard: if we already had contributors on disk and
  // the API just returned none, this is almost certainly a transient issue
  // (repo temporarily privated, mis-scoped token, etc.). Fail loud so the
  // existing file is preserved. Set ALLOW_EMPTY_SYNC=1 to override.
  if (contributors.length === 0) {
    const existing = await readExistingContributorCount();
    if (existing > 0 && !isAllowEmptySyncEnabled()) {
      throw new Error(
        `Refusing to overwrite ${existing} existing contributors with an empty list. ` +
          `Set ALLOW_EMPTY_SYNC=1 (or true|yes) to override.`
      );
    }
  }

  const payload = {
    lastUpdated: new Date().toISOString(),
    source: `github.com/${OWNER}/${REPO}`,
    contributors,
  };
  await writeAtomic(OUT, JSON.stringify(payload, null, 2) + "\n");
  console.log(`Wrote ${contributors.length} contributors to ${OUT}`);
}

main().catch((err) => {
  // Preserve the existing file; do not overwrite with empty/partial data.
  console.error("[sync-contributors] FAILED — preserving existing file.");
  console.error(err?.stack || err);
  process.exit(1);
});
