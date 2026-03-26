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
  const [onDark, setOnDark]   = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const dotX  = useSpring(cursorX, { stiffness: 1200, damping: 40, mass: 0.8 })
  const dotY  = useSpring(cursorY, { stiffness: 1200, damping: 40, mass: 0.8 })
  const ringX = useSpring(cursorX, { stiffness: 100,  damping: 24, mass: 1.0 })
  const ringY = useSpring(cursorY, { stiffness: 100,  damping: 24, mass: 1.0 })

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      /* Detect dark background — check element + footer background directly */
      const checkDark = (x, y) => {
        /* First check if we're in the footer zone (fixed at bottom) */
        const footer = document.querySelector('footer')
        if (footer) {
          const fr = footer.getBoundingClientRect()
          const fz = parseInt(window.getComputedStyle(footer).zIndex)
          if (fz > 0 && x >= fr.left && x <= fr.right && y >= fr.top && y <= fr.bottom) {
            setOnDark(true)
            return
          }
        }
        /* Otherwise walk up the DOM tree */
        const el = document.elementFromPoint(x, y)
        if (el) {
          let node = el
          while (node && node !== document.body) {
            const bg = window.getComputedStyle(node).backgroundColor
            if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
              const match = bg.match(/\d+/g)
              if (match) {
                const [r, g, b] = match.map(Number)
                const luminance = (0.299 * r + 0.587 * g + 0.114 * b)
                setOnDark(luminance < 60)
              }
              return
            }
            node = node.parentElement
          }
        }
      }
      checkDark(e.clientX, e.clientY)
    }

    const onEnter = () => setHovered(true)
    const onLeave = () => setHovered(false)

    window.addEventListener('mousemove', move)

    const attach = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    const t = setTimeout(attach, 300)

    return () => {
      window.removeEventListener('mousemove', move)
      clearTimeout(t)
    }
  }, [])

  /* Color switches: white on dark bg, black on light bg */
  const dotColor  = onDark ? '#ffffff' : '#111110'
  const ringColor = onDark ? 'rgba(255,255,255,0.35)' : 'rgba(17,17,16,0.25)'

  if (isMobile) return null

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          zIndex: 99999,
          pointerEvents: 'none',
          borderRadius: '50%',
          x: dotX, y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovered ? 10 : 8,
          height: hovered ? 10 : 8,
          background: hovered ? 'transparent' : dotColor,
          border: hovered ? `1.5px solid ${dotColor}` : 'none',
          transition: 'background 0.2s, border-color 0.2s',
        }}
        transition={{ width: { duration: 0.15 }, height: { duration: 0.15 } }}
      />

      {/* Ring */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          zIndex: 99998,
          pointerEvents: 'none',
          borderRadius: '50%',
          border: `1px solid ${ringColor}`,
          x: ringX, y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovered ? 28 : 32,
          height: hovered ? 28 : 32,
          transition: 'border-color 0.3s',
        }}
        transition={{ width: { duration: 0.2 }, height: { duration: 0.2 } }}
      />
    </>
  )
}