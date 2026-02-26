/**
 * BoxKutral - Centro de Entrenamiento de Alto Rendimiento
 * Landing Page - Santiago, Chile
 *
 * High performance training center with fire brand identity
 * Disciplines: Crossfit, Halterofilia, Powerbuilding, GAP 2.0, Endurance
 */

import {
  Navbar,
  Hero,
  Disciplines,
  Coaches,
  Schedules,
  Plans,
  Testimonials,
  FinalCTA,
  Footer,
} from './components'

function App() {
  return (
    <div className="min-h-screen bg-secondary">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section - Fullscreen with ember particles */}
        <Hero />

        {/* Disciplines Section - 5 training disciplines with modals */}
        <Disciplines />

        {/* Coaches Section - Team with photos and videos */}
        <Coaches />

        {/* Schedules Section - Tab-based schedule grid */}
        <Schedules />

        {/* Plans Section - Pricing cards */}
        <Plans />

        {/* Testimonials Section - Client success stories */}
        <Testimonials />

        {/* Final CTA Section - WhatsApp contact */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
