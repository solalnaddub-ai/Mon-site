/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark OLED base (brief: #000000 / #0a0a0a, dark gradients)
        ink: {
          DEFAULT: '#000000',
          950: '#050505',
          900: '#0a0a0a',
          800: '#121212',
          700: '#1a1a1a',
          600: '#242424',
        },
        // Text
        chalk: {
          DEFAULT: '#fafafa',
          muted: '#a1a1aa',
          dim: '#52525b',
        },
        // Neon accents (brief: golds, cyans, purples, neons)
        neon: {
          gold: '#f5c518',
          cyan: '#22d3ee',
          magenta: '#e11d8f',
          purple: '#a855f7',
          lime: '#bef264',
        },
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'sans-serif'],
        body: ['Epilogue', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        // Kinetic Brutalism: 0px radius everywhere
        none: '0',
      },
      letterSpacing: {
        brutal: '-0.02em',
        wide: '0.08em',
        widest: '0.2em',
      },
      boxShadow: {
        'glow-cyan': '0 0 24px -4px rgba(34, 211, 238, 0.55)',
        'glow-gold': '0 0 24px -4px rgba(245, 197, 24, 0.55)',
        'glow-magenta': '0 0 24px -4px rgba(225, 29, 143, 0.55)',
        'glow-purple': '0 0 24px -4px rgba(168, 85, 247, 0.55)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.4' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
        'marquee-fast': 'marquee 12s linear infinite',
        'pulse-glow': 'pulse-glow 2.2s ease-in-out infinite',
        flicker: 'flicker 3s linear infinite',
        scan: 'scan 6s linear infinite',
      },
    },
  },
  plugins: [],
};
