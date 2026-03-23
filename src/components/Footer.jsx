import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { useLoader } from '../context/LoaderContext'

/* ── SR Logo ── */
function SRLogo({ size = 92 }) {
  return (
    <svg viewBox="0 0 130 130" width={size} height={size} fill="none">
      <path
        d="M58 22 A28 22 0 0 0 14 44 A28 22 0 0 1 58 66 A28 22 0 0 1 14 88"
        fill="none" stroke="#e8e6e1" strokeWidth="8" strokeLinecap="round"
      />
      <line x1="74" y1="22" x2="74" y2="110"
        stroke="#e8e6e1" strokeWidth="8" strokeLinecap="round" />
      <path
        d="M74 22 Q104 22 104 44 Q104 66 74 66"
        fill="none" stroke="#e8e6e1" strokeWidth="8" strokeLinecap="round"
      />
      <line x1="74" y1="66" x2="104" y2="110"
        stroke="#e8e6e1" strokeWidth="8" strokeLinecap="round" />
    </svg>
  )
}

/* ── Icons ── */
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
)
const AboutIcon = () => (
  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
)
const ProjectsIcon = () => (
  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
)
const ContactIcon = () => (
  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.654 1.653.243 2.874.12 3.176.77.84 1.233 1.911 1.233 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.516 2.497 5.783 2.225 7.15 2.163 8.416 2.105 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.053.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.856.601 3.698 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 1.856-.085 3.698-.601 5.038-1.942 1.341-1.34 1.857-3.182 1.942-5.038C23.986 15.668 24 15.259 24 12c0-3.259-.014-3.667-.072-4.947-.085-1.857-.601-3.699-1.942-5.04C20.646.673 18.804.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
)

const pages = [
  { label: 'Home',     href: '#hero',     Icon: HomeIcon     },
  { label: 'About',    href: '#about',    Icon: AboutIcon    },
  { label: 'Projects', href: '#projects', Icon: ProjectsIcon },
  { label: 'Contact',  href: '#contact',  Icon: ContactIcon  },
]

const socials = [
  { label: 'GitHub',    href: 'https://github.com/Siddh7-ai',                Icon: GitHubIcon    },
  { label: 'LinkedIn',  href: 'https://linkedin.com/in/siddharthsinhraulji', Icon: LinkedInIcon  },
  { label: 'Instagram', href: 'https://instagram.com/siddh7_',               Icon: InstagramIcon },
]

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}
const logoVariants = {
  hidden:  { opacity: 0, scale: 0.7, rotate: -8 },
  visible: { opacity: 1, scale: 1, rotate: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

export default function Footer() {
  const { triggerLoader } = useLoader()

  const handleNav = useCallback((e, href) => {
    e.preventDefault()
    const id = href.replace('#','')
    triggerLoader(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      else window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }, [triggerLoader])

  return (
    <footer
      className="bg-[#0a0a0a] text-white flex flex-col justify-between px-6 pt-10 pb-6"
      style={{
        position: 'relative',
        zIndex: 0,
        height: '45vh',
        pointerEvents: 'all',
      }}
    >
        <motion.div
            className="flex flex-col justify-between flex-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={containerVariants}
          >

            {/* ── Top row: Logo | Pages | Socials ── */}
            <div className="max-w-6xl mx-auto w-full flex items-start justify-between gap-10">

              {/* SR mark */}
              <motion.div className="flex-1" variants={logoVariants}>
                <motion.p
                  variants={itemVariants}
                  className="font-mono text-[13px] tracking-[0.3em] uppercase text-white/25 mb-5"
                >
                  — Portfolio
                </motion.p>
                <SRLogo size={92} />
              </motion.div>

              {/* Pages column */}
              <motion.div variants={itemVariants} className="pt-1 min-w-[110px]">
                <p className="font-mono text-[13px] tracking-[0.25em] uppercase text-white/30 mb-4">
                  Pages
                </p>
                <ul className="space-y-3">
                  {pages.map(p => (
                    <motion.li key={p.label} variants={itemVariants}>
                      <a
                        href={p.href}
                        onClick={(e) => handleNav(e, p.href)}
                        className="group flex items-center gap-2 font-mono text-[14px] tracking-widest uppercase text-white/45 hover:text-white transition-colors duration-200 cursor-pointer"
                      >
                        <span className="text-white/30 group-hover:text-white transition-colors duration-200 flex-shrink-0">
                          <p.Icon />
                        </span>
                        <span className="block w-2.5 h-px bg-white/20 group-hover:w-4 group-hover:bg-white transition-all duration-300" />
                        {p.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Socials column */}
              <motion.div variants={itemVariants} className="pt-1 min-w-[110px]">
                <p className="font-mono text-[13px] tracking-[0.25em] uppercase text-white/30 mb-4">
                  Socials
                </p>
                <ul className="space-y-3">
                  {socials.map(s => (
                    <motion.li key={s.label} variants={itemVariants}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 font-mono text-[14px] tracking-widest uppercase text-white/45 hover:text-white transition-colors duration-200"
                      >
                        <span className="text-white/30 group-hover:text-white transition-colors duration-200 flex-shrink-0">
                          <s.Icon />
                        </span>
                        <span className="block w-2.5 h-px bg-white/20 group-hover:w-4 group-hover:bg-white transition-all duration-300" />
                        {s.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

            </div>

            {/* ── Divider ── */}
            <motion.div
              variants={itemVariants}
              className="max-w-6xl mx-auto w-full border-t border-white/8 my-6"
            />

            {/* ── Bottom strip ── */}
            <motion.div
              variants={itemVariants}
              className="max-w-6xl mx-auto w-full flex items-center justify-between flex-wrap gap-3"
            >
              <span className="font-mono text-[13px] tracking-widest uppercase text-white/25">
                © 2025 Siddharthsinh Raulji
              </span>
              <span className="font-mono text-[13px] tracking-widest uppercase text-white/25">
                Vadodara · Gujarat · India
              </span>
              <span className="font-mono text-[13px] tracking-widest uppercase text-white/25">
                Designed &amp; Built with precision
              </span>
            </motion.div>

          </motion.div>

    </footer>
  )
}