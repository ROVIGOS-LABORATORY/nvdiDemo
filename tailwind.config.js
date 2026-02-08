/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        'eco-green': {
          50: '#f0f9f1',
          100: '#dcf1de',
          200: '#bae3bf',
          300: '#8ece97',
          400: '#5cb167',
          500: '#2D7D46', // Primary
          600: '#25663a',
          700: '#1f5030',
          800: '#1b4027',
          900: '#173523',
          950: '#0c1e12',
        },
        'eco-blue': {
          50: '#f0f7fe',
          100: '#dcebfc',
          200: '#c1def9',
          300: '#96caf6',
          400: '#64b0f0',
          500: '#1E88E5', // Secondary
          600: '#1972d1',
          700: '#1759af',
          800: '#174a8f',
          900: '#173f76',
          950: '#102747',
        },
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [],
};