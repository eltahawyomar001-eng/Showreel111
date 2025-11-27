# Quick Customization Guide

## 🎨 Common Customizations for Your Upwork Client

### 1. Change Main Colors

**Hero Gradient** (app/page.tsx, line ~66):
```tsx
className="... bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 ..."
```
Replace `red-500`, `purple-500`, `blue-500` with client brand colors.

**Prism Colors** (components/CenterPrism.tsx):
- Line ~40: `from-#ff6b6b to-#ee5a6f` (Layer 1 - Red/Orange)
- Line ~62: `from-#f9ca24 via-#eb4d4b to-#6c5ce7` (Layer 2 - Orange/Purple)
- Line ~84: `from-#667eea via-#764ba2 to-#f093fb` (Layer 3 - Blue/Purple)

### 2. Update Quote Sections

**In app/page.tsx** (lines ~108-128):

```tsx
<QuoteSection
  quote="Your client's quote here"
  author="Quote Author"
  shape="square"  // Options: square, diamond, triangle, circle
  shapeColor="linear-gradient(135deg, #COLOR1 0%, #COLOR2 100%)"
  index={0}
/>
```

### 3. Customize Benefits/Services

**In app/page.tsx** (lines ~158-173), edit the array:

```tsx
{
  title: "Your Service",
  description: "What you offer to the client",
  icon: "🎨", // Any emoji
}
```

### 4. Add Client Logo or Assets

**In app/page.tsx**, add after line 78:

```tsx
<motion.img 
  src="/logo.png" 
  alt="Client Logo"
  variants={itemVariants}
  className="w-32 h-32 mb-8"
/>
```

Then add the logo to `/public/logo.png`

### 5. Change Fonts

**In app/layout.tsx** (lines 2-3), replace:

```tsx
import { Inter, Playfair_Display } from "next/font/google";
```

With any Google Font, e.g.:
```tsx
import { Montserrat, Lora } from "next/font/google";
```

### 6. Adjust Animation Speed

**Background zoom** (components/AnimatedBackground.tsx, line ~17):
```tsx
const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.3]);
```
Increase numbers for more zoom (e.g., `[1.5, 1, 1.5]`)

**Prism hover** (components/CenterPrism.tsx, line ~24):
```tsx
scale: isHovered ? 1.1 : 1,  // Change 1.1 to 1.2 for bigger hover
```

### 7. Add More Sections

Duplicate any `QuoteSection` in app/page.tsx:

```tsx
<QuoteSection
  quote="Another inspiring quote"
  author="Author"
  shape="triangle"
  shapeColor="linear-gradient(135deg, #NEW_COLOR1 0%, #NEW_COLOR2 100%)"
  index={3}  // Increment index
/>
```

### 8. Background Pattern Density

**In components/AnimatedBackground.tsx** (line ~31):

```tsx
// Current: 96 shapes
{Array.from({ length: 96 }).map((_, i) => (

// For more/less shapes, change the number:
{Array.from({ length: 144 }).map((_, i) => (  // More dense
{Array.from({ length: 48 }).map((_, i) => (   // Less dense
```

### 9. Mobile Responsiveness

All components use Tailwind's responsive prefixes:
- `md:` = 768px and up (tablet)
- `lg:` = 1024px and up (desktop)

Example:
```tsx
className="text-3xl md:text-5xl lg:text-7xl"
// Mobile: 3xl, Tablet: 5xl, Desktop: 7xl
```

### 10. Replace All Text Content

Search for these in **app/page.tsx**:
- Line ~60: "Website Refresh"
- Line ~65: "Showreel"
- Line ~72: Subtitle text
- Lines ~108-128: All quotes
- Line ~148: "How I Can Help"
- Lines ~158-173: Benefit descriptions

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
npm run build
# Then connect to Vercel via their dashboard
```

### Deploy to Netlify
```bash
npm run build
# Deploy the `.next` folder
```

## 📦 Adding Client Assets

1. Create `/public` folder if it doesn't exist
2. Add images: `/public/image.png`
3. Reference in code: `src="/image.png"`

## 🎯 Performance Tips

- Keep videos under 5MB
- Optimize images with Next.js Image component
- Limit number of animated elements on screen
- Test on mobile devices

---

**Need help?** All components have detailed comments explaining how to customize them!
