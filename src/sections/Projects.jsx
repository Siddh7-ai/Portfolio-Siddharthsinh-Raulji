import { useRef, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion'
import { useLoader } from '../context/LoaderContext'

const projects = [
  {
    number: '01',
    title: 'PhishGuard AI',
    category: 'Full Stack · Security · ML Model',
    desc: 'AI-powered phishing detection system identifying malicious URLs in real time, integrated with a browser extension to deliver instant alerts and improve browsing safety.',
    tags: ['React', 'JavaScript', 'Python', 'Machine Learning', 'Browser Extension'],
    imageUrl: '/projects/project-01.png',
    liveUrl: 'https://phish-guard-ai-lac.vercel.app/',
    gitHubUrl: 'https://github.com/Siddh7-ai/PhishGuardAi',
  },

  {
    number: '02',
    title: 'AxCrypt',
    category: 'Cybersecurity · Python',
    desc: 'Developed a secure file encryption system with time-based access control and automatic re-encryption, ensuring controlled and confidential file sharing.',
    tags: ['Python', 'Cryptography', 'File Encryption'],
    imageUrl: '/projects/project-02.png',
    gitHubUrl: 'https://github.com/Siddh7-ai/AxCrypt',
  },

  {
    number: '03',
    title: 'EduLearn',
    category: 'EdTech · AI-Based Learning Platform',
    desc: 'AI-driven learning platform that personalizes study content based on student performance, delivering smart recommendations and progress tracking for improved outcomes.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    imageUrl: '/projects/project-03.png',
    gitHubUrl: 'https://github.com/Siddh7-ai/EduLearn',
  },

  {
    number: '04',
    title: 'ShieldNet',
    category: 'Security · Network Protection',
    desc: 'AI-powered WiFi security scanner that detects vulnerabilities in networks and connected devices, providing security scores and actionable insights for safer home networks.',
    tags: ['Python', 'Flask', 'WiFi Security', 'Network Scanner', 'Cybersecurity', 'REST API'],
    imageUrl: '/projects/project-04.png',
    gitHubUrl: 'https://github.com/Siddh7-ai/ShieldNet',
  },

  {
    number: '05',
    title: 'CoreInventory',
    category: 'Full Stack · Inventory Management',
    desc: 'Role-based inventory management system with real-time tracking of products, deliveries, and stock operations, designed to streamline warehouse workflows.',
    tags: ['React', 'Node.js', 'Prisma', 'Tailwind'],
    imageUrl: '/projects/project-05.png',
    gitHubUrl: 'https://github.com/Siddh7-ai/CoreInventory/tree/frontend',
  },
];

const PIN_COLORS = ['#e74c3c', '#f39c12', '#3498db', '#2ecc71', '#9b59b6']

const POLAROID_LAYOUT = [
  { rotate: -6,  x: -400, y: 20  },
  { rotate:  3,  x: -185, y: -15 },
  { rotate: -2,  x:    5, y: 25  },
  { rotate:  7,  x:  215, y: -10 },
  { rotate: -4,  x:  405, y: 20  },
]

const MOBILE_POLAROID_LAYOUT = [
  { rotate: -5, x: -115, y: -190 },
  { rotate:  4, x:  115, y: -170 },
  { rotate: -3, x: -220, y:  40 },
  { rotate: -1, x:    0, y:  60 },
  { rotate:  5, x:  220, y:  30 },
]

function Polaroid({ project, layout, pinColor, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      onClick={() => onClick(project)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 80, rotate: layout.rotate }}
      animate={{
        opacity: 1,
        y: hovered ? layout.y - 18 : layout.y,
        x: layout.x,
        rotate: hovered ? 0 : layout.rotate,
        scale: hovered ? 1.08 : 1,
        zIndex: hovered ? 50 : 10,
      }}
      transition={{ type: 'spring', stiffness: 150, damping: 24, mass: 1.1 }}
      style={{ position: 'absolute', cursor: 'pointer', transformOrigin: 'top center', willChange: 'transform' }}
    >
      <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', width: 14, height: 14, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, ${pinColor}, ${pinColor}cc)`, border: `1px solid ${pinColor}88`, boxShadow: '0 2px 6px rgba(0,0,0,0.6)', zIndex: 10 }} />
      <div style={{ background: '#f5f0e4', padding: '10px 10px 50px 10px', borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.4)', width: 210, border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ width: '100%', height: 175, overflow: 'hidden', borderRadius: 1, background: '#111', position: 'relative' }}>
          <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85) contrast(1.1) sepia(0.15)', transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
          <div style={{ position: 'absolute', top: 6, left: 8, fontFamily: "'Bebas Neue', cursive", fontSize: 36, lineHeight: 1, color: 'rgba(255,255,255,0.25)', userSelect: 'none' }}>{project.number}</div>
        </div>
        <div style={{ padding: '10px 4px 0' }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 7, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(17,17,17,0.4)', marginBottom: 3 }}>{project.category}</p>
          <p style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 18, color: '#111', lineHeight: 1.1, letterSpacing: '0.04em' }}>{project.title}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 6 }}>
            {project.tags.slice(0, 2).map(t => (
              <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: 6, padding: '2px 5px', border: '1px solid rgba(17,17,17,0.18)', color: '#333', borderRadius: 10 }}>{t}</span>
            ))}
          </div>
          {project.liveUrl && (
            <div style={{ marginTop: 10 }}>
              <button 
                onClick={(e) => { e.stopPropagation(); window.open(project.liveUrl, '_blank'); }}
                style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, fontWeight: 'bold', padding: '6px 10px', background: '#111', color: '#f5f0e4', borderRadius: 4, cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                LIVE DEMO <svg width={8} height={8} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function PolaroidWall({ onExpand }) {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="projects-wall-container" style={{ position: 'absolute', bottom: '12%', left: '50%', transform: 'translateX(-50%)', width: '90vw', maxWidth: 1100, height: 380, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {projects.map((project, i) => {
        const layoutConfig = isMobile ? MOBILE_POLAROID_LAYOUT[i] || POLAROID_LAYOUT[i] : POLAROID_LAYOUT[i]
        return (
          <Polaroid key={project.number} project={project} layout={layoutConfig} pinColor={PIN_COLORS[i % PIN_COLORS.length]} onClick={onExpand} />
        )
      })}
    </div>
  )
}

// Pendant ceiling light — hangs from top center, shines warm rays downward onto cards
function PendantLight({ glowing }) {
  return (
    <>
      {glowing && (
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}
        >
          <defs>
            <linearGradient id="coneGrad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="rgba(255,200,70,0.20)" />
              <stop offset="40%"  stopColor="rgba(220,160,40,0.14)" />
              <stop offset="100%" stopColor="rgba(180,120,20,0)" />
            </linearGradient>
            <linearGradient id="coneGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="rgba(255,215,90,0.22)" />
              <stop offset="50%"  stopColor="rgba(220,170,50,0.08)" />
              <stop offset="100%" stopColor="rgba(180,130,20,0)" />
            </linearGradient>
            <linearGradient id="coneGrad3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="rgba(255,225,100,0.28)" />
              <stop offset="35%"  stopColor="rgba(240,180,60,0.12)" />
              <stop offset="100%" stopColor="rgba(200,140,30,0)" />
            </linearGradient>
          </defs>
          <polygon points="720,108  70,720  1370,720"  fill="url(#coneGrad1)" />
          <polygon points="720,108 260,720  1180,720"  fill="url(#coneGrad2)" opacity="0.5" />
          <polygon points="720,108 500,720   940,720"  fill="url(#coneGrad3)" opacity="0.4" />
          <polygon points="720,108 640,720   800,720"  fill="rgba(255,235,120,0.08)" />
        </svg>
      )}

      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 30, pointerEvents: 'none', width: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 30, height: 10, background: 'linear-gradient(180deg, #1a1a1a, #2e2e2e)', borderRadius: '0 0 4px 4px', border: '1px solid #333', flexShrink: 0 }} />
        <div style={{ width: 2, height: 50, background: 'linear-gradient(180deg, #2a2a2a, #555)', flexShrink: 0 }} />
        <svg width="130" height="85" viewBox="0 0 130 85" style={{ flexShrink: 0, overflow: 'visible' }}>
          <defs>
            <linearGradient id="shadeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c8c3ba" />
              <stop offset="60%" stopColor="#a8a39a" />
              <stop offset="100%" stopColor="#787370" />
            </linearGradient>
            <linearGradient id="shadeInner" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a2520" />
              <stop offset="100%" stopColor="#0e0c0a" />
            </linearGradient>
            <linearGradient id="woodGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9B7520" />
              <stop offset="50%" stopColor="#B08828" />
              <stop offset="100%" stopColor="#7A5E14" />
            </linearGradient>
          </defs>
          <polygon points="52,10 78,10 118,65 12,65" fill="url(#shadeGrad)" />
          <polygon points="54,12 76,12 116,63 14,63" fill="url(#shadeInner)" />
          <ellipse cx="65" cy="64" rx="53" ry="5.5" fill="#6a6560" />
          <ellipse cx="65" cy="62" rx="51" ry="4.5" fill="#0e0c0a" />
          <rect x="49" y="5" width="32" height="8" rx="3" fill="url(#woodGrad)" />
          <ellipse cx="65" cy="5"  rx="16" ry="4.5" fill="#C09030" />
          <ellipse cx="65" cy="13" rx="16" ry="4"   fill="url(#woodGrad)" />
          {glowing && (
            <>
              <ellipse cx="65" cy="62" rx="44" ry="4"   fill="rgba(255,200,80,0.65)" />
              <ellipse cx="65" cy="61" rx="28" ry="2.5" fill="rgba(255,230,130,0.90)" />
            </>
          )}
        </svg>
      </div>
    </>
  )
}

const SEGS = 20, SEG_REST = 9, GRAVITY = 0.42, DAMPING = 0.80, ITERS = 8
const BASE_H = SEGS * SEG_REST, SHORT_H = BASE_H * 0.55

function initPoints(totalH) {
  return Array.from({ length: SEGS + 1 }, (_, i) => ({ x: 0, y: (i / SEGS) * totalH, px: 0, py: (i / SEGS) * totalH, pinned: i === 0 }))
}

function buildSmoothPath(pts) {
  if (!pts || pts.length < 2) return ''
  let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = ((pts[i].x + pts[i + 1].x) / 2).toFixed(2)
    const my = ((pts[i].y + pts[i + 1].y) / 2).toFixed(2)
    d += ` Q ${pts[i].x.toFixed(2)} ${pts[i].y.toFixed(2)} ${mx} ${my}`
  }
  d += ` L ${pts[pts.length - 1].x.toFixed(2)} ${pts[pts.length - 1].y.toFixed(2)}`
  return d
}

function HangingString({ pullY, isPulled, onToggleLight }) {
  const ptsRef    = useRef(initPoints(BASE_H))
  const rafRef    = useRef(null)
  const idleRaf   = useRef(null)
  const pathRef   = useRef(null)
  const shadowRef = useRef(null)
  const knobRef   = useRef(null)
  const dragging  = useRef(false)
  const startX    = useRef(0), startY = useRef(0)
  const startValX = useRef(0), startValY = useRef(0)
  const isPulledRef = useRef(isPulled)
  const pullX = useMotionValue(0)
  const [svgH, setSvgH] = useState(BASE_H + 60)

  useEffect(() => { isPulledRef.current = isPulled }, [isPulled])

  const tick = useCallback(() => {
    const pts = ptsRef.current
    const py = pullY.get(), px = pullX.get()
    const restLen = isPulledRef.current ? SHORT_H : BASE_H
    const targetY = restLen + py, targetX = px
    for (const p of pts) {
      if (p.pinned) continue
      const vx = (p.x - p.px) * DAMPING, vy = (p.y - p.py) * DAMPING
      p.px = p.x; p.py = p.y; p.x += vx; p.y += vy + GRAVITY
    }
    const tail = pts[pts.length - 1]
    const pullStrength = py > 0 ? 0.4 : 0.28
    tail.x += (targetX - tail.x) * 0.3
    tail.y += (targetY - tail.y) * pullStrength
    tail.px = tail.x; tail.py = tail.y
    for (let iter = 0; iter < ITERS; iter++) {
      pts[0].x = 0; pts[0].y = 0; pts[0].px = 0; pts[0].py = 0
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i], b = pts[i + 1]
        const dx = b.x - a.x, dy = b.y - a.y
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.001
        const diff = (dist - SEG_REST) / dist * 0.5
        if (!a.pinned) { a.x += dx * diff; a.y += dy * diff }
        b.x -= dx * diff; b.y -= dy * diff
      }
      tail.x += (targetX - tail.x) * 0.15
      tail.y += (targetY - tail.y) * 0.15
    }
    const maxY = Math.max(...pts.map(p => p.y))
    const newH = Math.max(BASE_H + 60, maxY + 60)
    if (Math.abs(newH - svgH) > 2) setSvgH(newH)
    const d = buildSmoothPath(pts)
    if (pathRef.current) pathRef.current.setAttribute('d', d)
    if (shadowRef.current) shadowRef.current.setAttribute('d', d)
    if (knobRef.current) knobRef.current.style.transform = `translate(calc(-50% + ${tail.x.toFixed(1)}px), ${tail.y.toFixed(1)}px)`
    rafRef.current = requestAnimationFrame(tick)
  }, [pullY, pullX])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [tick])

  useEffect(() => {
    if (isPulled) { cancelAnimationFrame(idleRaf.current); ptsRef.current = initPoints(SHORT_H); return }
    let t = 0
    const sway = () => {
      t += 0.010
      const pts = ptsRef.current
      pts[Math.floor(pts.length * 0.35)].x += Math.sin(t * 0.9) * 0.35
      pts[Math.floor(pts.length * 0.65)].x += Math.sin(t * 1.1 + 1) * 0.28
      idleRaf.current = requestAnimationFrame(sway)
    }
    idleRaf.current = requestAnimationFrame(sway)
    return () => cancelAnimationFrame(idleRaf.current)
  }, [isPulled])

  const onPointerMove = useCallback((e) => {
    if (!dragging.current) return
    e.preventDefault()
    pullY.set(Math.max(-100, Math.min(300, startValY.current + (e.clientY - startY.current))))
    pullX.set(Math.max(-200, Math.min(200, startValX.current + (e.clientX - startX.current))))
  }, [pullY, pullX])

  const onPointerUp = useCallback(() => {
    if (!dragging.current) return
    dragging.current = false
    animate(pullY, 0, { type: 'spring', stiffness: 140, damping: 10, mass: 1.3 })
    animate(pullX, 0, { type: 'spring', stiffness: 140, damping: 10, mass: 1.3 })
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
  }, [pullY, pullX, onPointerMove])

  const onPointerDown = useCallback((e) => {
    e.preventDefault(); e.stopPropagation()
    dragging.current = true
    startY.current = e.clientY; startX.current = e.clientX
    startValY.current = pullY.get(); startValX.current = pullX.get()
    window.addEventListener('pointermove', onPointerMove, { passive: false })
    window.addEventListener('pointerup', onPointerUp)
  }, [pullY, pullX, onPointerMove, onPointerUp])

  return (
    <div className="projects-pull-string" style={{ position: 'absolute', top: 0, right: 250, width: 50, zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: 24, height: 12, background: 'linear-gradient(180deg, #2e2010, #1a1208)', borderRadius: '5px 5px 2px 2px', border: '1px solid #3e2e18', boxShadow: '0 4px 12px rgba(0,0,0,0.95)', flexShrink: 0, zIndex: 2 }} />
      <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #9a8060, #2a1a0a)', border: '1px solid #6a5030', marginTop: -3, zIndex: 3, flexShrink: 0 }} />
      <div style={{ position: 'relative', width: 60, flexShrink: 0 }}>
        <svg viewBox={`-30 0 60 ${svgH}`} width={60} height={svgH} style={{ display: 'block', overflow: 'visible' }}>
          <defs>
            <linearGradient id="ropeGradH" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1a0e06" /><stop offset="30%" stopColor="#7a5c38" /><stop offset="55%" stopColor="#9a7a50" /><stop offset="80%" stopColor="#5a4028" /><stop offset="100%" stopColor="#1a0e06" />
            </linearGradient>
          </defs>
          <path ref={shadowRef} stroke="rgba(0,0,0,0.55)" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'translate(2px, 3px)' }} />
          <path stroke="rgba(255,220,160,0.07)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'translate(-0.8px, 0)' }}
            ref={el => { if (el && pathRef.current) { const obs = new MutationObserver(() => el.setAttribute('d', pathRef.current.getAttribute('d') || '')); obs.observe(pathRef.current, { attributes: true, attributeFilter: ['d'] }) } }} />
          <path ref={pathRef} stroke="url(#ropeGradH)" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div
          ref={knobRef}
          onPointerDown={onPointerDown}
          onClick={isPulled ? onToggleLight : undefined}
          style={{
            position: 'absolute', top: 0, left: '50%',
            width: 40, height: 40, borderRadius: '50%',
            background: 'radial-gradient(circle at 33% 28%, #7a6048, #18100a)',
            border: '2px solid #5a3e22',
            boxShadow: '0 8px 24px rgba(0,0,0,0.98), inset 0 1px 5px rgba(255,200,120,0.13)',
            cursor: isPulled ? 'pointer' : 'grab',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 101, touchAction: 'none', userSelect: 'none',
            willChange: 'transform',
            transform: `translate(-50%, ${BASE_H}px)`,
          }}
        >
          <div style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(140,100,55,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', border: '1px solid rgba(160,120,70,0.3)' }} />
          </div>
        </div>
      </div>
      {!isPulled && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 0.7, 0.35, 0.7] }} transition={{ duration: 2.8, repeat: Infinity, delay: 1.5 }}
          style={{ position: 'absolute', top: BASE_H + 70, fontFamily: "'DM Mono', monospace", fontSize: 13, color: 'rgba(255,220,150,0.55)', letterSpacing: '0.14em', textTransform: 'uppercase', whiteSpace: 'nowrap', userSelect: 'none', pointerEvents: 'none' }}>
          ↓ PULL
        </motion.div>
      )}
      {isPulled && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 0.6, 0.3, 0.6] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          style={{ position: 'absolute', top: BASE_H + 10, fontFamily: "'DM Mono', monospace", fontSize: 8, color: 'rgba(255,220,150,0.45)', letterSpacing: '0.14em', textTransform: 'uppercase', whiteSpace: 'nowrap', userSelect: 'none', pointerEvents: 'none' }}>
          ↑ CLICK
        </motion.div>
      )}
    </div>
  )
}

function WorkVaultHeading({ revealed }) {
  return (
    <motion.div
      className="work-vault-heading"
      initial={{ opacity: 0, y: 50, scale: 0.94 }}
      animate={revealed ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.94 }}
      transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'absolute', top: '8%', left: '6%', zIndex: 10, maxWidth: '44%' }}
    >
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 'clamp(16px, 1vw, 11px)', letterSpacing: '0.11em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.4em' }}>
        Work
      </p>
      <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(64px, 9.5vw, 136px)', lineHeight: 0.85, color: '#ffffff', letterSpacing: '0.01em', margin: 0 }}>
        VAULT
      </h2>
      <motion.div
        initial={{ width: 0 }}
        animate={revealed ? { width: 'clamp(40px, 5vw, 72px)' } : { width: 0 }}
        transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{ height: 3, background: '#252422', borderRadius: 2, marginTop: '0.5em', marginLeft: '8px' }}
      />
    </motion.div>
  )
}

function Content({ revealed, expanded, setExpanded, isLightOn }) {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      <WorkVaultHeading revealed={revealed} />

      <AnimatePresence>
        {revealed && (
          <motion.div key="pendant" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <PendantLight glowing={isLightOn} />
          </motion.div>
        )}
      </AnimatePresence>

      {revealed && <PolaroidWall onExpand={setExpanded} />}

      <AnimatePresence>
        {expanded && (
          <motion.div onClick={() => setExpanded(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(10px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <motion.div initial={{ scale: 0.88, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                background: '#f0ebd8', 
                padding: isMobile ? 24 : 40, 
                borderRadius: 8, 
                maxWidth: isMobile ? 420 : 600, 
                width: isMobile ? '82%' : '90%' 
              }}
              onClick={e => e.stopPropagation()}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: 'rgba(17,17,17,0.4)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>PROJECT {expanded.number} — {expanded.year}</p>
              <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: isMobile ? 36 : 48, color: '#111', lineHeight: 1 }}>{expanded.title}</h2>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'rgba(17,17,17,0.45)', marginTop: 4, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{expanded.category}</p>
              <img src={expanded.imageUrl} alt={expanded.title} style={{ width: '100%', height: isMobile ? 160 : 200, objectFit: 'cover', borderRadius: 4, marginTop: 16, filter: 'brightness(0.9) contrast(1.1) sepia(0.1)' }} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#555', marginTop: 14, lineHeight: 1.75, fontSize: isMobile ? 12 : 14 }}>{expanded.desc}</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 20 }}>
                {expanded.tags.map(t => <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: '4px 10px', border: '1px solid rgba(17,17,17,0.22)', borderRadius: 12, color: '#333' }}>{t}</span>)}
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 24 }}>
                {expanded.liveUrl && (
                  <a href={expanded.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', fontFamily: "'DM Mono', monospace", fontSize: 9, fontWeight: 700, color: '#111', textDecoration: 'none', borderBottom: '1.5px solid #111', paddingBottom: 2 }}>VIEW LIVE ↗</a>
                )}
                <a href={expanded.gitHubUrl || expanded.gitHubUrlUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', fontFamily: "'DM Mono', monospace", fontSize: 9, fontWeight: 700, color: '#111', textDecoration: 'none', borderBottom: '1.5px solid #111', paddingBottom: 2 }}>VIEW ON GITHUB ↗</a>
              </div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: 'rgba(17,17,17,0.28)', marginTop: 22, letterSpacing: '0.1em' }}>CLICK OUTSIDE TO CLOSE</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function Projects() {
  const [revealed, setRevealed] = useState(false)
  const [expanded, setExpanded] = useState(null)
  const [isLightOn, setIsLightOn] = useState(true)
  const pullY = useMotionValue(0)
  const { triggerLoader, setProjectsRevealed } = useLoader()
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const [hoverBtn, setHoverBtn] = useState(false)

  const handleViewAll = useCallback(() => {
    triggerLoader(() => navigate('/projects'), 'magic')
  }, [triggerLoader, navigate])

  useEffect(() => {
    const unsub = pullY.on('change', v => {
      if (v >= 220 && !revealed) {
        setRevealed(true)
        setProjectsRevealed(true)
        animate(pullY, 0, { type: 'spring', stiffness: 140, damping: 10, mass: 1.3 })
      }
    })
    return unsub
  }, [pullY, revealed])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;600;700&family=DM+Sans:wght@400;500&display=swap');
        #projects *, #projects *::before, #projects *::after { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
      <section id="projects" ref={sectionRef} style={{ position: 'relative', width: '100%', height: '100vh', background: '#000000', overflow: 'clip', fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ position: 'absolute', inset: 0, background: '#000000' }} />
        <AnimatePresence>
          {!revealed && (
            <motion.div key="veil" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.4, ease: 'easeInOut' }}
              style={{ position: 'absolute', inset: 0, background: '#000000', zIndex: 70, pointerEvents: 'none' }} />
          )}
        </AnimatePresence>
        <Content revealed={revealed} expanded={expanded} setExpanded={setExpanded} isLightOn={isLightOn} />
        <HangingString pullY={pullY} isPulled={revealed} onToggleLight={() => setIsLightOn(v => !v)} />
        
        {/* View All Projects Button — only in projects section */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                bottom: 32,
                right: 40,
                zIndex: 100,
              }}
            >
              <button
                type="button"
                onClick={handleViewAll}
                onMouseEnter={() => setHoverBtn(true)}
                onMouseLeave={() => setHoverBtn(false)}
                style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: hoverBtn ? '#f5f0e4' : '#111110',
                  background: hoverBtn ? '#111110' : '#f5f0e4',
                  border: '1.5px solid rgba(17,17,16,0.2)',
                  borderRadius: '100px',
                  padding: '10px 28px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                  transition: 'all 0.2s',
                  pointerEvents: 'auto',
                }}
              >
                View All Projects ↗
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  )
}