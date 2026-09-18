import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { AppWindow } from 'lucide-react'
import { experienceData } from '../../data/experience'
import { GalleryItem, ExperienceLinkItem } from '../../types'
import { MotionReveal } from '../ui/MotionReveal'
import { GalleryModal } from '../ui/GalleryModal'
import { ExperienceDetailModal } from '../ui/ExperienceDetailModal'

export const ExperienceSection: React.FC = () => {
  const [gallery, setGallery] = useState<{ title: string; items: GalleryItem[] } | null>(null)
  const [activeDetail, setActiveDetail] = useState<{ item: ExperienceLinkItem; company: string } | null>(null)

  return (
    <section
      id="experience"
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
            [SYSTEM LOG // 03 // WORK CHRONICLE]
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              marginBottom: '4rem',
              color: '#ffffff'
            }}
          >
            PRODUCTION TRACK RECORD & LEADERSHIP.
          </h2>
        </MotionReveal>

        {/* Experience Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem' }}>
          {experienceData.map((exp, index) => (
            <MotionReveal key={exp.id} delay={0.08 * index}>
              <article
                className="responsive-two-col"
                style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '2.5rem',
                  alignItems: 'start'
                }}
              >
                {/* Left Column: sticky */}
                <div style={{ position: 'sticky', top: '5.5rem' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      color: 'var(--text-muted)',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {exp.period}
                  </div>
                  <h3
                    style={{
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginBottom: '0.35rem',
                      lineHeight: 1.2
                    }}
                  >
                    {exp.link ? (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#ffffff' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                      >
                        {exp.company} ↗
                      </a>
                    ) : (
                      exp.company
                    )}
                  </h3>
                  <div
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 500,
                      color: 'var(--text-secondary)',
                      marginBottom: '0.25rem'
                    }}
                  >
                    {exp.position}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {exp.location}
                  </div>

                  {/* Engagement / External links */}
                  {exp.links && exp.links.length > 0 && (
                    <div
                      style={{
                        marginTop: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.35rem'
                      }}
                    >
                      {exp.links.map((link, lIdx) => {
                        const isModal = Boolean((link.bullets && link.bullets.length > 0) || (link.links && link.links.length > 0) || link.title)
                        return isModal ? (
                          <button
                            key={link.title || link.label || lIdx}
                            type="button"
                            onClick={() => setActiveDetail({ item: link, company: exp.company })}
                            style={{
                              background: 'none',
                              border: 'none',
                              padding: 0,
                              margin: 0,
                              cursor: 'pointer',
                              textAlign: 'left',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.78rem',
                              letterSpacing: '0.06em',
                              color: 'var(--text-muted)',
                              transition: 'color 150ms',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                          >
                            <span>{link.label}</span>
                            <AppWindow size={12} strokeWidth={1.75} style={{ opacity: 0.85, flexShrink: 0 }} aria-hidden="true" />
                          </button>
                        ) : (
                          <a
                            key={link.href || lIdx}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.78rem',
                              letterSpacing: '0.06em',
                              color: 'var(--text-muted)',
                              transition: 'color 150ms',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                          >
                            {link.label} ↗
                          </a>
                        )
                      })}
                    </div>
                  )}

                  {/* Gallery trigger */}
                  {exp.gallery && exp.gallery.length > 0 && (
                    <button
                      onClick={() => setGallery({ title: exp.company, items: exp.gallery! })}
                      style={{
                        marginTop: exp.links && exp.links.length > 0 ? '0.5rem' : '1rem',
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        letterSpacing: '0.06em',
                        color: 'var(--text-muted)',
                        transition: 'color 150ms',
                        display: 'inline-flex',
                        alignItems: 'center'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      SEE MORE ↗
                    </button>
                  )}
                </div>

                {/* Right Column: Bullets & Highlight */}
                <div>
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      marginBottom: '1.75rem'
                    }}
                  >
                    {exp.bullets.map((bullet, bIdx) => (
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

                  {/* Term Highlight Callout */}
                  {exp.highlight && (
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.82rem',
                        color: 'var(--text-muted)',
                        borderLeft: '2px solid rgba(255, 255, 255, 0.2)',
                        paddingLeft: '1rem',
                        marginBottom: '1.5rem',
                        lineHeight: 1.6
                      }}
                    >
                      NOTE: {exp.highlight}
                    </div>
                  )}

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          letterSpacing: '0.04em',
                          color: 'var(--text-muted)',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid var(--border-subtle)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '2px'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>

      {/* Gallery modal */}
      <AnimatePresence>
        {gallery && (
          <GalleryModal
            title={gallery.title}
            items={gallery.items}
            onClose={() => setGallery(null)}
          />
        )}
      </AnimatePresence>

      {/* Experience Detail Modal */}
      <AnimatePresence>
        {activeDetail && (
          <ExperienceDetailModal
            item={activeDetail.item}
            companyContext={activeDetail.company}
            onClose={() => setActiveDetail(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
