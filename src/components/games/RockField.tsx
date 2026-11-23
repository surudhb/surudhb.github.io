import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useGameMode } from '../../context/GameModeContext'
import { gameBus, STAR_FOCAL } from '../../game/gameBus'
import { cssVar, fitCanvas, readHighScore, startLoop, writeHighScore, CanvasSize } from '../../game/engine'
import { GameOverLine, HitFlash, QuitButton, isOnControl, pad5, pulse } from './GameChrome'

// First-person rock field over the live starfield. Rocks use the starfield's
// own projection (k = 220 / z) and vanishing point, so they emerge from the
// background as star-like dots and grow as they tumble toward the ship.

const HIGH_SCORE_KEY = 'surudh_rockfield_best'
const Z_FAR = 4200
const Z_HIT = 90 // depth of the ship's nose: rocks are judged hit/miss here
const BOLT_SPEED = 6500 // world units per second
const FIRE_INTERVAL = 190 // ms between volleys while the button is held
const MAX_HULL = 100

type RockSize = 'large' | 'medium' | 'small'
const ROCK: Record<RockSize, { r: number; hp: number; dmg: number; score: number; next: RockSize | null; kids: [number, number] }> = {
  large: { r: 62, hp: 3, dmg: 34, score: 20, next: 'medium', kids: [2, 3] },
  medium: { r: 36, hp: 2, dmg: 20, score: 50, next: 'small', kids: [2, 2] },
  small: { r: 19, hp: 1, dmg: 10, score: 100, next: null, kids: [0, 0] }
}

interface Rock {
  x: number; y: number; z: number
  vx: number; vy: number; vz: number
  size: RockSize; hp: number
  shape: number; angle: number; spin: number
  flash: number; judged: boolean
}

interface Bolt {
  ax: number; ay: number // ray slope: world x = ax * z
  z: number; prevZ: number
  sx: number; sy: number // screen corner it launched from
}

interface Dust {
  x: number; y: number; vx: number; vy: number
  life: number; max: number; r: number; color: string
}

interface Palette { base: string; dark: string; light: string; core: string; glow: string; star: string }

const SHAPE_PX = 160

/** Draws one lumpy, cratered, side-lit rock into an offscreen canvas. */
const makeRockSprite = (p: Palette): HTMLCanvasElement => {
  const c = document.createElement('canvas')
  c.width = c.height = SHAPE_PX
  const g = c.getContext('2d')!
  const mid = SHAPE_PX / 2
  const n = 11 + Math.floor(Math.random() * 5)
  const pts: [number, number][] = []
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2
    const rad = mid * (0.78 + Math.random() * 0.2)
    pts.push([mid + Math.cos(a) * rad, mid + Math.sin(a) * rad])
  }
  g.beginPath()
  pts.forEach(([x, y], i) => {
    const [nx, ny] = pts[(i + 1) % n]
    const cxm = (x + nx) / 2
    const cym = (y + ny) / 2
    if (i === 0) g.moveTo(cxm, cym)
    else g.quadraticCurveTo(x, y, cxm, cym)
  })
  const [fx, fy] = pts[0]
  const [sx, sy] = pts[1]
  g.quadraticCurveTo(fx, fy, (fx + sx) / 2, (fy + sy) / 2)
  g.closePath()
  g.save()
  g.clip()

  g.fillStyle = p.base
  g.fillRect(0, 0, SHAPE_PX, SHAPE_PX)

  // Craters: dark bowl with a lit lower rim
  const craters = 3 + Math.floor(Math.random() * 3)
  for (let i = 0; i < craters; i++) {
    const cr = 6 + Math.random() * 16
    const cx = mid + (Math.random() - 0.5) * mid * 1.1
    const cy = mid + (Math.random() - 0.5) * mid * 1.1
    g.globalAlpha = 0.55
    g.fillStyle = p.dark
    g.beginPath()
    g.ellipse(cx, cy, cr, cr * 0.82, 0, 0, Math.PI * 2)
    g.fill()
    g.globalAlpha = 0.35
    g.strokeStyle = p.light
    g.lineWidth = 2
    g.beginPath()
    g.ellipse(cx, cy, cr, cr * 0.82, 0, Math.PI * 0.15, Math.PI * 0.85)
    g.stroke()
  }
  g.globalAlpha = 1

  // Side lighting: bright upper-left, deep shadow lower-right
  const lit = g.createRadialGradient(mid * 0.6, mid * 0.55, 4, mid, mid, mid * 1.15)
  lit.addColorStop(0, 'rgba(255,255,255,0.22)')
  lit.addColorStop(0.45, 'rgba(255,255,255,0)')
  lit.addColorStop(1, 'rgba(0,0,0,0.6)')
  g.fillStyle = lit
  g.fillRect(0, 0, SHAPE_PX, SHAPE_PX)
  g.restore()

  g.strokeStyle = p.dark
  g.lineWidth = 3
  g.stroke()
  return c
}

export const RockField: React.FC = () => {
  const { exit } = useGameMode()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const flashRef = useRef<HTMLDivElement | null>(null)
  const [hull, setHull] = useState(MAX_HULL)
  const [score, setScore] = useState(0)
  const [over, setOver] = useState(false)
  const [best, setBest] = useState(() => readHighScore(HIGH_SCORE_KEY))
  const resetRef = useRef<() => void>(() => {})

  const retry = useCallback(() => resetRef.current(), [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    // Only the current run may drive the starfield (see gameBus.session)
    const session = gameBus.session
    const live = () => session !== 0 && gameBus.session === session

    const size: CanvasSize = { width: window.innerWidth, height: window.innerHeight }
    const unfit = fitCanvas(canvas, ctx, size)
    ctx.imageSmoothingEnabled = true

    const palette: Palette = {
      base: cssVar('--game-rock-base', '#6f6862'),
      dark: cssVar('--game-rock-dark', '#2b2825'),
      light: cssVar('--game-rock-light', '#b3aaa0'),
      core: cssVar('--game-laser-core', '#ffffff'),
      glow: cssVar('--game-laser-glow', 'rgba(94,241,242,0.9)'),
      star: 'rgba(230, 242, 255, 1)'
    }
    const shapes = Array.from({ length: 8 }, () => makeRockSprite(palette))

    let rocks: Rock[] = []
    let bolts: Bolt[] = []
    let dust: Dust[] = []
    let hullNow = MAX_HULL
    let scoreNow = 0
    let elapsed = 0
    let spawnTimer = 600 // short grace period while the scene settles
    let isOver = false
    let firing = false
    let fireTimer = 0
    let mx = size.width / 2
    let my = size.height / 2

    if (live()) gameBus.starBoostTarget = 0.9

    const center = () => ({
      cx: gameBus.starCenterX || size.width / 2,
      cy: gameBus.starCenterY || size.height / 2
    })
    const hitScreenR = () => Math.min(size.width, size.height) * 0.16

    const spawnRock = () => {
      const level = 1 + elapsed / 25
      const aimFrac = Math.min(0.75, 0.4 + 0.06 * (level - 1))
      const travel = Math.max(2.4, 5.2 - 0.35 * (level - 1))
      const roll = Math.random()
      const sz: RockSize = roll < 0.5 ? 'large' : roll < 0.8 ? 'medium' : 'small'

      const startOff = Math.min(size.width, size.height) * 0.14 * Math.sqrt(Math.random())
      const sa = Math.random() * Math.PI * 2
      const x0 = (Math.cos(sa) * startOff * Z_FAR) / STAR_FOCAL
      const y0 = (Math.sin(sa) * startOff * Z_FAR) / STAR_FOCAL

      const aimed = Math.random() < aimFrac
      const ta = Math.random() * Math.PI * 2
      const tr = aimed ? hitScreenR() * 0.8 * Math.sqrt(Math.random()) : hitScreenR() * (1.6 + Math.random() * 1.6)
      const xt = (Math.cos(ta) * tr * Z_HIT) / STAR_FOCAL
      const yt = (Math.sin(ta) * tr * Z_HIT) / STAR_FOCAL

      rocks.push({
        x: x0, y: y0, z: Z_FAR,
        vx: (xt - x0) / travel, vy: (yt - y0) / travel, vz: (Z_HIT - Z_FAR) / travel,
        size: sz, hp: ROCK[sz].hp,
        shape: Math.floor(Math.random() * shapes.length),
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 2.4,
        flash: 0, judged: false
      })
    }

    const burst = (sx: number, sy: number, rpx: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2
        const sp = 40 + Math.random() * 220
        dust.push({
          x: sx + Math.cos(a) * rpx * 0.4,
          y: sy + Math.sin(a) * rpx * 0.4,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          life: 0,
          max: 380 + Math.random() * 420,
          r: 0.8 + Math.random() * Math.max(1.5, rpx * 0.06),
          color: Math.random() < 0.25 ? palette.glow : palette.light
        })
      }
    }

    const project = (x: number, y: number, z: number) => {
      const { cx, cy } = center()
      const k = STAR_FOCAL / z
      return { sx: cx + x * k, sy: cy + y * k, k }
    }

    const destroy = (rock: Rock) => {
      const def = ROCK[rock.size]
      const { sx, sy, k } = project(rock.x, rock.y, rock.z)
      burst(sx, sy, def.r * k, rock.size === 'small' ? 14 : 22)
      scoreNow += def.score
      setScore(scoreNow)
      if (!def.next) return
      const [lo, hi] = def.kids
      const count = lo + Math.floor(Math.random() * (hi - lo + 1))
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 + Math.random() * 0.8
        const lateral = (rock.z / STAR_FOCAL) * (90 + Math.random() * 70)
        rocks.push({
          ...rock,
          size: def.next,
          hp: ROCK[def.next].hp,
          vx: rock.vx + Math.cos(a) * lateral,
          vy: rock.vy + Math.sin(a) * lateral,
          vz: rock.vz * (0.9 + Math.random() * 0.2),
          shape: Math.floor(Math.random() * shapes.length),
          spin: (Math.random() - 0.5) * 3.4,
          flash: 0,
          judged: false
        })
      }
    }

    const fire = () => {
      const { cx, cy } = center()
      const ax = (mx - cx) / STAR_FOCAL
      const ay = (my - cy) / STAR_FOCAL
      const corners: [number, number][] = [
        [size.width * 0.14, size.height + 6],
        [size.width * 0.86, size.height + 6]
      ]
      for (const [sx, sy] of corners) bolts.push({ ax, ay, z: Z_HIT, prevZ: Z_HIT, sx, sy })
    }

    const takeHit = (rock: Rock) => {
      hullNow = Math.max(0, hullNow - ROCK[rock.size].dmg)
      setHull(hullNow)
      pulse(flashRef.current)
      if (hullNow <= 0 && !isOver) {
        isOver = true
        firing = false
        setOver(true)
        if (live()) gameBus.starBoostTarget = 0.25
        setBest((prev) => {
          const next = Math.max(prev, scoreNow)
          if (next > prev) writeHighScore(HIGH_SCORE_KEY, next)
          return next
        })
      }
    }

    resetRef.current = () => {
      rocks = []
      bolts = []
      hullNow = MAX_HULL
      scoreNow = 0
      elapsed = 0
      spawnTimer = 600
      isOver = false
      setHull(MAX_HULL)
      setScore(0)
      setOver(false)
      if (live()) gameBus.starBoostTarget = 0.9
    }

    const step = (dt: number) => {
      const s = dt / 1000
      // After exit the run keeps animating through the fade, but frozen:
      // no spawning, firing, or damage.
      const running = !isOver && live()
      if (running) {
        elapsed += s
        spawnTimer -= dt
        if (spawnTimer <= 0) {
          spawnRock()
          const level = 1 + elapsed / 25
          spawnTimer = Math.max(380, 1400 / level) * (0.7 + Math.random() * 0.6)
        }
        fireTimer -= dt
        if (firing && fireTimer <= 0) {
          fire()
          fireTimer = FIRE_INTERVAL
        }
      }

      // Move rocks; judge each once as it crosses the ship's depth
      const hitWorldR = (hitScreenR() * Z_HIT) / STAR_FOCAL
      for (const r of rocks) {
        r.x += r.vx * s
        r.y += r.vy * s
        r.z += r.vz * s
        r.angle += r.spin * s
        r.flash = Math.max(0, r.flash - s * 6)
        if (!r.judged && r.z <= Z_HIT) {
          r.judged = true
          if (running && Math.hypot(r.x, r.y) < hitWorldR + ROCK[r.size].r * 0.5) {
            const { sx, sy, k } = project(r.x, r.y, Math.max(r.z, 1))
            burst(sx, sy, ROCK[r.size].r * k * 0.5, 26)
            takeHit(r)
            r.hp = -1 // remove
          }
        }
      }

      // Move bolts and test them against rocks they swept past this frame
      for (const b of bolts) {
        b.prevZ = b.z
        b.z += BOLT_SPEED * s
        let target: Rock | null = null
        for (const r of rocks) {
          if (r.hp <= 0) continue
          const rr = ROCK[r.size].r
          if (r.z < b.prevZ - rr || r.z > b.z + rr) continue
          if (Math.hypot(r.x - b.ax * r.z, r.y - b.ay * r.z) > rr * 1.15) continue
          if (!target || r.z < target.z) target = r
        }
        if (target) {
          b.z = Infinity
          target.hp -= 1
          target.flash = 1
          if (target.hp <= 0) destroy(target)
        }
      }
      bolts = bolts.filter((b) => b.z < Z_FAR)
      rocks = rocks.filter((r) => {
        if (r.hp <= 0 || r.z < 24) return false
        const { sx, sy, k } = project(r.x, r.y, r.z)
        const rpx = ROCK[r.size].r * k
        return sx > -rpx * 2 && sx < size.width + rpx * 2 && sy > -rpx * 2 && sy < size.height + rpx * 2
      })

      for (const d of dust) {
        d.life += dt
        d.x += d.vx * s
        d.y += d.vy * s
        d.vx *= 0.97
        d.vy *= 0.97
      }
      dust = dust.filter((d) => d.life < d.max)

      draw()
    }

    const draw = () => {
      const { width, height } = size
      ctx.clearRect(0, 0, width, height)
      const { cx, cy } = center()

      // Rocks, far to near
      rocks.sort((a, b) => b.z - a.z)
      for (const r of rocks) {
        const k = STAR_FOCAL / r.z
        const sx = cx + r.x * k
        const sy = cy + r.y * k
        const rpx = ROCK[r.size].r * k
        const fade = Math.min(1, (Z_FAR - r.z) / 600)
        if (rpx < 1.8) {
          // Still star-sized: draw it like a star so it emerges from the field
          ctx.globalAlpha = 0.5 + 0.5 * fade
          ctx.fillStyle = palette.star
          ctx.beginPath()
          ctx.arc(sx, sy, Math.max(0.6, rpx), 0, Math.PI * 2)
          ctx.fill()
          continue
        }
        const d = rpx * 2 * (SHAPE_PX / (SHAPE_PX * 0.9))
        ctx.save()
        ctx.translate(sx, sy)
        ctx.rotate(r.angle)
        ctx.globalAlpha = fade
        ctx.drawImage(shapes[r.shape], -d / 2, -d / 2, d, d)
        if (r.flash > 0) {
          ctx.globalCompositeOperation = 'lighter'
          ctx.globalAlpha = r.flash * 0.55
          ctx.drawImage(shapes[r.shape], -d / 2, -d / 2, d, d)
        }
        ctx.restore()
      }
      ctx.globalAlpha = 1

      // Dust
      for (const d of dust) {
        ctx.globalAlpha = 1 - d.life / d.max
        ctx.fillStyle = d.color
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      // Lasers: from a bottom corner toward the aim point, thinning with depth
      ctx.lineCap = 'round'
      for (const b of bolts) {
        const ex = cx + b.ax * STAR_FOCAL
        const ey = cy + b.ay * STAR_FOCAL
        const t = 1 - Z_HIT / b.z
        const tt = 1 - Z_HIT / Math.max(Z_HIT, b.z - 900)
        const hx = b.sx + (ex - b.sx) * t
        const hy = b.sy + (ey - b.sy) * t
        const tx = b.sx + (ex - b.sx) * tt
        const ty = b.sy + (ey - b.sy) * tt
        const w = 1 + 5 * (Z_HIT / b.z)
        ctx.strokeStyle = palette.glow
        ctx.lineWidth = w * 2.6
        ctx.globalAlpha = 0.35
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(hx, hy)
        ctx.stroke()
        ctx.globalAlpha = 1
        ctx.strokeStyle = palette.core
        ctx.lineWidth = w
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(hx, hy)
        ctx.stroke()
      }
    }

    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
    }
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 || isOver || isOnControl(e)) return
      mx = e.clientX
      my = e.clientY
      firing = true
      if (fireTimer <= 0) {
        fire()
        fireTimer = FIRE_INTERVAL
      }
    }
    const onUp = () => {
      firing = false
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') exit()
      else if (isOver && (e.key === ' ' || e.key === 'Enter')) resetRef.current()
      if ([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) e.preventDefault()
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('blur', onUp)
    window.addEventListener('keydown', onKey)
    const stop = startLoop(step)

    return () => {
      stop()
      unfit()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('blur', onUp)
      window.removeEventListener('keydown', onKey)
    }
  }, [exit])

  return (
    <div role="application" aria-label="Rock field game" style={{ position: 'fixed', inset: 0 }}>
      <canvas ref={canvasRef} aria-hidden="true" style={{ position: 'fixed', inset: 0 }} />
      <HitFlash ref={flashRef} />
      <QuitButton onExit={exit} />

      {/* Hull and score sit where the coordinates HUD lives, so the swap reads as one HUD */}
      <div
        className="game-hud"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2.5rem',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          fontFamily: 'var(--game-font)',
          fontSize: '0.74rem',
          letterSpacing: '0.08em',
          color: 'var(--game-hud-color)',
          pointerEvents: 'none'
        }}
      >
        <div
          aria-label={`Hull ${hull} percent`}
          style={{ width: '9rem', height: '6px', borderRadius: '3px', background: 'var(--game-health-track)', overflow: 'hidden' }}
        >
          <div
            style={{
              width: `${hull}%`,
              height: '100%',
              background: 'var(--game-health-fill)',
              boxShadow: 'var(--game-health-glow)',
              transition: 'width 300ms cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />
        </div>
        <span style={{ color: 'var(--text-primary)', minWidth: '3.6rem', textAlign: 'right' }}>{pad5(score)}</span>
      </div>

      {over && <GameOverLine score={score} best={best} onRetry={retry} onExit={exit} />}
    </div>
  )
}
