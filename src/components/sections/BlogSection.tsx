import React, { useState } from 'react'
import { articlesData } from '../../data/articles'
import { MotionReveal } from '../ui/MotionReveal'
import { useTheme } from '../../context/ThemeContext'
import { THEME_CONFIG } from '../../config/themeConfig'
import { ThemedText } from '../ui/ThemedText'

export const BlogSection: React.FC = () => {
  const { theme } = useTheme()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section
      id="blog"
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
            <ThemedText text={THEME_CONFIG[theme].blogHeader} />
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
            NOTES ON LOGIC, CRAFT & CULTURE.
          </h2>
        </MotionReveal>

        {/* Articles List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          {articlesData.map((article, index) => {
            const isExpanded = expandedId === article.id
            return (
              <MotionReveal key={article.id} delay={0.08 * index}>
                <article
                  className="responsive-two-col"
                  style={{
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '2.5rem',
                    alignItems: 'start'
                  }}
                >
                  {/* Left Column: Metadata (sticky on desktop) */}
                  <div className="sticky-desktop">
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.82rem',
                        color: 'var(--text-muted)',
                        marginBottom: '0.4rem'
                      }}
                    >
                      <ThemedText text={`${article.date} // ${article.readingTime}`} />
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.8rem' }}>
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            letterSpacing: '0.04em',
                            color: 'var(--text-muted)',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid var(--border-subtle)',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '2px'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* External links */}
                    {article.links && article.links.length > 0 && (
                      <div
                        style={{
                          marginTop: '1rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.35rem'
                        }}
                      >
                        {article.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.78rem',
                              letterSpacing: '0.06em',
                              color: 'var(--text-muted)',
                              transition: 'color 150ms'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                          >
                            {link.label} ↗
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Title, Excerpt, Expanded Content */}
                  <div>
                    <h3
                      style={{
                        fontSize: '1.45rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        marginBottom: '0.85rem',
                        lineHeight: 1.2,
                        cursor: 'pointer'
                      }}
                      onClick={() => toggleExpand(article.id)}
                    >
                      <ThemedText text={article.title} />
                    </h3>
                    <p
                      style={{
                        fontSize: '1.05rem',
                        lineHeight: 1.75,
                        color: 'var(--text-secondary)',
                        marginBottom: '1.5rem'
                      }}
                    >
                      {article.excerpt}
                    </p>

                    {/* Expandable in-place full text */}
                    {isExpanded && article.content && (
                      <div
                        style={{
                          marginTop: '1.5rem',
                          padding: '1.75rem',
                          background: 'var(--bg-card)',
                          borderLeft: '2px solid var(--border-subtle)',
                          borderRadius: '2px',
                          color: 'var(--text-primary)',
                          fontSize: '1rem',
                          lineHeight: 1.85,
                          whiteSpace: 'pre-line'
                        }}
                      >
                        {article.content}
                      </div>
                    )}

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.25rem',
                        marginTop: '0.65rem',
                        flexWrap: 'wrap'
                      }}
                    >
                      <button
                        onClick={() => toggleExpand(article.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          letterSpacing: '0.06em',
                          color: 'var(--text-primary)',
                          padding: 0,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                      >
                        {isExpanded ? '[ COLLAPSE LOG - ]' : '[ EXPAND LOG + ]'}
                      </button>

                      {/* Read Full Transmission Button (Hidden for now until full blog post pages launch) */}
                      {isExpanded && (
                        <a
                          href={`/blog/${article.slug || article.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Read full article on a dedicated page"
                          style={{
                            display: 'none', // Hidden for now as requested
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            letterSpacing: '0.06em',
                            color: 'var(--text-secondary)',
                            textDecoration: 'none',
                            alignItems: 'center',
                            gap: '0.35rem',
                            transition: 'color 150ms ease'
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                        >
                          [ READ FULL TRANSMISSION ↗ ]
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </MotionReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
