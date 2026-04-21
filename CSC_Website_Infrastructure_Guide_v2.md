# CSC Website: Systems & Infrastructure Guide
## wucsclub.com
*Version 2.0 — Updated April 2026*

---

## 1. Executive Summary

This document outlines the foundational architecture of wucsclub.com. The project was initialized with a focus on Institutional Continuity. The primary goal is to ensure that no single individual owns the club's digital assets, preventing "knowledge silos" as committee members graduate. This guide also covers operational monitoring, error handling, and the complete annual handover protocol.

---

## 2. Core Identity & Ownership

### The "Shared Inbox" Philosophy

All third-party services (GitHub, Namecheap, Discord Developer Portal) are registered using the official CSC Shared Gmail/Inbox.

- **Primary Owner:** The shared inbox is the "Super Admin" for all services.
- **Committee Access:** Individual committee members are invited as "Admins" using their personal accounts (GitHub only).
- **Continuity Rule:** Never register club assets under a `.edu` student email or personal Gmail, as these accounts are eventually deactivated.

### Canonical Naming

The GitHub Organization name is **CSC-Webster-University**. This name must be used consistently across all documentation, README files, `CONTRIBUTING.md`, and internal references. Do not use alternate spellings.

---

## 3. Domain & DNS Management

- **Registrar:** Namecheap
- **Domain:** wucsclub.com

### DNS Configuration

- **A Records:** Pointed to GitHub's four IP addresses (`185.199.108.153` through `185.199.111.153`).
- **CNAME Record:** `www` points to the GitHub Organization URL (`CSC-Webster-University.github.io`).
- **SSL/HTTPS:** Managed automatically by GitHub Pages via Let's Encrypt.

### Domain Renewal

The wucsclub.com domain is a critical single point of failure. If it expires, the entire site goes offline.

- **Auto-Renew:** Must be enabled in Namecheap at all times. Verify annually during handover.
- **Payment Method:** The payment card on file must be verified as current during each annual handover.
- **Renewal Reminder:** Set a calendar reminder for 30 days before the renewal date, sent to the shared inbox.

> ⚠️ **An external SSL certificate was purchased by mistake during initial setup. Do NOT purchase external SSL certificates. GitHub Pages provides free SSL via Let's Encrypt. If the mistakenly purchased certificate has a recurring charge, cancel it.**

---

## 4. Hosting & Deployment Pipeline

- **Platform:** GitHub Pages (Settings > Pages > Build and deployment > Source: GitHub Actions)
- **Build Tool:** Vite (React + Tailwind CSS)

### Automation

- Located in `.github/workflows/deploy.yml`.
- Every push/merge to the `main` branch triggers a build.
- The build outputs to the `/dist` folder, which GitHub then hosts live.

### CI Pipeline Additions

The following checks run on every pull request:

- **JSON Schema Validation:** An `ajv`-based validation step checks `projects.json` against the defined schema. PRs with invalid JSON are automatically rejected.
- **Lighthouse CI (Recommended):** An optional but recommended GitHub Action that runs Lighthouse on the preview build and fails the PR if scores drop below thresholds (Performance ≥ 90, Accessibility ≥ 90).

---

## 5. Discord Integration

The website is designed to be "Zero-Maintenance" by pulling data directly from Discord.

- **Discord Bot:** "CSC Website Bot" (registered in the Discord Developer Portal under the shared inbox).
- **Secrets:** The `DISCORD_BOT_TOKEN` is stored in GitHub Repo Settings > Secrets. It is never hard-coded.
- **Webhooks:** A webhook connects GitHub to the `#git-log` Discord channel for real-time development activity updates.

### Sync Error Handling

The Discord sync GitHub Action (which runs every 6 hours) must follow these resilience rules:

- Wrap all Discord API calls in `try/catch` blocks.
- On API failure, preserve the existing `events.json`. Never overwrite with empty or partial data.
- Write a `lastUpdated` ISO 8601 timestamp to `events.json` on every successful sync.
- On failure, post an error notification to `#website-dev` via the existing GitHub webhook.
- If the bot token is expired or revoked, the action should fail gracefully and include the error in the webhook notification.

### UI Staleness Detection

The frontend must read the `lastUpdated` field from `events.json` on render. If the timestamp is older than 12 hours, display a subtle warning banner:

> "Event data may be outdated. Check Discord for the latest schedule."

---

## 6. Repository Governance (The Ruleset)

To maintain site integrity, the `main` branch is protected by a GitHub Ruleset:

- **No Direct Pushes:** All changes must come through a Pull Request (PR).
- **Peer Review:** At least one (1) approval is required from a committee member to merge code.
- **Linear History:** Merges should be clean to keep the project history readable for future developers.
- **CI Checks:** JSON schema validation must pass before a PR can be merged.

---

## 7. Architecture & Data Schemas

| Path | Purpose |
|---|---|
| `/src/data/events.json` | Populated automatically by the Discord Sync script. Includes a `lastUpdated` timestamp. |
| `/src/data/projects.json` | Populated by club members via Pull Requests. Validated by `ajv` in CI. |
| `/src/data/contributors.json` | Populated nightly by the contributor sync GitHub Action. Includes a `lastUpdated` timestamp. |
| `/public/CNAME` | Critical file containing only `wucsclub.com`. Without this, the custom domain breaks. |
| `/.github/workflows/deploy.yml` | Build and deployment pipeline triggered on push to `main`. |
| `/.github/workflows/sync-events.yml` | Discord event sync, runs every 6 hours with error handling. |
| `/CONTRIBUTING.md` | Contributor guide with Git-based and browser-based submission workflows. |

---

## 8. Analytics & Monitoring

### Site Analytics

A privacy-respecting analytics platform (Plausible, Umami, or equivalent) must be integrated before the public launch. Requirements:

- No cookies. No personally identifiable information collected.
- Dashboard accessible to all committee members via the shared inbox credentials or a shared link.
- Key metrics: unique visitors, page views by section, referral sources, device breakdown.

Analytics data helps the club demonstrate engagement to university administration for funding requests, event space reservations, and organizational recognition.

### Operational Monitoring

The `#website-dev` Discord channel serves as the operational notification channel. The following events should generate notifications:

- Successful deployments (already configured via GitHub webhook to `#git-log`).
- Discord sync failures (must be added to the sync GitHub Action).
- Contributor sync failures from `.github/workflows/sync-contributors.yml` (notifies `#website-dev` via the existing GitHub webhook on Action failure).
- Domain renewal reminders (calendar-based, sent to the shared inbox).

---

## 9. Annual Handover Protocol

At the end of every academic year, the outgoing President must complete the following checklist with the incoming President/Tech Lead.

### Access & Permissions

- Verify the incoming President has "Admin" access to the CSC-Webster-University GitHub Organization.
- Ensure the incoming Tech Lead has the login credentials for the Shared Inbox.
- Confirm the incoming team knows how to access the analytics dashboard.
- Confirm the `sync-contributors.yml` workflow has completed successfully within the last 14 days; re-run manually via `workflow_dispatch` if stale.

### Security

- Rotate the `DISCORD_BOT_TOKEN` if there are any security concerns during the transition.
- Remove GitHub Org access for any graduated members who are no longer active.
- Verify that "Enforce HTTPS" is still active in GitHub Pages settings.

### Domain & Billing

- Verify that auto-renew is enabled for wucsclub.com on Namecheap. **Capture a screenshot of the Namecheap auto-renew toggle and the next renewal date, and attach it to the handover meeting notes so verification is auditable rather than self-reported.**
- Confirm the payment method on file is current and will not expire before the next renewal.
- Check the domain expiration date and set a calendar reminder for 30 days prior.
- If the mistakenly purchased external SSL certificate has a recurring charge, verify it has been canceled.

### Documentation

- Walk the incoming team through this Infrastructure Guide.
- Verify that `CONTRIBUTING.md` is still accurate and up to date.
- Ensure the incoming team knows the location of all three governance documents (PRD, Implementation Plan, Infrastructure Guide).
