import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

/**
 * @typedef {Object} ThemeContextType
 * @property {'dark' | 'light'} theme - The currently active theme.
 * @property {() => void} toggleTheme - Function to flip the theme from dark to light or vice versa.
 * @property {(mode: 'dark' | 'light') => void} setTheme - Function to explicitly set a specific theme.
 */

/**
 * Custom hook to access and control the website's theme context.
 * Provides access to the current theme ('dark' or 'light') and methods to modify it.
 * MUST be used within a component wrapped by the `<ThemeProvider>`.
 * 
 * @returns {ThemeContextType} The theme state and control functions.
 * @throws {Error} If called outside of a ThemeProvider.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

