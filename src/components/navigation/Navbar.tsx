import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavbarProps {
  activeSection: string
  onNavigate: (sectionId: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isLightMode, setIsLightMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Experience placed above Projects as requested
  const navItems = [
    { id: 'home', label: 'HOME', num: '01' },
    { id: 'about', label: 'ABOUT', num: '02' },
    { id: 'experience', label: 'EXPERIENCE', num: '03' },
    { id: 'projects', label: 'PROJECTS', num: '04' },
    { id: 'blog', label: 'BLOG', num: '05' }
  ]

  // Laser bolt state machine for desktop underline
  const [laserState, setLaserState] = useState<{
    activeId: string
    departingId: string | null
    arrivingId: string | null
    direction: 'right' | 'left'
    inFlight: boolean
  }>({
    activeId: activeSection || 'home',
    departingId: null,
    arrivingId: null,
    direction: 'right',
    inFlight: false
  })

  const departTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const arriveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const programmaticNavTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const programmaticTargetRef = useRef<string | null>(null)
  const currentActiveIdRef = useRef<string>(activeSection || 'home')

  const clearAllTimers = () => {
    if (departTimerRef.current) clearTimeout(departTimerRef.current)
    if (arriveTimerRef.current) clearTimeout(arriveTimerRef.current)
    if (settleTimerRef.current) clearTimeout(settleTimerRef.current)
  }

  const startLaserBolt = useCallback((fromId: string, toId: string) => {
    if (fromId === toId) {
      currentActiveIdRef.current = toId
      setLaserState({
        activeId: toId,
        departingId: null,
        arrivingId: null,
        direction: 'right',
        inFlight: false
      })
      return
    }

    const fromIdx = navItems.findIndex((n) => n.id === fromId)
    const toIdx = navItems.findIndex((n) => n.id === toId)
    if (fromIdx === -1 || toIdx === -1) {
      currentActiveIdRef.current = toId
      setLaserState({
        activeId: toId,
        departingId: null,
        arrivingId: null,
        direction: 'right',
        inFlight: false
      })
      return
    }

    clearAllTimers()

    const direction: 'right' | 'left' = toIdx > fromIdx ? 'right' : 'left'
    const distance = Math.abs(toIdx - fromIdx)
    const gapDelay = Math.min(80, Math.max(50, distance * 50))
    const departDuration = 250
    const arriveDuration = 250

    // Phase 1: Departure begins immediately on fromId
    currentActiveIdRef.current = toId
    setLaserState({
      activeId: toId,
      departingId: fromId,
      arrivingId: null,
      direction,
      inFlight: false
    })

    // Phase 2: Departure finishes -> laser bolt in flight (completely gone from fromId)
    departTimerRef.current = setTimeout(() => {
      setLaserState({
        activeId: toId,
        departingId: null,
        arrivingId: null,
        direction,
        inFlight: true
      })

      // Phase 3: Laser bolt arrives at toId
      arriveTimerRef.current = setTimeout(() => {
        setLaserState({
          activeId: toId,
          departingId: null,
          arrivingId: toId,
          direction,
          inFlight: false
        })

        // Phase 4: Arrival completes -> settled
        settleTimerRef.current = setTimeout(() => {
          setLaserState({
            activeId: toId,
            departingId: null,
            arrivingId: null,
            direction,
            inFlight: false
          })
        }, arriveDuration)
      }, gapDelay)
    }, departDuration)
  }, [navItems])

  useEffect(() => {
    // If programmatic click navigation is in progress, ignore intermediate scroll events
    if (programmaticTargetRef.current) {
      if (activeSection === programmaticTargetRef.current) {
        programmaticTargetRef.current = null
        if (programmaticNavTimerRef.current) clearTimeout(programmaticNavTimerRef.current)
      }
      return
    }

    // Normal scroll-based section change
    if (activeSection && activeSection !== currentActiveIdRef.current) {
      startLaserBolt(currentActiveIdRef.current, activeSection)
    }
  }, [activeSection, startLaserBolt])

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      clearAllTimers()
      if (programmaticNavTimerRef.current) clearTimeout(programmaticNavTimerRef.current)
    }
  }, [])

  const handleDesktopNavClick = (sectionId: string) => {
    if (sectionId === currentActiveIdRef.current) return

    programmaticTargetRef.current = sectionId
    if (programmaticNavTimerRef.current) clearTimeout(programmaticNavTimerRef.current)
    programmaticNavTimerRef.current = setTimeout(() => {
      programmaticTargetRef.current = null
    }, 1200)

    startLaserBolt(currentActiveIdRef.current, sectionId)
    onNavigate(sectionId)
  }

  const handleResumeDownload = (e: React.MouseEvent) => {
    e.preventDefault()
    const link = document.createElement('a')
    link.href = '/surudh_bhutani_resume.pdf'
    link.download = 'surudh_bhutani_resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleMobileNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false)
    onNavigate(sectionId)
  }

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: 'clamp(1rem, 2.5vw, 1.75rem) clamp(1.25rem, 3.5vw, 2.5rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(180deg, rgba(7, 7, 9, 0.95) 0%, rgba(7, 7, 9, 0.75) 60%, rgba(7, 7, 9, 0) 100%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          pointerEvents: 'none'
        }}
      >
        {/* Mobile-Only Header Brand Indicator */}
        <div className="mobile-only" style={{ pointerEvents: 'auto', alignItems: 'center' }}>
          <button
            onClick={() => onNavigate('home')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.1em'
            }}
          >
            <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>+</span>
            <span>SB // SEC 04</span>
          </button>
        </div>

        {/* Desktop-Only Left Navigation Links */}
        <nav
          className="desktop-only"
          style={{
            alignItems: 'center',
            gap: '2.25rem',
            pointerEvents: 'auto'
          }}
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const isSelected = laserState.activeId === item.id
            const isDeparting = laserState.departingId === item.id
            const isArriving = laserState.arrivingId === item.id
            const isSettled = isSelected && !laserState.departingId && !laserState.arrivingId && !laserState.inFlight
            const isBright = isSelected || isDeparting

            return (
              <button
                key={item.id}
                onClick={() => handleDesktopNavClick(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: isBright ? '#ffffff' : 'var(--text-secondary)',
                  paddingBottom: '6px',
                  transition: 'color 180ms ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  if (!isBright) e.currentTarget.style.color = '#ffffff'
                }}
                onMouseLeave={(e) => {
                  if (!isBright) e.currentTarget.style.color = 'var(--text-secondary)'
                }}
              >
                {item.label}

                {/* Moving Laser Bolt Underline */}
                {(isSettled || isDeparting || isArriving) && (
                  <div className="nav-laser-track">
                    <div
                      className={`nav-laser-bolt ${
                        isSettled
                          ? 'settled'
                          : isDeparting
                          ? laserState.direction === 'right'
                            ? 'depart-right'
                            : 'depart-left'
                          : laserState.direction === 'right'
                          ? 'arrive-right'
                          : 'arrive-left'
                      }`}
                    />
                  </div>
                )}
              </button>
            )
          })}

          {/* Direct PDF Resume Download Link */}
          <button
            onClick={handleResumeDownload}
            title="Download Surudh Bhutani's Software Engineering Resume PDF"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: 'var(--text-secondary)',
              paddingBottom: '6px',
              transition: 'all 200ms ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            RESUME ↓
          </button>
        </nav>

        {/* Top Right Controls (Theme Switcher + Mobile Menu Toggle) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', pointerEvents: 'auto' }}>
          {/* Light/Dark Mode Switcher */}
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            title={isLightMode ? 'Switch to Dark Traversal' : 'Switch to Light Traversal (Upcoming)'}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '9999px',
              padding: '0.35rem 0.65rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#ffffff',
              transition: 'all 250ms ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
            }}
          >
            {isLightMode ? (
              <Sun size={15} color="#ffffff" />
            ) : (
              <Moon size={15} color="#ffffff" />
            )}
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.05em',
                color: 'var(--text-secondary)'
              }}
            >
              {isLightMode ? 'LIGHT' : 'DARK'}
            </span>
          </button>

          {/* Mobile Menu Hamburger Toggle (Visible ONLY on <= 768px) */}
          <div className="mobile-only">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isMobileMenuOpen}
              style={{
                background: isMobileMenuOpen ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '4px',
                padding: '0.4rem 0.65rem',
                minHeight: '38px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                color: '#ffffff',
                transition: 'all 200ms ease'
              }}
            >
              {isMobileMenuOpen ? <X size={17} color="#ffffff" /> : <Menu size={17} color="#ffffff" />}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                  fontWeight: 600
                }}
              >
                {isMobileMenuOpen ? 'CLOSE' : 'MENU'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer / Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              backgroundColor: '#070709',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '5.25rem 1.5rem 1.75rem 1.5rem',
              overflowY: 'auto'
            }}
          >
            {/* Top Telemetry Heading */}
            <div
              style={{
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '0.75rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)'
                }}
              >
                [ TRANSPONDER // SECTOR DIRECTORY ]
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-secondary)'
                }}
              >
                SEC 04
              </div>
            </div>

            {/* Nav Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.id
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * idx, duration: 0.18 }}
                    onClick={() => handleMobileNavClick(item.id)}
                    style={{
                      background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid',
                      borderColor: isActive ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.07)',
                      borderRadius: '4px',
                      padding: '0.85rem 1.15rem',
                      minHeight: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      cursor: 'pointer',
                      width: '100%',
                      transition: 'all 150ms ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          color: isActive ? '#ffffff' : 'var(--text-muted)'
                        }}
                      >
                        {item.num} //
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.15rem',
                          fontWeight: 700,
                          letterSpacing: '0.05em',
                          color: isActive ? '#ffffff' : 'var(--text-secondary)'
                        }}
                      >
                        {item.label}
                      </span>
                    </div>
                    {isActive && (
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          color: '#ffffff',
                          letterSpacing: '0.1em'
                        }}
                      >
                        [ACTIVE]
                      </span>
                    )}
                  </motion.button>
                )
              })}

              {/* Mobile Direct Resume Download Button */}
              <motion.button
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * 5, duration: 0.18 }}
                onClick={(e) => {
                  handleResumeDownload(e)
                  setIsMobileMenuOpen(false)
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                  padding: '0.85rem 1.15rem',
                  minHeight: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  cursor: 'pointer',
                  width: '100%',
                  marginTop: '0.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    06 //
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      color: '#ffffff'
                    }}
                  >
                    RESUME [PDF]
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)'
                  }}
                >
                  ↓
                </span>
              </motion.button>
            </div>

            {/* Bottom Drawer Telemetry & Close */}
            <div
              style={{
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '1rem',
                marginTop: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--text-muted)'
                }}
              >
                LAT 51.04° N // LON 114.07° W
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  color: 'var(--text-secondary)',
                  padding: '0.4rem 0.6rem'
                }}
              >
                [ CLOSE ✕ ]
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
