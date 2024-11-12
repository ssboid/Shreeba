/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        borderDefault: '#BBC2C9',
        primaryOrange: '#DE761C',
        primary1000: '#59300B',
        secondary100: '#FAFAEE',
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        '#root': {
          padding: '0', // example padding removal
          backgroundColor: '#f0f0f0', // example background color
          minHeight: '100vh', // example full screen height
          width: '100%', // ensures full width
          maxWidth: 'none', // disables max-width
        },
      });
    },
  ],
}
