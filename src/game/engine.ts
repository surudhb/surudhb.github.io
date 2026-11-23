// Small shared helpers for the canvas games: loop, canvas sizing, sprites, scores.

/** requestAnimationFrame loop that pauses while the tab is hidden. Returns a stop function. */
export const startLoop = (step: (dtMs: number) => void): (() => void) => {
  let id = 0
  let last = performance.now()
  let stopped = false

  const tick = (now: number) => {
    if (stopped) return
    const dt = Math.min(now - last, 50)
    last = now
    step(dt)
    id = requestAnimationFrame(tick)
  }

  const onVisibility = () => {
    cancelAnimationFrame(id)
    if (!document.hidden && !stopped) {
      last = performance.now()
      id = requestAnimationFrame(tick)
    }
  }

  document.addEventListener('visibilitychange', onVisibility)
  if (!document.hidden) id = requestAnimationFrame(tick)

  return () => {
    stopped = true
    cancelAnimationFrame(id)
    document.removeEventListener('visibilitychange', onVisibility)
  }
}

/** Device pixel ratio cap for full-screen canvases: 3x screens cost 2.25x the pixels of 2x for no visible gain. */
export const MAX_DPR = 2

export interface CanvasSize {
  width: number
  height: number
}

/** Keeps a full-viewport canvas sized for the device pixel ratio. Returns a cleanup function. */
export const fitCanvas = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, size: CanvasSize) => {
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
    size.width = window.innerWidth
    size.height = window.innerHeight
    canvas.width = Math.round(size.width * dpr)
    canvas.height = Math.round(size.height * dpr)
    canvas.style.width = `${size.width}px`
    canvas.style.height = `${size.height}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.imageSmoothingEnabled = false
  }
  resize()
  window.addEventListener('resize', resize)
  return () => window.removeEventListener('resize', resize)
}

export const cssVar = (name: string, fallback: string) => {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

const imageCache = new Map<string, Promise<HTMLImageElement>>()

export const loadImage = (src: string): Promise<HTMLImageElement> => {
  const cached = imageCache.get(src)
  if (cached) return cached
  const p = new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
  imageCache.set(src, p)
  return p
}

const parseRgb = (color: string): [number, number, number] => {
  const probe = document.createElement('canvas').getContext('2d')!
  probe.fillStyle = color
  const hex = probe.fillStyle // normalized to #rrggbb
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

/**
 * Splits a horizontal strip into frames and maps each pixel's brightness onto
 * a gray ramp from `dark` (outlines) to `light` (highlights). Keeps the
 * artist's shading, eyes and teeth while matching the monochrome theme.
 * Runs once at load, never per frame.
 */
export const grayscaleFrames = (
  img: HTMLImageElement | HTMLCanvasElement,
  frameW: number,
  dark: string,
  light: string,
  flipX = false
): HTMLCanvasElement[] => {
  const [dr, dg, db] = parseRgb(dark)
  const [lr, lg, lb] = parseRgb(light)
  const frames: HTMLCanvasElement[] = []
  const count = Math.floor(img.width / frameW)
  for (let i = 0; i < count; i++) {
    const c = document.createElement('canvas')
    c.width = frameW
    c.height = img.height
    const g = c.getContext('2d', { willReadFrequently: true })!
    g.imageSmoothingEnabled = false
    if (flipX) {
      g.translate(frameW, 0)
      g.scale(-1, 1)
    }
    g.drawImage(img, i * frameW, 0, frameW, img.height, 0, 0, frameW, img.height)
    const data = g.getImageData(0, 0, frameW, img.height)
    const px = data.data
    for (let p = 0; p < px.length; p += 4) {
      if (px[p + 3] === 0) continue
      const lum = (0.299 * px[p] + 0.587 * px[p + 1] + 0.114 * px[p + 2]) / 255
      // Gamma lift so dark-on-dark body shades stay distinguishable
      const t = Math.pow(lum, 0.6)
      px[p] = dr + (lr - dr) * t
      px[p + 1] = dg + (lg - dg) * t
      px[p + 2] = db + (lb - db) * t
    }
    g.putImageData(data, 0, 0)
    frames.push(c)
  }
  return frames
}

export const readHighScore = (key: string): number => {
  try {
    return Number(localStorage.getItem(key)) || 0
  } catch {
    return 0
  }
}

export const writeHighScore = (key: string, score: number) => {
  try {
    localStorage.setItem(key, String(score))
  } catch {
    // storage blocked: high score just won't persist
  }
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
