/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        'gray': {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        'accent': {
          50: '#fdfcfa',
          100: '#f7f3ed',
          200: '#ebe3d6',
          300: '#d9ccb5',
          400: '#c4b08e',
          500: '#b09a78',  // Main button color
          600: '#9a8362',  // Hover color
          700: '#7d6a4e',
          800: '#65553f',
          900: '#4d4030',
        }
      }
    },
  },
  plugins: [],
}
