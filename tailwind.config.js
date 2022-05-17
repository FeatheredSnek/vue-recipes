/* eslint-disable */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "white": "#ffffff",
        "dark": "#4b5563"
      },
      fontFamily: {
        "sans": "Mukta, system-ui, sans-serif"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}