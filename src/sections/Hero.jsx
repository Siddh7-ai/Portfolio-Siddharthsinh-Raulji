import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const NAV_H = 72

/* ─── Text scramble hook ──────────────────────────────── */
function useScramble(target, startDelay = 0) {
  const [display, setDisplay] = useState(() => target.replace(/\S/g, '·'))
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ&·'
  useEffect(() => {
    let iter = 0, iv
    const timeout = setTimeout(() => {
      iv = setInterval(() => {
        setDisplay(
          target.split('').map((l, i) =>
            i < iter ? l : CHARS[Math.floor(Math.random() * CHARS.length)]
          ).join('')
        )
        iter += 0.5
        if (iter >= target.length) clearInterval(iv)
      }, 38)
    }, startDelay)
    return () => { clearTimeout(timeout); clearInterval(iv) }
  }, [target, startDelay])
  return display
}

/* ─── Marquee ─────────────────────────────────────────── */
function Marquee({ children, duration = 14 }) {
  return (
    <div style={{ overflow: 'hidden', width: '100%', display: 'flex' }}>
      <motion.div
        style={{
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}
        animate={{ x: [0, '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ─── Top-left circle ─────────────────────────────────── */
const TL_R  = 220
const TL_CX = TL_R * 0.55
const TL_CY = NAV_H + TL_R * 0.42

function TopLeftCircle() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.6 }}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, pointerEvents: 'none', overflow: 'visible' }}
    >
      <svg width={TL_R * 2} height={TL_CY + TL_R + 40}
        viewBox={`0 0 ${TL_R * 2} ${TL_CY + TL_R + 40}`} overflow="visible" fill="none">
        <circle cx={TL_CX} cy={TL_CY} r={TL_R}
          stroke="rgba(0,0,0,0.13)" strokeWidth="1" />
        <circle cx={TL_CX} cy={TL_CY} r={TL_R * 0.62}
          stroke="rgba(0,0,0,0.07)" strokeWidth="1" strokeDasharray="4 6" />
      </svg>
    </motion.div>
  )
}

function TopLeftDots() {
  return (
    <>
      {[0, 90, 180, 270].map((deg) => (
        <motion.div key={deg}
          initial={{ opacity: 0, rotate: deg }}
          animate={{ opacity: 1, rotate: deg + 360 }}
          transition={{
            opacity: { duration: 0.01, delay: 0.85 },
            rotate: { duration: 9, repeat: Infinity, ease: 'linear' },
          }}
          style={{
            position: 'absolute', top: TL_CY, left: TL_CX,
            width: 0, height: 0, zIndex: 6, pointerEvents: 'none',
            transformOrigin: '0px 0px',
          }}
        >
          <div style={{
            position: 'absolute', width: 8, height: 8, borderRadius: '50%',
            background: '#111110', opacity: 0.72,
            top: -4, left: TL_R - 4,
          }} />
        </motion.div>
      ))}
    </>
  )
}

/* ─── Bottom-right circle ─────────────────────────────── */
const BR_R = 150

function BottomRightCircle() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 1.0 }}
      style={{
        position: 'absolute',
        bottom: -(BR_R * 0.45),
        right:  -(BR_R * 0.45),
        zIndex: 2,
        pointerEvents: 'none',
        overflow: 'visible',
      }}
    >
      <svg width={BR_R * 2} height={BR_R * 2}
        viewBox={`0 0 ${BR_R * 2} ${BR_R * 2}`} overflow="visible" fill="none">
        <circle cx={BR_R} cy={BR_R} r={BR_R}
          stroke="rgba(0,0,0,0.13)" strokeWidth="1" />
        <circle cx={BR_R} cy={BR_R} r={BR_R * 0.62}
          stroke="rgba(0,0,0,0.07)" strokeWidth="1" strokeDasharray="4 6" />
      </svg>
    </motion.div>
  )
}

function BottomRightDots() {
  const offsetFromEdge = BR_R * 0.55
  return (
    <>
      {[0, 90, 180, 270].map((deg) => (
        <motion.div key={deg}
          initial={{ opacity: 0, rotate: deg }}
          animate={{ opacity: 1, rotate: deg + 360 }}
          transition={{
            opacity: { duration: 0.01, delay: 1.1 },
            rotate: { duration: 7, repeat: Infinity, ease: 'linear' },
          }}
          style={{
            position: 'absolute',
            bottom: offsetFromEdge,
            right:  offsetFromEdge,
            width: 0, height: 0,
            zIndex: 6, pointerEvents: 'none',
            transformOrigin: '0px 0px',
          }}
        >
          <div style={{
            position: 'absolute', width: 7, height: 7, borderRadius: '50%',
            background: '#111110', opacity: 0.65,
            top: -3.5, left: BR_R - 3.5,
          }} />
        </motion.div>
      ))}
    </>
  )
}

/* ─── Scroll down ─────────────────────────────────────── */
function ScrollDown({ fadeOut }) {
  return (
    <motion.div
      className="hero-scroll-down" /* NEW */
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 1.8 }}
      style={{
        position: 'absolute',
        right: BR_R * 0.55 - 36,
        bottom: BR_R * 0.55 - 30,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        pointerEvents: 'none',
        opacity: fadeOut,
      }}
    >
      <span style={{
        fontFamily: '"DM Sans", sans-serif',
        fontSize: '11px',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'rgba(0,0,0,0.4)',
        whiteSpace: 'nowrap',
      }}>
        Scroll down
      </span>
      <motion.span
        style={{ fontSize: '18px', color: 'rgba(0,0,0,0.5)', display: 'block' }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        ↓
      </motion.span>
    </motion.div>
  )
}

/* ─── Freelance text ──────────────────────────────────── */
function FreelanceText({ line1, line2 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.01, delay: 0.9 }}
      style={{
        position: 'absolute',
        top: `${NAV_H + 28}px`,
        left: '38px',
        zIndex: 10,
      }}
    >
      <p style={{
        fontFamily: '"DM Sans", sans-serif',
        fontSize: '15px',
        fontWeight: 300,
        lineHeight: 1.75,
        color: 'rgba(0,0,0,0.55)',
        letterSpacing: '0.01em',
      }}>
        {line1}<br />{line2}
      </p>
    </motion.div>
  )
}

/* ─── Name style ──────────────────────────────────────── */
const NAME_STYLE = {
  fontFamily: '"Bebas Neue", cursive',
  fontSize: 'clamp(348px, 48vh, 732px)',
  lineHeight: 1,
  letterSpacing: '-0.01em',
  color: '#111110',
  display: 'inline-block',
}

function NameGap() {
  return (
    <span style={{
      display: 'inline-block',
      width: 'clamp(30px, 4vw, 80px)',
      flexShrink: 0,
    }} />
  )
}

export default function Hero() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const nameY        = useTransform(scrollYProgress, [0, 1], ['0%', '-16%'])
  const photoY       = useTransform(scrollYProgress, [0, 1], [0, -40])
  const fadeOut      = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const photoOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const photoScale   = useTransform(scrollYProgress, [0, 0.55], [1, 0.88])

  const line1 = useScramble('Designer &', 900)
  const line2 = useScramble('Full-Stack Web Developer', 1100)

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        background: '#e8e6e1',
      }}
    >
      {/* Inner clip layer — contains circles, marquee, text but NOT the photo */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
      }}>

      {/* ── TOP-LEFT circle ── */}
      <div className="hero-corner-tl-wrapper" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <TopLeftCircle />
        <TopLeftDots />
      </div>

      {/* ── BOTTOM-RIGHT circle ── */}
      <div className="hero-corner-br-wrapper" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <BottomRightCircle />
        <BottomRightDots />
      </div>

      {/* ── FREELANCE TEXT — zIndex 10, above name, below photo ── */}
      <div className="hero-freelance" style={{ position: 'relative', zIndex: 10 }}>
        <FreelanceText line1={line1} line2={line2} />
      </div>

      {/* ── SCROLL DOWN ── */}
      <ScrollDown fadeOut={fadeOut} />

      {/* ── BIG NAME MARQUEE — zIndex 1, sits behind photo ── */}
      <motion.div
        style={{
          position: 'absolute',
          top: '56%',
          left: 0,
          right: 0,
          zIndex: 1,
          translateY: '-50%',
          y: nameY,
          opacity: fadeOut,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <Marquee duration={14}>
            <span className="hero-marquee" style={NAME_STYLE}>RAULJI</span>
            <div className="hero-marquee-gap" style={{ display: 'contents' }}><NameGap /></div>
            <span className="hero-marquee" style={NAME_STYLE}>SIDDHARTHSINH</span>
            <div className="hero-marquee-gap" style={{ display: 'contents' }}><NameGap /></div>
          </Marquee>
        </motion.div>
      </motion.div>

      </div>{/* end inner clip layer */}

      {/* ── PHOTO — outside overflow:hidden, zIndex 5 beats Navbar zIndex 4 ── */}
      <motion.div
        className="hero-photo-container"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          translateX: '-50%',
          width: 'clamp(260px, 38vw, 520px)',
          height: '100%',
          zIndex: 5,
          pointerEvents: 'none',
          y: photoY,
          opacity: photoOpacity,
          scale: photoScale,
        }}
        initial={{ opacity: 0, y: 40, scale: 1.04 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
      >
        <img
          className="hero-photo"
          src="/photo.png"
          alt="Siddharthsinh Raulji"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
            mixBlendMode: 'multiply',
          }}
        />
      </motion.div>

    </section>
  )
}