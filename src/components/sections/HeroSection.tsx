import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { profileData } from '../../data/profile'
import { useTheme } from '../../context/ThemeContext'
import { THEME_CONFIG } from '../../config/themeConfig'
import { CactusIcon } from '../ui/CactusIcon'

const FIRST_NAME = 'SURUDH'
const LAST_NAME = 'BHUTANI'
// Non-space letter indices in "SURUDH BHUTANI" (index 6 is a space)
const LETTER_INDICES = [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13]

export const HeroSection: React.FC = () => {
  const { theme, isLightMode } = useTheme()
  const subtitleTokens = THEME_CONFIG[theme].subtitleTokens
  const statusBadge = THEME_CONFIG[theme].statusBadge

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  })

  // Smooth scroll parallax transforms
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -140])
  const opacityParallax = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const scaleParallax = useTransform(scrollYProgress, [0, 1], [1, 0.96])

  // Aurebesh / English letter decoding and hover state for name
  const [aurebeshLetters, setAurebeshLetters] = useState<Set<number>>(new Set())
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  // Aurebesh hover state for subtitle letters
  const [hoveredSubKey, setHoveredSubKey] = useState<string | null>(null)

  const triggerDecode = () => {
    // Dispatch lightspeed deceleration effect to starfield background
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('lightspeed:jump', { detail: { duration: 3000 } }))
    }

    // Clear any previous running timers
    timersRef.current.forEach((t) => clearTimeout(t))
    timersRef.current = []

    const newTimers: ReturnType<typeof setTimeout>[] = []
    const initialAurebesh = new Set<number>()

    LETTER_INDICES.forEach((letterIdx) => {
      // Pick random number of swaps between 2 and 6 inclusive
      const numSwaps = Math.floor(Math.random() * 5) + 2

      // Final swap to English happens between 2000ms and 3650ms (safely before the 5.0s mark)
      const finalTime = 2000 + Math.random() * 1650

      // Generate (numSwaps - 1) intermediate swap timestamps in (100ms, finalTime - 120ms)
      const rawTimes: number[] = []
      for (let s = 0; s < numSwaps - 1; s++) {
        rawTimes.push(100 + Math.random() * (finalTime - 220))
      }
      rawTimes.sort((a, b) => a - b)

      // Ensure a clean visual minimum separation (at least 140ms) between consecutive swaps
      const swapTimes: number[] = []
      let lastT = 0
      for (let s = 0; s < rawTimes.length; s++) {
        const t = Math.max(rawTimes[s], lastT + 140)
        if (t < finalTime - 140) {
          swapTimes.push(t)
          lastT = t
        } else {
          const remainingSlots = rawTimes.length - s
          const stepSize = (finalTime - lastT) / (remainingSlots + 1)
          const adjusted = lastT + stepSize
          swapTimes.push(adjusted)
          lastT = adjusted
        }
      }
      // Add final swap to English
      swapTimes.push(finalTime)

      // We want the final swap (swapTimes[numSwaps - 1]) to resolve into English (willBeAurebesh = false).
      // Each swap alternates state:
      // Step (numSwaps - 1): English (false)
      // Step (numSwaps - 2): Aurebesh (true)
      // Step (numSwaps - 3): English (false) ...
      // In general: willBeAurebesh = ((numSwaps - 1 - s) % 2 === 1)
      // Initial state at t = 0: (numSwaps % 2 === 1)
      const startsAurebesh = numSwaps % 2 === 1
      if (startsAurebesh) {
        initialAurebesh.add(letterIdx)
      }

      swapTimes.forEach((time, stepIdx) => {
        const willBeAurebesh = (numSwaps - 1 - stepIdx) % 2 === 1

        const timer = setTimeout(() => {
          setAurebeshLetters((prev) => {
            const next = new Set(prev)
            if (willBeAurebesh) {
              next.add(letterIdx)
            } else {
              next.delete(letterIdx)
            }
            return next
          })
        }, Math.round(time))

        newTimers.push(timer)
      })
    })

    // Set initial state at t = 0
    setAurebeshLetters(initialAurebesh)

    // Master cleanup at exactly 5000ms: guarantees all letters are English and spacing is 100% consistent
    const masterTimer = setTimeout(() => {
      setAurebeshLetters(new Set())
      timersRef.current = []
    }, 4000)
    newTimers.push(masterTimer)

    timersRef.current = newTimers
  }

  useEffect(() => {
    // Initial 5-second multi-swap decode sequence on load
    const timer = setTimeout(() => {
      triggerDecode()
    }, 150)

    return () => {
      clearTimeout(timer)
      timersRef.current.forEach((t) => clearTimeout(t))
      timersRef.current = []
    }
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        padding: '0 2rem'
      }}
    >
      <motion.div
        style={{
          y: yParallax,
          opacity: opacityParallax,
          scale: scaleParallax,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Status Badge: Prehistoric Offline in Light Mode, Sci-Fi Transponder in Dark Mode */}
        {statusBadge && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              height: '30px',
              minHeight: '30px',
              maxHeight: '30px',
              boxSizing: 'border-box',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              lineHeight: 1,
              letterSpacing: '0.12em',
              color: isLightMode ? 'var(--text-muted)' : 'var(--text-secondary)',
              border: isLightMode ? '1px solid var(--border-subtle)' : '1px solid rgba(94, 241, 242, 0.3)',
              background: 'var(--bg-card)',
              padding: '0 0.75rem',
              borderRadius: '4px',
              marginBottom: '1.25rem',
              boxShadow: isLightMode
                ? '1px 1px 0px rgba(83, 83, 83, 0.2)'
                : '0 0 14px rgba(94, 241, 242, 0.14), inset 0 0 10px rgba(94, 241, 242, 0.05)',
              transition: 'color 200ms ease, background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease',
              whiteSpace: 'nowrap'
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '8px',
                height: '8px',
                flexShrink: 0
              }}
              aria-hidden="true"
            >
              {isLightMode ? (
                <svg width="7" height="7" viewBox="0 0 8 8" style={{ display: 'block' }}>
                  <polygon points="4,1 8,7 0,7" fill="var(--accent-amber)" />
                </svg>
              ) : (
                <span
                  style={{
                    display: 'block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-cyan)',
                    boxShadow: '0 0 8px var(--accent-cyan)'
                  }}
                />
              )}
            </span>
            <span style={{ lineHeight: 1, whiteSpace: 'nowrap' }}>{statusBadge}</span>
          </div>
        )}

        {/* Main Name Heading with multi-swap Aurebesh decode and consistent English spacing */}
        <h1
          id="hero-name-heading"
          onClick={triggerDecode}
          onMouseLeave={() => setHoveredIndex(null)}
          onPointerLeave={() => setHoveredIndex(null)}
          title="Click to randomize transponder decode sequence"
          style={{
            fontSize: 'clamp(2.25rem, 7.5vw, 6.25rem)',
            fontWeight: 700,
            letterSpacing: '0.01em',
            lineHeight: 1.12,
            color: 'var(--text-primary)',
            margin: '0 0 1.25rem 0',
            userSelect: 'none',
            minHeight: '1.15em',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            columnGap: '0.35em',
            rowGap: '0.15em'
          }}
        >
          {/* Word 1: SURUDH (keeps letters contiguous) */}
          <span style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
            {FIRST_NAME.split('').map((char, charIdx) => {
              const index = charIdx
              const isHovered = hoveredIndex === index
              const isAurebesh = isHovered || aurebeshLetters.has(index)
              const decodeFont = isLightMode ? 'CavePainting, sans-serif' : 'Aurebesh, sans-serif'

              return (
                <span
                  key={index}
                  id={`name-letter-${index}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex((prev) => (prev === index ? null : prev))}
                  onPointerEnter={() => setHoveredIndex(index)}
                  onPointerLeave={() => setHoveredIndex((prev) => (prev === index ? null : prev))}
                  title={isAurebesh ? (isLightMode ? `Cave Art [${char}]` : `Aurebesh [${char}]`) : char}
                  style={{
                    display: 'inline-block',
                    fontFamily: isAurebesh ? decodeFont : 'var(--font-display)',
                    fontSize: isAurebesh ? (isLightMode ? '0.72em' : '0.80em') : '1em',
                    lineHeight: 1,
                    verticalAlign: 'baseline',
                    position: 'relative',
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'transform 120ms ease, text-shadow 150ms ease, color 120ms ease',
                    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                    textShadow: isHovered
                      ? isLightMode
                        ? 'none'
                        : '0 0 16px rgba(255, 255, 255, 0.9), 0 0 28px rgba(94, 241, 242, 0.6), 0 0 42px rgba(94, 241, 242, 0.35)'
                      : 'none',
                    color: isHovered ? 'var(--text-primary)' : 'inherit'
                  }}
                >
                  {char}
                </span>
              )
            })}
          </span>

          {/* Word 2: BHUTANI (keeps letters contiguous) */}
          <span style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
            {LAST_NAME.split('').map((char, charIdx) => {
              const index = charIdx + 7
              const isHovered = hoveredIndex === index
              const isAurebesh = isHovered || aurebeshLetters.has(index)
              const decodeFont = isLightMode ? 'CavePainting, sans-serif' : 'Aurebesh, sans-serif'

              return (
                <span
                  key={index}
                  id={`name-letter-${index}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex((prev) => (prev === index ? null : prev))}
                  onPointerEnter={() => setHoveredIndex(index)}
                  onPointerLeave={() => setHoveredIndex((prev) => (prev === index ? null : prev))}
                  title={isAurebesh ? (isLightMode ? `Cave Art [${char}]` : `Aurebesh [${char}]`) : char}
                  style={{
                    display: 'inline-block',
                    fontFamily: isAurebesh ? decodeFont : 'var(--font-display)',
                    fontSize: isAurebesh ? (isLightMode ? '0.72em' : '0.80em') : '1em',
                    lineHeight: 1,
                    verticalAlign: 'baseline',
                    position: 'relative',
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'transform 120ms ease, text-shadow 150ms ease, color 120ms ease',
                    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                    textShadow: isHovered
                      ? isLightMode
                        ? 'none'
                        : '0 0 16px rgba(255, 255, 255, 0.9), 0 0 28px rgba(94, 241, 242, 0.6), 0 0 42px rgba(94, 241, 242, 0.35)'
                      : 'none',
                    color: isHovered ? 'var(--text-primary)' : 'inherit'
                  }}
                >
                  {char}
                </span>
              )
            })}
          </span>
        </h1>

        {/* Subtitle / Discipline with Aurebesh / Cave Art letter hover effect & consistent English spacing */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.0, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onMouseLeave={() => setHoveredSubKey(null)}
          onPointerLeave={() => setHoveredSubKey(null)}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(0.8rem, 2.2vw, 1.15rem)',
            fontWeight: 500,
            letterSpacing: '0.12em',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            marginBottom: '1.75rem',
            lineHeight: 1.5,
            minHeight: '1.8rem',
            padding: '0 0.5rem',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            columnGap: '0.45em',
            rowGap: '0.25em'
          }}
        >
          {subtitleTokens.map((token, tokenIdx) => {
            if (token === '//' || token === '■' || token === '🌵') {
              return (
                <span
                  key={tokenIdx}
                  style={{
                    color: 'var(--divider-symbol-color)',
                    textShadow: isLightMode ? 'none' : '0 0 8px rgba(94, 241, 242, 0.25)',
                    fontWeight: 600,
                    userSelect: 'none',
                    margin: '0 0.25em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '1.2em',
                    lineHeight: 1
                  }}
                >
                  {isLightMode ? <CactusIcon size="1.05em" style={{ verticalAlign: '0' }} /> : '//'}
                </span>
              )
            }

            return (
              <span
                key={tokenIdx}
                style={{
                  display: 'inline-flex',
                  whiteSpace: 'nowrap'
                }}
              >
                {token.split('').map((char, charIdx) => {
                  const key = `sub-${tokenIdx}-${charIdx}`
                  const isHovered = hoveredSubKey === key

                  return (
                    <span
                      key={key}
                      id={`sub-letter-${tokenIdx}-${charIdx}`}
                      data-sub-key={key}
                      data-sub-char={char}
                      onMouseEnter={() => setHoveredSubKey(key)}
                      onMouseLeave={() => setHoveredSubKey((prev) => (prev === key ? null : prev))}
                      onPointerEnter={() => setHoveredSubKey(key)}
                      onPointerLeave={() => setHoveredSubKey((prev) => (prev === key ? null : prev))}
                      title={isHovered ? (isLightMode ? `Cave Art [${char}]` : `Aurebesh [${char}]`) : char}
                      style={{
                        display: 'inline-block',
                        fontFamily: isHovered
                          ? isLightMode
                            ? 'CavePainting, sans-serif'
                            : 'Aurebesh, sans-serif'
                          : 'var(--font-heading)',
                        fontSize: isHovered ? (isLightMode ? '1.1em' : '0.88em') : '1em',
                        lineHeight: 1,
                        verticalAlign: 'baseline',
                        position: 'relative',
                        cursor: 'pointer',
                        userSelect: 'none',
                        transition: 'transform 120ms ease, text-shadow 150ms ease, color 120ms ease',
                        transform: isHovered ? 'translateY(-1.5px)' : 'translateY(0)',
                        textShadow: isLightMode
                          ? 'none'
                          : isHovered
                            ? '0 0 14px rgba(255, 255, 255, 0.9), 0 0 24px rgba(94, 241, 242, 0.65), 0 0 36px rgba(94, 241, 242, 0.35)'
                            : '0 0 8px rgba(255, 255, 255, 0.5), 0 0 16px rgba(94, 241, 242, 0.3)',
                        color: isLightMode
                          ? isHovered
                            ? 'var(--text-primary)'
                            : 'var(--text-secondary)'
                          : isHovered
                            ? '#ffffff'
                            : 'rgba(255, 255, 255, 0.9)'
                      }}
                    >
                      {char}
                    </span>
                  )
                })}
              </span>
            )
          })}
        </motion.div>

        {/* Social Links directly beneath the subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(1rem, 3.5vw, 2rem)',
            flexWrap: 'wrap',
            marginBottom: '3.5rem'
          }}
        >
          {profileData.socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: 'var(--text-secondary)',
                transition: 'color 200ms ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {link.label} ↗
            </a>
          ))}
        </motion.div>

        {/* Subtle scroll status hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.74rem',
            letterSpacing: '0.12em',
            color: 'var(--text-muted)'
          }}
        >
          [ SCROLL TO EXPLORE ARCHIVES ]
        </motion.div>
      </motion.div>
    </section>
  )
}
