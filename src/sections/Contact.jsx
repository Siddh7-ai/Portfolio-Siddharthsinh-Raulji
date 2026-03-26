import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'

// SVG icons — stroke/fill inherit `currentColor` so they match text color exactly
const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-3.5 h-3.5"
    aria-hidden="true"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577
      0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756
      -1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07
      1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332
      -5.466-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0
      1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404
      2.29-1.552 3.297-1.23 3.297-1.23.654 1.653.243 2.874.12 3.176.77.84 1.233 1.911
      1.233 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606
      -.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 21.795 24 17.298 24 12c0
      -6.63-5.37-12-12-12z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-3.5 h-3.5"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853
      0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9
      1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337
      7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063
      2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0
      0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24
      24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-3.5 h-3.5"
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334
      3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646
      .07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308
      3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85
      .07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308
      -.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204
      2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608
      C4.516 2.497 5.783 2.225 7.15 2.163 8.416 2.105 8.796 2.163
      12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.197.157 3.355
      .673 2.014 2.014.673 3.355.157 5.197.072 7.053.014 8.333 0
      8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.856.601 3.698
      1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.333 23.986
      8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 1.856-.085 3.698
      -.601 5.038-1.942 1.341-1.34 1.857-3.182 1.942-5.038C23.986
      15.668 24 15.259 24 12c0-3.259-.014-3.667-.072-4.947-.085-1.857
      -.601-3.699-1.942-5.04C20.646.673 18.804.157 16.948.072 15.668
      .014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162
      6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406
      -11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
)

const SOCIAL_ICONS = { GitHub: GitHubIcon, LinkedIn: LinkedInIcon, Instagram: InstagramIcon }

export default function Contact() {
  const ref = useRef(null)
  const formRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const socials = [
    { name: 'GitHub',    link: 'https://github.com/Siddh7-ai' },
    { name: 'LinkedIn',  link: 'https://linkedin.com/in/siddharthsinhraulji' },
    { name: 'Instagram', link: 'https://instagram.com/siddh7_' },
  ]

    const handleSubmit = async (e) => {
      e.preventDefault()
      setSending(true)
      setError('')

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(form.email)) {
        setError('enter valid mail')
        setSending(false)
        return
      }

      try {
        await emailjs.sendForm(
          'service_d7e772m',    // replace with your EmailJS Service ID
          'template_rx3o3v8',   // replace with your EmailJS Template ID
          formRef.current,
          'kFvHfRNH-JC6RfDXs'     // replace with your EmailJS Public Key
        )
        setSent(true)
        setForm({ name: '', email: '', message: '' })
      } catch (err) {
        setError('Something went wrong. Please try again or email me directly.')
      } finally {
        setSending(false)
      }
    }

  const inputClass = `
    w-full bg-transparent border-b border-ink/20
    font-sans text-[15px] text-ink placeholder:text-ink/30
    py-4 outline-none
    focus:border-ink transition-colors duration-300
  `

  return (
    <section id="contact" className="bg-[#e8e6e1] py-24 px-10 contact-section" style={{ minHeight: "55vh", position: "relative", zIndex: 1 }}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-24 contact-grid" ref={ref}>

        {/* Left */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink/40 mb-6"
          >
            — Let's Talk
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display text-[clamp(52px,7vw,96px)] leading-none text-ink mb-8"
          >
            START A<br />PROJECT
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {[
              { label: 'Gmail',    value: 'siddharthraulji5@gmail.com' },
              { label: 'Location', value: 'Vadodara, Gujarat, India' },
              { label: 'Status',   value: 'Available for freelance' },
            ].map(item => (
              <div key={item.label} className="flex gap-6 border-b border-ink/10 pb-4">
                <span className="font-mono text-[10px] tracking-widest uppercase text-ink/35 w-20 flex-shrink-0 pt-0.5">
                  {item.label}
                </span>
                <span className="font-sans text-[14px] text-ink/70">{item.value}</span>
              </div>
            ))}
          </motion.div>

          {/* Social links — icon + label, colors inherit from page palette */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="flex gap-4 mt-10 contact-socials-container"
          >
            {socials.map(s => {
              const Icon = SOCIAL_ICONS[s.name]
              return (
                <a
                  key={s.name}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-2
                    font-mono text-[10px] tracking-widest uppercase
                    px-4 py-2.5 border border-ink/15
                    text-ink/50 rounded
                    hover:border-ink hover:text-ink
                    transition-all duration-200
                  "
                >
                  {Icon && <Icon />}
                  {s.name}
                </a>
              )
            })}
          </motion.div>
        </div>

        {/* Right – form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {sent ? (
            <div className="h-full flex flex-col items-start justify-center">
              <div className="font-display text-[64px] leading-none text-ink mb-4">SENT ✓</div>
              <p className="font-sans text-[15px] text-ink/55">
                Thanks! I'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 pt-10">
              <div>
                <input
                  className={inputClass}
                  type="text"
                  name="from_name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <input
                  className={inputClass}
                  type="email"
                  name="from_email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <textarea
                  className={inputClass + ' resize-none'}
                  rows={5}
                  name="message"
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>

              {error && (
                <p className="font-mono text-[10px] text-red-500 tracking-wider">{error}</p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="
                  font-mono text-[10px] tracking-[0.2em] uppercase
                  px-8 py-4 bg-ink text-white
                  hover:bg-transparent hover:text-ink
                  border border-ink
                  transition-all duration-300
                  rounded disabled:opacity-40 disabled:cursor-not-allowed
                "
              >
                {sending ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  )
}