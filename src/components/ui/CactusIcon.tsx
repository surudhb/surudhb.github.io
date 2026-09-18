import React from 'react'

export interface CactusIconProps {
  size?: number | string
  style?: React.CSSProperties
  className?: string
  color?: string
}

/**
 * Authentic 8-bit saguaro cactus silhouette inspired by Chromium's offline dinosaur runner.
 * Scales fluidly with font size ('0.9em') or pixel numbers and inherits theme colors.
 */
export const CactusIcon: React.FC<CactusIconProps> = ({
  size = '0.9em',
  style,
  className,
  color = 'currentColor'
}) => {
  return (
    <svg
      viewBox="0 0 16 24"
      width={size}
      height={size}
      fill={color}
      className={className}
      style={{
        display: 'inline-block',
        verticalAlign: '-0.15em',
        flexShrink: 0,
        shapeRendering: 'crispEdges',
        ...style
      }}
      aria-hidden="true"
    >
      {/* Central Trunk: width 4, height 23 (x: 6-9, y: 1-23) */}
      <rect x="6" y="1" width="4" height="23" />
      {/* Left arm: vertical arm (x: 2-4, y: 6-13), horizontal connector (x: 4-6, y: 11-13) */}
      <rect x="2" y="6" width="3" height="8" />
      <rect x="4" y="11" width="3" height="3" />
      {/* Right arm: vertical arm (x: 11-13, y: 8-15), horizontal connector (x: 9-11, y: 13-15) */}
      <rect x="11" y="8" width="3" height="8" />
      <rect x="9" y="13" width="3" height="3" />
    </svg>
  )
}
