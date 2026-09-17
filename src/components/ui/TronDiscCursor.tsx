import React, { useEffect, useRef, useState } from 'react'

export const TronDiscCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const outerRingRef = useRef<SVGGElement>(null)
  const innerRingRef = useRef<SVGGElement>(null)

  const [isFinePointer, setIsFinePointer] = useState(false)

  // Mutable refs for zero-lag physics and animation state (no React re-renders during motion)
  const isVisibleRef = useRef(false)
  const isHoveringRef = useRef(false)
  const isClickingRef = useRef(false)

  // Mechanical Gear Rotational Angles (Degrees)
  const targetAngleRef = useRef(0)
  const currentAngleRef = useRef(0)
  const lastScrollYRef = useRef(0)

  // Gear ratio: Degrees of gear rotation per physical pixel of page scroll
  // At 1.2 deg/px, ~300px of scroll turns the gear 1 full 360° revolution
  const GEAR_RATIO = 1.2

  useEffect(() => {
    // Only mount and activate on devices with a mouse or precision trackpad
    const media = window.matchMedia('(pointer: fine)')
    setIsFinePointer(media.matches)

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches)
    }

    media.addEventListener('change', handleMediaChange)
    return () => media.removeEventListener('change', handleMediaChange)
  }, [])

  useEffect(() => {
    if (!isFinePointer) return

    const cursorEl = cursorRef.current
    const innerEl = innerRef.current
    lastScrollYRef.current = window.scrollY

    // 1. Instantaneous zero-latency position tracking via PointerEvent
    const handlePointerMove = (e: PointerEvent) => {
      if (cursorEl) {
        cursorEl.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
      if (!isVisibleRef.current) {
        isVisibleRef.current = true
        if (cursorEl) cursorEl.style.opacity = '1'
      }
    }

    // 2. Event-delegated hover detection (fires only on element enter/leave, not every pixel)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target && target.closest('a, button, input, select, textarea, [role="button"], [data-cursor-interactive], .interactive')) {
        isHoveringRef.current = true
        if (innerEl && !isClickingRef.current) {
          innerEl.style.transform = 'scale(1.22)'
          innerEl.style.filter = 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.4))'
        }
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target && target.closest('a, button, input, select, textarea, [role="button"], [data-cursor-interactive], .interactive')) {
        const related = e.relatedTarget as HTMLElement | null
        if (!related || !related.closest('a, button, input, select, textarea, [role="button"], [data-cursor-interactive], .interactive')) {
          isHoveringRef.current = false
          if (innerEl && !isClickingRef.current) {
            innerEl.style.transform = 'scale(1)'
            innerEl.style.filter = 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 6px rgba(255, 255, 255, 0.25))'
          }
        }
      }
    }

    // 3. Tactile click feedback
    const handleMouseDown = () => {
      isClickingRef.current = true
      if (innerEl) {
        innerEl.style.transform = 'scale(0.86)'
      }
    }

    const handleMouseUp = () => {
      isClickingRef.current = false
      if (innerEl) {
        innerEl.style.transform = isHoveringRef.current ? 'scale(1.22)' : 'scale(1)'
      }
    }

    // 4. Boundary visibility
    const handleMouseLeave = () => {
      isVisibleRef.current = false
      if (cursorEl) cursorEl.style.opacity = '0'
    }

    const handleMouseEnter = () => {
      isVisibleRef.current = true
      if (cursorEl) cursorEl.style.opacity = '1'
    }

    // 5. Mechanical Rack-and-Pinion Gear Coupling:
    // Every pixel of page displacement directly drives gear rotation
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollYRef.current
      lastScrollYRef.current = currentScrollY

      // Downward scroll moves gear clockwise, upward scroll reverses it counter-clockwise
      targetAngleRef.current += delta * GEAR_RATIO
    }

    // Wheel listener for edge overscroll tactile feedback
    const handleWheel = (e: WheelEvent) => {
      const atTop = window.scrollY <= 0 && e.deltaY < 0
      const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 4 && e.deltaY > 0
      if (atTop || atBottom) {
        targetAngleRef.current += Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY) * 0.3, 12)
      }
    }

    // 6. Continuous requestAnimationFrame Physics Engine
    let animId: number
    let lastTime = performance.now()

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1) // Clamped delta time
      lastTime = now

      // Baseline cruising speed synchronized with the ambient drift velocity of the starfield (~38 deg/sec)
      const idleSpeed = isHoveringRef.current ? 50 : 38
      targetAngleRef.current += idleSpeed * dt

      // Smooth mechanical gear follow with responsive critical damping
      const diff = targetAngleRef.current - currentAngleRef.current
      currentAngleRef.current += diff * Math.min(1, dt * 24)

      // Normalize angles periodically to maintain high floating-point precision
      if (Math.abs(currentAngleRef.current) > 360000) {
        currentAngleRef.current %= 360
        targetAngleRef.current %= 360
      }

      // Outer ring rotation (Primary driving gear)
      const outerAngle = currentAngleRef.current

      // Inner ring counter-rotation (Independent internal gear turning inversely at -0.72x ratio)
      const innerAngle = -currentAngleRef.current * 0.72

      // Apply transforms directly (GPU accelerated, 0 layout reflow)
      if (outerRingRef.current) {
        outerRingRef.current.style.transform = `rotate(${outerAngle.toFixed(2)}deg)`
      }
      if (innerRingRef.current) {
        innerRingRef.current.style.transform = `rotate(${innerAngle.toFixed(2)}deg)`
      }

      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)

    // Register high-performance event listeners
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', handleWheel, { passive: true })

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [isFinePointer])

  if (!isFinePointer) return null

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '28px',
        height: '28px',
        marginLeft: '-14px',
        marginTop: '-14px',
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 999999,
        opacity: 0,
        transition: 'opacity 150ms ease',
        willChange: 'transform',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        ref={innerRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 140ms cubic-bezier(0.16, 1, 0.3, 1), filter 160ms ease',
          filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 6px rgba(255, 255, 255, 0.25))'
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <filter id="reticleMonochromeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Outer Circle: Clean 3-Segment Arc Ring (Rotates Clockwise, Drives with Scroll) */}
          <g
            ref={outerRingRef}
            style={{ transformOrigin: '50px 50px' }}
          >
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="#ffffff"
              strokeWidth="2.4"
              strokeDasharray="60 28 60 28 60 28"
              strokeLinecap="round"
              filter="url(#reticleMonochromeGlow)"
            />
          </g>

          {/* 2. Inner Circle: Clean 2-Segment Arc Ring (Rotates Counter-Clockwise Independently) */}
          <g
            ref={innerRingRef}
            style={{ transformOrigin: '50px 50px' }}
          >
            <circle
              cx="50"
              cy="50"
              r="26"
              stroke="rgba(255, 255, 255, 0.75)"
              strokeWidth="2.0"
              strokeDasharray="55 27 55 27"
              strokeLinecap="round"
            />
          </g>

          {/* 3. Target Reticle: Stationary Cardinal Crosshairs + Pinpoint Core (Pixel-Perfect Aiming) */}
          <g style={{ transformOrigin: '50px 50px' }}>
            {/* Cardinal Crosshair Lines */}
            <line x1="50" y1="36" x2="50" y2="44" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
            <line x1="50" y1="56" x2="50" y2="64" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
            <line x1="36" y1="50" x2="44" y2="50" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
            <line x1="56" y1="50" x2="64" y2="50" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />

            {/* Precision Center Pinpoint Target Dot with Contrast Aperture */}
            <circle cx="50" cy="50" r="2.0" fill="#ffffff" filter="url(#reticleMonochromeGlow)" />
            <circle cx="50" cy="50" r="0.8" fill="#070709" />
          </g>
        </svg>
      </div>
    </div>
  )
}
