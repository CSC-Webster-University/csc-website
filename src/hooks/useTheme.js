import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

/**
 * Custom hook to access the theme context.
 * Returns { theme, toggleTheme, setTheme }
 *
 * - theme: 'dark' | 'light'
 * - toggleTheme(): switches between dark and light
 * - setTheme(mode): explicitly set 'dark' or 'light'
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
