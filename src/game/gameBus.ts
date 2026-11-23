// Shared, mutable frame-to-frame state between the decorative background
// canvases and the game layer. Plain object on purpose: it is read inside
// requestAnimationFrame loops, so it must never trigger React renders.
//
// Pattern: the game sets *targets*; the backgrounds ease their own current
// values toward those targets and publish what they actually used this frame.
// That keeps every transition smooth even if the game unmounts mid-ease.

export const AMBIENT_GROUND_SPEED = 2.4 // px per 60fps frame (light background)

export const gameBus = {
  // Id of the run currently allowed to drive the backgrounds; 0 = no game.
  // A game keeps animating through its fade-out after exit, so every write
  // below is gated on still owning the session. Otherwise a late write
  // (e.g. a game over during the fade) would leave the background fast.
  session: 0,

  // Light theme (DinoRunnerCanvas)
  groundSpeedTarget: AMBIENT_GROUND_SPEED,
  groundSpeed: AMBIENT_GROUND_SPEED, // published by the background each frame
  ambientDinoHideTarget: 0, // 0 = ambient runner visible, 1 = hidden
  decorDimTarget: 1, // multiplier for decorative cacti/pterodactyl opacity

  // Dark theme (StarfieldCanvas)
  starBoostTarget: 0, // extra star speed added on top of the ambient speed
  starCenterX: 0, // vanishing point published by the starfield each frame
  starCenterY: 0
}

export const STAR_FOCAL = 220 // must match the starfield projection (k = 220 / z)

let lastSession = 0

/** Starts a new run and returns its id. Called by GameModeContext.start. */
export const beginGameSession = () => {
  lastSession += 1
  gameBus.session = lastSession
  return lastSession
}

/** Ends the run: no game may write to the bus until the next session begins. */
export const endGameSession = () => {
  gameBus.session = 0
  resetGameBus()
}

export const resetGameBus = () => {
  gameBus.groundSpeedTarget = AMBIENT_GROUND_SPEED
  gameBus.ambientDinoHideTarget = 0
  gameBus.decorDimTarget = 1
  gameBus.starBoostTarget = 0
}

// Shared light-theme geometry so the game and background agree to the pixel.
export const horizonYFor = (height: number) => Math.min(height - 110, height * 0.88)
export const ambientDinoXFor = (width: number) => Math.max(60, width * 0.08)

// Frame-rate independent exponential ease: returns the new value.
export const easeToward = (current: number, target: number, dtMs: number, halfLifeMs: number) =>
  target + (current - target) * Math.pow(0.5, dtMs / halfLifeMs)
