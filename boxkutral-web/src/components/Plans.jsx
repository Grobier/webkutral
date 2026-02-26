import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { WHATSAPP_LINK } from '../constants'

/**
 * Plans Component
 * 3 main pricing cards + flexible options
 */

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
      { text: 'Tarjeta Socio (regalo exclusivo)' },
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
      { text: 'Tarjeta Socio (regalo exclusivo)' },
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
      { text: 'Tarjeta Socio (regalo exclusivo)' },
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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

export default function Plans() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="planes" className="py-24 lg:py-32 bg-secondary">

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
            Invierte en ti
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-primary mt-4">
            ELIGE TU PLAN
          </h2>
        </motion.div>

        {/* Main Plans Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={cardVariants}
              className={`plan-card ${plan.featured ? 'featured' : ''} relative`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-fire-orange text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="font-heading text-2xl text-primary">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className={`font-heading text-4xl ${plan.featured ? 'text-fire-orange' : 'text-primary'}`}>
                    {plan.price}
                  </span>
                  <span className="text-primary/50 text-sm">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${feature.highlight ? 'text-fire-orange' : 'text-primary/50'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className={`text-sm ${feature.highlight ? 'text-fire-orange font-semibold' : 'text-primary/70'}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href={`${WHATSAPP_LINK}&text=Hola%20BoxKutral%2C%20me%20interesa%20el%20${encodeURIComponent(plan.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded font-bold uppercase tracking-wide transition-all duration-300 ${
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

        {/* Flexible Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-center font-heading text-2xl text-primary mb-8">
            OPCIONES FLEXIBLES
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {flexibleOptions.map((option) => (
              <a
                key={option.name}
                href={`${WHATSAPP_LINK}&text=Hola%20BoxKutral%2C%20me%20interesa%20el%20${encodeURIComponent(option.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-6 bg-primary/5 border border-primary/10 rounded-lg hover:border-fire-orange/50 transition-all duration-300 group"
              >
                <span className="text-primary font-semibold">{option.name}</span>
                <span className="text-fire-orange font-heading text-2xl group-hover:scale-110 transition-transform">
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
