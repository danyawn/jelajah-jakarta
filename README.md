## Jelajah Jakarta – Multi‑Tab Immersive App

A sleek, multi‑tab experience to explore Jakarta’s highlights: wisata, kuliner, transportasi, sejarah, dan galeri. Built with performance-first animations, optimized images, and a clean architecture.

### Tech Stack
- **Next.js 15** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS v4** (utility‑first styling)
- **Framer Motion 12** (micro‑interactions)
- **GSAP 3.13** (advanced animation hooks)
- **Zustand 5** (lightweight state for tabs)
- **Lucide React** (icons)
- **react-parallax-tilt** (3D tilt effect)
- **three 0.179 + postprocessing 6.37** (ready for 3D/FX scenes)

### Features
- Multi‑tab UI with add/close/switch behavior (Zustand store)
- Animated cards and menus with accessible, keyboard‑friendly interactions
- Optimized images via `next/image` and lazy motion in‑view animations
- Clean, modular structure by feature (Jakarta pages/components)

---

## Getting Started

1) Install dependencies
```bash
npm install
```

2) Run the dev server
```bash
npm run dev
```
Open `http://localhost:3000`.

3) Build and start
```bash
npm run build
npm start
```

4) Lint
```bash
npm run lint
```

### Scripts
- `dev`: start Next.js dev server with Turbopack
- `build`: production build with Turbopack
- `start`: run the production server
- `lint`: run ESLint

---

## Project Structure (high level)
```
src/
  app/                # App Router entry, layout, globals
  components/         # Reusable components (e.g., FlowingMenu, UI)
  features/jakarta/   # Feature modules: Beranda, Wisata, Kuliner, dst.
  hooks/              # Reusable hooks (e.g., useSound)
  store/              # Zustand tab store
public/               # Images and static assets
```

---

## Development Notes
- Keep it simple (KISS) and only add what’s needed (YAGNI)
- Prefer Server Components; use Client Components only for interactive UI
- Use `next/image` for all images; set `fill` with `object-cover` when used as backgrounds
- Avoid hydration issues: don’t nest anchors; use `initial={false}` for server‑rendered motion containers when needed
- Accessibility: focusable controls, keyboard handlers, and visible focus rings

### State & Tabs
The tab system lives in `src/store/tabStore.ts` with `addNewTab`, `switchTab`, and `closeTab`. Pages/components (e.g., `BerandaPage`) call `addNewTab(Component, title, icon)` to open a new tab.

---

## Performance Tips
- Coarse‑grained animations with Framer Motion; prefer `whileInView` and `viewport: { once: true }`
- Keep 3D/post‑processing optional; import lazily when introduced
- Reuse images and compress assets
- Use Tailwind utilities; avoid heavy custom CSS when possible

---

## License
MIT – see `LICENSE` if present. Icons are from Lucide and images are subject to their respective copyrights.
