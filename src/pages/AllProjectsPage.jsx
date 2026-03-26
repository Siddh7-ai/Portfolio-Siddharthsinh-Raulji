import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLoader } from '../context/LoaderContext'
import Navbar from '../components/Navbar'

const allProjects = [
  {
    number: '01',
    title: 'PhishGuard AI',
    category: 'Full Stack · Security · ML Model',
    desc: 'Engineered an AI-powered phishing detection system that analyzes URLs and web content in real time to identify malicious websites. Integrated a browser extension that delivers instant alerts and actively protects users during browsing, improving overall web security and threat awareness.',
    tags: ['React', 'JavaScript', 'Python', 'Machine Learning', 'Browser Extension'],
    imageUrl: '/projects/project-01.png',
    liveUrl: 'https://phish-guard-ai-lac.vercel.app/',
    demoUrl: 'https://github.com/Siddh7-ai/PhishGuardAi',
  },

  {
    number: '02',
    title: 'AxCrypt',
    category: 'Cybersecurity · Python',
    desc: 'Built a secure file encryption system with time-based access control and automatic re-encryption to ensure data confidentiality. Designed a modular architecture with GUI support, enabling controlled file sharing, user management, and secure handling of sensitive data.',
    tags: ['Python', 'Cryptography', 'File Encryption'],
    imageUrl: '/projects/project-02.png',
    demoUrl: 'https://github.com/Siddh7-ai/AxCrypt',
  },

  {
    number: '03',
    title: 'EduLearn',
    category: 'EdTech · AI-Based Learning Platform',
    desc: 'Developed an AI-driven learning platform that personalizes study materials based on student performance and progress. Implemented smart recommendations, analytics tracking, and goal-based learning features to improve engagement and learning efficiency.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    imageUrl: '/projects/project-03.png',
    demoUrl: 'https://github.com/Siddh7-ai/EduLearn',
  },

  {
    number: '04',
    title: 'ShieldNet',
    category: 'Security · Network Protection',
    desc: 'Created an AI-powered WiFi security tool that scans nearby networks and connected devices to detect vulnerabilities such as weak encryption, open networks, and suspicious connections. Generates security scores with actionable insights and provides an interactive dashboard with report generation for easy monitoring.',
    tags: ['Python', 'Flask', 'WiFi Security', 'Network Scanner', 'Cybersecurity', 'REST API'],
    imageUrl: '/projects/project-04.png',
    demoUrl: 'https://github.com/Siddh7-ai/ShieldNet',
  },

  {
    number: '05',
    title: 'CoreInventory',
    category: 'Full Stack · Inventory Management',
    desc: 'Developed a role-based inventory management system to streamline warehouse operations, including product tracking, deliveries, transfers, and stock adjustments. Designed separate interfaces for managers and staff, improving operational efficiency and data visibility.',
    tags: ['React', 'Node.js', 'Prisma', 'Tailwind'],
    imageUrl: '/projects/project-05.png',
    demoUrl: 'https://github.com/Siddh7-ai/CoreInventory/tree/frontend',
  },
];

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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const goHome = useCallback(() => {
    triggerLoader(() => {
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById('projects')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    })
  }, [navigate, triggerLoader])

  return (
    <div style={{
      minHeight: '100vh',
      background: '#e8e6e1',
      fontFamily: '"DM Sans", sans-serif',
    }}>

      {/* ── Real Navbar ── */}
      <Navbar />

      {/* ── Title — padded to clear fixed navbar ── */}
      <div style={{ padding: '100px 40px 40px' }}>
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
            style={{
              background: hovered===i ? '#111110' : '#e8e6e1',
              padding: '32px',
              transition: 'background 0.3s ease',
              cursor: 'none',
            }}
          >
            {/* Number + Year */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: '20px',
            }}>
              <span style={{
                fontFamily: '"Bebas Neue", cursive', fontSize: '48px',
                color: hovered===i ? 'rgba(232,230,225,0.15)' : 'rgba(17,17,16,0.12)',
                lineHeight: 1, transition: 'color 0.3s',
              }}>{project.number}</span>
              <span style={{
                fontFamily: '"DM Mono", monospace', fontSize: '9px',
                letterSpacing: '0.2em', color: hovered===i ? 'rgba(232,230,225,0.3)' : 'rgba(17,17,16,0.3)',
                transition: 'color 0.3s',
              }}>{project.year}</span>
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
            <p style={{
              fontFamily: '"DM Mono", monospace', fontSize: '8px',
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: hovered===i ? 'rgba(232,230,225,0.4)' : 'rgba(17,17,16,0.35)',
              marginBottom: '8px', transition: 'color 0.3s',
            }}>{project.category}</p>

            {/* Title */}
            <h2 style={{
              fontFamily: '"Bebas Neue", cursive', fontSize: '28px',
              color: hovered===i ? '#e8e6e1' : '#111110',
              lineHeight: 1.1, letterSpacing: '0.04em',
              marginBottom: '12px', transition: 'color 0.3s',
            }}>{project.title}</h2>

            {/* Desc */}
            <p style={{
              fontFamily: '"DM Sans", sans-serif', fontSize: '13px',
              color: hovered===i ? 'rgba(232,230,225,0.55)' : 'rgba(17,17,16,0.55)',
              lineHeight: 1.65, marginBottom: '20px', transition: 'color 0.3s',
            }}>{project.desc}</p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
              {project.tags.map(t => (
                <span key={t} style={{
                  fontFamily: '"DM Mono", monospace', fontSize: '8px',
                  padding: '4px 10px',
                  border: `1px solid ${hovered===i ? 'rgba(232,230,225,0.2)' : 'rgba(17,17,16,0.15)'}`,
                  color: hovered===i ? 'rgba(232,230,225,0.6)' : 'rgba(17,17,16,0.5)',
                  borderRadius: '100px', letterSpacing: '0.1em',
                  transition: 'all 0.3s',
                }}>{t}</span>
              ))}
            </div>

            {/* Link */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: '"DM Mono", monospace', fontSize: '9px',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: hovered===i ? '#e8e6e1' : '#111110',
                    textDecoration: 'none',
                    borderBottom: `1px solid ${hovered===i ? 'rgba(232,230,225,0.4)' : 'rgba(17,17,16,0.3)'}`,
                    paddingBottom: '2px', transition: 'all 0.3s',
                  }}
                >
                  View Live ↗
                </a>
              )}
              <a
                href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                style={{
                  fontFamily: '"DM Mono", monospace', fontSize: '9px',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: hovered===i ? '#e8e6e1' : '#111110',
                  textDecoration: 'none',
                  borderBottom: `1px solid ${hovered===i ? 'rgba(232,230,225,0.4)' : 'rgba(17,17,16,0.3)'}`,
                  paddingBottom: '2px', transition: 'all 0.3s',
                }}
              >
                View on GitHub ↗
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Footer strip ── */}
      <div style={{
        padding: '40px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderTop: '1px solid rgba(17,17,16,0.08)',
      }}>
        <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '10px',
          letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(17,17,16,0.25)' }}>
          © 2025 Siddharthsinh Raulji
        </span>
        <button type="button" onClick={goHome} style={{
          fontFamily: '"DM Mono", monospace', fontSize: '10px',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#111110', background: 'transparent', border: 'none', cursor: 'pointer',
          padding: '8px 0', pointerEvents: 'auto',
        }}>
          Back to Portfolio ↖
        </button>
      </div>
    </div>
  )
}