import { motion } from 'framer-motion'
import { WHATSAPP_LINK } from '../constants'

/**
 * Hero Component
 * Fullscreen hero with fire gradient and ember particles
 */

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      {/* Ember Particles */}
      <div className="ember-container">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="ember" style={{ bottom: '0' }} />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-fire-orange/10 rounded-full blur-3xl" />
        <div className="absolute -left-20 bottom-20 w-72 h-72 bg-fire-red/5 rounded-full blur-2xl" />

        {/* Geometric Lines */}
        <svg className="absolute right-0 top-1/4 w-1/3 h-auto opacity-5" viewBox="0 0 400 400" fill="none">
          <line x1="0" y1="0" x2="400" y2="400" stroke="white" strokeWidth="1" />
          <line x1="100" y1="0" x2="400" y2="300" stroke="white" strokeWidth="1" />
          <line x1="200" y1="0" x2="400" y2="200" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-4xl">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            {/* Main Headline */}
            <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl xl:text-9xl leading-none">
              <span className="text-primary">ENCIENDE</span>
              <br />
              <span className="text-primary">TU </span>
              <span className="gradient-fire-text">POTENCIAL</span>
            </h1>

            {/* Disciplines */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-fire-orange text-lg sm:text-xl font-medium tracking-wide"
            >
              Crossfit · Halterofilia · Powerbuilding · GAP 2.0 · Endurance
            </motion.p>

            {/* Body Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-primary/70 text-lg sm:text-xl max-w-2xl leading-relaxed"
            >
              El fuego que buscabas está aquí. Centro de entrenamiento de alto
              rendimiento en Santiago, Chile.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fire text-lg py-4 px-8"
              >
                Únete Ahora
              </a>
              <a href="#disciplinas" className="btn-outline text-lg py-4 px-8">
                Ver Disciplinas ↓
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#disciplinas" className="flex flex-col items-center gap-2 text-primary/40 hover:text-fire-orange transition-colors">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </a>
      </motion.div>
    </section>
  )
}
