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
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        }
      },
      backgroundColor: {
        'light': '#ffffff',
        'light-secondary': '#f8f9fa',
        'dark': '#0f172a',
        'dark-secondary': '#1e293b',
        'dark-card': '#1e293b',
      },
      textColor: {
        'light': '#1e293b',
        'light-secondary': '#64748b',
        'dark': '#f1f5f9',
        'dark-secondary': '#cbd5e1',
      },
      borderColor: {
        'light': '#e2e8f0',
        'dark': '#334155',
      },
    },
  },
  plugins: [],
}
