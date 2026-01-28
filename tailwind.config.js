/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vanta: {
          black: '#000000',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'glow-white': '0 0 20px rgba(255, 255, 255, 0.1)',
        'glow-green': '0 0 10px #00ff00',
        'glow-red': '0 0 10px #ff0000',
        'glow-gold': '0 0 10px #ffd700',
      },
    },
  },
  plugins: [],
}
