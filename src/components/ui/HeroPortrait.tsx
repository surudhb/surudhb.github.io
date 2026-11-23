import React, { useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'

const PORTRAITS = {
  dark: '/images/portrait-hologram.webp',
  light: '/images/portrait-ink.webp'
} as const

/** Themed portrait above the hero name. All motion is CSS, on composited layers. */
export const HeroPortrait: React.FC = () => {
  const { theme } = useTheme()
  const src = PORTRAITS[theme]

  // Warm the other theme's image so toggling does not flash an empty frame
  useEffect(() => {
    const other = new Image()
    other.src = PORTRAITS[theme === 'dark' ? 'light' : 'dark']
  }, [theme])

  const layerCount = theme === 'dark' ? 3 : 4

  return (
    <figure
      className={`hero-portrait is-${theme}`}
      style={{ '--portrait-src': `url(${src})` } as React.CSSProperties}
    >
      <img className="portrait-base" src={src} alt="Portrait of Surudh Bhutani" width={640} height={640} decoding="async" fetchPriority="high" />
      {Array.from({ length: layerCount }, (_, i) => (
        <span key={i} className="portrait-layer" aria-hidden="true" />
      ))}
      {theme === 'dark' && <span className="portrait-sweep" aria-hidden="true" />}
    </figure>
  )
}
