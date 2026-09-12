/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#09090b', // Zinc 950
          darker: '#030303',
          lighter: '#18181b', // Zinc 900
        },
        surface: {
          DEFAULT: '#18181b', // Zinc 900
          hover: '#27272a',   // Zinc 800
          card: '#121214',
          border: '#27272a',  // Zinc 800
        },
        brand: {
          DEFAULT: '#2563eb', // Electric blue (Blue 600)
          hover: '#3b82f6',   // Blue 500
          light: '#60a5fa',   // Blue 400
          dark: '#1d4ed8',    // Blue 700
          indigo: '#4f46e5',
          violet: '#7c3aed',
        },
        accent: {
          green: '#22c55e',
          red: '#ef4444',
          amber: '#f59e0b',
          blue: '#3b82f6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
