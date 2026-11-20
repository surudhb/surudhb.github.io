import React from 'react'
import { motion } from 'framer-motion'

interface MotionRevealProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  yOffset?: number
  className?: string
  style?: React.CSSProperties
  /** Animate on mount instead of on scroll-into-view (for pages that do not scroll) */
  onMount?: boolean
}

export const MotionReveal: React.FC<MotionRevealProps> = ({
  children,
  delay = 0,
  duration = 0.85,
  yOffset = 36,
  className,
  style,
  onMount = false
}) => {
  const reveal = { opacity: 1, y: 0, filter: 'blur(0px)' }
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, filter: 'blur(8px)' }}
      {...(onMount
        ? { animate: reveal }
        : { whileInView: reveal, viewport: { once: true, margin: '-60px' } })}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
