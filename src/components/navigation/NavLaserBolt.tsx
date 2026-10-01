import React from 'react'

interface NavLaserBoltProps {
  isSettled: boolean
  isDeparting: boolean
  direction: 'right' | 'left'
  isLightMode: boolean
}

export const NavLaserBolt: React.FC<NavLaserBoltProps> = ({
  isSettled,
  isDeparting,
  direction,
  isLightMode,
}) => {
  const animClass = isSettled
    ? 'settled'
    : isDeparting
    ? direction === 'right'
      ? 'depart-right'
      : 'depart-left'
    : direction === 'right'
    ? 'arrive-right'
    : 'arrive-left'

  return (
    <div className="nav-laser-track">
      <div
        className={`nav-laser-bolt ${animClass}`}
        style={isLightMode ? { background: '#535353', boxShadow: 'none' } : undefined}
      />
    </div>
  )
}
