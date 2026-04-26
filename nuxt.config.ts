// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content'
  ],
  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    classSuffix: '-theme',
    storage: 'cookie',
    fallback: 'green',
    preference: 'green'
  },

  compatibilityDate: '2024-04-03',

  eslint: {
    config: {
      stylistic: {
        indent: 2,
        commaDangle: 'never',
        quotes: 'single',
        semi: true
      }
    }
  }
});
