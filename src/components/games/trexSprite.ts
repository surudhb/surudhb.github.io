// Runner player: a walking T-rex derived from Myaumya's pterodactyl walk
// frames ("Dinosaur sprites"). The artist's head, body and legs are kept;
// the torso and legs were lengthened, the wing tip removed, and a J-curved
// tail (from the bottom of the body), clawed hands and clawed feet added so it
// reads as a T-rex. Faces right. Digits index PALETTE (the artist's colors, dark to
// light); '.' is transparent. The game maps these to the theme's gray ramp.

export const TREX_W = 23
export const TREX_H = 20

export const TREX_PALETTE: Record<string, [number, number, number]> = {
  '0': [0, 0, 0],
  '1': [27, 31, 30],
  '2': [34, 40, 38],
  '3': [39, 45, 43],
  '4': [42, 53, 49],
  '5': [50, 60, 57],
  '6': [54, 68, 63],
  '7': [62, 82, 75],
  '8': [195, 186, 186],
  '9': [253, 246, 246],
}

export const TREX_WALK: string[][] = [
  [
    '..........000000.......',
    '........007654220......',
    '.......0776509432000...',
    '........0065005432220..',
    '..........065555433220.',
    '...........05583838382.',
    '...........05420000000.',
    '...........000320......',
    '.0......0122402210.....',
    '.00.....0112440010.....',
    '.050....011244001000...',
    '.0550....011144010440..',
    '..055000000012440.0000.',
    '...05444446501120..00..',
    '....0000065220110......',
    '........065220110......',
    '........065220110......',
    '.......0522222010......',
    '........0042004033330..',
    '......000000.000000000.',
  ],
  [
    '.......................',
    '..........000000.......',
    '........007654220......',
    '.......0776094432000...',
    '........0060055432220..',
    '...........05555433220.',
    '...........05858383830.',
    '...........0542000000..',
    '.0.....04122002210.....',
    '.00.....0112440010.....',
    '.050....011244001000...',
    '.0550....011144010440..',
    '..055000000012440.0000.',
    '...05444446501120..00..',
    '....00000652201100.....',
    '........0652201100.....',
    '........0652201100.....',
    '.......05222220110.....',
    '........00042004003330.',
    '.......000000.000000000',
  ]
]

/** Game-over pose: first walk frame with the eye closed. */
export const TREX_DEAD: string[] = [
    '..........000000.......',
    '........007654220......',
    '.......0776501432000...',
    '........0065005432220..',
    '..........065555433220.',
    '...........05583838382.',
    '...........05420000000.',
    '...........000320......',
    '.0......0122402210.....',
    '.00.....0112440010.....',
    '.050....011244001000...',
    '.0550....011144010440..',
    '..055000000012440.0000.',
    '...05444446501120..00..',
    '....0000065220110......',
    '........065220110......',
    '........065220110......',
    '.......0522222010......',
    '........0042004033330..',
    '......000000.000000000.',
  ]

/** Paints pixel rows into a horizontal strip canvas (one frame per cell). */
export const paintStrip = (frames: string[][]): HTMLCanvasElement => {
  const c = document.createElement('canvas')
  c.width = TREX_W * frames.length
  c.height = TREX_H
  const g = c.getContext('2d')!
  frames.forEach((rows, i) => {
    rows.forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        const rgb = TREX_PALETTE[row[x]]
        if (!rgb) continue
        g.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
        g.fillRect(i * TREX_W + x, y, 1, 1)
      }
    })
  })
  return c
}
