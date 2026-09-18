// Authentic Chromium offline runner sprite definitions and HDPI coordinate mapping
// Sourced directly from Chromium's components/neterror/resources/images/default_200_percent/200-offline-sprite.png

export const SPRITE_SHEET_2X_URL = '/sprites/200-offline-sprite.png'

export interface SpriteRect {
  sx: number
  sy: number
  sw: number
  sh: number
  dw: number
  dh: number
}

// 200% HDPI coordinates (width=2441, height=130)
export const DINO_SPRITES_HDPI = {
  TREX: {
    // Two alternating running leg frames (each 88x94 source, renders 44x47 default)
    RUN_1: { sx: 1854, sy: 2, sw: 88, sh: 94, dw: 44, dh: 47 },
    RUN_2: { sx: 1942, sy: 2, sw: 88, sh: 94, dw: 44, dh: 47 }
  },
  PTERODACTYL: {
    // Flapping wings frames (each 92x80 source, renders 46x40 default)
    WING_UP: { sx: 260, sy: 2, sw: 92, sh: 80, dw: 46, dh: 40 },
    WING_DOWN: { sx: 352, sy: 2, sw: 92, sh: 80, dw: 46, dh: 40 }
  },
  CLOUD: {
    sx: 166,
    sy: 2,
    sw: 92,
    sh: 28,
    dw: 46,
    dh: 14
  },
  HORIZON: {
    sx: 2,
    sy: 104,
    sw: 1200,
    sh: 24,
    dw: 600,
    dh: 12
  },
  // Small cacti varieties (single, double, triple)
  CACTUS_SMALL: [
    { sx: 446, sy: 2, sw: 34, sh: 70, dw: 17, dh: 35 },
    { sx: 480, sy: 2, sw: 68, sh: 70, dw: 34, dh: 35 },
    { sx: 548, sy: 2, sw: 102, sh: 70, dw: 51, dh: 35 }
  ],
  // Large cacti varieties (single, double)
  CACTUS_LARGE: [
    { sx: 652, sy: 2, sw: 50, sh: 100, dw: 25, dh: 50 },
    { sx: 702, sy: 2, sw: 100, sh: 100, dw: 50, dh: 50 }
  ]
}
