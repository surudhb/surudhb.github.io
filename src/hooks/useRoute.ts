import { useCallback, useEffect, useState } from 'react'

// Minimal pushState router: two pages, no dependency.
export type Route = 'home' | 'about'

export const ROUTE_PATHS: Record<Route, string> = {
  home: '/',
  about: '/about-me'
}

const routeFromPath = (path: string): Route =>
  path.replace(/\/+$/, '') === ROUTE_PATHS.about ? 'about' : 'home'

export const useRoute = (): [Route, (next: Route) => void] => {
  const [route, setRoute] = useState<Route>(() => routeFromPath(window.location.pathname))

  useEffect(() => {
    const onPop = () => setRoute(routeFromPath(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((next: Route) => {
    if (routeFromPath(window.location.pathname) === next) return
    window.history.pushState(null, '', ROUTE_PATHS[next])
    window.scrollTo(0, 0)
    setRoute(next)
  }, [])

  return [route, navigate]
}
