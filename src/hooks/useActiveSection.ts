import { useState, useEffect } from 'react'

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || 'home')

  useEffect(() => {
    // A horizontal band spanning the middle 20% of the viewport.
    // Whichever section enters this band becomes active.
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length === 0) return
        // When multiple sections intersect (transition zone), prefer the one
        // that appears earlier in the declared section order.
        const best = visible.sort(
          (a, b) => sectionIds.indexOf(a.target.id) - sectionIds.indexOf(b.target.id)
        )[0]
        setActiveSection(best.target.id)
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )

    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean) as Element[]

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds])

  return activeSection
}
