/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          950: '#1e1b4b', // Deep space
        },
        slate: {
          900: '#0f172a', // Dark background
        },
        cyan: {
          400: '#22d3ee', // Systems Normal
        },
        fuchsia: {
          500: '#d946ef', // Warp Drive
        },
        red: {
          500: '#ef4444', // Danger
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Rajdhani', 'monospace'], // Using Rajdhani as mono or secondary
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
