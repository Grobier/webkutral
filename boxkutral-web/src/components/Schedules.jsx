import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { WHATSAPP_LINK } from '../constants'

/**
 * Schedules Component
 * Tab-based schedule grid for each discipline
 */

const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

const disciplines = [
  { id: 'crossfit', name: 'Crossfit', color: '#FF6B00' },
  { id: 'halterofilia', name: 'Halterofilia', color: '#F0B400' },
  { id: 'gap', name: 'GAP 2.0', color: '#2ECC71' },
  { id: 'endurance', name: 'Endurance', color: '#00BCD4' },
  { id: 'powerbuilding', name: 'Powerbuilding', color: '#9B59B6' },
]

// Schedule data: true = active, false = inactive, string = special label
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
    >
      {label || (isActive ? '●' : '—')}
    </div>
  )
}

function ScheduleGrid({ disciplineId, color }) {
  const data = scheduleData[disciplineId]

  return (
    <div className="space-y-8">
      {/* AM Block */}
      <div>
        <h4 className="text-lg font-semibold text-secondary/80 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
          BLOQUE AM (6:00 - 12:00)
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="text-left text-secondary/50 text-sm font-medium py-2 w-20">Hora</th>
                {days.map((day) => (
                  <th key={day} className="text-center text-secondary/50 text-sm font-medium py-2">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.am).map(([hour, slots]) => (
                <tr key={hour}>
                  <td className="text-secondary/70 text-sm font-medium py-2">{hour}</td>
                  {slots.map((slot, idx) => (
                    <td key={idx} className="py-1 px-1">
                      <ScheduleSlot value={slot} color={color} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PM Block */}
      <div>
        <h4 className="text-lg font-semibold text-secondary/80 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
          BLOQUE PM (17:00 - 21:00)
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="text-left text-secondary/50 text-sm font-medium py-2 w-20">Hora</th>
                {days.map((day) => (
                  <th key={day} className="text-center text-secondary/50 text-sm font-medium py-2">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.pm).map(([hour, slots]) => (
                <tr key={hour}>
                  <td className="text-secondary/70 text-sm font-medium py-2">{hour}</td>
                  {slots.map((slot, idx) => (
                    <td key={idx} className="py-1 px-1">
                      <ScheduleSlot value={slot} color={color} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function Schedules() {
  const [activeTab, setActiveTab] = useState('crossfit')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const activeDiscipline = disciplines.find((d) => d.id === activeTab)

  return (
    <section id="horarios" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-fire-orange text-sm font-semibold tracking-widest uppercase">
            Planifica tu semana
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-secondary mt-4">
            HORARIOS
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
          {disciplines.map((discipline) => (
            <button
              key={discipline.id}
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

        {/* Schedule Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-secondary/5 rounded-lg p-6 lg:p-8"
          >
            <ScheduleGrid disciplineId={activeTab} color={activeDiscipline.color} />
          </motion.div>
        </AnimatePresence>

        {/* Note */}
        <p className="text-center text-secondary/50 text-sm mt-8">
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
