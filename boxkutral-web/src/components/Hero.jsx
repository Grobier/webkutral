import { motion } from 'framer-motion'
import { WHATSAPP_LINK } from '../constants'
import EmberParticles from './EmberParticles'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden gradient-hero">
      <EmberParticles count={15} />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-fire-orange/10 blur-3xl" />
        <div className="absolute -left-20 bottom-20 h-72 w-72 rounded-full bg-fire-red/5 blur-2xl" />
        <svg className="absolute right-0 top-1/4 h-auto w-1/3 opacity-5" viewBox="0 0 400 400" fill="none">
          <line x1="0" y1="0" x2="400" y2="400" stroke="white" strokeWidth="1" />
          <line x1="100" y1="0" x2="400" y2="300" stroke="white" strokeWidth="1" />
          <line x1="200" y1="0" x2="400" y2="200" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 lg:py-40">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            <h1 className="font-heading text-6xl leading-none sm:text-7xl lg:text-8xl xl:text-9xl">
              <span className="text-primary">ENCIENDE</span>
              <br />
              <span className="text-primary">TU </span>
              <span className="gradient-fire-text">POTENCIAL</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg font-medium tracking-wide text-fire-orange sm:text-xl"
            >
              CrossFit · Halterofilia · Powerbuilding · GAP 2.0 · Endurance
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-2xl text-lg leading-relaxed text-primary/70 sm:text-xl"
            >
              El fuego que buscabas está aquí. Centro de entrenamiento de alto rendimiento en
              Santiago, Chile.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col gap-4 pt-4 sm:flex-row"
            >
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fire px-8 py-4 text-lg"
              >
                Únete Ahora
              </a>
              <a href="#disciplinas" className="btn-outline px-8 py-4 text-lg">
                Ver disciplinas ↓
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

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
