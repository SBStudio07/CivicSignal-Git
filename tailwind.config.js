/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['"Public Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: { DEFAULT: '#0F1B2D', soft: '#44546A', muted: '#6B7A90' },
        paper: { DEFAULT: '#F3F5F8', card: '#FFFFFF', line: '#DDE3EB' },
        signal: { DEFAULT: '#1F4FE0', dark: '#1639A8', tint: '#E8EEFD' },
        priority: {
          critical: '#C21F3A',
          high: '#E2620F',
          medium: '#C99700',
          low: '#2E8B57',
        },
      },
      boxShadow: { panel: '0 1px 0 rgba(15,27,45,0.04), 0 8px 24px -12px rgba(15,27,45,0.18)' },
    },
  },
  plugins: [],
};
