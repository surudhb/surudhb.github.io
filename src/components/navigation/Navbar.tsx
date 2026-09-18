import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { CactusIcon } from '../ui/CactusIcon'
import { useScrollY } from '../../hooks/useScrollY'
import { NavLaserBolt } from './NavLaserBolt'
import { NavMobileDrawer } from './NavMobileDrawer'

interface NavbarProps {
  activeSection: string
  onNavigate: (sectionId: string) => void
}

const NAV_ITEMS = [
  { id: 'home',       label: 'HOME',       num: '01' },
  { id: 'about',      label: 'ABOUT',      num: '02' },
  { id: 'experience', label: 'EXPERIENCE', num: '03' },
  { id: 'projects',   label: 'PROJECTS',   num: '04' },
  { id: 'blog',       label: 'BLOG',       num: '05' },
  { id: 'extras',     label: 'EXTRAS',     num: '06' },
]

interface LaserState {
  activeId: string
  departingId: string | null
  arrivingId: string | null
  direction: 'right' | 'left'
  inFlight: boolean
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const { isLightMode, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [laserState, setLaserState] = useState<LaserState>({
    activeId: activeSection || 'home',
    departingId: null,
    arrivingId: null,
    direction: 'right',
    inFlight: false,
  })

  const departTimerRef          = useRef<ReturnType<typeof setTimeout> | null>(null)
  const arriveTimerRef          = useRef<ReturnType<typeof setTimeout> | null>(null)
  const settleTimerRef          = useRef<ReturnType<typeof setTimeout> | null>(null)
  const programmaticNavTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const programmaticTargetRef   = useRef<string | null>(null)
  const currentActiveIdRef      = useRef<string>(activeSection || 'home')

  const clearAllTimers = () => {
    if (departTimerRef.current)  clearTimeout(departTimerRef.current)
    if (arriveTimerRef.current)  clearTimeout(arriveTimerRef.current)
    if (settleTimerRef.current)  clearTimeout(settleTimerRef.current)
  }

  const startLaserBolt = useCallback((fromId: string, toId: string) => {
    if (fromId === toId) {
      currentActiveIdRef.current = toId
      setLaserState({ activeId: toId, departingId: null, arrivingId: null, direction: 'right', inFlight: false })
      return
    }

    const fromIdx = NAV_ITEMS.findIndex(n => n.id === fromId)
    const toIdx   = NAV_ITEMS.findIndex(n => n.id === toId)
    if (fromIdx === -1 || toIdx === -1) {
      currentActiveIdRef.current = toId
      setLaserState({ activeId: toId, departingId: null, arrivingId: null, direction: 'right', inFlight: false })
      return
    }

    clearAllTimers()

    const direction: 'right' | 'left' = toIdx > fromIdx ? 'right' : 'left'
    const distance      = Math.abs(toIdx - fromIdx)
    const gapDelay      = Math.min(80, Math.max(50, distance * 50))
    const departDuration = 250
    const arriveDuration = 250

    currentActiveIdRef.current = toId
    setLaserState({ activeId: toId, departingId: fromId, arrivingId: null, direction, inFlight: false })

    departTimerRef.current = setTimeout(() => {
      setLaserState({ activeId: toId, departingId: null, arrivingId: null, direction, inFlight: true })

      arriveTimerRef.current = setTimeout(() => {
        setLaserState({ activeId: toId, departingId: null, arrivingId: toId, direction, inFlight: false })

        settleTimerRef.current = setTimeout(() => {
          setLaserState({ activeId: toId, departingId: null, arrivingId: null, direction, inFlight: false })
        }, arriveDuration)
      }, gapDelay)
    }, departDuration)
  }, [])

  useEffect(() => {
    if (programmaticTargetRef.current) {
      if (activeSection === programmaticTargetRef.current) {
        programmaticTargetRef.current = null
        if (programmaticNavTimerRef.current) clearTimeout(programmaticNavTimerRef.current)
      }
      return
    }
    if (activeSection && activeSection !== currentActiveIdRef.current) {
      startLaserBolt(currentActiveIdRef.current, activeSection)
    }
  }, [activeSection, startLaserBolt])

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
    programmaticNavTimerRef.current = setTimeout(() => { programmaticTargetRef.current = null }, 1800)
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

  const [isBlurred, setIsBlurred] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)
  const scrollY = useScrollY()

  useEffect(() => {
    const nameEl   = document.getElementById('hero-name-heading')
    const headerEl = headerRef.current
    if (nameEl && headerEl) {
      setIsBlurred(nameEl.getBoundingClientRect().top <= headerEl.getBoundingClientRect().bottom)
    } else if (nameEl) {
      setIsBlurred(nameEl.getBoundingClientRect().top <= 75)
    } else {
      setIsBlurred(scrollY > 250)
    }
  }, [scrollY])

  return (
    <>
      <header
        ref={headerRef}
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
          background: isBlurred
            ? isLightMode
              ? 'linear-gradient(180deg, rgba(247, 247, 247, 0.96) 0%, rgba(247, 247, 247, 0.85) 60%, rgba(247, 247, 247, 0) 100%)'
              : 'linear-gradient(180deg, rgba(7, 7, 9, 0.95) 0%, rgba(7, 7, 9, 0.75) 60%, rgba(7, 7, 9, 0) 100%)'
            : 'transparent',
          backdropFilter: isBlurred ? 'blur(8px)' : 'none',
          WebkitBackdropFilter: isBlurred ? 'blur(8px)' : 'none',
          transition: 'background 280ms ease, backdrop-filter 280ms ease, -webkit-backdrop-filter 280ms ease',
          pointerEvents: 'none'
        }}
      >
        {/* Mobile-only brand indicator */}
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
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.1em'
            }}
          >
            <span style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center' }}>
              {isLightMode ? <CactusIcon size="0.85em" /> : '+'}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <span>SB</span>
              {isLightMode ? <CactusIcon size="0.85em" /> : <span>//</span>}
              <span>{isLightMode ? 'PREHISTORIC' : 'SEC 04'}</span>
            </span>
          </button>
        </div>

        {/* Desktop nav links */}
        <nav
          className="desktop-only"
          style={{ alignItems: 'center', gap: '2.25rem', pointerEvents: 'auto' }}
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isSelected = laserState.activeId === item.id
            const isDeparting = laserState.departingId === item.id
            const isArriving  = laserState.arrivingId  === item.id
            const isSettled   = isSelected && !laserState.departingId && !laserState.arrivingId && !laserState.inFlight
            const isBright    = isSelected || isDeparting

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
                  color: isBright ? 'var(--text-primary)' : 'var(--text-secondary)',
                  paddingBottom: '6px',
                  transition: 'color 180ms ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => { if (!isBright) e.currentTarget.style.color = 'var(--text-primary)' }}
                onMouseLeave={(e) => { if (!isBright) e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                {item.label}
                {(isSettled || isDeparting || isArriving) && (
                  <NavLaserBolt
                    isSettled={isSettled}
                    isDeparting={isDeparting}
                    direction={laserState.direction}
                    isLightMode={isLightMode}
                  />
                )}
              </button>
            )
          })}

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
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            RESUME ↓
          </button>
        </nav>

        {/* Top-right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', pointerEvents: 'auto' }}>
          <button
            onClick={toggleTheme}
            title={isLightMode ? 'Switch to Dark Traversal (Tron Deep Space)' : 'Switch to Light Traversal (Chrome Offline Runner)'}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '9999px',
              padding: '0.35rem 0.65rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--text-primary)',
              transition: 'all 250ms ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-active)'
              e.currentTarget.style.background  = 'var(--bg-card-hover)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)'
              e.currentTarget.style.background  = 'var(--bg-card)'
            }}
          >
            {isLightMode
              ? <Sun  size={15} color="var(--text-primary)" />
              : <Moon size={15} color="var(--text-primary)" />}
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

          {/* Mobile hamburger */}
          <div className="mobile-only">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isMobileMenuOpen}
              style={{
                background: isMobileMenuOpen ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px',
                padding: '0.4rem 0.65rem',
                minHeight: '38px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                color: 'var(--text-primary)',
                transition: 'all 200ms ease'
              }}
            >
              {isMobileMenuOpen
                ? <X    size={17} color="var(--text-primary)" />
                : <Menu size={17} color="var(--text-primary)" />}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                  fontWeight: 600,
                  color: 'var(--text-primary)'
                }}
              >
                {isMobileMenuOpen ? 'CLOSE' : 'MENU'}
              </span>
            </button>
          </div>
        </div>
      </header>

      <NavMobileDrawer
        isOpen={isMobileMenuOpen}
        isLightMode={isLightMode}
        activeSection={activeSection}
        navItems={NAV_ITEMS}
        onNavigate={onNavigate}
        onClose={() => setIsMobileMenuOpen(false)}
        onResumeDownload={handleResumeDownload}
      />
    </>
  )
}
