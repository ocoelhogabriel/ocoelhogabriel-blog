import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

// Tokens copiados de eco-system/brand/tokens.json (fonte canônica).
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        desk: '#0E0E10',
        stock: '#17181B',
        bone: '#EFE9DC',
        ink: '#8C9FC7',
        dim: '#9C9486',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': '#EFE9DC',
            '--tw-prose-headings': '#EFE9DC',
            '--tw-prose-lead': '#9C9486',
            '--tw-prose-links': '#8C9FC7',
            '--tw-prose-bold': '#EFE9DC',
            '--tw-prose-counters': '#8C9FC7',
            '--tw-prose-bullets': '#8C9FC7',
            '--tw-prose-hr': 'rgba(140,159,199,0.3)',
            '--tw-prose-quotes': '#9C9486',
            '--tw-prose-quote-borders': '#8C9FC7',
            '--tw-prose-captions': '#9C9486',
            '--tw-prose-code': '#EFE9DC',
            '--tw-prose-pre-code': '#EFE9DC',
            '--tw-prose-pre-bg': '#17181B',
            '--tw-prose-th-borders': 'rgba(140,159,199,0.3)',
            '--tw-prose-td-borders': 'rgba(140,159,199,0.2)',
            'h1, h2, h3, h4': { fontFamily: 'var(--font-display)', fontWeight: '400' },
            a: { textDecorationColor: 'rgba(140,159,199,0.4)' },
            'a:hover': { textDecorationColor: '#8C9FC7' },
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
