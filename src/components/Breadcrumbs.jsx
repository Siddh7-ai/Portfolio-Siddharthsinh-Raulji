import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLoader } from '../context/LoaderContext'

export default function Breadcrumbs({ items }) {
  const navigate = useNavigate()
  const { triggerLoader } = useLoader()

  const handleNav = (e, item) => {
    e.preventDefault()
    if (!item.path) return

    // Trigger appropriate loader based on destination
    const type = item.path === '/' ? 'default' : 'magic'
    const loadingText = item.path === '/projects' ? 'Accessing Vault' : ''
    
    triggerLoader(() => navigate(item.path), type, loadingText)
  }

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '24px',
        fontFamily: '"DM Mono", monospace',
        fontSize: '11px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase'
      }}
    >
      {items.map((item, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {item.path ? (
            <motion.button
              onClick={(e) => handleNav(e, item)}
              whileHover={{ opacity: 1 }}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'none', // Use custom cursor
                color: 'rgba(17, 17, 16, 0.4)',
                textDecoration: 'none',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                letterSpacing: 'inherit',
                textTransform: 'inherit',
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.color = 'rgba(17, 17, 16, 0.8)'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(17, 17, 16, 0.4)'}
            >
              {item.label}
            </motion.button>
          ) : (
            <span style={{
              color: '#6366f1', // Vibrant Indigo/Purple (reverted by user)
              textShadow: '0 0 10px rgba(99, 102, 241, 0.3)',
              fontWeight: '500'
            }}>
              {item.label}
            </span>
          )}
          
          {index < items.length - 1 && (
            <span style={{ color: 'rgba(17, 17, 16, 0.2)' }}>&gt;</span>
          )}
        </div>
      ))}
    </motion.nav>
  )
}
