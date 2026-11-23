import React, { useEffect, useRef } from 'react'
import { gameBus } from '../../game/gameBus'
import { MAX_DPR, isLowPowerDevice, lerpFactor, watchReducedMotion } from '../../game/engine'

// ============================================================================
// Celestial Star Color Palette - Single Source of Truth
// To add, remove, or modify star colors, simply edit this dictionary.
// The engine automatically derives:
// 1. Color type unions (StarColorType)
// 2. Uniform per-color quotas across all depths
// 3. Balanced beacon star assignments (equal per color)
// 4. Uniform meteor trail distribution (equal per color)
// 5. Hypersonic shooting star cycle
// 6. Real-time RGBA shader color generation
// ============================================================================
export const STAR_COLOR_PALETTE = {
  white: (alpha: number) => `rgba(230, 242, 255, ${alpha})`,     // Stellar diamond white
  yellow: (alpha: number) => `rgba(255, 210, 80, ${alpha})`,     // Solar gold / amber glow
  red: (alpha: number) => `rgba(255, 85, 85, ${alpha})`,        // Crimson dwarf glow
  green: (alpha: number) => `rgba(80, 250, 160, ${alpha})`,     // Aurora emerald glow
  cyan: (alpha: number) => `rgba(60, 230, 255, ${alpha})`,      // Electric hyperdrive cyan
  blue: (alpha: number) => `rgba(65, 140, 255, ${alpha})`,      // Starry blue (deeper than cyan, royal sapphire)
  purple: (alpha: number) => `rgba(170, 95, 255, ${alpha})`,    // Space-y cosmic purple
  magenta: (alpha: number) => `rgba(255, 75, 200, ${alpha})`,   // Vibrant stellar magenta
} as const

export type StarColorType = keyof typeof STAR_COLOR_PALETTE
export const POTENTIAL_COLORS = Object.keys(STAR_COLOR_PALETTE) as StarColorType[]

interface Star {
  x: number
  y: number
  z: number
  pz: number
  size: number
  baseOpacity: number
  colorType: StarColorType
  hasLongTrail: boolean
  shimmerPhase: number
  shimmerSpeed: number
  isVeryBright: boolean
}

interface FastStar {
  x: number
  y: number
  z: number
  pz: number
  vx: number
  vy: number
  speedMultiplier: number
  size: number
  colorType: StarColorType
}

export const StarfieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let dpr = window.devicePixelRatio || 1

    const setCanvasSize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Low-power devices get fewer stars and a 30fps cap; reduced-motion users
    // get a slow drift with no warp or parallax.
    const lowPower = isLowPowerDevice()
    const FRAME_MIN_MS = lowPower ? 1000 / 30 - 1 : 0
    let reduceMotion = false

    const numColors = POTENTIAL_COLORS.length
    // Allocate an equal number of stars per color to guarantee strict mathematical uniformity
    const starsPerColor = Math.round((lowPower ? 200 : 360) / numColors)
    const starCount = starsPerColor * numColors
    // Exactly equal number of beacon stars per color (e.g. 1 per color)
    const beaconsPerColor = Math.max(1, Math.round((starCount * 0.02) / numColors))

    const stars: Star[] = []

    for (let i = 0; i < starCount; i++) {
      const colorIndex = i % numColors
      const colorType = POTENTIAL_COLORS[colorIndex]
      const colorInstanceIndex = Math.floor(i / numColors)

      // Exactly beaconsPerColor beacon stars for EACH color
      const isVeryBright = colorInstanceIndex < beaconsPerColor

      // Exactly 1 in 4 stars of EACH color has a meteor trail (+ all beacon stars)
      const hasLongTrail = (colorInstanceIndex % 4 === 0) || isVeryBright

      // Full pulse animation from dim to bright takes 2-4 seconds for bright stars, 3-5 seconds for normal
      const pulseDurationSeconds = isVeryBright ? (2.0 + Math.random() * 1.5) : (3.0 + Math.random() * 2.0)
      const shimmerSpeed = Math.PI / (pulseDurationSeconds * 60)

      const starSize = isVeryBright
        ? Math.random() * 1.4 + 2.6 // Noticeably prominent (2.6 - 4.0)
        : hasLongTrail
          ? Math.random() * 1.6 + 1.0
          : Math.random() * 1.2 + 0.6

      const starOpacity = isVeryBright
        ? 1.0 // Maximum brilliance
        : Math.random() * 0.55 + 0.45

      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        pz: Math.random() * width,
        size: starSize,
        baseOpacity: starOpacity,
        colorType,
        hasLongTrail,
        shimmerPhase: Math.random() * Math.PI * 2,
        shimmerSpeed,
        isVeryBright
      })
    }

    // Super-fast star state (10x faster than normal stars, spawning periodically)
    let activeFastStar: FastStar | null = null
    let fastStarTimer = 90 // Spawns after ~1.5 seconds initially, then every 3-6 seconds
    let fastStarColorIndex = 0

    const spawnFastStar = (): FastStar => {
      // Cycle evenly across all potential colors in the palette
      const chosenColor = POTENTIAL_COLORS[fastStarColorIndex % POTENTIAL_COLORS.length]
      fastStarColorIndex++
      return {
        x: (Math.random() - 0.5) * width * 1.6,
        y: (Math.random() - 0.5) * height * 1.6,
        z: width * 0.9,
        pz: width * 0.9,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        speedMultiplier: 10, // 10x faster as requested
        size: Math.random() * 1.5 + 2.0,
        colorType: chosenColor
      }
    }

    // Mouse coordinates with inverse perspective lerping
    let targetMouseX = 0
    let targetMouseY = 0
    let currentMouseX = 0
    let currentMouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      // Inverse coordinates (-1 to 1)
      targetMouseX = -((e.clientX / width) * 2 - 1)
      targetMouseY = -((e.clientY / height) * 2 - 1)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        targetMouseX = -((touch.clientX / width) * 2 - 1)
        targetMouseY = -((touch.clientY / height) * 2 - 1)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchstart', handleTouchMove, { passive: true })

    // Scroll speed modifier
    let lastScrollY = window.scrollY
    let scrollSpeed = 0

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      scrollSpeed = Math.min(Math.abs(currentScrollY - lastScrollY) * 0.15, 6)
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Hyperspace / lightspeed transition state (Approach 1: 3.0s physics deceleration)
    let warpStartTime = performance.now()
    let warpDuration = 3000 // 3.0 seconds
    let isWarping = true

    const handleLightspeedJump = (e: Event) => {
      if (reduceMotion) return
      const customEvent = e as CustomEvent<{ duration?: number }>
      warpDuration = customEvent.detail?.duration || 3000
      warpStartTime = performance.now()
      isWarping = true
    }

    window.addEventListener('lightspeed:jump', handleLightspeedJump)

    // Render loop
    const baseSpeed = 0.45
    let gameBoost = 0 // eased toward gameBus.starBoostTarget while a game runs
    let isRunning = true

    // Stop drawing while the tab is hidden. Cancel any pending frame before
    // restarting so a quick hide/show can never leave two loops running.
    const handleVisibilityChange = () => {
      isRunning = !document.hidden
      cancelAnimationFrame(animationFrameId)
      if (isRunning) {
        lastFrame = performance.now()
        animationFrameId = requestAnimationFrame(render)
      }
    }

    const stopWatchingMotion = watchReducedMotion((reduce) => {
      reduceMotion = reduce
      if (reduce) isWarping = false
    })

    document.addEventListener('visibilitychange', handleVisibilityChange)

    const getColor = (colorType: string, alpha: number) => {
      const paletteFn = STAR_COLOR_PALETTE[colorType as StarColorType]
      return paletteFn ? paletteFn(alpha) : STAR_COLOR_PALETTE.white(alpha)
    }

    // ---- Pre-rendered glow sprites ------------------------------------------
    // Gradients used to be created per star, per frame (hundreds of allocations
    // every frame). Each glow is now painted once at a reference size and drawn
    // with drawImage + globalAlpha. All gradient stops scale linearly with the
    // star's alpha, so the result matches the original look.
    const REF_R = 16
    const TRAIL_W = 128
    const TRAIL_H = 32

    const makeSprite = (w: number, h: number, paint: (g: CanvasRenderingContext2D) => void) => {
      const c = document.createElement('canvas')
      c.width = Math.ceil(w)
      c.height = Math.ceil(h)
      paint(c.getContext('2d')!)
      return c
    }

    const glowSprites = {} as Record<StarColorType, HTMLCanvasElement>
    const beaconSprites = {} as Record<StarColorType, HTMLCanvasElement>
    const beaconSpikeSprites = {} as Record<StarColorType, HTMLCanvasElement>
    const trailSprites = {} as Record<StarColorType, HTMLCanvasElement>

    for (const colorType of POTENTIAL_COLORS) {
      // Medium star halo (radius 2.5r)
      const gr = REF_R * 2.5
      glowSprites[colorType] = makeSprite(gr * 2, gr * 2, (g) => {
        const grad = g.createRadialGradient(gr, gr, 0, gr, gr, gr)
        if (colorType === 'white') {
          grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
          grad.addColorStop(0.28, 'rgba(255, 255, 255, 0.9)')
          grad.addColorStop(0.65, 'rgba(215, 230, 255, 0.35)')
          grad.addColorStop(1, 'rgba(215, 230, 255, 0)')
        } else {
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)')
          grad.addColorStop(0.2, getColor(colorType, 0.95))
          grad.addColorStop(0.5, getColor(colorType, 0.85))
          grad.addColorStop(0.78, getColor(colorType, 0.35))
          grad.addColorStop(1, getColor(colorType, 0))
        }
        g.fillStyle = grad
        g.beginPath()
        g.arc(gr, gr, gr, 0, Math.PI * 2)
        g.fill()
      })

      // Beacon star: corona (4.8r) + inner halo (2.5r), optionally diffraction spikes
      const ar = REF_R * 4.8
      const paintBeacon = (withSpikes: boolean) =>
        makeSprite(ar * 2, ar * 2, (g) => {
          const aura = g.createRadialGradient(ar, ar, 0, ar, ar, ar)
          aura.addColorStop(0, getColor(colorType, 0.6))
          aura.addColorStop(0.3, getColor(colorType, 0.28))
          aura.addColorStop(0.65, getColor(colorType, 0.08))
          aura.addColorStop(1, getColor(colorType, 0))
          g.fillStyle = aura
          g.beginPath()
          g.arc(ar, ar, ar, 0, Math.PI * 2)
          g.fill()

          const ir = REF_R * 2.5
          const inner = g.createRadialGradient(ar, ar, 0, ar, ar, ir)
          inner.addColorStop(0, 'rgba(255, 255, 255, 1)')
          inner.addColorStop(0.25, 'rgba(255, 255, 255, 0.95)')
          inner.addColorStop(0.5, getColor(colorType, 0.9))
          inner.addColorStop(0.8, getColor(colorType, 0.35))
          inner.addColorStop(1, getColor(colorType, 0))
          g.fillStyle = inner
          g.beginPath()
          g.arc(ar, ar, ir, 0, Math.PI * 2)
          g.fill()

          if (withSpikes) {
            const spikeLen = REF_R * 4.5
            const spikeWidth = REF_R * 0.3
            const mid = colorType === 'white' ? 'rgba(255, 255, 255, 0.75)' : getColor(colorType, 0.85)
            const h = g.createLinearGradient(ar - spikeLen, 0, ar + spikeLen, 0)
            h.addColorStop(0, getColor(colorType, 0))
            h.addColorStop(0.5, mid)
            h.addColorStop(1, getColor(colorType, 0))
            g.fillStyle = h
            g.fillRect(ar - spikeLen, ar - spikeWidth / 2, spikeLen * 2, spikeWidth)
            const v = g.createLinearGradient(0, ar - spikeLen, 0, ar + spikeLen)
            v.addColorStop(0, getColor(colorType, 0))
            v.addColorStop(0.5, mid)
            v.addColorStop(1, getColor(colorType, 0))
            g.fillStyle = v
            g.fillRect(ar - spikeWidth / 2, ar - spikeLen, spikeWidth, spikeLen * 2)
          }
        })
      beaconSprites[colorType] = paintBeacon(false)
      beaconSpikeSprites[colorType] = paintBeacon(true)

      // Meteor trail: tapered wedge from a fine tail (x=0) to full width at the head (x=W)
      trailSprites[colorType] = makeSprite(TRAIL_W, TRAIL_H, (g) => {
        const grad = g.createLinearGradient(0, 0, TRAIL_W, 0)
        grad.addColorStop(0, getColor(colorType, 0))
        grad.addColorStop(0.35, getColor(colorType, 0.35))
        grad.addColorStop(0.85, getColor(colorType, 0.85))
        grad.addColorStop(1, getColor(colorType, 0.95))
        g.fillStyle = grad
        g.beginPath()
        g.moveTo(0, TRAIL_H / 2)
        g.lineTo(TRAIL_W, 0)
        g.lineTo(TRAIL_W, TRAIL_H)
        g.closePath()
        g.fill()
      })
    }

    // Inner white-hot spine shared by every trail
    const spineSprite = makeSprite(TRAIL_W, TRAIL_H, (g) => {
      const grad = g.createLinearGradient(0, 0, TRAIL_W, 0)
      grad.addColorStop(0, 'rgba(255, 255, 255, 0)')
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)')
      grad.addColorStop(1, 'rgba(255, 255, 255, 0.95)')
      g.fillStyle = grad
      g.beginPath()
      g.moveTo(0, TRAIL_H / 2)
      g.lineTo(TRAIL_W, 0)
      g.lineTo(TRAIL_W, TRAIL_H)
      g.closePath()
      g.fill()
    })

    // Draws a tapered meteor trail: the wedge sprite is rotated onto the motion
    // vector and stretched to its length, then the white spine on top.
    const drawMeteorTrail = (
      px: number,
      py: number,
      prevPx: number,
      prevPy: number,
      starRadius: number,
      colorType: StarColorType,
      alpha: number
    ) => {
      const dx = px - prevPx
      const dy = py - prevPy
      const len = Math.hypot(dx, dy)
      if (len < 1.0) return

      const cos = dx / len
      const sin = dy / len
      ctx.globalAlpha = Math.min(1, alpha)
      ctx.setTransform(dpr * cos, dpr * sin, -dpr * sin, dpr * cos, dpr * prevPx, dpr * prevPy)
      ctx.drawImage(trailSprites[colorType], 0, -starRadius, len, starRadius * 2)
      if (len > 2.5 && starRadius > 0.8) {
        const coreRadius = starRadius * 0.45
        ctx.drawImage(spineSprite, len * 0.4, -coreRadius, len * 0.6, coreRadius * 2)
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.globalAlpha = 1
    }

    // Draws a celestial star: white nucleus inside a chromatic glow halo.
    // Beacon stars (2%) add a broad corona and 4-point diffraction spikes.
    const drawStarBody = (
      px: number,
      py: number,
      starRadius: number,
      colorType: StarColorType,
      depthAlpha: number,
      isVeryBright: boolean = false
    ) => {
      if (isVeryBright) {
        const ar = starRadius * 4.8
        const withSpikes = starRadius * 4.5 > 4 && depthAlpha > 0.3
        ctx.globalAlpha = Math.min(1, depthAlpha)
        ctx.drawImage(withSpikes ? beaconSpikeSprites[colorType] : beaconSprites[colorType], px - ar, py - ar, ar * 2, ar * 2)
        ctx.globalAlpha = 1

        // Solid core with pure white nucleus
        ctx.beginPath()
        ctx.fillStyle = colorType === 'white' ? 'rgba(255, 255, 255, 1)' : getColor(colorType, 1)
        ctx.arc(px, py, Math.max(starRadius * 0.52, 1.0), 0, Math.PI * 2)
        ctx.fill()

        if (colorType !== 'white') {
          ctx.beginPath()
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
          ctx.arc(px, py, Math.max(starRadius * 0.28, 0.6), 0, Math.PI * 2)
          ctx.fill()
        }
        return
      }

      if (starRadius < 1.05) {
        // Distant pinpoint stars: distinct colored halo and core for colored stars
        if (colorType !== 'white') {
          ctx.beginPath()
          ctx.fillStyle = getColor(colorType, depthAlpha * 0.85)
          ctx.arc(px, py, starRadius * 1.7, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.beginPath()
        ctx.fillStyle = colorType === 'white'
          ? `rgba(255, 255, 255, ${depthAlpha})`
          : getColor(colorType, depthAlpha)
        ctx.arc(px, py, Math.max(starRadius * 0.75, 0.5), 0, Math.PI * 2)
        ctx.fill()
        return
      }

      // Medium and prominent stars: chromatic halo sprite with a bright nucleus
      const glowRadius = starRadius * 2.5
      ctx.globalAlpha = Math.min(1, depthAlpha)
      ctx.drawImage(glowSprites[colorType], px - glowRadius, py - glowRadius, glowRadius * 2, glowRadius * 2)
      ctx.globalAlpha = 1

      ctx.beginPath()
      ctx.fillStyle = colorType === 'white'
        ? `rgba(255, 255, 255, ${Math.min(depthAlpha * 1.25, 1)})`
        : getColor(colorType, Math.min(depthAlpha * 1.1, 1))
      ctx.arc(px, py, Math.max(starRadius * 0.45, 0.5), 0, Math.PI * 2)
      ctx.fill()

      if (colorType !== 'white' && starRadius > 1.6) {
        ctx.beginPath()
        ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha * 0.85})`
        ctx.arc(px, py, starRadius * 0.22, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    let lastFrame = performance.now()

    const render = () => {
      if (!isRunning) return

      // Frame-rate independence: every speed below is "per 60fps frame" and is
      // scaled by k, so stars move the same on 60Hz and 120Hz screens.
      const now = performance.now()
      if (now - lastFrame < FRAME_MIN_MS) {
        animationFrameId = requestAnimationFrame(render)
        return
      }
      const dt = Math.min(now - lastFrame, 50)
      lastFrame = now
      const k = dt / (1000 / 60)

      // Compute lightspeed warp factor (1.0 -> 0.0) with quartic ease-out
      let warpFactor = 0
      if (isWarping) {
        const elapsed = performance.now() - warpStartTime
        if (elapsed < warpDuration) {
          const progress = elapsed / warpDuration
          warpFactor = Math.pow(1 - progress, 2.5)
        } else {
          isWarping = false
          warpFactor = 0
        }
      }

      // Smooth mouse lerp
      const mouseEase = lerpFactor(0.05, dt)
      const parallaxX = reduceMotion ? 0 : targetMouseX
      const parallaxY = reduceMotion ? 0 : targetMouseY
      currentMouseX += (parallaxX - currentMouseX) * mouseEase
      currentMouseY += (parallaxY - currentMouseY) * mouseEase

      // Decay scroll boost
      scrollSpeed *= Math.pow(0.92, k)

      // High-velocity deceleration: peak speed ~50x normal speed, decaying smoothly down to baseSpeed
      const maxWarpBoost = 50.0
      gameBoost += (gameBus.starBoostTarget - gameBoost) * lerpFactor(0.03, dt)
      const motionScale = reduceMotion ? 0.25 : 1
      const activeSpeed = (baseSpeed + scrollSpeed + maxWarpBoost * warpFactor + gameBoost) * motionScale

      // Clear with deep void pitch black
      ctx.fillStyle = '#070709'
      ctx.fillRect(0, 0, width, height)

      const cx = width / 2 + currentMouseX * 120
      const cy = height / 2 + currentMouseY * 90
      // Publish the vanishing point so game objects share the starfield's projection
      gameBus.starCenterX = cx
      gameBus.starCenterY = cy

      // 1. Render normal stars
      for (let i = 0; i < starCount; i++) {
        const star = stars[i]
        star.z -= activeSpeed * k

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * width * 2
          star.y = (Math.random() - 0.5) * height * 2
          star.z = width
          star.pz = width
          const pulseDurationSeconds = star.isVeryBright ? (2.0 + Math.random() * 1.5) : (3.0 + Math.random() * 2.0)
          star.shimmerSpeed = Math.PI / (pulseDurationSeconds * 60)
        }

        // Shimmer oscillation for non-static, sparkling stars
        star.shimmerPhase += star.shimmerSpeed * k
        const shimmer = 0.72 + Math.sin(star.shimmerPhase) * 0.28

        // 3D projection for current position
        const proj = 220 / star.z
        const px = star.x * proj + cx
        const py = star.y * proj + cy

        // 3D projection for tail end position
        // In hyperspace warp, ALL stars stretch into luminous radial beams that contract back as speed drops
        let trailDepth: number
        if (warpFactor > 0.005) {
          const warpTrailExtension = activeSpeed * (16 + warpFactor * 36)
          trailDepth = star.z + warpTrailExtension
        } else {
          // Trail = one 60fps frame of travel, so trail length is refresh-rate independent
          trailDepth = star.hasLongTrail ? star.z + activeSpeed * 26 : star.z + activeSpeed
        }

        const pk = 220 / Math.min(trailDepth, width * 2)
        const prevPx = star.x * pk + cx
        const prevPy = star.y * pk + cy

        // Evenly distributed stellar color maintained across all conditions and depths
        const currentColorType = star.colorType

        if (px >= -30 && px <= width + 30 && py >= -30 && py <= height + 30) {
          const minAlpha = star.isVeryBright ? 0.45 : 0.08
          const depthAlpha = Math.min(
            Math.max((1 - star.z / width) * star.baseOpacity * shimmer * (1 + warpFactor * 0.4), minAlpha),
            1
          )
          const minRadius = star.isVeryBright ? 1.35 : 0.65
          const starRadius = Math.max(star.size * proj * 0.45 * (0.85 + shimmer * 0.15), minRadius)

          // Draw tapered meteor trail if moving fast, has long trail, or in warp
          if (star.hasLongTrail || activeSpeed > 1.2 || warpFactor > 0.008) {
            drawMeteorTrail(
              px,
              py,
              prevPx,
              prevPy,
              starRadius,
              currentColorType,
              depthAlpha * (0.75 + warpFactor * 0.22)
            )
          }

          // Draw star body: blown-out white center with chromatic glow halo (plus glint for 2% bright stars)
          drawStarBody(px, py, starRadius, currentColorType, depthAlpha, star.isVeryBright)
        }

        star.pz = star.z
      }

      // 2. Render 10x Super-Fast Star ("every now and then")
      if (!activeFastStar) {
        if (warpFactor < 0.05) {
          fastStarTimer -= k
        } else {
          fastStarTimer = 120
        }
        if (fastStarTimer <= 0) {
          activeFastStar = spawnFastStar()
          fastStarTimer = 180 + Math.random() * 260 // Next one in ~3 to 7 seconds
        }
      } else {
        const fast = activeFastStar
        const fastZStep = activeSpeed * fast.speedMultiplier

        fast.z -= fastZStep * k
        fast.x += fast.vx * activeSpeed * 6 * k
        fast.y += fast.vy * activeSpeed * 6 * k

        if (fast.z <= 10) {
          activeFastStar = null
        } else {
          const k = 220 / fast.z
          const px = fast.x * k + cx
          const py = fast.y * k + cy

          // Long hypersonic trail behind the 10x fast star
          const trailDepth = fast.z + fastZStep * 3.5
          const pk = 220 / Math.min(trailDepth, width)
          const prevPx = fast.x * pk + cx
          const prevPy = fast.y * pk + cy

          if (px >= -60 && px <= width + 60 && py >= -60 && py <= height + 60) {
            const depthAlpha = Math.min(Math.max((1 - fast.z / width) * 1.2, 0.2), 1)
            const fastRadius = Math.max(fast.size * k * 0.55, 1.4)

            // Blazing tapered meteor trail with hot white spine
            drawMeteorTrail(px, py, prevPx, prevPy, fastRadius, fast.colorType, depthAlpha * 0.95)

            // Hypersonic star body with radiant chromatic halo & blown out nucleus
            drawStarBody(px, py, fastRadius, fast.colorType, depthAlpha)
          }

          fast.pz = fast.z
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchstart', handleTouchMove)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('lightspeed:jump', handleLightspeedJump)
      stopWatchingMotion()
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none'
      }}
      aria-hidden="true"
    />
  )
}
