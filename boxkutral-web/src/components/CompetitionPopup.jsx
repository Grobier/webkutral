import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

const DISMISS_KEY = 'bk_comp_dismissed'
const REGISTER_URL = 'https://facewod.com/competition/256?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0AZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnHFDjNUzpaErGaHZVaVsPxTeBrg5ArMFjT5-GWGai5LlbAxPIcUhP1pFsVwE_aem_2ASDGf3xqojOHiNGxkbreA'

// mode: 'hidden' | 'popup' | 'tab'
export default function CompetitionPopup() {
  const [mode, setMode] = useState('hidden')

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY)) return
    const t = setTimeout(() => setMode('popup'), 800)
    return () => clearTimeout(t)
  }, [])

  const minimize = () => setMode('tab')
  const reopen   = () => setMode('popup')
  const dismiss  = () => {
    setMode('hidden')
    localStorage.setItem(DISMISS_KEY, '1')
  }

  return createPortal(
    <>
      {/* ── POPUP COMPLETO ── */}
      <AnimatePresence>
        {mode === 'popup' && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={minimize}
              className="fixed inset-0 z-[60] bg-black/80"
            />

            <motion.div
              key="popup"
              role="dialog"
              aria-modal="true"
              aria-label="Competencia de Halterofilia en BoxKutral"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="fixed left-1/2 top-1/2 z-[61] w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 bg-secondary shadow-2xl"
            >
              {/* Header */}
              <div
                className="relative overflow-hidden px-7 pb-6 pt-8"
                style={{ background: 'linear-gradient(135deg, rgba(240,180,0,0.18) 0%, rgba(255,107,0,0.10) 100%)' }}
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 rounded-full bg-yellow-400/15 blur-2xl" />
                <div className="pointer-events-none absolute -left-8 bottom-0 h-32 w-32 rounded-full bg-fire-orange/10 blur-2xl" />

                {/* Badge */}
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

                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-white/60">
                    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-semibold text-white/80">11 y 12 de Julio</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm text-white/60">BoxKutral — Nataniel Cox 1444, Santiago</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="px-7 pb-7 pt-5">
                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={minimize}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  style={{
                    background: 'linear-gradient(135deg, #F0B400, #FF6B00)',
                    boxShadow: '0 0 32px rgba(240,180,0,0.3)',
                  }}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Inscribirme ahora
                </a>

                <button
                  onClick={minimize}
                  className="mt-3 w-full py-2 text-xs text-white/30 transition-colors hover:text-white/50"
                >
                  Ver más tarde
                </button>
              </div>

              {/* X */}
              <button
                onClick={minimize}
                className="absolute right-4 top-4 rounded-lg p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white/80"
                aria-label="Minimizar"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── TAB LATERAL ── */}
      <AnimatePresence>
        {mode === 'tab' && (
          <motion.div
            key="side-tab"
            initial={{ x: 120 }}
            animate={{ x: 0 }}
            exit={{ x: 120 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            className="fixed right-0 top-1/2 z-50 -translate-y-1/2 flex flex-col items-center"
          >
            {/* Botón principal — abre el popup */}
            <button
              onClick={reopen}
              className="group flex flex-col items-center gap-3 rounded-l-2xl px-3 py-5 shadow-2xl transition-all duration-300 hover:px-4"
              style={{
                background: 'linear-gradient(180deg, #F0B400, #FF6B00)',
                boxShadow: '-4px 0 24px rgba(240,180,0,0.35)',
              }}
              aria-label="Ver competencia de halterofilia"
            >
              {/* Ícono pesas */}
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z"/>
              </svg>

              {/* Texto vertical */}
              <span
                className="text-[11px] font-black uppercase tracking-widest text-white"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.2em' }}
              >
                Compite
              </span>

              {/* Fechas */}
              <span className="rounded-md bg-black/20 px-1.5 py-1 text-center text-[10px] font-bold leading-tight text-white">
                11-12<br />JUL
              </span>
            </button>

            {/* X — cierra permanentemente */}
            <button
              onClick={dismiss}
              className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white/50 transition-colors hover:bg-white/20 hover:text-white"
              aria-label="No mostrar más"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  )
}
