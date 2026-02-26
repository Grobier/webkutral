import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

/**
 * Coaches Component
 * Team section with photos, videos, and coach info
 *
 * To add real photos: Replace the placeholder div with:
 * <img src="/coaches/coach-name.jpg" alt="Coach Name" className="w-full h-full object-cover" />
 *
 * To add real videos: Replace the video placeholder with:
 * <video src="/coaches/coach-video.mp4" controls className="w-full h-full object-cover" />
 * Or use YouTube/Vimeo embeds
 */

const coaches = [
  {
    id: 1,
    name: 'Coach Nombre 1',
    role: 'Head Coach · Crossfit',
    specialties: ['Crossfit', 'Halterofilia'],
    bio: 'Más de 10 años de experiencia en entrenamiento funcional. Certificado CrossFit Level 3 y especialista en halterofilia olímpica.',
    achievements: [
      'CrossFit Level 3 Trainer',
      'Campeón Regional 2022',
      '+500 atletas entrenados',
    ],
    color: '#FF6B00',
    // Placeholder - replace with actual image path
    image: null,
    // Placeholder - replace with actual video URL
    video: null,
  },
  {
    id: 2,
    name: 'Coach Nombre 2',
    role: 'Coach · Powerbuilding & GAP',
    specialties: ['Powerbuilding', 'GAP 2.0'],
    bio: 'Especialista en composición corporal y entrenamiento de fuerza. Enfoque en técnica y progresión segura.',
    achievements: [
      'Certificación NSCA',
      'Especialista en Nutrición Deportiva',
      '+300 transformaciones',
    ],
    color: '#9B59B6',
    image: null,
    video: null,
  },
  {
    id: 3,
    name: 'Coach Nombre 3',
    role: 'Coach · Endurance & Crossfit',
    specialties: ['Endurance', 'Crossfit'],
    bio: 'Ex-atleta de resistencia con pasión por el entrenamiento cardiovascular. Especialista en programas de acondicionamiento.',
    achievements: [
      'Ironman Finisher',
      'Coach de Running certificado',
      'Especialista en HIIT',
    ],
    color: '#00BCD4',
    image: null,
    video: null,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

// Coach Modal with Video
function CoachModal({ coach, isOpen, onClose }) {
  if (!coach) return null

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
            <div className="p-6 md:p-8 border-b border-primary/10 flex items-start justify-between">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl text-primary">
                  {coach.name}
                </h2>
                <p style={{ color: coach.color }} className="font-medium mt-1">
                  {coach.role}
                </p>
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

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Video Section */}
                <div>
                  <h3 className="font-heading text-xl text-primary mb-4">Video de Presentación</h3>
                  <div className="aspect-video bg-primary/5 rounded-xl overflow-hidden border border-primary/10">
                    {coach.video ? (
                      // Replace with actual video embed
                      <video
                        src={coach.video}
                        controls
                        className="w-full h-full object-cover"
                        poster={coach.image}
                      />
                    ) : (
                      // Video Placeholder
                      <div className="w-full h-full flex flex-col items-center justify-center text-primary/30">
                        <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm">Video próximamente</p>
                        <p className="text-xs mt-1 text-primary/20">
                          Reemplazar con video del coach
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info Section */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading text-xl text-primary mb-3">Sobre mí</h3>
                    <p className="text-primary/70 leading-relaxed">{coach.bio}</p>
                  </div>

                  <div>
                    <h3 className="font-heading text-xl text-primary mb-3">Especialidades</h3>
                    <div className="flex flex-wrap gap-2">
                      {coach.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="px-3 py-1.5 rounded-full text-sm font-medium"
                          style={{ backgroundColor: `${coach.color}20`, color: coach.color }}
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading text-xl text-primary mb-3">Logros</h3>
                    <ul className="space-y-2">
                      {coach.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-primary/70">
                          <svg
                            className="w-5 h-5 flex-shrink-0"
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
    <section id="profesores" className="py-24 lg:py-32 bg-secondary relative">

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
            Conoce al equipo
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-primary mt-4">
            NUESTROS COACHES
          </h2>
          <p className="text-primary/50 mt-4 text-lg max-w-2xl mx-auto">
            Profesionales apasionados que te guiarán en cada paso de tu transformación
          </p>
        </motion.div>

        {/* Coaches Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {coaches.map((coach) => (
            <motion.div
              key={coach.id}
              variants={cardVariants}
              onClick={() => setSelectedCoach(coach)}
              className="group cursor-pointer"
            >
              <div className="bg-primary/5 border border-primary/10 rounded-xl overflow-hidden hover:border-fire-orange/30 transition-all duration-300 hover:transform hover:-translate-y-2">
                {/* Photo */}
                <div className="aspect-[4/5] relative overflow-hidden">
                  {coach.image ? (
                    <img
                      src={coach.image}
                      alt={coach.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    // Photo Placeholder
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex flex-col items-center justify-center">
                      <div
                        className="w-24 h-24 rounded-full flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${coach.color}20` }}
                      >
                        <svg
                          className="w-12 h-12"
                          style={{ color: coach.color }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <p className="text-primary/30 text-sm">Foto del coach</p>
                      <p className="text-primary/20 text-xs mt-1">
                        Agregar imagen aquí
                      </p>
                    </div>
                  )}

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Play button indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: coach.color }}
                    >
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="font-heading text-2xl text-primary group-hover:text-fire-orange transition-colors">
                    {coach.name}
                  </h3>
                  <p className="text-primary/50 text-sm mt-1">{coach.role}</p>

                  {/* Specialties Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {coach.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{ backgroundColor: `${coach.color}15`, color: coach.color }}
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-fire-orange opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Ver perfil completo</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Note for adding more coaches */}
        <p className="text-center text-primary/30 text-sm mt-12">
          {/* Comment: To add more coaches, edit the coaches array in this file */}
        </p>
      </div>

      {/* Modal */}
      <CoachModal
        coach={selectedCoach}
        isOpen={!!selectedCoach}
        onClose={() => setSelectedCoach(null)}
      />
    </section>
  )
}
