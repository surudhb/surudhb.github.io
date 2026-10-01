import { useState, useEffect } from 'react'

// Module-level singleton: one RAF-throttled scroll listener shared by all consumers.
const subscribers = new Set<(y: number) => void>()
let rafId: number | null = null
let lastY = typeof window !== 'undefined' ? window.scrollY : 0

if (typeof window !== 'undefined') {
  window.addEventListener(
    'scroll',
    () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        const y = window.scrollY
        if (y !== lastY) {
          lastY = y
          subscribers.forEach(fn => fn(y))
        }
      })
    },
    { passive: true }
  )
}

export function useScrollY(): number {
  const [y, setY] = useState<number>(() =>
    typeof window !== 'undefined' ? window.scrollY : 0
  )
  useEffect(() => {
    subscribers.add(setY)
    return () => { subscribers.delete(setY) }
  }, [])
  return y
}
