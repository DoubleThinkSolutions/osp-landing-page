'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark' | 'low-contrast' | 'low-contrast-dark' | 'blue-yellow' | 'green-magenta';
const THEME_STORAGE_KEY = 'app-theme';
export const THEME_CLASSES: ThemeMode[] = ['light', 'dark', 'low-contrast', 'low-contrast-dark', 'blue-yellow', 'green-magenta'];

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [isThemeApplied, setIsThemeApplied] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;
    const themeToApply = THEME_CLASSES.includes(savedTheme) ? savedTheme : 'light';
    
    setTheme(themeToApply);

    document.documentElement.classList.remove(...THEME_CLASSES);
    document.documentElement.classList.add(themeToApply);

    setIsThemeApplied(true);
  }, []);

  const changeTheme = (newTheme: ThemeMode) => {
    document.documentElement.classList.remove(...THEME_CLASSES);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    setTheme(newTheme);
  };

  if (!isThemeApplied) {
    return <div className="w-full min-h-screen bg-gray-700" aria-hidden="true" />;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}
