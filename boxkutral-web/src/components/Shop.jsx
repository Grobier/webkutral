import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { products, money, cartTotal, sanitizeCart, orderLink } from '../data/shop'

const storageKey = 'boxkutral-tiendita-v1'
const categories = [['all', 'Todo'], ['poleras', 'Poleras'], ['polerones', 'Polerones'], ['tops', 'Crop tops']]

function ProductCard({ product, onAdd }) {
  const [size, setSize] = useState('')
  const [photo, setPhoto] = useState(0)
  return (
    <article className="overflow-hidden rounded-2xl border border-black/10 bg-white">
      <img src={product.images[photo]} alt={`${product.name}, ${product.color}, vista ${photo + 1}`} width="960" height="960" loading="lazy" decoding="async" className="aspect-square w-full bg-stone-100 object-contain" />
      <div className="p-5">
        <div className="mb-5 flex flex-wrap gap-2" aria-label={`Fotos de ${product.name}`}>
          {product.images.map((image, index) => <button key={image} type="button" onClick={() => setPhoto(index)} aria-label={`Ver foto ${index + 1} de ${product.name}`} aria-pressed={photo === index} className={`h-14 w-14 overflow-hidden rounded-lg border-2 ${photo === index ? 'border-fire-orange' : 'border-transparent'}`}><img src={image} alt="" loading="lazy" className="h-full w-full object-contain" /></button>)}
        </div>
        <p className="text-xs uppercase tracking-widest text-black/60">{product.color} · Kutral</p>
        <h2 className="mt-2 min-h-16 font-heading text-2xl leading-tight">{product.name}</h2>
        <p className="my-3 text-xl font-bold">{money(product.price)} <span className="text-xs font-normal text-black/60">CLP</span></p>
        <fieldset><legend className="mb-2 text-sm">Elige tu talla</legend><div className="flex gap-2">{product.sizes.map(value => <button key={value} type="button" aria-pressed={size === value} onClick={() => setSize(value)} className={`h-11 min-w-11 rounded-lg border px-3 font-semibold ${size === value ? 'border-black bg-black text-white' : 'border-black/20 hover:border-fire-orange'}`}>{value}</button>)}</div></fieldset>
        <button type="button" disabled={!size} onClick={event => onAdd(product, size, event.currentTarget)} className="mt-5 w-full rounded-xl bg-fire-orange px-4 py-3 font-bold text-black transition-colors hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-500">{size ? 'Agregar al carrito +' : 'Selecciona una talla'}</button>
      </div>
    </article>
  )
}

export default function Shop() {
  const dialogRef = useRef(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [category, setCategory] = useState('all')
  const [notice, setNotice] = useState('')
  const [flights, setFlights] = useState([])
  const [impact, setImpact] = useState(0)
  const cartIconRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const additionId = useRef(0)
  const [cart, setCart] = useState(() => {
    try { return sanitizeCart(JSON.parse(localStorage.getItem(storageKey))) } catch { return [] }
  })
  useEffect(() => { try { localStorage.setItem(storageKey, JSON.stringify(cart)) } catch { /* Cart still works without persistent storage. */ } }, [cart])
  useEffect(() => {
    if (!cartOpen) return
    const dialog = dialogRef.current
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [cartOpen])
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  function add(product, size, button) {
    const existing = cart.find(item => item.id === product.id && item.size === size)
    if (existing?.quantity === 99) { setNotice('Máximo de 99 unidades por talla en un pedido.'); return }
    setCart(current => {
      const found = current.some(item => item.id === product.id && item.size === size)
      return found ? current.map(item => item.id === product.id && item.size === size ? { ...item, quantity: Math.min(99, item.quantity + 1) } : item) : [...current, { id: product.id, size, quantity: 1 }]
    })
    setNotice(`${product.name}, talla ${size}, agregado al carrito.`)
    if (reducedMotion) { setImpact(value => value + 1); return }
    const start = button.getBoundingClientRect()
    const end = cartIconRef.current.getBoundingClientRect()
    const x0 = start.left + start.width / 2
    const y0 = start.top + start.height / 2
    const x1 = end.left + end.width / 2
    const y1 = end.top + end.height / 2
    const controlX = Math.min(window.innerWidth - 24, Math.max(x0, x1) + 70)
    const controlY = Math.max(24, Math.min(y0, y1) - 170)
    const points = Array.from({ length: 31 }, (_, i) => {
      const t = i / 30
      return { x: (1-t)**2*x0 + 2*(1-t)*t*controlX + t*t*x1 - 7, y: (1-t)**2*y0 + 2*(1-t)*t*controlY + t*t*y1 - 7 }
    })
    setFlights(current => [...current, { id: ++additionId.current, points }])
  }
  function change(id, size, delta) {
    setCart(current => current.map(item => item.id === id && item.size === size ? { ...item, quantity: Math.min(99, item.quantity + delta) } : item).filter(item => item.quantity > 0))
  }
  return (
    <div className="bg-stone-100 pb-16 text-secondary">
      <section className="bg-secondary px-5 pb-6 pt-28 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-3"><h1 className="font-heading text-4xl sm:text-5xl">TIENDITA<span className="text-fire-orange">.</span></h1><p className="text-sm text-white/70">Lleva el fuego contigo · Retiro en el box</p></div>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap gap-2 py-5" aria-label="Filtrar productos">{categories.map(([id, label]) => <button key={id} type="button" aria-pressed={category === id} onClick={() => setCategory(id)} className={`rounded-full border px-5 py-3 text-sm font-semibold ${category === id ? 'border-black bg-black text-white' : 'border-black/20 bg-white hover:border-black'}`}>{label}</button>)}</div>
        <p role="status" aria-live="polite" className="mb-5 min-h-6 text-sm font-medium">{notice || 'Selecciona la talla de cada prenda para agregarla a tu pedido.'}</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{products.filter(p => category === 'all' || p.category === category).map(p => <ProductCard key={p.id} product={p} onAdd={add} />)}</div>
        {flights.map(flight => Array.from({ length: 6 }, (_, tail) => <motion.span
          key={`${flight.id}-${tail}`} aria-hidden="true" className="cart-photon"
          initial={{ x: flight.points[0].x, y: flight.points[0].y, opacity: 0, scale: 1 - tail * 0.12 }}
          animate={{ x: flight.points.map(p => p.x), y: flight.points.map(p => p.y), opacity: [0, 1 - tail * 0.13, 1 - tail * 0.13, 0] }}
          transition={{ duration: 0.8, delay: tail * 0.025, ease: 'easeIn' }}
          onAnimationComplete={() => {
            if (tail === 0) setImpact(value => value + 1)
            if (tail === 5) setFlights(current => current.filter(item => item.id !== flight.id))
          }}
        />))}
        <button type="button" onClick={() => setCartOpen(true)} aria-haspopup="dialog" aria-controls="carrito" aria-expanded={cartOpen} className="fixed bottom-6 right-4 z-40 flex items-center gap-3 rounded-full bg-secondary px-5 py-4 font-semibold text-white shadow-xl ring-1 ring-white/20 hover:bg-stone-800 sm:right-6">
          <span ref={cartIconRef} className="relative flex h-5 w-5 items-center justify-center">
            {impact > 0 && <span key={`ring-${impact}`} aria-hidden="true" className="cart-impact-ring" />}
            <svg key={impact} aria-hidden="true" className={`h-5 w-5 ${impact ? 'cart-added-bounce' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l2.5 12h11L21 7H6M9 20h.01M18 20h.01" /></svg>
          </span>
          Carrito <span className="rounded-full bg-fire-orange px-2.5 py-0.5 text-sm text-black">{count}</span>
        </button>
        <dialog ref={dialogRef} id="carrito" aria-labelledby="cart-title" onCancel={() => setCartOpen(false)} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setCartOpen(false) } }} className="fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-dvh w-full max-w-md overflow-y-auto border-0 bg-white p-6 text-secondary shadow-2xl backdrop:bg-black/60">
            <div className="flex items-center justify-between gap-3 border-b border-black/10 pb-4"><h2 id="cart-title" className="font-heading text-3xl">TU CARRITO <span className="text-fire-orange">({count})</span></h2><button type="button" onClick={() => setCartOpen(false)} aria-label="Cerrar carrito" className="h-11 w-11 rounded-full border border-black/15 text-2xl hover:bg-stone-100">×</button></div>
            {!cart.length ? <p className="py-8 text-sm text-black/60">Tu carrito está vacío. Agrega tus prendas favoritas para comenzar.</p> : <>
              <ul className="divide-y divide-black/10">{cart.map(item => {
                const p = products.find(p => p.id === item.id)
                return <li key={`${item.id}-${item.size}`} className="py-5"><p className="text-sm font-semibold">{p.name}</p><p className="mt-1 text-xs text-black/60">{p.color} · Talla {item.size} · {money(p.price)} c/u</p><div className="mt-3 flex items-center justify-between gap-2"><div className="flex items-center rounded-lg border border-black/20"><button type="button" aria-label={`Reducir cantidad de ${p.name} talla ${item.size}`} onClick={() => change(item.id, item.size, -1)} className="h-11 w-11">−</button><span className="min-w-5 text-center">{item.quantity}</span><button type="button" disabled={item.quantity >= 99} aria-label={`Aumentar cantidad de ${p.name} talla ${item.size}`} onClick={() => change(item.id, item.size, 1)} className="h-11 w-11 disabled:opacity-30">+</button></div><span className="text-sm font-semibold">{money(p.price * item.quantity)}</span></div><button type="button" aria-label={`Quitar ${p.name} talla ${item.size}`} onClick={() => setCart(current => current.filter(row => row.id !== item.id || row.size !== item.size))} className="mt-2 min-h-10 text-sm text-black/60 underline">Quitar</button></li>
              })}</ul>
              <div className="flex justify-between border-t border-black/10 py-5 font-bold"><span>Total CLP</span><span>{money(cartTotal(cart))}</span></div>
              <a href={orderLink(cart)} target="_blank" rel="noopener noreferrer" className="block rounded-xl bg-green-700 px-4 py-4 text-center text-sm font-bold text-white hover:bg-green-800">Enviar pedido por WhatsApp ↗</a>
            </>}
            <p className="mt-5 text-xs leading-relaxed text-black/60">Retiro en el box. Confirmaremos disponibilidad, pago y retiro por WhatsApp. El envío del mensaje no realiza un cobro.</p>
            <button type="button" onClick={() => setCartOpen(false)} className="mt-5 w-full rounded-xl border border-black/20 px-4 py-3 text-sm font-semibold hover:bg-stone-100">Seguir comprando</button>
        </dialog>
      </div>
    </div>
  )
}
