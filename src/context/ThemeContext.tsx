import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'

export type Theme = 'dark' | 'light'

export interface ThemeContextValue {
  theme: Theme
  isLightMode: boolean
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const STORAGE_KEY = 'surudh_theme_preference'

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark'
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'dark' || stored === 'light') return stored
    } catch {
      // Ignore localStorage access errors
    }
    return 'dark'
  })

  const isLightMode = theme === 'light'

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme)
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme)
    } catch {
      // Ignore storage errors
    }
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // Synchronize data-theme attribute on <html> and <meta name="theme-color">
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)

    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'light' ? '#f7f7f7' : '#070709')
    }

    if (typeof document !== 'undefined') {
      document.title = theme === 'light'
        ? 'Surudh Bhutani — Software Engineer 🌵 Technical Program Manager'
        : 'Surudh Bhutani — Software Engineer // Technical Program Manager'
    }

    // Lazily inject light-mode-only @font-face declarations on first switch to light.
    // These fonts are never fetched for dark-mode visitors.
    if (theme === 'light' && !document.getElementById('light-mode-fonts')) {
      const style = document.createElement('style')
      style.id = 'light-mode-fonts'
      style.textContent = `
        @font-face {
          font-family: 'Press Start 2P';
          font-weight: 400;
          font-style: normal;
          font-display: optional;
          src: url('/fonts/PressStart2P/PressStart2P-Regular.woff2') format('woff2');
        }
        @font-face {
          font-family: 'Silkscreen';
          font-weight: 400;
          font-style: normal;
          font-display: optional;
          src: url('/fonts/Silkscreen/Silkscreen-Regular.woff2') format('woff2');
        }
        @font-face {
          font-family: 'CavePainting';
          font-weight: 400;
          font-style: normal;
          font-display: optional;
          src: url('/fonts/CavePainting/CavePainting.woff2') format('woff2');
        }
      `
      document.head.appendChild(style)
    }
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      isLightMode,
      toggleTheme,
      setTheme
    }),
    [theme, isLightMode]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
