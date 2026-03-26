import { motion } from 'framer-motion'
import { WHATSAPP_LINK, createWhatsAppLink } from '../constants'
import EmberParticles from './EmberParticles'

const FREE_CLASS_LINK = createWhatsAppLink('Hola BoxKutral! Quiero agendar mi clase de prueba gratis 🔥')

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden gradient-hero">
      <EmberParticles count={15} />

      {/* Decorative blurs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-fire-orange/10 blur-3xl" />
        <div className="absolute -left-20 bottom-20 h-72 w-72 rounded-full bg-fire-red/5 blur-2xl" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fire-orange/5 blur-3xl" />
        <svg className="absolute right-0 top-1/4 h-auto w-1/3 opacity-5" viewBox="0 0 400 400" fill="none">
          <line x1="0" y1="0" x2="400" y2="400" stroke="white" strokeWidth="1" />
          <line x1="100" y1="0" x2="400" y2="300" stroke="white" strokeWidth="1" />
          <line x1="200" y1="0" x2="400" y2="200" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative w-full mx-auto max-w-6xl px-4 py-32 sm:px-6 lg:px-8 lg:py-40 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-fire-orange/30 bg-fire-orange/10 px-4 py-2"
          >
            <span className="h-2 w-2 rounded-full bg-fire-orange animate-pulse-glow" />
            <span className="text-xs font-semibold uppercase tracking-widest text-fire-orange">
              Centro de Alto Rendimiento · Santiago, Chile
            </span>
          </motion.div>

          {/* Main title — Anton font */}
          <h1 className="font-impact leading-[1.05]">
            <span className="block text-5xl text-primary sm:text-6xl lg:text-7xl xl:text-8xl">
              AYUDAMOS A PERSONAS
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
              A SENTIRSE{' '}
              <span className="gradient-fire-text">MÁS FUERTES,</span>
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
              <span className="gradient-fire-text">VERSE MEJOR</span>{' '}
              <span className="text-primary">Y VIVIR</span>
            </span>
            <span className="block text-5xl text-primary sm:text-6xl lg:text-7xl xl:text-8xl">
              CON MÁS ENERGÍA
            </span>
          </h1>

          {/* Disciplines */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-base font-medium tracking-widest text-fire-orange sm:text-lg"
          >
            CrossFit · Halterofilia · Powerbuilding · GAP 2.0 · Endurance
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mx-auto max-w-xl text-lg leading-relaxed text-primary/70 sm:text-xl"
          >
            El fuego que buscabas está aquí. Entrena con propósito y alcanza tu mejor versión.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-center"
          >
            {/* Primary CTA */}
            <a
              href={FREE_CLASS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-fire-orange to-fire-red px-8 py-5 text-base font-bold uppercase tracking-wide text-white shadow-[0_0_40px_rgba(255,107,0,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(255,107,0,0.5)] sm:text-lg"
            >
              <WhatsAppIcon />
              Agenda tu clase gratis
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Secondary */}
            <a
              href="#disciplinas"
              className="btn-outline px-8 py-4 text-base sm:text-lg"
            >
              Ver disciplinas
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-primary/40"
          >
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-fire-orange" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Sin compromiso
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-fire-orange" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Respuesta inmediata
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-fire-orange" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Todos los niveles
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#disciplinas"
          className="flex flex-col items-center gap-2 text-primary/40 transition-colors hover:text-fire-orange"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </a>
      </motion.div>
    </section>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
