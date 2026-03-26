import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WHATSAPP_LINK } from '../constants'

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
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    if (!isMobileMenuOpen) return
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileMenuOpen])

  // Close menu on Escape key
  useEffect(() => {
    if (!isMobileMenuOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/84 backdrop-blur-2xl shadow-[0_14px_40px_rgba(15,23,42,0.08)] border-b border-white/65'
          : 'bg-white/68 backdrop-blur-2xl shadow-[0_10px_34px_rgba(15,23,42,0.08)] border-b border-white/40'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between sm:h-20">
          <a href="#" className="flex items-center" aria-label="Ir al inicio">
            <img
              src="/brand/Logo-escudo.png"
              alt="BoxKutral"
              className="h-10 w-auto object-contain sm:h-12"
            />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold uppercase tracking-wide text-secondary/78 transition-colors duration-200 hover:text-fire-orange"
              >
                {link.name}
              </a>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fire text-sm py-3 px-6"
            >
              Únete Ahora
            </a>
          </div>

          <button
            className="p-2 text-secondary lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-primary/10 bg-secondary/98 backdrop-blur-md lg:hidden"
          >
            <div className="space-y-4 px-4 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block py-2 text-lg font-medium uppercase tracking-wide text-primary/80 transition-colors duration-200 hover:text-fire-orange"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fire mt-4 w-full justify-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Únete Ahora
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
