import React from 'react'
import { profileData } from '../../data/profile'
import { trajectoryData } from '../../data/trajectory'
import { MotionReveal } from '../ui/MotionReveal'
import { useTheme } from '../../context/ThemeContext'
import { THEME_CONFIG } from '../../config/themeConfig'
import { FEATURES } from '../../config/features'
import { ThemedText } from '../ui/ThemedText'
import { CactusIcon } from '../ui/CactusIcon'
import { ExperienceSection } from '../sections/ExperienceSection'

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.78rem',
  letterSpacing: '0.12em',
  color: 'var(--text-muted)',
  marginBottom: '1.25rem'
}

const linkHover = {
  onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--text-secondary)'),
  onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--text-primary)')
}

// /about-me: intro, academic credentials, then career trajectory.
export const AboutPage: React.FC = () => {
  const { theme, isLightMode } = useTheme()
  const config = THEME_CONFIG[theme]

  return (
    <section id="about" className="about-page" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Header */}
        <MotionReveal onMount>
          <div style={labelStyle}>
            <ThemedText text={config.aboutHeader} />
          </div>
          <h1
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              marginBottom: '1.5rem',
              color: 'var(--text-primary)'
            }}
          >
            Hi, I'm Surudh.
          </h1>
        </MotionReveal>

        <div className="about-grid">
          {/* Intro */}
          <div>
            {profileData.bio.map((paragraph, index) => (
              <MotionReveal onMount key={index} delay={0.08 * (index + 1)}>
                <p
                  style={{
                    fontSize: '1rem',
                    lineHeight: 1.75,
                    color: 'var(--text-secondary)',
                    marginBottom: '1.15rem'
                  }}
                >
                  {paragraph}
                </p>
              </MotionReveal>
            ))}
          </div>

          {/* Right column: academic credentials, then career trajectory */}
          <div>
          <MotionReveal onMount delay={0.2}>
            <div style={labelStyle}>
              <ThemedText text={config.credentialsHeader} />
            </div>
            {profileData.education.map((edu) => (
              <div
                key={edu.institution}
                style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: '1.25rem' }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  {edu.period}
                </div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                  {edu.link ? (
                    <a href={edu.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)' }} {...linkHover}>
                      {edu.institution} ↗
                    </a>
                  ) : (
                    edu.institution
                  )}
                </h2>
                <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{edu.degree}</div>
              </div>
            ))}
          </MotionReveal>

          {/* Career trajectory: company names and dates, oldest to newest */}
          <div style={{ marginTop: '1.75rem' }}>
            <MotionReveal onMount delay={0.25}>
              <div style={labelStyle}>
                <ThemedText text={config.trajectoryHeader} />
              </div>
            </MotionReveal>
            <ol className="trajectory">
            {trajectoryData.map((stop, index) => (
              <li key={stop.company} className="trajectory-item">
                <span className="trajectory-marker" aria-hidden="true">
                  {isLightMode ? (
                    <span style={{ color: stop.current ? 'var(--accent-amber)' : 'var(--text-secondary)', display: 'inline-flex' }}>
                      <CactusIcon size="1rem" />
                    </span>
                  ) : (
                    <span className={`trajectory-dot${stop.current ? ' current' : ''}`} />
                  )}
                </span>
                <MotionReveal onMount delay={0.3 + 0.06 * index} yOffset={8}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.15rem' }}>
                    {stop.period.toUpperCase()}
                    {stop.coop && <span style={{ marginLeft: '0.6rem', letterSpacing: '0.1em' }}>CO-OP</span>}
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.3, color: 'var(--text-primary)' }}>
                    {stop.link ? (
                      <a href={stop.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)' }} {...linkHover}>
                        {stop.company} ↗
                      </a>
                    ) : (
                      stop.company
                    )}
                  </div>
                </MotionReveal>
              </li>
            ))}
          </ol>
          </div>
          </div>
        </div>
      </div>

      {FEATURES.experienceSection && <ExperienceSection />}
    </section>
  )
}
