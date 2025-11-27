# Website Refresh Showreel

A visually stunning one-page website showcasing smooth transitions, bold geometry, and story-driven motion. Built to demonstrate capabilities for redesigning websites with creative animations.

> 🚀 **Quick Start**: Running at http://localhost:3000
> 
> 📚 **New here?** Read [START_HERE.md](START_HERE.md) for the complete guide
> 
> 📖 **Full documentation**: See [INDEX.md](INDEX.md) for all guides

## 🎨 Features

- **Animated Geometric Background**: Dynamic 3D pyramid pattern with scroll-driven zoom effects
- **Interactive Center Prism**: Multi-layered gradient prism with hover animations and floating effects
- **Scroll-Triggered Quote Sections**: Full-screen sections with shape transformations and text reveals
- **Smooth Transitions**: Page-load and section transition overlays
- **Performance Optimized**: Smooth 60fps animations using Framer Motion
- **Fully Responsive**: Works beautifully on mobile and desktop

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** for animations
- **Google Fonts** (Inter & Playfair Display)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
/app
  ├── layout.tsx          # Root layout with fonts
  ├── page.tsx            # Main landing page
  └── globals.css         # Global styles

/components
  ├── AnimatedBackground.tsx    # Geometric pattern background
  ├── CenterPrism.tsx          # Interactive gradient prism
  ├── QuoteSection.tsx         # Scroll-triggered quote sections
  └── TransitionOverlay.tsx    # Page transition effects
```

## 🎯 Customization Guide

### Replacing Content

**Hero Section** (`app/page.tsx`):
- Update title and subtitle text
- Adjust colors in gradient classes

**Quote Sections** (`app/page.tsx`):
- Modify the `quote` and `author` props
- Change `shapeColor` gradients
- Switch `shape` types: `"square"`, `"diamond"`, `"triangle"`, `"circle"`

**Benefits Section** (`app/page.tsx`):
- Edit the benefits array with your own services
- Customize icons and descriptions

### Styling

**Colors**: Edit Tailwind classes or add custom gradients
**Typography**: Modify font imports in `app/layout.tsx`
**Animations**: Adjust durations and easing in component files

### Adding More Sections

Duplicate a `QuoteSection` component:
```tsx
<QuoteSection
  quote="Your custom quote here"
  author="Author Name"
  shape="triangle"
  shapeColor="linear-gradient(135deg, #color1 0%, #color2 100%)"
  index={3}
/>
```

## 🎭 Animation Details

- **On Load**: Background zooms out, prism scales up with rotation
- **On Scroll**: Background zooms, shapes transform (scale/rotate/skew), text fades in/out
- **On Hover**: Prism scales, rotates, and shifts colors
- **Smooth Scroll**: No jank, optimized performance

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: `md:` (768px), `lg:` (1024px)
- Touch-friendly interactions

## 🌟 Performance

- Lightweight (~50KB gzipped JS)
- Hardware-accelerated CSS transforms
- Optimized Framer Motion animations
- Fast font loading with `display: swap`

## 📄 License

Free to use for portfolio and client demonstrations.

---

**Built with ❤️ for creative web experiences**
