# BoxKutral - Landing Page

Centro de Entrenamiento de Alto Rendimiento en Santiago, Chile.

## Stack

- **React** (Vite)
- **Tailwind CSS** for styling
- **Framer Motion** for animations

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Configuration

### Contact Links

Update links in `src/constants.js`:

```javascript
export const WHATSAPP_LINK = 'https://wa.me/56976175531?text=...'
export const INSTAGRAM_LINK = 'https://www.instagram.com/boxkutral'
```

### Logo

Replace the text placeholder in components with your logo image:

```jsx
// Current (placeholder):
<span className="font-heading text-3xl">BOXKUTRAL</span>

// Replace with:
<img src="./logo.png" alt="BoxKutral" className="h-10" />
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx       # Sticky navigation
│   ├── Hero.jsx         # Fullscreen hero with ember particles
│   ├── Disciplines.jsx  # 5 discipline cards
│   ├── Schedules.jsx    # Tab-based schedule grid
│   ├── Plans.jsx        # Pricing cards
│   ├── Testimonials.jsx # Client testimonials
│   ├── FinalCTA.jsx     # Contact call-to-action
│   ├── Footer.jsx       # Footer with links
│   └── index.js         # Component exports
├── constants.js         # Configuration (links, brand info)
├── index.css            # Tailwind + custom styles
├── App.jsx              # Main app component
└── main.jsx             # React entry point
```

## Sections

1. **Navbar** - Sticky nav with mobile hamburger menu
2. **Hero** - Full screen with ember particles animation
3. **Disciplinas** - 5 training disciplines with accent colors
4. **Horarios** - Tab-based schedule grid per discipline
5. **Planes** - 3 main plans + flexible packs
6. **Testimonios** - Client success stories
7. **Final CTA** - WhatsApp contact
8. **Footer** - Links and copyright

## Color Palette

- Primary: `#FFFFFF` (White)
- Secondary: `#0A0A0A` (Black)
- Fire Orange: `#FF6B00`
- Fire Red: `#C0392B`

### Discipline Colors

- Crossfit: `#FF6B00`
- Halterofilia: `#F0B400`
- Powerbuilding: `#9B59B6`
- GAP 2.0: `#2ECC71`
- Endurance: `#00BCD4`

## Typography

- Headings: "Bebas Neue"
- Body: "Inter"

## Customization

### Schedules

Edit the `scheduleData` object in `src/components/Schedules.jsx`:

```javascript
const scheduleData = {
  crossfit: {
    am: {
      '6:00': [true, true, true, true, true, false], // Lun-Sáb
      // ...
    },
    pm: { /* ... */ }
  },
  // ...
}
```

- `true` = Active slot
- `false` = Inactive slot
- `'90 Min'` or `'+HIT'` = Special label

### Plans

Edit the `plans` array in `src/components/Plans.jsx`.

### Testimonials

Edit the `testimonials` array in `src/components/Testimonials.jsx`.

## Deployment

```bash
npm run build
```

Deploy the `dist/` folder to any static hosting (Vercel, Netlify, etc.).

## License

Private project for BoxKutral.
