# KhetiCarbon — Prototype MRV Website

A static, CDN-powered React prototype for the KhetiCarbon MRV platform. Includes:
- Futuristic glassmorphism UI with dark mode and neon accents
- Framer Motion animations (hero, cards, counters)
- Multilingual support (English, Hindi, Telugu, Tamil, Bengali)
- Demo dashboard with Leaflet map and Chart.js graphs
- Impact counters and testimonials
- Contact form (prototype only)

## Run locally
Option 1: Open `index.html` directly in your browser (no build needed).

Option 2: Use a static server (recommended for routing):

```cmd
:: If you have VS Code Live Server, right-click index.html > "Open with Live Server"
:: Or use npx serve if Node.js is installed
npx serve -s .
```

Then open the shown URL. Navigate to Home, How It Works, Dashboard, Impact, and Contact.

## Notes
- This is a prototype using Babel in the browser. For production, migrate to a bundler (Vite/Next.js), install deps, and split components.
- Farmer mascot and testimonial images are placeholders.
- All copy is translation-ready; basic translations are included and can be refined.
