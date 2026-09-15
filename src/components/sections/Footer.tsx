import React from 'react'
import { profileData } from '../../data/profile'

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      style={{
        paddingTop: 'clamp(3.5rem, 8vw, 6rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        borderTop: '1px solid var(--border-subtle)',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem'
          }}
        >
          {/* Left: System Status & Copyright */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: '#ffffff',
                marginBottom: '0.4rem',
                letterSpacing: '0.06em'
              }}
            >
              SURUDH BHUTANI // 2026
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                marginBottom: '0.25rem'
              }}
            >
              TRAVERSAL VELOCITY 0.42c // HOSTED ON GITHUB PAGES
            </div>
            <div
              className="mobile-only"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
                marginTop: '0.2rem'
              }}
            >
              SECTOR 04 // LAT 51.04° N // LON 114.07° W
            </div>
          </div>

          {/* Center: Social Links */}
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {profileData.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  color: 'var(--text-secondary)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {link.label} ↗
              </a>
            ))}
          </div>

          {/* Right: Scroll to top */}
          <div>
            <button
              onClick={scrollToTop}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              [ TOP ↑ ]
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
