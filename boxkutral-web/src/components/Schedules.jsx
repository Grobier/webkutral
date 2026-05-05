import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { WHATSAPP_LINK } from '../constants'

const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

const disciplines = [
  { id: 'crossfit', name: 'CrossFit', color: '#FF6B00' },
  { id: 'halterofilia', name: 'Halterofilia', color: '#F0B400' },
  { id: 'gap', name: 'GAP 2.0', color: '#2ECC71' },
  { id: 'endurance', name: 'Endurance', color: '#00BCD4' },
  { id: 'powerbuilding', name: 'Powerbuilding', color: '#9B59B6' },
]

const scheduleData = {
  crossfit: {
    am: {
      '6:00': [true, true, true, true, true, false],
      '7:00': [true, true, true, true, true, false],
      '8:00': [true, true, true, true, true, false],
      '9:00': [false, false, false, false, false, false],
      '10:00': [false, false, false, false, false, false],
      '11:00': [false, false, false, false, false, '90 Min'],
      '12:00': [true, false, true, false, true, false],
    },
    pm: {
      '17:00': [true, true, true, true, true, false],
      '18:00': [true, false, true, true, true, false],
      '19:00': [true, true, true, true, true, false],
      '20:00': [true, true, false, true, false, false],
      '21:00': [true, true, false, true, false, false],
    },
  },
  halterofilia: {
    am: {
      '6:00': [false, false, false, false, false, false],
      '7:00': [false, false, false, false, false, false],
      '8:00': [false, false, false, false, false, '90 Min'],
      '9:00': [false, false, false, false, false, false],
      '10:00': [false, false, false, false, false, false],
      '11:00': [false, false, false, false, false, '90 Min'],
      '12:00': [false, false, false, false, false, false],
    },
    pm: {
      '17:00': [false, '90 Min', false, '90 Min', false, false],
      '18:00': [false, false, false, false, false, false],
      '19:00': ['90 Min', false, false, false, '90 Min', false],
      '20:00': [false, '90 Min', false, '90 Min', false, false],
      '21:00': [false, false, false, false, false, false],
    },
  },
  gap: {
    am: {
      '6:00': [false, false, false, false, false, false],
      '7:00': [false, false, false, false, false, false],
      '8:00': [false, false, false, false, false, false],
      '9:00': [false, false, false, false, false, false],
      '10:00': [false, false, false, false, false, false],
      '11:00': [false, false, false, false, false, false],
      '12:00': [false, true, false, false, true, false],
    },
    pm: {
      '17:00': [false, false, false, false, false, false],
      '18:00': [false, true, false, true, false, false],
      '19:00': [false, false, false, false, false, false],
      '20:00': [false, false, false, false, false, false],
      '21:00': [false, false, false, false, false, false],
    },
  },
  endurance: {
    am: {
      '6:00': [false, false, false, false, false, false],
      '7:00': [false, false, false, false, false, false],
      '8:00': [false, false, false, false, false, false],
      '9:00': [false, false, false, false, false, false],
      '10:00': [false, false, false, false, false, false],
      '11:00': [false, false, false, false, false, false],
      '12:00': [false, false, true, false, false, false],
    },
    pm: {
      '17:00': [false, false, false, false, false, false],
      '18:00': [false, false, true, false, true, false],
      '19:00': [false, false, false, false, false, false],
      '20:00': [false, false, false, false, false, false],
      '21:00': [false, false, false, false, false, false],
    },
  },
  powerbuilding: {
    am: {
      '6:00': [false, false, false, false, false, false],
      '7:00': [false, false, false, false, false, false],
      '8:00': [false, false, false, false, false, false],
      '9:00': [false, false, false, false, false, false],
      '10:00': [false, false, false, false, false, false],
      '11:00': [false, false, false, false, false, false],
      '12:00': [false, false, false, false, false, '+HIT'],
    },
    pm: {
      '17:00': [false, false, false, false, false, false],
      '18:00': [false, false, false, false, false, false],
      '19:00': [false, true, false, true, false, false],
      '20:00': [false, false, true, false, false, false],
      '21:00': [false, false, false, false, false, false],
    },
  },
}

function ScheduleSlot({ value, color }) {
  const isActive = value === true || typeof value === 'string'
  const label = typeof value === 'string' ? value : ''

  return (
    <div
      className={`schedule-slot ${isActive ? 'active' : 'inactive'}`}
      style={isActive ? { backgroundColor: color } : {}}
      aria-label={isActive ? (label || 'Clase disponible') : 'Sin clase'}
    >
      <span aria-hidden="true">{label || (isActive ? '●' : '—')}</span>
    </div>
  )
}

function MobileScheduleGrid({ disciplineId, color }) {
  const data = scheduleData[disciplineId]
  const [selectedDay, setSelectedDay] = useState(0)

  const allSlots = [
    ...Object.entries(data.am).map(([hour, slots]) => ({ hour, slot: slots[selectedDay], block: 'AM' })),
    ...Object.entries(data.pm).map(([hour, slots]) => ({ hour, slot: slots[selectedDay], block: 'PM' })),
  ].filter(({ slot }) => slot !== false)

  return (
    <div>
      <div className="mb-4 flex gap-1.5">
        {days.map((day, i) => (
          <button
            key={day}
            onClick={() => setSelectedDay(i)}
            className="flex-1 rounded-lg py-2 text-xs font-semibold transition-colors duration-200"
            style={
              selectedDay === i
                ? { backgroundColor: color, color: '#fff' }
                : { backgroundColor: 'rgba(0,0,0,0.06)', color: 'rgba(0,0,0,0.5)' }
            }
          >
            {day}
          </button>
        ))}
      </div>

      {allSlots.length === 0 ? (
        <p className="py-8 text-center text-sm text-secondary/40">Sin clases este día</p>
      ) : (
        <div className="space-y-2">
          {allSlots.map(({ hour, slot, block }) => (
            <div
              key={`${hour}-${block}`}
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{ backgroundColor: `${color}15` }}
            >
              <span className="w-12 text-sm font-medium text-secondary/60">{hour}</span>
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
              <span className="flex-1 text-sm font-medium text-secondary">
                {typeof slot === 'string' ? slot : 'Clase disponible'}
              </span>
              <span
                className="rounded px-1.5 py-0.5 text-xs font-semibold"
                style={{ backgroundColor: `${color}20`, color }}
              >
                {block}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ScheduleTable({ data, block, color }) {
  const rows = block === 'am' ? data.am : data.pm
  return (
    <div className="overflow-hidden rounded-xl border border-secondary/8">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="w-16 py-2 pl-3 text-left text-xs font-medium text-secondary/50">Hora</th>
            {days.map((day) => (
              <th key={day} scope="col" className="py-2 text-center text-xs font-medium text-secondary/50">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(rows).map(([hour, slots]) => (
            <tr key={hour}>
              <td className="py-1 pl-3 text-xs font-medium text-secondary/70">{hour}</td>
              {slots.map((slot, idx) => (
                <td key={idx} className="px-0.5 py-0.5">
                  <ScheduleSlot value={slot} color={color} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ScheduleGrid({ disciplineId, color }) {
  const data = scheduleData[disciplineId]

  return (
    <>
      {/* Mobile: day selector + vertical list */}
      <div className="sm:hidden">
        <MobileScheduleGrid disciplineId={disciplineId} color={color} />
      </div>

      {/* Desktop: full tables */}
      <div className="hidden sm:block space-y-8">
        <div>
          <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-secondary/80">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
            BLOQUE AM (6:00 - 12:00)
          </h4>
          <ScheduleTable data={data} block="am" color={color} />
        </div>
        <div>
          <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-secondary/80">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
            BLOQUE PM (17:00 - 21:00)
          </h4>
          <ScheduleTable data={data} block="pm" color={color} />
        </div>
      </div>
    </>
  )
}

export default function Schedules() {
  const [activeTab, setActiveTab] = useState('crossfit')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const activeDiscipline = disciplines.find((discipline) => discipline.id === activeTab)

  return (
    <section id="horarios" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-fire-orange">
            Planifica tu semana
          </span>
          <h2 className="mt-4 font-heading text-4xl text-secondary sm:text-5xl lg:text-6xl">
            HORARIOS
          </h2>
        </motion.div>

        <div
          role="tablist"
          aria-label="Disciplinas"
          className="mb-3 flex gap-2 overflow-x-auto pb-4 scrollbar-thin"
        >
          {disciplines.map((discipline) => (
            <button
              key={discipline.id}
              role="tab"
              aria-selected={activeTab === discipline.id}
              aria-controls={`schedule-panel-${discipline.id}`}
              onClick={() => setActiveTab(discipline.id)}
              className={`tab-button ${activeTab === discipline.id ? 'active' : ''}`}
              style={
                activeTab === discipline.id
                  ? { borderColor: discipline.color, color: discipline.color }
                  : {}
              }
            >
              {discipline.name}
            </button>
          ))}
        </div>

        <p className="mb-8 text-sm text-secondary/45 hidden sm:block md:hidden">
          Desliza horizontalmente para revisar todos los días y bloques.
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id={`schedule-panel-${activeTab}`}
            role="tabpanel"
            aria-label={`Horarios de ${activeDiscipline.name}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl bg-secondary/5 p-6 lg:p-8"
          >
            <ScheduleGrid disciplineId={activeTab} color={activeDiscipline.color} />
          </motion.div>
        </AnimatePresence>

        <p className="mt-8 text-center text-sm text-secondary/50">
          * Horarios sujetos a cambios.{' '}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fire-orange hover:underline"
          >
            Consulta por WhatsApp
          </a>
        </p>
      </div>
    </section>
  )
}
