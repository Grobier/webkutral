import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const coaches = [
  {
    id: 1,
    name: 'Robert Bolbarán',
    role: 'Coach · Halterofilia',
    specialties: ['Halterofilia'],
    bio: '',
    achievements: [],
    metric: 'Halterofilia',
    color: '#FF6B00',
    image: '/coaches/Robert Bolbaran.png',
  },
  {
    id: 2,
    name: 'Cristian Infantes',
    role: 'Coach · Halterofilia',
    specialties: ['Halterofilia'],
    bio: '',
    achievements: [],
    metric: 'Halterofilia',
    color: '#F0B400',
    image: '/coaches/Cristian Infantes.png',
  },
  {
    id: 3,
    name: 'Lorenzo Grobier',
    role: 'Coach · Powerbuilding',
    specialties: ['Powerbuilding'],
    bio: '',
    achievements: [],
    metric: 'Powerbuilding',
    color: '#9B59B6',
    image: '/coaches/Lorenzo Grobier.JPG',
  },
  {
    id: 4,
    name: 'Camilo Piza',
    role: 'Coach · CrossFit y GAP',
    specialties: ['CrossFit', 'GAP'],
    bio: '',
    achievements: [],
    metric: 'CrossFit · GAP',
    color: '#C0392B',
    image: '/coaches/Camilo Piza.png',
  },
  {
    id: 5,
    name: 'Camilo Martínez',
    role: 'Coach · CrossFit Competitivo',
    specialties: ['CrossFit'],
    bio: '',
    achievements: [],
    metric: 'CrossFit',
    color: '#E67E22',
    image: '/coaches/Camilo Martínez.png',
  },
  {
    id: 6,
    name: 'Samuel Rojas',
    role: 'Coach · CrossFit',
    specialties: ['CrossFit'],
    bio: '',
    achievements: [],
    metric: 'CrossFit',
    color: '#3498DB',
    image: '/coaches/Samuel Rojas 2.JPG',
  },
  {
    id: 7,
    name: 'Armando Yancen',
    role: 'Coach · CrossFit y Endurance',
    specialties: ['CrossFit', 'Endurance'],
    bio: '',
    achievements: [],
    metric: 'CrossFit · Endurance',
    color: '#00BCD4',
    image: '/coaches/Armando Yancen .jpg',
  },
  {
    id: 8,
    name: 'María José',
    role: 'Coach · CrossFit, GAP, Endurance y Powerbuilding',
    specialties: ['CrossFit', 'GAP', 'Endurance', 'Powerbuilding'],
    bio: '',
    achievements: [],
    metric: 'Energía total',
    color: '#2ECC71',
    image: '/coaches/Cote.JPG',
  },
]

function CoachImage({ coach, className = '' }) {
  const [error, setError] = useState(false)
  if (!coach.image || error) return <CoachBadge coach={coach} />
  return (
    <img
      src={coach.image}
      alt={coach.name}
      className={`h-full w-full object-cover ${className}`}
      draggable={false}
      onError={() => setError(true)}
    />
  )
}

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

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            key="panel"
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="coach-modal-title"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 z-50 flex w-[calc(100vw-2rem)] max-w-2xl max-h-[90vh] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-primary/10 bg-secondary shadow-2xl"
          >
            <div className="flex shrink-0 items-start justify-between border-b border-primary/10 p-6 md:p-8">
              <div>
                <h2 id="coach-modal-title" className="font-heading text-3xl text-primary md:text-4xl">{coach.name}</h2>
                <p style={{ color: coach.color }} className="mt-1 font-medium">{coach.role}</p>
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

            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex gap-6">
                <div className="shrink-0">
                  <div className="w-36 overflow-hidden rounded-xl sm:w-44">
                    <CoachImage coach={coach} />
                  </div>
                </div>

                <div className="min-w-0 flex-1 space-y-4">
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
                    <h3 className="mb-3 font-heading text-xl text-primary">Lo que vas a lograr</h3>
                    <ul className="space-y-2">
                      {coach.achievements.map((achievement) => (
                        <li key={achievement} className="flex items-center gap-3 text-primary/70">
                          <svg className="h-5 w-5 shrink-0" style={{ color: coach.color }} fill="currentColor" viewBox="0 0 20 20">
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
    </AnimatePresence>,
    document.body
  )
}

export default function Coaches() {
  const [active, setActive] = useState(0)
  const [selectedCoach, setSelectedCoach] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const lastHover = useRef(0)

  const getSlot = (i) => {
    const diff = ((i - active) + coaches.length) % coaches.length
    return diff > coaches.length / 2 ? diff - coaches.length : diff
  }

  const getFlex = (slot) => {
    if (slot === 0) return 5
    if (Math.abs(slot) === 1) return 1.2
    if (Math.abs(slot) === 2) return 0.55
    return 0
  }

  const handleHover = (i, isCenter, visible) => {
    if (isCenter || !visible) return
    const now = Date.now()
    if (now - lastHover.current < 420) return
    lastHover.current = now
    setActive(i)
  }

  return (
    <section id="profesores" className="relative bg-secondary py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center lg:mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-fire-orange">
            Conoce al equipo
          </span>
          <h2 className="mt-4 font-heading text-4xl text-primary sm:text-5xl lg:text-6xl">
            NUESTROS COACHES
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary/60">
            Coaches y áreas de trabajo pensadas para ayudarte a entrenar mejor, avanzar con estructura y sostener resultados.
          </p>
        </motion.div>

        {/* Peekaboo carousel */}
        <div className="relative">

          {/* Expanding strips carousel */}
        <div className="flex h-[520px] gap-2 overflow-hidden rounded-2xl sm:h-[580px] lg:h-[640px]">
          {coaches.map((coach, i) => {
            const slot    = getSlot(i)
            const isCenter = slot === 0
            const flex    = getFlex(slot)
            const visible = flex > 0

            return (
              <div
                key={coach.id}
                onClick={() => isCenter && setSelectedCoach(coach)}
                onMouseEnter={() => handleHover(i, isCenter, visible)}
                className="relative cursor-pointer overflow-hidden rounded-2xl"
                style={{
                  flexGrow: flex,
                  flexShrink: 1,
                  flexBasis: 0,
                  opacity: visible ? 1 : 0,
                  transition: 'flex-grow 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease',
                  minWidth: 0,
                  pointerEvents: visible ? 'auto' : 'none',
                }}
              >
                {/* Foto */}
                <div className="h-full w-full">
                  <CoachImage coach={coach} />
                </div>

                {/* Overlay oscuro en laterales */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ backgroundColor: `rgba(0,0,0,${isCenter ? 0 : 0.45})` }}
                />

                {/* Gradiente base abajo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                {/* Glow color centro */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to top, ${coach.color}45 0%, transparent 55%)`,
                    opacity: isCenter ? 1 : 0,
                  }}
                />

                {/* Borde color centro */}
                <div
                  className="absolute inset-0 rounded-2xl transition-opacity duration-500"
                  style={{
                    boxShadow: `inset 0 0 0 2px ${coach.color}`,
                    opacity: isCenter ? 1 : 0,
                  }}
                />

                {/* Info centro */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-6 transition-all duration-500"
                  style={{ opacity: isCenter ? 1 : 0, transform: isCenter ? 'translateY(0)' : 'translateY(12px)' }}
                >
                  <h3 className="font-heading text-3xl text-white lg:text-4xl">{coach.name}</h3>
                  <p className="mt-1 text-sm text-white/55">{coach.role}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {coach.specialties.map((s) => (
                      <span key={s} className="rounded-full px-3 py-1 text-xs font-semibold"
                        style={{ backgroundColor: `${coach.color}30`, color: coach.color }}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-fire-orange">
                    Ver perfil completo
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Dots solo — sin flechas */}
        <div className="mt-5 flex justify-center gap-2">
          {coaches.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-fire-orange' : 'w-1.5 bg-primary/25 hover:bg-primary/50'}`}
              aria-label={`Coach ${i + 1}`} />
          ))}
        </div>
        </div>


      </div>

      <CoachModal
        coach={selectedCoach}
        isOpen={!!selectedCoach}
        onClose={() => setSelectedCoach(null)}
      />
    </section>
  )
}
