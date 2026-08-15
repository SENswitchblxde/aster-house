import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F5F0E7',
          light: '#FBF8F2',
          deep: '#EDE5D8',
          shade: '#E4DACA',
        },
        ink: {
          DEFAULT: '#252321',
          soft: '#57524B',
          faint: '#8C857B',
        },
        burgundy: {
          DEFAULT: '#641F2A',
          deep: '#4A141D',
          wash: '#F0E3E1',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        text: ['var(--font-text)', 'system-ui', 'sans-serif'],
        book: ['var(--font-book)', 'Georgia', 'serif'],
      },
      fontSize: {
        // Editorial scale — fluid, deliberately large
        'display-xl': ['clamp(3rem, 8.5vw, 7.5rem)', { lineHeight: '0.94', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.0', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(2rem, 4.2vw, 3.5rem)', { lineHeight: '1.06', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.6rem, 2.6vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.005em' }],
        'lede': ['clamp(1.1rem, 1.5vw, 1.375rem)', { lineHeight: '1.6' }],
        'body': ['1.0625rem', { lineHeight: '1.7' }],
        'label': ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.16em' }],
      },
      maxWidth: {
        measure: '38rem',
        shelf: '92rem',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
