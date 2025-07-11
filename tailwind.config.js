/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '@media (min-height: 600px)': {
          '.min-h600\\:h-screen': {
            height: '100vh'
          }
        }
      })
    }
  ]
}
