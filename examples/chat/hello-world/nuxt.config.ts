export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: '',
  },
  // https://tailwindcss.nuxtjs.org
  tailwindcss: {
    // Expose tailwind config with #tailwind-config
    exposeConfig: true
  },

  app: {
    baseURL: '/chat/hello-world/'
  },

  compatibilityDate: '2024-08-20'
})
