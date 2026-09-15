import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { profileData } from '../../data/profile'

const FIRST_NAME = 'SURUDH'
const LAST_NAME = 'BHUTANI'
// Non-space letter indices in "SURUDH BHUTANI" (index 6 is a space)
const LETTER_INDICES = [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13]

const SUBTITLE_TOKENS = ['SOFTWARE', 'ENGINEER', '//', 'TECHNICAL', 'PROGRAM', 'MANAGER']

export const HeroSection: React.FC = () => {
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
    // Clear any previous running timers
    timersRef.current.forEach((t) => clearTimeout(t))
    timersRef.current = []

    const newTimers: ReturnType<typeof setTimeout>[] = []
    const initialAurebesh = new Set<number>()

    LETTER_INDICES.forEach((letterIdx) => {
      // Pick random number of swaps between 2 and 10 inclusive
      const numSwaps = Math.floor(Math.random() * 9) + 2

      // Final swap to English happens between 3200ms and 4850ms (safely before the 5.0s mark)
      const finalTime = 3200 + Math.random() * 1650

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
    }, 5000)
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
        {/* Main Name Heading with multi-swap Aurebesh decode and consistent English spacing */}
        <h1
          onClick={triggerDecode}
          onMouseLeave={() => setHoveredIndex(null)}
          onPointerLeave={() => setHoveredIndex(null)}
          title="Click to randomize transponder decode sequence"
          style={{
            fontSize: 'clamp(2.25rem, 7.5vw, 6.25rem)',
            fontWeight: 700,
            letterSpacing: '0.01em',
            lineHeight: 1.12,
            color: '#ffffff',
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

              return (
                <span
                  key={index}
                  id={`name-letter-${index}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex((prev) => (prev === index ? null : prev))}
                  onPointerEnter={() => setHoveredIndex(index)}
                  onPointerLeave={() => setHoveredIndex((prev) => (prev === index ? null : prev))}
                  title={isAurebesh ? `Aurebesh [${char}]` : char}
                  style={{
                    display: 'inline-block',
                    fontFamily: isAurebesh ? 'Aurebesh, sans-serif' : 'var(--font-display)',
                    fontSize: isAurebesh ? '0.88em' : '1em',
                    lineHeight: 1,
                    verticalAlign: 'baseline',
                    position: 'relative',
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'transform 120ms ease, text-shadow 150ms ease, color 120ms ease',
                    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                    textShadow: isHovered
                      ? '0 0 16px rgba(255, 255, 255, 0.9), 0 0 28px rgba(94, 241, 242, 0.6), 0 0 42px rgba(94, 241, 242, 0.35)'
                      : 'none',
                    color: isHovered ? '#ffffff' : 'inherit'
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

              return (
                <span
                  key={index}
                  id={`name-letter-${index}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex((prev) => (prev === index ? null : prev))}
                  onPointerEnter={() => setHoveredIndex(index)}
                  onPointerLeave={() => setHoveredIndex((prev) => (prev === index ? null : prev))}
                  title={isAurebesh ? `Aurebesh [${char}]` : char}
                  style={{
                    display: 'inline-block',
                    fontFamily: isAurebesh ? 'Aurebesh, sans-serif' : 'var(--font-display)',
                    fontSize: isAurebesh ? '0.88em' : '1em',
                    lineHeight: 1,
                    verticalAlign: 'baseline',
                    position: 'relative',
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'transform 120ms ease, text-shadow 150ms ease, color 120ms ease',
                    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                    textShadow: isHovered
                      ? '0 0 16px rgba(255, 255, 255, 0.9), 0 0 28px rgba(94, 241, 242, 0.6), 0 0 42px rgba(94, 241, 242, 0.35)'
                      : 'none',
                    color: isHovered ? '#ffffff' : 'inherit'
                  }}
                >
                  {char}
                </span>
              )
            })}
          </span>
        </h1>

        {/* Subtitle / Discipline with Aurebesh letter hover effect & consistent English spacing */}
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
            padding: '0 0.5rem',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            columnGap: '0.45em',
            rowGap: '0.25em'
          }}
        >
          {SUBTITLE_TOKENS.map((token, tokenIdx) => {
            if (token === '//') {
              return (
                <span
                  key={tokenIdx}
                  style={{
                    color: 'rgba(255, 255, 255, 0.45)',
                    textShadow: '0 0 8px rgba(94, 241, 242, 0.25)',
                    fontWeight: 600,
                    userSelect: 'none',
                    margin: '0 0.1em'
                  }}
                >
                  //
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
                      title={isHovered ? `Aurebesh [${char}]` : char}
                      style={{
                        display: 'inline-block',
                        fontFamily: isHovered ? 'Aurebesh, sans-serif' : 'var(--font-heading)',
                        fontSize: isHovered ? '0.88em' : '1em',
                        lineHeight: 1,
                        verticalAlign: 'baseline',
                        position: 'relative',
                        cursor: 'pointer',
                        userSelect: 'none',
                        transition: 'transform 120ms ease, text-shadow 150ms ease, color 120ms ease',
                        transform: isHovered ? 'translateY(-1.5px)' : 'translateY(0)',
                        textShadow: isHovered
                          ? '0 0 14px rgba(255, 255, 255, 0.9), 0 0 24px rgba(94, 241, 242, 0.65), 0 0 36px rgba(94, 241, 242, 0.35)'
                          : '0 0 8px rgba(255, 255, 255, 0.5), 0 0 16px rgba(94, 241, 242, 0.3)',
                        color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.9)'
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
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
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
