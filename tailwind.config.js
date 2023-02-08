/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage:{
        'fashion':"url('/src/images/pattern-bg.png')"
      }
    },
  },
  plugins: [],
};
