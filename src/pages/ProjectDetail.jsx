import { useEffect, useLayoutEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLoader } from '../context/LoaderContext'
import { projects } from '../data/projects'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { triggerLoader } = useLoader()
  const project = projects.find(p => p.id === id)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!project) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e8e6e1' }}>
        <h1 style={{ fontFamily: '"Bebas Neue", cursive', fontSize: '48px' }}>Project Not Found</h1>
        <Link to="/projects" style={{ marginLeft: '20px', fontFamily: '"DM Mono", monospace' }}>Back to Vault</Link>
      </div>
    )
  }

  const handleBack = () => {
    triggerLoader(() => navigate('/projects'), 'magic')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#e8e6e1', color: '#111110', fontFamily: '"DM Sans", sans-serif' }}>
      
      <main style={{ padding: '120px 40px 60px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Breadcrumbs */}
        <Breadcrumbs items={[
          { label: 'Home', path: '/' },
          { label: 'Projects', path: '/projects' },
          { label: project.title }
        ]} />

        {/* Header Section with Logo */}
        <div style={{ marginBottom: '80px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', flexWrap: 'wrap' }}
          >
            {/* Project Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                width: '120px', 
                height: '120px', 
                overflow: 'hidden', 
                borderRadius: '16px', 
                flexShrink: 0,
                boxShadow: '0 12px 24px rgba(0,0,0,0.1)', 
                border: '1px solid rgba(0,0,0,0.05)',
                background: '#fff'
              }}
            >
              <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>

            {/* Title & Metadata */}
            <div style={{ flex: 1, minWidth: '300px' }}>
              <p style={{ fontFamily: '"DM Mono", monospace', fontSize: '12px', letterSpacing: '0.3em', color: 'rgba(17,17,16,0.4)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Project {project.number} — {project.year}
              </p>
              <h1 style={{ fontFamily: '"Bebas Neue", cursive', fontSize: 'clamp(32px, 6vw, 64px)', lineHeight: 0.9, letterSpacing: '0.01em', marginBottom: '16px' }}>
                {project.title.toUpperCase()}
              </h1>
              <p style={{ fontFamily: '"DM Mono", monospace', fontSize: '14px', color: 'rgba(17,17,16,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {project.category}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', marginBottom: '100px' }}>
          {/* Description */}
          <div style={{ maxWidth: '600px' }}>
            <h3 style={{ fontFamily: '"Bebas Neue", cursive', fontSize: '32px', marginBottom: '24px' }}>Overview</h3>
            <p style={{ fontSize: '18px', lineHeight: 1.8, color: 'rgba(17,17,16,0.8)', marginBottom: '32px', whiteSpace: 'pre-line' }}>
              {project.detailedDesc}
            </p>
            
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '12px 24px', background: '#111110', color: '#e8e6e1', textDecoration: 'none', fontFamily: '"DM Mono", monospace', fontSize: '12px', borderRadius: '4px', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  VIEW LIVE PROJECT ↗
                </a>
              )}
              {project.gitHubUrl && (
                <a href={project.gitHubUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '12px 24px', border: '1px solid #111110', color: '#111110', textDecoration: 'none', fontFamily: '"DM Mono", monospace', fontSize: '12px', borderRadius: '4px', transition: 'background 0.2s, color 0.2s' }} onMouseEnter={e => {e.currentTarget.style.background = '#111110'; e.currentTarget.style.color = '#e8e6e1'}} onMouseLeave={e => {e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#111110'}}>
                  GITHUB REPOSITORY ↗
                </a>
              )}
            </div>
          </div>

          {/* Details Sidebar */}
          <div>
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontFamily: '"Bebas Neue", cursive', fontSize: '24px', marginBottom: '16px', borderBottom: '1px solid rgba(17,17,16,0.1)', paddingBottom: '8px' }}>Technologies</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{ fontFamily: '"DM Mono", monospace', fontSize: '11px', padding: '6px 12px', background: 'rgba(17,17,16,0.05)', borderRadius: '100px', color: 'rgba(17,17,16,0.7)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 style={{ fontFamily: '"Bebas Neue", cursive', fontSize: '24px', marginBottom: '16px', borderBottom: '1px solid rgba(17,17,16,0.1)', paddingBottom: '8px' }}>Key Roles</h3>
              <p style={{ fontFamily: '"DM Mono", monospace', fontSize: '13px', color: 'rgba(17,17,16,0.6)', lineHeight: 1.6 }}>
                • UI/UX Design<br />
                • Full-Stack Development<br />
                • Performance Optimization<br />
                • Security Implementation
              </p>
            </div>
          </div>
        </div>

        {/* Additional Images Carousel Section */}
        {project.images && project.images.length > 1 && (
          <div style={{ marginBottom: '100px' }}>
             <h3 style={{ fontFamily: '"Bebas Neue", cursive', fontSize: '32px', marginBottom: '40px', textAlign: 'center' }}>Project Gallery</h3>
             
             <ProjectCarousel images={project.images.slice(1)} />
          </div>
        )}

        {/* Footer Navigation */}
        <div style={{ borderTop: '1px solid rgba(17,17,16,0.1)', paddingTop: '60px', display: 'flex', justifyContent: 'center' }}>
          <button 
            onClick={handleBack}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              fontFamily: '"Bebas Neue", cursive', 
              fontSize: '24px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'gap 0.3s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.gap = '20px'}
            onMouseLeave={e => e.currentTarget.style.gap = '12px'}
          >
            ← BACK TO PROJECT VAULT
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function ProjectCarousel({ images }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  // Auto-play: move to next image every 3 seconds
  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      paginate(1)
    }, 3000)
    return () => clearInterval(timer)
  }, [index, images.length])

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95
    })
  }

  const paginate = (newDirection) => {
    setDirection(newDirection)
    setIndex((prev) => (prev + newDirection + images.length) % images.length)
  }

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        aspectRatio: '16/9', 
        overflow: 'hidden', 
        borderRadius: '16px', 
        boxShadow: '0 40px 80px rgba(0,0,0,0.15)', 
        border: '1px solid rgba(17,17,16,0.05)',
        background: 'rgba(0,0,0,0.02)'
      }}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={index}
            src={images[index]}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) > 50 ? (offset.x > 0 ? -1 : 1) : 0
              if (swipe !== 0) paginate(swipe)
            }}
            style={{ 
              position: 'absolute', 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              cursor: 'grab' 
            }}
          />
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <motion.button 
            whileHover={{ x: -5, opacity: 1 }}
            onClick={() => paginate(-1)}
            style={{ 
              position: 'absolute', 
              left: '-80px', 
              top: 'calc(50% - 20px)', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              opacity: 0.4, 
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </motion.button>
          <motion.button 
            whileHover={{ x: 5, opacity: 1 }}
            onClick={() => paginate(1)}
            style={{ 
              position: 'absolute', 
              right: '-80px', 
              top: 'calc(50% - 20px)', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              opacity: 0.4, 
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </motion.button>
        </>
      )}

      {/* Pagination Controls */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '12px', 
        marginTop: '40px' 
      }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
            style={{ 
              width: i === index ? '32px' : '8px', 
              height: '8px', 
              borderRadius: '4px', 
              background: i === index ? '#111' : 'rgba(17,17,16,0.15)', 
              border: 'none', 
              cursor: 'pointer', 
              padding: 0,
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' 
            }}
          />
        ))}
      </div>
    </div>
  )
}
