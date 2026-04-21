# Product Requirements Document (PRD)
## CSC Website — wucsclub.com
*Version 2.0 — Updated April 2026*

---

## 1. Project Overview

The CSC Website is the official digital hub for the Computer Science Club, hosted at wucsclub.com. It serves as the primary welcoming point for new students and a living portfolio for members. This is a collaborative open-source project designed to teach committee members professional software engineering workflows including Git, pull request reviews, CI/CD, and API integration.

---

## 2. Goals & Objectives

- **Professional Presence:** Establish wucsclub.com as the authoritative source for club information, with a distinctive identity that reflects the club's personality.
- **Zero-Maintenance Events:** Automate the event calendar via Discord API to ensure the site never appears inactive, with built-in monitoring for data freshness.
- **Member Advocacy:** Provide a high-quality, filterable portfolio platform for students to showcase their work to recruiters.
- **Institutional Memory:** Ensure the project is owned by the club's shared identity, not individual personal accounts.
- **Measurable Engagement:** Track site usage with a privacy-respecting analytics solution to demonstrate value to university administration for funding and resource requests.

---

## 3. Detailed Feature Specifications

### 3.1. Landing Page (The Welcome Mat)

#### Hero Section

High-impact typography with a headline and sub-headline that reflect the club's unique identity. Avoid generic tech slogans. The tone should convey what makes this club distinct: hands-on building, experimentation, and community.

- **Headline Example:** "Where Curiosity Compiles."
- **Sub-headline Example:** "A community for builders, breakers, and thinkers at Webster University."

#### Calls to Action

- **Primary CTA:** "Join our Discord" (link to Discord invite).
- **Secondary CTA:** "Register as Member" (link to Involved.Webster.edu).

#### About Section

Three-column layout highlighting Community, Projects, and Professional Development. Each column should include a Lucide icon, a short heading, and a two-sentence description.

---

### 3.2. Event Center (Discord Sync)

#### Automation Logic

A GitHub Action script runs every 6 hours. It calls the Discord `GET /guilds/{guild.id}/scheduled-events` endpoint. The script must include error handling for API failures (see Section 8: Error Handling & Monitoring).

#### Data Freshness

The `events.json` file must include a `lastUpdated` ISO 8601 timestamp written by the sync script on every successful run. The UI must read this timestamp and display a subtle warning banner if the data is older than 12 hours (e.g., "Event data may be outdated. Check Discord for the latest schedule.").

#### UI Components

- **Live/Upcoming:** A grid of cards showing the Flyer (cover image), Title, Date, and "Interested" count.
- **Past Events:** A smaller, muted gallery of past flyers to show club activity history.
- **Fallback:** If no events are scheduled, display: "Check back soon or join Discord for pop-up events!"

---

### 3.3. Student Portfolio Hub

#### The Grid

Responsive card layout using CSS Grid or Flexbox.

#### Card Anatomy

- Thumbnail image (screenshot of project).
- Project Title and Author Name.
- Tech Stack Tags (e.g., "React", "Python", "Unity").
- "Demo" and "Source" buttons.

#### Filtering System

Users must be able to filter the project grid by tech stack tag. Clicking a tag filters the view to only show projects with that tag. A "Show All" option resets the filter. The filter state should be reflected in the URL query string for shareability.

#### Data Schema (`src/data/projects.json`)

```json
{
  "id": "unique-id-123",
  "title": "Project Name",
  "author": "Student Name",
  "description": "Short 1-2 sentence pitch.",
  "tags": ["React", "Tailwind"],
  "demoUrl": "https://...",
  "repoUrl": "https://github.com/...",
  "imageUrl": "/assets/projects/screenshot.png"
}
```

#### Schema Validation

A JSON schema validator (`ajv` or similar) must be integrated into the CI pipeline. Pull requests that add or modify `projects.json` entries must pass schema validation automatically.

- **Required fields:** `id`, `title`, `author`, `description`, `tags`
- **Optional fields:** `demoUrl`, `repoUrl`, `imageUrl`

---

### 3.4. The Contributor Wall (The Lab)

#### Logic

Fetch contributor data from `GET /repos/{owner}/{repo}/contributors` via the GitHub API.

#### Display

A "Wall of Faces" featuring GitHub avatars. Hovering reveals the contributor's GitHub username and their number of contributions.

---

## 4. Technical Stack & Architecture

| Layer | Technology |
|---|---|
| **Frontend** | React (Vite) + Tailwind CSS |
| **Icons** | Lucide-React |
| **State Management** | React Context or Local State |
| **Hosting** | GitHub Pages |
| **Domain** | wucsclub.com (Namecheap, custom CNAME) |
| **CI/CD** | GitHub Actions (deploy.yml) |
| **Data Validation** | ajv (JSON Schema) in CI pipeline |
| **Analytics** | Plausible or Umami (privacy-respecting, no cookies) |

---

## 5. Organizational Continuity & Access Management

To prevent the "Graduation Bottleneck," the project must adhere to these ownership rules.

### 5.1. GitHub Organization

- The repository must be housed under the GitHub Organization **Webster-CSC** (github.com/Webster-CSC), not a personal account.
- The Primary Owner of the Organization must be the shared CSC Gmail/Inbox.

### 5.2. Credential Management

- **The Shared Inbox:** The club's official email account is the single source of truth. All recovery emails and 2FA backups for GitHub, Discord Bots, and Namecheap must point here.
- **Secret Storage:** API keys (Discord Bot Token) must be stored in GitHub Actions Secrets. Only Owner-level accounts (via the shared inbox) should have permission to view or rotate these secrets.
- **Handover Protocol:** During the final committee meeting of each academic year, the outgoing President must verify that the incoming President/Tech Lead has been added as an Admin to the GitHub Org, while the Shared Inbox remains the Super Owner.

### 5.3. Domain Renewal

The wucsclub.com domain is registered through Namecheap under the shared inbox. Auto-renew must be enabled. The annual handover checklist must include verification that auto-renew is active and payment information is current. Domain expiration would take the entire site offline.

---

## 6. Collaboration & Review Workflow

### 6.1. For Club Members (Contributors)

The primary workflow uses Git:

1. Fork the repo and clone locally.
2. Add project details to `projects.json` and upload an image to `public/assets/projects/`.
3. Open a Pull Request.
4. Wait for Committee Review.

#### Alternative: Browser-Based Submission

For members who are not yet comfortable with Git, the GitHub web UI provides an alternative path. Members can edit `projects.json` directly in the browser and open a pull request without using the command line. The `CONTRIBUTING.md` file must document both workflows with screenshots.

### 6.2. For Committee Members (Maintainers)

- **Technical Reviews:** Verify that JSON is valid (CI will enforce schema automatically), and that images are optimized and web-ready.
- **Content Reviews:** Ensure projects adhere to University code of conduct.
- **Merge Policy:** A PR requires 1 "Approve" vote from a Committee Member to merge.

---

## 7. Non-Functional Requirements

### 7.1. Performance & Accessibility

The site must meet the following Lighthouse score thresholds before launch and on every subsequent release:

| Category | Minimum Score |
|---|---|
| Performance | 90 |
| Accessibility | 90 |
| Best Practices | 85 |
| SEO | 85 |

### 7.2. Analytics

A privacy-respecting analytics solution (Plausible, Umami, or equivalent) must be integrated before public launch. The solution must not use cookies or collect personally identifiable information. Key metrics to track: unique visitors, page views by section, referral sources, and device breakdown. Analytics data should be accessible to all committee members via a shared dashboard.

### 7.3. Responsive Design

The site must be fully functional and visually polished on mobile devices (320px width and up), tablets, and desktops. All interactive elements must have touch-friendly tap targets of at least 44×44 pixels.

---

## 8. Error Handling & Monitoring

### 8.1. Discord Sync Resilience

- The GitHub Action must include `try/catch` logic around the Discord API call.
- On API failure, the action must not overwrite the existing `events.json` with empty data.
- The action should log errors and, if possible, post a notification to the `#website-dev` Discord channel via webhook.
- If the `DISCORD_BOT_TOKEN` is expired or revoked, the action should fail gracefully and alert maintainers.

### 8.2. Data Staleness Detection

The `events.json` file must include a `lastUpdated` timestamp. The UI must check this timestamp on render and display a warning banner if the data is older than 12 hours. This prevents the site from silently displaying outdated information.

---

## 9. Deployment Plan

1. **Repo Init:** Create the GitHub Org using the shared inbox.
2. **Vite Setup:** Initialize the project and deploy a "Coming Soon" page to wucsclub.com.
3. **Analytics Integration:** Set up the chosen analytics platform before public launch.
4. **Discord Integration:** Build the GitHub Action to fetch events, including error handling and the `lastUpdated` timestamp.
5. **Schema Validation:** Add `ajv`-based validation to the CI pipeline for `projects.json`.
6. **The "First PR" Event:** Host a workshop where committee members submit their profiles simultaneously to test the workflow.
