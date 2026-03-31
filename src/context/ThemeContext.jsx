import { createContext, useState, useEffect, useCallback } from 'react';

export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
});

const STORAGE_KEY = 'csc-theme-preference';

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    // 1. Check localStorage for saved preference
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;

    // 2. Detect system preference
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    // 3. Default to dark
    return 'dark';
  });

  // Apply theme class to <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Listen for system preference changes (only if no manual override saved)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      const savedPref = localStorage.getItem(STORAGE_KEY);
      // Only auto-switch if user hasn't manually set a preference
      if (!savedPref) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setTheme = useCallback((mode) => {
    setThemeState(mode);
    localStorage.setItem(STORAGE_KEY, mode);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
