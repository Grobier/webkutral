import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { WHATSAPP_LINK, INSTAGRAM_LINK } from '../constants'
import { containerVariants, cardVariants } from '../utils/animations'

const faqs = [
  {
    question: '¿Tienen clase de prueba gratuita?',
    answer:
      'Sí. La primera clase de prueba es gratis y sin compromiso. Puedes agendarla directamente por WhatsApp.',
  },
  {
    question: '¿Cuánto cuestan los planes de entrenamiento?',
    answer:
      'Los planes comienzan desde $60.000 al mes. También hay opciones de 16 clases y plan ilimitado, todos con matrícula gratis y acceso a las disciplinas del box.',
  },
  {
    question: '¿Qué disciplinas ofrece BoxKutral?',
    answer:
      'Trabajamos CrossFit, Halterofilia, Powerbuilding, GAP 2.0 y Endurance. Además contamos con servicios complementarios de kinesiología deportiva y nutrición deportiva.',
  },
  {
    question: '¿Cuáles son los horarios del box?',
    answer:
      'Las clases funcionan de lunes a viernes desde las 6:00 hasta las 21:00 y los sábados de 8:00 a 13:00. Open Box funciona lunes, miércoles y viernes de 6:00 a 22:00; martes y jueves de 6:00 a 19:00; y sábado de 8:00 a 13:00.',
  },
  {
    question: '¿Es apto para principiantes?',
    answer:
      'Sí. Los coaches adaptan cada clase según tu nivel para que puedas progresar con técnica, seguridad y una carga adecuada.',
  },
  {
    question: '¿Dónde está ubicado BoxKutral?',
    answer:
      'Estamos en Nataniel Cox 1444, Santiago, Región Metropolitana. También puedes escribirnos por Instagram o WhatsApp para llegar y agendar.',
  },
]

function FAQItem({ item, index, isOpen, onToggle }) {
  return (
    <motion.article
      variants={cardVariants}
      className="overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-8"
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
        >
          <span className="text-base font-semibold text-secondary sm:text-lg">{item.question}</span>
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-fire-orange/20 text-fire-orange transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
            aria-hidden="true"
          >
            +
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="px-6 pb-6 text-base leading-relaxed text-secondary/70 sm:px-8">
              <p>{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

export default function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="bg-secondary/3 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-fire-orange">
            Resuelve tus dudas
          </span>
          <h2 className="mt-4 font-heading text-4xl text-secondary sm:text-5xl lg:text-6xl">
            PREGUNTAS FRECUENTES
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-secondary/65">
            Lo esencial antes de venir a entrenar: planes, horarios, niveles y cómo agendar tu
            primera clase.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-4"
        >
          {faqs.map((item, index) => (
            <FAQItem
              key={item.question}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </motion.div>

        <div className="mt-10 text-center text-sm text-secondary/55">
          <p>
            ¿Necesitas una respuesta directa?{' '}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-fire-orange hover:underline"
            >
              Escríbenos por WhatsApp
            </a>{' '}
            o visita nuestro{' '}
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-fire-orange hover:underline"
            >
              Instagram
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
