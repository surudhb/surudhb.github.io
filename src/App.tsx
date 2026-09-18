import React, { useCallback, useRef, useEffect, useMemo, lazy, Suspense } from 'react'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from './components/navigation/Navbar'
import { HeroSection } from './components/sections/HeroSection'
import { AboutSection } from './components/sections/AboutSection'
import { ExperienceSection } from './components/sections/ExperienceSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { BlogSection } from './components/sections/BlogSection'
import { ExtrasSection } from './components/sections/ExtrasSection'
import { TronDiscCursor } from './components/ui/TronDiscCursor'
import { BoneCursor } from './components/ui/BoneCursor'
import { Footer } from './components/sections/Footer'
import { useActiveSection } from './hooks/useActiveSection'
import { useScrollY } from './hooks/useScrollY'

// Lazy-load canvas and HUD components — decorative, never needed for first paint
const StarfieldCanvas = lazy(() => import('./components/canvas/StarfieldCanvas').then(m => ({ default: m.StarfieldCanvas })))
const DinoRunnerCanvas = lazy(() => import('./components/canvas/DinoRunnerCanvas').then(m => ({ default: m.DinoRunnerCanvas })))
const CoordinatesHud = lazy(() => import('./components/telemetry/CoordinatesHud').then(m => ({ default: m.CoordinatesHud })))
const DinoScoreHud = lazy(() => import('./components/telemetry/DinoScoreHud').then(m => ({ default: m.DinoScoreHud })))

// Experience is placed above Projects as requested
const SECTION_IDS = ['home', 'about', 'experience', 'projects', 'blog', 'extras']

const AppContent: React.FC = () => {
  const { isLightMode } = useTheme()
  const activeSection = useActiveSection(SECTION_IDS)
  const scrollY = useScrollY()
  const scrollAnimationRef = useRef<number | null>(null)

  // Measure about section offset once on mount so we never read offsetTop in the hot path
  const aboutOffsetRef = useRef(0)
  useEffect(() => {
    const el = document.getElementById('about')
    if (el) aboutOffsetRef.current = el.offsetTop
  }, [])

  const isScrolledToAbout = useMemo(
    () => scrollY >= aboutOffsetRef.current - window.innerHeight * 0.65,
    [scrollY]
  )

  const handleNavigate = useCallback((sectionId: string) => {
    // Cancel any running programmatic scroll
    if (scrollAnimationRef.current !== null) {
      cancelAnimationFrame(scrollAnimationRef.current)
      scrollAnimationRef.current = null
    }

    let targetY = 0
    if (sectionId !== 'home') {
      const element = document.getElementById(sectionId)
      if (!element) return
      targetY = element.getBoundingClientRect().top + window.scrollY
    }

    const startY = window.scrollY
    const distance = targetY - startY

    // If already at destination, no-op
    if (Math.abs(distance) < 4) return

    // Comfortable, cinematic scroll duration:
    // Scale gently between ~850ms (short jumps) and ~1500ms (long cross-page jumps)
    const duration = Math.min(Math.max(650 + Math.pow(Math.abs(distance), 0.45) * 18, 850), 1500)
    let startTime: number | null = null

    // Smooth cubic ease-in-out curve for gentle start, readable cruising, and soft landing
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    const cleanup = () => {
      if (scrollAnimationRef.current !== null) {
        cancelAnimationFrame(scrollAnimationRef.current)
        scrollAnimationRef.current = null
      }
      window.removeEventListener('wheel', cancelOnUserInteraction)
      window.removeEventListener('touchmove', cancelOnUserInteraction)
      window.removeEventListener('keydown', cancelOnKeyInteraction)
    }

    const cancelOnUserInteraction = () => {
      cleanup()
    }

    const cancelOnKeyInteraction = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
        cleanup()
      }
    }

    window.addEventListener('wheel', cancelOnUserInteraction, { passive: true })
    window.addEventListener('touchmove', cancelOnUserInteraction, { passive: true })
    window.addEventListener('keydown', cancelOnKeyInteraction, { passive: true })

    const step = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = easeInOutCubic(progress)

      window.scrollTo(0, startY + distance * ease)

      if (progress < 1) {
        scrollAnimationRef.current = requestAnimationFrame(step)
      } else {
        cleanup()
      }
    }

    scrollAnimationRef.current = requestAnimationFrame(step)
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollAnimationRef.current !== null) {
        cancelAnimationFrame(scrollAnimationRef.current)
      }
    }
  }, [])

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
        className={`mobile-scrolled-bg-blur ${isScrolledToAbout ? 'active' : ''}`}
        aria-hidden="true"
      />

      {/* Viewport Perimeter Atmosphere Glow / Line Frame */}
      <div className="viewport-perimeter-glow" aria-hidden="true" />

      {/* Floating Minimal Navigation Bar */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Telemetry HUD — lazy loaded */}
      <Suspense fallback={null}>
        {isLightMode ? <DinoScoreHud /> : <CoordinatesHud />}
      </Suspense>

      {/* Main Single-Page Scroll Content */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <BlogSection />
        <ExtrasSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
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
