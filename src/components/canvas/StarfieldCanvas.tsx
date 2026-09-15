import React, { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  z: number
  pz: number
  size: number
  baseOpacity: number
  colorType: 'white' | 'yellow' | 'red' | 'green'
  hasLongTrail: boolean
  shimmerPhase: number
  shimmerSpeed: number
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
  colorType: 'white' | 'yellow' | 'cyan'
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
      dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Star generation with subtle stellar color tints, long trails & shimmer
    const starCount = 360
    const stars: Star[] = []

    for (let i = 0; i < starCount; i++) {
      // ~18% of stars receive a subtle stellar tint and meteor trails
      const rand = Math.random()
      let colorType: 'white' | 'yellow' | 'red' | 'green' = 'white'
      let hasLongTrail = false

      if (rand < 0.07) {
        colorType = 'yellow' // Solar amber / warm gold
        hasLongTrail = true
      } else if (rand < 0.13) {
        colorType = 'red'    // Crimson dwarf
        hasLongTrail = true
      } else if (rand < 0.18) {
        colorType = 'green'  // Aurora emerald
        hasLongTrail = true
      }

      // Full pulse animation from dim to bright takes 3-5 seconds, randomized per star
      const pulseDurationSeconds = 3.0 + Math.random() * 2.0
      const shimmerSpeed = Math.PI / (pulseDurationSeconds * 60)

      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        pz: Math.random() * width,
        size: hasLongTrail ? Math.random() * 1.6 + 0.9 : Math.random() * 1.2 + 0.4,
        baseOpacity: Math.random() * 0.6 + 0.35,
        colorType,
        hasLongTrail,
        shimmerPhase: Math.random() * Math.PI * 2,
        shimmerSpeed
      })
    }

    // Super-fast star state (10x faster than normal stars, spawning periodically)
    let activeFastStar: FastStar | null = null
    let fastStarTimer = 90 // Spawns after ~1.5 seconds initially, then every 3-6 seconds

    const spawnFastStar = (): FastStar => {
      const colors: ('white' | 'yellow' | 'cyan')[] = ['white', 'yellow', 'cyan']
      const chosenColor = colors[Math.floor(Math.random() * colors.length)]
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

    // Render loop
    const baseSpeed = 0.45
    let isRunning = true

    const handleVisibilityChange = () => {
      isRunning = !document.hidden
      if (isRunning) {
        render()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    const getColor = (colorType: string, alpha: number) => {
      switch (colorType) {
        case 'yellow':
          return `rgba(255, 200, 85, ${alpha})`   // Solar gold / amber glow
        case 'red':
          return `rgba(255, 95, 95, ${alpha})`    // Crimson dwarf glow
        case 'green':
          return `rgba(90, 245, 175, ${alpha})`   // Aurora emerald glow
        case 'cyan':
          return `rgba(100, 225, 255, ${alpha})`  // Electric cyan glow
        default:
          return `rgba(200, 225, 255, ${alpha})`  // Stellar white-blue glow
      }
    }

    // Draws a tapered meteor trail that starts as thick as the star circle and tapers to a fine tip
    // Features an outer chromatic glow envelope and an inner white-hot core spine
    const drawMeteorTrail = (
      px: number,
      py: number,
      prevPx: number,
      prevPy: number,
      starRadius: number,
      colorType: string,
      alpha: number
    ) => {
      const dx = px - prevPx
      const dy = py - prevPy
      const len = Math.hypot(dx, dy)
      if (len < 1.0) return

      const dirAngle = Math.atan2(dy, dx)
      const angle1 = dirAngle + Math.PI / 2
      const angle2 = dirAngle - Math.PI / 2

      // 1. Outer chromatic glow envelope (starts at full star diameter, tapers to fine tip)
      const grad = ctx.createLinearGradient(prevPx, prevPy, px, py)
      grad.addColorStop(0, getColor(colorType, 0))
      grad.addColorStop(0.35, getColor(colorType, alpha * 0.35))
      grad.addColorStop(0.85, getColor(colorType, alpha * 0.85))
      grad.addColorStop(1, getColor(colorType, alpha * 0.95))

      ctx.beginPath()
      ctx.moveTo(prevPx, prevPy)
      ctx.lineTo(px + Math.cos(angle1) * starRadius, py + Math.sin(angle1) * starRadius)
      ctx.arc(px, py, starRadius, angle1, angle2, true)
      ctx.lineTo(prevPx, prevPy)
      ctx.closePath()

      ctx.fillStyle = grad
      ctx.fill()

      // 2. Inner hot white spine (starts at the blown-out white core and tapers along the trail)
      if (len > 2.5 && starRadius > 0.8) {
        const coreRadius = starRadius * 0.45
        const spineTailX = px - dx * 0.6
        const spineTailY = py - dy * 0.6

        const whiteGrad = ctx.createLinearGradient(spineTailX, spineTailY, px, py)
        whiteGrad.addColorStop(0, 'rgba(255, 255, 255, 0)')
        whiteGrad.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 0.5})`)
        whiteGrad.addColorStop(1, `rgba(255, 255, 255, ${alpha * 0.95})`)

        ctx.beginPath()
        ctx.moveTo(spineTailX, spineTailY)
        ctx.lineTo(px + Math.cos(angle1) * coreRadius, py + Math.sin(angle1) * coreRadius)
        ctx.arc(px, py, coreRadius, angle1, angle2, true)
        ctx.lineTo(spineTailX, spineTailY)
        ctx.closePath()

        ctx.fillStyle = whiteGrad
        ctx.fill()
      }
    }

    // Draws an authentic celestial star:
    // Blown-out white nucleus (saturation of the human eye) surrounded by a soft chromatic glow halo
    const drawStarBody = (
      px: number,
      py: number,
      starRadius: number,
      colorType: string,
      depthAlpha: number
    ) => {
      if (starRadius < 0.9) {
        // Distant pinpoint stars
        if (colorType !== 'white') {
          ctx.beginPath()
          ctx.fillStyle = getColor(colorType, depthAlpha * 0.6)
          ctx.arc(px, py, starRadius * 1.6, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.beginPath()
        ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha})`
        ctx.arc(px, py, starRadius * 0.7, 0, Math.PI * 2)
        ctx.fill()
        return
      }

      // Medium and prominent stars: Chromatic glow halo with blown-out white core
      const glowRadius = starRadius * 2.4
      const radGrad = ctx.createRadialGradient(px, py, 0, px, py, glowRadius)
      radGrad.addColorStop(0, `rgba(255, 255, 255, ${depthAlpha})`)
      radGrad.addColorStop(0.24, `rgba(255, 255, 255, ${depthAlpha * 0.95})`)
      radGrad.addColorStop(0.44, getColor(colorType, depthAlpha * 0.85))
      radGrad.addColorStop(0.72, getColor(colorType, depthAlpha * 0.3))
      radGrad.addColorStop(1, getColor(colorType, 0))

      ctx.beginPath()
      ctx.fillStyle = radGrad
      ctx.arc(px, py, glowRadius, 0, Math.PI * 2)
      ctx.fill()

      // Solid blown-out white nucleus at the center
      ctx.beginPath()
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(depthAlpha * 1.25, 1)})`
      ctx.arc(px, py, Math.max(starRadius * 0.42, 0.5), 0, Math.PI * 2)
      ctx.fill()
    }

    const render = () => {
      if (!isRunning) return

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05
      currentMouseY += (targetMouseY - currentMouseY) * 0.05

      // Decay scroll boost
      scrollSpeed *= 0.92
      const activeSpeed = baseSpeed + scrollSpeed

      // Clear with deep void pitch black
      ctx.fillStyle = '#070709'
      ctx.fillRect(0, 0, width, height)

      const cx = width / 2 + currentMouseX * 120
      const cy = height / 2 + currentMouseY * 90

      // 1. Render normal stars
      for (let i = 0; i < starCount; i++) {
        const star = stars[i]
        star.z -= activeSpeed

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * width * 2
          star.y = (Math.random() - 0.5) * height * 2
          star.z = width
          star.pz = width
          star.shimmerSpeed = Math.PI / ((3.0 + Math.random() * 2.0) * 60)
        }

        // Shimmer oscillation for non-static, sparkling stars
        star.shimmerPhase += star.shimmerSpeed
        const shimmer = 0.72 + Math.sin(star.shimmerPhase) * 0.28

        // 3D projection for current position
        const k = 220 / star.z
        const px = star.x * k + cx
        const py = star.y * k + cy

        // 3D projection for tail end position
        // Stars with trails extend back significantly for a visible meteor tail
        const trailDepth = star.hasLongTrail ? star.z + activeSpeed * 26 : star.pz
        const pk = 220 / Math.min(trailDepth, width)
        const prevPx = star.x * pk + cx
        const prevPy = star.y * pk + cy

        if (px >= -30 && px <= width + 30 && py >= -30 && py <= height + 30) {
          const depthAlpha = Math.min(Math.max((1 - star.z / width) * star.baseOpacity * shimmer, 0.08), 1)
          const starRadius = Math.max(star.size * k * 0.45 * (0.85 + shimmer * 0.15), 0.65)

          // Draw tapered meteor trail if moving fast or has long trail
          if (star.hasLongTrail || activeSpeed > 1.2) {
            drawMeteorTrail(px, py, prevPx, prevPy, starRadius, star.colorType, depthAlpha * 0.75)
          }

          // Draw star body: blown-out white center with chromatic glow halo
          drawStarBody(px, py, starRadius, star.colorType, depthAlpha)
        }

        star.pz = star.z
      }

      // 2. Render 10x Super-Fast Star ("every now and then")
      if (!activeFastStar) {
        fastStarTimer--
        if (fastStarTimer <= 0) {
          activeFastStar = spawnFastStar()
          fastStarTimer = 180 + Math.random() * 260 // Next one in ~3 to 7 seconds
        }
      } else {
        const fast = activeFastStar
        const fastZStep = activeSpeed * fast.speedMultiplier

        fast.z -= fastZStep
        fast.x += fast.vx * activeSpeed * 6
        fast.y += fast.vy * activeSpeed * 6

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
