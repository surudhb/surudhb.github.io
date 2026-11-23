import React, { useEffect, useMemo, useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { useGameMode, preloadGame } from '../../context/GameModeContext'

// Bottom-left egg that hides the Play button. It hops every few seconds; on
// hover or focus it cracks open and reveals PLAY. Desktop only.
// Dark theme: a smooth cosmic egg with cyan specks. Light theme: a pixel egg.

const W = 42
const H = 54
const CRACK = '0,0 42,0 42,27 36,23 30,29 24,24 18,30 12,25 6,29 0,26'
const BOTTOM = '0,26 6,29 12,25 18,30 24,24 30,29 36,23 42,27 42,54 0,54'
const SMOOTH_EGG = 'M21 2 C33 2 40 22 40 34 C40 46 31 52 21 52 C11 52 2 46 2 34 C2 22 9 2 21 2 Z'
const COSMIC_SPECKS: [number, number, number][] = [
  [14, 14, 1.4], [27, 11, 1], [31, 20, 1.6], [11, 33, 1.2], [24, 36, 1.8], [33, 41, 1], [16, 45, 1.3], [20, 22, 0.9]
]

/** Pixel egg on a 14x18 grid (3px cells): outline, white shell, a few speckles. */
const usePixelEgg = () =>
  useMemo(() => {
    const GW = 14
    const GH = 18
    const inside = (x: number, y: number) => {
      if (x < 0 || y < 0 || x >= GW || y >= GH) return false
      const t = (y + 0.5) / GH
      const hw = t < 0.6 ? 6.6 * Math.sqrt(Math.max(0, 1 - ((0.6 - t) / 0.6) ** 2)) : 6.9 * Math.sqrt(Math.max(0, 1 - ((t - 0.6) / 0.42) ** 2))
      return Math.abs(x + 0.5 - GW / 2) <= hw
    }
    const specks = new Set(['5,4', '8,6', '4,9', '9,10', '6,13', '10,14', '7,8'])
    const cells: { x: number; y: number; kind: 'edge' | 'shell' | 'speck' }[] = []
    for (let y = 0; y < GH; y++) {
      for (let x = 0; x < GW; x++) {
        if (!inside(x, y)) continue
        const edge = !inside(x - 1, y) || !inside(x + 1, y) || !inside(x, y - 1) || !inside(x, y + 1)
        cells.push({ x, y, kind: edge ? 'edge' : specks.has(`${x},${y}`) ? 'speck' : 'shell' })
      }
    }
    return cells
  }, [])

const EggArt: React.FC<{ pixel: boolean; half: 'top' | 'bottom'; id: string }> = ({ pixel, half, id }) => {
  const cells = usePixelEgg()
  const clipId = `${id}-${half}`
  return (
    <g clipPath={`url(#${clipId})`}>
      <defs>
        <clipPath id={clipId}>
          <polygon points={half === 'top' ? CRACK : BOTTOM} />
        </clipPath>
      </defs>
      {pixel ? (
        <g shapeRendering="crispEdges">
          {cells.map((c) => (
            <rect
              key={`${c.x}-${c.y}`}
              x={c.x * 3}
              y={c.y * 3}
              width={3}
              height={3}
              fill={c.kind === 'shell' ? 'var(--egg-shell)' : 'var(--egg-stroke)'}
              opacity={c.kind === 'speck' ? 0.55 : 1}
            />
          ))}
        </g>
      ) : (
        <>
          <path d={SMOOTH_EGG} fill="var(--egg-shell)" stroke="var(--egg-stroke)" strokeWidth={1.2} />
          <path d={SMOOTH_EGG} fill={`url(#${id}-sheen)`} />
          {COSMIC_SPECKS.map(([x, y, r]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="var(--egg-speck)" />
          ))}
        </>
      )}
    </g>
  )
}

const useDesktopPointer = () => {
  const query = '(hover: hover) and (pointer: fine) and (min-width: 769px)'
  const [ok, setOk] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const m = window.matchMedia(query)
    const onChange = () => setOk(m.matches)
    m.addEventListener('change', onChange)
    return () => m.removeEventListener('change', onChange)
  }, [])
  return ok
}

export const PlayEgg: React.FC = () => {
  const { isLightMode } = useTheme()
  const { start } = useGameMode()
  const reduceMotion = useReducedMotion()
  const desktop = useDesktopPointer()
  const [open, setOpen] = useState(false)
  const kind = isLightMode ? 'dino' : 'space'
  const id = isLightMode ? 'egg-pixel' : 'egg-cosmic'

  if (!desktop) return null

  const warm = () => {
    setOpen(true)
    preloadGame(kind)
      .then((m) => {
        if ('preloadDinoRunSprites' in m) m.preloadDinoRunSprites()
      })
      .catch(() => {
        // Warm-up only; a real failure is handled when the game starts
      })
  }

  return (
    <button
      type="button"
      aria-label="Play a game"
      className="play-egg"
      onMouseEnter={warm}
      onFocus={warm}
      onMouseLeave={() => setOpen(false)}
      onBlur={() => setOpen(false)}
      onClick={() => start(kind)}
      style={{
        position: 'fixed',
        left: '1.9rem',
        bottom: '1.6rem',
        zIndex: 60,
        width: `${W + 30}px`,
        height: `${H + 30}px`,
        padding: 0,
        border: 'none',
        background: 'transparent',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
      }}
    >
      {/* Hop: CSS keyframes (runs on the compositor, no per-frame JS). Paused while open. */}
      <div
        className={`play-egg-hop${open || reduceMotion ? ' is-still' : ''}`}
        style={{ position: 'relative', width: W, height: H, filter: 'var(--egg-glow)' }}
      >
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ overflow: 'visible', display: 'block' }} aria-hidden="true">
          {!isLightMode && (
            <defs>
              <radialGradient id={`${id}-sheen`} cx="35%" cy="28%" r="70%">
                <stop offset="0%" stopColor="var(--egg-sheen)" />
                <stop offset="60%" stopColor="transparent" />
              </radialGradient>
            </defs>
          )}
          <EggArt pixel={isLightMode} half="bottom" id={id} />
          <m.g
            animate={open ? { y: -13, x: -3, rotate: -18 } : { y: 0, x: 0, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
            style={{ originX: '10%', originY: '50%' }}
          >
            <EggArt pixel={isLightMode} half="top" id={id} />
          </m.g>
        </svg>

        {/* The button inside the egg */}
        <m.span
          initial={false}
          animate={open ? { opacity: 1, y: -6, scale: 1 } : { opacity: 0, y: 6, scale: 0.6 }}
          transition={{ type: 'spring', stiffness: 420, damping: 24 }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '34%',
            translateX: '-50%',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            fontFamily: 'var(--egg-label-font)',
            fontSize: '0.62rem',
            letterSpacing: '0.16em',
            color: 'var(--egg-label-color)',
            background: 'var(--egg-label-bg)',
            border: 'var(--egg-label-border)',
            boxShadow: 'var(--egg-label-shadow)',
            borderRadius: 'var(--egg-label-radius)',
            padding: '0.28rem 0.5rem'
          }}
        >
          ▶ PLAY
        </m.span>
      </div>
    </button>
  )
}
