# Portfolio Astro Codebase Guide

## Build/Test Commands
- `npm run dev` - Start development server  
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- No test framework configured (add tests if needed)
- No linting configured (consider adding ESLint/Prettier)

## Code Style Guidelines
- **Framework**: Astro with TypeScript, Tailwind CSS
- **Imports**: Use ES modules, prefer named imports from utils
- **Components**: Use `.astro` files for components, TypeScript for utilities
- **Styling**: Tailwind classes preferred, inline styles for dynamic values only
- **Font**: Poppins font family with specific weights (200/600)
- **Naming**: camelCase for variables/functions, kebab-case for file names
- **TypeScript**: Use interfaces for type definitions, optional chaining
- **Error Handling**: Check for element existence before DOM manipulation
- **Environment**: Use config files (src/utils/config.ts) for environment variables
- **Images**: Use Cloudinary utilities from src/utils/cloudinary.ts
- **Responsive**: Build mobile-first with responsive breakpoints
- **Performance**: Use lazy loading, auto format/quality for images