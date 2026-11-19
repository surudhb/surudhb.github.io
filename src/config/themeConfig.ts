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
    subtitleTokens: ['TECHNICAL', 'PROGRAM', 'MANAGER', '//', 'SOFTWARE', 'ENGINEER'],
    aboutHeader: '[DOSSIER // 01 // BACKGROUND]',
    experienceHeader: '[SYSTEM LOG // 02 // WORK HISTORY]',
    hudLabel: 'SECTOR TELEMETRY',
    statusBadge: 'SYS_ONLINE // LINK ESTABLISHED'
  },
  light: {
    subtitleTokens: ['TECHNICAL', 'PROGRAM', 'MANAGER', '🌵', 'SOFTWARE', 'ENGINEER'],
    aboutHeader: '[EPOCH 01 🌵 PREHISTORIC ROOTS 🌵 ORIGINS]',
    experienceHeader: '[EPOCH 02 🌵 EXPEDITIONS 🌵 IMPACT]',
    hudLabel: 'PREHISTORIC MODE',
    statusBadge: 'ERR_INTERNET_DISCONNECTED'
  }
}
