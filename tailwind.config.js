/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Cairo", "sans-serif"], // Professional Arabic font
      },
      colors: {
        primary: {
          DEFAULT: "#1a4e9e", // Adjust to match the Ministry blue
        },
      },
    },
  },
  plugins: [],
};
