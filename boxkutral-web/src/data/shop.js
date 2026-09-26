import { createWhatsAppLink } from '../constants.js'

const product = (id, category, model, name, price, color, photos) => ({
  id, category, name, price, color,
  sizes: category === 'tops' ? ['S', 'M', 'L'] : ['S', 'M', 'L', 'XL'],
  images: photos.map(file => `/images/tiendita/${category}/modelo-${model}/${file}.webp`),
})

export const products = [
  product('polera-disco', 'poleras', 2, 'Polera polo UNISEX DISCO EN LLAMAS', 15000, 'Negro', ['2', 'Frente', 'Espalda', 'Detalles', 'Detalles(1)']),
  product('polera-mano', 'poleras', 3, 'Polera polo UNISEX MANO EN MAGNESIO', 15000, 'Negro', ['1', 'Frente', '14']),
  product('polera-acid', 'poleras', 1, 'Polera Polo Acid UNISEX DISCO EN LLAMAS', 18000, 'Gris', ['Unisex', 'Frente', 'Espalda', 'Detalles']),
  product('top-disco', 'tops', 1, 'Crop top DISCO EN LLAMAS', 15000, 'Negro', ['Unisex', 'Frente', 'Trasera', 'Detalles']),
  product('top-manos', 'tops', 2, 'Crop top MANOS EN MAGNESIO', 15000, 'Negro', ['Unisex', 'Delantera', 'Trasera', 'Detalles', 'Detalles(1)']),
  product('poleron-disco', 'polerones', 2, 'Polerón DISCO EN LLAMAS', 25000, 'Negro', ['2', 'Detalles', 'Detalles(1)']),
  product('poleron-manos', 'polerones', 3, 'Polerón MANOS EN MAGNESIO', 25000, 'Negro', ['Frente', 'Bolsillos', 'Detalles', 'Detalles(1)']),
  product('poleron-acid', 'polerones', 1, 'Polerón Acid DISCO EN LLAMAS', 27000, 'Gris', ['Frente', 'Bolsillos', 'Detalles']),
]
export const money = value => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(value)
export const cartTotal = cart => cart.reduce((sum, item) => sum + products.find(p => p.id === item.id).price * item.quantity, 0)
export function sanitizeCart(value) {
  if (!Array.isArray(value)) return []
  return value.filter(item => item && products.some(p => p.id === item.id && p.sizes.includes(item.size)) && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 99)
    .filter((item, index, items) => items.findIndex(other => other.id === item.id && other.size === item.size) === index)
    .map(({ id, size, quantity }) => ({ id, size, quantity }))
}
export function orderLink(cart) {
  return createWhatsAppLink(['Hola BoxKutral, quiero hacer este pedido de Tiendita:', '', ...cart.map(item => {
    const p = products.find(p => p.id === item.id)
    return `${item.quantity} × ${p.name} | Talla ${item.size} | ${p.color} | ${money(p.price * item.quantity)}`
  }), '', `Total: ${money(cartTotal(cart))} CLP`, 'Retiro en el box: Nataniel Cox 1444, Santiago.', '¿Me confirman disponibilidad y cómo pagar?'].join('\n'))
}
