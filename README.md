# LateOptics - Professional Automotive Photography Portfolio

**LateOptics** (Late Optics) - A minimalistic, responsive automotive photography portfolio website showcasing professional car photography, automotive art, and creative automotive visuals. Built with Astro and Tailwind CSS.

## 🚗 About LateOptics

LateOptics specializes in professional automotive photography, capturing the essence and beauty of vehicles through artistic and creative photography. Our portfolio features a diverse collection of automotive photography including high-end car photography, creative automotive compositions, and professional automotive art.

## 🌐 Live Website

Visit **LateOptics** at: [https://lateoptics.netlify.app](https://lateoptics.netlify.app)

## 🚀 Features

- **Minimalistic Design**: Clean, modern design that puts photography front and center
- **Masonry Grid Layout**: Pinterest-style grid that adapts to different image aspect ratios
- **Interactive Lightbox**: Full-screen image viewing with keyboard navigation and touch support
- **Responsive Layout**: Optimized for all devices - desktop, tablet, and mobile
- **Fast Performance**: Built with Astro for optimal loading speeds
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Local Image Hosting**: All images are hosted locally for complete control

## 📋 Pages

- **Home**: Complete automotive photography gallery - displays all images
- **About**: Personal bio and contact information

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Grid Layout**: CSS Columns for masonry effect
- **Fonts**: [Inter](https://rsms.me/inter/) from Google Fonts
- **Icons**: Custom SVG icons
- **Images**: Local hosting in `/public/images/`

## 🎨 Components

- `Header.astro` - Navigation with mobile menu
- `ImageGrid.astro` - Masonry-style photo grid
- `Lightbox.astro` - Full-screen image viewer with navigation
- `Layout.astro` - Base HTML layout

## 📁 Project Structure

```
/
├── public/
│   ├── images/          # Photo collection
│   └── favicon.svg      # Site icon
├── src/
│   ├── components/      # Reusable components
│   ├── layouts/         # Page layouts
│   └── pages/           # Site pages
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs  # Tailwind CSS config
└── package.json         # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone or download this repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Download placeholder images** (optional)
   ```bash
   chmod +x download-images.sh
   ./download-images.sh
   ```
   
   Or manually add your photos to `public/images/` with these names:
   - `photo1.jpg` through `photo12.jpg` (800x800px recommended)
   - `photographer-portrait.jpg` (500x500px recommended)

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser** to `http://localhost:4321`

### Building for Production

```bash
npm run build
```

The built site will be in the `dist/` folder, ready for deployment.

## 📸 Adding Your Photos

1. **Replace placeholder images** in `public/images/` with your own photos
2. **Update image references** in the page files:
   - `src/pages/index.astro` (home page images)
   - `src/pages/gallery.astro` (all gallery images with titles)
3. **Modify alt text and titles** to match your photos
4. **Update personal information** in `src/pages/about.astro`

### Image Optimization Tips

- **Format**: Use JPEG for photos, PNG for graphics with transparency
- **Size**: Various sizes work well with masonry layout - portrait, landscape, and square
- **Quality**: Balance file size with visual quality (80-90% JPEG quality)
- **Naming**: Use descriptive filenames (e.g., `porsche-911-turbo.jpg`)

## ✏️ Customization

### Colors and Styling

Edit `tailwind.config.mjs` to customize:
- Color palette
- Fonts
- Spacing
- Breakpoints

### Content

Update these files with your information:
- `src/pages/index.astro` - Homepage automotive gallery
- `src/pages/about.astro` - Personal bio, journey, contact info
- `src/pages/gallery.astro` - Automotive photo collection with titles

### Navigation

Modify `src/components/Header.astro` to:
- Change logo/site name
- Add/remove navigation items
- Customize mobile menu

### Categories

Currently exclusively focused on:
- **Automotive Photography**

All images are automotive-focused, showcasing cars, details, and automotive scenes.

## 🌐 Deployment

This site can be deployed to any static hosting service:

### Netlify
1. Connect your repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel
1. Import your repository
2. Framework preset: Astro
3. Deploy

### GitHub Pages
1. Enable GitHub Pages in repository settings
2. Use GitHub Actions for automated deployment

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)  
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Lightbox Features

- **Keyboard Navigation**: Arrow keys, A/D keys, spacebar for next/previous
- **Touch Support**: Swipe gestures on mobile devices
- **Image Counter**: Shows current position in gallery
- **Loading States**: Smooth transitions between images
- **High-Resolution Display**: Optimized for retina screens

## 📞 Contact

**Email**: imlateonrent@gmail.com  
**Instagram**: [@imlateonrent](https://instagram.com/imlateonrent)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Keep shooting! 📸**
