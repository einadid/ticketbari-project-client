/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        secondary: '#004E89',
        accent: '#00A896',
        dark: '#1A1A2E',
        light: '#F7F7F7',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        bangla: ['Hind Siliguri', 'sans-serif'],
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
}