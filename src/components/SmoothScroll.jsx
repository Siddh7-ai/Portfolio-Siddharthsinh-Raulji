import { useEffect, useLayoutEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useLocation } from 'react-router-dom'

/**
 * SmoothScroll component integrates Lenis for high-performance smooth scrolling.
 * It also handles automatic scroll resetting on route changes.
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)
  const location = useLocation()

  useLayoutEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expoOut
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothMultiplier: 1.1,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  // Handle scroll reset on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }
    // Standard window scroll reset as fallback
    window.scrollTo(0, 0)
  }, [location.pathname])

  return <div className="smooth-scroll-container">{children}</div>
}
