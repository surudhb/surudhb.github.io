import React, { useEffect, useRef, useState } from 'react'

export const BoneCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  const [isFinePointer, setIsFinePointer] = useState(false)
  const isVisibleRef = useRef(false)
  const isHoveringRef = useRef(false)
  const isClickingRef = useRef(false)

  useEffect(() => {
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

    // Instant zero-lag tracking via PointerEvent
    const handlePointerMove = (e: PointerEvent) => {
      if (cursorEl) {
        cursorEl.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
      if (!isVisibleRef.current) {
        isVisibleRef.current = true
        if (cursorEl) cursorEl.style.opacity = '1'
      }
    }

    // Hover detection on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target && target.closest('a, button, input, select, textarea, [role="button"], [data-cursor-interactive], .interactive')) {
        isHoveringRef.current = true
        if (innerEl && !isClickingRef.current) {
          innerEl.style.transform = 'scale(1.22)'
          innerEl.style.filter = 'drop-shadow(0 2px 4px rgba(83, 83, 83, 0.45))'
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
            innerEl.style.filter = 'drop-shadow(0 1px 2px rgba(83, 83, 83, 0.25))'
          }
        }
      }
    }

    const handleMouseDown = () => {
      isClickingRef.current = true
      if (innerEl) {
        innerEl.style.transform = 'scale(0.88)'
      }
    }

    const handleMouseUp = () => {
      isClickingRef.current = false
      if (innerEl) {
        innerEl.style.transform = isHoveringRef.current ? 'scale(1.22)' : 'scale(1)'
      }
    }

    const handleMouseLeave = () => {
      isVisibleRef.current = false
      if (cursorEl) cursorEl.style.opacity = '0'
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })
    window.addEventListener('mouseup', handleMouseUp, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
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
        pointerEvents: 'none',
        zIndex: 10000,
        opacity: 0,
        willChange: 'transform',
        transform: 'translate3d(-100px, -100px, 0)'
      }}
    >
      <div
        ref={innerRef}
        style={{
          position: 'relative',
          width: '28px',
          height: '28px',
          marginLeft: '-14px',
          marginTop: '-14px',
          transition: 'transform 120ms ease-out, filter 150ms ease',
          filter: 'drop-shadow(0 1px 2px rgba(83, 83, 83, 0.25))'
        }}
      >
        {/* Monochromatic Chicken Bone Line-Art SVG */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: 'rotate(-45deg)' }}
        >
          {/* Top Knobs / Condyles */}
          <circle cx="6.5" cy="5" r="2.5" fill="#f7f7f7" stroke="#535353" strokeWidth="1.8" />
          <circle cx="10" cy="5" r="2.5" fill="#f7f7f7" stroke="#535353" strokeWidth="1.8" />
          
          {/* Shaft */}
          <rect x="7.2" y="5.8" width="2.6" height="12.4" fill="#f7f7f7" stroke="#535353" strokeWidth="1.8" />
          
          {/* Bottom Knobs / Condyles */}
          <circle cx="6.5" cy="19" r="2.5" fill="#f7f7f7" stroke="#535353" strokeWidth="1.8" />
          <circle cx="10" cy="19" r="2.5" fill="#f7f7f7" stroke="#535353" strokeWidth="1.8" />

          {/* Mask inner overlaps for clean single bone appearance */}
          <rect x="7.5" y="5" width="2" height="14" fill="#f7f7f7" />
        </svg>
      </div>
    </div>
  )
}
