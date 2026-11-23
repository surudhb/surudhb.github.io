import React, { useCallback, useEffect, lazy, Suspense } from 'react'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { AnimatePresence, LazyMotion, m } from 'framer-motion'
import { Navbar } from './components/navigation/Navbar'
import { HeroSection } from './components/sections/HeroSection'
import { TronDiscCursor } from './components/ui/TronDiscCursor'
import { BoneCursor } from './components/ui/BoneCursor'
import { AboutPage } from './components/pages/AboutPage'
import { useRoute } from './hooks/useRoute'
import { GameModeProvider, useGameMode, loadRockField, loadDinoRun } from './context/GameModeContext'
import { PlayEgg } from './components/ui/PlayEgg'
import { SafeBoundary, reloadForStaleChunk } from './components/ui/SafeBoundary'

// Lazy-load canvas and HUD components — decorative, never needed for first paint
const StarfieldCanvas = lazy(() => import('./components/canvas/StarfieldCanvas').then(m => ({ default: m.StarfieldCanvas })))
const DinoRunnerCanvas = lazy(() => import('./components/canvas/DinoRunnerCanvas').then(m => ({ default: m.DinoRunnerCanvas })))
const CoordinatesHud = lazy(() => import('./components/telemetry/CoordinatesHud').then(m => ({ default: m.CoordinatesHud })))
const DinoScoreHud = lazy(() => import('./components/telemetry/DinoScoreHud').then(m => ({ default: m.DinoScoreHud })))
// Games load only when the egg is hovered or clicked
const RockField = lazy(() => loadRockField().then(m => ({ default: m.RockField })))
const DinoRun = lazy(() => loadDinoRun().then(m => ({ default: m.DinoRun })))

/** If a game fails to load or crashes, leave play mode so the site comes back. */
const ExitOnMount: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  useEffect(() => {
    onExit()
  }, [onExit])
  return null
}

// Animation features arrive in their own chunk; m.* components render their
// initial state until it lands. `strict` flags any full `motion.*` import that
// would pull the whole library back into the startup bundle.
// If the chunk can't load, m.* elements would stay at their hidden initial state,
// so reveal the content without animation rather than leave the page blank.
const loadMotionFeatures = () =>
  import('./motionFeatures')
    .then((mod) => mod.default)
    .catch(() => {
      if (!reloadForStaleChunk()) document.documentElement.classList.add('motion-failed')
      return new Promise<never>(() => {})
    })

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
        <m.div
          key={isLightMode ? 'canvas-light' : 'canvas-dark'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        >
          <SafeBoundary>
            <Suspense fallback={null}>
              {isLightMode ? <DinoRunnerCanvas /> : <StarfieldCanvas />}
            </Suspense>
          </SafeBoundary>
        </m.div>
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
      <SafeBoundary key={isLightMode ? 'hud-light' : 'hud-dark'}>
        <Suspense fallback={null}>
          {isLightMode ? <DinoScoreHud /> : <CoordinatesHud />}
        </Suspense>
      </SafeBoundary>

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
          <m.div
            key="game-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            style={{ position: 'fixed', inset: 0, zIndex: 5 }}
          >
            <SafeBoundary fallback={<ExitOnMount onExit={exitGame} />}>
              <Suspense fallback={null}>
                {gameKind === 'space' ? <RockField /> : <DinoRun />}
              </Suspense>
            </SafeBoundary>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const App: React.FC = () => {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <ThemeProvider>
        <GameModeProvider>
          <AppContent />
        </GameModeProvider>
      </ThemeProvider>
    </LazyMotion>
  )
}

export default App
