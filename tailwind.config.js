/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        jaq: {
          navy: '#132A46',
          steel: '#2C4A6E',
          slate: '#5C7A99',
          mist: '#EEF3F8',
          amber: '#F2A93B',
          amberDark: '#D98A1F',
          ember: '#E4572E',
          ink: '#101820'
        }
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif']
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(19, 42, 70, 0.25)',
        pop: '0 20px 45px -15px rgba(19, 42, 70, 0.45)'
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    }
  },
  plugins: []
}
