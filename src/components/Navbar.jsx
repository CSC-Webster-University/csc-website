import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../hooks/useTheme';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Tracks', href: '#tracks' },
  { label: 'Events', href: '#events' },
  { label: 'Join', href: '#join' },
];

export default function Navbar() {
  const { toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('About');

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Track active section
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''));
    const observers = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const match = NAV_LINKS.find((l) => l.href === `#${id}`);
            if (match) setActiveLink(match.label);
          }
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setIsMobileMenuOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleNavClick = (label) => {
    setActiveLink(label);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface-container-low/90 backdrop-blur-xl border-b border-outline-variant/20'
          : 'bg-surface-container-low/80 backdrop-blur-xl'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center w-full px-8 md:px-16 py-6 mx-auto max-w-[1440px]">
        {/* Brand */}
        <a
          href="#hero"
          className="text-2xl font-black tracking-tighter text-primary font-headline hover:opacity-80 transition-opacity"
        >
          CSC_PROTOCOL
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => handleNavClick(label)}
              className={`font-headline tracking-tight uppercase text-sm font-bold transition-colors duration-200 ${
                activeLink === label
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-6">
          <a
            href="https://discord.gg/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block font-headline tracking-tight uppercase text-sm font-bold px-6 py-2 terminal-gradient text-on-primary hover:opacity-90 transition-all duration-200 active:scale-[0.99]"
          >
            Connect
          </a>

          <button
            onClick={toggleTheme}
            className="material-symbols-outlined text-primary hover:bg-surface-container-high p-2 transition-all duration-200"
            aria-label="Toggle dark mode"
          >
            dark_mode
          </button>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 p-2"
            onClick={() => setIsMobileMenuOpen((p) => !p)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`block w-[18px] h-[2px] bg-primary transition-all duration-300 ${
                isMobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`block w-[18px] h-[2px] bg-primary transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-[18px] h-[2px] bg-primary transition-all duration-300 ${
                isMobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-background z-[-1] flex items-center justify-center transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => handleNavClick(label)}
              className={`font-headline text-3xl font-bold uppercase tracking-tight transition-colors ${
                activeLink === label ? 'text-primary' : 'text-secondary hover:text-primary'
              }`}
            >
              {label}
            </a>
          ))}
          <a
            href="https://discord.gg/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 font-headline tracking-tight uppercase text-sm font-bold px-8 py-3 terminal-gradient text-on-primary"
          >
            Connect
          </a>
        </div>
      </div>
    </nav>
  );
}
