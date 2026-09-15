import React from 'react'
import { useTelemetry } from '../../hooks/useTelemetry'

export const CoordinatesHud: React.FC = () => {
  const telemetry = useTelemetry()

  return (
    <aside
      aria-label="Real-time Sector Telemetry"
      className="hud-desktop"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2.5rem',
        zIndex: 50,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.2rem'
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.74rem',
          letterSpacing: '0.06em',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          textShadow: '0 1px 6px rgba(7, 7, 9, 0.95), 0 2px 12px rgba(7, 7, 9, 0.9)'
        }}
      >
        <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>+</span>
        <span>SECTOR {telemetry.sector}</span>
        <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>//</span>
        <span style={{ color: 'var(--text-secondary)' }}>LAT: {telemetry.lat}</span>
        <span style={{ color: 'var(--text-secondary)' }}>LON: {telemetry.lon}</span>
        <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>//</span>
        <span>VECTOR: {telemetry.vectorX}, {telemetry.vectorY}</span>
      </div>
    </aside>
  )
}
