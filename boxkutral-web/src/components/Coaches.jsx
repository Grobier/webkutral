import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { containerVariants, cardVariants } from '../utils/animations'

const coaches = [
  {
    id: 1,
    name: 'Equipo BoxKutral',
    role: 'Head Coaching · CrossFit y fuerza',
    specialties: ['CrossFit', 'Halterofilia'],
    bio: 'Sesiones guiadas con foco en técnica, intensidad bien dosificada y progresión real para que mejores sin perder consistencia.',
    achievements: [
      'Clases escalables para todos los niveles',
      'Seguimiento técnico en levantamientos',
      'Comunidad competitiva y cercana',
    ],
    metric: 'Fuerza + motor',
    color: '#FF6B00',
    image: null,
  },
  {
    id: 2,
    name: 'Área de rendimiento',
    role: 'Coaching · Powerbuilding y composición corporal',
    specialties: ['Powerbuilding', 'GAP 2.0'],
    bio: 'Bloques orientados a ganar fuerza, construir masa muscular y mejorar composición corporal con una estructura clara y sostenible.',
    achievements: [
      'Planes orientados a objetivos concretos',
      'Énfasis en postura, volumen y ejecución',
      'Trabajo complementario de core y estabilidad',
    ],
    metric: 'Estética + potencia',
    color: '#9B59B6',
    image: null,
  },
  {
    id: 3,
    name: 'Área endurance',
    role: 'Coaching · Resistencia y acondicionamiento',
    specialties: ['Endurance', 'CrossFit'],
    bio: 'Entrenamientos diseñados para mejorar tu capacidad cardiovascular, sostener ritmos altos y desarrollar una base física duradera.',
    achievements: [
      'Bloques AM y PM para distintas rutinas',
      'Trabajo aeróbico y metabólico balanceado',
      'Mejoras medibles en resistencia general',
    ],
    metric: 'Resistencia real',
    color: '#00BCD4',
    image: null,
  },
]

function CoachBadge({ coach }) {
  const initials = coach.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')

  return (
    <div className="relative h-full min-h-[18rem] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-secondary via-secondary to-secondary/90">
      <div
        className="absolute inset-0 opacity-20"
        style={{ background: `radial-gradient(circle at top left, ${coach.color}, transparent 55%)` }}
      />
      <div className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65">
        {coach.metric}
      </div>
      <div className="relative flex h-full flex-col justify-end p-6">
        <div
          className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl text-2xl font-semibold text-white shadow-[0_20px_45px_rgba(0,0,0,0.25)]"
          style={{ background: `linear-gradient(135deg, ${coach.color}, ${coach.color}BB)` }}
        >
          {initials}
        </div>
        <p className="max-w-[15rem] text-sm leading-relaxed text-white/68">
          Coaching enfocado en resultados, adherencia y técnica bien ejecutada.
        </p>
      </div>
    </div>
  )
}

function CoachModal({ coach, isOpen, onClose }) {
  const closeButtonRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    closeButtonRef.current?.focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus() }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus() }
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!coach) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="coach-modal-title"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 z-50 flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-secondary md:inset-10 lg:inset-20"
          >
            <div className="flex items-start justify-between border-b border-primary/10 p-6 md:p-8">
              <div>
                <h2 id="coach-modal-title" className="font-heading text-3xl text-primary md:text-4xl">{coach.name}</h2>
                <p style={{ color: coach.color }} className="mt-1 font-medium">
                  {coach.role}
                </p>
              </div>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="rounded-lg p-2 transition-colors hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-fire-orange"
                aria-label="Cerrar perfil"
              >
                <svg className="h-6 w-6 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="mb-4 font-heading text-xl text-primary">Estilo de coaching</h3>
                  <div className="aspect-video">
                    <CoachBadge coach={coach} />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="mb-3 font-heading text-xl text-primary">Sobre el área</h3>
                    <p className="leading-relaxed text-primary/70">{coach.bio}</p>
                  </div>

                  <div>
                    <h3 className="mb-3 font-heading text-xl text-primary">Especialidades</h3>
                    <div className="flex flex-wrap gap-2">
                      {coach.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="rounded-full px-3 py-1.5 text-sm font-medium"
                          style={{ backgroundColor: `${coach.color}20`, color: coach.color }}
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 font-heading text-xl text-primary">Lo que encontrarás</h3>
                    <ul className="space-y-2">
                      {coach.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-primary/70">
                          <svg
                            className="h-5 w-5 shrink-0"
                            style={{ color: coach.color }}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function Coaches() {
  const [selectedCoach, setSelectedCoach] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="profesores" className="relative bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center lg:mb-20"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-fire-orange">
            Conoce al equipo
          </span>
          <h2 className="mt-4 font-heading text-4xl text-primary sm:text-5xl lg:text-6xl">
            NUESTROS COACHES
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary/58">
            Coaches y áreas de trabajo pensadas para ayudarte a entrenar mejor, avanzar con
            estructura y sostener resultados.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {coaches.map((coach) => (
            <motion.div
              key={coach.id}
              variants={cardVariants}
              onClick={() => setSelectedCoach(coach)}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden rounded-xl border border-primary/10 bg-primary/5 transition-all duration-300 hover:-translate-y-2 hover:border-fire-orange/30">
                <div className="relative aspect-[4/5] overflow-hidden">
                  {coach.image ? (
                    <img
                      src={coach.image}
                      alt={coach.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <CoachBadge coach={coach} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="p-6">
                  <h3 className="font-heading text-2xl text-primary transition-colors group-hover:text-fire-orange">
                    {coach.name}
                  </h3>
                  <p className="mt-1 text-sm text-primary/60">{coach.role}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {coach.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="rounded px-2 py-1 text-xs font-medium"
                        style={{ backgroundColor: `${coach.color}15`, color: coach.color }}
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-fire-orange opacity-0 transition-opacity group-hover:opacity-100">
                    <span>Ver enfoque completo</span>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-12 text-center text-sm text-primary/38">
          Cada perfil resume el enfoque de trabajo que encontrarás dentro del box.
        </p>
      </div>

      <CoachModal
        coach={selectedCoach}
        isOpen={!!selectedCoach}
        onClose={() => setSelectedCoach(null)}
      />
    </section>
  )
}
