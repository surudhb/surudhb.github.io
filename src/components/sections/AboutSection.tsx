import React from 'react'
import { profileData } from '../../data/profile'
import { MotionReveal } from '../ui/MotionReveal'

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
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
            [DOSSIER // 01 // BACKGROUND & CRAFT]
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              marginBottom: '2.5rem',
              color: '#ffffff'
            }}
          >
            ENGINEERING ROOTS, BUILDER MINDSET.
          </h2>
        </MotionReveal>

        {/* Narrative Paragraphs */}
        <div style={{ maxWidth: '820px', marginBottom: '5rem' }}>
          {profileData.bio.map((paragraph, index) => (
            <MotionReveal key={index} delay={0.1 * (index + 1)}>
              <p
                style={{
                  fontSize: '1.15rem',
                  lineHeight: 1.85,
                  color: 'var(--text-secondary)',
                  marginBottom: '1.75rem'
                }}
              >
                {paragraph}
              </p>
            </MotionReveal>
          ))}
        </div>

        {/* Education & Credentials */}
        <MotionReveal delay={0.2}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              letterSpacing: '0.12em',
              color: 'var(--text-muted)',
              marginBottom: '2rem'
            }}
          >
            [ACADEMIC CREDENTIALS]
          </div>

          <div className="responsive-grid-auto">
            {profileData.education.map((edu, idx) => (
              <div
                key={idx}
                style={{
                  borderLeft: '1px solid var(--border-subtle)',
                  paddingLeft: '1.5rem'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    marginBottom: '0.4rem'
                  }}
                >
                  {edu.period}
                </div>
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    marginBottom: '0.4rem',
                    color: '#ffffff'
                  }}
                >
                  {edu.link ? (
                    <a
                      href={edu.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#ffffff', textDecoration: 'none' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                    >
                      {edu.institution} ↗
                    </a>
                  ) : (
                    edu.institution
                  )}
                </h3>
                <div
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.25rem'
                  }}
                >
                  {edu.degree}
                </div>
                {edu.honours && (
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {edu.honours}
                  </div>
                )}

                {/* Optional external links */}
                {edu.links && edu.links.length > 0 && (
                  <div
                    style={{
                      marginTop: '0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem'
                    }}
                  >
                    {edu.links.map((link) => (
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
                          transition: 'color 150ms',
                          textDecoration: 'none'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  )
}
