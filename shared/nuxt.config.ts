export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@zunderai/ui',
  ],

  ui: {
    icons: [
      'simple-icons',
    ],
  },

  tailwindcss: {
    viewer: false,
  },
  compatibilityDate: '2024-07-23'
})
