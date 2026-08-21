import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { containerVariants, cardVariants } from '../utils/animations'
import { createWhatsAppLink } from '../constants'

const disciplines = [
  {
    id: 'powerbuilding',
    name: 'POWERBUILDING',
    shortDesc: 'Fuerza e hipertrofia. Más músculo, mejor estética y progresión medible.',
    color: '#9B59B6',
    icon: 'muscle',
    fullDescription: 'El Powerbuilding combina lo mejor del entrenamiento de fuerza y la hipertrofia muscular. Une ejercicios básicos como sentadilla, peso muerto, press banca y press militar con ejercicios accesorios enfocados en desarrollar masa muscular, mejorar la estética corporal y aumentar el rendimiento físico de forma progresiva y segura.',
    keywords: ['Fuerza', 'Hipertrofia', 'Masa muscular', 'Estética', 'Rendimiento', 'Progresión', 'Técnica', 'Sobrecarga progresiva'],
    benefits: [
      'Aumento de fuerza y capacidad de levantar más carga',
      'Desarrollo de masa muscular en todo el cuerpo',
      'Mejor composición corporal: menos grasa, más músculo',
      'Técnica sólida en movimientos básicos',
      'Mayor confianza física y seguridad entrenando',
      'Progresión medible semana a semana',
    ],
    coachMethod: 'El coach selecciona ejercicios según el nivel, objetivo y condición de cada persona. Enseña la técnica de los movimientos principales, ajusta cargas, repeticiones, descansos y volumen para que haya progreso sin sobrecargar el cuerpo. Corrige postura, controla la intensidad y organiza una planificación progresiva con estructura clara.',
    salesText: 'Si quieres ganar fuerza, construir músculo y verte mejor, el Powerbuilding es para ti. No se trata solo de levantar pesado, sino de entrenar con intención, técnica y progresión. Hazte más fuerte y construye un cuerpo funcional, estético y resistente.',
    duration: '60 min',
    intensity: 'Alta',
  },
  {
    id: 'halterofilia',
    name: 'HALTEROFILIA',
    hasModal: false,
    shortDesc: 'Arranque y envión. Fuerza explosiva, velocidad y precisión técnica.',
    color: '#F0B400',
    icon: 'weightlifting',
    fullDescription: 'La halterofilia es una disciplina olímpica basada en dos levantamientos: arranque y envión. Combina fuerza, velocidad, movilidad, coordinación y técnica. Busca levantar una carga desde el suelo hasta sobre la cabeza de la forma más eficiente y explosiva posible.',
    keywords: ['Arranque', 'Envión', 'Fuerza explosiva', 'Técnica', 'Velocidad', 'Movilidad', 'Coordinación', 'Precisión'],
    benefits: [
      'Desarrollo de fuerza explosiva',
      'Mejora de la coordinación y control corporal',
      'Aumento de la movilidad de hombros, cadera y tobillos',
      'Mayor potencia en movimientos deportivos',
      'Mejora de la velocidad bajo la barra',
      'Desarrollo de concentración y precisión técnica',
    ],
    coachMethod: 'El coach enseña la técnica paso a paso, desde posiciones básicas hasta movimientos completos. Corrige el agarre, la trayectoria de la barra, la extensión de cadera y la estabilidad sobre la cabeza. Adapta los ejercicios según la movilidad y experiencia del alumno, utilizando progresiones y cargas adecuadas.',
    salesText: 'La halterofilia no es solo levantar peso: es aprender a moverte con fuerza, velocidad y precisión. Si quieres mejorar tu técnica, potencia y confianza con la barra, este es el lugar para comenzar.',
    duration: '90 min',
    intensity: 'Alta',
  },
  {
    id: 'crossfit',
    name: 'CROSSFIT',
    shortDesc: 'Entrenamiento funcional que combina fuerza, resistencia y comunidad.',
    color: '#FF6B00',
    icon: 'crossfit',
    fullDescription: 'El CrossFit es una metodología de entrenamiento funcional que combina ejercicios de fuerza, gimnasia, halterofilia y resistencia cardiovascular. Sus sesiones son variadas e intensas y se adaptan a distintos niveles, desde principiantes hasta avanzados, utilizando movimientos funcionales aplicados a la vida diaria y al rendimiento deportivo.',
    keywords: ['Funcional', 'Fuerza', 'Resistencia', 'Comunidad', 'Intensidad', 'WOD', 'Movilidad', 'Gimnasia'],
    benefits: [
      'Mejora de la fuerza general',
      'Aumento de la resistencia cardiovascular',
      'Mejor composición corporal',
      'Desarrollo de coordinación, equilibrio y agilidad',
      'Mejora de la movilidad y control corporal',
      'Motivación gracias al entrenamiento en comunidad',
      'Superación personal constante',
    ],
    coachMethod: 'El coach guía la clase desde el calentamiento hasta el entrenamiento principal, adaptando los ejercicios al nivel de cada alumno. Corrige técnica, regula la intensidad, propone escalas y cuida que todos entrenen de forma segura. Motiva al grupo y asegura que todos puedan participar sin importar su experiencia.',
    salesText: 'CrossFit es para quienes quieren entrenar fuerte, mejorar su condición física y sentirse parte de una comunidad. No necesitas estar en forma para empezar; empiezas para ponerte en forma.',
    duration: '60 min',
    intensity: 'Alta',
  },
  {
    id: 'endurance',
    name: 'ENDURANCE',
    shortDesc: 'Resistencia cardiovascular, más energía y mejor rendimiento sostenido.',
    color: '#00BCD4',
    icon: 'heart',
    fullDescription: 'El endurance es una disciplina orientada a mejorar la resistencia cardiovascular y la capacidad de mantener esfuerzos durante más tiempo. Incluye trabajo en remo, bicicleta, ski erg, carrera y otros formatos aeróbicos. Su objetivo es desarrollar mejor eficiencia energética, respiratoria y muscular.',
    keywords: ['Resistencia', 'Cardio', 'Capacidad aeróbica', 'Zona 2', 'Intervalos', 'Eficiencia', 'Energía', 'Fatiga'],
    benefits: [
      'Mejora de la resistencia cardiovascular',
      'Mayor capacidad pulmonar y control respiratorio',
      'Mejor tolerancia a la fatiga',
      'Aumento de la energía diaria',
      'Mejora de la recuperación entre entrenamientos',
      'Reducción del cansancio en actividades cotidianas',
      'Apoyo en la pérdida de grasa corporal',
    ],
    coachMethod: 'El coach controla la intensidad mediante tiempos, ritmos y zonas de esfuerzo. Planifica bloques progresivos para que el alumno mejore sin agotarse en exceso. Enseña a regular el ritmo, respirar mejor, distribuir la energía y entender cuándo acelerar o mantener un esfuerzo controlado.',
    salesText: 'Endurance es ideal si quieres mejorar tu resistencia, sentirte con más energía y rendir mejor dentro y fuera del entrenamiento. Aprende a controlar tu ritmo y a superar tus límites de manera inteligente.',
    duration: '60 min',
    intensity: 'Media',
  },
  {
    id: 'gap',
    name: 'GAP',
    shortDesc: 'Glúteos, abdomen y piernas. Tonificación, fuerza localizada y estabilidad.',
    color: '#2ECC71',
    icon: 'target',
    fullDescription: 'El GAP es una disciplina enfocada en el trabajo de glúteos, abdominales y piernas. Su objetivo es fortalecer, tonificar y mejorar la resistencia muscular del tren inferior y la zona media. Es una clase dinámica, accesible y adaptable, ideal para quienes buscan mejorar su composición corporal, estabilidad y fuerza localizada.',
    keywords: ['Glúteos', 'Abdominales', 'Piernas', 'Tonificación', 'Core', 'Estabilidad', 'Tren inferior', 'Postura'],
    benefits: [
      'Fortalecimiento de glúteos, piernas y abdomen',
      'Mejora de la estabilidad de cadera y zona media',
      'Mayor resistencia muscular',
      'Mejor postura y control corporal',
      'Apoyo en objetivos estéticos y funcionales',
      'Mayor fuerza en movimientos cotidianos',
      'Mejora del tono muscular',
    ],
    coachMethod: 'El coach selecciona ejercicios específicos cuidando la técnica y la correcta activación muscular. Corrige la postura en sentadillas, zancadas, puentes de glúteo, planchas y trabajos con bandas. Adapta la intensidad según el nivel del alumno, utilizando peso corporal, bandas, mancuernas o cargas progresivas.',
    salesText: 'GAP es perfecto si quieres fortalecer glúteos, abdomen y piernas de forma efectiva, segura y entretenida. Una clase pensada para sentir el trabajo, mejorar tu cuerpo y moverte con más seguridad.',
    duration: '60 min',
    intensity: 'Media',
  },
]

function DisciplineIcon({ type, className = 'w-8 h-8' }) {
  const icons = {
    crossfit: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    weightlifting: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" />
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

function DisciplineModal({ discipline, isOpen, onClose }) {
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

  if (!discipline) return null

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
            aria-labelledby="discipline-modal-title"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 z-50 flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-secondary md:inset-10 lg:inset-20"
          >
            <div
              className="border-b border-primary/10 p-6 md:p-8"
              style={{ borderBottomColor: `${discipline.color}30` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2
                    id="discipline-modal-title"
                    className="font-heading text-4xl md:text-5xl lg:text-6xl"
                    style={{ color: discipline.color }}
                  >
                    {discipline.name}
                  </h2>
                  <div className="mt-4 flex gap-4 text-sm">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-primary/70">
                      {discipline.duration}
                    </span>
                    <span
                      className="rounded-full px-3 py-1"
                      style={{ backgroundColor: `${discipline.color}20`, color: discipline.color }}
                    >
                      Intensidad: {discipline.intensity}
                    </span>
                  </div>
                </div>
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="rounded-lg p-2 transition-colors hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-fire-orange"
                  aria-label="Cerrar disciplina"
                >
                  <svg className="h-6 w-6 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-5">
                  <div>
                    <h3 className="mb-2 font-heading text-xl text-primary">Descripción</h3>
                    <p className="leading-relaxed text-primary/70">{discipline.fullDescription}</p>
                  </div>

                  <div>
                    <h3 className="mb-3 font-heading text-xl text-primary">Palabras clave</h3>
                    <div className="flex flex-wrap gap-2">
                      {discipline.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="rounded-full px-3 py-1 text-xs font-semibold"
                          style={{ backgroundColor: `${discipline.color}20`, color: discipline.color }}
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 font-heading text-xl text-primary">Rol del coach</h3>
                    <p className="leading-relaxed text-primary/70">{discipline.coachMethod}</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <h3 className="mb-3 font-heading text-xl text-primary">Lo que vas a conseguir</h3>
                    <ul className="space-y-2">
                      {discipline.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3">
                          <svg
                            className="mt-0.5 h-5 w-5 shrink-0"
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
                          <span className="text-sm text-primary/80">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className="rounded-xl p-4"
                    style={{ backgroundColor: `${discipline.color}12`, borderLeft: `3px solid ${discipline.color}` }}
                  >
                    <p className="text-sm font-medium italic leading-relaxed text-primary/80">
                      "{discipline.salesText}"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-primary/10 bg-primary/5 p-6 md:p-8">
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={createWhatsAppLink(`Hola BoxKutral! Me interesa ${discipline.name}, quiero agendar mi clase gratis 🔥`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-fire flex-1 justify-center"
                >
                  Agenda clase gratis — {discipline.name}
                </a>
                <a
                  href="#horarios"
                  onClick={onClose}
                  className="btn-outline flex-1 justify-center"
                >
                  Ver horarios
                </a>
              </div>
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
    <section id="disciplinas" className="relative bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center lg:mb-20"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-fire-orange">
            Entrena con propósito
          </span>
          <h2 className="mt-4 font-heading text-4xl text-secondary sm:text-5xl lg:text-6xl">
            NUESTRAS DISCIPLINAS
          </h2>
          <p className="mt-4 text-lg text-secondary/60">Haz clic en cada disciplina para conocer más</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-5"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {disciplines.slice(0, 3).map((discipline) => (
              <DisciplineCard
                key={discipline.id}
                discipline={discipline}
                onClick={discipline.hasModal === false ? undefined : () => setSelectedDiscipline(discipline)}
              />
            ))}
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2 lg:max-w-3xl">
            {disciplines.slice(3).map((discipline) => (
              <DisciplineCard
                key={discipline.id}
                discipline={discipline}
                onClick={discipline.hasModal === false ? undefined : () => setSelectedDiscipline(discipline)}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <DisciplineModal
        discipline={selectedDiscipline}
        isOpen={!!selectedDiscipline}
        onClose={() => setSelectedDiscipline(null)}
      />
    </section>
  )
}

function DisciplineCard({ discipline, onClick }) {
  const isInteractive = typeof onClick === 'function'

  return (
    <motion.div
      variants={cardVariants}
      onClick={onClick}
      className={`group ${isInteractive ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <div
        className="h-full rounded-xl border border-secondary/10 bg-secondary/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-secondary/20 hover:bg-secondary/[0.06] hover:shadow-lg"
        style={{ boxShadow: `0 0 0 0 ${discipline.color}00` }}
        onMouseEnter={(event) => {
          event.currentTarget.style.borderColor = `${discipline.color}40`
          event.currentTarget.style.boxShadow = `0 8px 30px ${discipline.color}15`
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.borderColor = ''
          event.currentTarget.style.boxShadow = ''
        }}
      >
        <div className="mb-4 flex items-start gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${discipline.color}15`, color: discipline.color }}
          >
            <DisciplineIcon type={discipline.icon} className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h3
              className="font-heading text-2xl transition-colors duration-300 lg:text-3xl"
              style={{ color: discipline.color }}
            >
              {discipline.name}
            </h3>
            <div className="mt-1 flex items-center gap-3">
              <span className="text-xs text-secondary/50">{discipline.duration}</span>
              <span className="h-1 w-1 rounded-full bg-secondary/30" />
              <span className="text-xs text-secondary/50">{discipline.intensity}</span>
            </div>
          </div>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-secondary/70">{discipline.shortDesc}</p>

        {isInteractive && (
          <div
            className="inline-flex items-center gap-2 text-sm font-medium opacity-50 transition-all duration-300 group-hover:opacity-100"
            style={{ color: discipline.color }}
          >
            <span>Ver detalles</span>
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  )
}
