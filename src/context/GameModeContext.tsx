import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { beginGameSession, endGameSession, gameBus } from '../game/gameBus'
import { isChunkLoadError, reloadForStaleChunk } from '../components/ui/SafeBoundary'

export type GameKind = 'space' | 'dino'

interface GameModeValue {
  active: boolean
  kind: GameKind | null
  start: (kind: GameKind) => void
  exit: () => void
}

const GameModeContext = createContext<GameModeValue | undefined>(undefined)

// Game chunks load only on demand. The egg calls preloadGame on hover so the
// code is usually ready before the click, which keeps the start seamless.
export const loadRockField = () => import('../components/games/RockField')
export const loadDinoRun = () => import('../components/games/DinoRun')

export const preloadGame = (kind: GameKind) => (kind === 'space' ? loadRockField() : loadDinoRun())

export const GameModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [kind, setKind] = useState<GameKind | null>(null)

  const start = useCallback((next: GameKind) => {
    // Wait for the chunk so the first game frame is never blank.
    preloadGame(next)
      .then(() => {
        if (gameBus.session !== 0) return // a run is already live (e.g. a double click)
        beginGameSession()
        setKind(next)
      })
      .catch((err) => {
        // Usually a stale tab after a deploy: reload once to get the new build
        if (isChunkLoadError(err)) reloadForStaleChunk()
      })
  }, [])

  const exit = useCallback(() => {
    endGameSession()
    setKind(null)
  }, [])

  const value = useMemo(() => ({ active: kind !== null, kind, start, exit }), [kind, start, exit])

  return <GameModeContext.Provider value={value}>{children}</GameModeContext.Provider>
}

export const useGameMode = (): GameModeValue => {
  const ctx = useContext(GameModeContext)
  if (!ctx) throw new Error('useGameMode must be used within a GameModeProvider')
  return ctx
}
