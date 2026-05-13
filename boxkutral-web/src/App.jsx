/**
 * BoxKutral - Centro de Entrenamiento de Alto Rendimiento
 * Landing Page - Santiago, Chile
 *
 * High performance training center with fire brand identity
 * Disciplines: Crossfit, Halterofilia, Powerbuilding, GAP 2.0, Endurance
 */

import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import CompetitionPopup from './components/CompetitionPopup'

// Below-fold sections: lazy loaded for faster initial paint
const Disciplines = lazy(() => import('./components/Disciplines'))
const Coaches = lazy(() => import('./components/Coaches'))
const Services = lazy(() => import('./components/Services'))
const Schedules = lazy(() => import('./components/Schedules'))
const Plans = lazy(() => import('./components/Plans'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const FinalCTA = lazy(() => import('./components/FinalCTA'))
const Footer = lazy(() => import('./components/Footer'))

function SectionFallback() {
  return <div className="min-h-96 bg-secondary" aria-hidden="true" />
}

function App() {
  return (
    <div className="min-h-screen bg-secondary">
      {/* Skip to content — accesibilidad de teclado */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-fire-orange focus:px-4 focus:py-2 focus:font-bold focus:text-white"
      >
        Saltar al contenido
      </a>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content">
        {/* Hero Section - Fullscreen with ember particles */}
        <Hero />

        {/* Disciplines Section - 5 training disciplines with modals */}
        <Suspense fallback={<SectionFallback />}>
          <Disciplines />
        </Suspense>

        {/* Coaches Section - Team with photos and videos */}
        <Suspense fallback={<SectionFallback />}>
          <Coaches />
        </Suspense>

        {/* Services Section - Kinesiología y Nutrición */}
        <Suspense fallback={<SectionFallback />}>
          <Services />
        </Suspense>

        {/* Schedules Section - Tab-based schedule grid */}
        <Suspense fallback={<SectionFallback />}>
          <Schedules />
        </Suspense>

        {/* Plans Section - Pricing cards */}
        <Suspense fallback={<SectionFallback />}>
          <Plans />
        </Suspense>

        {/* Testimonials Section - Client success stories */}
        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>

        {/* Final CTA Section - WhatsApp contact */}
        <Suspense fallback={<SectionFallback />}>
          <FinalCTA />
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* Floating WhatsApp CTA */}
      <FloatingWhatsApp />

      {/* Competition Popup */}
      <CompetitionPopup />
    </div>
  )
}

export default App
