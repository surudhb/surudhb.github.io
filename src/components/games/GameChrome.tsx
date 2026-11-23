import React, { forwardRef } from 'react'
import { RotateCcw, X } from 'lucide-react'

const iconButton: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.25rem',
  height: '2.25rem',
  borderRadius: '999px',
  border: '1px solid var(--border-subtle)',
  background: 'transparent',
  color: 'var(--game-hud-color)',
  transition: 'color var(--transition-fast), border-color var(--transition-fast)'
}

/** Quiet exit control in the top-right corner while a game runs. Esc does the same. */
export const QuitButton: React.FC<{ onExit: () => void }> = ({ onExit }) => (
  <button
    type="button"
    aria-label="Exit game"
    onClick={onExit}
    className="game-quit"
    style={{ ...iconButton, position: 'fixed', top: '1.25rem', right: '1.5rem', zIndex: 3 }}
  >
    <X size={16} />
  </button>
)

interface GameOverProps {
  score: number
  best: number
  onRetry: () => void
  onExit: () => void
}

export const pad5 = (n: number) => String(Math.min(99999, Math.floor(n))).padStart(5, '0')

/** Minimal end state: score, best, retry and exit. No instructions. */
export const GameOverLine: React.FC<GameOverProps> = ({ score, best, onRetry, onExit }) => (
  <div
    role="status"
    className="game-over-line"
    style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      pointerEvents: 'none',
      zIndex: 3,
      fontFamily: 'var(--game-font)',
      color: 'var(--game-hud-color)',
      letterSpacing: '0.14em',
      fontSize: '0.85rem'
    }}
  >
    <div style={{ display: 'flex', gap: '1.5rem' }}>
      <span style={{ color: 'var(--text-primary)' }}>{pad5(score)}</span>
      <span style={{ color: 'var(--text-muted)' }}>HI {pad5(best)}</span>
    </div>
    <div style={{ display: 'flex', gap: '0.75rem', pointerEvents: 'auto' }}>
      <button type="button" aria-label="Play again" onClick={onRetry} className="game-icon-btn" style={iconButton}>
        <RotateCcw size={15} />
      </button>
      <button type="button" aria-label="Exit game" onClick={onExit} className="game-icon-btn" style={iconButton}>
        <X size={16} />
      </button>
    </div>
  </div>
)

/** Red pulse around the viewport edge when the player takes a hit. */
export const HitFlash = forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="game-hit-flash" aria-hidden="true" />
))
HitFlash.displayName = 'HitFlash'

export const pulse = (el: HTMLDivElement | null) => {
  el?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 480, easing: 'ease-out' })
}

/** True when a pointer event started on a game control, so it should not fire or jump. */
export const isOnControl = (e: Event) => (e.target as HTMLElement | null)?.closest?.('button') != null
