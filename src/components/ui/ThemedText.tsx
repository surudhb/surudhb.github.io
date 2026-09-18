import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import { CactusIcon } from './CactusIcon'

export interface ThemedTextProps {
  text: string
  iconSize?: number | string
  className?: string
  style?: React.CSSProperties
}

/**
 * Renders text with theme-aware dividers:
 * - In Light Mode (Chrome Dino theme): replaces '//', '■', and '🌵' dividers with pixel-art Cactus icons.
 * - In Dark Mode (Deep Space / Tron theme): preserves or transforms them to standard '//'.
 */
export const ThemedText: React.FC<ThemedTextProps> = ({
  text,
  iconSize = '0.85em',
  className,
  style
}) => {
  const { isLightMode } = useTheme()

  // In dark mode with standard text without prehistoric markers, render plain text
  if (!isLightMode && !text.includes('■') && !text.includes('🌵')) {
    return (
      <span className={className} style={style}>
        {text}
      </span>
    )
  }

  // Tokenize string on divider patterns: //, ■, 🌵
  const parts = text.split(/(\/\/|■|🌵)/g)

  return (
    <span className={className} style={style}>
      {parts.map((part, index) => {
        if (part === '//' || part === '■' || part === '🌵') {
          if (isLightMode) {
            return (
              <span
                key={index}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  margin: '0 0.35em',
                  verticalAlign: 'baseline',
                  color: 'var(--divider-symbol-color)'
                }}
              >
                <CactusIcon size={iconSize} />
              </span>
            )
          }
          return <React.Fragment key={index}>//</React.Fragment>
        }
        return <React.Fragment key={index}>{part}</React.Fragment>
      })}
    </span>
  )
}
