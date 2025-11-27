# Deployment Guide

## Quick Deploy to Vercel (Easiest - 5 minutes)

1. **Push to GitHub** (if not already):
```bash
git init
git add .
git commit -m "Initial commit - Website Showreel"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Click "Deploy" (all settings auto-detected)
   - Done! Get your live URL

## Alternative: Deploy to Netlify

1. **Build the project**:
```bash
npm run build
```

2. **Deploy**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `.next` folder
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`

## Environment Variables

If you add API keys or secrets later:

1. Create `.env.local`:
```bash
NEXT_PUBLIC_API_KEY=your_key_here
```

2. Add to Vercel/Netlify dashboard under "Environment Variables"

## Custom Domain

### On Vercel:
1. Go to Project Settings → Domains
2. Add your domain (e.g., `showreel.yourdomain.com`)
3. Update DNS records as instructed

### On Netlify:
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS

## Performance Optimization for Production

Already included:
✅ Automatic code splitting
✅ Image optimization
✅ Font optimization
✅ CSS minification
✅ Tree shaking

## Testing Before Deployment

```bash
# Build and test locally
npm run build
npm start

# Open http://localhost:3000
```

## Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Google Analytics**: Add to `app/layout.tsx`

## Troubleshooting

**Build fails?**
- Check Node version: `node --version` (need 18+)
- Clear cache: `rm -rf .next node_modules && npm install`

**Slow animations?**
- Check browser hardware acceleration
- Reduce number of animated elements

**Mobile issues?**
- Test on actual devices
- Use Chrome DevTools mobile view

---

**Ready to impress your client!** 🚀
