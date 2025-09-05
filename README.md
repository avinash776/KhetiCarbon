<div align="center">

# KhetiCarbon • MRV Solutions (Prototype)

Measure carbon. Verify transparently. Empower farmers.

Futuristic, multilingual MRV prototype with maps, analytics, animations, dark mode, and a premium glassmorphism UI.

</div>


## Overview
KhetiCarbon is an MRV (Measurement, Reporting, Verification) platform concept for agroforestry and rice carbon projects. This repo contains:

- A production-like React app (Vite) under `kheti-app/` — recommended for demos and submissions.
- A legacy static prototype at the repo root (`index.html`, `styles.css`, `app.jsx`) — kept for reference.

## Highlights
- Modern, glassmorphism UI with dark mode (persists across sessions)
- Framer Motion animations (hero, cards, counters)
- Multilingual UI: English, Hindi, Telugu, Tamil, Bengali (i18next)
- Demo Dashboard: Leaflet map (OpenStreetMap tiles) + Chart.js line/pie charts
- Impact page with animated counters and SDG badges
- Contact page with HQ map + demo request panel
- PWA metadata and favicon; SEO/OpenGraph tags

## Tech Stack
- React 18 + React Router 6
- Vite 5 + TypeScript
- i18next + react-i18next
- Leaflet 1.9 (OpenStreetMap)
- Chart.js 4
- Framer Motion 11

## Repository Structure
```
.
├─ kheti-app/             # Main React (Vite) app — use this for demos
│  ├─ index.html
│  ├─ package.json
│  ├─ tsconfig.json
│  ├─ vite.config.ts
│  ├─ styles.css          # Global styles (glassmorphism + dark mode)
│  ├─ public/
│  │  └─ logo.svg
│  └─ src/
│     ├─ main.tsx         # Entry
│     ├─ App.tsx          # Routes & pages
│     └─ i18n.ts          # i18next resources & setup
│
├─ index.html             # Legacy static prototype (UMD + Babel)
├─ styles.css             # Legacy styles
├─ app.jsx                # Legacy app
└─ README.md
```

## Quickstart (Recommended: Vite App)
Prerequisites: Node.js 18+ and npm.

```cmd
cd "c:\Avi project\hack\kheti-app"
npm install
npm run dev
```

Open the local URL (typically http://localhost:5173/). Navigate between Home, How It Works, Dashboard, Impact, and Contact.

### Available Scripts
- `npm run dev` — Start the dev server
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview the production build locally

## Legacy Prototype (Optional)
If you prefer the one-file prototype:

```cmd
:: Open directly (no build)
"c:\Avi project\hack\index.html"

:: Or serve statically for cleaner routing
cd "c:\Avi project\hack"
npx serve -s .
```

## Internationalization (i18n)
- Languages: English (`en`), Hindi (`hi`), Telugu (`te`), Tamil (`ta`), Bengali (`bn`).
- Language toggle in the navbar; selection persists to localStorage.
- Charts re-label automatically on language change.
- To add a new language, extend `src/i18n.ts` resources and add an `<option>` in the navbar.

## Theming
- Dark mode toggle in the navbar.
- Theme choice persists to localStorage.

## Maps & Tiles
- Leaflet uses OpenStreetMap tiles; an internet connection is required for tiles to load.

## Deployment
Deploy the Vite app (`kheti-app/`) to any static host (Netlify, Vercel, GitHub Pages):

1) Build
```cmd
cd "c:\Avi project\hack\kheti-app"
npm run build
```

2) Deploy the contents of `kheti-app/dist`.

• Netlify: Build command `npm run build`, Publish directory `kheti-app/dist`
• Vercel: Project root `kheti-app`, Build command `npm run build`, Output `dist`

## Accessibility & Performance Notes
- Semantic headings and focusable controls.
- Motion is tasteful and not obstructive; charts are color-accessible with textual context.
- Works offline as a basic PWA shell (once cached), though maps require network for tiles.

## Troubleshooting
- Port in use: change the dev server port in `vite.config.ts` (server.port).
- Blank map: ensure internet connectivity for OSM tiles; check console for blocked requests.
- Fonts or icons missing: corporate proxies can block Google Fonts—bundle locally if needed.

## Roadmap
- Add Kannada/Marathi locales
- Role-based demo (Project Admin, Verifier views)
- Data mocks for dynamic charts and map layers
- Form validation and API wiring (demo)

---

© KhetiCarbon. All rights reserved.
