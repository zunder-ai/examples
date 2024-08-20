export default defineNuxtConfig({

  devtools: {
    enabled: true,
  },

  modules: [
    '@nuxt/ui',
    '@zunderai/ui'
  ],

  ui: {
    icons: [
      'simple-icons',
    ],
  },

  tailwindcss: {
    viewer: false,
  },
  compatibilityDate: '2024-08-20'
})
