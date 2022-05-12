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
        "blue": "#FF0000",
        "sky-500": "#00ff00"
      },
      fontFamily: {
        "sans": "Mukta, system-ui, sans-serif"
      }
    },
  },
  plugins: [],
}