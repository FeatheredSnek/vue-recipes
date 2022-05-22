// dont know if nuxt/dotenv plugin is required to use env in head but it wont hurt
require('dotenv').config() //eslint-disable-line

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // title: 'nuxtSalad',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // { 
      //   hid: 'description', 
      //   name: 'description', 
      //   content: 'A perfect place to find delicious and healthy salad recipes, curated and taste-tested by passionate professionals.' 
      // },
      { name: 'format-detection', content: 'telephone=no' },
      { 'http-equiv': "X-UA-Compatible", content: "IE=edge" },
      { 'http-equiv': "content-language", content: "en-US" },
            // open graph
      { property: 'og:site_name', content: 'nuxtSalad' },
      // { property: 'og:title', content: 'nuxtSalad - delicious and healthy salad recipes' },
      // { property: 'og:description', content: 'A perfect place to find delicious and healthy salad recipes, curated and taste-tested by passionate professionals.' },
      { property: 'og:type', content: 'website' }, 
      // { property: 'og:url', content: process.env.BASE_URL || 'http://localhost:3000' }, // eslint-disable-line
      // { property: 'og:image', content: '/static/images/recipes/9a9f4eb1ea8c.jpg' },
      // { property: 'og:image:alt', content: 'A delicious salad you can make with one of our recipes' },
            // twitter cards
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:creator', content: '@nuxtsalad' },
      // { property: 'twitter:description', content: 'A perfect place to find delicious and healthy salad recipes, curated and taste-tested by passionate professionals.' },
      { property: 'twitter:domain', content: process.env.BASE_URL || 'http://localhost:3000' }, // eslint-disable-line
      // { property: 'twitter:image', content: `${process.env.CDN_URL}/recipes/9a9f4eb1ea8c.jpg` }, // eslint-disable-line
      { property: 'twitter:site', content: '@nuxtsalad' },
      // { property: 'twitter:title', content: 'nuxtSalad - delicious and healthy salad recipes' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "true" },
      { 
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Mukta:wght@400;700&display=swap" 
      },
      { rel: "canonical", href: process.env.BASE_URL || 'http://localhost:3000' }, // eslint-disable-line
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/imagepath.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxt/postcss8'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/http',
    '@nuxtjs/dotenv',
    'vue-social-sharing/nuxt',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000', // eslint-disable-line
    apiBaseURL: process.env.API_URL || 'http://127.0.0.1', // eslint-disable-line
    imageHost: process.env.CDN_URL || '/images', // eslint-disable-line
  },

  tailwindcss: {
    configPath: '~/tailwind.config.js',
    cssPath: '~/assets/css/tailwind.css'
  }
}
