import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GalleryItem } from '../../types'

interface GalleryModalProps {
  title: string
  items: GalleryItem[]
  onClose: () => void
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ title, items, onClose }) => {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setActiveIdx((i) => Math.min(i + 1, items.length - 1))
      if (e.key === 'ArrowLeft') setActiveIdx((i) => Math.max(i - 1, 0))
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [items.length, onClose])

  const active = items[activeIdx]

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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '860px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.07)'
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                marginBottom: '0.3rem'
              }}
            >
              [GALLERY // {activeIdx + 1} / {items.length}]
            </div>
            <div
              style={{
                fontSize: '1.05rem',
                fontWeight: 600,
                color: '#ffffff',
                letterSpacing: '0.02em'
              }}
            >
              {title}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close gallery"
            style={{
              background: 'none',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              letterSpacing: '0.06em',
              padding: '0.35rem 0.75rem',
              cursor: 'pointer',
              borderRadius: '2px',
              transition: 'color 150ms, border-color 150ms'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ffffff'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-muted)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
            }}
          >
            [ ESC ]
          </button>
        </div>

        {/* Main slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            style={{ minHeight: '320px', padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column' }}
          >
            {active.imageUrl ? (
              <img
                src={active.imageUrl}
                alt={active.title}
                style={{
                  width: '100%',
                  maxHeight: '420px',
                  objectFit: 'contain',
                  borderRadius: '2px',
                  marginBottom: '1.25rem',
                  background: 'rgba(255,255,255,0.02)'
                }}
              />
            ) : (
              <div
                style={{
                  flex: 1,
                  minHeight: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px dashed rgba(255,255,255,0.08)',
                  borderRadius: '2px',
                  marginBottom: '1.25rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  color: 'var(--text-muted)'
                }}
              >
                [ SCREENSHOT PENDING ]
              </div>
            )}

            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.5rem' }}>
              {active.title}
            </div>
            {active.description && (
              <div
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                  marginBottom: '0.75rem'
                }}
              >
                {active.description}
              </div>
            )}
            {active.linkUrl && (
              <a
                href={active.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.06em',
                  color: '#ffffff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  marginTop: 'auto'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
              >
                OPEN LINK ↗
              </a>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation footer */}
        {items.length > 1 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.75rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.07)'
            }}
          >
            <button
              onClick={() => setActiveIdx((i) => Math.max(i - 1, 0))}
              disabled={activeIdx === 0}
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.12)',
                color: activeIdx === 0 ? 'rgba(255,255,255,0.2)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                letterSpacing: '0.06em',
                padding: '0.35rem 0.85rem',
                cursor: activeIdx === 0 ? 'not-allowed' : 'pointer',
                borderRadius: '2px',
                transition: 'color 150ms'
              }}
            >
              ← PREV
            </button>

            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    border: 'none',
                    background: i === activeIdx ? '#ffffff' : 'rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'background 150ms'
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveIdx((i) => Math.min(i + 1, items.length - 1))}
              disabled={activeIdx === items.length - 1}
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.12)',
                color: activeIdx === items.length - 1 ? 'rgba(255,255,255,0.2)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                letterSpacing: '0.06em',
                padding: '0.35rem 0.85rem',
                cursor: activeIdx === items.length - 1 ? 'not-allowed' : 'pointer',
                borderRadius: '2px',
                transition: 'color 150ms'
              }}
            >
              NEXT →
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
