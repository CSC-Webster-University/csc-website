# CSC Website Implementation Plan
## wucsclub.com
*Version 2.0 — Updated April 2026*

---

This document outlines the execution strategy for the CSC Website. The infrastructure is live, and we are now moving into active development of the four core modules. Each team member will act as a Feature Lead, owning the design, logic, and documentation for their specific module.

---

## 1. Project Status & Timeline

### Phase 0: Infrastructure & Scaffolding (Completed)

- ✅ GitHub Organization Webster-CSC established.
- ✅ React/Vite boilerplate with Tailwind CSS pushed to main.
- ✅ Custom domain wucsclub.com configured with SSL/HTTPS.
- ✅ CI/CD Pipeline (GitHub Actions) active and deploying.
- ✅ Repository Rulesets enabled for branch protection.

### Phase 1: Feature Development Sprints (Current: Weeks 1–2)

**Goal:** Leads build out the functional logic and UI for their specific tracks.

**Deliverable:** Individual features ready for peer review via Pull Requests.

**New Requirement:** JSON schema validation (`ajv`) must be added to the CI pipeline during this phase. All `projects.json` modifications must pass automated validation before review.

### Phase 2: Integration & Final Polish (Week 3)

**Goal:** Connect all modules, fix cross-component styling issues, finalize Dark Mode, and integrate analytics.

**Deliverable:** A cohesive, fully functional production site ready for public announcement.

**New Requirement:** Privacy-respecting analytics (Plausible or Umami) must be configured and verified before the public launch.

---

## 2. The Four Cross-Functional Tracks

### Track 1: The Gateway Lead (Identity & Theme)

**Focus:** The "Face" of the club and the global theme engine.

#### UI/UX

Build the Hero section with a distinctive headline that reflects the club's personality. Avoid generic tech slogans. Build a responsive, sticky navigation bar.

#### Logic

Implement the Dark Mode Engine. This must detect system preferences via `prefers-color-scheme` and allow manual overrides stored in `localStorage`. The toggle state must persist across sessions.

#### Content

Draft the "About the Club" mission statement and ensure consistent typography across the site using the project's Tailwind configuration.

---

### Track 2: The Automator Lead (Event Center)

**Focus:** Real-time data sync with the Discord API, with built-in resilience.

#### Logic

Write the GitHub Action script that uses the `DISCORD_BOT_TOKEN` to fetch scheduled events and update `src/data/events.json`. The script must:

- Include `try/catch` error handling around all API calls.
- Never overwrite `events.json` with empty data on API failure.
- Write a `lastUpdated` ISO 8601 timestamp to `events.json` on every successful sync.
- Post error notifications to `#website-dev` via the existing GitHub webhook on failure.

#### UI/UX

Design the Event Card components to display flyers (Discord cover images), timestamps, and location data. Implement a staleness warning banner that appears if `lastUpdated` is older than 12 hours.

#### Ops

Document the process for rotating the Discord Bot Token in the repository secrets, including step-by-step instructions with screenshots.

---

### Track 3: The Curator Lead (Portfolio Hub)

**Focus:** Showcasing member work and managing submission data.

#### Data Logic

Finalize the `projects.json` schema. Build a filtering system so users can sort projects by tech stack tag (e.g., "AI", "Web", "Game Dev"). Filter state should be reflected in the URL query string.

#### Schema Validation

Integrate `ajv` (or equivalent JSON schema validator) into the CI pipeline via a GitHub Action step. PRs that modify `projects.json` must pass schema validation automatically.

- **Required fields:** `id`, `title`, `author`, `description`, `tags`

#### UI/UX

Design a clean project grid with "Demo" and "Source" buttons that appear on hover (desktop) or are always visible (mobile).

#### Ops

Write the `CONTRIBUTING.md` file documenting both the Git-based workflow and the browser-based alternative for members who are not yet comfortable with the command line. Include screenshots for both paths.

---

### Track 4: The Community Lead (Social Proof & Recognition)

**Focus:** The Contributor Wall and Footer ecosystem.

#### Logic

Use the GitHub Repository API to fetch the list of contributors. Dynamically render their avatars on the "Wall of Fame."

#### UI/UX

Design the Contributor Wall layout and the site Footer, including social icons, university disclaimers, and a link to the analytics dashboard.

#### Ops

Review the Systems & Infrastructure Guide to ensure all future committee handover steps are clear and documented. Verify the annual handover checklist includes domain renewal verification.

---

## 3. Team Sync & Governance

- **The Review Swap:** Every PR must be reviewed by a lead from a different track. No one merges their own code.
- **The "Main" Rule:** Since branch protection is active, all work must happen on feature branches (e.g., `feat/discord-events`).
- **Weekly Demos:** In the Discord `#website-dev` channel, share a screenshot or screen recording of your feature's progress every Friday.
- **Naming Convention:** Use the organization name **Webster-CSC** consistently across all documentation, README files, and references. Do not use alternate spellings.

---

## 4. Definition of Done (DoD)

- wucsclub.com is live and fully responsive on mobile (320px and up).
- Events sync automatically from Discord without manual code changes, with error handling and staleness detection.
- Every team member has at least 3 merged PRs (covering UI, Logic, and Documentation).
- The site meets Lighthouse thresholds: Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 85, SEO ≥ 85.
- JSON schema validation is enforced in CI for all `projects.json` changes.
- Privacy-respecting analytics are live and accessible to all committee members.
- `CONTRIBUTING.md` is published with both Git-based and browser-based submission workflows.
