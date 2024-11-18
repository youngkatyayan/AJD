/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
      extend: {
          colors: {
              primary: "#4f46e5", 
              secondary: "#facc15", 
              accent: "#10b981",
          },
          fontFamily: {
              sans: ["Inter", "sans-serif"],
              heading: ["Poppins", "sans-serif"],
          },
          animation: {
              fadeIn: "fadeIn 1.5s ease-in-out",
          },
          keyframes: {
              fadeIn: {
                  "0%": { opacity: 0 },
                  "100%": { opacity: 1 },
              },
          },
      },
  },
  plugins: [],
};



