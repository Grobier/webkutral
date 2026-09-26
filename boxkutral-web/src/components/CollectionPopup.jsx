import { useEffect, useRef } from 'react'

const sessionKey = 'boxkutral-collection-2026-seen'
let shownWithoutStorage = false

export default function CollectionPopup() {
  const dialogRef = useRef(null)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(sessionKey)) return
    } catch {
      // If storage is unavailable, do not interrupt visitors repeatedly.
      return
    }
    if (shownWithoutStorage) return

    const dialog = dialogRef.current
    let previousFocus
    let previousOverflow
    let opened = false
    const restore = () => {
      if (!opened) return
      opened = false
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
    dialog.addEventListener('close', restore)
    const timer = window.setTimeout(() => {
      if (document.querySelector('dialog[open]')) return
      previousFocus = document.activeElement
      previousOverflow = document.body.style.overflow
      dialog.showModal()
      opened = true
      document.body.style.overflow = 'hidden'
      shownWithoutStorage = true
      try { sessionStorage.setItem(sessionKey, '1') } catch { /* In-memory fallback for this page. */ }
    }, 700)

    return () => {
      window.clearTimeout(timer)
      dialog.removeEventListener('close', restore)
      if (dialog.open) dialog.close()
      restore()
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="collection-title"
      className="fixed inset-0 m-auto max-h-[94dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl border border-white/15 bg-secondary p-0 text-white shadow-2xl backdrop:bg-black/75"
      onClick={event => {
        if (event.target !== event.currentTarget) return
        const rect = event.currentTarget.getBoundingClientRect()
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialogRef.current.close()
      }}
    >
      <div className="relative">
        <button type="button" aria-label="Cerrar anuncio de nueva colección" onClick={() => dialogRef.current.close()} className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center text-xl leading-none text-white drop-shadow-md hover:text-fire-orange focus-visible:outline-2 focus-visible:outline-fire-orange">×</button>
        <img src="/images/tiendita/nueva-coleccion.jpeg" alt="Nueva colección Kutral: poleras, crop tops y polerones" width="1080" height="1280" className="max-h-[calc(94dvh-160px)] w-full object-contain" />
      </div>
      <div className="px-5 py-4 text-center">
        <h2 id="collection-title" className="font-heading text-2xl sm:text-3xl">Descubre la nueva colección</h2>
        <a href="/tiendita/" className="mt-3 block rounded-xl bg-fire-orange px-5 py-3 font-bold text-black hover:bg-orange-400">Ir a Tiendita →</a>
      </div>
    </dialog>
  )
}
