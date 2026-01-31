// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image'
  ],
  routeRules: {
    '/api/artworks': { swr: process.env.NODE_ENV === 'production' ? 60 : 0 }
  },
  app: {
    head: {
      title: '苗畅的画廊',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '探索精美的艺术作品收藏' }
      ]
    }
  },
  css: ['~/assets/css/main.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})