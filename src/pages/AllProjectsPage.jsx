import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLoader } from '../context/LoaderContext'
import Navbar from '../components/Navbar'

const allProjects = [
  {
    number: '01', title: 'PhishGuard Ai', category: 'Full Stack · Security · ML model',
    desc: 'Built an AI-powered phishing detection system to analyze URLs and web content, enabling real-time identification of malicious websites. Developed a browser extension to provide instant alerts and protect users from phishing attacks during web browsing.',
    tags: ['React', 'JavaScript', 'Python', 'Machine Learning', 'Browser Extension'], year: '2025',
    imageUrl: '/projects/project-01.png',
    liveUrl: 'https://phish-guard-ai-lac.vercel.app/',
    demoUrl: 'https://github.com/Siddh7-ai/PhishGuardAi',
  },
  {
    number: '02', title: 'AxCrypt', category: 'Cybersecurity · Python',
    desc: 'Developed a Python-based secure file encryption system with time-controlled access and automatic re-encryption to ensure data confidentiality. Designed a modular application with GUI, secure file sharing, user management, and activity logging for efficient and controlled file operations.',
    tags: ['Python', 'Cryptography', 'File Encryption'], year: '2025',
    imageUrl: '/projects/project-02.png',
    demoUrl: 'https://github.com/Siddh7-ai/AxCrypt',
  },
  {
    number: '03', title: 'EduLearn', category: 'EduTech · AI-Based Learning Platform',
    desc: 'AI-powered learning platform that personalizes study materials based on student performance and progress. Features smart recommendations, analytics dashboard, and goal tracking to enhance learning efficiency and outcomes.',
    tags: ['HTML', 'CSS', 'JavaScript'], year: '2025',
    imageUrl: '/projects/project-03.png',
    demoUrl: 'https://github.com/Siddh7-ai/EduLearn',
  },
  {
    number: '04', title: 'ShieldNet', category: 'Security · Encryption',
    desc: 'ShieldNet is an AI-powered home WiFi security tool that scans nearby networks and connected devices to find common vulnerabilities like open WiFi, weak encryption, WPS risks, and suspicious devices. It calculates a clear security score with grade-based insights, then gives personalized recommendations so non-technical users can improve their network safety quickly. The project includes a Flask backend, interactive web dashboard, and PDF report generation for easy monitoring and sharing of home network security status.',
    tags: ['Python', 'Flask', 'WiFi Security', 'Network Scanner', 'Cybersecurity', 'Vulnerability Assessment', 'REST API', 'ReportLab'], year: '2025',
    imageUrl: '/projects/project-04.png',
    demoUrl: 'https://github.com/Siddh7-ai/ShieldNet',
  },
  {
    number: '05', title: 'CoreInventory', category: 'Productivity · UI/UX · Full Stack · Delivery Management',
    desc: 'CoreInventory is a role-based warehouse inventory management dashboard built with React, Vite, and Tailwind CSS, featuring Manager and Staff views for tracking products, receipts, deliveries, transfers, and stock adjustments.',
    tags: ['React', 'Node.js', 'Prisma', 'Tailwind'], year: '2025',
    imageUrl: '/projects/project-05.png',
    demoUrl: 'https://github.com/Siddh7-ai/CoreInventory/tree/frontend',
  },
]

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