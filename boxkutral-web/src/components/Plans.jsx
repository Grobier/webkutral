import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { createWhatsAppLink } from '../constants'
import { containerVariants, cardVariants } from '../utils/animations'

const plans = [
  {
    id: 'fuego',
    name: 'Plan Fuego',
    price: '$60.000',
    period: '/mes',
    features: [
      { text: 'Matrícula GRATIS', highlight: true },
      { text: '12 clases al mes' },
      { text: 'Acceso a todas las disciplinas' },
      { text: 'Medición y Nutrición (gratis el primer mes)' },
    ],
    featured: false,
  },
  {
    id: 'kutral',
    name: 'Plan Kutral',
    price: '$65.000',
    period: '/mes',
    badge: 'MÁS POPULAR',
    features: [
      { text: 'Matrícula GRATIS', highlight: true },
      { text: '16 clases al mes' },
      { text: 'Acceso a todas las disciplinas' },
      { text: 'Medición y Nutrición (gratis el primer mes)' },
    ],
    featured: true,
  },
  {
    id: 'leyenda',
    name: 'Plan Leyenda',
    price: '$90.000',
    period: '/mes',
    features: [
      { text: 'Matrícula GRATIS', highlight: true },
      { text: 'Clases ILIMITADAS' },
      { text: 'Acceso a todas las disciplinas' },

      { text: 'Medición y Nutrición' },
      { text: 'Recovery incluido' },
    ],
    featured: false,
  },
]

const flexibleOptions = [
  { name: 'Pack 4 clases', price: '$30.000' },
  { name: 'Pack 8 clases', price: '$48.000' },
]

export default function Plans() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="planes" className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center lg:mb-20"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-fire-orange">
            Invierte en ti
          </span>
          <h2 className="mt-4 font-heading text-4xl text-primary sm:text-5xl lg:text-6xl">
            ELIGE TU PLAN
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={cardVariants}
              className={`relative plan-card ${plan.featured ? 'featured' : ''}`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-fire-orange px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-heading text-2xl text-primary">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className={`font-heading text-4xl ${plan.featured ? 'text-fire-orange' : 'text-primary'}`}>
                    {plan.price}
                  </span>
                  <span className="text-sm text-primary/50">{plan.period}</span>
                </div>
              </div>

              <ul className="mb-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-3">
                    <svg
                      className={`mt-0.5 h-5 w-5 shrink-0 ${feature.highlight ? 'text-fire-orange' : 'text-primary/50'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className={`text-sm ${feature.highlight ? 'font-semibold text-fire-orange' : 'text-primary/70'}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={createWhatsAppLink(`Hola BoxKutral, me interesa el ${plan.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 font-bold uppercase tracking-wide transition-all duration-300 ${
                  plan.featured
                    ? 'bg-fire-orange text-white hover:bg-fire-red hover:shadow-lg hover:shadow-fire-orange/30'
                    : 'bg-primary/10 text-primary hover:bg-fire-orange hover:text-white'
                }`}
              >
                Elegir Plan
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16"
        >
          <h3 className="mb-8 text-center font-heading text-2xl text-primary">OPCIONES FLEXIBLES</h3>
          <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
            {flexibleOptions.map((option) => (
              <a
                key={option.name}
                href={createWhatsAppLink(`Hola BoxKutral, me interesa el ${option.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-primary/10 bg-primary/5 p-6 transition-all duration-300 hover:border-fire-orange/50"
              >
                <span className="font-semibold text-primary">{option.name}</span>
                <span className="font-heading text-2xl text-fire-orange transition-transform group-hover:scale-110">
                  {option.price}
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
