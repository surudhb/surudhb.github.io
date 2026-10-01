import React, { useEffect, useRef } from 'react'
import {
  SPRITE_SHEET_2X_URL,
  DINO_SPRITES_HDPI,
  SpriteRect
} from './dinoSprites'

interface CloudInstance {
  x: number
  y: number
  speed: number
  scale: number
}

interface PterodactylInstance {
  x: number
  y: number
  speed: number
  wingFrame: number
  wingTimer: number
  scale: number
}

interface CactusInstance {
  x: number
  layer: 'bg' | 'fg'
  speed: number
  scale: number
  opacity: number
  yOffset: number
  sprite: SpriteRect
}

interface TowerInstance {
  x: number
}

/**
 * Draws electrical transmission towers (pylons) and sagging power lines
 * situated in the middle sky corridor between the running T-Rex and flying pterodactyls.
 */
function drawTransmissionTowersAndLines(
  ctx: CanvasRenderingContext2D,
  towers: TowerInstance[],
  horizonY: number,
  towerH: number
) {
  if (towers.length === 0) return

  ctx.save()
  ctx.strokeStyle = '#535353'
  ctx.fillStyle = '#535353'
  ctx.globalAlpha = 0.34

  const topY = horizonY - towerH
  const baseY = horizonY

  // Sleek, tall minimalist pylon proportions
  const arm1Y = topY + towerH * 0.14
  const arm2Y = topY + towerH * 0.28
  const waistY = topY + towerH * 0.42
  const midY = (waistY + baseY) / 2

  const baseW = 40
  const waistW = 14
  const topW = 8
  const midW = (waistW + baseW) / 2

  const arm1W = 68 // upper crossarm span
  const arm2W = 88 // lower crossarm span

  // 1. Draw Continuous Power Lines (Sleek, graceful sweeping catenaries)
  // Continuous lines that span across the full viewport from offscreen left to offscreen right
  const cables = [
    { xOff: -arm1W / 2, y: arm1Y, sagFactor: 0.062 },
    { xOff: arm1W / 2, y: arm1Y, sagFactor: 0.062 },
    { xOff: -arm2W / 2, y: arm2Y, sagFactor: 0.068 },
    { xOff: arm2W / 2, y: arm2Y, sagFactor: 0.068 }
  ]

  ctx.lineWidth = 1.0
  for (const cable of cables) {
    ctx.beginPath()
    let started = false

    for (let i = 0; i < towers.length - 1; i++) {
      const t1 = towers[i]
      const t2 = towers[i + 1]
      const span = t2.x - t1.x
      if (span <= 0) continue

      const x1 = t1.x + cable.xOff
      const x2 = t2.x + cable.xOff
      const midX = (x1 + x2) / 2
      // Control point offset for quadratic bezier to yield natural graceful drape (~42-46px visual sag)
      const ctrlY = cable.y + span * cable.sagFactor

      if (!started) {
        ctx.moveTo(x1, cable.y)
        started = true
      }
      ctx.quadraticCurveTo(midX, ctrlY, x2, cable.y)
    }
    ctx.stroke()
  }

  // 2. Draw each Transmission Tower (Minimalist Line-Art Pylon)
  for (const t of towers) {
    const x = Math.round(t.x)

    // Skip drawing if tower structure is completely off-screen
    if (x < -100 || x > ctx.canvas.width + 100) continue

    // Outer Main Structural Legs (clean slender silhouette)
    ctx.lineWidth = 1.2
    ctx.beginPath()
    ctx.moveTo(x - baseW / 2, baseY)
    ctx.lineTo(x - waistW / 2, waistY)
    ctx.lineTo(x - topW / 2, arm1Y)
    ctx.lineTo(x, topY)
    ctx.lineTo(x + topW / 2, arm1Y)
    ctx.lineTo(x + waistW / 2, waistY)
    ctx.lineTo(x + baseW / 2, baseY)
    ctx.stroke()

    // Central Vertical Mast Spine (from peak down through waist)
    ctx.lineWidth = 0.85
    ctx.beginPath()
    ctx.moveTo(x, topY)
    ctx.lineTo(x, waistY)
    ctx.stroke()

    // Horizontal Crossarms (2 clean horizontal bars)
    ctx.lineWidth = 1.2
    ctx.beginPath()
    // Arm 1 (Upper)
    ctx.moveTo(x - arm1W / 2, arm1Y)
    ctx.lineTo(x + arm1W / 2, arm1Y)
    // Arm 2 (Lower)
    ctx.moveTo(x - arm2W / 2, arm2Y)
    ctx.lineTo(x + arm2W / 2, arm2Y)
    ctx.stroke()

    // Crossarm Diagonal Reinforcing Struts
    ctx.lineWidth = 0.75
    ctx.beginPath()
    // Arm 1 braces
    ctx.moveTo(x, arm1Y - 12)
    ctx.lineTo(x - arm1W / 2, arm1Y)
    ctx.moveTo(x, arm1Y - 12)
    ctx.lineTo(x + arm1W / 2, arm1Y)
    // Arm 2 braces
    ctx.moveTo(x, arm2Y - 14)
    ctx.lineTo(x - arm2W / 2, arm2Y)
    ctx.moveTo(x, arm2Y - 14)
    ctx.lineTo(x + arm2W / 2, arm2Y)
    ctx.stroke()

    // Waist Horizontal Tie
    ctx.lineWidth = 0.8
    ctx.beginPath()
    ctx.moveTo(x - waistW / 2, waistY)
    ctx.lineTo(x + waistW / 2, waistY)
    ctx.stroke()

    // Upper Cage Diagonal Struts (between waist and arm 2)
    ctx.lineWidth = 0.75
    ctx.beginPath()
    ctx.moveTo(x - waistW / 2, waistY)
    ctx.lineTo(x, arm2Y)
    ctx.lineTo(x + waistW / 2, waistY)
    ctx.stroke()

    // Lower Tower Lattice: 2 Sleek Structural Bays with Single X-Brace each
    ctx.lineWidth = 0.75
    // Bay 1: Waist to Mid
    ctx.beginPath()
    ctx.moveTo(x - midW / 2, midY)
    ctx.lineTo(x + midW / 2, midY)
    ctx.moveTo(x - waistW / 2, waistY)
    ctx.lineTo(x + midW / 2, midY)
    ctx.moveTo(x + waistW / 2, waistY)
    ctx.lineTo(x - midW / 2, midY)
    // Bay 2: Mid to Base
    ctx.moveTo(x - midW / 2, midY)
    ctx.lineTo(x + baseW / 2, baseY)
    ctx.moveTo(x + midW / 2, midY)
    ctx.lineTo(x - baseW / 2, baseY)
    ctx.stroke()
  }

  ctx.restore()
}

export const DinoRunnerCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let isRunning = !document.hidden
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
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.imageSmoothingEnabled = false
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Load authentic Chromium 200% HDPI sprite sheet
    const spriteSheet = new Image()
    spriteSheet.src = SPRITE_SHEET_2X_URL

    // Ground scroll state
    let groundOffsetX = 0
    const GROUND_SPEED = 2.4 // steady pace

    // T-Rex state
    let runFrame = 0
    let runTimer = 0
    const RUN_INTERVAL = 120 // ms per step

    // Clouds (7 clouds spread across sky with varied altitudes and scales)
    const clouds: CloudInstance[] = [
      { x: width * 0.08, y: 45, speed: 0.38, scale: 1.1 },
      { x: width * 0.26, y: 110, speed: 0.28, scale: 0.85 },
      { x: width * 0.44, y: 65, speed: 0.42, scale: 1.0 },
      { x: width * 0.62, y: 145, speed: 0.32, scale: 0.9 },
      { x: width * 0.78, y: 55, speed: 0.46, scale: 1.2 },
      { x: width * 0.92, y: 125, speed: 0.35, scale: 0.8 },
      { x: width * 1.12, y: 80, speed: 0.4, scale: 1.05 }
    ]

    // Pterodactyls (Active flock: start with 2 birds gliding comfortably below nav blur)
    const pterodactyls: PterodactylInstance[] = [
      {
        x: width * 0.55,
        y: 195,
        speed: 3.4,
        wingFrame: 0,
        wingTimer: 0,
        scale: 1.05
      },
      {
        x: width * 0.92,
        y: 255,
        speed: 3.8,
        wingFrame: 1,
        wingTimer: 60,
        scale: 1.0
      }
    ]

    let pteroSpawnTimer = 0

    // Cacti variety pool
    const allCacti: SpriteRect[] = [
      ...DINO_SPRITES_HDPI.CACTUS_SMALL,
      ...DINO_SPRITES_HDPI.CACTUS_LARGE
    ]

    // Pre-seed cacti around the path (both background receding and foreground verge)
    const cacti: CactusInstance[] = [
      // Background cacti (receding behind the path ridge)
      {
        x: width * 0.22,
        layer: 'bg',
        speed: GROUND_SPEED * 0.72,
        scale: 0.7,
        opacity: 0.36,
        yOffset: -6,
        sprite: DINO_SPRITES_HDPI.CACTUS_SMALL[0]
      },
      {
        x: width * 0.48,
        layer: 'bg',
        speed: GROUND_SPEED * 0.72,
        scale: 0.75,
        opacity: 0.38,
        yOffset: -8,
        sprite: DINO_SPRITES_HDPI.CACTUS_LARGE[0]
      },
      {
        x: width * 0.76,
        layer: 'bg',
        speed: GROUND_SPEED * 0.72,
        scale: 0.68,
        opacity: 0.34,
        yOffset: -5,
        sprite: DINO_SPRITES_HDPI.CACTUS_SMALL[1]
      },
      {
        x: width * 1.05,
        layer: 'bg',
        speed: GROUND_SPEED * 0.72,
        scale: 0.72,
        opacity: 0.36,
        yOffset: -7,
        sprite: DINO_SPRITES_HDPI.CACTUS_LARGE[1]
      },
      // Foreground verge cacti (along the lower desert perimeter)
      {
        x: width * 0.35,
        layer: 'fg',
        speed: GROUND_SPEED,
        scale: 0.85,
        opacity: 0.46,
        yOffset: 8,
        sprite: DINO_SPRITES_HDPI.CACTUS_SMALL[2]
      },
      {
        x: width * 0.68,
        layer: 'fg',
        speed: GROUND_SPEED,
        scale: 0.82,
        opacity: 0.44,
        yOffset: 11,
        sprite: DINO_SPRITES_HDPI.CACTUS_LARGE[0]
      },
      {
        x: width * 1.18,
        layer: 'fg',
        speed: GROUND_SPEED,
        scale: 0.88,
        opacity: 0.48,
        yOffset: 9,
        sprite: DINO_SPRITES_HDPI.CACTUS_SMALL[1]
      }
    ]

    // Transmission Towers & Power Lines state (sparse, tall, minimalist)
    const TOWER_SPACING = 1350
    const towers: TowerInstance[] = []
    const startTowerX = -TOWER_SPACING * 2
    const endTowerX = width + TOWER_SPACING * 2.5
    for (let tx = startTowerX; tx < endTowerX; tx += TOWER_SPACING) {
      towers.push({ x: tx })
    }

    let lastTime = performance.now()

    const animate = (currentTime: number) => {
      const dt = Math.min(currentTime - lastTime, 100)
      lastTime = currentTime

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Ensure crisp pixel rendering
      ctx.imageSmoothingEnabled = false

      // Horizon line Y coordinate
      const horizonY = Math.min(height - 110, height * 0.88)

      // 1. Draw Clouds
      ctx.save()
      const cloudSprite = DINO_SPRITES_HDPI.CLOUD
      for (const cloud of clouds) {
        cloud.x -= cloud.speed
        const renderW = cloudSprite.dw * cloud.scale
        const renderH = cloudSprite.dh * cloud.scale
        if (cloud.x + renderW < -50) {
          cloud.x = width + Math.random() * 160
          cloud.y = 35 + Math.random() * 160
          cloud.speed = 0.24 + Math.random() * 0.26
          cloud.scale = 0.8 + Math.random() * 0.45
        }

        ctx.globalAlpha = 0.38
        if (spriteSheet.complete && spriteSheet.naturalWidth > 0) {
          ctx.drawImage(
            spriteSheet,
            cloudSprite.sx,
            cloudSprite.sy,
            cloudSprite.sw,
            cloudSprite.sh,
            Math.round(cloud.x),
            Math.round(cloud.y),
            renderW,
            renderH
          )
        }
      }
      ctx.restore()

      // 2. Draw Background Cacti (receding behind the horizon line)
      ctx.save()
      for (const c of cacti) {
        if (c.layer !== 'bg') continue
        c.x -= c.speed
        const renderW = c.sprite.dw * c.scale
        const renderH = c.sprite.dh * c.scale

        if (c.x + renderW < -80) {
          c.x = width + Math.random() * 200 + 50
          c.sprite = allCacti[Math.floor(Math.random() * allCacti.length)]
          c.scale = 0.65 + Math.random() * 0.12
          c.yOffset = -(Math.floor(Math.random() * 6) + 4)
        }

        // Draw background cactus sitting behind the horizon ridge
        const cactusY = horizonY - renderH + c.yOffset
        ctx.globalAlpha = c.opacity
        if (spriteSheet.complete && spriteSheet.naturalWidth > 0) {
          ctx.drawImage(
            spriteSheet,
            c.sprite.sx,
            c.sprite.sy,
            c.sprite.sw,
            c.sprite.sh,
            Math.round(c.x),
            Math.round(cactusY),
            renderW,
            renderH
          )
        }
      }
      ctx.restore()

      // 2.5 Draw Transmission Towers & Sagging Power Lines (middle altitude corridor between T-Rex and Pterodactyls)
      for (const t of towers) {
        t.x -= GROUND_SPEED
      }

      // Recycle towers that go past the left edge (keep generous 2x buffer so power lines never cut off)
      while (towers.length > 0 && towers[0].x < -TOWER_SPACING * 2) {
        const removed = towers.shift()!
        const lastX = towers[towers.length - 1].x
        removed.x = lastX + TOWER_SPACING
        towers.push(removed)
      }

      // Ensure enough towers on the right (keep generous 2x buffer)
      while (towers.length > 0 && towers[towers.length - 1].x < width + TOWER_SPACING * 2) {
        const lastX = towers[towers.length - 1].x
        towers.push({ x: lastX + TOWER_SPACING })
      }

      const towerH = Math.min(540, Math.max(380, horizonY * 0.62))
      drawTransmissionTowersAndLines(ctx, towers, horizonY, towerH)

      // 3. Draw Ground Line & Scrolling Horizon Terrain
      groundOffsetX = (groundOffsetX + GROUND_SPEED) % 600
      ctx.save()
      ctx.globalAlpha = 0.48

      // Draw horizon sprite repeated across width
      const horizonSprite = DINO_SPRITES_HDPI.HORIZON
      const tileWidth = horizonSprite.dw // 600px
      const startX = -groundOffsetX
      if (spriteSheet.complete && spriteSheet.naturalWidth > 0) {
        for (let x = startX; x < width + tileWidth; x += tileWidth) {
          ctx.drawImage(
            spriteSheet,
            horizonSprite.sx,
            horizonSprite.sy,
            horizonSprite.sw,
            horizonSprite.sh,
            Math.round(x),
            Math.round(horizonY - 2),
            tileWidth,
            horizonSprite.dh
          )
        }
      }

      // Baseline solid line
      ctx.fillStyle = '#535353'
      ctx.fillRect(0, horizonY, width, 2)
      ctx.restore()

      // 4. Draw Foreground Verge Cacti (slightly in front of the horizon track)
      ctx.save()
      for (const c of cacti) {
        if (c.layer !== 'fg') continue
        c.x -= c.speed
        const renderW = c.sprite.dw * c.scale
        const renderH = c.sprite.dh * c.scale

        if (c.x + renderW < -80) {
          c.x = width + Math.random() * 220 + 80
          c.sprite = allCacti[Math.floor(Math.random() * allCacti.length)]
          c.scale = 0.78 + Math.random() * 0.12
          c.yOffset = Math.floor(Math.random() * 6) + 7
        }

        const cactusY = horizonY + c.yOffset
        ctx.globalAlpha = c.opacity
        if (spriteSheet.complete && spriteSheet.naturalWidth > 0) {
          ctx.drawImage(
            spriteSheet,
            c.sprite.sx,
            c.sprite.sy,
            c.sprite.sw,
            c.sprite.sh,
            Math.round(c.x),
            Math.round(cactusY),
            renderW,
            renderH
          )
        }
      }
      ctx.restore()

      // 5. Draw Steady Running T-Rex
      runTimer += dt
      if (runTimer >= RUN_INTERVAL) {
        runTimer = 0
        runFrame = runFrame === 0 ? 1 : 0
      }

      const activeDinoSprite =
        runFrame === 0 ? DINO_SPRITES_HDPI.TREX.RUN_1 : DINO_SPRITES_HDPI.TREX.RUN_2
      const dinoScale = 1.08
      const dinoW = activeDinoSprite.dw * dinoScale
      const dinoH = activeDinoSprite.dh * dinoScale
      const dinoX = Math.max(60, width * 0.08)
      const dinoY = horizonY - dinoH + 2 // securely placed on the horizon line

      ctx.save()
      ctx.globalAlpha = 0.72
      if (spriteSheet.complete && spriteSheet.naturalWidth > 0) {
        ctx.drawImage(
          spriteSheet,
          activeDinoSprite.sx,
          activeDinoSprite.sy,
          activeDinoSprite.sw,
          activeDinoSprite.sh,
          Math.round(dinoX),
          Math.round(dinoY),
          dinoW,
          dinoH
        )
      }
      ctx.restore()

      // 6. Spawn & Draw Pterodactyls (Birds)
      pteroSpawnTimer += dt
      // Continuous generation: ensure 2 to 3 birds in the sky below nav blur
      if (pteroSpawnTimer > 3200 && pterodactyls.length < 3) {
        pteroSpawnTimer = 0
        const altitudes = [185, 235, 285]
        const randomAlt = altitudes[Math.floor(Math.random() * altitudes.length)]
        pterodactyls.push({
          x: width + 60,
          y: randomAlt + (Math.random() * 30 - 15),
          speed: 3.0 + Math.random() * 1.4,
          wingFrame: 0,
          wingTimer: 0,
          scale: 0.95 + Math.random() * 0.15
        })
      }

      ctx.save()
      for (let i = pterodactyls.length - 1; i >= 0; i--) {
        const p = pterodactyls[i]
        p.x -= p.speed
        p.wingTimer += dt
        if (p.wingTimer >= 160) {
          p.wingTimer = 0
          p.wingFrame = p.wingFrame === 0 ? 1 : 0
        }

        const pteroSprite =
          p.wingFrame === 0
            ? DINO_SPRITES_HDPI.PTERODACTYL.WING_UP
            : DINO_SPRITES_HDPI.PTERODACTYL.WING_DOWN

        const pteroW = pteroSprite.dw * p.scale
        const pteroH = pteroSprite.dh * p.scale

        ctx.globalAlpha = 0.62
        if (spriteSheet.complete && spriteSheet.naturalWidth > 0) {
          ctx.drawImage(
            spriteSheet,
            pteroSprite.sx,
            pteroSprite.sy,
            pteroSprite.sw,
            pteroSprite.sh,
            Math.round(p.x),
            Math.round(p.y),
            pteroW,
            pteroH
          )
        }

        // Remove when flown completely past left screen edge
        if (p.x + pteroW < -60) {
          pterodactyls.splice(i, 1)
        }
      }
      ctx.restore()

      if (isRunning) animationFrameId = requestAnimationFrame(animate)
    }

    const handleVisibilityChange = () => {
      isRunning = !document.hidden
      if (isRunning) animationFrameId = requestAnimationFrame(animate)
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    if (isRunning) animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: '-4px',
        left: '-4px',
        width: 'calc(100vw + 8px)',
        height: 'calc(100vh + 8px)',
        pointerEvents: 'none',
        zIndex: 0,
        filter: 'blur(0.5px)',
        WebkitFilter: 'blur(0.5px)',
        transform: 'translateZ(0)'
      }}
    />
  )
}
