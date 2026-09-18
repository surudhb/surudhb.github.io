import { Theme } from '../context/ThemeContext'

export interface ThemeContentConfig {
  subtitleTokens: string[]
  aboutHeader: string
  experienceHeader: string
  projectsHeader: string
  blogHeader: string
  extrasHeader: string
  hudLabel: string
  statusBadge?: string
}

export const THEME_CONFIG: Record<Theme, ThemeContentConfig> = {
  dark: {
    subtitleTokens: ['SOFTWARE', 'ENGINEER', '//', 'TECHNICAL', 'PROGRAM', 'MANAGER'],
    aboutHeader: '[DOSSIER // 01 // BACKGROUND & CRAFT]',
    experienceHeader: '[SYSTEM LOG // 03 // WORK CHRONICLE]',
    projectsHeader: '[MANIFEST // 02 // SELECTED WORKS]',
    blogHeader: '[TRANSMISSIONS // 04 // ESSAYS & LOGS]',
    extrasHeader: '[ARCHIVES // 05 // EXTRAS & INFLUENCES]',
    hudLabel: 'SECTOR TELEMETRY',
    statusBadge: 'SYS_ONLINE // LINK ESTABLISHED'
  },
  light: {
    subtitleTokens: ['SOFTWARE', 'ENGINEER', '🌵', 'TECHNICAL', 'PROGRAM', 'MANAGER'],
    aboutHeader: '[EPOCH 01 🌵 PREHISTORIC ROOTS 🌵 ORIGINS]',
    experienceHeader: '[EPOCH 02 🌵 EXPEDITIONS 🌵 HUNT & GATHER 🌵 IMPACT]',
    projectsHeader: '[EPOCH 03 🌵 STONE TOOLS 🌵 INVENTIONS]',
    blogHeader: '[EPOCH 04 🌵 CAVE DRAWINGS 🌵 DISPATCHES]',
    extrasHeader: '[EPOCH 05 🌵 BONE PILE & RELICS 🌵 ARTIFACTS]',
    hudLabel: 'PREHISTORIC MODE',
    statusBadge: 'ERR_INTERNET_DISCONNECTED'
  }
}
