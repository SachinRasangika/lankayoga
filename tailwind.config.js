/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        surface: 'rgb(var(--surface) / <alpha-value>)',
        raised: 'rgb(var(--raised) / <alpha-value>)',
        warm: 'rgb(var(--warm) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--ink-muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        sage: {
          50: '#f2f5f1',
          100: '#e3e9df',
          200: '#c7d2c0',
          300: '#a5b69c',
          400: '#839a78',
          500: '#64805a',
          600: '#4d6746',
          700: '#3c5137',
          800: '#2e3e2b',
          900: '#1f2a1d',
        },
        terracotta: {
          50: '#fbf3ef',
          100: '#f5e2d9',
          200: '#e9c3b2',
          300: '#db9f87',
          400: '#cc7f61',
          500: '#b9633f',
          600: '#9d4f30',
          700: '#7d3e26',
          800: '#5d2f1e',
          900: '#3f2115',
        },
        sand: {
          50: '#faf8f5',
          100: '#f2eee8',
          200: '#e4ded4',
          300: '#cdc5b8',
          400: '#ada396',
          500: '#8c8275',
          600: '#6e6559',
          700: '#554e45',
          800: '#3a352f',
          900: '#22201c',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.18em',
      },
      maxWidth: {
        prose: '68ch',
      },
      transitionTimingFunction: {
        calm: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      boxShadow: {
        lift: '0 18px 40px -24px rgb(34 32 28 / 0.35)',
      },
    },
  },
  plugins: [],
}
