# Fate OS - Cosmic Intelligence Platform

Premium website built with Astro, Tailwind CSS, and Motion.dev for cosmic analysis platform.

## 🚀 Features

- **Anti-AI-Slop Design**: Distinctive typography with Clash Display + General Sans
- **Cosmic Color Palette**: Deep space aesthetic with cosmic orange accents
- **Motion Animations**: Staggered reveals, scroll-triggered effects, hover states
- **Responsive Design**: Mobile-first cosmic grid system
- **Performance Optimized**: Zero-JS by default, islands architecture

## 🏗️ Project Structure

```
fate-os-website/
├── src/
│   ├── components/          # Cosmic components
│   │   ├── Header.astro      # Sticky navigation
│   │   ├── Hero.astro        # Zodiac wheel hero
│   │   ├── AnalysisForm.astro # Live preview form
│   │   ├── SystemsGrid.astro # Weton/Shio/Zodiac grid
│   │   └── PricingSection.astro # Premium tiers
│   ├── layouts/
│   │   └── BaseLayout.astro  # Cosmic base layout
│   ├── pages/
│   │   └── index.astro       # Main page
│   ├── config/
│   │   └── site.ts          # Cosmic configuration
│   └── styles/
│       └── global.css       # Cosmic design system
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## 🎨 Cosmic Design System

### Typography
- **Display**: Clash Display (bold, authoritative)
- **Body**: General Sans (clean, readable)
- **Mono**: JetBrains Mono (technical credibility)

### Color Palette
```css
--color-cosmic-void: #0a0a0a;      /* Deep space background */
--color-cosmic-surface: #141414;   /* Card surfaces */
--color-cosmic-accent: #ff6b35;    /* Cosmic orange */
--color-quantum-blue: #00d4ff;     /* Quantum accent */
--color-galactic-purple: #8b5cf6;  /* Galactic accent */
```

### Motion Effects
- Staggered page load animations
- Scroll-triggered reveals
- Hover glow effects
- Floating cosmic elements

## 🚀 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

## 🌌 Cosmic Components Built

### ✅ Completed
1. **BaseLayout** - Cosmic background with noise texture
2. **Header** - Sticky navigation with scroll effects
3. **Hero** - Zodiac wheel background with animations
4. **AnalysisForm** - Live preview cosmic form
5. **SystemsGrid** - Weton/Shio/Zodiac/Numerology/Human Design
6. **PricingSection** - Premium tiers with popular highlighting

### 🚧 Next Features
- WebGL cosmic particle system
- Interactive zodiac chart
- Real-time cosmic calculations
- Contact form integration

## 🎯 Design Philosophy

This website embodies **anti-AI-slop principles**:
- **Distinctive Typography**: No generic Inter/Roboto fonts
- **Intentional Color**: 60-30-10 rule with cosmic hierarchy
- **Purposeful Motion**: Orchestrated animations, not random effects
- **Premium Feel**: NASA mission control meets ancient temple aesthetic

## 📱 Responsive Design

- **Mobile**: Stacked cosmic cards with touch optimization
- **Tablet**: Adaptive grid layouts
- **Desktop**: Orbital cosmic grid with parallax effects

## 🚀 Deployment

Optimized for Cloudflare Pages:
```bash
npm run build
npx wrangler pages deploy dist/
```

---

**Built with cosmic precision by The Shadow Operator** ⚡