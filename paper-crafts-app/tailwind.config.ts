import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        magical: {
          pink: '#FF69B4',
          purple: '#DDA0DD',
          blue: '#87CEEB',
          yellow: '#FFF8DC',
          gold: '#FFD700',
        },
        pastel: {
          pink: '#FFB6C1',
          purple: '#E6E6FA',
          blue: '#B0E0E6',
          yellow: '#FFFFE0',
        }
      },
      fontFamily: {
        'magical': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255, 105, 180, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 105, 180, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
