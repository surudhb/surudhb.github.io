import React from 'react'
import { projectsData } from '../../data/projects'
import { MotionReveal } from '../ui/MotionReveal'

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="section-padding"
      style={{
        position: 'relative',
        zIndex: 1
      }}
    >
      <div className="container">
        {/* Section Tag */}
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
            [MANIFEST // 02 // SELECTED WORKS]
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
            SYSTEMS, PLATFORMS & EXPERIMENTS.
          </h2>
        </MotionReveal>

        {/* Project Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem' }}>
          {projectsData.map((project, index) => (
            <MotionReveal key={project.id} delay={0.08 * index}>
              <article
                className="responsive-two-col"
                style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '2.5rem',
                  alignItems: 'start'
                }}
              >
                {/* Left Column: Number & Title */}
                <div style={{ position: 'sticky', top: '5.5rem' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                      marginBottom: '0.5rem'
                    }}
                  >
                    0{index + 1} // {project.date}
                  </div>
                  <h3
                    style={{
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                      color: '#ffffff',
                      marginBottom: '0.5rem',
                      lineHeight: 1.2
                    }}
                  >
                    {project.title}
                  </h3>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {project.subtitle}
                  </div>
                </div>

                {/* Right Column: Description, Tags, Links */}
                <div>
                  <p
                    style={{
                      fontSize: '1.05rem',
                      lineHeight: 1.75,
                      color: 'var(--text-secondary)',
                      marginBottom: '1.5rem'
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Highlight callout if present */}
                  {project.highlight && (
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.82rem',
                        color: 'var(--text-muted)',
                        borderLeft: '2px solid rgba(255, 255, 255, 0.2)',
                        paddingLeft: '1rem',
                        marginBottom: '1.5rem'
                      }}
                    >
                      KEY HIGHLIGHT: {project.highlight}
                    </div>
                  )}

                  {/* Tags */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginBottom: '1.75rem'
                    }}
                  >
                    {project.tags.map((tag) => (
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

                  {/* Action Links */}
                  <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }}>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          letterSpacing: '0.05em',
                          color: '#ffffff',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                      >
                        LIVE DEMO ↗
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          letterSpacing: '0.05em',
                          color: 'var(--text-secondary)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                      >
                        REPOSITORY ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
