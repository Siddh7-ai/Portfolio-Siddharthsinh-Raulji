import { useEffect, useRef } from 'react'
import { useLoader } from '../context/LoaderContext'

export default function Loader() {
  const { visible, handleLoaderDone } = useLoader()
  const mainRef   = useRef(null)
  const hiddenRef = useRef(null)
  const rafRef    = useRef(null)
  const stateRef  = useRef(null)

  const DUR = { scatter: 70, form: 130, glow: 100, explode: 75, reset: 35 }

  function getSRTargets(w, h, hctx) {
    const size  = Math.min(w, h) * 0.50
    const scale = size / 130
    const ox    = w / 2 - 65 * scale
    const oy    = h / 2 - 65 * scale - 20

    hctx.clearRect(0, 0, w, h)
    hctx.strokeStyle = '#ffffff'
    hctx.lineWidth   = 9 * scale
    hctx.lineCap     = 'round'
    hctx.lineJoin    = 'round'

    hctx.stroke(new Path2D(`
      M ${ox+58*scale} ${oy+22*scale}
      A ${28*scale} ${22*scale} 0 0 0 ${ox+14*scale} ${oy+44*scale}
      A ${28*scale} ${22*scale} 0 0 1 ${ox+58*scale} ${oy+66*scale}
      A ${28*scale} ${22*scale} 0 0 1 ${ox+14*scale} ${oy+88*scale}
    `))
    hctx.beginPath()
    hctx.moveTo(ox+74*scale, oy+22*scale)
    hctx.lineTo(ox+74*scale, oy+110*scale)
    hctx.stroke()
    hctx.stroke(new Path2D(`
      M ${ox+74*scale}  ${oy+22*scale}
      Q ${ox+104*scale} ${oy+22*scale} ${ox+104*scale} ${oy+44*scale}
      Q ${ox+104*scale} ${oy+66*scale} ${ox+74*scale}  ${oy+66*scale}
    `))
    hctx.beginPath()
    hctx.moveTo(ox+74*scale, oy+66*scale)
    hctx.lineTo(ox+104*scale, oy+110*scale)
    hctx.stroke()

    const data    = hctx.getImageData(0, 0, w, h).data
    const targets = []
    for (let y = 0; y < h; y += 4)
      for (let x = 0; x < w; x += 4)
        if (data[(y * w + x) * 4] > 120) targets.push({ x, y })

    for (let i = targets.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [targets[i], targets[j]] = [targets[j], targets[i]]
    }
    return targets
  }

  function makeParticle(tx, ty, w, h) {
    const side = Math.floor(Math.random() * 4)
    const x = side===0 ? Math.random()*w : side===1 ? w+20 : side===2 ? Math.random()*w : -20
    const y = side===0 ? -20 : side===1 ? Math.random()*h : side===2 ? h+20 : Math.random()*h
    return { tx, ty, x, y, vx:0, vy:0,
      size: Math.random()*1.8+0.8, alpha:0,
      speed: 0.055+Math.random()*0.04,
      delay: Math.random()*0.45,
      exploding:false, evx:0, evy:0 }
  }

  function init() {
    const canvas  = mainRef.current
    const hCanvas = hiddenRef.current
    if (!canvas || !hCanvas) return

    canvas.width   = window.innerWidth
    canvas.height  = window.innerHeight
    hCanvas.width  = canvas.width
    hCanvas.height = canvas.height

    const w = canvas.width, h = canvas.height
    const raw = getSRTargets(w, h, hCanvas.getContext('2d'))
    const MAX  = Math.min(raw.length, 650)
    const step = Math.max(1, Math.floor(raw.length / MAX))

    stateRef.current = {
      particles: raw.filter((_,i) => i%step===0).slice(0,MAX).map(t => makeParticle(t.x,t.y,w,h)),
      phase:'scatter', timer:0, fp:0, glow:0, glowDir:1,
      dotAlpha: 0,  /* for smooth fade in/out of canvas dots */
    }
  }

  function tick() {
    const canvas = mainRef.current
    if (!canvas || !stateRef.current) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width, h = canvas.height
    const s = stateRef.current

    ctx.fillStyle = '#0a0a09'
    ctx.fillRect(0, 0, w, h)
    const vg = ctx.createRadialGradient(w/2,h/2,0,w/2,h/2,Math.max(w,h)*0.65)
    vg.addColorStop(0,'rgba(0,0,0,0)')
    vg.addColorStop(1,'rgba(0,0,0,0.6)')
    ctx.fillStyle = vg
    ctx.fillRect(0, 0, w, h)

    s.timer++

    if (s.phase === 'scatter') {
      s.dotAlpha = 0
      for (let i=0;i<2;i++) {
        ctx.beginPath()
        ctx.arc(Math.random()*w, Math.random()*h, Math.random()*0.8, 0, Math.PI*2)
        ctx.fillStyle = `rgba(232,230,225,${Math.random()*0.06})`
        ctx.fill()
      }
      if (s.timer >= DUR.scatter) { s.phase='form'; s.timer=0 }
    }
    else if (s.phase === 'form') {
      s.dotAlpha = 0
      s.fp = Math.min(1, s.timer / DUR.form)
      if (s.timer >= DUR.form) { s.phase='glow'; s.timer=0 }
    }
    else if (s.phase === 'glow') {
      /* Fade dots in */
      s.dotAlpha = Math.min(1, s.dotAlpha + 0.04)
      s.glow += 0.055 * s.glowDir
      if (s.glow >= 1)    s.glowDir = -1
      if (s.glow <= 0.15) s.glowDir =  1
      if (s.timer >= DUR.glow) { s.phase='explode'; s.timer=0 }
    }
    else if (s.phase === 'explode') {
      /* Fade dots out */
      s.dotAlpha = Math.max(0, s.dotAlpha - 0.06)
      if (s.timer >= DUR.explode) { s.phase='reset'; s.timer=0 }
    }
    else if (s.phase === 'reset') {
      s.dotAlpha = 0
      if (s.timer >= DUR.reset) {
        handleLoaderDone()
        return
      }
    }

    const cx = w/2, cy = h/2
    const useGlow = s.phase==='glow' || s.phase==='form'

    /* Update all particles first */
    s.particles.forEach(p => {
      if (s.phase==='scatter') {
        p.vx+=(Math.random()-.5)*0.5; p.vy+=(Math.random()-.5)*0.5
        p.vx*=0.94; p.vy*=0.94; p.x+=p.vx; p.y+=p.vy
        p.alpha=Math.min(0.4,p.alpha+0.018)
      } else if (s.phase==='form') {
        const raw=Math.max(0,(s.fp-p.delay)/(1-p.delay))
        const ease=raw<0.5?2*raw*raw:1-Math.pow(-2*raw+2,2)/2
        p.x+=(p.tx-p.x)*p.speed*(1+ease*3)
        p.y+=(p.ty-p.y)*p.speed*(1+ease*3)
        p.alpha=Math.min(1,0.2+ease*0.8)
      } else if (s.phase==='glow') {
        p.x+=(p.tx-p.x)*0.2; p.y+=(p.ty-p.y)*0.2; p.alpha=1
      } else if (s.phase==='explode') {
        if (!p.exploding) {
          p.exploding=true
          const angle=Math.atan2(p.ty-cy,p.tx-cx)+(Math.random()-.5)*0.9
          const spd=5+Math.random()*11
          p.evx=Math.cos(angle)*spd; p.evy=Math.sin(angle)*spd
        }
        p.evx*=0.93; p.evy*=0.93; p.x+=p.evx; p.y+=p.evy
        p.alpha=Math.max(0,p.alpha-0.022)
      }
    })

    /* Draw non-glowing particles first (cheap) */
    ctx.save()
    ctx.fillStyle='#e8e6e1'
    s.particles.forEach(p => {
      if (useGlow) return  /* skip — drawn in glow pass below */
      ctx.globalAlpha=p.alpha
      ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill()
    })
    ctx.restore()

    /* Draw glowing particles — ONE shadow state for all, much cheaper */
    if (useGlow) {
      ctx.save()
      ctx.shadowBlur = s.glow * 10  /* reduced from 18 → 10 */
      ctx.shadowColor = 'rgba(232,230,225,0.75)'
      ctx.fillStyle = '#e8e6e1'
      s.particles.forEach(p => {
        ctx.globalAlpha = p.alpha
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill()
      })
      ctx.restore()
    }

    /* ── Bounce dots — shadow fully reset so particle glow never leaks in ── */
    if (s.dotAlpha > 0) {
      const t = Date.now() / 1000
      const dotCx = w / 2
      const dotBaseY = h - 64
      const spacing = 18
      const dotR = 4

      ctx.save()
      ctx.shadowBlur = 0
      ctx.shadowColor = 'transparent'
      ctx.globalCompositeOperation = 'source-over'

      ;[-1, 0, 1].forEach((offset, i) => {
        const delay  = i * 0.15
        const bounce = Math.sin((t - delay) * (Math.PI * 2 / 1.2))
        const by = dotBaseY + bounce * -6
        ctx.globalAlpha = s.dotAlpha * 0.9
        ctx.fillStyle = '#e8e6e1'
        ctx.beginPath()
        ctx.arc(dotCx + offset * spacing, by, dotR, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalAlpha = s.dotAlpha * 0.22
      ctx.fillStyle = '#e8e6e1'
      ctx.font = '500 9px "DM Mono", monospace'
      ctx.textAlign = 'center'
      ctx.fillText('LOADING PORTFOLIO...', w / 2, h - 38)

      ctx.restore()
    }

    rafRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    if (!visible) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      return
    }
    init()
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [visible]) // eslint-disable-line

  if (!visible) return null

  return (
    <div
      style={{
        position:'fixed', inset:0, zIndex:9999,
        background:'#0a0a09', pointerEvents:'all',
      }}
    >
      <canvas ref={mainRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} />
      <canvas ref={hiddenRef} style={{ display:'none' }} />
    </div>
  )
}