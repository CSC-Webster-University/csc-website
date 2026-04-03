import { useTheme } from '../hooks/useTheme';
import { cx } from '../utils/css';

/* ── Navigation Links ─────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'About', href: '#about', isActive: true },
  { label: 'Tracks', href: '#tracks', isActive: false },
  { label: 'Events', href: '#events', isActive: false },
  { label: 'Join', href: '#join', isActive: false },
];

/**
 * Navbar Component
 * 
 * Renders the top navigation bar, which stays fixed at the top of the viewport.
 * Dynamically responds to the current theme (dark or light mode).
 * Includes the logo, navigation anchors, a "Connect" CTA, and the theme toggle icon.
 * 
 * @returns {JSX.Element} The rendered navigation bar.
 */
export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  /* ── Dynamic Shared Styles ───────────────────────────────────── */
  const linkBase = "font-['Inter'] tracking-widest uppercase text-[13px] font-bold transition-colors duration-300";
  
  const linkActive = cx(
    linkBase,
    isDark ? 'text-[#ffffff] border-[#ffffff]' : 'text-[#111111] border-[#111111]',
    'border-b-[2px] pb-1'
  );

  const linkInactive = cx(
    linkBase,
    isDark ? 'text-[#888888] hover:text-[#ffffff]' : 'text-[#777777] hover:text-[#111111]'
  );

  return (
    <nav
      className={cx(
        'fixed top-0 w-full z-50 flex items-center border-b transition-colors duration-300',
        isDark ? 'bg-[#111111] border-[#222222]/50' : 'bg-[#f5f5f5] border-[#d0d0d0]/60'
      )}
      style={{ minHeight: '90px' }}
    >
      <div className="flex justify-between items-center w-full px-8 md:px-12 mx-auto max-w-[1600px]">

        {/* Logo */}
        <div
          className={cx(
            'text-lg md:text-xl font-bold tracking-tight font-headline transition-colors duration-300',
            isDark ? 'text-[#ffffff]' : 'text-[#111111]'
          )}
          style={{ marginLeft: '3vw' }}
        >
          WEBSTER_CSC
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-8 lg:gap-14">
          {NAV_LINKS.map(({ label, href, isActive }) => (
            <a
              key={href}
              href={href}
              className={isActive ? linkActive : linkInactive}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Actions Container */}
        <div className="flex items-center gap-10" style={{ marginRight: '4vw' }}>
          
          <a
            href="https://discord.gg/tTnSqwCWH7"
            target="_blank"
            rel="noopener noreferrer"
            className={cx(
              'hidden md:flex items-center justify-center',
              "font-['Inter'] tracking-widest uppercase text-[12px] font-bold",
              'min-w-[100px] min-h-[48px]',
              'hover:opacity-90 transition-all duration-300',
              isDark
                ? 'text-black bg-gradient-to-b from-[#ffffff] to-[#e0e0e0]'
                : 'text-white bg-gradient-to-b from-[#222222] to-[#111111]'
            )}
          >
            Connect
          </a>

          <button
            onClick={toggleTheme}
            className={cx(
              'material-symbols-outlined text-[20px] hover:opacity-80 transition-all duration-300',
              isDark ? 'text-[#ffffff]' : 'text-[#111111]'
            )}
            aria-label="Toggle Theme"
            title="Toggle theme"
          >
            {isDark ? 'dark_mode' : 'light_mode'}
          </button>

        </div>

      </div>
    </nav>
  );
}
