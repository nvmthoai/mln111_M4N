import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            h1: { color: theme('colors.blue.800'), fontWeight: '800' },
            h2: { color: theme('colors.blue.700'), fontWeight: '700' },
            'h3, h4': { color: theme('colors.slate.800') },
            blockquote: {
              borderLeftColor: theme('colors.blue.400'),
              backgroundColor: theme('colors.slate.50'),
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              fontStyle: 'normal',
            },
            a: { color: theme('colors.blue.600') },
          },
        },
      }),
    },
  },
  plugins: [typography],
}
