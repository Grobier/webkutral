import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import EmberParticles from './EmberParticles'
import { WHATSAPP_BASE_LINK } from '../constants'
import { WhatsAppIcon } from './icons'

const services = [
  {
    id: 'kine',
    brand: 'FisioMove',
    category: 'Kinesiología',
    tagline: 'Recupera tu rendimiento, sin pausas innecesarias.',
    color: '#FF6B00',
    emoji: '🦴',
    logo: '/services/fisiomove-logo.png',
    photo: '/services/fisiomove-photo.png',
    whatsapp: `${WHATSAPP_BASE_LINK}?text=${encodeURIComponent('Hola! Quiero más información sobre FisioMove en BoxKutral 🦴')}`,
    offerings: [
      { title: 'Evaluación kinesiológica', desc: 'Diagnóstico funcional completo para identificar la raíz de la lesión o limitación.' },
      { title: 'Tratamiento de lesiones', desc: 'Protocolo personalizado con técnicas manuales, ejercicio terapéutico y electroestimulación.' },
      { title: 'Reintegro deportivo', desc: 'Retorno progresivo al entrenamiento con criterios funcionales y de rendimiento.' },
      { title: 'Recovery', desc: 'Sesiones de recuperación activa para deportistas: movilidad, descompresión y regeneración.' },
    ],
  },
  {
    id: 'nut',
    brand: 'NutSport',
    category: 'Nutrición',
    tagline: 'Come mejor, rinde más, cambia tu cuerpo.',
    color: '#2ECC71',
    emoji: '🥗',
    logo: '/services/nutsport-logo.png',
    photo: '/services/nutsport-photo.jpg',
    whatsapp: `${WHATSAPP_BASE_LINK}?text=${encodeURIComponent('Hola! Quiero más información sobre NutSport en BoxKutral 🥗')}`,
    offerings: [
      { title: 'Evaluación antropométrica deportiva', desc: 'Medición de composición corporal (masa muscular, grasa, agua) para trazar objetivos reales.' },
      { title: 'Pauta de alimentación', desc: 'Plan nutricional adaptado a tu disciplina, horario de entrenamiento y estilo de vida.' },
    ],
  },
]

function ServiceLogo({ src, name, color }) {
  const [error, setError] = useState(false)
  if (!src || error) {
    return <span className="text-xl font-bold" style={{ color }}>{name}</span>
  }
  return (
    <img src={src} alt={name} className="h-14 w-auto object-contain" onError={() => setError(true)} />
  )
}

function ServicePhoto({ src, name }) {
  const [error, setError] = useState(false)
  if (!src || error) {
    return <div className="flex h-full items-center justify-center text-6xl opacity-20">📷</div>
  }
  return (
    <img
      src={src}
      alt={name}
      className="h-full w-full object-cover object-top"
      onError={() => setError(true)}
    />
  )
}

function ServiceModal({ service, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: 'spring', damping: 26, stiffness: 280 }}
        className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 bg-secondary shadow-2xl"
      >
        {/* Photo header */}
        <div className="relative h-56 w-full sm:h-72" style={{ background: `${service.color}10` }}>
          <ServicePhoto src={service.photo} name={service.brand} />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent" />

          {/* Close */}
          <button
            ref={closeRef}
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-black/40 p-2 text-white/70 backdrop-blur-sm transition hover:bg-black/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-fire-orange"
            aria-label="Cerrar"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Category badge */}
          <div className="absolute left-5 top-5">
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white"
              style={{ backgroundColor: `${service.color}90` }}
            >
              {service.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 pb-8 pt-4 sm:px-8">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <ServiceLogo src={service.logo} name={service.brand} color={service.color} />
              <p id="service-modal-title" className="mt-1 text-sm text-primary/50">{service.tagline}</p>
            </div>
          </div>

          <ul className="mb-6 space-y-4">
            {service.offerings.map((item) => (
              <li key={item.title} className="flex gap-3">
                <div
                  className="mt-1 h-4 w-4 shrink-0 rounded-full"
                  style={{ backgroundColor: `${service.color}30`, boxShadow: `0 0 6px ${service.color}60` }}
                >
                  <div className="m-auto mt-[5px] h-1.5 w-1.5 translate-y-[-3px] rounded-full" style={{ backgroundColor: service.color }} />
                </div>
                <div>
                  <p className="font-semibold text-primary">{item.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-primary/55">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <a
            href={service.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-fire-orange"
            style={{
              background: `linear-gradient(135deg, ${service.color}, ${service.color}aa)`,
              boxShadow: `0 0 28px ${service.color}30`,
            }}
          >
            <WhatsAppIcon className="h-5 w-5" />
            Consultar por {service.brand}
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function ServiceCard({ service, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left transition-colors duration-300 hover:border-white/20 hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-fire-orange"
    >
      {/* Color glow on hover */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse at top left, ${service.color}15, transparent 60%)` }}
      />

      <div className="relative p-7">
        {/* Icon + category */}
        <div className="mb-4 flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl text-xl"
            style={{ background: `linear-gradient(135deg, ${service.color}, ${service.color}99)` }}
          >
            {service.emoji}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: service.color }}>
              {service.category}
            </p>
            <p className="font-heading text-2xl text-primary">{service.brand}</p>
          </div>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-primary/55">{service.tagline}</p>

        {/* Offerings preview */}
        <ul className="mb-6 space-y-1.5">
          {service.offerings.map((item) => (
            <li key={item.title} className="flex items-center gap-2 text-sm text-primary/70">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: service.color }} />
              {item.title}
            </li>
          ))}
        </ul>

        {/* Ver más */}
        <span
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group-hover:gap-2.5"
          style={{ color: service.color }}
        >
          Ver más
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </motion.button>
  )
}

export default function Services() {
  const [selected, setSelected] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="servicios" className="relative bg-secondary py-24 lg:py-32 overflow-hidden">
      <EmberParticles count={10} />

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-fire-orange/15 blur-[120px]" />
        <div className="absolute -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-fire-red/20 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-fire-orange">
            Servicios complementarios
          </span>
          <h2 className="mt-4 font-heading text-4xl text-primary sm:text-5xl lg:text-6xl">
            MÁS QUE ENTRENAMIENTO
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary/60">
            Alianzas con especialistas de salud y rendimiento para que tu progreso sea completo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} onClick={() => setSelected(service)} />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <ServiceModal service={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
