# Portfolio Development Guide

## 📋 Overview

This is a retro OS-styled portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. The design mimics classic desktop operating systems with window-based modals and a pixel-perfect aesthetic.

## 🚀 Quick Start Guide

### Running the Development Server

```bash
cd /home/rafi/projects/portfolio
npm run dev
```

Visit **http://localhost:3000** to see the portfolio in action.

### Building for Production

```bash
npm run build
npm start
```

## 📊 Architecture

### Component Hierarchy

```
App (page.tsx)
├── Topbar (header with name, email, clock)
├── Sidebar (desktop icons for desktop view)
├── Mobile Navigation (for mobile view)
├── Window Modal
│   ├── ProjectView (projects folder navigator)
│   ├── AboutMe (about & skills)
│   └── Links (contact information)
```

### State Management

All state is managed at the page level using React hooks:
- `openWindow`: Tracks which window is currently open ('projects' | 'about' | 'links' | null)

## 🎨 Design System

### Color Palette
- **Primary Black**: #000 (text, borders)
- **Primary White**: #fff (backgrounds, text)
- **Light Gray**: #f5f5f5 (page background)
- **Dark Gray**: #333-#999 (secondary elements)

### Typography

**Google Fonts Used:**
- Playfair Display (serif) - for headings
- IBM Plex Mono (monospace) - for tech tags and metadata

**Font Sizes:**
- H1: 2.5rem (responsive)
- H2: 1.875rem
- H3: 1.5rem
- Body: 14px
- Small: 12px

### Visual Effects

1. **CRT Scanlines**: Horizontal lines overlay (2px height, 0.02 opacity)
2. **Noise Overlay**: Subtle pixel noise (0.03 opacity)
3. **Pixel Borders**: 3px solid black borders with 4-6px radius
4. **Shadows**: None - flat design
5. **Hover Effects**: Background color inversion (black↔white)

## 🧩 Component Details

### Topbar.tsx
- Fixed top bar with black background
- Left: Portfolio name "RafiHeras"
- Center: Decorative lines (hidden on mobile)
- Right: Email link and live clock

### Clock.tsx
- Client component that updates every 1 second
- Shows 24-hour format: HH:MM:SS
- Handles hydration mismatch by initializing empty

### Sidebar.tsx
- Desktop-only sidebar (hidden on <1024px)
- Displays icon buttons for Projects, About, Links
- Smooth animation on mount

### Window.tsx
- Reusable modal component
- Backdrop with blur effect
- Smooth entrance/exit animations
- Close button with hover effect
- Configurable max-width

### ProjectView.tsx
- Three-column layout: sidebar | content | image
- Folder list with selected state
- Dynamic content switching on folder click
- Tech stack tags with hover effects
- Links to live demos and GitHub

### AboutMe.tsx
- Displays name, role, and summary
- Skills organized by category
- Education timeline
- All in a clean, readable format

### Links.tsx
- Contact card layout
- GitHub, LinkedIn, Portfolio, Email links
- Icon + description for each link
- Footer with copyright

## 📱 Responsive Behavior

### Desktop (1024px+)
```
┌─────────────────────────────────────────┐
│ RafiHeras ──── ✉ email.com ──── [TIME]  │
├─────────────────────────────────────────┤
│                                      ┌─────┐
│         [Welcome Message]            │📁   │
│                                      │Projects
│         or                           │     │
│         [Window Content]             │👤   │
│                                      │About │
│                                      │     │
│                                      │🔗   │
│                                      │Links │
└─────────────────────────────────────────┘
```

### Tablet (768-1024px)
- Windows centered on screen
- No sidebar (navigation in windows)
- Full-width content

### Mobile (<768px)
- Mobile toolbar (no topbar)
- Grid of 3 icon buttons
- Windows take full viewport
- Vertical scrolling

## 🎬 Animation Specs

### Window Animations
- **Open**: Scale from 0.8 → 1, fade 0 → 1 (200ms)
- **Close**: Reverse (150ms)
- **Easing**: Spring (damping: 25, stiffness: 400)

### Icon Animations
- **Hover**: Opacity 1 → 0.7
- **Entrance**: Stagger delay (0.1s between each)

### Content Transitions
- **Fade**: 0 → 1 (300ms)
- **Slide**: translateX -10px → 0px

## 🛠️ Customization Guide

### Adding a New Project

1. Open `src/app/page.tsx`
2. Add to `PROJECTS` array:

```tsx
{
  id: 'unique-id',
  name: 'Folder Name',
  title: 'Project Title',
  subtitle: 'Short description',
  description: 'Long description of the project...',
  features: [
    'Feature 1',
    'Feature 2',
    'Feature 3',
  ],
  tech: ['Tech1', 'Tech2', 'Tech3'],
  image: 'https://image-url.jpg', // Optional
  links: {
    live: 'https://demo.com',    // Optional
    github: 'https://github.com/user/repo', // Optional
  },
}
```

### Changing Skills

Edit the `SKILLS` array in `page.tsx`:

```tsx
const SKILLS = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', ...],
  },
  // ... more categories
];
```

### Updating Contact Links

Modify the `links` array passed to `<Links>` component:

```tsx
links={[
  {
    title: 'GitHub',
    url: 'https://github.com/username',
    icon: '🔗',
  },
  // ... more links
]}
```

### Styling Changes

#### Global Styles
- Edit `src/app/globals.css` for theme colors, fonts, effects
- CSS variables under `:root` selector

#### Component Styles
- Use Tailwind classes directly in components
- Override with inline `style` prop if needed

#### Color Changes
- Update hex values in globals.css
- Consider A11y (contrast ratios)

## 🎯 Desktop Icon Configuration

Icons in `src/app/page.tsx`:

```tsx
const DESKTOP_ICONS = [
  {
    id: 'projects',
    label: 'Projects',
    icon: '🗂️',      // Any emoji
    description: 'View my projects',
  },
  // ... more icons
];
```

Each icon can trigger a window by its `id`.

## 🔄 Data Flow

```
page.tsx (Home component)
  ↓
  ├─ [openWindow state]
  │   └─ Updated by handleIconClick
  │   └─ Reset by handleCloseWindow
  ↓
  ├─ Topbar (read-only, click handler)
  ├─ Sidebar (accepts icons, onIconClick callback)
  ├─ Window[isOpen, onClose, title, children]
  │   ├─ ProjectView (projects data, internal selection state)
  │   ├─ AboutMe (props with skills, education)
  │   └─ Links (props with contact links)
```

## ⚙️ Performance Optimization

### Current
- Minimal dependencies (no bulky UI frameworks)
- Static generation where possible
- Image optimization with Next.js `<Image />`
- CSS purging via Tailwind

### Opportunities
- Image lazy loading for projects
- Virtual scrolling for many projects
- Animation frame optimization

## 🐛 Troubleshooting

### Clock not updating
- Ensure `'use client'` directive in Clock.tsx
- Check console for hydration warnings

### Images not loading
- Verify image URLs are accessible
- Check CORS headers if using external domains
- Use Next.js Image component for optimization

### Styling issues
- Clear `.next` folder: `rm -rf .next`
- Restart dev server
- Check Tailwind config for purge paths

### Build errors
- Run `npm run build` to see detailed errors
- Check TypeScript with `npx tsc --noEmit`
- Verify all imports are correct

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### GitHub Pages

```bash
npm run build
# Deploy ./out folder
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD npm start
```

## 📚 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

To update the portfolio:

1. Make changes to components or styles
2. Test in dev mode (`npm run dev`)
3. Build for production to verify (`npm run build`)
4. Deploy to Vercel or your hosting

## 📝 File Locations Reference

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Main page, data, state |
| `src/app/layout.tsx` | Root layout, metadata |
| `src/app/globals.css` | Theme, design system |
| `src/components/*.tsx` | Reusable components |
| `tailwind.config.ts` | Tailwind configuration |
| `tsconfig.json` | TypeScript configuration |
| `next.config.ts` | Next.js configuration |

---

**Last Updated:** April 2024
**Version:** 1.0.0
