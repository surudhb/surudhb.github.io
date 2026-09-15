import React, { useCallback } from 'react'
import { StarfieldCanvas } from './components/canvas/StarfieldCanvas'
import { Navbar } from './components/navigation/Navbar'
import { CoordinatesHud } from './components/telemetry/CoordinatesHud'
import { HeroSection } from './components/sections/HeroSection'
import { AboutSection } from './components/sections/AboutSection'
import { ExperienceSection } from './components/sections/ExperienceSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { BlogSection } from './components/sections/BlogSection'
import { Footer } from './components/sections/Footer'
import { useActiveSection } from './hooks/useActiveSection'

// Experience is placed above Projects as requested
const SECTION_IDS = ['home', 'about', 'experience', 'projects', 'blog']

export const App: React.FC = () => {
  const activeSection = useActiveSection(SECTION_IDS)

  const handleNavigate = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
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
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
