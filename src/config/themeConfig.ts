import { Theme } from '../context/ThemeContext'

export interface ThemeContentConfig {
  subtitleTokens: string[]
  aboutHeader: string
  credentialsHeader: string
  trajectoryHeader: string
  experienceHeader: string
  hudLabel: string
  statusBadge?: string
}

export const THEME_CONFIG: Record<Theme, ThemeContentConfig> = {
  dark: {
    subtitleTokens: ['TECHNICAL', 'PROGRAM', 'MANAGER', '//', 'SOFTWARE', 'ENGINEER'],
    aboutHeader: '[DOSSIER // 01 // BACKGROUND]',
    credentialsHeader: '[CREDENTIALS // 02 // ACADEMIC]',
    trajectoryHeader: '[TRAJECTORY // 03 // CAREER]',
    experienceHeader: '[SYSTEM LOG // 04 // WORK HISTORY]',
    hudLabel: 'SECTOR TELEMETRY',
    statusBadge: 'SYS_ONLINE // LINK ESTABLISHED'
  },
  light: {
    subtitleTokens: ['TECHNICAL', 'PROGRAM', 'MANAGER', '🌵', 'SOFTWARE', 'ENGINEER'],
    aboutHeader: '[EPOCH 01 🌵 PREHISTORIC ROOTS 🌵 ORIGINS]',
    credentialsHeader: '[EPOCH 02 🌵 SCHOOLING]',
    trajectoryHeader: '[EPOCH 03 🌵 MIGRATION PATH]',
    experienceHeader: '[EPOCH 04 🌵 EXPEDITIONS 🌵 IMPACT]',
    hudLabel: 'PREHISTORIC MODE',
    statusBadge: 'ERR_INTERNET_DISCONNECTED'
  }
}
