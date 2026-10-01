import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CactusIcon } from '../ui/CactusIcon'

interface NavItem {
  id: string
  label: string
  num: string
}

interface NavMobileDrawerProps {
  isOpen: boolean
  isLightMode: boolean
  activeSection: string
  navItems: NavItem[]
  onNavigate: (sectionId: string) => void
  onClose: () => void
  onResumeDownload: (e: React.MouseEvent) => void
}

export const NavMobileDrawer: React.FC<NavMobileDrawerProps> = ({
  isOpen,
  isLightMode,
  activeSection,
  navItems,
  onNavigate,
  onClose,
  onResumeDownload,
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
    return () => { document.body.style.overflow = 'auto' }
  }, [isOpen])

  const handleNavClick = (sectionId: string) => {
    onClose()
    onNavigate(sectionId)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            backgroundColor: 'var(--bg-primary)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '5.25rem 1.5rem 1.75rem 1.5rem',
            overflowY: 'auto'
          }}
        >
          {/* Top telemetry heading */}
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
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              {isLightMode ? (
                <>
                  <span>[ PREHISTORIC</span>
                  <CactusIcon size="0.8em" />
                  <span>SECTOR DIRECTORY ]</span>
                </>
              ) : (
                '[ TRANSPONDER // SECTOR DIRECTORY ]'
              )}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-secondary)'
              }}
            >
              {isLightMode ? 'PREHISTORIC' : 'SEC 04'}
            </div>
          </div>

          {/* Nav items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.id
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * idx, duration: 0.18 }}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    background: isActive ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--border-active)' : 'var(--border-subtle)',
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
                        color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.2rem'
                      }}
                    >
                      <span>{item.num}</span>
                      {isLightMode ? <CactusIcon size="0.75em" /> : <span>//</span>}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)'
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
                        color: 'var(--text-primary)',
                        letterSpacing: '0.1em'
                      }}
                    >
                      [ACTIVE]
                    </span>
                  )}
                </motion.button>
              )
            })}

            {/* Mobile resume download */}
            <motion.button
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.04 * 6, duration: 0.18 }}
              onClick={(e) => { onResumeDownload(e); onClose() }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
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
                    color: 'var(--text-muted)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.2rem'
                  }}
                >
                  <span>07</span>
                  {isLightMode ? <CactusIcon size="0.75em" /> : <span>//</span>}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    color: 'var(--text-primary)'
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

          {/* Bottom telemetry & close */}
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
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              {isLightMode ? (
                <>
                  <span>LAT 51.04° N</span>
                  <CactusIcon size="0.75em" />
                  <span>LON 114.07° W</span>
                </>
              ) : (
                'LAT 51.04° N // LON 114.07° W'
              )}
            </div>
            <button
              onClick={onClose}
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
  )
}
