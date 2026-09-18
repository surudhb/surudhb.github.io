import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExperienceLinkItem } from '../../types'

interface ExperienceDetailModalProps {
  item: ExperienceLinkItem
  companyContext?: string
  onClose: () => void
}

export const ExperienceDetailModal: React.FC<ExperienceDetailModalProps> = ({
  item,
  companyContext,
  onClose
}) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const title = item.title || item.label

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        background: 'rgba(7, 7, 9, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '860px',
          maxHeight: 'min(85vh, 720px)',
          background: 'rgba(14, 14, 18, 0.98)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.8), 0 0 1px rgba(255, 255, 255, 0.2)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.35rem 1.75rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(255, 255, 255, 0.02)',
            flexShrink: 0
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.45rem'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                color: 'var(--text-muted)'
              }}
            >
              [SYSTEM LOG // {companyContext ? `${companyContext.toUpperCase()} // ` : ''}PROJECT DOSSIER]
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              style={{
                background: 'none',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                letterSpacing: '0.06em',
                padding: '0.3rem 0.75rem',
                cursor: 'pointer',
                borderRadius: '2px',
                transition: 'color 150ms, border-color 150ms',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
              }}
            >
              [ ESC ]
            </button>
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: 'clamp(1.2rem, 2.8vw, 1.55rem)',
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: '-0.015em',
              margin: '0 0 0.65rem 0',
              lineHeight: 1.25
            }}
          >
            {title}
          </h3>

          {/* Subtitle Links Row */}
          {item.links && item.links.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.65rem',
                alignItems: 'center',
                marginTop: '0.35rem'
              }}
            >
              {item.links.map((subLink) => (
                <a
                  key={subLink.href}
                  href={subLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    letterSpacing: '0.05em',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.25rem 0.65rem',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '2px',
                    transition: 'all 150ms ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)'
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
                  }}
                >
                  {subLink.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Scrollable Body Content */}
        <div
          style={{
            padding: '1.75rem',
            overflowY: 'auto',
            flex: 1,
            overscrollBehavior: 'contain'
          }}
        >
          {item.bullets && item.bullets.length > 0 ? (
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.15rem',
                margin: 0,
                padding: 0
              }}
            >
              {item.bullets.map((bullet, bIdx) => (
                <li
                  key={bIdx}
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.75,
                    color: 'var(--text-secondary)',
                    position: 'relative',
                    paddingLeft: '1.5rem'
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '0.35rem',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem'
                    }}
                  >
                    ›
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          ) : (
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6
              }}
            >
              No additional engagement bullet points recorded.
            </div>
          )}
        </div>

        {/* Footer Tags */}
        {item.tags && item.tags.length > 0 && (
          <div
            style={{
              padding: '0.9rem 1.75rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              background: 'rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              flexShrink: 0
            }}
          >
            {item.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.04em',
                  color: 'var(--text-muted)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '2px'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
