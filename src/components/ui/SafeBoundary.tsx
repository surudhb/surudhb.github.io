import React from 'react'

// After a deploy, the previous build's hashed chunks are deleted. A tab that
// was opened before the deploy then fails when it lazy-loads code (theme switch,
// game start). We reload to pick up the new build, at most once per minute: a
// timestamp (not a flag cleared on mount, since chunks fail after mount) stops a
// reload loop if the file is genuinely missing.
const RELOAD_KEY = 'surudh_stale_chunk_reload'
const RELOAD_COOLDOWN_MS = 60_000

export const isChunkLoadError = (err: unknown) => {
  const msg = err instanceof Error ? `${err.name} ${err.message}` : String(err)
  return /dynamically imported module|Importing a module script failed|ChunkLoadError|error loading dynamically imported module|Unable to preload CSS/i.test(msg)
}

export const reloadForStaleChunk = () => {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY)) || 0
    if (Date.now() - last < RELOAD_COOLDOWN_MS) return false
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()))
  } catch {
    return false
  }
  window.location.reload()
  return true
}

interface Props {
  children: React.ReactNode
  /** What to show instead when the subtree fails. Decorative layers use null. */
  fallback?: React.ReactNode
}

interface State {
  failed: boolean
}

/**
 * Contains a failure to one subtree (a background canvas, a HUD, a game) so the
 * rest of the site keeps working. Stale-chunk failures trigger a single reload.
 */
export class SafeBoundary extends React.Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  componentDidCatch(error: unknown) {
    if (isChunkLoadError(error)) reloadForStaleChunk()
  }

  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children
  }
}
