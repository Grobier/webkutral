import { createWhatsAppLink } from '../constants'
import { WhatsAppIcon } from './icons'

export default function FloatingWhatsApp() {
  return (
    <a
      href={createWhatsAppLink('Hola BoxKutral, quiero más información')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-3 py-3 text-white shadow-2xl shadow-black/30 transition-all duration-300 hover:scale-105 hover:bg-[#20ba5a] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 sm:bottom-6 sm:right-6 sm:px-5"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 sm:h-12 sm:w-12">
        <WhatsAppIcon className="h-6 w-6" />
      </span>
      <span className="hidden pr-1 text-left sm:block">
        <span className="block text-[10px] uppercase tracking-[0.22em] text-white/75">Hablemos</span>
        <span className="block text-sm font-semibold leading-tight">Agenda por WhatsApp</span>
      </span>
    </a>
  )
}

