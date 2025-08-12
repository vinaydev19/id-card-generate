/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  future: {
    disableColorOpacityUtilitiesByDefault: true,
  },
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#ffffff',
      red: {
        600: '#dc2626',
      },
      blue: {
        500: '#3b82f6',
        600: '#2563eb',
      },
      green: {
        500: '#22c55e',
        600: '#16a34a',
      },
      gray: {
        300: '#d1d5db',
        400: '#9ca3af',
        700: '#374151',
      },
    },
  },
  plugins: [],
}

