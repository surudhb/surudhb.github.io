import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useGameMode } from '../../context/GameModeContext'
import { AMBIENT_GROUND_SPEED, ambientDinoXFor, gameBus, horizonYFor } from '../../game/gameBus'
import { cssVar, fitCanvas, grayscaleFrames, loadImage, readHighScore, startLoop, writeHighScore, CanvasSize } from '../../game/engine'
import { GameOverLine, HitFlash, QuitButton, isOnControl, pad5, pulse } from './GameChrome'

// Endless runner on top of the live light-theme background. The ground,
// horizon and starting position all come from the background itself, and the
// background's ground speed is driven from here, so obstacles stay locked to
// the scrolling ground at any frame rate.

const HIGH_SCORE_KEY = 'surudh_dinorun_best'
const SPRITE_BASE = '/sprites/games/tiny-dinos'

// Sprite sheets: horizontal strips of square frames (Myaumya, "Dinosaur sprites").
// The source art faces RIGHT. The player runs right, so it is drawn as-is;
// obstacles travel left toward the player, so they are mirrored to face it.
// PLAYER is a placeholder until the main character sprite is chosen.
export const DINO_RUN_SPRITES = {
  player: { src: `${SPRITE_BASE}/ptero-walk.png`, frame: 16, flip: false, frameMs: 130 },
  playerDeath: { src: `${SPRITE_BASE}/ptero-death.png`, frame: 16, flip: false, frameMs: 120 },
  walker: { src: `${SPRITE_BASE}/ptero-walk.png`, frame: 16, flip: true, frameMs: 140 },
  flyer: { src: `${SPRITE_BASE}/ptero-fly.png`, frame: 16, flip: true, frameMs: 90 }
} as const

export const preloadDinoRunSprites = () => Object.values(DINO_RUN_SPRITES).forEach((s) => void loadImage(s.src))

const PX = 3 // on-screen pixels per sprite pixel; keeps every sprite on one pixel grid
const MAX_LIVES = 3
const GRAVITY = 2600
const JUMP_VELOCITY = 900
const HOLD_GRAVITY = 0.45
const HOLD_MAX_MS = 200
const FAST_FALL = 3
const INVULN_MS = 1200
const START_SPEED = 6 // px per 60fps frame, same unit as the background
const MAX_SPEED = 13

type Kind = 'walker' | 'flyLow' | 'flyHigh'

interface Obstacle {
  kind: Kind
  x: number
  bottom: number // offset above the horizon
  extra: number // own speed on top of the ground, px/s
  t: number
}

export const DinoRun: React.FC = () => {
  const { exit } = useGameMode()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const flashRef = useRef<HTMLDivElement | null>(null)
  const [lives, setLives] = useState(MAX_LIVES)
  const [score, setScore] = useState(0) // committed on game over only
  const scoreElRef = useRef<HTMLSpanElement | null>(null)
  const [over, setOver] = useState(false)
  const [best, setBest] = useState(() => readHighScore(HIGH_SCORE_KEY))
  const resetRef = useRef<() => void>(() => {})

  const retry = useCallback(() => resetRef.current(), [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const size: CanvasSize = { width: window.innerWidth, height: window.innerHeight }
    const unfit = fitCanvas(canvas, ctx, size)
    const inkDark = cssVar('--game-sprite-dark', '#202124')
    const inkLight = cssVar('--game-sprite-light', '#f7f7f7')

    type Frames = HTMLCanvasElement[]
    const frames: Record<keyof typeof DINO_RUN_SPRITES, Frames> = { player: [], playerDeath: [], walker: [], flyer: [] }
    let ready = false
    Promise.all(
      (Object.keys(DINO_RUN_SPRITES) as (keyof typeof DINO_RUN_SPRITES)[]).map(async (key) => {
        const def = DINO_RUN_SPRITES[key]
        frames[key] = grayscaleFrames(await loadImage(def.src), def.frame, inkDark, inkLight, def.flip)
      })
    ).then(() => {
      ready = true
    })

    // Player state
    let y = 0 // height above ground (px, up is positive)
    let vy = 0
    let grounded = true
    let holding = false
    let holdMs = 0
    let fastFall = false
    let runClock = 0
    let invuln = 0
    let livesNow = MAX_LIVES
    let deathClock = -1
    let appear = 0 // 0 -> 1 fade-in that cross-fades with the ambient runner

    // World state
    let obstacles: Obstacle[] = []
    let speedTarget = START_SPEED
    let distance = 0
    let untilSpawn = 0
    let lastKind: Kind | null = null
    let isOver = false
    let scoreNow = 0

    const startRun = () => {
      gameBus.ambientDinoHideTarget = 1
      gameBus.decorDimTarget = 0.45
      speedTarget = START_SPEED
      gameBus.groundSpeedTarget = speedTarget
      untilSpawn = START_SPEED * 60 * 1.6 // breathing room while the world speeds up
    }
    startRun()

    const groundPxPerSec = () => gameBus.groundSpeed * 60

    const spawn = () => {
      const pool: Kind[] = ['walker']
      if (scoreNow > 40) pool.push('flyLow')
      if (scoreNow > 120 && lastKind !== 'flyHigh') pool.push('flyHigh')
      const kind = pool[Math.floor(Math.random() * pool.length)]
      lastKind = kind
      obstacles.push({
        kind,
        x: size.width + 40,
        bottom: kind === 'walker' ? -2 : kind === 'flyLow' ? 8 : 62,
        extra: kind === 'walker' ? 50 : 80,
        t: Math.random() * 1000
      })
      const base = Math.max(380, groundPxPerSec() * 0.85)
      untilSpawn = base * (1 + Math.random() * 0.8) + (kind === 'flyHigh' ? 160 : 0)
    }

    const playerBox = () => {
      const x = ambientDinoXFor(size.width)
      const h = 16 * PX
      const top = horizonYFor(size.height) + 2 - h - y
      return { x: x + 3 * PX, y: top + 3 * PX, w: 16 * PX - 6 * PX, h: h - 5 * PX }
    }
    const obstacleBox = (o: Obstacle) => {
      const h = 16 * PX
      const top = horizonYFor(size.height) - o.bottom - h
      return { x: o.x + 3 * PX, y: top + 3 * PX, w: 16 * PX - 6 * PX, h: h - 6 * PX }
    }
    const overlap = (a: ReturnType<typeof playerBox>, b: ReturnType<typeof playerBox>) =>
      a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y

    const jump = () => {
      if (isOver) return
      holding = true
      if (grounded) {
        vy = JUMP_VELOCITY
        grounded = false
        holdMs = 0
        fastFall = false
      }
    }
    const release = () => {
      holding = false
    }

    const gameOver = () => {
      isOver = true
      deathClock = 0
      setScore(scoreNow)
      setOver(true)
      gameBus.groundSpeedTarget = AMBIENT_GROUND_SPEED
      setBest((prev) => {
        const next = Math.max(prev, scoreNow)
        if (next > prev) writeHighScore(HIGH_SCORE_KEY, next)
        return next
      })
    }

    resetRef.current = () => {
      obstacles = []
      y = 0
      vy = 0
      grounded = true
      invuln = 0
      livesNow = MAX_LIVES
      deathClock = -1
      distance = 0
      scoreNow = 0
      lastKind = null
      isOver = false
      setLives(MAX_LIVES)
      setScore(0)
      if (scoreElRef.current) scoreElRef.current.textContent = pad5(0)
      setOver(false)
      startRun()
    }

    const step = (dt: number) => {
      const s = dt / 1000
      appear = Math.min(1, appear + dt / 450)

      if (!isOver) {
        speedTarget = Math.min(MAX_SPEED, speedTarget + 0.12 * s)
        gameBus.groundSpeedTarget = speedTarget
        const moved = groundPxPerSec() * s
        distance += moved
        const nextScore = Math.floor(distance / 40)
        if (nextScore !== scoreNow) {
          scoreNow = nextScore
          // Direct DOM write: the score ticks many times a second, React need not re-render
          if (scoreElRef.current) scoreElRef.current.textContent = pad5(scoreNow)
        }
        untilSpawn -= moved
        if (untilSpawn <= 0) spawn()
      }

      // Player physics
      if (!grounded) {
        let g = GRAVITY
        if (holding && vy > 0 && holdMs < HOLD_MAX_MS) {
          g *= HOLD_GRAVITY
          holdMs += dt
        }
        if (fastFall) g *= FAST_FALL
        vy -= g * s
        y += vy * s
        if (y <= 0) {
          y = 0
          vy = 0
          grounded = true
          fastFall = false
        }
      }
      runClock += dt
      invuln = Math.max(0, invuln - dt)

      // Obstacles ride the ground plus their own speed
      for (const o of obstacles) {
        o.x -= (groundPxPerSec() + o.extra) * s
        o.t += dt
      }
      obstacles = obstacles.filter((o) => o.x > -80)

      if (!isOver && invuln <= 0) {
        const pb = playerBox()
        for (const o of obstacles) {
          if (overlap(pb, obstacleBox(o))) {
            livesNow -= 1
            setLives(livesNow)
            pulse(flashRef.current)
            if (livesNow <= 0) gameOver()
            else invuln = INVULN_MS
            break
          }
        }
      }
      if (deathClock >= 0) deathClock += dt

      draw()
    }

    const drawFrame = (f: HTMLCanvasElement | undefined, x: number, top: number) => {
      if (!f) return
      ctx.drawImage(f, Math.round(x), Math.round(top), f.width * PX, f.height * PX)
    }

    const draw = () => {
      ctx.clearRect(0, 0, size.width, size.height)
      if (!ready) return
      const horizon = horizonYFor(size.height)
      ctx.globalAlpha = 0.85

      for (const o of obstacles) {
        const set = o.kind === 'walker' ? frames.walker : frames.flyer
        const ms = o.kind === 'walker' ? DINO_RUN_SPRITES.walker.frameMs : DINO_RUN_SPRITES.flyer.frameMs
        const f = set[Math.floor(o.t / ms) % set.length]
        drawFrame(f, o.x, horizon - o.bottom - 16 * PX)
      }

      // Player: blink while invulnerable, play death strip once on game over
      const blinkHidden = invuln > 0 && Math.floor(invuln / 90) % 2 === 0
      if (!blinkHidden) {
        let f: HTMLCanvasElement | undefined
        if (deathClock >= 0) {
          const i = Math.min(frames.playerDeath.length - 1, Math.floor(deathClock / DINO_RUN_SPRITES.playerDeath.frameMs))
          f = frames.playerDeath[i]
        } else if (!grounded) {
          f = frames.player[0]
        } else {
          f = frames.player[Math.floor(runClock / DINO_RUN_SPRITES.player.frameMs) % frames.player.length]
        }
        ctx.globalAlpha = 0.85 * appear
        drawFrame(f, ambientDinoXFor(size.width), horizon + 2 - 16 * PX - y)
      }
      ctx.globalAlpha = 1
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        exit()
        return
      }
      if ([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) e.preventDefault()
      if (e.repeat) return
      if (isOver) {
        if ((e.key === ' ' || e.key === 'Enter') && deathClock > 400) resetRef.current()
        return
      }
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w') jump()
      if (e.key === 'ArrowDown' && !grounded) fastFall = true
    }
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w') release()
    }
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 || isOnControl(e)) return
      jump()
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', release)
    window.addEventListener('blur', release)
    const stop = startLoop(step)

    return () => {
      stop()
      unfit()
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', release)
      window.removeEventListener('blur', release)
    }
  }, [exit])

  return (
    <div role="application" aria-label="Dino run game" style={{ position: 'fixed', inset: 0 }}>
      <canvas ref={canvasRef} aria-hidden="true" style={{ position: 'fixed', inset: 0 }} />
      <HitFlash ref={flashRef} />
      <QuitButton onExit={exit} />

      {/* Same spot and styling as the site's score HUD, now counting for real */}
      <div
        className="game-hud"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2.5rem',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
          fontFamily: 'var(--font-pixel)',
          fontSize: '0.78rem',
          letterSpacing: '0.12em',
          color: 'var(--text-secondary)',
          background: 'var(--game-hud-bg)',
          padding: '0.35rem 0.75rem',
          borderRadius: '4px',
          border: '1px solid var(--border-subtle)',
          boxShadow: '2px 2px 0px rgba(83, 83, 83, 0.2)',
          pointerEvents: 'none'
        }}
      >
        <span aria-label={`${lives} lives left`} style={{ display: 'flex', gap: '0.25rem' }}>
          {Array.from({ length: MAX_LIVES }, (_, i) => (
            <PixelHeart key={i} filled={i < lives} />
          ))}
        </span>
        <span style={{ color: 'var(--text-muted)' }}>HI {pad5(best)}</span>
        <span ref={scoreElRef} style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{pad5(0)}</span>
      </div>

      {over && <GameOverLine score={score} best={best} onRetry={retry} onExit={exit} />}
    </div>
  )
}

const HEART = ['.##.##.', '#######', '#######', '.#####.', '..###..', '...#...']

const PixelHeart: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg viewBox="0 0 7 6" width={14} height={12} shapeRendering="crispEdges" aria-hidden="true">
    {HEART.flatMap((row, yy) =>
      row.split('').map((c, xx) =>
        c === '#' ? (
          <rect key={`${xx}-${yy}`} x={xx} y={yy} width={1} height={1} fill="var(--game-sprite-color)" opacity={filled ? 1 : 0.22} />
        ) : null
      )
    )}
  </svg>
)
