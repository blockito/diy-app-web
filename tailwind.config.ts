import type { Config } from 'tailwindcss';

/**
 * The palette is lifted from the app's own theme rather than invented here, so
 * the site and the product look like the same thing rather than two designs
 * that agree about green.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FBF9F5',
        parchment: '#F3EFE6',
        forest: { DEFAULT: '#244D4D', deep: '#1B3B3B', light: '#3A6A66' },
        sage: { DEFAULT: '#C8D5CB', soft: '#DDE5DA', deep: '#8FA894' },
        clay: '#B4795A',
        ink: { DEFAULT: '#171B1A', soft: '#4A534F', faint: '#8B948F' },
        line: '#E4DFD4'
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        title: ['var(--font-title)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 1px 2px rgba(23,27,26,0.04), 0 12px 32px -18px rgba(23,27,26,0.28)',
        device: '0 40px 80px -32px rgba(23,27,26,0.45)'
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")"
      }
    }
  },
  plugins: []
};

export default config;
