import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

// ── SR Logo ───────────────────────────────────────────────────────────────────
function SRLogo({ color = '#ffffff', size = 44 }) {
  return (
    <svg viewBox="0 0 130 130" width={size} height={size} fill="none" style={{ display: 'block' }}>
      <path d="M58 22 A28 22 0 0 0 14 44 A28 22 0 0 1 58 66 A28 22 0 0 1 14 88"
        fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" />
      <line x1="74" y1="22" x2="74" y2="110" stroke={color} strokeWidth="8" strokeLinecap="round" />
      <path d="M74 22 Q104 22 104 44 Q104 66 74 66"
        fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" />
      <line x1="74" y1="66" x2="104" y2="110" stroke={color} strokeWidth="8" strokeLinecap="round" />
    </svg>
  )
}

// ── Fantasy Torch SVG Component ────────────────────────────────────────────────────
function TorchSVG({ isOn, phase }) {
  const f = isOn ? (Math.sin(phase * 11) * 0.15 + Math.sin(phase * 7.3) * 0.1) : 0
  const scaleY = 1 + f
  const scaleX = 1 - f * 0.5

  // Flame layers
  const flame1Opacity = isOn ? 0.85 + Math.sin(phase * 9) * 0.12 : 0.1
  const flame2Opacity = isOn ? 0.92 + Math.sin(phase * 11) * 0.07 : 0.08
  const flame3Opacity = isOn ? 0.97 : 0.05

  const flameHue1 = isOn ? 18 + Math.sin(phase * 8) * 5 : 20
  const flameHue2 = isOn ? 30 + Math.sin(phase * 10) * 8 : 25
  const flameHue3 = isOn ? 48 + Math.sin(phase * 12) * 10 : 30

  const f1 = isOn ? `hsl(${flameHue1}, 95%, ${20 + Math.sin(phase * 7) * 5}%)` : '#2a1000'
  const f2 = isOn ? `hsl(${flameHue2}, 98%, ${38 + Math.sin(phase * 9) * 8}%)` : '#381500'
  const f3 = isOn ? `hsl(${flameHue3}, 100%, ${62 + Math.sin(phase * 11) * 10}%)` : '#4a2000'
  const tipColor = isOn ? `hsl(55, 100%, ${82 + Math.sin(phase * 13) * 8}%)` : '#3a1800'

  // Flame wobble offsets
  const wo1 = isOn ? Math.sin(phase * 9.1) * 4 : 0
  const wo2 = isOn ? Math.sin(phase * 7.7) * 3 : 0
  const wo3 = isOn ? Math.sin(phase * 11.3) * 2 : 0

  return (
    <svg width="100" height="200" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Stick gradient - dark brown wood */}
        <linearGradient id="stickG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1a0a00" />
          <stop offset="20%" stopColor="#5a2e0c" />
          <stop offset="50%" stopColor="#7a4018" />
          <stop offset="75%" stopColor="#5a2e0c" />
          <stop offset="100%" stopColor="#1a0a00" />
        </linearGradient>
        {/* Stick highlight */}
        <linearGradient id="stickHiG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(180,100,40,0.15)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
        {/* Head wood - lighter carved look */}
        <linearGradient id="headWoodG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3a1a06" />
          <stop offset="25%" stopColor="#a06030" />
          <stop offset="50%" stopColor="#c07840" />
          <stop offset="75%" stopColor="#a06030" />
          <stop offset="100%" stopColor="#3a1a06" />
        </linearGradient>
        {/* Head wood top */}
        <linearGradient id="headWoodTopG" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#5a2e0c" />
          <stop offset="60%" stopColor="#b87040" />
          <stop offset="100%" stopColor="#d08848" />
        </linearGradient>
        {/* Metal band */}
        <linearGradient id="metalBandG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#111" />
          <stop offset="35%" stopColor="#888" />
          <stop offset="55%" stopColor="#ddd" />
          <stop offset="100%" stopColor="#222" />
        </linearGradient>
        {/* Orange band ring */}
        <linearGradient id="orangeRingG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8b3a00" />
          <stop offset="40%" stopColor="#e06818" />
          <stop offset="65%" stopColor="#f08828" />
          <stop offset="100%" stopColor="#8b3a00" />
        </linearGradient>
        {/* Glow filter */}
        <filter id="flameGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ═══════════════════════════════
          FLAME — layered natural shapes
      ═══════════════════════════════ */}
      <g filter={isOn ? "url(#flameGlow)" : undefined}>
        {/* Outermost large flame - dark orange base */}
        <path
          d={`M50 ${78 + f * 2} 
              C${42 + wo1} ${65 + f * 3}, ${30 - wo2} ${52 * scaleY + wo1}, ${34 + wo3} ${35 * scaleY} 
              C${36 + wo2} ${22 * scaleY}, ${44 + wo1} ${12 * scaleY + wo3}, 50 ${4 * scaleY}
              C${56 - wo1} ${12 * scaleY + wo3}, ${64 - wo2} ${22 * scaleY}, ${66 - wo3} ${35 * scaleY}
              C${70 + wo2} ${52 * scaleY + wo1}, ${58 - wo1} ${65 + f * 3}, 50 ${78 + f * 2}Z`}
          fill={f1} opacity={flame1Opacity}
        />
        {/* Mid flame - brighter */}
        <path
          d={`M50 ${76 + f * 1.5}
              C${44 + wo2} ${66 + f * 2}, ${35 - wo1} ${56 * scaleY}, ${38 + wo3} ${40 * scaleY}
              C${40 + wo1} ${28 * scaleY}, ${46 + wo2} ${18 * scaleY}, 50 ${10 * scaleY}
              C${54 - wo2} ${18 * scaleY}, ${60 - wo1} ${28 * scaleY}, ${62 - wo3} ${40 * scaleY}
              C${65 + wo2} ${56 * scaleY}, ${56 - wo1} ${66 + f * 2}, 50 ${76 + f * 1.5}Z`}
          fill={f2} opacity={flame2Opacity}
        />
        {/* Inner hot core */}
        <path
          d={`M50 ${74 + f}
              C${46 + wo3} ${67}, ${40 - wo2} ${60 * scaleY}, ${43 + wo1} ${47 * scaleY}
              C${45 + wo2} ${36 * scaleY}, ${48 + wo3} ${26 * scaleY}, 50 ${18 * scaleY}
              C${52 - wo3} ${26 * scaleY}, ${55 - wo2} ${36 * scaleY}, ${57 - wo1} ${47 * scaleY}
              C${60 + wo2} ${60 * scaleY}, ${54 - wo3} ${67}, 50 ${74 + f}Z`}
          fill={f3} opacity={flame3Opacity}
        />
        {/* Bright tip */}
        <path
          d={`M50 ${8 * scaleY} C${48 + wo1} ${14 * scaleY} ${47 - wo2} ${20 * scaleY} 50 ${24 * scaleY} C${53 + wo2} ${20 * scaleY} ${52 - wo1} ${14 * scaleY} 50 ${8 * scaleY}Z`}
          fill={tipColor} opacity={isOn ? 0.95 + Math.sin(phase * 15) * 0.05 : 0.1}
        />
        {/* Inner bright core streak */}
        <ellipse
          cx="50" cy={`${50 * scaleY}`}
          rx={`${4 * scaleX}`} ry={`${18 * scaleY}`}
          fill={tipColor} opacity={isOn ? 0.55 + Math.sin(phase * 10) * 0.15 : 0}
        />
      </g>

      {/* Ember base glow */}
      {isOn && (
        <ellipse cx="50" cy="80" rx="16" ry="4"
          fill={`rgba(255,130,20,${0.22 + Math.sin(phase * 8) * 0.08})`} />
      )}

      {/* ═══════════════════════════════
          TORCH HEAD — carved wood bowl
          Fantasy style with spiky crown
      ═══════════════════════════════ */}

      {/* Main head body - tapered cup */}
      <path d="M30 100 Q28 88 32 82 L50 78 L68 82 Q72 88 70 100 Z" fill="url(#headWoodTopG)" />

      {/* Head side faces - create 3D look */}
      <path d="M30 100 L32 82 L50 78 L50 100 Z" fill="url(#headWoodG)" opacity="0.7" />
      <path d="M70 100 L68 82 L50 78 L50 100 Z" fill="url(#headWoodG)" opacity="0.9" />

      {/* Decorative carved ridges / spikes on head */}
      {/* Left spike */}
      <path d="M30 100 L26 90 L32 86 L30 100Z" fill="url(#headWoodTopG)" />
      {/* Right spike */}
      <path d="M70 100 L74 90 L68 86 L70 100Z" fill="url(#headWoodTopG)" />
      {/* Front left spike */}
      <path d="M36 82 L33 72 L40 76 L36 82Z" fill="#b87040" />
      {/* Front right spike */}
      <path d="M64 82 L67 72 L60 76 L64 82Z" fill="#b87040" />
      {/* Center top spike */}
      <path d="M50 78 L47 68 L53 68 L50 78Z" fill="#c88048" />

      {/* Carved decorative lines on head */}
      <line x1="35" y1="84" x2="35" y2="99" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
      <line x1="42" y1="81" x2="42" y2="100" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      <line x1="50" y1="79" x2="50" y2="100" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      <line x1="58" y1="81" x2="58" y2="100" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      <line x1="65" y1="84" x2="65" y2="99" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />

      {/* Orange metal collar ring at base of head */}
      <rect x="28" y="99" width="44" height="7" rx="2" fill="url(#orangeRingG)" />
      <rect x="29" y="100" width="42" height="2" rx="1" fill="rgba(255,200,100,0.25)" />

      {/* ═══════════════════════════════
          HANDLE — wooden stick
      ═══════════════════════════════ */}
      {/* Main stick */}
      <path d="M37 106 L34 192 L66 192 L63 106 Z" fill="url(#stickG)" />
      {/* Specular edge highlight */}
      <path d="M44 106 L41 192 L46 192 L48 106 Z" fill="rgba(200,120,50,0.08)" />
      {/* Dark shadow */}
      <path d="M58 106 L62 192 L66 192 L63 106 Z" fill="rgba(0,0,0,0.3)" />

      {/* Metal band at top of stick */}
      <rect x="35" y="105" width="30" height="6" rx="2" fill="url(#metalBandG)" stroke="#444" strokeWidth="0.5" />
      <rect x="36" y="106" width="28" height="2" rx="1" fill="rgba(255,255,255,0.1)" />

      {/* Decorative grip wrap bands */}
      {[118, 132, 146, 160, 174].map((y, i) => (
        <g key={i}>
          <rect x="34" y={y} width="32" height="6" rx="1.5"
            fill={`rgba(${20 + i * 3},${10 + i * 2},0,0.9)`}
            stroke="rgba(0,0,0,0.4)" strokeWidth="0.5" />
          <rect x="35" y={y + 1} width="30" height="2" rx="1"
            fill="rgba(255,255,255,0.04)" />
        </g>
      ))}

      {/* Decorative carved grooves between bands */}
      {[125, 139, 153, 167].map((y, i) => (
        <line key={i} x1="35" y1={y} x2="65" y2={y}
          stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
      ))}

      {/* Bottom tip cap */}
      <path d="M40 186 L45 196 L50 199 L55 196 L60 186 Z" fill="url(#stickG)" />
      <ellipse cx="50" cy="186" rx="11" ry="3" fill="#1a0a00" stroke="#2a1200" strokeWidth="0.8" />
      <ellipse cx="50" cy="198" rx="5" ry="2" fill="#0d0500" />

      {/* Bottom rim detail */}
      <ellipse cx="50" cy="192" rx="16" ry="3.5" fill="#120800" stroke="#2a1000" strokeWidth="0.6" />
    </svg>
  )
}

// ── Tech Icons ────────────────────────────────────────────────────────────────
const SvgIcons = {
  react: ({ c }) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none">
      <circle cx="12" cy="12" r="2.05" fill={c} />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke={c} strokeWidth="1.2" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke={c} strokeWidth="1.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke={c} strokeWidth="1.2" transform="rotate(120 12 12)" />
    </svg>
  ),
  javascript: ({ c }) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <rect width="24" height="24" fill={c} />
      <path d="M7.5 17.5c.35.6.9 1 1.75 1 .9 0 1.5-.45 1.5-1.4V12H9.1v5.05c0 .35-.15.55-.45.55-.25 0-.45-.2-.6-.5l-1.05.4zM13.75 17.4c.45.75 1.15 1.1 2.05 1.1 1 0 1.75-.55 1.75-1.55 0-.85-.45-1.3-1.4-1.65l-.45-.18c-.45-.2-.65-.38-.65-.68 0-.25.2-.45.55-.45.3 0 .55.15.75.5l.9-.65c-.45-.65-1.05-.9-1.65-.9-1 0-1.65.63-1.65 1.5 0 .85.48 1.32 1.32 1.65l.48.2c.48.2.7.4.7.73 0 .32-.27.52-.65.52-.48 0-.83-.28-1.05-.75l-1 .61z" fill="#111" />
    </svg>
  ),
  nodejs: ({ c }) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill={c}>
      <path d="M12 1.85c-.27 0-.55.07-.76.21l-7.6 4.4c-.48.27-.76.78-.76 1.3v8.76c0 .52.28 1.03.76 1.3l2 1.16c.93.46 1.27.46 1.7.46 1.4 0 2.2-.85 2.2-2.33V9.4c0-.12-.1-.22-.22-.22h-.97c-.12 0-.22.1-.22.22v7.77c0 .66-.68 1.32-1.8.76L5 16.26a.26.26 0 01-.13-.24V7.26c0-.1.05-.2.13-.24l7.6-4.38c.07-.05.17-.05.25 0l7.6 4.38c.08.04.13.14.13.24v8.76c0 .1-.05.2-.13.24l-7.6 4.38c-.08.04-.17.04-.26 0l-1.95-1.16c-.1-.06-.22-.08-.32-.03-.9.5-.07.05-.98.28 0 0-.14.08.03.17l2.5 1.48c.23.14.5.21.76.21.27 0 .54-.07.76-.21l7.6-4.38c.48-.27.76-.78.76-1.3V7.76c0-.52-.28-1.03-.76-1.3l-7.6-4.4a1.4 1.4 0 00-.77-.21zm1.9 6.37c-2.1 0-3.35.88-3.35 2.37 0 1.6 1.24 2.05 3.26 2.25 2.4.23 2.6.58 2.6 1.05 0 .8-.65 1.15-2.18 1.15-1.92 0-2.34-.48-2.48-1.43-.02-.12-.12-.2-.24-.2h-1c-.13 0-.23.1-.23.23 0 1.3.7 2.85 3.95 2.85 2.36 0 3.72-.93 3.72-2.55 0-1.6-1.08-2.04-3.37-2.34-2.3-.3-2.5-.45-2.5-1 0-.44.2-1.04 1.86-1.04 1.5 0 2.04.32 2.27 1.33.02.12.13.2.25.2h1c.06 0 .13-.03.17-.08.05-.05.07-.12.06-.18-.15-1.75-1.3-2.56-3.75-2.56z" />
    </svg>
  ),
  python: ({ c }) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <path d="M11.9 2C9.1 2 7.3 3.1 7.3 5v2.3h5v.8H5.2C3.3 8.1 2 9.6 2 12s1.3 4 3.2 4.1H7v-1.9c0-2.1 1.6-3.2 3.7-3.2h4.6c1.6 0 2.7-1.1 2.7-2.7V5c0-1.9-1.8-3-4.1-3h-2zm-1.3 1.7c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" fill={c} />
      <path d="M12.1 22c2.8 0 4.6-1.1 4.6-3v-2.3h-5v-.8h8.1c1.9-.1 3.2-1.6 3.2-4s-1.3-4-3.2-4.1H17v1.9c0 2.1-1.6 3.2-3.7 3.2H8.7C7.1 14.9 6 16 6 17.6V19c0 1.9 1.8 3 4.1 3h2zm1.3-1.7c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" fill={c} opacity="0.75" />
    </svg>
  ),
  mongodb: ({ c }) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <path d="M12.52 2.1C10.54 4.3 7.5 8.4 7.5 11.7c0 2.5 1.5 4.6 3.7 5.5l.3 4.8h1l.3-4.8c2.2-.9 3.7-3 3.7-5.5 0-3.3-3-7.4-4-9.6z" fill={c} />
    </svg>
  ),
  html5: ({ c }) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <path d="M4.14 2l1.53 17.17L12 21l6.33-1.83L19.86 2H4.14zm13 4.33l-.24 2.67H9.5l.2 2.25h7l-.63 7.04L12 19.5l-4.07-1.21-.28-3.13H9.8l.14 1.58L12 17.5l2.06-.76.22-2.42H7.7L7.1 8.2 7 6.33h10.14z" fill={c} />
    </svg>
  ),
  css3: ({ c }) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <path d="M4.14 2l1.53 17.17L12 21l6.33-1.83L19.86 2H4.14zm12.79 4.42l-.37 4.11h-6.3l.2 2.24h5.9l-.38 4.24L12 18.07l-3.98-1.06-.27-3.05h2.12l.14 1.55 2 .53 1.99-.53.22-2.41H7.48L6.86 9.2 6.6 6.42h10.33z" fill={c} />
    </svg>
  ),
  tailwind: ({ c }) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill={c}>
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  ),
  php: ({ c }) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <ellipse cx="12" cy="12" rx="10" ry="5" fill={c} />
      <path d="M6 10.5h2.4c1.15 0 1.9.58 1.9 1.65 0 1.15-.78 1.85-1.98 1.85H7.2L6.9 15.5H5.6L6 10.5zm1.2 1.1l-.25 1.8h.82c.68 0 1-.3 1-.9 0-.52-.3-.9-.95-.9H7.2zm4.1-1.1h2.4c1.15 0 1.9.58 1.9 1.65 0 1.15-.78 1.85-1.98 1.85h-1.12L12.2 15.5h-1.3l.4-5zm1.2 1.1l-.25 1.8h.82c.68 0 1-.3 1-.9 0-.52-.3-.9-.95-.9H12.5zm3.2-1.1h1.35l-.22 2.3c-.03.35.12.55.42.55l1.08-.05-.14 1.1-1.25.05c-1.02 0-1.5-.6-1.37-1.6l.13-2.35z" fill="white" />
    </svg>
  ),
  mysql: ({ c }) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill={c}>
      <path d="M16.5 4c2 0 3.5.5 3.5 1.1V14c0 1.1-1.57 2-3.5 2s-3.5-.9-3.5-2V5.1C13 4.5 14.5 4 16.5 4zm0 1.5c-1.1 0-2 .27-2 .6s.9.6 2 .6 2-.27 2-.6-.9-.6-2-.6zM6.5 4C7.88 4 9 5.12 9 6.5S7.88 9 6.5 9 4 7.88 4 6.5 5.12 4 6.5 4zM2 11.5C2 10.67 2.67 10 3.5 10H4v8.5C4 19.33 4.67 20 5.5 20S7 19.33 7 18.5V10h.5C8.33 10 9 10.67 9 11.5V20c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-8.5z" />
    </svg>
  ),
  git: ({ c }) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill={c}>
      <path d="M23.546 10.93L13.067.452a1.55 1.55 0 00-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 012.327 2.341l2.658 2.66a1.838 1.838 0 11-1.103 1.047L12.98 8.99v6.135a1.84 1.84 0 11-1.504-.043V8.925a1.841 1.841 0 01-.999-2.416L7.74 3.75.454 11.038a1.55 1.55 0 000 2.187L10.933 23.71a1.55 1.55 0 002.187 0L23.546 13.12a1.55 1.55 0 000-2.19z" />
    </svg>
  ),
  github: ({ c }) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill={c}>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.31.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  ),
  supabase: ({ c }) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill={c}>
      <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C.33 12.59.726 13.39 1.408 13.39h6.95l-1.247 9.569c.013.985 1.257 1.408 1.872.636l9.262-11.653c.434-.54.04-1.34-.642-1.34h-6.95L11.9 1.036z" />
    </svg>
  ),
  flask: ({ c }) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none">
      <path d="M9 3v7L4 18.5A1.5 1.5 0 005.5 21h13a1.5 1.5 0 001.5-2.5L15 10V3" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="9" y1="3" x2="15" y2="3" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="16" r="1.2" fill={c} />
      <circle cx="14" cy="18" r="0.9" fill={c} />
    </svg>
  ),
  java: ({ c }) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="#ED8B00">
      <path d="M8.85 18.56s-.92.53.65.71c1.9.22 2.87.19 4.97-.21 0 0 .55.35 1.32.65-4.7 2.01-10.63-.12-6.94-1.15zM8.28 15.93s-1.03.76.54.92c2.03.21 3.64.23 6.41-.31 0 0 .38.39.99.6-5.68 1.66-12.01.13-7.94-1.21zM13.12 11.48c1.16 1.33-.3 2.53-.3 2.53s2.94-1.52 1.59-3.42c-1.26-1.77-2.23-2.65 3-5.69 0 0-8.21 2.05-4.29 6.58zM19.33 20.5s.68.56-.75 1c-2.71.82-11.29 1.07-13.67.03-.86-.37.75-1.03 1.92-.96.48-.1 1.05-.1 1.05-.1-1.21-.85-7.81 1.47-3.35 2.07 12.15 1.56 22.15-.7 14.8-2.04zM9.29 13.21s-5.54 1.32-1.96 1.8c1.51.2 4.53.16 7.34-.08 2.3-.2 4.6-.62 4.6-.62s-.81.35-1.39.75c-5.63 1.48-16.51.79-13.38-.72 2.64-1.28 4.79-1.13 4.79-1.13zM17.12 17.58c5.73-2.98 3.08-5.84 1.23-5.46-.45.09-.65.18-.65.18s.17-.26.49-.38c3.64-1.28 6.44 3.78-1.18 5.78 0 0 .09-.08.11-.12z" />
    </svg>
  ),
  jwt: ({ c }) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill={c}>
      <path d="M11.08 2v6.19L7.41 4.52l-.93.93 3.67 3.67H4v1.32h6.19L6.48 14.1l.93.93 3.67-3.67V17.5h1.32v-6.14l3.67 3.67.93-.93-3.67-3.67H19.5v-1.32h-6.14l3.67-3.67-.93-.93-3.67 3.67V2h-1.35zm-.27 12.51v6h1.35v-6l-1.35-.03v.03z" />
    </svg>
  ),
  vercel: ({ c }) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill={c}>
      <path d="M12 2L2 19.5h20L12 2z" />
    </svg>
  ),
  netlify: ({ c }) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill={c}>
      <path d="M14.77 9.08l.3.22 2.38-1.06-2.2-2.2-.5 3.04zM12 5.92l-.06.2-.52 8.14.52 2.3.06.2.06-.2.52-2.3-.52-8.14L12 5.92zM9.23 9.3l.3-.22-.5-3.04-2.2 2.2 2.38 1.06zM3.17 12.88l1.63 1.63 3.1-1.38a1.1 1.1 0 01-.07-.53l.02-.32-4.68.6zm17.66-.11l-4.68-.6.02.32c0 .18-.02.37-.07.53l3.1 1.38 1.63-1.63zM9.23 14.7l-.02.02c.12.11.22.24.29.38l4.56-2.04-3.48-1.55-1.35 3.19zm5.54 0l-1.35-3.19-3.48 1.55 4.56 2.04c.07-.14.17-.27.29-.38l-.02-.02zM12 18.08l-.52-.85V22l3.17-1.22L12 18.08zm0 0l2.65 2.7L12 22v-3.77l-.52.85.52-.85zm0 0l-.52.85.52-.85z" />
    </svg>
  ),
  kali: ({ c }) => (
    <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none">
      <g stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Dragon body — main S-curve */}
        <path d="M68 14 C76 20, 80 32, 76 46 C72 58, 60 64, 52 68 C46 71, 42 72, 40 78 C38 84, 40 92, 42 97" />
        {/* Head outline */}
        <path d="M68 14 C65 8, 57 6, 52 9 C47 12, 46 19, 50 24 C54 28, 63 26, 67 20 C69 17, 68 14, 68 14Z" />
        {/* Snout */}
        <path d="M46 19 C43 19, 41 21, 42 23" />
        {/* Eye */}
        <circle cx="54" cy="14" r="1.8" fill={c} stroke="none" />
        {/* Upper wing — large sweeping wing */}
        <path d="M63 22 C52 12, 30 8, 10 14" />
        <path d="M10 14 C20 19, 36 26, 44 34" />
        {/* Wing finger spines */}
        <path d="M10 14 C6 8, 5 2, 9 0" />
        <path d="M18 12 C15 6, 16 1, 20 0" />
        <path d="M27 10 C26 4, 28 0, 33 0" />
        <path d="M37 10 C37 5, 40 1, 44 2" />
        {/* Wing membrane lines */}
        <path d="M12 14 C18 20, 30 24, 38 30" strokeOpacity="0.5" />
        <path d="M20 13 C26 19, 36 24, 42 32" strokeOpacity="0.4" />
        {/* Lower body detail / belly */}
        <path d="M60 52 C62 56, 66 60, 68 66 C70 72, 67 80, 62 84" />
        {/* Tail curves down */}
        <path d="M42 97 C41 99, 42 101, 43 100" />
        {/* Tail tip teardrop (iconic Kali blue drop) */}
        <path d="M42 97 C40 99, 41 103, 43 102 C45 101, 44 98, 42 97Z" fill={c} stroke="none" />
        {/* Spine ridges on back */}
        <path d="M66 30 C68 27, 70 28, 69 31" strokeOpacity="0.7" />
        <path d="M68 40 C71 37, 73 38, 71 42" strokeOpacity="0.7" />
      </g>
    </svg>
  ),
  numpy: ({ c }) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <path d="M11 3.06L3 7.5v4.94l4-2.06V7.94l4-2.25V3.06zM13 3.06v2.63l4 2.25v2.44l4 2.06V7.5L13 3.06z" fill={c} />
      <path d="M3 12.44v4.94L11 22v-2.63l-4-2.25v-2.44l-4-2.24zM21 12.44l-4 2.24v2.44l-4 2.25V22l8-4.62v-4.94z" fill={c} opacity="0.6" />
      <path d="M7 9.88v2.44l4 2.24 4-2.24V9.88l-4 2.18-4-2.18z" fill={c} opacity="0.85" />
    </svg>
  ),
  sklearn: ({ c }) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <circle cx="12" cy="12" r="9" fill="none" stroke={c} strokeWidth="1.3" />
      <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" stroke={c} strokeWidth="1" opacity="0.4" />
      <circle cx="12" cy="12" r="3" fill={c} />
      <circle cx="12" cy="5" r="1.8" fill={c} />
      <circle cx="12" cy="19" r="1.8" fill={c} />
      <circle cx="5" cy="12" r="1.8" fill={c} />
      <circle cx="19" cy="12" r="1.8" fill={c} />
    </svg>
  ),
  pandas: ({ c }) => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill={c}>
      <rect x="5" y="2.5" width="4" height="8" rx="2" />
      <rect x="15" y="2.5" width="4" height="8" rx="2" />
      <rect x="5" y="13.5" width="4" height="8" rx="2" opacity="0.5" />
      <rect x="15" y="13.5" width="4" height="8" rx="2" opacity="0.5" />
      <rect x="9" y="9" width="6" height="1.5" />
      <rect x="9" y="13.5" width="6" height="1.5" opacity="0.5" />
    </svg>
  ),
}

// ── Tech Data ────────────────────────────────────────────────────────────────
const TECHS = [
  { name: 'React',        icon: 'react',        color: '#61DAFB', orbit: 0 },
  { name: 'JavaScript',   icon: 'javascript',   color: '#F7DF1E', orbit: 0 },
  { name: 'Node.js',      icon: 'nodejs',       color: '#5FA04E', orbit: 0 },
  { name: 'Python',       icon: 'python',       color: '#3776AB', orbit: 0 },
  { name: 'MongoDB',      icon: 'mongodb',      color: '#47A248', orbit: 0 },
  { name: 'HTML5',        icon: 'html5',        color: '#E34F26', orbit: 1 },
  { name: 'CSS3',         icon: 'css3',         color: '#1572B6', orbit: 1 },
  { name: 'Tailwind',     icon: 'tailwind',     color: '#06B6D4', orbit: 1 },
  { name: 'PHP',          icon: 'php',          color: '#8993BE', orbit: 1 },
  { name: 'MySQL',        icon: 'mysql',        color: '#4479A1', orbit: 1 },
  { name: 'Git',          icon: 'git',          color: '#F05032', orbit: 1 },
  { name: 'GitHub',       icon: 'github',       color: '#ffffff', orbit: 1 },
  { name: 'Supabase',     icon: 'supabase',     color: '#3ECF8E', orbit: 1 },
  { name: 'Flask',        icon: 'flask',        color: '#dddddd', orbit: 2 },
  { name: 'Java',         icon: 'java',         color: '#FF6B35', orbit: 2 },
  { name: 'JWT',          icon: 'jwt',          color: '#D63AFF', orbit: 2 },
  { name: 'Vercel',       icon: 'vercel',       color: '#ffffff', orbit: 2 },
  { name: 'Netlify',      icon: 'netlify',      color: '#00C7B7', orbit: 2 },
  { name: 'Kali Linux',   icon: 'kali',         color: '#7EB2C8', orbit: 2 },
  { name: 'Scikit-learn', icon: 'sklearn',      color: '#F89820', orbit: 2 },
  { name: 'Pandas',       icon: 'pandas',       color: '#c8aaff', orbit: 2 },
  { name: 'NumPy',        icon: 'numpy',        color: '#4DABCF', orbit: 2 },
]

const ORBIT_R_FRAC = [0.22, 0.42, 0.62]
const BASE_SIZE    = [50, 43, 37]
const ORBIT_CX_FRAC = 0.62
const ORBIT_CY_FRAC = 0.50

function seededRng(seed) {
  let s = seed
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
}

const ANIM = (() => {
  const counts = [0, 0, 0]
  TECHS.forEach(t => counts[t.orbit]++)
  const cursor = [0, 0, 0]
  return TECHS.map((tech, i) => {
    const rng = seededRng(i * 97 + 13)
    const total = counts[tech.orbit]
    const myIdx = cursor[tech.orbit]++
    return {
      angle: (myIdx / total) * Math.PI * 2,
      floatA: 2 + rng() * 2,
      floatS: 0.35 + rng() * 0.45,
      floatP: rng() * Math.PI * 2,
    }
  })
})()

// ── Torch beam draw function — now points toward orbital icon cluster ─────────
function drawTorchBeam(ctx, w, h, t, tipX, tipY, orbitCx, orbitCy) {
  ctx.clearRect(0, 0, w, h)

  // Slight flicker on flame tip position
  const flicker = Math.sin(t * 13.7) * 3 + Math.sin(t * 8.3) * 2
  const fx = tipX + flicker * 0.3
  const fy = tipY

  // Target: the orbital center (where all the tech icons orbit)
  const targetX = orbitCx
  const targetY = orbitCy
  const dx = targetX - fx
  const dy = targetY - fy
  const dist = Math.hypot(dx, dy)
  const angle = Math.atan2(dy, dx)

  // Wide ambient cone
  const coneG = ctx.createRadialGradient(fx, fy, 6, fx, fy, dist * 1.35)
  const a = 0.085 + Math.sin(t * 7.1) * 0.02
  coneG.addColorStop(0,   `rgba(255,180,60,${a * 3.2})`)
  coneG.addColorStop(0.2, `rgba(255,155,40,${a * 2.2})`)
  coneG.addColorStop(0.55,`rgba(255,120,20,${a * 0.9})`)
  coneG.addColorStop(1,   'rgba(255,80,0,0)')
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(fx, fy)
  ctx.arc(fx, fy, dist * 1.4, angle - 0.32, angle + 0.32)
  ctx.closePath()
  ctx.fillStyle = coneG
  ctx.fill()
  ctx.restore()

  // Tight bright core ray
  const coreG = ctx.createLinearGradient(fx, fy, targetX, targetY)
  coreG.addColorStop(0,   `rgba(255,235,145,${0.58 + Math.sin(t * 9) * 0.1})`)
  coreG.addColorStop(0.38,`rgba(255,185,75,0.24)`)
  coreG.addColorStop(1,   'rgba(255,120,20,0)')
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(fx, fy)
  ctx.arc(fx, fy, dist * 1.1, angle - 0.055, angle + 0.055)
  ctx.closePath()
  ctx.fillStyle = coreG
  ctx.fill()
  ctx.restore()

  // Secondary mid-cone (warmth fill)
  const midG = ctx.createRadialGradient(fx, fy, 4, fx, fy, dist * 0.95)
  midG.addColorStop(0,   `rgba(255,200,80,${a * 1.6})`)
  midG.addColorStop(0.4, `rgba(255,160,40,${a * 0.8})`)
  midG.addColorStop(1,   'rgba(255,100,10,0)')
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(fx, fy)
  ctx.arc(fx, fy, dist * 1.05, angle - 0.18, angle + 0.18)
  ctx.closePath()
  ctx.fillStyle = midG
  ctx.fill()
  ctx.restore()

  // Floating dust motes along beam
  for (let i = 0; i < 14; i++) {
    const seed = i * 137.5
    const prog = ((seed * 0.01 + t * (0.07 + (i % 4) * 0.025)) % 1.0)
    const px = fx + dx * prog + Math.sin(t * 2.8 + i * 1.7) * 11
    const py = fy + dy * prog + Math.cos(t * 2.2 + i * 1.4) * 8
    const pa = (1 - prog) * 0.52 * (Math.sin(t * 4.5 + i * 2.1) * 0.4 + 0.6)
    ctx.beginPath()
    ctx.arc(px, py, 1.0 + (i % 3) * 0.55, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,218,130,${pa})`
    ctx.fill()
  }

  // Glow splash on the orbital cluster
  const splashG = ctx.createRadialGradient(targetX, targetY, 0, targetX, targetY, 180)
  const sa = 0.055 + Math.sin(t * 6.3) * 0.02
  splashG.addColorStop(0,   `rgba(255,195,65,${sa * 2.8})`)
  splashG.addColorStop(0.35,`rgba(255,155,42,${sa * 1.4})`)
  splashG.addColorStop(1,   'rgba(255,100,10,0)')
  ctx.save()
  ctx.beginPath()
  ctx.arc(targetX, targetY, 180, 0, Math.PI * 2)
  ctx.fillStyle = splashG
  ctx.fill()
  ctx.restore()

  // Smoke wisps near flame tip
  for (let i = 0; i < 6; i++) {
    const sp = t * 0.45 + i * 1.25
    const sx = fx + Math.sin(sp * 1.4 + i) * 8
    const sy = fy - 12 - (sp * 14 % 35)
    const smokeA = Math.max(0, 0.10 - (sp * 0.035 % 0.10))
    ctx.beginPath()
    ctx.arc(sx, sy, 3.5 + i * 0.5, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(190,150,90,${smokeA})`
    ctx.fill()
  }
}

// ── Main Section Component ────────────────────────────────────────────────────
export default function MagneticSkills() {
  const sectionRef     = useRef(null)
  const canvasRef      = useRef(null)
  const torchCanvasRef = useRef(null)
  const arsenalRef     = useRef(null)
  const torchWrapRef   = useRef(null)
  const inView = useInView(sectionRef, { once: false, margin: '-60px' })



  const [iconStates, setIconStates] = useState(() =>
    TECHS.map((_, i) => ({ x: 0, y: 0, size: BASE_SIZE[TECHS[i].orbit], opacity: 0.6 }))
  )
  const [orbitCenter, setOrbitCenter] = useState({ x: 0, y: 0 })
  const [tooltip, setTooltip]         = useState(null)
  const [torchOn, setTorchOn]         = useState(true)
  const [torchPhase, setTorchPhase]   = useState(0)

  const torchOnRef  = useRef(true)
  const mouseRef    = useRef({ x: -9999, y: -9999 })
  const lerpRef     = useRef({ x: -9999, y: -9999 })
  const forcesRef   = useRef(TECHS.map(() => 0))
  const startRef    = useRef(null)
  const rafRef      = useRef(null)
  const sizeRef     = useRef({ w: 0, h: 0 })
  const orbitCxRef  = useRef(0)
  const orbitCyRef  = useRef(0)

  const toggleTorch = useCallback(() => {
    torchOnRef.current = !torchOnRef.current
    setTorchOn(torchOnRef.current)
    if (!torchOnRef.current) {
      const tc = torchCanvasRef.current
      if (tc) tc.getContext('2d').clearRect(0, 0, tc.width, tc.height)
    }
  }, [])

  useEffect(() => {
    const section     = sectionRef.current
    const canvas      = canvasRef.current
    const torchCanvas = torchCanvasRef.current
    if (!section || !canvas || !torchCanvas) return

    const ctx = canvas.getContext('2d')

    const resize = () => {
      const r = section.getBoundingClientRect()
      canvas.width       = r.width
      canvas.height      = r.height
      torchCanvas.width  = r.width
      torchCanvas.height = r.height
      sizeRef.current = { w: r.width, h: r.height }
      if (lerpRef.current.x === -9999) {
        lerpRef.current  = { x: r.width * ORBIT_CX_FRAC, y: r.height * ORBIT_CY_FRAC }
        mouseRef.current = { ...lerpRef.current }
      }
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(section)

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts
      const t = (ts - startRef.current) / 1000
      const { w, h } = sizeRef.current
      if (!w || !h) { rafRef.current = requestAnimationFrame(tick); return }

      const cx = w * ORBIT_CX_FRAC
      const cy = h * ORBIT_CY_FRAC
      orbitCxRef.current = cx
      orbitCyRef.current = cy
      setOrbitCenter({ x: cx, y: cy })

      lerpRef.current.x += (mouseRef.current.x - lerpRef.current.x) * 0.06
      lerpRef.current.y += (mouseRef.current.y - lerpRef.current.y) * 0.06
      const lx = lerpRef.current.x
      const ly = lerpRef.current.y

      // ── Field lines ──
      ctx.clearRect(0, 0, w, h)
      const gs = 60
      for (let gi = 0; gi * gs < w + gs; gi++) {
        for (let gj = 0; gj * gs < h + gs; gj++) {
          const gx = gi * gs, gy = gj * gs
          const ddx = lx - gx, ddy = ly - gy
          const dd = Math.hypot(ddx, ddy)
          if (dd < 380 && dd > 1) {
            const f = (1 - dd / 380) * 0.22
            const a = Math.atan2(ddy, ddx)
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255,255,255,${(f * 0.45).toFixed(3)})`
            ctx.lineWidth = 0.8
            ctx.moveTo(gx, gy)
            ctx.lineTo(gx + Math.cos(a) * 18 * f, gy + Math.sin(a) * 18 * f)
            ctx.stroke()
          }
        }
      }

      // ── Orbital icons ──
      const newStates = TECHS.map((tech, i) => {
        const p = ANIM[i]
        const halfMin = Math.min(w, h) / 2
        const orbitR  = halfMin * ORBIT_R_FRAC[tech.orbit]
        const baseSize = BASE_SIZE[tech.orbit]

        let x = cx + Math.cos(p.angle) * orbitR
        let y = cy + Math.sin(p.angle) * orbitR

        const mdx = lx - x, mdy = ly - y
        const mdist = Math.hypot(mdx, mdy)
        const FIELD_R = Math.min(w, h) * 0.35

        if (mdist < FIELD_R && mdist > 1) {
          const pull = (1 - mdist / FIELD_R) * 0.28
          forcesRef.current[i] = Math.min(forcesRef.current[i] + pull * 0.25, 1)
          const attract = pull * 70
          x += (mdx / mdist) * attract
          y += (mdy / mdist) * attract
        } else {
          forcesRef.current[i] *= 0.88
        }

        x += Math.sin(t * p.floatS + p.floatP) * p.floatA
        y += Math.cos(t * p.floatS * 0.8 + p.floatP) * p.floatA * 0.7
        const half = baseSize / 2 + 2
        x = Math.max(half, Math.min(w - half, x))
        y = Math.max(half, Math.min(h - half, y))

        const d = forcesRef.current[i]
        if (d > 0.1) {
          ctx.save()
          ctx.translate(x, y)
          ctx.globalAlpha = Math.min(d * 0.6, 0.55)
          ctx.strokeStyle = tech.color
          ctx.lineWidth = 1.4
          const arcs = Math.ceil(4 + 4 * d)
          for (let j = 0; j < arcs; j++) {
            const ang = (j / arcs) * Math.PI * 2 + t * 0.35
            const r1 = baseSize / 2 + 6, r2 = baseSize / 2 + 22
            ctx.beginPath()
            ctx.moveTo(Math.cos(ang) * r1, Math.sin(ang) * r1)
            ctx.quadraticCurveTo(
              Math.cos(ang + 0.4) * (baseSize / 2 + 14),
              Math.sin(ang + 0.4) * (baseSize / 2 + 14),
              Math.cos(ang) * r2, Math.sin(ang) * r2
            )
            ctx.stroke()
          }
          ctx.restore()
        }

        return { x, y, size: baseSize * (1 + d * 0.1), opacity: 0.55 + d * 0.45 }
      })
      setIconStates(newStates)

      // Tooltip
      let bestDist = 999, bestIdx = -1
      newStates.forEach((s, i) => {
        const d = Math.hypot(mouseRef.current.x - s.x, mouseRef.current.y - s.y)
        if (d < s.size / 2 + 8 && d < bestDist) { bestDist = d; bestIdx = i }
      })
      if (bestIdx >= 0) {
        const s = newStates[bestIdx]
        setTooltip({ name: TECHS[bestIdx].name, color: TECHS[bestIdx].color, x: s.x + s.size / 2 + 8, y: s.y - 10 })
      } else {
        setTooltip(null)
      }

      // ── Torch beam — aimed at orbital center ──
      setTorchPhase(t)
      if (torchOnRef.current && torchWrapRef.current) {
        const sr = section.getBoundingClientRect()
        const tw = torchWrapRef.current.getBoundingClientRect()
        // Torch flame tip position (top-center of the torch SVG, offset by section)
        const flameTipX = tw.left - sr.left + tw.width / 2
        const flameTipY = tw.top  - sr.top  + 14  // near top of SVG = flame tip

        drawTorchBeam(
          torchCanvas.getContext('2d'),
          torchCanvas.width, torchCanvas.height, t,
          flameTipX, flameTipY,
          orbitCxRef.current, orbitCyRef.current
        )
      } else if (!torchOnRef.current) {
        torchCanvas.getContext('2d').clearRect(0, 0, torchCanvas.width, torchCanvas.height)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
      ro.disconnect()
    }
  }, [])

  const CORE_SIZE = 92

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        height: '100vh',
        background: '#0a0a09',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Layer 1 — field lines */}
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Layer 2 — torch beam */}
      <canvas ref={torchCanvasRef} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 2,
        opacity: torchOn ? 1 : 0,
        transition: 'opacity 600ms cubic-bezier(0.4, 0, 0.2, 1)',
      }} />

      {/* ── Header ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        paddingTop: 36, paddingLeft: 40, zIndex: 40, pointerEvents: 'none',
      }}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          style={{
            fontFamily: '"DM Mono", monospace', fontSize: 10,
            letterSpacing: '0.32em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.28)', marginBottom: 6,
          }}
        >
          TECHNICAL OVERVIEW
        </motion.div>

        {/* EXPERTISE */}
        <div style={{ overflow: 'hidden', lineHeight: 0 }}>
          <motion.div
            initial={{ y: '105%' }}
            animate={inView ? { y: '0%' } : { y: '105%' }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              fontFamily: '"Bebas Neue", cursive',
              fontSize: 'clamp(56px, 10vw, 118px)',
              fontWeight: 900, lineHeight: 0.88, letterSpacing: '0.05em',
              color: '#f0f0f2', margin: 0, display: 'block',
              textShadow: '0 2px 40px rgba(255,255,255,0.10)',
            }}
          >
            EXPERTISE
          </motion.div>
        </div>

        {/* ARSENAL */}
        <div style={{ overflow: 'hidden', lineHeight: 0, marginTop: '-0.06em' }}>
          <motion.div
            ref={arsenalRef}
            initial={{ y: '105%' }}
            animate={inView ? { y: '0%' } : { y: '105%' }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            style={{
              fontFamily: '"Bebas Neue", cursive',
              fontSize: 'clamp(56px, 10vw, 118px)',
              fontWeight: 900, lineHeight: 0.88, letterSpacing: '0.05em',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.13)',
              margin: 0, display: 'block',
            }}
          >
            ARSENAL
          </motion.div>
        </div>
      </div>

      {/* ── Orbital Icons ── */}
      {TECHS.map((tech, i) => {
        const { x, y, size, opacity } = iconStates[i]
        const Icon = SvgIcons[tech.icon]
        const pad  = size * 0.22
        // Add warm glow overlay when torch is on
        const torchGlow = torchOn
          ? `0 0 22px rgba(255,160,40,0.18), 0 0 8px rgba(255,180,60,0.10), 0 0 14px ${tech.color}22, inset 0 0 6px ${tech.color}0a`
          : `0 0 14px ${tech.color}22, inset 0 0 6px ${tech.color}0a`
        return (
          <div key={tech.name} style={{
            position: 'absolute',
            left: x - size / 2, top: y - size / 2,
            width: size, height: size, borderRadius: '50%',
            background: 'radial-gradient(circle at 38% 38%, #1c1c2e, #08080e)',
            border: `1.5px solid ${tech.color}66`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: pad, boxSizing: 'border-box',
            opacity, zIndex: 20, pointerEvents: 'none',
            boxShadow: torchGlow,
            transition: 'opacity 0.1s, box-shadow 0.4s',
          }}>
            {Icon && <Icon c={tech.color} />}
          </div>
        )
      })}

      {/* Tooltip */}
      {tooltip && (
        <div style={{
          position: 'absolute', left: tooltip.x, top: tooltip.y,
          background: 'rgba(6,6,20,0.95)',
          border: `1px solid ${tooltip.color}88`,
          borderRadius: 5, padding: '5px 10px', whiteSpace: 'nowrap',
          fontFamily: '"DM Mono", monospace', fontSize: 9,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: tooltip.color, pointerEvents: 'none', zIndex: 200, fontWeight: 600,
        }}>
          {tooltip.name}
        </div>
      )}

      {/* ── SR Core ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        style={{
          position: 'absolute',
          left: orbitCenter.x - CORE_SIZE / 2,
          top:  orbitCenter.y - CORE_SIZE / 2,
          width: CORE_SIZE, height: CORE_SIZE, borderRadius: '50%',
          background: 'radial-gradient(circle at 36% 36%, #282826, #080808)',
          border: '1.5px solid rgba(255,255,255,0.18)',
          boxShadow: torchOn
            ? '0 0 0 6px rgba(255,255,255,0.03), 0 0 60px rgba(255,160,40,0.18), 0 0 40px rgba(255,255,255,0.06)'
            : '0 0 0 6px rgba(255,255,255,0.03), 0 0 40px rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 30, pointerEvents: 'none',
          transition: 'box-shadow 0.45s ease',
        }}
      >
        <SRLogo color="#ffffff" size={46} />
      </motion.div>

      {/* ════════════════════════════════════════════════
          FANTASY TORCH — bigger, bottom left corner
      ════════════════════════════════════════════════ */}
      <motion.div
        ref={torchWrapRef}
        className="torch-wrapper"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
        onClick={toggleTorch}
        style={{
          position: 'absolute',
          bottom: 40,
          left: 28,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          cursor: 'pointer',
          zIndex: 100,
          userSelect: 'none',
        }}
      >
        {/* Ambient glow halo when torch is on */}
        <div style={{
          position: 'absolute',
          bottom: 18, left: '50%',
          transform: 'translateX(-50%)',
          width: 160, height: 160,
          borderRadius: '50%',
          background: torchOn
            ? `radial-gradient(circle, rgba(255,155,38,${0.22 + Math.sin(torchPhase * 6.8) * 0.07}) 0%, rgba(255,100,20,0.07) 55%, transparent 78%)`
            : 'transparent',
          pointerEvents: 'none',
          zIndex: -1,
          transition: 'background 0.4s',
        }} />

        {/* Fantasy Torch SVG — bigger (100×200) */}
        <TorchSVG isOn={torchOn} phase={torchPhase} />

        {/* ON/OFF indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontFamily: '"DM Mono", monospace',
          fontSize: 9,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: torchOn ? 'rgba(255,175,55,0.90)' : 'rgba(255,255,255,0.28)',
          transition: 'color 0.35s',
        }}>
          <span style={{
            display: 'inline-block',
            width: 6, height: 6, borderRadius: '50%',
            background: torchOn
              ? `rgba(255,${175 + Math.round(Math.sin(torchPhase * 8) * 25)},55,0.95)`
              : 'rgba(255,255,255,0.18)',
            boxShadow: torchOn
              ? `0 0 8px rgba(255,165,40,0.9), 0 0 16px rgba(255,140,20,0.4)`
              : 'none',
            transition: 'background 0.3s, box-shadow 0.3s',
          }} />
          {torchOn ? 'TORCH ON' : 'TORCH OFF'}
        </div>
      </motion.div>

      {/* ── Bottom stats ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: 0.9 }}
        style={{
          position: 'absolute', bottom: 28, left: 0, right: 0,
          display: 'flex', justifyContent: 'center', gap: 40,
          pointerEvents: 'none', zIndex: 40, flexWrap: 'wrap', padding: '0 20px',
        }}
      >
        {[['Frontend',5],['Backend',6],['Database',3],['DevOps',4],['Security',2],['ML/Data',3]].map(([label, count]) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: '"Bebas Neue", cursive', fontSize: 22,
              color: '#ffffff', lineHeight: 1,
            }}>{count}</div>
            <div style={{
              fontFamily: '"DM Mono", monospace', fontSize: 7,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.22)', marginTop: 3,
            }}>{label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}