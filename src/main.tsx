import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'
import { reloadForStaleChunk } from './components/ui/SafeBoundary'

// Vite fires this when a lazy chunk (or its CSS) fails to load, typically a
// tab opened before the latest deploy whose old chunks are gone. Reload once.
// If the reload is on cooldown, the error propagates to the import's own handler.
window.addEventListener('vite:preloadError', (event) => {
  if (reloadForStaleChunk()) event.preventDefault()
})

const rootElement = document.getElementById('root')

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
