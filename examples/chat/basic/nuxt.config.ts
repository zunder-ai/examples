export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxtjs/color-mode', '@zunderai/ui'],
  colorMode: {
    classSuffix: '',
  },
  // https://tailwindcss.nuxtjs.org
  tailwindcss: {
    // Expose tailwind config with #tailwind-config
    exposeConfig: true
  },

  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY || "",
    openaiModel: process.env.OPENAI_MODEL || "",
    public: {
      useSimulatedChat: process.env.USE_SIMULATED_CHAT === "true",
    },
  },

  compatibilityDate: '2024-08-20'
})
