import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

// ── SR Logo — exact same as Navbar ───────────────────────────────────────────
function SRLogo({ color = '#111110', size = 34 }) {
  return (
    <svg
      viewBox="0 0 130 130"
      width={size}
      height={size}
      fill="none"
      style={{ flexShrink: 0, display: 'block' }}
    >
      <path
        d="M58 22 A28 22 0 0 0 14 44 A28 22 0 0 1 58 66 A28 22 0 0 1 14 88"
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <line x1="74" y1="22" x2="74" y2="110" stroke={color} strokeWidth="8" strokeLinecap="round" />
      <path
        d="M74 22 Q104 22 104 44 Q104 66 74 66"
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <line x1="74" y1="66" x2="104" y2="110" stroke={color} strokeWidth="8" strokeLinecap="round" />
    </svg>
  )
}

// ── Typing effect hook — type once, no erase ─────────────────────────────────
function useTypingEffect(text, { started = false, speed = 11 } = {}) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!started && !done) {
      setDisplayed('')
      setDone(false)
    }
  }, [started, done])

  useEffect(() => {
    if (!started || done) return
    if (displayed.length < text.length) {
      const t = setTimeout(
        () => setDisplayed(text.slice(0, displayed.length + 1)),
        speed
      )
      return () => clearTimeout(t)
    } else {
      setDone(true)
    }
  }, [started, done, displayed, text, speed])

  return { displayed, done }
}

// ── Hanging ID Card ──────────────────────────────────────────────────────────
function IDCard({ inView }) {
  const [dragging, setDragging] = useState(false)
  const draggingRef = useRef(false)

  const pullX = useMotionValue(0)
  const pullY = useMotionValue(0)
  const springX = useSpring(pullX, { stiffness: 160, damping: 26, mass: 1.1 })
  const springY = useSpring(pullY, { stiffness: 160, damping: 26, mass: 1.1 })
  const rotate  = useMotionValue(0)
  const smoothRotate = useSpring(rotate, { stiffness: 140, damping: 24, mass: 1.0 })

  const [cardX, setCardX] = useState(0)
  const [cardY, setCardY] = useState(0)
  useEffect(() => springX.on('change', v => setCardX(v)), [springX])
  useEffect(() => springY.on('change', v => setCardY(v)), [springY])

  /* Reset everything when leaving view */
  useEffect(() => {
    if (!inView) {
      draggingRef.current = false
      setDragging(false)
      pullX.jump(0); pullY.jump(0)
      springX.jump(0); springY.jump(0)
      rotate.jump(0); smoothRotate.jump(0)
    }
  }, [inView, pullX, pullY, springX, springY, rotate, smoothRotate])

  const dragStartX = useRef(0)
  const dragStartY = useRef(0)

  const onPointerDown = (e) => {
    draggingRef.current = true; setDragging(true)
    dragStartX.current = e.clientX
    dragStartY.current = e.clientY
    e.currentTarget.setPointerCapture(e.pointerId)

    const onMove = (ev) => {
      if (!draggingRef.current) return
      const dx = ev.clientX - dragStartX.current
      const dy = ev.clientY - dragStartY.current
      pullX.set(dx * 0.75)
      pullY.set(dy * 0.85)
      rotate.set(dx * 0.12)
    }
    const onUp = () => {
      draggingRef.current = false; setDragging(false)
      pullX.set(0); pullY.set(0); rotate.set(0)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  /* Strap SVG — curved bezier from anchor (top) to card clip position */
  const BASE_STRAP = 150
  const ax = 0           // anchor x relative to card center
  const ay = 0           // anchor y = top
  const ex = cardX       // card end x (follows spring)
  const ey = BASE_STRAP + cardY  // card end y (follows spring)
  const cpx = ex * 0.35  // control point curves naturally
  const cpy = ay + (ey - ay) * 0.6

  return (
    <div style={{
      position: 'absolute', right: '24%', top: 0,
      width: '30px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      zIndex: 20, userSelect: 'none',
    }}>

      {/* Dynamic strap — follows card in all directions */}
      <svg
        overflow="visible"
        style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          overflow: 'visible', pointerEvents: 'none', zIndex: 21,
          width: '1px', height: '1px',
        }}
      >
        <defs>
          <pattern id="weave" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <rect width="8" height="4" fill="rgba(255,255,255,0.22)" />
            <rect y="4" width="8" height="4" fill="rgba(255,255,255,0.07)" />
          </pattern>
        </defs>
        {/* Shadow */}
        <path
          d={`M ${ax+1} ${ay+2} Q ${cpx+1} ${cpy+2} ${ex+1} ${ey+2}`}
          fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth="11" strokeLinecap="round"
        />
        {/* Strap body */}
        <path
          d={`M ${ax} ${ay} Q ${cpx} ${cpy} ${ex} ${ey}`}
          fill="none" stroke="url(#weave)" strokeWidth="10" strokeLinecap="round"
        />
        {/* Highlight */}
        <path
          d={`M ${ax} ${ay} Q ${cpx} ${cpy} ${ex} ${ey}`}
          fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="3" strokeLinecap="round"
        />
        {/* SR label at midpoint */}
        <text
          x={(ax + ex) / 2} y={(ay + ey) / 2 - 6}
          textAnchor="middle"
          fontFamily='"Bebas Neue", cursive'
          fontSize="9" letterSpacing="1"
          fill="rgba(255,255,255,0.45)"
        >SR</text>
      </svg>

      {/* Spacer pushes card down to BASE_STRAP */}
      <div style={{ height: BASE_STRAP }} />

      {/* Pure CSS gentle sway — no JS, no RAF, no state, zero interference */}
      <div style={{
        animation: dragging ? 'none' : 'idCardSway 4s ease-in-out infinite',
        transformOrigin: 'top center',
      }}>

      {/* Card — moves freely in all directions */}
      <motion.div
        style={{
          rotate: smoothRotate, y: springY, x: springX,
          transformOrigin: 'top center',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          cursor: dragging ? 'grabbing' : 'grab',
        }}
        onPointerDown={onPointerDown}
      >
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          {/* Metal clip */}
          <div style={{
            width: 24, height: 30, borderRadius: '5px 5px 0 0',
            border: '2.5px solid rgba(255,255,255,0.45)', borderBottom: 'none',
            position: 'relative', flexShrink: 0, marginBottom: -2,
          }}>
            <div style={{
              position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)',
              width: 8, height: 10, border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 2,
            }} />
          </div>

          {/* Card body */}
          <div style={{
            width: 240, background: '#f0eeea', borderRadius: 16, overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.5)',
            display: 'flex', flexDirection: 'column', position: 'relative',
          }}>
            {/* Header */}
            <div style={{
              background: '#111110', padding: '14px 16px 12px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', right: -20, top: -20, width: 80, height: 80, background: 'rgba(255,255,255,0.06)', borderRadius: '0 0 0 60px', transform: 'rotate(15deg)' }} />
              <div style={{ position: 'absolute', right: 20, bottom: -10, width: 40, height: 40, background: 'rgba(255,255,255,0.04)', borderRadius: 4, transform: 'rotate(20deg)' }} />
              <div style={{ width: 44, height: 36, background: '#fff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1, padding: '3px', boxSizing: 'border-box' }}>
                <SRLogo color="#111110" size={30} />
              </div>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#0a0a09', border: '2px solid rgba(255,255,255,0.15)', zIndex: 1 }} />
            </div>

            {/* Photo */}
            <div style={{ width: '100%', height: 220, background: 'linear-gradient(135deg, #1a1a18 0%, #2a2a28 100%)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: -20, left: -20, width: 120, height: 120, background: 'rgba(255,255,255,0.05)', transform: 'rotate(20deg)' }} />
              <div style={{ position: 'absolute', top: -10, right: -10, width: 80, height: 80, background: 'rgba(255,255,255,0.04)', borderRadius: '0 0 0 40px', transform: 'rotate(-10deg)' }} />
              <img src="/photo.png" alt="Siddharthsinh" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }} />
            </div>

            {/* Details */}
            <div style={{ background: '#f0eeea', padding: '14px 16px 16px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: 60, height: 60, background: 'rgba(17,17,16,0.06)', clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
              <div style={{ fontFamily: '"Bebas Neue", cursive', fontSize: 20, letterSpacing: '0.06em', color: '#111110', lineHeight: 1.1, marginBottom: 3 }}>SIDDHARTHSINH RAULJI</div>
              <div style={{ fontFamily: '"DM Mono", monospace', fontSize: 8, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(17,17,16,0.45)', marginBottom: 12 }}>Full-Stack Dev · Cyber Security</div>
              <div style={{ height: 1, background: 'rgba(17,17,16,0.1)', marginBottom: 10 }} />
              {[
                { label: 'ID',       value: '2202101024',green: true     },
                { label: 'EMAIL',    value: 'siddharthraulji5@gmail.com' },
                { label: 'LOCATION', value: 'Vadodara, Gujarat'          },
                { label: 'STATUS',   value: 'Available · Freelance'      },
              ].map(({ label, value, green }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 7, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(17,17,16,0.35)' }}>{label}</span>
                  <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 8, color: green ? '#16a34a' : 'rgba(17,17,16,0.75)', letterSpacing: '0.04em', fontWeight: green ? 600 : 400 }}>{value}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, display: 'flex', gap: 2, alignItems: 'flex-end', justifyContent: 'center' }}>
                {[3,1,4,1,5,2,3,1,2,4,2,1,3,2,1,4,1,2].map((w, i) => (
                  <div key={i} style={{ width: w * 1.6, height: 14 + (i % 5) * 2, background: `rgba(17,17,16,${0.12 + (i % 3) * 0.07})`, borderRadius: 1, flexShrink: 0 }} />
                ))}
              </div>
              <div style={{ fontFamily: '"DM Mono", monospace', fontSize: 7, letterSpacing: '0.2em', color: 'rgba(17,17,16,0.2)', textAlign: 'center', marginTop: 4 }}>SR · PORTFOLIO · 2025</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      </div>{/* end CSS sway wrapper */}

    </div>
  )
}
// ── Bio text ──────────────────────────────────────────────────────────────────
const BIO_TEXT = `"Siddharthsinh Raulji is a passionate Full-Stack Developer & Security Enthusiast, known for his technical depth and design sensibility. With a drive for crafting visually stunning and highly functional digital experiences, Siddharthsinh combines modern web development with cybersecurity knowledge to build products that are both beautiful and secure. Whether it's architecting scalable backends, designing sharp interfaces, or hardening systems — his dedication to excellence and innovation shines through in every project he undertakes."`

// ── Main About Section ────────────────────────────────────────────────────────
export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })



  const [typingStarted, setTypingStarted] = useState(false)
  useEffect(() => {
    if (inView && !typingStarted) {
      const t = setTimeout(() => setTypingStarted(true), 700)
      return () => clearTimeout(t)
    }
  }, [inView, typingStarted])

  const { displayed, done } = useTypingEffect(BIO_TEXT, { started: typingStarted, speed: 3 })

  return (
    <>
      {/* CSS for cursor blink — avoids framer-motion steps() easing entirely */}
      <style>{`
        @keyframes _cur_blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        ._typing_cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: rgba(255,255,255,0.7);
          margin-left: 2px;
          vertical-align: text-bottom;
          border-radius: 1px;
          animation: _cur_blink 0.7s infinite;
        }
        @keyframes idCardSway {
          0%   { transform: rotate(0deg); }
          25%  { transform: rotate(1.8deg); }
          75%  { transform: rotate(-1.8deg); }
          100% { transform: rotate(0deg); }
        }
      `}
          display: inline-block;
          width: 2px;
          height: 1em;
          background: rgba(255,255,255,0.7);
          margin-left: 2px;
          vertical-align: text-bottom;
          border-radius: 1px;
          animation: _cur_blink 0.7s infinite;
      </style>

      <section
        id="about"
        ref={ref}
        style={{
          height: '100vh',
          background: '#0a0a09',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <IDCard inView={inView} />

        {/* /ABOUT heading */}
        <div style={{ overflow: 'hidden', flexShrink: 0, lineHeight: 0 }}>
          <motion.div
            initial={{ y: '105%' }}
            animate={inView ? { y: '0%' } : { y: '105%' }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0 }}
            style={{
              fontFamily: '"Bebas Neue", cursive',
              fontSize: 'clamp(80px, 20vw, 320px)',
              lineHeight: 0.9, letterSpacing: '0.01em',
              color: '#ffffff', whiteSpace: 'nowrap',
              paddingTop: '18px', paddingLeft: '40px', display: 'block',
            }}
          >/ABOUT</motion.div>
        </div>

        {/* Arrow + Bio */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center',
          padding: '0 48px 24px 40px', gap: 0, minHeight: 0, overflow: 'hidden',
        }}>
          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
          >
            <span style={{
              fontFamily: '"Bebas Neue", cursive',
              fontSize: 'clamp(120px, 20vw, 340px)',
              lineHeight: 1, color: 'rgba(255,255,255,0.14)',
              display: 'block', userSelect: 'none', letterSpacing: '-0.02em',
            }}>↗</span>
          </motion.div>

          {/* Bio */}
          <div style={{ paddingTop: '0px', paddingLeft: '40px' }}>

            {/* Typing bio */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 'clamp(13px, 1.1vw, 16px)',
                fontWeight: 400, lineHeight: 1.75,
                color: 'rgba(255,255,255,0.62)',
                marginBottom: '28px', maxWidth: '500px', minHeight: '8em',
              }}
            >
              {displayed}
              {/* Pure CSS blink — no framer-motion easing, no crash */}
              {!done && <span className="_typing_cursor" />}
            </motion.p>

            {/* Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.45 }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}
            >
              <motion.span
                animate={{ opacity: [1, 0.1, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#4ade80', flexShrink: 0, display: 'inline-block',
                }}
              />
              <span style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: '10px', letterSpacing: '0.16em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)',
              }}>
                Currently available for freelance &amp; full-time · Vadodara, Gujarat
              </span>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
              style={{ display: 'flex', gap: '40px' }}
            >
              {[
                { num: '15+',  label: 'Projects'  },
                { num: '10+',  label: 'Hackathon' },
                { num: '100%', label: 'Dedicated' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{
                    fontFamily: '"Bebas Neue", cursive', fontSize: '38px',
                    lineHeight: 1, color: '#fff', letterSpacing: '0.01em',
                  }}>{s.num}</div>
                  <div style={{
                    fontFamily: '"DM Mono", monospace', fontSize: '9px',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.22)', marginTop: 5,
                  }}>{s.label}</div>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}