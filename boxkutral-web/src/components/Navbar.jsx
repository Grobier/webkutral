import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FREE_CLASS_LINK } from '../constants'

const navLinks = [
  { name: 'Disciplinas', href: '#disciplinas' },
  { name: 'Coaches', href: '#profesores' },
  { name: 'Horarios', href: '#horarios' },
  { name: 'Planes', href: '#planes' },
  { name: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const navRef = useRef(null)

  // Scroll state + active section tracker
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)

      const sections = navLinks.map((l) => l.href.replace('#', ''))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id)
          return
        }
      }
      setActiveSection('')
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close on outside click
  useEffect(() => {
    if (!isMobileMenuOpen) return
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target))
        setIsMobileMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isMobileMenuOpen])

  // Close on Escape
  useEffect(() => {
    if (!isMobileMenuOpen) return
    const handler = (e) => { if (e.key === 'Escape') setIsMobileMenuOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isMobileMenuOpen])

  return (
    <header ref={navRef} className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:px-6">
      {/* Floating pill nav */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`w-full max-w-6xl transition-all duration-500 ${
          isScrolled
            ? 'rounded-2xl border border-white/10 bg-secondary/90 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl'
            : 'rounded-2xl border border-white/5 bg-secondary/20 backdrop-blur-md'
        }`}
      >
        <div className="flex h-20 items-center justify-between px-5 sm:px-6">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3 shrink-0" aria-label="Ir al inicio">
            <img
              src="/brand/Logo-escudo.png"
              alt="BoxKutral"
              className="h-16 w-auto object-contain"
            />
            <span className="hidden font-heading text-3xl text-white sm:block">
              BOXKUTRAL
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '')
              const isActive = activeSection === sectionId
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 rounded-xl ${
                    isActive
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-xl bg-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={FREE_CLASS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fire py-2.5 px-5 text-sm"
            >
              Clase Gratis
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-white/8 lg:hidden"
            >
              <div className="space-y-1 px-4 py-4">
                {navLinks.map((link) => {
                  const sectionId = link.href.replace('#', '')
                  const isActive = activeSection === sectionId
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium uppercase tracking-wide transition-colors ${
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-white/60 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-fire-orange" />
                      )}
                      {link.name}
                    </a>
                  )
                })}
                <div className="pt-2">
                  <a
                    href={FREE_CLASS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-fire w-full justify-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Clase Gratis
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  )
}
