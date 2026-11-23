import React, { useCallback, useEffect, lazy, Suspense } from 'react'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from './components/navigation/Navbar'
import { HeroSection } from './components/sections/HeroSection'
import { TronDiscCursor } from './components/ui/TronDiscCursor'
import { BoneCursor } from './components/ui/BoneCursor'
import { AboutPage } from './components/pages/AboutPage'
import { useRoute } from './hooks/useRoute'
import { GameModeProvider, useGameMode, loadRockField, loadDinoRun } from './context/GameModeContext'
import { PlayEgg } from './components/ui/PlayEgg'

// Lazy-load canvas and HUD components — decorative, never needed for first paint
const StarfieldCanvas = lazy(() => import('./components/canvas/StarfieldCanvas').then(m => ({ default: m.StarfieldCanvas })))
const DinoRunnerCanvas = lazy(() => import('./components/canvas/DinoRunnerCanvas').then(m => ({ default: m.DinoRunnerCanvas })))
const CoordinatesHud = lazy(() => import('./components/telemetry/CoordinatesHud').then(m => ({ default: m.CoordinatesHud })))
const DinoScoreHud = lazy(() => import('./components/telemetry/DinoScoreHud').then(m => ({ default: m.DinoScoreHud })))
// Games load only when the egg is hovered or clicked
const RockField = lazy(() => loadRockField().then(m => ({ default: m.RockField })))
const DinoRun = lazy(() => loadDinoRun().then(m => ({ default: m.DinoRun })))

const AppContent: React.FC = () => {
  const { isLightMode } = useTheme()
  const [route, navigate] = useRoute()
  const isHome = route === 'home'
  const { active: gameActive, kind: gameKind, exit: exitGame } = useGameMode()

  // Games live on the home screen only; leaving it ends the run.
  useEffect(() => {
    if (!isHome && gameActive) exitGame()
  }, [isHome, gameActive, exitGame])

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

      {/* Viewport Perimeter Atmosphere Glow / Line Frame */}
      <div className="viewport-perimeter-glow" aria-hidden="true" />

      {/* Everything except cursor and background. Fades away while a game runs,
          but stays mounted so nothing reflows or replays on return. */}
      <div className={`site-chrome${gameActive ? ' is-hidden' : ''}`} aria-hidden={gameActive || undefined} inert={gameActive}>

      {/* Mobile-only background blur layer when scrolled down to the About section or beyond */}
      <div
        className={`mobile-scrolled-bg-blur ${isHome ? '' : 'active'}`}
        aria-hidden="true"
      />

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

      {/* Egg in the bottom-left corner hides the Play button (desktop only) */}
      {isHome && <PlayEgg />}
      </div>

      {/* Game layer: transparent canvas over the live background */}
      <AnimatePresence>
        {gameActive && (
          <motion.div
            key="game-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            style={{ position: 'fixed', inset: 0, zIndex: 5 }}
          >
            <Suspense fallback={null}>
              {gameKind === 'space' ? <RockField /> : <DinoRun />}
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <GameModeProvider>
        <AppContent />
      </GameModeProvider>
    </ThemeProvider>
  )
}

export default App
