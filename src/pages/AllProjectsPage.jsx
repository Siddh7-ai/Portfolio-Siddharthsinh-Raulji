import { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLoader } from '../context/LoaderContext'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'
import { projects as allProjects } from '../data/projects'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } }
}
const item = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16,1,0.3,1] } }
}

export default function AllProjectsPage() {
  const navigate = useNavigate()
  const { triggerLoader } = useLoader()
  const [hovered, setHovered] = useState(null)

  useLayoutEffect(() => {
    // Instant reset at start of render
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    // Multi-stage reset for mobile browsers and loader transitions
    window.scrollTo(0, 0);
    const timers = [
      setTimeout(() => window.scrollTo(0, 0), 0),
      setTimeout(() => window.scrollTo(0, 0), 100),
      setTimeout(() => window.scrollTo(0, 0), 500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const goHome = useCallback(() => {
    triggerLoader(() => {
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById('projects')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    })
  }, [navigate, triggerLoader])

  const handleProjectClick = (project) => {
    triggerLoader(() => {
      navigate(`/project/${project.id}`)
    }, 'magic', project.loadingText)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#e8e6e1',
      fontFamily: '"DM Sans", sans-serif',
    }}>

      {/* ── Title — padded to clear fixed navbar ── */}
      <div style={{ padding: '100px 40px 40px' }}>
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Project Vault' }]} />
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ fontFamily: '"DM Mono", monospace', fontSize: '10px',
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'rgba(17,17,16,0.35)', marginBottom: '12px' }}
        >
          — Selected Works
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
          style={{
            fontFamily: '"Bebas Neue", cursive',
            fontSize: 'clamp(64px, 10vw, 140px)',
            lineHeight: 0.9, color: '#111110',
            letterSpacing: '0.02em',
          }}
        >
          PROJECT<br />VAULT
        </motion.h1>
      </div>

      {/* ── Grid ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1px',
          background: 'rgba(17,17,16,0.1)',
          borderTop: '1px solid rgba(17,17,16,0.1)',
        }}
      >
        {allProjects.map((project, i) => (
          <motion.div
            key={project.number}
            variants={item}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="gpu"
            onClick={() => handleProjectClick(project)}
            animate={{ 
              backgroundColor: hovered===i ? '#111110' : '#e8e6e1' 
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: '32px',
              cursor: 'pointer',
              willChange: 'background-color',
            }}
          >
            {/* Number + Year */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: '20px',
            }}>
              <motion.span 
                animate={{ color: hovered===i ? 'rgba(232,230,225,0.15)' : 'rgba(17,17,16,0.12)' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: '"Bebas Neue", cursive', fontSize: '48px',
                  lineHeight: 1,
                }}>{project.number}</motion.span>
              <motion.span 
                animate={{ color: hovered===i ? 'rgba(232,230,225,0.3)' : 'rgba(17,17,16,0.3)' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: '"DM Mono", monospace', fontSize: '9px',
                  letterSpacing: '0.2em',
                }}>{project.year}</motion.span>
            </div>

            {/* Image */}
            <div style={{
              width: '100%', height: '200px', overflow: 'hidden',
              borderRadius: '4px', marginBottom: '20px',
            }}>
              <img
                src={project.imageUrl} alt={project.title}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  filter: hovered===i ? 'brightness(0.7) contrast(1.1)' : 'brightness(0.9) contrast(1.05) sepia(0.1)',
                  transform: hovered===i ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.5s ease',
                }}
              />
            </div>

            {/* Category */}
            <motion.p 
              animate={{ color: hovered===i ? 'rgba(232,230,225,0.4)' : 'rgba(17,17,16,0.35)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: '"DM Mono", monospace', fontSize: '8px',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                marginBottom: '8px',
              }}>{project.category}</motion.p>

            {/* Title */}
            <motion.h2 
              animate={{ color: hovered===i ? '#e8e6e1' : '#111110' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: '"Bebas Neue", cursive', fontSize: '28px',
                lineHeight: 1.1, letterSpacing: '0.04em',
                marginBottom: '12px',
              }}>{project.title}</motion.h2>

            {/* Desc */}
            <motion.p 
              animate={{ color: hovered===i ? 'rgba(232,230,225,0.55)' : 'rgba(17,17,16,0.55)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: '"DM Sans", sans-serif', fontSize: '13px',
                lineHeight: 1.65, marginBottom: '20px',
              }}>{project.desc}</motion.p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
              {project.tags.map(t => (
                <motion.span 
                  key={t}
                  animate={{ 
                    borderColor: hovered===i ? 'rgba(232,230,225,0.2)' : 'rgba(17,17,16,0.15)',
                    color: hovered===i ? 'rgba(232,230,225,0.6)' : 'rgba(17,17,16,0.5)'
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: '"DM Mono", monospace', fontSize: '8px',
                    padding: '4px 10px',
                    border: '1px solid',
                    borderRadius: '100px', letterSpacing: '0.1em',
                  }}>{t}</motion.span>
              ))}
            </div>

            {/* Link */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  animate={{ 
                    color: hovered===i ? '#e8e6e1' : '#111110',
                    borderBottomColor: hovered===i ? 'rgba(232,230,225,0.4)' : 'rgba(17,17,16,0.3)'
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: '"DM Mono", monospace', fontSize: '9px',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderBottom: '1px solid',
                    paddingBottom: '2px',
                  }}
                >
                  View Live ↗
                </motion.a>
              )}
              <motion.a
                href={project.gitHubUrl} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                animate={{ 
                  color: hovered===i ? '#e8e6e1' : '#111110',
                  borderBottomColor: hovered===i ? 'rgba(232,230,225,0.4)' : 'rgba(17,17,16,0.3)'
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: '"DM Mono", monospace', fontSize: '9px',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderBottom: '1px solid',
                  paddingBottom: '2px',
                }}
              >
                View on GitHub ↗
              </motion.a>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Footer />
    </div>
  )
}