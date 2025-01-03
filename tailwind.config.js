/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        borderDefault: "#BBC2C9",
        primaryOrange: "#DE761C",
        primary100: "#FBECDE",
        primary1000: "#59300B",
        secondary100: "#FAFAEE",
        neutral700: "#303030",
      },

      fontFamily: {
        heading: ["Roboto", "sans-serif"], // Heading font
        body: ["Nunito Sans", "sans-serif"], // Body font
      },

      spacing: {
        72: "18rem", // 72px spacing
        80: "20rem", // 80px spacing
        96: "24rem", // 96px spacing
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        "#root": {
          padding: "0", // example padding removal
          backgroundColor: "#f0f0f0", // example background color
          minHeight: "100vh", // example full screen height
          width: "100%", // ensures full width
          maxWidth: "none", // disables max-width
        },
      });
    },
  ],
};
