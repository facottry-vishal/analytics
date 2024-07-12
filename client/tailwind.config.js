/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    darkMode: "class",
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary100: "#D5E6F5",
        primary200: "#ACCDEB",
        primary300: "#83B4E1",
        primary400: "#5A9BD7",
        primary: "#3182CE",
        primary600: "#2768A4",
        primary700: "#1D4E7B",
        primary800: "#133452",
        primary900: "#0E273D",

        bgblue: "#F7FAFC",
        bgblue200: "#E2EDF5",
        darkblue: "#132537",
        darkblue200: "#042444",
        darkblue300: "#00162D",

        bggray: "#F9F9F9",
      },
    },
  },
  plugins: [],
};
