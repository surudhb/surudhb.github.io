import { Theme } from '../context/ThemeContext'

export interface ThemeContentConfig {
  subtitleTokens: string[]
  aboutHeader: string
  experienceHeader: string
  hudLabel: string
  statusBadge?: string
}

export const THEME_CONFIG: Record<Theme, ThemeContentConfig> = {
  dark: {
    subtitleTokens: ['SOFTWARE', 'ENGINEER', '//', 'TECHNICAL', 'PROGRAM', 'MANAGER'],
    aboutHeader: '[DOSSIER // 01 // BACKGROUND & CRAFT]',
    experienceHeader: '[SYSTEM LOG // 03 // WORK CHRONICLE]',
    hudLabel: 'SECTOR TELEMETRY',
    statusBadge: 'SYS_ONLINE // LINK ESTABLISHED'
  },
  light: {
    subtitleTokens: ['SOFTWARE', 'ENGINEER', '🌵', 'TECHNICAL', 'PROGRAM', 'MANAGER'],
    aboutHeader: '[EPOCH 01 🌵 PREHISTORIC ROOTS 🌵 ORIGINS]',
    experienceHeader: '[EPOCH 02 🌵 EXPEDITIONS 🌵 HUNT & GATHER 🌵 IMPACT]',
    hudLabel: 'PREHISTORIC MODE',
    statusBadge: 'ERR_INTERNET_DISCONNECTED'
  }
}
