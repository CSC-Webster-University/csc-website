import { useTheme } from '../hooks/useTheme';
import { cx } from '../utils/css';

/* ── Footer Link Data ─────────────────────────────────────────── */
const FOOTER_LINKS = [
  { label: 'Terminal',   href: '#' },
  { label: 'Repository', href: '#' },
  { label: 'Privacy',    href: '#' },
  { label: 'Logs',       href: '#' },
];

/**
 * Footer Component
 * 
 * Simple site-wide footer that renders the club logo, branding text,
 * and standard navigation utilities. Aware of dark/light theme contexts.
 * 
 * @returns {JSX.Element} The rendered Footer.
 */
export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const linkStyle = cx(
    "font-['Inter'] text-[10px] tracking-widest uppercase",
    'underline decoration-1 underline-offset-4',
    'transition-all duration-200',
    isDark ? 'text-[#c6c6c6] hover:text-[#ffffff]' : 'text-[#555555] hover:text-[#111111]'
  );

  return (
    <footer
      className={cx(
        'w-full border-t transition-colors duration-300',
        isDark ? 'border-[#474747]/20 bg-[#131313]' : 'border-[#d0d0d0]/40 bg-[#f0f0f0]'
      )}
    >
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 md:px-16 py-12 mx-auto max-w-7xl">

        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start gap-4 mb-8 md:mb-0">
          <div className="flex items-center gap-3">
            <img 
              src="https://se-images.campuslabs.com/clink/images/c58d1add-6028-48f5-bb52-a00c64a04123861d79fb-b356-4187-9cb5-2ba45e6a8a51.png?preset=med-sq" 
              alt="Webster CSC Logo" 
              className={cx(
                'w-8 h-8 object-contain rounded-sm transition-all duration-300',
                isDark ? 'grayscale opacity-80' : 'opacity-90'
              )}
            />
            <div
              className={cx(
                'text-lg font-bold font-headline tracking-tight transition-colors duration-300',
                isDark ? 'text-[#ffffff]' : 'text-[#111111]'
              )}
            >
              WEBSTER CS CLUB
            </div>
          </div>
          <div
            className={cx(
              "font-['Inter'] text-[10px] tracking-widest uppercase transition-colors duration-300",
              isDark ? 'text-[#c6c6c6]' : 'text-[#777777]'
            )}
          >
            © 2026 WEBSTER UNIVERSITY CSC. ALL RIGHTS RESERVED.
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="flex gap-8 md:gap-16">
          {FOOTER_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className={linkStyle}>
              {label}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
