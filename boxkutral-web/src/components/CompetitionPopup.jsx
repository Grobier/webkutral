import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'bk_comp_popup_closed'
const REGISTER_URL = 'https://facewod.com/competition/256?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0AZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnHFDjNUzpaErGaHZVaVsPxTeBrg5ArMFjT5-GWGai5LlbAxPIcUhP1pFsVwE_aem_2ASDGf3xqojOHiNGxkbreA'

export default function CompetitionPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const closed = localStorage.getItem(STORAGE_KEY)
    if (closed) return
    const t = setTimeout(() => setVisible(true), 2500)
    return () => clearTimeout(t)
  }, [])

  const close = () => {
    setVisible(false)
    localStorage.setItem(STORAGE_KEY, '1')
  }

  return createPortal(
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm"
          />

          <motion.div
            key="popup"
            role="dialog"
            aria-modal="true"
            aria-label="Competencia de Halterofilia en BoxKutral"
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 30 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="fixed left-1/2 top-1/2 z-[61] w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 bg-secondary shadow-2xl"
          >
            {/* Header con gradiente fuego */}
            <div className="relative overflow-hidden px-7 pb-6 pt-8"
              style={{ background: 'linear-gradient(135deg, #F0B40022 0%, #FF6B0015 100%)' }}
            >
              {/* Glow decorativo */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-yellow-400/10 blur-2xl" />
              <div className="pointer-events-none absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-fire-orange/10 blur-2xl" />

              {/* Badge preventa */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-3 py-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-yellow-400">
                  Preventa disponible
                </span>
              </div>

              <h2 className="font-heading text-3xl leading-tight text-white sm:text-4xl">
                COMPETENCIA<br />
                <span style={{ color: '#F0B400' }}>HALTEROFILIA</span>
              </h2>

              <div className="mt-3 flex items-center gap-2 text-white/60">
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">11 y 12 de Julio</span>
              </div>

              <div className="mt-1.5 flex items-center gap-2 text-white/60">
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-medium">BoxKutral — Nataniel Cox 1444, Santiago</span>
              </div>
            </div>

            {/* CTA */}
            <div className="px-7 pb-7 pt-5">
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                style={{
                  background: 'linear-gradient(135deg, #F0B400, #FF6B00)',
                  boxShadow: '0 0 28px rgba(240,180,0,0.25)',
                }}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Inscribirme ahora
              </a>

              <button
                onClick={close}
                className="mt-3 w-full py-2 text-xs text-white/30 transition-colors hover:text-white/60"
              >
                Cerrar
              </button>
            </div>

            {/* Botón X */}
            <button
              onClick={close}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white/80"
              aria-label="Cerrar"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
