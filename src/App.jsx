import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Cursor          from './components/Cursor'
import Loader          from './components/Loader'
import HomePage        from './pages/HomePage'
import AllProjectsPage from './pages/AllProjectsPage'
import { LoaderProvider, useLoader } from './context/LoaderContext'
import SmoothScroll    from './components/SmoothScroll'

function AppInner() {
  const { visible } = useLoader()

  useEffect(() => {
    // Detect low-end devices or user preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleReducedMotion = (e) => {
      if (e.matches) {
        document.body.classList.add('low-perf')
      } else {
        document.body.classList.remove('low-perf')
      }
    }
    
    // Initial check
    if (mediaQuery.matches) document.body.classList.add('low-perf')
    
    // Check hardware (very basic)
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
      document.body.classList.add('low-perf-hardware')
    }

    mediaQuery.addEventListener('change', handleReducedMotion)
    return () => mediaQuery.removeEventListener('change', handleReducedMotion)
  }, [])

  return (
    <SmoothScroll>
      {/* Page content */}
      <div style={{ visibility: visible ? 'hidden' : 'visible' }}>
        <Routes>
          <Route path="/"         element={<HomePage />} />
          <Route path="/projects" element={<AllProjectsPage />} />
        </Routes>
      </div>

      {/* Loader on top */}
      <AnimatePresence>
        {visible && <Loader key="loader" />}
      </AnimatePresence>

      {/* Global Cursor - last for backdrop inversion */}
      <Cursor />
    </SmoothScroll>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LoaderProvider>
        <AppInner />
      </LoaderProvider>
    </BrowserRouter>
  )
}