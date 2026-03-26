import { useEffect, useState } from 'react'
import { useLoader } from '../context/LoaderContext'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { visible: loaderVisible } = useLoader()
  const [hovered, setHovered] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Super smooth springs for that "premium" feel
  const dotX  = useSpring(cursorX, { stiffness: 1000, damping: 45, mass: 0.6 })
  const dotY  = useSpring(cursorY, { stiffness: 1000, damping: 45, mass: 0.6 })
  const ringX = useSpring(cursorX, { stiffness: 180,  damping: 30, mass: 0.8 })
  const ringY = useSpring(cursorY, { stiffness: 180,  damping: 30, mass: 0.8 })

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      // Detect hover using delegation
      const target = e.target.closest('a, button, [data-cursor], .magnetic-link')
      setHovered(!!target)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  if (isMobile || loaderVisible) return null

  return (
    <>
      {/* ── DOT (Hidden on hover) ── */}
      <motion.div
        animate={{
          scale: hovered ? 0 : 1,
          opacity: hovered ? 0 : 1,
        }}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          zIndex: 99999,
          pointerEvents: 'none',
          borderRadius: '50%',
          x: dotX, y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 8, height: 8,
          background: '#FFFFFF', // White for mix-blend-mode difference
          mixBlendMode: 'difference',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      />

      {/* ── RING / EXPANDED CIRCLE (Inversion effect) ── */}
      <motion.div
        animate={{
          width: hovered ? 60 : 34,
          height: hovered ? 60 : 34,
          backgroundColor: hovered ? '#FFFFFF' : 'transparent',
          opacity: hovered ? 1 : 0.45,
        }}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          zIndex: 99998,
          pointerEvents: 'none',
          borderRadius: '50%',
          borderWidth: hovered ? 0 : 1,
          borderStyle: 'solid',
          borderColor: '#FFFFFF',
          x: ringX, y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'difference',
        }}
        transition={{ 
          width: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
          height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
          backgroundColor: { duration: 0.2 },
        }}
      />
    </>
  )
}