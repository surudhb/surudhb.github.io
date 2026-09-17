import React, { useCallback, useRef, useEffect } from 'react'
import { StarfieldCanvas } from './components/canvas/StarfieldCanvas'
import { Navbar } from './components/navigation/Navbar'
import { CoordinatesHud } from './components/telemetry/CoordinatesHud'
import { HeroSection } from './components/sections/HeroSection'
import { AboutSection } from './components/sections/AboutSection'
import { ExperienceSection } from './components/sections/ExperienceSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { BlogSection } from './components/sections/BlogSection'
import { ExtrasSection } from './components/sections/ExtrasSection'
import { TronDiscCursor } from './components/ui/TronDiscCursor'
import { Footer } from './components/sections/Footer'
import { useActiveSection } from './hooks/useActiveSection'

// Experience is placed above Projects as requested
const SECTION_IDS = ['home', 'about', 'experience', 'projects', 'blog', 'extras']

export const App: React.FC = () => {
  const activeSection = useActiveSection(SECTION_IDS)
  const scrollAnimationRef = useRef<number | null>(null)

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
      {/* Tron Legacy Rotating Identity Disc Cursor */}
      <TronDiscCursor />

      {/* Deep Space Background Canvas with Subtle Colored Stars & Long Trails */}
      <StarfieldCanvas />

      {/* Viewport Perimeter Atmosphere Glow (White Canopy Aura) */}
      <div className="viewport-perimeter-glow" aria-hidden="true" />

      {/* Floating Minimal Navigation Bar */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Dynamic Cursor-Driven Visitor Telemetry (Bottom Right) */}
      <CoordinatesHud />

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

export default App
