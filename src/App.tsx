import React, { useCallback, useEffect, lazy, Suspense } from 'react'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from './components/navigation/Navbar'
import { HeroSection } from './components/sections/HeroSection'
import { TronDiscCursor } from './components/ui/TronDiscCursor'
import { BoneCursor } from './components/ui/BoneCursor'
import { AboutPage } from './components/pages/AboutPage'
import { useRoute } from './hooks/useRoute'

// Lazy-load canvas and HUD components — decorative, never needed for first paint
const StarfieldCanvas = lazy(() => import('./components/canvas/StarfieldCanvas').then(m => ({ default: m.StarfieldCanvas })))
const DinoRunnerCanvas = lazy(() => import('./components/canvas/DinoRunnerCanvas').then(m => ({ default: m.DinoRunnerCanvas })))
const CoordinatesHud = lazy(() => import('./components/telemetry/CoordinatesHud').then(m => ({ default: m.CoordinatesHud })))
const DinoScoreHud = lazy(() => import('./components/telemetry/DinoScoreHud').then(m => ({ default: m.DinoScoreHud })))

const AppContent: React.FC = () => {
  const { isLightMode } = useTheme()
  const [route, navigate] = useRoute()
  const isHome = route === 'home'

  // Home is a single screen: lock page scroll there, release it on other pages.
  useEffect(() => {
    document.documentElement.classList.toggle('no-scroll', isHome)
    return () => document.documentElement.classList.remove('no-scroll')
  }, [isHome])

  const handleNavigate = useCallback((id: string) => {
    if (id === 'home' || id === 'about') navigate(id)
  }, [navigate])

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Dynamic Cursor */}
      {isLightMode ? <BoneCursor /> : <TronDiscCursor />}

      {/* Canvas background — lazy loaded, fades in to avoid pop-in.
          AnimatePresence cross-fades when theme switches. */}
      <AnimatePresence mode="sync">
        <motion.div
          key={isLightMode ? 'canvas-light' : 'canvas-dark'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        >
          <Suspense fallback={null}>
            {isLightMode ? <DinoRunnerCanvas /> : <StarfieldCanvas />}
          </Suspense>
        </motion.div>
      </AnimatePresence>

      {/* Mobile-only background blur layer when scrolled down to the About section or beyond */}
      <div
        className={`mobile-scrolled-bg-blur ${isHome ? '' : 'active'}`}
        aria-hidden="true"
      />

      {/* Viewport Perimeter Atmosphere Glow / Line Frame */}
      <div className="viewport-perimeter-glow" aria-hidden="true" />

      {/* Floating Minimal Navigation Bar */}
      <Navbar activeSection={route} onNavigate={handleNavigate} />

      {/* Telemetry HUD — lazy loaded */}
      <Suspense fallback={null}>
        {isLightMode ? <DinoScoreHud /> : <CoordinatesHud />}
      </Suspense>

      {/* Page content: home is the hero only; about lives at /about-me */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        {isHome ? <HeroSection onNavigate={handleNavigate} /> : <AboutPage />}
      </main>
    </div>
  )
}

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
