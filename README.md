# STAYFOCUS — Streetwear Immersif

Boutique e-commerce **3D immersive** pour la marque streetwear **STAYFOCUS**.
Expérience sombre, brutaliste et motion-first, inspirée d'Igloo.inc et Corteiz.

> Design grounded in the **ui-ux-pro-max** skill: pattern *Immersive/Interactive
> Experience*, style *Kinetic Brutalism*, type *Anton + Epilogue*. Color palette
> overridden to the brief's **OLED black + neon** system (the generator's default
> rose palette didn't fit a dark streetwear brand).
> Full design system: [`design-system/stayfocus/MASTER.md`](design-system/stayfocus/MASTER.md).

## Stack

| Layer | Choice |
|-------|--------|
| Frontend | React 18 + Vite 5 + TypeScript |
| 3D | Three.js via `@react-three/fiber` + `drei` (lazy-loaded) |
| Animation | GSAP (headline timeline) + Framer Motion (UI/scroll) |
| Audio FX | Web Audio API synth engine (`src/lib/sound.ts`) — no asset files |
| Styling | Tailwind CSS 3.4 + OKLCH design tokens |
| State | Zustand (cart + sound), persisted to `localStorage` |
| E-commerce | Shopify Storefront API seam (`src/lib/shopify.ts`) — mock catalog today |

> Note: Tailwind **3.4** is used (not 4) for build stability; OKLCH tokens are
> defined as CSS variables in `src/styles/index.css`, so a v4 migration is trivial.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build
npm run preview    # serve the build
```

## What's built (this session: Foundation + Home page)

- **Intro loader** — animated logo (scale-in + glow), progress hairline, skip button, once per session
- **Navbar** — animated underlines, cart badge with bounce-on-add, mobile slide-in menu, sound toggle
- **Hero** — lazy WebGL 3D object (rotating focus-reticle emblem) with WebGL fallback, scroll parallax, GSAP staggered headline, pulsing CTA
- **Featured / Drops** — kinetic marquee + staggered product grid
- **Shop** — category filters with animated re-layout, loading skeletons
- **About** — manifesto + animated stat grid + scrolling backdrop word
- **Newsletter** — inline validation + success feedback
- **Footer** — fade-in on scroll, social links, legal nav
- **Cart drawer** — slide-out, quantity controls, real-time subtotal, empty state
- **Sound FX** — synthesized hover / click / add-to-cart / transition / error, global mute (off by default, persisted)

### Brief coverage

| Brief area | Status |
|------------|--------|
| Dark immersive aesthetic, neon accents | ✅ |
| 3D hero + continuous rotation + parallax | ✅ |
| Page-load intro, hover/click/stagger animations | ✅ |
| Synthetic SFX + mute toggle | ✅ |
| Persistent cart (localStorage) + slide-out | ✅ |
| Responsive (mobile-first) + reduced-motion + a11y focus/labels | ✅ |
| SEO meta + Open Graph + lazy images | ✅ |
| Home page sections (hero, featured, about, newsletter, footer) | ✅ |
| Shopify integration | 🔌 Seam ready (mock data) — see below |
| Other pages (Product, Cart page, Auth, Account, Checkout, Legal) | ⏳ Next session |
| glTF garment models, real audio ambience, Vitest/Playwright | ⏳ Next session |

## Going live with Shopify

The UI already loads through a client seam. To use real products:

```bash
cp .env.example .env.local
# set VITE_SHOPIFY_DOMAIN and VITE_SHOPIFY_STOREFRONT_TOKEN
```

Then implement the GraphQL calls in `fetchStorefront()` inside
[`src/lib/shopify.ts`](src/lib/shopify.ts). The `Product` type already mirrors
the Storefront schema, so no component code changes.

## Project structure

```
src/
├── components/   Logo, Navbar, CartDrawer, ProductCard, Marquee, SoundToggle, …
├── sections/     Hero, Featured, Shop, About, Newsletter, Footer
├── three/        HeroScene (Canvas) + FocusObject (3D mesh)
├── lib/          sound, store (cart), shopify, types, helpers
├── hooks/        useSound, useReducedMotion, useProducts
├── data/         mock product catalog
└── styles/       Tailwind + OKLCH design tokens
```
