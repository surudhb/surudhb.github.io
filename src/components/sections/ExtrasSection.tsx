import React from 'react'
import { profileData } from '../../data/profile'
import { MotionReveal } from '../ui/MotionReveal'
import { useTheme } from '../../context/ThemeContext'
import { THEME_CONFIG } from '../../config/themeConfig'
import { ThemedText } from '../ui/ThemedText'
import { CactusIcon } from '../ui/CactusIcon'

export const ExtrasSection: React.FC = () => {
  const { theme, isLightMode } = useTheme()

  return (
    <section
      id="extras"
      className="section-padding"
      style={{
        position: 'relative',
        zIndex: 1
      }}
    >
      <div className="container">
        {/* Section Header */}
        <MotionReveal>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.12em',
              color: 'var(--text-muted)',
              marginBottom: '1.5rem'
            }}
          >
            <ThemedText text={THEME_CONFIG[theme].extrasHeader} />
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              marginBottom: '4rem',
              color: 'var(--text-primary)'
            }}
          >
            LITERATURE & CINEMATIC CANON.
          </h2>
        </MotionReveal>

        {/* Content Columns: Reading List & Watch List */}
        <div
          className="responsive-grid-auto"
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '3rem',
            gap: 'clamp(2.5rem, 5vw, 5rem)'
          }}
        >
          {/* Reading List */}
          <MotionReveal delay={0.1}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                color: 'var(--text-muted)',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>{isLightMode ? <CactusIcon size="0.85em" /> : '+'}</span>
              <span>[LITERATURE & DISPATCHES]</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.75rem', padding: 0 }}>
              {profileData.readingList.map((book, idx) => (
                <li
                  key={idx}
                  style={{
                    borderLeft: '1px solid var(--border-subtle)',
                    paddingLeft: '1.25rem',
                    transition: 'border-color 200ms ease'
                  }}
                >
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      marginBottom: '0.3rem',
                      textDecoration: 'none',
                      transition: 'color 180ms ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  >
                    <span>{book.title}</span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>↗</span>
                  </a>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {book.creator}
                  </div>
                </li>
              ))}
            </ul>
          </MotionReveal>

          {/* Watch List */}
          <MotionReveal delay={0.2}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                color: 'var(--text-muted)',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>{isLightMode ? <CactusIcon size="0.85em" /> : '+'}</span>
              <span>[CINEMATIC & NARRATIVE ARCHIVES]</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.75rem', padding: 0 }}>
              {profileData.watchList.map((media, idx) => (
                <li
                  key={idx}
                  style={{
                    borderLeft: '1px solid var(--border-subtle)',
                    paddingLeft: '1.25rem',
                    transition: 'border-color 200ms ease'
                  }}
                >
                  <a
                    href={media.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      marginBottom: '0.3rem',
                      textDecoration: 'none',
                      transition: 'color 180ms ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  >
                    <span>{media.title}</span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>↗</span>
                  </a>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {media.creator}
                  </div>
                </li>
              ))}
            </ul>
          </MotionReveal>
        </div>
      </div>
    </section>
  )
}
