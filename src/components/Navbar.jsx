import { useEffect, useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useLoader } from '../context/LoaderContext'

export const NAV_H = 72

const navLinks = [
  { label: 'About',   href: '#about'    },
  { label: 'Work',    href: '#projects' },
  { label: 'Contact', href: '#contact'  },
]

/* ── SR Logo mark ── */
function SRLogo() {
  return (
    <svg
      viewBox="0 0 130 130"
      width="34"
      height="34"
      fill="none"
      style={{ flexShrink: 0, display: 'block' }}
    >
      {/* S — two arcs, #111110 */}
      <path
        d="M58 22 A28 22 0 0 0 14 44 A28 22 0 0 1 58 66 A28 22 0 0 1 14 88"
        fill="none"
        stroke="#111110"
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* R — vertical stem */}
      <line
        x1="74" y1="22" x2="74" y2="110"
        stroke="#111110"
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* R — bump arc */}
      <path
        d="M74 22 Q104 22 104 44 Q104 66 74 66"
        fill="none"
        stroke="#111110"
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* R — diagonal leg */}
      <line
        x1="74" y1="66" x2="104" y2="110"
        stroke="#111110"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* ── Magnetic CTA pill ── */
function MagneticBtn({ children, href, target, rel, download }) {
  const { triggerLoader } = useLoader()
  const navigate = useNavigate()
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 24 })
  const sy = useSpring(y, { stiffness: 300, damping: 24 })
  const isSectionLink = href?.startsWith('#')

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width  / 2)) * 0.35)
    y.set((e.clientY - (r.top  + r.height / 2)) * 0.35)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  const handleClick = useCallback((e) => {
    if (!isSectionLink) return

    e.preventDefault()
    const id = href.replace('#', '')
    const isHome = window.location.pathname === '/'

    triggerLoader(() => {
      if (!isHome) {
        navigate('/')
        setTimeout(() => {
          const el = document.getElementById(id)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        else window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    })
  }, [href, isSectionLink, navigate, triggerLoader])

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      download={download}
      onClick={handleClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        x: sx, y: sy,
        display: 'inline-block',
        fontFamily: '"DM Sans", sans-serif',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        color: '#111110',
        border: '1.5px solid #111110',
        borderRadius: '100px',
        padding: '8px 22px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'none',
        whiteSpace: 'nowrap',
      }}
      whileTap={{ scale: 0.96 }}
    >
      <motion.span
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', inset: 0,
          background: '#111110',
          transformOrigin: 'left',
          zIndex: 0,
        }}
      />
      <motion.span
        initial={{ color: '#111110' }}
        whileHover={{ color: '#e8e6e1' }}
        transition={{ duration: 0.22 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {children}
      </motion.span>
    </motion.a>
  )
}

/* ── Single nav link ── */
function NavLink({ label, href, delay }) {
  const { triggerLoader } = useLoader()
  const navigate = useNavigate()

  const handleClick = useCallback((e) => {
    e.preventDefault()
    const id = href.replace('#','')
    const isOnHomePage = window.location.pathname === '/'
    triggerLoader(() => {
      if (!isOnHomePage) {
        /* Navigate to home first, then scroll to section */
        navigate('/')
        setTimeout(() => {
          const el = document.getElementById(id)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        else window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    })
  }, [href, triggerLoader, navigate])

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      style={{
        position: 'relative',
        fontFamily: '"DM Sans", sans-serif',
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#111110',
        textDecoration: 'none',
        padding: '4px 10px',
        cursor: 'none',
      }}
    >
      {label}
      <motion.span
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          bottom: 1, left: '10px', right: '10px',
          height: '1px',
          background: '#111110',
          transformOrigin: 'left',
          display: 'block',
        }}
      />
    </motion.a>
  )
}

/* ── Waving hand ── */
function WavingHand() {
  return (
    <motion.span
      animate={{ rotate: [0, 22, -10, 22, -6, 14, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.8, ease: 'easeInOut' }}
      style={{
        display: 'inline-block',
        fontSize: '22px',
        marginLeft: '7px',
        lineHeight: 1,
        transformOrigin: '65% 75%',
        cursor: 'none',
      }}
    >
      👋🏻
    </motion.span>
  )
}


function SRLogoBtn({ isProjectsPage }) {
  const { triggerLoader } = useLoader()
  const navigate = useNavigate()

  const handleClick = useCallback((e) => {
    e.preventDefault()
    triggerLoader(() => {
      navigate('/')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }, [triggerLoader, navigate])

  return (
    <button
      onClick={handleClick}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        background: 'none', border: 'none', cursor: 'none', flexShrink: 0,
        padding: 0,
      }}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}
      >
        <SRLogo />
      </motion.div>
      <span style={{
        display: isProjectsPage ? 'none' : 'flex', alignItems: 'center',
        fontFamily: '"DM Sans", sans-serif',
        fontSize: '12px', fontWeight: 700,
        letterSpacing: '0.05em', textTransform: 'uppercase',
        color: '#111110', whiteSpace: 'nowrap',
      }}>
        Hello, There!
        <WavingHand />
      </span>
    </button>
  )
}

export default function Navbar() {
  const [visible, setVisible] = useState(true)
  const isProjectsPage = window.location.pathname === '/projects'

  useEffect(() => {
    // On /projects page navbar is always visible (no scroll hide)
    if (isProjectsPage) { setVisible(true); return }
    const onScroll = () => {
      setVisible(window.scrollY < window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isProjectsPage])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="navbar"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0,
            zIndex: 3,
            display: 'flex',
            justifyContent: 'center',
            padding: '10px 24px',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              pointerEvents: 'all',
              width: '100%',
              maxWidth: '900px',
              height: '52px',
              background: '#ffffff',
              borderRadius: '100px',
              border: '1px solid rgba(17,17,16,0.10)',
              boxShadow: '0 2px 24px rgba(17,17,16,0.07)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 12px 0 14px',
            }}
          >
            {/* Logo + greeting */}
            <SRLogoBtn isProjectsPage={isProjectsPage} />

            {/* Nav links */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {navLinks.map((link, i) => (
                <NavLink key={link.label} label={link.label} href={link.href} delay={0.22 + i * 0.07} />
              ))}
            </div>

            {/* Resume */}
            <MagneticBtn href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</MagneticBtn>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}