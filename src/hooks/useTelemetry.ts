import { useState, useEffect, useRef } from 'react'

export interface TelemetryData {
  sector: string
  lat: string
  lon: string
  vectorX: string
  vectorY: string
  velocity: string
  region: string
}

// Timezone to approximate coordinates dictionary (silent, zero permissions)
const TIMEZONE_COORDINATES: Record<string, { lat: number; lon: number; region: string }> = {
  'America/Edmonton': { lat: 51.0447, lon: -114.0719, region: 'CALGARY' },
  'America/Toronto': { lat: 43.6532, lon: -79.3832, region: 'TORONTO' },
  'America/Montreal': { lat: 45.5017, lon: -73.5673, region: 'MONTREAL' },
  'America/Vancouver': { lat: 49.2827, lon: -123.1207, region: 'VANCOUVER' },
  'America/Halifax': { lat: 44.6488, lon: -63.5752, region: 'HALIFAX' },
  'America/Winnipeg': { lat: 49.8951, lon: -97.1384, region: 'WINNIPEG' },
  'America/New_York': { lat: 40.7128, lon: -74.0060, region: 'NEW YORK' },
  'America/Chicago': { lat: 41.8781, lon: -87.6298, region: 'CHICAGO' },
  'America/Los_Angeles': { lat: 34.0522, lon: -118.2437, region: 'LOS ANGELES' },
  'America/Denver': { lat: 39.7392, lon: -104.9903, region: 'DENVER' },
  'America/Phoenix': { lat: 33.4484, lon: -112.0740, region: 'PHOENIX' },
  'America/Detroit': { lat: 42.3314, lon: -83.0458, region: 'DETROIT' },
  'America/Boise': { lat: 43.6150, lon: -116.2023, region: 'BOISE' },
  'America/Seattle': { lat: 47.6062, lon: -122.3321, region: 'SEATTLE' },
  'America/San_Francisco': { lat: 37.7749, lon: -122.4194, region: 'SAN FRANCISCO' },
  'Europe/London': { lat: 51.5074, lon: -0.1278, region: 'LONDON' },
  'Europe/Paris': { lat: 48.8566, lon: 2.3522, region: 'PARIS' },
  'Europe/Berlin': { lat: 52.5200, lon: 13.4050, region: 'BERLIN' },
  'Europe/Dublin': { lat: 53.3498, lon: -6.2603, region: 'DUBLIN' },
  'Europe/Amsterdam': { lat: 52.3676, lon: 4.9041, region: 'AMSTERDAM' },
  'Asia/Tokyo': { lat: 35.6762, lon: 139.6503, region: 'TOKYO' },
  'Asia/Singapore': { lat: 1.3521, lon: 103.8198, region: 'SINGAPORE' },
  'Asia/Kolkata': { lat: 28.6139, lon: 77.2090, region: 'NEW DELHI' },
  'Asia/Calcutta': { lat: 28.6139, lon: 77.2090, region: 'NEW DELHI' },
  'Asia/Dubai': { lat: 25.2048, lon: 55.2708, region: 'DUBAI' },
  'Australia/Sydney': { lat: -33.8688, lon: 151.2093, region: 'SYDNEY' },
  'Australia/Melbourne': { lat: -37.8136, lon: 144.9631, region: 'MELBOURNE' }
}

export function useTelemetry() {
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    sector: '04',
    lat: '43.6532° N',
    lon: '79.3832° W',
    vectorX: '-12.4',
    vectorY: '+08.1',
    velocity: '0.42c',
    region: 'LOCAL'
  })

  // Base coordinates determined from user's system timezone without asking permission
  const baseCoords = useRef({ lat: 43.6532, lon: -79.3832, region: 'LOCAL' })

  // Normalized mouse position (-1 to 1)
  const targetX = useRef(0)
  const targetY = useRef(0)
  const currentX = useRef(0)
  const currentY = useRef(0)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    // 1. Resolve initial base coordinate from user timezone (zero permissions)
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      if (tz && TIMEZONE_COORDINATES[tz]) {
        baseCoords.current = TIMEZONE_COORDINATES[tz]
      }
    } catch {
      // Fallback stays as default
    }

    // 2. Silent background geo-lookup fallback (no permission prompt)
    fetch('https://api.country.is/')
      .then((res) => res.json())
      .then((data) => {
        if (data?.country) {
          // If in Canada / US and no exact tz match, maintain regional accuracy
        }
      })
      .catch(() => {
        // Silent catch
      })

    const handleMouseMove = (e: MouseEvent) => {
      const width = window.innerWidth
      const height = window.innerHeight
      targetX.current = (e.clientX / width) * 2 - 1
      targetY.current = (e.clientY / height) * 2 - 1
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const updateLoop = () => {
      currentX.current += (targetX.current - currentX.current) * 0.08
      currentY.current += (targetY.current - currentY.current) * 0.08

      const baseLat = baseCoords.current.lat
      const baseLon = baseCoords.current.lon

      // Modulate slightly based on cursor traversal
      const dynamicLatNum = baseLat + currentY.current * 0.045
      const dynamicLonNum = baseLon - currentX.current * 0.065

      const latDir = dynamicLatNum >= 0 ? 'N' : 'S'
      const lonDir = dynamicLonNum >= 0 ? 'E' : 'W'

      const latStr = `${Math.abs(dynamicLatNum).toFixed(4)}° ${latDir}`
      const lonStr = `${Math.abs(dynamicLonNum).toFixed(4)}° ${lonDir}`

      const vx = (currentX.current * -24.0).toFixed(1)
      const vy = (currentY.current * 18.0).toFixed(1)
      const speed = (0.42 + Math.abs(currentX.current + currentY.current) * 0.05).toFixed(2)

      setTelemetry({
        sector: '04',
        lat: latStr,
        lon: lonStr,
        vectorX: vx.startsWith('-') ? vx : `+${vx}`,
        vectorY: vy.startsWith('-') ? vy : `+${vy}`,
        velocity: `${speed}c`,
        region: baseCoords.current.region
      })

      rafId.current = requestAnimationFrame(updateLoop)
    }

    rafId.current = requestAnimationFrame(updateLoop)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return telemetry
}
