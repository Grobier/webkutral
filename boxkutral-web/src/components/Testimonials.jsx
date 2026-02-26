import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * Testimonials Component
 * Client success stories focused on training results
 */

const testimonials = [
  {
    id: 1,
    name: 'Camila Rojas',
    achievement: 'Bajó 8kg en 3 meses',
    quote: 'Encontré en BoxKutral mucho más que un gimnasio. La comunidad te empuja a dar lo mejor cada día. Mis resultados hablan por sí solos y me siento más fuerte que nunca.',
    initials: 'CR',
  },
  {
    id: 2,
    name: 'Sebastián Torres',
    achievement: 'Clasificó a su primera competencia',
    quote: 'Llegué sin saber nada de crossfit y en un año ya estaba compitiendo. Los coaches saben cómo sacar tu potencial. El ambiente es intenso pero siempre motivador.',
    initials: 'ST',
  },
  {
    id: 3,
    name: 'Francisca Mendoza',
    achievement: 'Mejoró su marca personal en sentadilla',
    quote: 'La metodología de halterofilia es de primer nivel. Pasé de 40kg a 75kg en sentadilla en solo 6 meses. El seguimiento técnico hace toda la diferencia.',
    initials: 'FM',
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="testimonios" className="py-24 lg:py-32 bg-white relative overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-fire-orange text-sm font-semibold tracking-widest uppercase">
            La comunidad habla
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-secondary mt-4">
            LOS MÁS ENCENDIDOS
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              className="bg-secondary/5 border border-secondary/10 rounded-lg p-8 hover:border-fire-orange/30 transition-colors duration-300"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <svg className="w-10 h-10 text-fire-orange" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Quote */}
              <blockquote className="text-secondary/80 leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>

              {/* Achievement Badge */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1.5 bg-fire-orange/10 border border-fire-orange/20 rounded-full text-fire-orange text-xs font-semibold">
                  {testimonial.achievement}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-fire-orange to-fire-red rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.initials}
                </div>
                <div className="font-semibold text-secondary">{testimonial.name}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
