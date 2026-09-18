import React, { useState, useEffect } from 'react'
import { CactusIcon } from '../ui/CactusIcon'

export const DinoScoreHud: React.FC = () => {
  const [distance, setDistance] = useState(1337)
  const [isPaused, setIsPaused] = useState(false)

  // Listen for modal open/close events to pause and blur the scoreboard
  useEffect(() => {
    const handleModalState = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>
      if (customEvent.detail && typeof customEvent.detail.isOpen === 'boolean') {
        setIsPaused(customEvent.detail.isOpen)
      } else {
        setIsPaused(document.body.classList.contains('modal-open'))
      }
    }

    // Check initial status in case modal was already open
    if (typeof document !== 'undefined') {
      setIsPaused(document.body.classList.contains('modal-open'))
    }

    window.addEventListener('modal:state', handleModalState)
    return () => {
      window.removeEventListener('modal:state', handleModalState)
    }
  }, [])

  // Telemetry distance counter: pauses when a modal is open
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setDistance((prev) => (prev >= 99999 ? 100 : prev + 1))
    }, 120)

    return () => clearInterval(timer)
  }, [isPaused])

  const formattedScore = String(distance).padStart(5, '0')

  return (
    <aside
      aria-label="Prehistoric Runner Telemetry"
      className="hud-desktop"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2.5rem',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.35rem'
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: '0.78rem',
          letterSpacing: '0.12em',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
          background: 'rgba(247, 247, 247, 0.9)',
          padding: '0.35rem 0.75rem',
          borderRadius: '4px',
          border: '1px solid var(--border-subtle)',
          boxShadow: '2px 2px 0px rgba(83, 83, 83, 0.2)'
        }}
      >
        <span style={{ color: 'var(--text-muted)' }}>HI 09999</span>
        <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formattedScore}</span>
        <CactusIcon size={12} color="var(--divider-symbol-color)" style={{ margin: '0 0.15rem' }} />
        <span style={{ fontSize: '0.7rem' }}>{isPaused ? 'PAUSED' : 'ERR_OFFLINE'}</span>
      </div>
    </aside>
  )
}

