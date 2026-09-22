import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

// Tokens canônicos: eco-system/brand/tokens.json — canais HSL em CSS vars,
// `.light` no <html> redefine os canais (a mesa à luz do dia).
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        desk: 'hsl(var(--desk-h) / <alpha-value>)',
        stock: 'hsl(var(--stock-h) / <alpha-value>)',
        bone: 'hsl(var(--bone-h) / <alpha-value>)',
        ink: 'hsl(var(--ink-h) / <alpha-value>)',
        dim: 'hsl(var(--dim-h) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'hsl(var(--bone-h))',
            '--tw-prose-headings': 'hsl(var(--bone-h))',
            '--tw-prose-lead': 'hsl(var(--dim-h))',
            '--tw-prose-links': 'hsl(var(--ink-h))',
            '--tw-prose-bold': 'hsl(var(--bone-h))',
            '--tw-prose-counters': 'hsl(var(--ink-h))',
            '--tw-prose-bullets': 'hsl(var(--ink-h))',
            '--tw-prose-hr': 'rgb(var(--ink-rgb) / 0.3)',
            '--tw-prose-quotes': 'hsl(var(--dim-h))',
            '--tw-prose-quote-borders': 'hsl(var(--ink-h))',
            '--tw-prose-captions': 'hsl(var(--dim-h))',
            '--tw-prose-code': 'hsl(var(--bone-h))',
            '--tw-prose-pre-code': 'hsl(var(--bone-h))',
            '--tw-prose-pre-bg': 'hsl(var(--stock-h))',
            '--tw-prose-th-borders': 'rgb(var(--ink-rgb) / 0.3)',
            '--tw-prose-td-borders': 'rgb(var(--ink-rgb) / 0.2)',
            'h1, h2, h3, h4': { fontFamily: 'var(--font-display)', fontWeight: '400' },
            a: { textDecorationColor: 'rgb(var(--ink-rgb) / 0.4)' },
            'a:hover': { textDecorationColor: 'hsl(var(--ink-h))' },
            blockquote: { fontStyle: 'italic' },
            img: { borderRadius: '4px' },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
