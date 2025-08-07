/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './wp-templates/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'gi-green': '#5AAD5A',
        'gi-pink': '#C40084',
        'gi-text': '#141415',
        'gi-gray': '#6B6B6F',
        'gi-line': '#E9E9EF',
        'gi-fog': '#EEF1F6',
        'gi-black': '#0B0C0F',
        'gi-subtle': '#F7F9FC',
        'gi-navy': '#0C1022',
      },
      boxShadow: {
        gi: '0 8px 30px rgba(20,20,21,0.08)',
      },
    },
  },
  plugins: [],
}; 