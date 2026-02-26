import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

/**
 * Disciplines Component
 * 5 discipline cards with click-to-open modal for detailed info
 * Clean grid layout with icons
 */

const disciplines = [
  {
    id: 'crossfit',
    name: 'CROSSFIT',
    shortDesc: 'El atleta completo. Equilibrio alto entre fuerza, resistencia y potencia.',
    color: '#FF6B00',
    icon: 'crossfit',
    fullDescription: `Crossfit es un programa de entrenamiento de alta intensidad que combina elementos de cardio,
    levantamiento de pesas, gimnasia y más. Cada día es diferente, con WODs (Workout of the Day) que desafían
    tu cuerpo de formas nuevas y emocionantes.`,
    benefits: [
      'Mejora la capacidad cardiovascular y respiratoria',
      'Aumenta la fuerza y resistencia muscular',
      'Desarrolla flexibilidad y coordinación',
      'Quema alta de calorías en poco tiempo',
      'Comunidad motivadora y competitiva',
    ],
    idealFor: 'Personas que buscan un entrenamiento completo y variado, con espíritu competitivo.',
    duration: '60 min',
    intensity: 'Alta',
  },
  {
    id: 'halterofilia',
    name: 'HALTEROFILIA',
    shortDesc: 'Potencia pura y técnica. Ideal para fuerza explosiva y coordinación.',
    color: '#F0B400',
    icon: 'weightlifting',
    fullDescription: `La Halterofilia o levantamiento olímpico se centra en dos movimientos principales:
    el Snatch (arranque) y el Clean & Jerk (envión). Es un deporte que requiere técnica precisa,
    fuerza explosiva y movilidad excepcional.`,
    benefits: [
      'Desarrolla fuerza explosiva máxima',
      'Mejora la coordinación neuromuscular',
      'Aumenta la movilidad articular',
      'Fortalece el core y la estabilidad',
      'Perfecciona la técnica de levantamiento',
    ],
    idealFor: 'Atletas que quieren mejorar su potencia y técnica de levantamiento.',
    duration: '90 min',
    intensity: 'Alta',
  },
  {
    id: 'powerbuilding',
    name: 'POWERBUILDING',
    shortDesc: 'Estética visual. Máxima definición muscular y simetría.',
    color: '#9B59B6',
    icon: 'muscle',
    fullDescription: `Powerbuilding combina lo mejor del powerlifting (fuerza máxima) con el bodybuilding
    (hipertrofia y estética). El objetivo es construir un físico fuerte Y visualmente impresionante,
    sin sacrificar ninguno de los dos aspectos.`,
    benefits: [
      'Ganancias de fuerza y masa muscular',
      'Mejora la composición corporal',
      'Desarrollo muscular simétrico',
      'Progresión medible en levantamientos',
      'Equilibrio entre estética y rendimiento',
    ],
    idealFor: 'Quienes buscan verse bien y ser fuertes al mismo tiempo.',
    duration: '75 min',
    intensity: 'Media-Alta',
  },
  {
    id: 'gap',
    name: 'GAP 2.0',
    shortDesc: 'Tono localizado. Enfoque en Glúteos, Abdomen y Piernas.',
    color: '#2ECC71',
    icon: 'target',
    fullDescription: `GAP 2.0 es un programa de entrenamiento focalizado en las zonas más demandadas:
    Glúteos, Abdomen y Piernas. Combina ejercicios de fuerza, resistencia y tonificación para
    esculpir y fortalecer estas áreas específicas.`,
    benefits: [
      'Tonificación muscular localizada',
      'Fortalecimiento del core',
      'Mejora la postura y estabilidad',
      'Quema de grasa localizada',
      'Aumento de la resistencia muscular',
    ],
    idealFor: 'Personas que quieren tonificar y fortalecer glúteos, abdomen y piernas.',
    duration: '45 min',
    intensity: 'Media',
  },
  {
    id: 'endurance',
    name: 'ENDURANCE',
    shortDesc: 'Motor inagotable. Máxima salud cardiovascular y quema calórica.',
    color: '#00BCD4',
    icon: 'heart',
    fullDescription: `Endurance está diseñado para mejorar tu capacidad cardiovascular y resistencia.
    A través de entrenamientos de larga duración y moderada intensidad, desarrollarás un motor
    que no se detiene, mejorando tu salud cardíaca y quemando calorías eficientemente.`,
    benefits: [
      'Mejora la salud cardiovascular',
      'Aumenta la capacidad pulmonar',
      'Alta quema calórica',
      'Reduce el estrés y mejora el ánimo',
      'Aumenta la resistencia general',
    ],
    idealFor: 'Quienes buscan mejorar su condición física general y salud del corazón.',
    duration: '50 min',
    intensity: 'Media',
  },
]

// Icon components for each discipline
function DisciplineIcon({ type, className = 'w-8 h-8' }) {
  const icons = {
    crossfit: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    weightlifting: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
      </svg>
    ),
    muscle: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
      </svg>
    ),
    target: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12h.01" />
      </svg>
    ),
    heart: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  }
  return icons[type] || icons.crossfit
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

// Modal Component
function DisciplineModal({ discipline, isOpen, onClose }) {
  if (!discipline) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-secondary border border-primary/10 rounded-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div
              className="p-6 md:p-8 border-b border-primary/10"
              style={{ borderBottomColor: `${discipline.color}30` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2
                    className="font-heading text-4xl md:text-5xl lg:text-6xl"
                    style={{ color: discipline.color }}
                  >
                    {discipline.name}
                  </h2>
                  <div className="flex gap-4 mt-4 text-sm">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary/70">
                      {discipline.duration}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full"
                      style={{ backgroundColor: `${discipline.color}20`, color: discipline.color }}
                    >
                      Intensidad: {discipline.intensity}
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading text-2xl text-primary mb-3">Descripción</h3>
                    <p className="text-primary/70 leading-relaxed">{discipline.fullDescription}</p>
                  </div>

                  <div>
                    <h3 className="font-heading text-2xl text-primary mb-3">Ideal para</h3>
                    <p className="text-primary/70 leading-relaxed">{discipline.idealFor}</p>
                  </div>
                </div>

                {/* Right Column - Benefits */}
                <div>
                  <h3 className="font-heading text-2xl text-primary mb-4">Beneficios</h3>
                  <ul className="space-y-3">
                    {discipline.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 flex-shrink-0 mt-0.5"
                          style={{ color: discipline.color }}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-primary/80">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 md:p-8 border-t border-primary/10 bg-primary/5">
              <a
                href="#horarios"
                onClick={onClose}
                className="btn-fire w-full md:w-auto"
                style={{ background: `linear-gradient(135deg, ${discipline.color}, ${discipline.color}dd)` }}
              >
                Ver Horarios de {discipline.name}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function Disciplines() {
  const [selectedDiscipline, setSelectedDiscipline] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="disciplinas" className="py-24 lg:py-32 bg-white relative">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-fire-orange text-sm font-semibold tracking-widest uppercase">
            Entrena con propósito
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-secondary mt-4">
            NUESTRAS DISCIPLINAS
          </h2>
          <p className="text-secondary/60 mt-4 text-lg">
            Haz clic en cada disciplina para conocer más
          </p>
        </motion.div>

        {/* Disciplines Grid - All 5 cards in organized layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-5"
        >
          {/* Top Row - 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {disciplines.slice(0, 3).map((discipline) => (
              <DisciplineCard
                key={discipline.id}
                discipline={discipline}
                onClick={() => setSelectedDiscipline(discipline)}
              />
            ))}
          </div>

          {/* Bottom Row - 2 cards centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl lg:max-w-3xl mx-auto">
            {disciplines.slice(3).map((discipline) => (
              <DisciplineCard
                key={discipline.id}
                discipline={discipline}
                onClick={() => setSelectedDiscipline(discipline)}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <DisciplineModal
        discipline={selectedDiscipline}
        isOpen={!!selectedDiscipline}
        onClose={() => setSelectedDiscipline(null)}
      />
    </section>
  )
}

// Discipline Card Component
function DisciplineCard({ discipline, onClick }) {
  return (
    <motion.div
      variants={cardVariants}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div
        className="h-full bg-secondary/[0.03] border border-secondary/10 rounded-xl p-6 transition-all duration-300 hover:bg-secondary/[0.06] hover:border-secondary/20 hover:-translate-y-1 hover:shadow-lg"
        style={{
          boxShadow: `0 0 0 0 ${discipline.color}00`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${discipline.color}40`
          e.currentTarget.style.boxShadow = `0 8px 30px ${discipline.color}15`
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = ''
          e.currentTarget.style.boxShadow = ''
        }}
      >
        {/* Icon & Title Row */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${discipline.color}15`, color: discipline.color }}
          >
            <DisciplineIcon type={discipline.icon} className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="font-heading text-2xl lg:text-3xl transition-colors duration-300"
              style={{ color: discipline.color }}
            >
              {discipline.name}
            </h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-secondary/50">{discipline.duration}</span>
              <span className="w-1 h-1 rounded-full bg-secondary/30" />
              <span className="text-xs text-secondary/50">{discipline.intensity}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-secondary/70 text-sm leading-relaxed mb-4">
          {discipline.shortDesc}
        </p>

        {/* Click indicator */}
        <div
          className="inline-flex items-center gap-2 text-sm font-medium opacity-50 group-hover:opacity-100 transition-all duration-300"
          style={{ color: discipline.color }}
        >
          <span>Ver detalles</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}
