/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './wp-templates/**/*.{js,jsx,ts,tsx}',
  ],
  safelist: [
    // Dynamic classes used via template strings in components (e.g., Solution)
    'text-gi-white',
    'text-gi-navy',
    'text-gi-pink',
    'text-gi-green',
    'bg-gi-white',
    'bg-gi-navy',
    'bg-gi-pink',
    'bg-gi-green',
  ],
  theme: {
    extend: {
      colors: {
        'gi-green': '#5AAD5A',
        'gi-pink': '#C40084',
        'gi-text': '#061E4B',
        'gi-gray': '#58595B',
        'gi-line': '#E9E9EF',
        'gi-fog': '#EEF1F6',
        'gi-black': '#141415',
        'gi-subtle': '#F7F9FC',
        'gi-navy': '#061E4B',
        'gi-white': '#FFFFFF',
      },
      boxShadow: {
        gi: '0 8px 30px rgba(20,20,21,0.08)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gi-text'),
            a: {
              color: theme('colors.gi-text'),
              textDecoration: 'underline',
              textDecorationColor: theme('colors.gi-green'),
              textUnderlineOffset: '2px',
              '&:hover': { color: theme('colors.gi-green') },
            },
            h1: { color: theme('colors.gi-text') },
            h2: { color: theme('colors.gi-text') },
            h3: { color: theme('colors.gi-text') },
            h4: { color: theme('colors.gi-text') },
            blockquote: {
              borderLeftColor: theme('colors.gi-green'),
              backgroundColor: theme('colors.gi-fog'),
            },
            code: { backgroundColor: theme('colors.gi-fog'), padding: '0.15rem 0.35rem', borderRadius: '0.25rem' },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            'pre code': { backgroundColor: 'transparent', padding: 0 },
            hr: { borderColor: theme('colors.gi-line') },
            'figure figcaption': { color: theme('colors.gi-gray') },
            strong: { color: theme('colors.gi-text') },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}; 