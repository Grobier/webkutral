/**
 * BoxKutral - Configuration Constants
 * Centro de Entrenamiento de Alto Rendimiento
 */

// ==============================================
// CONTACT LINKS
// ==============================================

export const WHATSAPP_BASE_LINK = 'https://wa.me/56976175531'
export const createWhatsAppLink = (message = 'Hola BoxKutral, quiero agendar una sesión') =>
  `${WHATSAPP_BASE_LINK}?text=${encodeURIComponent(message)}`
export const WHATSAPP_LINK = createWhatsAppLink()
export const FREE_CLASS_LINK = createWhatsAppLink('Hola BoxKutral! Quiero agendar mi clase de prueba gratis 🔥')
export const INSTAGRAM_LINK = 'https://www.instagram.com/boxkutral'
export const PHONE_DISPLAY = '+56 9 7617 5531'

// ==============================================
// DISCIPLINE COLORS
// ==============================================

export const DISCIPLINE_COLORS = {
  crossfit: '#FF6B00',
  halterofilia: '#F0B400',
  powerbuilding: '#9B59B6',
  gap: '#2ECC71',
  endurance: '#00BCD4',
}

// ==============================================
// BRAND
// ==============================================

export const BRAND = {
  name: 'BoxKutral',
  tagline: 'Centro de Entrenamiento de Alto Rendimiento',
  location: 'Santiago, Chile',
  year: 2026,
}
