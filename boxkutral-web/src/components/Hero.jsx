import { motion, useReducedMotion } from 'framer-motion'
import { FREE_CLASS_LINK } from '../constants'
import EmberParticles from './EmberParticles'
import { WhatsAppIcon } from './icons'

const trustItems = [
  'Sin compromiso',
  'Respuesta inmediata',
  'Todos los niveles',
]

export default function Hero() {
  const prefersReduced = useReducedMotion()

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: prefersReduced ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: prefersReduced ? 0 : 0.45, ease: 'easeOut' },
  })

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-x-hidden gradient-hero">
      <EmberParticles count={8} />

      {/* Decorative blurs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-fire-orange/8 blur-2xl" />
        <div className="absolute -left-16 bottom-20 h-56 w-56 rounded-full bg-fire-red/5 blur-2xl" />
        <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fire-orange/4 blur-3xl" />
        <svg className="absolute right-0 top-1/4 h-auto w-1/3 opacity-5" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <line x1="0" y1="0" x2="400" y2="400" stroke="white" strokeWidth="1" />
          <line x1="100" y1="0" x2="400" y2="300" stroke="white" strokeWidth="1" />
          <line x1="200" y1="0" x2="400" y2="200" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative w-full mx-auto max-w-6xl px-4 pt-28 pb-20 sm:px-6 lg:px-8 lg:pt-32 lg:pb-24 text-center">
        <motion.div {...fade()} className="space-y-8">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05, duration: prefersReduced ? 0 : 0.3 }}
            className="inline-flex items-center gap-2 rounded-full border border-fire-orange/30 bg-fire-orange/10 px-4 py-2"
          >
            <span className="h-2 w-2 rounded-full bg-fire-orange animate-pulse-glow" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-widest text-fire-orange">
              Centro de Alto Rendimiento · Santiago, Chile
            </span>
          </motion.div>

          {/* Main title */}
          <h1 className="font-impact leading-[1.05]">
            <span className="block text-5xl text-primary sm:text-6xl lg:text-7xl xl:text-8xl">
              TU MEJOR VERSIÓN
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
              <span className="gradient-fire-text">EMPIEZA AQUÍ</span>
            </span>
          </h1>

          {/* Disciplines */}
          <motion.p
            {...fade(0.2)}
            className="text-base font-medium tracking-widest text-fire-orange sm:text-lg"
          >
            Powerbuilding · Halterofilia · CrossFit · Endurance · GAP
          </motion.p>

          {/* Subtitle */}
          <motion.p
            {...fade(0.3)}
            className="mx-auto max-w-xl text-lg leading-relaxed text-primary/80 sm:text-xl"
          >
            Te ayudamos a sentirte fuerte, verte mejor y vivir con más energía.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            {...fade(0.45)}
            className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-center"
          >
            {/* Primary CTA */}
            <a
              href={FREE_CLASS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-fire-orange to-fire-red px-8 py-4 text-base font-bold uppercase tracking-wide text-white shadow-[0_0_40px_rgba(255,107,0,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(255,107,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-orange focus-visible:ring-offset-2 focus-visible:ring-offset-secondary sm:text-lg"
            >
              <WhatsAppIcon />
              Agenda tu clase gratis
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Secondary */}
            <a
              href="#disciplinas"
              className="btn-outline px-8 py-4 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-orange focus-visible:ring-offset-2 focus-visible:ring-offset-secondary sm:text-lg"
            >
              Ver disciplinas
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            {...fade(0.6)}
            className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-primary/60"
          >
            {trustItems.map((label) => (
              <span key={label} className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-fire-orange" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {label}
              </span>
            ))}
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: prefersReduced ? 0 : 1.2, duration: prefersReduced ? 0 : 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#disciplinas"
          aria-label="Ir a disciplinas"
          className="flex flex-col items-center gap-2 text-primary/40 transition-colors hover:text-fire-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-orange focus-visible:rounded"
        >
          <span className="text-xs uppercase tracking-widest" aria-hidden="true">Scroll</span>
          <motion.div
            animate={prefersReduced ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </a>
      </motion.div>
    </section>
  )
}
