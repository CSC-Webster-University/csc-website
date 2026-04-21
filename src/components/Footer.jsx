import { useContributors, formatRelativeTime } from "../hooks/useContributors";

/**
 * Track 4 — Site Footer.
 *
 * Three rows:
 *   1. Brand + link list + social icons
 *   2. Webster University disclaimer (required by Track 4 brief)
 *   3. Muted tech strip with last contributor sync timestamp
 *
 * Solid colors only — no gradient text anywhere.
 * Analytics dashboard URL comes from VITE_ANALYTICS_URL (see .env.example).
 */
export default function Footer() {
  const { lastUpdated } = useContributors();
  const analyticsUrl = import.meta.env.VITE_ANALYTICS_URL || "";
  const analyticsEnabled = Boolean(analyticsUrl);
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full border-t border-white/10 bg-background-dark">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-10 md:px-10">
        {/* Row 1 — Brand, links, socials */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-start gap-3">
            <div
              aria-hidden="true"
              className="flex size-8 items-center justify-center rounded border border-neon-blue/30 bg-neon-blue/10 text-neon-blue"
            >
              <GamepadIcon />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold text-white">
                Webster CSC
              </span>
              <span className="font-mono text-[11px] text-slate-500">
                Built by students, for students.
              </span>
            </div>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2">
            <FooterLink href="https://involved.webster.edu/organization/csc" external>Involved</FooterLink>
            {/* CONTRIBUTING.md lives at the repo root, not under public/, so it
                isn't served by the Pages build. Link to the GitHub-hosted copy. */}
            <FooterLink
              href="https://github.com/CSC-Webster-University/csc-website/blob/main/CONTRIBUTING.md"
              external
            >
              Contribute
            </FooterLink>
            {/* Track 1 owns the Code of Conduct + Privacy sections. Render
                disabled until those anchors exist so we don't ship dead links. */}
            <FooterLink
              href={undefined}
              disabled
              title="Code of Conduct coming soon"
            >
              Code of Conduct
            </FooterLink>
            <FooterLink
              href={undefined}
              disabled
              title="Privacy notice coming soon"
            >
              Privacy
            </FooterLink>
            <FooterLink
              href={analyticsEnabled ? analyticsUrl : undefined}
              disabled={!analyticsEnabled}
              title={
                analyticsEnabled
                  ? "Open the site analytics dashboard"
                  : "Analytics dashboard URL not configured (set VITE_ANALYTICS_URL)"
              }
              external={analyticsEnabled}
            >
              Analytics
            </FooterLink>
          </nav>

          <ul role="list" className="flex items-center gap-4">
            <li>
              <SocialLink
                href="https://github.com/CSC-Webster-University/csc-website"
                label="Webster-CSC on GitHub"
                hoverClass="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              >
                <GithubIcon />
              </SocialLink>
            </li>
            <li>
              <SocialLink
                href="https://discord.gg/N9ySbXjwFz"
                label="Join the CSC Discord"
                hoverClass="hover:text-[#5865F2] hover:drop-shadow-[0_0_8px_#5865F2]"
              >
                <DiscordIcon />
              </SocialLink>
            </li>
            <li>
              <SocialLink
                href="https://www.instagram.com/webstercsclub/"
                label="CSC on Instagram"
                hoverClass="hover:text-pink-500 hover:drop-shadow-[0_0_8px_#ec4899]"
              >
                <InstagramIcon />
              </SocialLink>
            </li>
          </ul>
        </div>

        {/* Row 2 — University disclaimer */}
        <p className="mt-10 border-t border-white/5 pt-6 text-center text-xs leading-relaxed text-slate-500">
          The Computer Science Club is a Registered Student Organization at Webster
          University. This site and its content are maintained by club members and do
          not represent official Webster University communications. The Webster
          University name and marks are used with permission for student organization
          identification.
        </p>

        {/* Row 3 — Tech strip */}
        <div className="mt-6 flex flex-col items-center justify-center gap-2 font-mono text-[11px] text-slate-600 md:flex-row md:gap-4">
          <span>© {year} Webster CSC</span>
          <span aria-hidden="true" className="hidden md:inline">·</span>
          <span>wucsclub.com</span>
          <span aria-hidden="true" className="hidden md:inline">·</span>
          <span>Hosted on GitHub Pages</span>
          <span aria-hidden="true" className="hidden md:inline">·</span>
          <span>Last contributor sync: {formatRelativeTime(lastUpdated)}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children, disabled, external, title }) {
  const className =
    "text-sm font-medium text-slate-400 transition-colors hover:text-white focus:outline-none focus-visible:text-white focus-visible:underline decoration-neon-blue decoration-2 underline-offset-4";

  // Degrade gracefully to a disabled span if `href` is missing, rather than
  // rendering an anchor with no href (invisible dead link).
  if (disabled || !href) {
    return (
      <span
        aria-disabled="true"
        title={title}
        className="cursor-not-allowed text-sm font-medium text-slate-600"
      >
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      title={title}
      className={className}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  );
}

function SocialLink({ href, label, hoverClass, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex size-10 items-center justify-center rounded text-slate-500 transition-all hover:scale-110 focus:outline-none focus-visible:text-white focus-visible:ring-2 focus-visible:ring-neon-blue ${hoverClass}`}
    >
      {children}
    </a>
  );
}

/* --- Inline SVG icons (no external icon dependency) ------------------------ */

function GamepadIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M17 4H7a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5Zm-7 8H8v2H6v-2H4v-2h2V8h2v2h2v2Zm5 2a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm3-3a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.93c.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.3-.51-1.48.11-3.08 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.6.23 2.78.12 3.08.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.2.68.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M20.3 4.4A19.6 19.6 0 0 0 15.4 3l-.25.5a17 17 0 0 0-6.3 0L8.6 3a19.6 19.6 0 0 0-4.9 1.4A20.5 20.5 0 0 0 .2 17.3a19.9 19.9 0 0 0 6 3l.49-.67a13 13 0 0 1-2.04-.99l.5-.4a13.9 13.9 0 0 0 11.7 0l.5.4c-.65.4-1.34.74-2.04.99l.49.67a19.9 19.9 0 0 0 6-3 20.5 20.5 0 0 0-3.5-12.9ZM8.52 15.1a2.3 2.3 0 0 1-2.17-2.39c0-1.31.96-2.4 2.17-2.4 1.22 0 2.2 1.08 2.17 2.4 0 1.31-.95 2.39-2.17 2.39Zm6.96 0a2.3 2.3 0 0 1-2.17-2.39c0-1.31.96-2.4 2.17-2.4s2.19 1.08 2.17 2.4c0 1.31-.96 2.39-2.17 2.39Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
