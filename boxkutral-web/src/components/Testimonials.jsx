import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { containerVariants, cardVariants } from '../utils/animations'

const testimonials = [
  {
    id: 1,
    name: 'Camila Rojas',
    achievement: 'Bajó 8kg en 3 meses',
    quote:
      'Encontré en BoxKutral mucho más que un gimnasio. La comunidad te empuja a dar lo mejor cada día. Mis resultados hablan por sí solos y me siento más fuerte que nunca.',
    initials: 'CR',
  },
  {
    id: 2,
    name: 'Sebastián Torres',
    achievement: 'Clasificó a su primera competencia',
    quote:
      'Llegué sin saber nada de CrossFit y en un año ya estaba compitiendo. Los coaches saben cómo sacar tu potencial. El ambiente es intenso pero siempre motivador.',
    initials: 'ST',
  },
  {
    id: 3,
    name: 'Francisca Mendoza',
    achievement: 'Mejoró su marca personal en sentadilla',
    quote:
      'La metodología de halterofilia es de primer nivel. Pasé de 40kg a 75kg en sentadilla en solo 6 meses. El seguimiento técnico hace toda la diferencia.',
    initials: 'FM',
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="testimonios" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center lg:mb-20"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-fire-orange">
            La comunidad habla
          </span>
          <h2 className="mt-4 font-heading text-4xl text-secondary sm:text-5xl lg:text-6xl">
            LOS MÁS ENCENDIDOS
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              className="rounded-lg border border-secondary/10 bg-secondary/5 p-8 transition-colors duration-300 hover:border-fire-orange/30"
            >
              <div className="mb-6">
                <svg className="h-10 w-10 text-fire-orange" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <blockquote className="mb-6 leading-relaxed text-secondary/80">
                "{testimonial.quote}"
              </blockquote>

              <div className="mb-6">
                <span className="inline-block rounded-full border border-fire-orange/20 bg-fire-orange/10 px-3 py-1.5 text-xs font-semibold text-fire-orange">
                  {testimonial.achievement}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-fire-orange to-fire-red text-sm font-bold text-white">
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
