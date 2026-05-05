import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FREE_CLASS_LINK } from '../constants'
import EmberParticles from './EmberParticles'
import { WhatsAppIcon } from './icons'

export default function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contacto" className="relative overflow-hidden gradient-cta py-24 lg:py-32">
      <EmberParticles count={12} />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-1/4 h-32 w-32 rounded-full border border-fire-orange/10" />
        <div className="absolute bottom-1/4 right-10 h-48 w-48 rounded-full border border-fire-orange/10" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-fire-orange/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-fire-red/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-8"
        >
          <h2 className="font-heading text-4xl leading-tight text-primary sm:text-5xl lg:text-7xl">
            ¿LISTO PARA
            <br />
            <span className="gradient-fire-text">ENCENDERTE?</span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-primary/70 sm:text-xl"
          >
            Tu primera clase es gratis. Sin compromiso, sin matrícula. Solo ven y entrena.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="pt-4"
          >
            <a
              href={FREE_CLASS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-xl bg-primary px-10 py-5 text-lg font-bold uppercase tracking-wide text-secondary transition-all duration-300 hover:scale-105 hover:bg-fire-orange hover:text-primary hover:shadow-2xl hover:shadow-fire-orange/30"
            >
              <WhatsAppIcon className="h-6 w-6" />
              Agenda tu clase gratis
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-primary/40"
          >
            <div className="flex items-center gap-2">
              <FireIcon />
              <span>Respuesta rápida</span>
            </div>
            <div className="flex items-center gap-2">
              <FireIcon />
              <span>Primera clase GRATIS</span>
            </div>
            <div className="flex items-center gap-2">
              <FireIcon />
              <span>Sin compromiso</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function FireIcon() {
  return (
    <svg className="h-4 w-4 text-fire-orange" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
    </svg>
  )
}
